import React from 'react';
import { Link } from 'react-router-dom';

const RouteIndexItem = (props) => {

    let route = props.route;
    // let athleteId = props.route.athlete_id;
    // let athlete = state.athletes[athleteId];
    return(
        <div>
            Route: <Link to={`/routes/${route.id}`}>{route.route_data}</Link>
            <button onClick={() => props.deleteRoute(route.id)}>Delete</button>
        </div>
    )
}

export default RouteIndexItem;

