import React from 'react';
import ShowRoute from '../route_map/show_route';
import { Link } from 'react-router-dom';


class RouteShow extends React.Component {
    componentDidMount(){
        this.props.fetchRoute(this.props.routeId);
    }

// const RouteShow = ({ route, routeId, fetchRoute, deleteRoute }) 
    render() {
        let route = this.props.route;
        return (
            <div>
                Route ID: {route.id}
                <div className="map-show">
                    <ShowRoute
                    route={route}
                    />
                </div>
                <button onClick={() => this.props.deleteRoute(route.id)}>Delete</button>
                <Link to={'/routes'}>Back to Index</Link>
            </div>
        )
    }
}   

export default RouteShow;