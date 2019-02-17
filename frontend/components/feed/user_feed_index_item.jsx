import React from 'react';
import FeedRoute from '../route_map/feed_route';
import { Link } from 'react-router-dom';

class UserFeedIndexItem extends React.Component {
    constructor(props) {
        super(props);
        
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
                    <div className="feed-title">{activity.title}</div>
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