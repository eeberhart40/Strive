import React from 'react';
import GreetingContainer from './greeting/greeting_container';
import LoginFormContainer from '../components/session_form/login_form_container';
import SignupFormContainer from'../components/session_form/signup_form_container';
import { Route }  from 'react-router-dom';
import { AuthRoute } from '../util/route_util';
import Modal from './modal/modal';;

const App = () => (
    <div>
        <Modal />
        <header className="container login-header">
            <h1>STRIVE</h1>
            <GreetingContainer />
        </header>
    </div>
);

export default App;