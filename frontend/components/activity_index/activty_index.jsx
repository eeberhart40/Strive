import React from 'react';
import ActivityIndexItem from './activity_index_item';
import { Link } from 'react-router-dom';

class ActivityIndex extends React.Component {
    componentDidMount() {

        this.props.fetchActivities();
    }

    render(){
        
        let activities = Object.values(this.props.activities).map(route => {
            return (
                <ActivityIndexItem 
                key={activity.id}
                activity={activity}
                updateActivity={this.props.updateActivity}
                deleteActivity={this.props.deleteActivity}
                />
            )
        })

    }
}

export default ActivityIndex;