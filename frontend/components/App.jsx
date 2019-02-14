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
import NewRoute from './route_map/new_route';
import ActivityIndexContainer from './activities/activity_index_container';
import EditActivityContainer from './activities/edit_activity_form_container';
import CreateActivityContainer from './activities/create_activity_form_container'
import ActivityShowContainer from './activities/activity_show_container';
import ActivityRouteIndexContainer from './activities/activity_route_index_container';

const App = () => (
    <div>
        <Modal />
        <div className="header-container">
            <header className="container login-header">
                <h1><Link id="logo" to={'/dashboard'}>STRIVE</Link></h1>
                <GreetingContainer />
            </header>
        </div>
        <Switch>
        <AuthRoute exact path="/" component={Splash} />
        <ProtectedRoute path="/dashboard" component={Dashboard}/>
        <ProtectedRoute exact path="/routes/new" component={NewRoute} />
        <ProtectedRoute path="/routes/:routeId" component={RouteShowContainer} />
        <ProtectedRoute path="/routes" component={RouteIndexContainer}/>
        <ProtectedRoute exact path="/activities/new" component={ActivityRouteIndexContainer} />
        <ProtectedRoute exact path="/activities/:activityId" component={ActivityShowContainer} />
        {/* <ProtectedRoute exact path="/activities/:activityId/edit" component={EditActivityContainer} /> */}
        <ProtectedRoute path="/activities" component={ActivityIndexContainer} />
        </Switch>
    </div>
);

export default App;