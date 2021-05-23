import * as APIUtil from "../util/work_order_api_util";

export const RECEIVE_WORK_ORDER = "RECEIVE_WORK_ORDER";
export const RECEIVE_WORK_ORDERS = "RECEIVE_WORK_ORDERS";
export const REMOVE_WORK_ORDER = "REMOVE_WORK_ORDER";
export const RECEIVE_WORK_ORDER_ERRORS = "RECEIVE_WORK_ORDER_ERRORS";
export const REMOVE_WORK_ORDER_ERRORS = "REMOVE_WORK_ORDER_ERRORS";

export const receiveWorkOrders = (workorders) => ({
  type: RECEIVE_WORK_ORDERS,
  workorders,
});

export const receiveWorkOrder  = (workorder) => ({
  type: RECEIVE_WORK_ORDER,
  workorder,
});

export const removeWorkOrder = (workorder) => ({
  type: REMOVE_WORK_ORDER,
  workorder,
});

export const receiveWorkOrderErrors = (errors) => ({
  type: RECEIVE_WORK_ORDER_ERRORS,
  errors,
});

export const removeWorkOrderErrors = () => ({
  type: REMOVE_WORK_ORDER_ERRORS,
});

export const fetchWorkOrders = () => (dispatch) => 
  APIUtil.fetchWorkOrders().then(
    (workorders) => dispatch(receiveWorkOrders(workorders)),
    (err) => dispatch(receiveWorkOrderErrors(err.responseJSON))
  );

export const fetchWorkOrder = (workorderId) => (dispatch) =>
  APIUtil.fetchWorkOrder(workorderId).then(
    (workorder) => dispatch(receiveWorkOrder(workorder)),
    (err) => dispatch(receiveWorkOrderErrors(err.responseJSON))
  );