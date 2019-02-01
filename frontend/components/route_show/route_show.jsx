import React from 'react';
import ShowRoute from '../route_map/show_route';
import { Link } from 'react-router-dom';


class RouteShow extends React.Component {
    componentDidMount(){
        this.props.fetchRoute(this.props.routeId);
        this.deleteRoute = this.deleteRoute.bind(this);
    }

    deleteRoute(){
        this.props.deleteRoute(this.props.route.id).then(this.props.history.replace('/routes'));
    }

// const RouteShow = ({ route, routeId, fetchRoute, deleteRoute }) 
    render() {
        let route = this.props.route;
        return (
            <div>
                <h1>{route.title}</h1>
                { route.route_data ? (<div className="map-show">
                    <ShowRoute
                    route={route}
                    />
                </div> ) : null }
                <button id="delete-route-btn" onClick={this.deleteRoute}>Remove</button>
            </div>
        )
    }
}   

export default RouteShow;