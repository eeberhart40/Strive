import React from 'react';
import RouteMap from '../route_map/route_map';
import { Link } from 'react-router-dom';


const RouteShow = ({ route, routeId, fetchRoute, deleteRoute }) => {
    
    return (
        <div>
            Route Id: {routeId}
            <div className="map-show">
                <RouteMap
                routeId={routeId}
                route={route}
                fetchRoute={fetchRoute}
                />
            </div>
            <button onClick={() => deleteRoute(routeId)}>Delete</button>
            <Link to={'/routes'}>Back to Index</Link>
        </div>
    )
}

export default RouteShow;