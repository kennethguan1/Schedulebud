import React from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import ReactTooltip from "react-tooltip";
import 'regenerator-runtime/runtime'

import moment from "moment";



const localizer = momentLocalizer(moment);



class FullCalendar extends React.Component {
       constructor(props) {
        super(props);
        this.state = {events: [], view: "month", 
          };

        this.props.fetchLocations().then((l) => {
        this.state.locations = l;});
        this.props.fetchTechnicians().then((t) => {
        this.state.technicians = t;});
        this.props.fetchWorkOrders().then((w) => {
        this.state.workOrders = w;});

        this.alertTime = this.alertTime.bind(this)
        this.handleViewProp = this.handleViewProp.bind(this);

    }

    componentDidUpdate(prevProps, prevState){
        if (prevProps !== this.props) {
        this.setState(
            {
            locations: this.props.locations,
            technicians: this.props.technicians,
            workOrders: this.props.workOrders,
            }, 
            () => {this.plotAppt(this.state.view);}
        )
      }
    }




    
    plotAppt(view) {
        let wArray = Object.values(this.props.workOrders)
        if (wArray.length < 1){return}

        let events = []
        let alllocations = this.state.locations;
        let alltechnicians = this.state.technicians;

        for (let i=0; i<wArray.length; i++){
            let currentworkorder = wArray[i];
            let start = new Date(currentworkorder.time)

            let end = new Date(start.getTime()+(1000*60)*60*(currentworkorder.duration/60))

            let onelocation = alllocations[currentworkorder.location_id];
            let onetechnician = alltechnicians[currentworkorder.technician_id];




          function standardTime(time){

                return new Date(time).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                })

            }
            
            
          function toolTipComponent(){
              return (
                <ReactTooltip
                  type={'info'}
                  id={`${currentworkorder.id}`}
                  place={"top"}
                >
                  <p>
                    {standardTime(start)} - {standardTime(end)}
                  </p>
                  <p>{`${onelocation.name} (${onelocation.city})`}</p>

                  <p>{`${onetechnician.name}`}</p>

                  <p>{`$${currentworkorder.price}`}</p>

                  <p>{`${currentworkorder.duration} minutes`}</p>
                </ReactTooltip>
              )
            } //name


            
          function eventBlock() {
            
                return (
                    <div>
                        {
                        view === "month" ? (
                            <p>
                            {standardTime(start)} - {standardTime(end)}
                            {onelocation.name}
                            </p>
                        ) : (
                            <div>
                            <p> {`${onelocation.name}`} <br></br>
                                {`${onelocation.city}`} {' '}
                                {`$${currentworkorder.price}`} <br></br>
                                {`${currentworkorder.duration} minutes`}
                            </p>
                            </div>
                        )}
                    </div>
                );
            }  //name
            

            
            let titleBlock = (
                <div
                    data-tip="React-tooltip"
                    data-for={`${currentworkorder.id}`}
                >

                    {eventBlock()}

                    {toolTipComponent()}

                </div>
            );

