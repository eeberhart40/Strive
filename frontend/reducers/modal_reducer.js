
import { 
    OPEN_MODAL,
    CLOSE_MODAL, 
    OPEN_MODAL_SAVE, 
    CLOSE_MODAL_SAVE,
    OPEN_MODAL_ACT,
    CLOSE_MODAL_ACT } from '../actions/modal_actions';

export default function modalReducer(state = null, action) {
    switch (action.type) {
        case OPEN_MODAL:
        case OPEN_MODAL_SAVE:
        case OPEN_MODAL_ACT:
            return action.modal;
        case CLOSE_MODAL:
        case CLOSE_MODAL_SAVE:
        case CLOSE_MODAL_ACT:
            return null;
        default:
            return state;
    }
}