import { 
    RECEIVE_ACTIVITY, 
    RECEIVE_ACTIVITIES_ERRORS 
} from '../actions/activity_actions';

export default (state = [], action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_ACTIVITIES_ERRORS :
            return action.errors;
        case RECEIVE_ACTIVITY:
            return [];
        default:
            return state;
    }
};
