import { connect } from 'react-redux';
import { fetchActivities, deleteActivity, updateActivity } from '../../actions/activity_actions';
import { fetchRoute } from '../../actions/map_route_actions';
import ActivityIndex from './activty_index';

const msp = state => {
    let activities = state.entities.activities;

    return {
        activities,
    };
};

const mdp = dispatch => {
    return {
        fetchActivities: () => dispatch(fetchActivities()),
        deleteActivity: (id) => dispatch(deleteActivity(id)),
        updateActivity: (id) => dispatch(updateActivity(id)),
        fetchRoute: (id) => dispatch(fetchRoute(id))
    }
};

export default connect(msp, mdp)(ActivityIndex);