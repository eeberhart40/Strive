
import { OPEN_MODAL, CLOSE_MODAL, OPEN_MODAL_SAVE, CLOSE_MODAL_SAVE } from '../actions/modal_actions';

export default function modalReducer(state = null, action) {
    switch (action.type) {
        case OPEN_MODAL:
        case OPEN_MODAL_SAVE:
            return action.modal;
        case CLOSE_MODAL:
        case CLOSE_MODAL_SAVE:
            return null;
        default:
            return state;
    }
}