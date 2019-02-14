import { 
    OPEN_MODAL_SAVE, 
    CLOSE_MODAL_SAVE, 
    OPEN_MODAL_ACT,
    CLOSE_MODAL_ACT 
} from '../actions/modal_actions';

export default function routeDataReducer(state = null, action) {
    switch (action.type) {
        case OPEN_MODAL_SAVE:
            return action.dataString;
        case OPEN_MODAL_ACT:
            debugger
            return { dataString: action.dataString, routeId: action.routeId};
        case CLOSE_MODAL_SAVE:
        case CLOSE_MODAL_ACT:
            return null;
        default:
            return state;
    }
}