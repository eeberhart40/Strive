import {
    RECEIVE_ROUTE,
    RECEIVE_ROUTE_ERRORS
} from '../actions/map_route_actions';
import { CLOSE_MODAL, CLOSE_MODAL_SAVE } from "../actions/modal_actions";

export default (state = [], action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_ROUTE_ERRORS:
        debugger
            return action.errors;
        case RECEIVE_ROUTE:
        case CLOSE_MODAL:
        case CLOSE_MODAL_SAVE:
        debugger
            return [];
        default:
            return state;
    }
};