import { 
    RECEIVE_ACTIVITY, 
    RECEIVE_ACTIVITIES_ERRORS 
} from '../actions/activity_actions';
import { CLOSE_MODAL, CLOSE_MODAL_ACT } from "../actions/modal_actions";

export default (state = [], action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_ACTIVITIES_ERRORS :
            return action.errors;
        case RECEIVE_ACTIVITY:
        case CLOSE_MODAL:
        case CLOSE_MODAL_ACT:
            return [];
        default:
            return state;
    }
};
