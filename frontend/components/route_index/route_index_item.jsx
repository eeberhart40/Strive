import React from 'react';
import { Link } from 'react-router-dom';
import IndexRoute from '../route_map/index_route';



const RouteIndexItem = (props) => {

    let route = props.route;

    return(
        <div className="route-index-item">
            <div id="map-container">
                    <IndexRoute 
                    route={route}/>
                </div>
        </div>
    )
}

export default RouteIndexItem;

