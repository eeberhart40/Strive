import React from 'react'
import ShowRoute from '../route_map/show_route';

class ActivityShow extends React.Component {
    constructor(props) {
        super(props);
        this.avgSpeed = "";
        this.avg = this.avg.bind(this);


    }
    
    componentDidMount(){

        this.props.fetchActivity(this.props.activityId);
        if(this.props.routeId){
            this.props.fetchRoute(this.props.routeId);
        }
    }

    componentDidUpdate(prevProps) {
        if(!prevProps.route.id) {
            this.props.fetchRoute(this.props.activity.route_id);
            this.avgSpeed = this.avg(this.props.activity.distance, this.props.activity.time);
        }
    }

    avg(distance, timeStr) {
        let timeArr = timeStr.split(":");
        let hours = parseInt(timeArr[0]) + parseInt(timeArr[1]) / 60 + parseInt(timeArr[2])/ 3600;
        let avg = distance / hours
        
        if (avg > 0) {
            return `${avg.toFixed(2)} mi/h`
        } 

        return "n/a";

    }

    render() {
        const route = this.props.route;
        const activity = this.props.activity;
        return(
            <div className="show-activity-container">
            <section className="with-border" id="activity-heading">
                <header className="activity-show-header"><h1>{this.props.currentUser.username} - {activity.sport}</h1></header>
                <div className="activity-summary-container">
                    <div className="activity-summary">
                        <div className="details-container-personal">
                                <div id="prof-image" className="avatar-img">
                                </div>
                                <p>{Date(activity.created_at).slice(0, 15)}</p>
                                <h1>{activity.title}</h1>
                        </div>
                    </div>
                    <div className="details-container-stats">
                        <ul className="inline-stats">
                            <li>
                                <strong>{activity.distance} mi</strong>
                                <div className="under-stats">Distance</div>
                            </li>
                            <li>
                                <strong>{activity.time}</strong>
                                <div className="under-stats">Duration</div>
                            </li>
                            {activity.elevation ? (
                                <li>
                                    <strong>{activity.elevation} ft</strong>
                                        <div className="under-stats"></div>
                                </li>
                            ) : null }
                        </ul>
                        <div className="more-stats">
                                <div className="under-stats" id="speed">Speed</div>
                                <div id="avg">
                                    <div className="under-stats">Avg</div>
                                    <div>
                                        {this.avgSpeed}
                                    </div>
                                </div>
                        </div>
                        <div className="link-section"></div>
                    </div>
                </div>
            </section>
                {route.route_data ? (<div className="map-show">
                    <ShowRoute
                        route={route}
                    />
                </div>) : null}
            </div>
        )
    }

}

export default ActivityShow;