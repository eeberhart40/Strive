import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import { closeModal } from '../../actions/modal_actions';

class NavContainer extends React.Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
        this.navToRoutes = this.navToRoutes.bind(this);
    }

    logout(e) {
        e.preventDefault();
        this.props.logout();
        this.props.closeModal();
    }

    navToRoutes(e) {
        e.preventDefault();
        this.props.closeModal().then(this.props.history.replace('/routes'));
        
    }

    render() {
    return(
        <div className='site-nav'>
            <div className='modal-child'>
                <ul className="dropdown">
                    <li onClick={this.navToRoutes}>My Routes</li>
                    <li onClick={this.logout}>Log Out</li>
                </ul>
            </div> 
        </div>
    )
    }
}

const mdp = dispatch => {
    return ({
        logout: () => dispatch(logout()),
        closeModal: () => dispatch(closeModal())
    })
}

export default withRouter(connect(null, mdp)(NavContainer));