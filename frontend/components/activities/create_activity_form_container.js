import { connect } from 'react-redux';
import { createActivity } from '../../actions/activity_actions';
import { fetchRoutes } from '../../actions/map_route_actions';
import ActivityForm from './activity_form';

const msp = state => {
    const activity = {
        title: '', 
        time: '',
        description: '',
    }
    const formType = 'Record Activity';
    const currentUserId = state.session.id;
    const routes = state.entities.routes;
    const routeId = state.ui.routeData.routeId;
    const routeData = JSON.parse(state.ui.routeData.dataString);
    const sport = routeData.sport;
    const distance = routeData.distance;
    const elevation = routeData.elevation;

    const errors = state.errors.activities;
    return({
        athleteId: currentUserId,
        activity,
        routes,
        routeId,
        sport,
        distance,
        elevation,
        formType,
        errors
    });
};

const mdp = dispatch => {
    return ({
        action: (activity) => dispatch(createActivity(activity)),
        fetchRoutes: () => dispatch(fetchRoutes())
    });
};

export default connect(msp, mdp)(ActivityForm);