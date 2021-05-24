import { connect } from "react-redux";
import FullCalendar from './fullcalendar';

import {fetchLocations} from '../../actions/location_actions';
import {fetchTechnicians} from '../../actions/technician_actions';
import {fetchWorkOrders} from '../../actions/work_order_actions';

const mapStateToProps = (state) => ({
    locations: state.locations,
    technicians: state.technicians,
    workOrders: state.workorders
});

const mapDispatchToProps = (dispatch) => ({
    fetchLocations: () => dispatch(fetchLocations()),
    fetchTechnicians: () => dispatch(fetchTechnicians()),
    fetchWorkOrders: () => dispatch(fetchWorkOrders())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FullCalendar);