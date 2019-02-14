import { 
    OPEN_MODAL_SAVE, 
    CLOSE_MODAL_SAVE, 
    OPEN_MODAL_ACT,
    CLOSE_MODAL_ACT 
} from '../actions/modal_actions';

export default function routeDataReducer(state = null, action) {
    switch (action.type) {
        case OPEN_MODAL_SAVE:
        case OPEN_MODAL_ACT:
            return action.dataString;
        case CLOSE_MODAL_SAVE:
        case CLOSE_MODAL_ACT:
            return null;
        default:
            return state;
    }
}