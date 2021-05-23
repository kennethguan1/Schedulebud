import * as APIUtil from "../util/technician_api_util";

export const RECEIVE_TECHNICIAN = "RECEIVE_TECHNICIAN";
export const RECEIVE_TECHNICIANS = "RECEIVE_TECHNICIANS";
export const REMOVE_TECHNICIAN = "REMOVE_TECHNICIAN";
export const RECEIVE_TECHNICIAN_ERRORS = "RECEIVE_TECHNICIAN_ERRORS";
export const REMOVE_TECHNICIAN_ERRORS = "REMOVE_TECHNICIAN_ERRORS";

export const receiveTechnicians = (technicians) => ({
  type: RECEIVE_TECHNICIANS,
  technicians,
});

export const receiveTechnician = (technician) => ({
  type: RECEIVE_TECHNICIAN,
  technician,
});

export const removeTechnician = (technician) => ({
  type: REMOVE_TECHNICIAN,
  technician,
});

export const receiveTechnicianErrors = (errors) => ({
  type: RECEIVE_TECHNICIAN_ERRORS,
  errors,
});

export const removeTechnicianErrors = () => ({
  type: REMOVE_TECHNICIAN_ERRORS,
});

export const fetchTechnicians = () => (dispatch) => 
  APIUtil.fetchTechnicians().then(
    (technicians) => dispatch(receiveTechnicians(technicians)),
    (err) => dispatch(receiveTechnicianErrors(err.responseJSON))
  );

export const fetchTechnician = (technicianId) => (dispatch) =>
  APIUtil.fetchTechnician(technicianId).then(
    (technician) => dispatch(receiveTechnician(technician)),
    (err) => dispatch(receiveTechnicianErrors(err.responseJSON))
  );