import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import { closeModal } from '../../actions/modal_actions';

class NavContainer extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        event.preventDefault();
        this.props.logout();
        this.props.closeModal();
    }

    render() {
    return(
        <div className='site-nav'>
            <ul className="dropdown">
                <li><Link to={'/routes'}>My Routes</Link></li>
                <li onClick={this.handleClick}>Log Out</li>
            </ul>
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

export default connect(null, mdp)(NavContainer);