            events.push({
                title: titleBlock,
                resourceId: `${currentworkorder.technician_id}`,
                start: new Date(start.getFullYear(), start.getMonth(), start.getDate(), start.getHours(), start.getMinutes()),
                end: new Date(end.getFullYear(), end.getMonth(), end.getDate(), end.getHours(), end.getMinutes()),
            });

        }

        this.setState({events: events})
    }


    alertTime(e){
      
      let timeStart = e.start;
      
      let resourceId = e.resourceId;

      let timeAvailable, msg, duration, begin, ending;

      let msStart = new Date(timeStart.getFullYear(), timeStart.getMonth(), timeStart.getDate(), 0, 0).getTime();
      let msEnd = new Date(timeStart.getFullYear(), timeStart.getMonth(), timeStart.getDate(), 23, 59, 59).getTime();





      let newArray = Object.values(this.state.events).filter(event => {
        return (
          (event.resourceId === resourceId) &&
          (event.start.getDate() === e.start.getDate() || event.end.getDate() === e.start.getDate()) &&
          (event.start.getMonth() === e.start.getMonth() || event.end.getMonth() === e.start.getMonth()) &&
          (event.start.getFullYear() === e.start.getFullYear() || event.end.getFullYear() === e.start.getFullYear()) 
        )}).sort(function(a, b){return a.start.getTime() - b.start.getTime();});



      if (newArray.length === 0) {
        msg = "Nothing scheduled"
      } else if (timeStart <= newArray[0].start) {
          timeAvailable = newArray[0].start.getTime() - msStart;
          duration = `${standardTime(msStart)} - ${standardTime(newArray[0].start.getTime())}`;
      } else if (timeStart >= newArray[newArray.length - 1].end) {
          timeAvailable = msEnd - newArray[newArray.length - 1].end.getTime();
          duration = `${standardTime(newArray[newArray.length - 1].end.getTime())} - ${standardTime(msEnd)} `;
      } else {

        for (let i = 0; i < newArray.length - 1; i++) {
            let current = newArray[i];
            let next = newArray[i+1];

          if ((timeStart >= current.start.getTime() && timeStart < current.end.getTime())){
            return;
          }
          

          if (current.end.getTime() > next.start.getTime() || next.end.getTime() < timeStart) {
              continue
          } else if (timeStart <= current.end.getTime() && timeStart < next.start.getTime()) {
            begin = current.end.getTime();
            ending = next.start.getTime();
            timeAvailable = ending - begin;
            duration = `${standardTime(begin)} - ${standardTime(ending)} `;
            break;
          } else if (timeStart < next.start.getTime() && timeStart >= current.end.getTime()){
                begin = current.end.getTime();
                ending = next.start.getTime();
                timeAvailable = ending - begin;
                duration = `${standardTime(begin)} - ${standardTime(ending)} `;
                break;
              }
            }
          }


          msg = msg || `${mstoHrMin(timeAvailable)} (${mstoMin(timeAvailable)} mins)`
      

      function standardTime(msTime) {
        return new Date(msTime).toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        })
      }

      function mstoHrMin(ms){
        let totalHours = Math.floor(mstoMin(ms)/60);
        let totalMinutes = mstoMin(ms) % 60;
        return `${totalHours} hrs and ${totalMinutes} mins`
      }

      function mstoMin(ms) {
        let minutes = Math.floor(ms / 60000);
        return minutes;
      }

      const popUp = (
        <div>
          <h3>Availablability</h3>
          <p>{duration ? duration : null}</p>
          <p>{msg}</p>
        </div>
      );
      this.setState({toolTip: popUp})
    }

    handleViewProp(event){
      this.setState({view: event}, ()=> this.plotAppt(this.state.view))
    }


    render() {

  let getTechnicians = alltechnicians => {
          if (this.state.view==="day"){
          let techArray = [];
          let techValues = Object.values(alltechnicians);
          let i = 0;

          while (i < techValues.length) {
              techArray.push({
              id: `${techValues[i].id}`,
              title: `${techValues[i].name}`
              });
              i++
          }

          return techArray;
          }
  }



        return (
        <div className="App">
          { this.state.view === 'day' ?
            (<ReactTooltip
            id={`tooltip-availability`}
            globalEventOff="click"
            place="top"
            effect="float"
            type="success"
            > {this.state.toolTip}
            </ReactTooltip>) : null
          }
          <div
              data-tip=""
              className="tooltip-availability"
              data-event={"dblclick"}
              data-for={`tooltip-availability`}
          >
            <Calendar
            selectable
            onSelectSlot={(event) => this.alertTime(event)}
            onView={(event) => this.handleViewProp(event)}
            localizer={localizer}
            defaultDate={new Date()}
            defaultView={Views.MONTH}
            events={this.state.events}
            style={{ height: "100vh" }}

            views={[ "month", "week", "day"]}

            resources={getTechnicians(this.props.technicians)}
            />
          </div>
        </div>
        )
    }

}

export default FullCalendar