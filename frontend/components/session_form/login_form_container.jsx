import React from 'react';
import { connect } from 'react-redux';
import { login } from '../../actions/session_actions';
import SessionForm from './session_form';
import { openModal, closeModal } from '../../actions/modal_actions';

const msp = ({errors}) => {
    return {
        errors: errors.session,
        formType: 'Log In',
    };
};

const mdp = dispatch => {
    return {
        processForm: (user) => dispatch(login(user)),
        otherForm: (
            <button onClick={() => dispatch(openModal('signup'))}>
                Signup
      </button>
        ),
        closeModal: () => dispatch(closeModal())
    }
};

export default connect(msp, mdp)(SessionForm);
