import React from 'react';
import { closeModal } from '../../actions/modal_actions';
import { connect } from 'react-redux';
import LoginFormContainer from '../session_form/login_form_container';
import SignupFormContainer from '../session_form/signup_form_container';
import CreateRouteFormContainer from '../route_form/create_route_form_container';
import NavContainer from '../nav/nav';

function Modal({ modal, closeModal, routeData }) {
    if (!modal) {
        return null;
    }
    let component;
    switch (modal) {
        case 'login':
            component = <LoginFormContainer />;
            break;
        case 'signup':
            component = <SignupFormContainer />;
            break;
        case 'save':
            component = <CreateRouteFormContainer routeData={routeData}/>
            break;
        case 'navigate':
            component = <NavContainer />
            break;
        default:
            return null;
    }
    return (
        <div className="modal-background" onClick={closeModal}>
            <div className="modal-child" onClick={e => e.stopPropagation()}>
                {component}
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    let routeData = state.ui.routeData
    if(routeData){
        return {
            modal: state.ui.modal,
            routeData
        }
    } else {
        return{
            modal: state.ui.modal
        }
    }
};

const mapDispatchToProps = dispatch => {
    return {
        closeModal: () => dispatch(closeModal())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);