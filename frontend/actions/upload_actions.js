import { importFile } from "../util/upload_api_util";

export const RECEIVE_ERRORS = "RECEIVE_ERRORS";



const receiveErrors = (errors) => ({
  type: RECEIVE_ERRORS,
  errors,
});

const removeErrors = () => ({
  type: CLEAR_ERRORS,
});

export const uploadFile = (dataType, fileData) => (dispatch) =>
  importFile(dataType, fileData).then(
    // (users) => dispatch(receiveUsers(users)),
    (error) => dispatch(receiveErrors(error.responseJSON))
  );

// export const fetchUser = (id) => (dispatch) =>
//   getUser(id).then(
//     (user) => dispatch(receiveUser(user)),
//     (error) => dispatch(receiveErrors(error.responseJSON))
//   );
