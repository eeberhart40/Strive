import { combineReducers } from 'redux';
import session from './session_errors_reducer';
import activities from './activities_errors_reducer';

export default combineReducers({
    session,
    activities
});
