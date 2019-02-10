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
        let count = Object.keys(this.props.activities).length;
        let countDisp;
        count === 1  ? countDisp = `1 Activity` : countDisp = `${count} Activities`
        return (
            <div className="activity-index-container">
                <div className='activity-index-bar'>
                    <h1>My Activities</h1>
                    <h2>{countDisp}</h2>
                    <h3></h3>
                    {/* <button id='create-activity-btn'><Link to={'activities/new'}>Create New Activity</Link></button> */}
                </div>
                <div className="activities-table-container">
                    <table className="activities-table">
                        <thead className="activity-table-head">
                            <tr>
                                <th className="act-col col-sport">Sport</th>
                                <th className="act-col col-date">Date</th>
                                <th className="act-col col-title">Title</th>
                                <th className="act-col col-time">Time</th>
                                <th className="act-col col-distance">Distance</th>
                                <th className="act-col col-elevation">Elevation</th>
                                <th className="act-col"></th>
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