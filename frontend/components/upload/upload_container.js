import { connect } from 'react-redux';
import Upload from './upload';
import {uploadFile} from '../../actions/upload_actions'

const mapStateToProps = (state) => ({
    locations: state.locations,
    technicians: state.technicians,
    workOrders: state.workorders
})

const mapDispatchToProps = dispatch => ({
    uploadFile: (dataType, fileData) => dispatch(uploadFile(dataType, fileData))
})

export default connect(mapStateToProps, mapDispatchToProps)(Upload);