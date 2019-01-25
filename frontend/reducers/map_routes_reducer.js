import { merge } from 'lodash/merge';
import { 
    RECEIVE_ALL_ROUTES, 
    RECEIVE_ROUTE, 
    REMOVE_ROUTE } from '../actions/map_route_actions';

const nullRoute = Object.freeze({
    id: null,
    athlete_id: null,
    route_data: null
});

const routesReducer = (state = nullRoute, action) => {
    let newState;
    switch(action.type){
        case RECEIVE_ALL_ROUTES:
            return action.routes;
        case RECEIVE_ROUTE:
            newState = merge({}, state, {[action.route.id]: action.route});
            return newState;
        case REMOVE_ROUTE:
            newState = merge({}, state);
            delete newState[action.routeId];
            return newState;
        default:
            return state;
    }
}

export default routesReducer;