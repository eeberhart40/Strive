import React from 'react';
import UserFeedIndexItem from './user_feed_index_item';

class UserFeedIndex extends React.Component {

    componentDidMount() {
        this.props.fetchActivities();
    }

    render() {
        let activities = Object.values(this.props.activities).reverse().map(activity => {
            return (
                <UserFeedIndexItem
                    key={activity.id}
                    activity={activity}
                    fetchRoute={this.props.fetchRoute}
                    fetchRoutes={this.props.fetchRoutes}
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