import React from 'react';
import ActivityIndexItem from './activity_index_item';
import { Link } from 'react-router-dom';

class ActivityIndex extends React.Component {
    componentDidMount() {

        this.props.fetchActivities();
    }

    render(){
        
        let activities = Object.values(this.props.activities).map(activity => {
            return (
                <ActivityIndexItem 
                key={activity.id}
                activity={activity}
                updateActivity={this.props.updateActivity}
                deleteActivity={this.props.deleteActivity}
                fetchRoute={this.props.fetchRoute}
                />
            );
        });
        return (
            <div className="activity-index-container">
                <div className='index-bar'>
                    <h1>My Activities</h1>
                    {/* <button id='create-activity-btn'><Link to={'activities/new'}>Create New Activity</Link></button> */}
                </div>
                <div className="activities-table-container">
                    <table className="activitites-table">
                        <thead>
                            <tr>
                                <th className="col-sport">Sport</th>
                                <th className="col-date">Date</th>
                                <th className="col-title">Title</th>
                                <th className="col-time">Time</th>
                                <th className="col-distance">Distance</th>
                                <th className="col-elevation">Elevation</th>
                            </tr>
                        </thead>
                        <tbody className="actvity-index-list">
                                {activities}
                        </tbody>
                    </table>
                </div>
            </div>
        );

    }
}

export default ActivityIndex;