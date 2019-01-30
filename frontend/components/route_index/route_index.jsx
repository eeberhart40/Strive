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
            <div>
                <ul>
                    {routes}
                </ul>
                <Link to={"/dashboard"}>Home</Link>
            </div>
        );
    };
};

export default RouteIndex;