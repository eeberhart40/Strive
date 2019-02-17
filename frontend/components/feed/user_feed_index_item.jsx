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
        // debugger
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
                    <div>{this.props.user.username}</div>
                </div>
                <div className="feed-entry-body">
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