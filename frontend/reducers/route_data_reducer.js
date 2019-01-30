import { OPEN_MODAL_SAVE, CLOSE_MODAL_SAVE } from '../actions/modal_actions';

export default function routeDataReducer(state = null, action) {
    switch (action.type) {
        case OPEN_MODAL_SAVE:
            return action.dataString;
        case CLOSE_MODAL_SAVE:
            return null;
        default:
            return state;
    }
}