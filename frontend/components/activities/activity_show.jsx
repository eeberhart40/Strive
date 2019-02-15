import React from 'react'
import ShowRoute from '../route_map/show_route';

class ActivityShow extends React.Component {
    
    componentDidMount(){

        this.props.fetchActivity(this.props.activityId);
        
        if(this.props.routeId){
            this.props.fetchRoute(this.props.routeId);
        }
    }

    componentDidUpdate(prevProps) {
        if(!prevProps.route.id) this.props.fetchRoute(this.props.activity.route_id);
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
                        </div>
                    </div>
                    <div className="details-container-stats">
                        <ul className="inline-stats">
                            <li><strong>{activity.distance} mi</strong></li>
                            <li><strong>{activity.time}</strong></li>
                            <li><strong>{activity.elevation} ft</strong></li>
                        </ul>
                        <div className="more-stats"></div>
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