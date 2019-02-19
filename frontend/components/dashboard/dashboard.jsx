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

    let numRides = 0;
    let rideMiles = 0;
    let runMiles = 0;
    let numRuns = 0;
    actIds.forEach(id => {
        if(activities[id].sport === "bike") {
            numRides += 1;
            rideMiles += activities[id].distance;
        } else {
            numRuns += 1;
            runMiles += activities[id].distance;
        }
    })


    return {
        currentUser: athletes[session.id],
        activities,
        latestActivity,
        activityCount,
        routeCount,
        numRides,
        numRuns,
        rideMiles,
        runMiles 
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
        this.state = {icon: "bike", miles: this.props.rideMiles, num: this.props.numRides};

        this.switchSport = this.switchSport.bind(this);
        this.dispRides = this.dispRides.bind(this);
        this.dispRuns = this.dispRuns.bind(this);
    }

    componentDidMount(){
        this.props.fetchActivities();
        this.props.fetchRoutes();
    }

    switchSport() {
        this.icon === "bike" ? this.icon = "run" : this.icon = "bike";
    }

    dispRides() {
        this.setState({ icon: "bike", miles: this.props.rideMiles, num: this.props.numRides});

    }

    dispRuns() {
        this.setState({ icon: "run", miles: this.props.runMiles, num: this.props.numRuns});
    }

    render() {

        return (
            <div className="dash-bg">
                <div className="dashboard-container">
                    <div className="left col">
                        <div className="profile">
                            <div className="card-body">
                                <div className="avatar-img prof-img">
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
                                    <div className="no-acts" id="no-act-message">No activties yet. <Link to={'activities/new'}>Record one!</Link></div> }
                                </div>
                            </div>
                        </div>
                        <div className="tabbed-card">
                            <ul className="tabs">
                                <li id="rides">
                                    <div className="tab tab1">
                                        <button
                                        onClick={this.dispRides} 
                                        id="bike-btn" 
                                        className="icon-btn">
                                        bike
                                        </button>
                                    </div>
                                </li>
                                <li id="runs">
                                    <div className="tab">
                                        <button
                                        onClick={this.dispRuns} 
                                        id="run-btn"
                                        className="icon-btn">
                                        run
                                        </button>
                                    </div>
                                </li>
                            </ul>
                            <div>{this.state.icon}</div>
                            <div>{this.state.num}</div>
                            <div>{this.state.miles}</div>
                        </div>
                    </div>
                    <div className="dashboard-feed">
                        <h3>Your Activities v</h3>
                        <div className="feed-container">
                            <UserFeedIndexContainer />
                        </div>
                    </div>
                    <div className="right col">
                        <div className="section" id="linked-in">
                            <div className="media">
                                <div className="media-object">
                                    <img 
                                    className="media-img" 
                                        src="https://image.flaticon.com/icons/svg/56/56591.svg" 
                                    alt="linked-in Icon"/>
                                </div>
                                <div className="media-body">
                                    <h4 className="media-title">My LinkedIn</h4>
                                    <p className="media-text">
                                        Check out my LinkedIn. It's got all the info
                                        you could ever need to hire me, Eric Eberhart.
                                    </p>
                                    <a className="media-link" href="https://www.linkedin.com/in/eric-eberhart-0148a8175/">
                                        View All the LinkedIn Stuff
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="section" id="github">
                            <div className="media">
                                <div className="media-object">
                                    <img
                                        className="media-img"
                                        src="https://cdn3.iconfinder.com/data/icons/social-icons-24/24/Github-512.png"
                                        alt="github Icon" />
                                </div>
                                <div className="media-body">
                                    <h4 className="media-title">My Github</h4>
                                    <p className="media-text">
                                        Take a look at my Github. There's a decent chance that I'm tinkering 
                                        with code and committing at this very moment.
                                    </p>
                                    <a className="media-link" href="https://github.com/eeberhart40">
                                        View All the Github Stuff
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="section" id="pig">
                            <div className="media">
                                <div className="media-object">
                                    <img
                                        className="media-img"
                                        src="https://image.flaticon.com/icons/svg/26/26144.svg"
                                        alt="pig Icon" />
                                </div>
                                <div className="media-body">
                                    <h4 className="media-title">When Pigs Fly</h4>
                                    <p className="media-text">
                                        Play my game! It's super fun and simple:
                                        avoid the other animals. Built with vanilla JavaScript
                                        and HTML.
                                    </p>
                                    <a className="media-link" href="https://eeberhart40.github.io/when-pigs-fly/">
                                        View All the Fun Piggy Stuff
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )

    }
};

export default connect(msp, mdp)(Dashboard);