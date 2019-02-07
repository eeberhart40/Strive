import React from 'react';
import { Link } from 'react-router-dom';


const ActivityIndexItem = (props) => {
    
    let activity = props.activity;
    // let routeId = activity.route_id;
    // let route = props.fetchRoute(routeId);
    // debugger
    // let routeData = JSON.parse(route.route_data);

    return(
        <tr className="activity-index-item-row">
            <td className="view-col col-sport">{activity.sport}</td>
            <td className="view-col col-date">{Date(activity.created_at).slice(0,15)}</td>
            <td className="view-col col-title">{activity.title}</td>
            <td className="view-col col-time">{activity.time}</td>
            <td className="view-col col-distance">{activity.distance}</td>
            <td className="view-col col-elevation">{activity.elevation}</td>
            <td className="view-col col-actions">
                <ul className="activity-action-list">
                    {/* <li><Link to={}>Edit</Link></li> */}
                    <li><button id="delete-activity-btn" onClick={() => props.deleteActivity(activity.id)}>Delete</button></li>
                </ul>
            </td>
        </tr>
    )
}

export default ActivityIndexItem;