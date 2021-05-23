import { combineReducers } from 'redux';
import technicianReducer from "./technician_reducer";
import locationReducer from "./location_reducer";
import workorderReducer from "./work_order_reducer";

const rootReducer = combineReducers({
    technicians: technicianReducer,
    locations: locationReducer,
    workorders: workorderReducer
});

export default rootReducer;