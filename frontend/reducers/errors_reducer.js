import { combineReducers } from 'redux';
import session from './session_errors_reducer';
import activities from './activities_errors_reducer';
import routes from './route_errors_reducers';

export default combineReducers({
    session,
    activities,
    routes
});
