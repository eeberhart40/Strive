import React from 'react';
import GreetingContainer from './greeting/greeting_container';
import Splash from './splash/splash';
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
        <Splash />
    </div>
);

export default App;