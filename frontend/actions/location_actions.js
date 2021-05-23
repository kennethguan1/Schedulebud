import * as APIUtil from "../util/location_api_util";

export const RECEIVE_LOCATION = "RECEIVE_LOCATION";
export const RECEIVE_LOCATIONS = "RECEIVE_LOCATIONS";
export const REMOVE_LOCATION = "REMOVE_LOCATION";
export const RECEIVE_LOCATION_ERRORS = "RECEIVE_LOCATION_ERRORS";
export const REMOVE_LOCATION_ERRORS = "REMOVE_LOCATION_ERRORS";

export const receiveLocations = (locations) => ({
  type: RECEIVE_LOCATIONS,
  locations,
});

export const receiveLocation = (location) => ({
  type: RECEIVE_LOCATION,
  location,
});

export const removeLocation = (location) => ({
  type: REMOVE_LOCATION,
  location,
});

export const receiveLocationErrors = (errors) => ({
  type: RECEIVE_LOCATION_ERRORS,
  errors,
});

export const removeLocationErrors = () => ({
  type: REMOVE_LOCATION_ERRORS,
});

export const fetchLocations = () => (dispatch) => 
  APIUtil.fetchLocations().then(
    (locations) => dispatch(receiveLocations(locations)),
    (err) => dispatch(receiveLocationErrors(err.responseJSON))
  );

export const fetchLocation = (locationId) => (dispatch) =>
  APIUtil.fetchLocation(locationId).then(
    (location) => dispatch(receiveLocation(location)),
    (err) => dispatch(receiveLocationErrors(err.responseJSON))
  );