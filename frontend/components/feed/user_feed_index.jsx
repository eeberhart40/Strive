import React from 'react';
import UserFeedIndexItem from './user_feed_index_item';

class UserFeedIndex extends React.Component {

    componentDidMount() {
        this.props.fetchActivities();
        this.props.fetchRoutes();
    }

    render() {
        let activities = Object.values(this.props.activities).reverse().map(activity => {
            // debugger
            return (
                <UserFeedIndexItem
                    key={activity.id}
                    activityId = {activity.id}
                    routeId = {activity.route_id}
                    activity={activity}
                    route={this.props.routes[activity.route_id]}
                    user = {this.props.currentUser}
                    fetchActivity = {this.props.fetchActivity}
                    fetchRoute={this.props.fetchRoute}
                    // fetchRoutes={this.props.fetchRoutes}
                />
            );
        });

        let actCount = Object.keys(this.props.activities).length;
         
        if (actCount > 0) {
            return (
            <div className="user-feed-index-container">
                {activities}
            </div>
            );
        } else {
        return (
            <div className="no-activities-msg">
                no recent activities
            </div>
        );
        }
    }

}

export default UserFeedIndex;