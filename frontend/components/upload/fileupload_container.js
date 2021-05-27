import { connect } from 'react-redux';
import FileUpload from './fileupload';

import {fileDispatch} from '../../actions/file_upload_actions'

const mapStateToProps = (state) => ({
    locations: state.locations,
    technicians: state.technicians,
})

const mapDispatchToProps = dispatch => ({
    fileDispatch: (type, uploadData) => dispatch(fileDispatch(type, uploadData))
})

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(FileUpload);