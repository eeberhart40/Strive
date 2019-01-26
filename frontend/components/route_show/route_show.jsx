import React from 'react';
import RouteMap from '../route_map/route_map';
import { Link } from 'react-router-dom';
const RouteShow = ({ route, routeId, fetchRoute, deleteRoute }) => {
  
    return (
        <div>
            <div className="map-show">
                <RouteMap
                key={routeId}
                route={route}
                />
            </div>
            <Link to={'/routes'}>Back to Index</Link>
        </div>
    )
}

export default RouteShow;