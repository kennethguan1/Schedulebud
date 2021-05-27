import {
  RECEIVE_LOCATIONS,
  RECEIVE_LOCATION,
  REMOVE_LOCATION,
} from "../actions/location_actions";

import { merge } from 'lodash';

const locationReducer = (oldState = {}, action) => {
  
  let newState = merge({}, oldState);

  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE_LOCATIONS:
      return merge(newState, action.locations);
    case RECEIVE_LOCATION:
      return merge(newState, action.location);
    case REMOVE_LOCATION:
      return {};
    default:
      return oldState;
  }
};

export default locationReducer;