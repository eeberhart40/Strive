import { combineReducers } from 'redux';

import routes from './map_routes_reducer';
import athletes from './athletes_reducer';

export default combineReducers({
    athletes,
    routes,
});
