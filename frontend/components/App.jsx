import React from 'react';
import GreetingContainer from './greeting/greeting_container';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import Modal from './modal/modal';;
import {
    Route,
    Redirect,
    Switch,
    Link,
    HashRouter
} from 'react-router-dom';
import Splash from './splash/splash';
import Dashboard from './dashboard/dashboard';
import RouteIndexContainer from './routes/route_index_container';

const App = () => (
    <div>
        <Modal />
        <header className="container login-header">
        
            <h1>STRIVE</h1>
            <GreetingContainer />
        </header>
        <AuthRoute exact path="/" component={Splash} />
        <ProtectedRoute exact path="/dashboard" component={Dashboard}/>
        <ProtectedRoute exact path="/routes" component={RouteIndexContainer}/>
    </div>
);

export default App;