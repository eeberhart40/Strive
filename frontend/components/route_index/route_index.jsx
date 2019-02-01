import React from 'react';
import RouteIndexItem from './route_index_item';
import { Link } from 'react-router-dom';


class RouteIndex extends React.Component {

    componentDidMount() {

        this.props.fetchRoutes();
    }

    render() {
     
        let routes = Object.values(this.props.routes).map(route => {
            return(
                <RouteIndexItem 
                key={route.id}
                route={route}
                deleteRoute={this.props.deleteRoute}
                />
            );
        });
        return (
            <div className="index-container">
                <div className='index-bar'>
                    <h1>My Routes</h1>
                    <button id='create-route-btn'><Link to={'routes/new'}>Create New Route</Link></button>
                </div>
                <div className="bottom-border"></div>
                <ul className="index-list">
                    {routes}
                </ul>
            </div>
        );
    };
};

export default RouteIndex;