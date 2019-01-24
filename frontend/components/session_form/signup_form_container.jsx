import React from 'react';
import { connect } from 'react-redux';
import { signup } from '../../actions/session_actions';
import SessionForm from './session_form';
import { openModal, closeModal } from '../../actions/modal_actions';

const msp = ({ errors }) => {
    return {
        errors: errors.session,
        formType: 'Sign Up',
    };
};

const mdp = dispatch => {
    return {
        processForm: (user) => dispatch(signup(user)),
        otherForm: (
            <button onClick={() => dispatch(openModal('login'))}>
                Log In
      </button>
        ),
        closeModal: () => dispatch(closeModal())
    }
};

export default connect(msp, mdp)(SessionForm);