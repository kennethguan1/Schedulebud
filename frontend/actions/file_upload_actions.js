import * as APIUtil from "../util/file_upload_api_util";
export const RECEIVE_UPLOAD_ERRORS = "RECEIVE_UPLOAD_ERRORS";

const receiveUploadErrors = (errors) => ({
  type: RECEIVE_UPLOAD_ERRORS,
  errors,
});

export const fileDispatch = (type, uploadData) => (dispatch) =>
  APIUtil.fileUpload(type, uploadData).then(
    (error) => dispatch(receiveUploadErrors(error.responseJSON))
  );