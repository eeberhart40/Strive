import React from 'react';
import { Link } from 'react-router-dom';
import RouteMap from '../route_map/route_map';

const RouteIndexItem = (props) => {

    let route = props.route;
    // let athleteId = props.route.athlete_id;
    // let athlete = state.athletes[athleteId];
    return(
        <div className="route-index-item">
            Route: <Link to={`/routes/${route.id}`}>{route.route_data}</Link>
                <div id="map-thumb">
                    <RouteMap />
                </div>
        </div>
    )
}

export default RouteIndexItem;

