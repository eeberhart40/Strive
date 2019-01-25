import React from 'react';

const RouteIndexItem = (props) => {

    let route = props.route;
    // let athleteId = props.route.athlete_id;
    // let athlete = state.athletes[athleteId];
    return(
        <div>
            {route.route_data}
            <button onClick={() => props.deleteRoute(route.id)}>Delete</button>
        </div>
    )
}

export default RouteIndexItem;