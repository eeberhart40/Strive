import { connect } from 'react-redux';
import { createActivity } from '../../actions/activity_actions';
import { fetchRoutes } from '../../actions/map_route_actions';
import ActivityForm from './activity_form';

const msp = state => {
    const activity = {
        sport: '',
        title: '', 
        time: '',
        distance: '',
        elevation: '',
        description: '',
    }
    const formType = 'Record Activity';
    const currentUserId = state.session.id;
    const routes = state.entitiies.routes;
    return({
        athleteId: currentUserId,
        activity,
        routes,
        formType
    });
};

const mdp = dispatch => {
    return ({
        action: (activity) => dispatch(createActivity(activity)),
    });
};

export default connect(msp, mdp)(ActivityForm);