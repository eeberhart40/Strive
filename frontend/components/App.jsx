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
import RouteIndexContainer from './route_index/route_index_container';
import RouteShowContainer from './route_show/route_show_container'

const App = () => (
    <div>
        <Modal />
        <header className="container login-header">
            <h1>STRIVE</h1>
            <GreetingContainer />
        </header>
        <AuthRoute exact path="/" component={Splash} />
        <ProtectedRoute path="/dashboard" component={Dashboard}/>
        <ProtectedRoute path="/routes" component={RouteIndexContainer}/>
        <Route path="/routes/:routeId" component={RouteShowContainer} />
    </div>
);

export default App;