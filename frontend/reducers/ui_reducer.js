import { combineReducers } from 'redux';
import routeData from './route_data_reducer';
import modal from './modal_reducer';

export default combineReducers({
    modal,
    routeData
});