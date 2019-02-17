import React from 'react';
import { connect } from 'react-redux';
import { fetchActivity, fetchActivities } from '../../actions/activity_actions';
import { fetchRoutes } from '../../actions/map_route_actions';
import { Link } from 'react-router-dom';
import UserFeedIndexContainer from '../feed/user_feed_index_container';

const msp = ({ session, entities: { athletes, activities, routes } }) => {

    const actIds = Object.keys(activities);
    const latestActivity = activities[actIds[actIds.length - 1]];
    const activityCount = actIds.length;
    const routeCount = Object.keys(routes).length;
    return {
        currentUser: athletes[session.id],
        activities,
        latestActivity,
        activityCount,
        routeCount 
    };
};

const mdp = dispatch => {
    return {
        fetchActivity: (id) => dispatch(fetchActivity(id)),
        fetchActivities: () => dispatch(fetchActivities()),
        fetchRoutes: () => dispatch(fetchRoutes())
    }
}



class Dashboard extends React.Component {
    constructor(props) {
        super(props)
        this.latestActivity = this.props.latestActivity;
    }

    componentDidMount(){
        this.props.fetchActivities();
        this.props.fetchRoutes();
    }

    render() {
        return (
            <div className="dash-bg">
                <div className="dashboard-container">
                    <div className="left col">
                        <div className="profile">
                            <div className="card-body">
                                <div className="avatar-img">
                                </div>
                                <h3 id="username">{this.props.currentUser.username}</h3>
                                <div className="upper-card">
                                    <div className="user-stats">
                                        <div className="routes">
                                            <label className="dash-stats">Routes</label>
                                            <h3>{this.props.routeCount}</h3>
                                        </div>
                                        <div className="activities">
                                            <label className="dash-stats">Activities</label>
                                            <h3>{this.props.activityCount}</h3>
                                        </div>
                                    </div>
                                </div>
                                </div>
                            <div className="card-footer">
                                <div className="latest-activity">
                                    {this.props.activityCount > 0 ? (
                                        <div className="lates-act-container">
                                            <div className="dash-stats">Latest Activity</div>
                                            <div className="act-title"><Link to={`activities/${this.props.latestActivity.id}`}>{this.props.latestActivity.title} •</Link></div>
                                            <div className="dash-stats">{Date(this.props.latestActivity.created_at).slice(0, 15)}</div>
                                        </div>
                                    ) : 
                                    <div id="no-act-message">No activties yet. <Link to={'activities/new'}>Record one!</Link></div> }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="dashboard-feed">
                        <h3>your activities v</h3>
                        <UserFeedIndexContainer />
                    </div>
                    <div className="right col">
                        <div className="col-div">
                            <h3>Challenges</h3>
                        </div>
                        <div className="col-div">
                            <h3>Clubs</h3>
                        </div>
                        <div className="col-div">
                            <h3>Try a Privacy Zone</h3>
                        </div>
                    </div>
                </div>
            </div>
        )

    }
};

export default connect(msp, mdp)(Dashboard);