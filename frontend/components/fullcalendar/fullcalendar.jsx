import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
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
        this.state = {events: []};
        this.props.fetchLocations().then((l) => {
        this.state.locations = l;});
        this.props.fetchTechnicians().then((t) => {
        this.state.technicians = t;});
        this.props.fetchWorkOrders().then((w) => {
        this.state.workOrders = w;});




    }

  componentDidUpdate(prevProps, prevState){
    if (prevProps !== this.props) {
        console.log(this.props)
      this.setState(
        {
          locations: this.props.locations,
          technicians: this.props.technicians,
          workOrders: this.props.workOrders,
        }, 
      );
    }
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

            views={[ "month", "week", "day"]}
            />
        </div>
        );
    }

}

export default FullCalendar