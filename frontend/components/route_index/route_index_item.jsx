import React from 'react';
import { Link } from 'react-router-dom';
import IndexRoute from '../route_map/index_route';



const RouteIndexItem = (props) => {

    let route = props.route;

    return(
        <div className="route-index-item">
            Route: <Link to={`/routes/${route.id}`}>{route.title}</Link>
            <div id="map-thumb">
                    <IndexRoute 
                    route={route}/>
                </div>
        </div>
    )
}

export default RouteIndexItem;

