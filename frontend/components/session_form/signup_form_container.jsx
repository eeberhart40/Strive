import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { signup } from '../../actions/session_actions';
import SessionForm from './greeting';

const msp = ({ errors }) => {
    return {
        errors: errors.session,
        formType: 'login',
        navLink: <Link to={'/login'}>login instead</Link>
    };
};

const mdp = dispatch => ({
    processForm: (user) => dispatch(signup(user))
});

export default connect(msp, mdp)(SessionForm);