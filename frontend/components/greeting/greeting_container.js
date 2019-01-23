import { connect } from 'react-redux';

import { logout } from '../../actions/session_actions';
import Greeting from './greeting';

const msp = ({ session, entities: { athletes } }) => {

    return {
        currentUser: athletes[session.id]
    };
};

const mdp = dispatch => ({
    logout: () => dispatch(logout())
});

export default connect(msp, mdp)(Greeting);
