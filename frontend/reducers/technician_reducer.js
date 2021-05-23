import {
  RECEIVE_TECHNICIANS,
  RECEIVE_TECHNICIAN,
  REMOVE_TECHNICIAN,
} from "../actions/technician_actions";

import { merge } from 'lodash';

const technicianReducer = (oldState = {}, action) => {
  
  let newState = merge({}, oldState);

  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE_TECHNICIANS:
      return merge(newState, action.technicians);
    case RECEIVE_TECHNICIAN:
      return merge(newState, action.technician);
    case REMOVE_TECHNICIAN:
      // delete newState[action.questionId];                        //controller api call does not return an Id so delete for now and return blank state object
      return {};
    default:
      return oldState;
  }
};

export default technicianReducer;