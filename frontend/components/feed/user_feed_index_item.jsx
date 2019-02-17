import React from 'react';
import FeedRoute from '../route_map/feed_route';
import { Link } from 'react-router-dom';

class UserFeedIndexItem extends React.Component {
    constructor(props) {
        super(props);
        this.timeStr = this.timeStr.bind(this);
    }

    componentDidMount() {
        this.props.fetchActivity(this.props.activityId);

        if(this.props.routeId){
            this.props.fetchRoute(this.props.routeId);
        }
    }

    componentDidUpdate(prevProps) {
        if(!prevProps.route) {
            this.props.fetchRoute(this.props.activity.route_id);
        }
    }

    timeStr(timeStr) {
        let timeArr = timeStr.split(":");
        let hours = parseInt(timeArr[0]);
        let mins = parseInt(timeArr[1]);

        if ( hours >= 0 && mins >= 0) {
            return `${hours}h ${mins}m`
        }

        return "n/a";

    }

    render() {
        const route = this.props.route;
        const activity = this.props.activity;
        return(
            <div className="activity-feed-entry">
                <div className="feed-entry-header">
                    <div className="avatar-img wrapper"></div>
                    <div className="media-body">
                        <div className="username"><strong>{this.props.user.username}</strong></div>
                        <div className="under-stats feed-date">{Date(activity.created_at).slice(0, 15)}</div>
                    </div>
                </div>
                <div className="feed-entry-body">
                <div className="feed-icon">
                    {activity.sport === "bike" ? (
                        <span className="bike-img"></span>) :
                        <span className="run-img"></span>}
                </div>
                    <div className="activity-info-container">
                        <div className="feed-title">
                            <strong><Link to={`activities/${activity.id}`}>{activity.title}</Link></strong></div>
                        <ul className="list-stats">
                            <li>
                                {activity.distance} mi
                                <div className="under-stats">Distance</div>
                                </li>
                            {activity.elevation ? (
                                <li>
                                {activity.elevation} ft
                                    <div className="under-stats">Elevation</div>
                                </li> ) : null}
                            
                            {activity.time ? (
                            <li>
                                {this.timeStr(activity.time)}
                                <div className="under-stats">Time</div>
                            </li>
                            ) : "" }
                        </ul>
                    </div>
                </div>
                {route ? (
                <div className="feed-map-container">
                    <FeedRoute
                        route={route}
                    />
                </div>
                ) : null}
                <div className="feed-entry-header"></div>
            </div>
        )
    }
}

export default UserFeedIndexItem;