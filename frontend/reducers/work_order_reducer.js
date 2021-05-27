import {
  RECEIVE_WORK_ORDERS,
  RECEIVE_WORK_ORDER,
  REMOVE_WORK_ORDER,
} from "../actions/work_order_actions";

import { merge } from 'lodash';

const workorderReducer = (oldState = {}, action) => {
  
  let newState = merge({}, oldState);

  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE_WORK_ORDERS:
      return merge(newState, action.workorders);
    case RECEIVE_WORK_ORDER:
      return merge(newState, action.location);
    case REMOVE_WORK_ORDER:
      return {};
    default:
      return oldState;
  }
};

export default workorderReducer;