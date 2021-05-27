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
                  id={`tooltip-${currentworkorder.id}`}
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
                    data-for={`tooltip-${currentworkorder.id}`}
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

      // Filter - select events that match clicked slot's resourceId (aka technician) AND date
      let newArray = Object.values(this.state.events).filter(event => {
        return (
          (event.resourceId === resourceId) &&
          (event.start.getDate() === e.start.getDate() ||event.end.getDate() === e.start.getDate()) &&
          (event.start.getMonth() === e.start.getMonth() ||event.end.getMonth() === e.start.getMonth()) &&
          (event.start.getFullYear() === e.start.getFullYear() ||event.end.getFullYear() === e.start.getFullYear()) 
        )
      })

      newArray = newArray.sort(function (a, b) {
        return a.start.getTime() - b.start.getTime();
      });


      let startTime, endTime, dayStartMS, dayEndMS, durationMS, msg, duration;

      dayStartMS = new Date(timeStart.getFullYear(), timeStart.getMonth(), timeStart.getDate(), 5, 0).getTime();
      dayEndMS = new Date(timeStart.getFullYear(), timeStart.getMonth(), timeStart.getDate(), 19, 0).getTime();



      // 1) If timeStart is before the first event, set 5am as the beginning of the day
      // 2) Else if timeStart is after last event, set 7pm as end of day
      // 3) Else - get the difference of timeStart's immediate neighbor events' endTime and StartTime for availabile duration
      if (newArray.length === 0) {
        msg = "All Day"
      } else if (timeStart <= newArray[0].start) {
        if (timeStart.getTime() < dayStartMS) {
          msg = "Outside of working hours";
        } else {
          durationMS = newArray[0].start.getTime() - dayStartMS;
          duration = `${convertDuration(dayStartMS)} - ${convertDuration(
            newArray[0].start.getTime()
          )}`;
        }
      } else if (timeStart >= newArray[newArray.length - 1].end) {
        if (timeStart.getTime() > dayEndMS) {
          msg = "Outside of working hours";
        } else {
          durationMS = dayEndMS - newArray[newArray.length - 1].end.getTime();
          duration = `${convertDuration(
            newArray[newArray.length - 1].end.getTime()
          )} - ${convertDuration(dayEndMS)} `;
        }
      } else {
        
        for (let i = 0; i < newArray.length - 1; i++) {
            let iEvent = newArray[i];
            let jEvent = newArray[i+1];

          if ((timeStart >= iEvent.start.getTime() && timeStart < iEvent.end.getTime())){
            return;
          }
          

          if (iEvent.end.getTime() > jEvent.start.getTime() || jEvent.end.getTime() < timeStart) {
              continue
          } else if (timeStart <= iEvent.end.getTime() && timeStart < jEvent.start.getTime()) {
            startTime = iEvent.end.getTime();
            endTime = jEvent.start.getTime();
            durationMS = endTime - startTime;
            duration = `${convertDuration(startTime)} - ${convertDuration(endTime)} `;
            break;
          }
            
            
            else if (timeStart < jEvent.start.getTime() && timeStart >= iEvent.end.getTime()){
                startTime = iEvent.end.getTime();
                endTime = jEvent.start.getTime();
                durationMS = endTime - startTime;
                duration = `${convertDuration(startTime)} - ${convertDuration(endTime)} `;
                break;
              }
            }
          }

      msg = msg || `${convertHoursAndMinutes(durationMS)} (${convertMinutes(durationMS)} mins)`
      

      function convertDuration(millisecTimeStamp) {
        let time = new Date(millisecTimeStamp).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }).replace(/^0(?:0:0?)?/, "");
        return time;
      }


      function convertHoursAndMinutes(millisec){
        let totalMins = convertMinutes(millisec)
        let calculatedHours = Math.floor(totalMins/60);
        let calculatedMins = totalMins % 60
        return `${calculatedHours} hrs ${calculatedMins} mins`
      }
    
      
      function convertMinutes(millisec) {
        let minutes = Math.floor(millisec / 60000);
        return minutes;
      }

      const alertMsg = (
        <div>
          <h3>Available Time</h3>
          <p>{duration ? duration : null}</p>
          <p>{msg}</p>
        </div>
      );
      this.setState({tooltipAvailability: alertMsg})
    }





    handleViewProp(event){
      this.setState({view: event}
        )
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
          <div
            className="tooltip-availability"
              data-tip=""
              data-for={`tooltip-availability`}
              data-event={"dblclick"}
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
            { this.state.view === 'day' ?
              (<ReactTooltip
              id={`tooltip-availability`}
              place="top"
              type="success"
              effect="float"
              globalEventOff="click"
              >

                {this.state.tooltipAvailability}
              </ReactTooltip>) : null
            }
        </div>
        );
    }

}

export default FullCalendar