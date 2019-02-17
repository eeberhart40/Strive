import { connect } from 'react-redux';
import { fetchActivities, fetchActivity } from '../../actions/activity_actions';
import { fetchRoute, fetchRoutes } from '../../actions/map_route_actions';
import UserFeedIndex from './user_feed_index';

const msp = state => {
    let activities = state.entities.activities;
    let routes = state.entities.routes;
    return {
        activities,
        routes
    };
};

const mdp = dispatch => {
    return {
        fetchActivities: () => dispatch(fetchActivities()),
        fetchActivity: (id) => dispatch(fetchActivity(id)),
        fetchRoute: (id) => dispatch(fetchRoute(id)),
        fetchRoutes: () => dispatch(fetchRoutes())
    }
};

export default connect(msp, mdp)(UserFeedIndex);