import { connect } from 'react-redux';
import { createRoute } from '../../actions/map_route_actions';
import CreateRouteForm from './create_route_form';
import { closeModalSave, closeModal } from '../../actions/modal_actions';

const msp = (state, ownProps) => {
    let currentUserId = state.session.id;
    let routeDataString = JSON.stringify(ownProps.routeData);
    return({
        athleteId: currentUserId,
        routeDataString: routeDataString
    })
}

const mdp = dispatch => {
    return({
        createRoute: (route) => dispatch(createRoute(route)),
        closeModalSave: () => dispatch(closeModalSave()),
        closeModal: () => dispatch(closeModal())
    })
}

export default connect(msp, mdp)(CreateRouteForm);