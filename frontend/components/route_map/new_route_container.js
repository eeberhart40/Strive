import { connect } from 'react-redux';
import NewRoute from './new_route';
import { openModalSave } from '../../actions/modal_actions';

const mdp = dispatch => {
    return ({
        openModalSave: (dataString) => dispatch(openModalSave('save', dataString))
    })
}

export default connect(null, mdp)(NewRoute);