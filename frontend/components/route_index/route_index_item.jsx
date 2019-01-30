import React from 'react';
import { Link } from 'react-router-dom';
import IndexRoute from '../route_map/index_route';



const RouteIndexItem = (props) => {

    let route = props.route;
    // let athleteId = props.route.athlete_id;
    // let athlete = state.athletes[athleteId];

    let styles = {
        width: '270px',
        height: '170px'
    }

    return(
        <div className="route-index-item">
            Route: <Link to={`/routes/${route.id}`}>{route.route_data}</Link>
            <div id="map-thumb">
                    <IndexRoute />
                </div>
        </div>
    )
}

export default RouteIndexItem;

