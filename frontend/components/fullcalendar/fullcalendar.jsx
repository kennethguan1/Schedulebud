import React from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";

const localizer = momentLocalizer(moment);

let getTechnicians = alltechnicians => {

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

class FullCalendar extends React.Component {
       constructor(props) {
        super(props);
        this.state = {events: [], view: "month"};

        this.props.fetchLocations().then((l) => {
        this.state.locations = l;});
        this.props.fetchTechnicians().then((t) => {
        this.state.technicians = t;});
        this.props.fetchWorkOrders().then((w) => {
        this.state.workOrders = w;});

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
        if (wArray < 1){return}

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

                new Date(time).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                });

            }



            
            function orderBlock() {
            
                return (
                    <div>
                        {
                        view === "day" ? (
                            <div>
                            <p> {`${onelocation.name}`} <br></br>
                                {`${onelocation.city}`} {' '}
                                {`$${currentworkorder.price}`} <br></br>
                                {`${currentworkorder.duration} minutes`}
                            </p>
                            </div>
                        ) : (
                            <p>
                            {standardTime(start)} - {standardTime(end)}
                            {onelocation.name}
                            </p>
                        )}
                    </div>
                );
            }
            

            
            let titleBlock = (
                <div
                    data-tip="React-tooltip"
                    data-for={`tooltip-${currentworkorder.id}`}
                >
                    {orderBlock()}
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

    handleViewProp(event){
      this.setState({view: event})
    }


    render() {
        return (
        <div className="App">
            <Calendar
            localizer={localizer}
            defaultDate={new Date()}
            defaultView={Views.MONTH}
            events={this.state.events}
            style={{ height: "100vh" }}

            views={[ "month", "week", "day"]}

            resources={getTechnicians(this.props.technicians)}
            
            />
        </div>
        );
    }

}

export default FullCalendar