import React from 'react';
import RouteIndexItem from './route_index_item';

class RouteIndex extends React.Component {

    componentDidMount() {

        this.props.fetchRoutes();
    }

    render() {
     
        let routes;
        if (!(this.props.routes instanceof Array)) {
           routes = <div></div>
        } else  {
        routes = this.props.routes.map(route => {
            return(
                <RouteIndexItem 
                key={route.id}
                route={route}
                deleteRoute={this.props.deleteRoute}
                />
            );
        });
    };
        return (
            <div>
                <ul>
                    {routes}
                </ul>
            </div>
        );
    };
};

export default RouteIndex;