import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

const localizer = momentLocalizer(moment);

class FullCalendar extends React.Component {
       constructor(props) {
        super(props);
        this.state = {events: []};
        this.props.fetchLocations().then((l) => {
        this.state.locations = l;});
        this.props.fetchTechnicians().then((t) => {
        this.state.technicians = t;});
        this.props.fetchWorkOrders().then((w) => {
        this.state.workOrders = w;});


    }

    render() {
        return (
        <div className="App">
            <Calendar
            localizer={localizer}
            defaultDate={new Date()}
            defaultView="day"
            events={this.state.events}
            style={{ height: "100vh" }}
            />
        </div>
        );
    }

}

export default FullCalendar