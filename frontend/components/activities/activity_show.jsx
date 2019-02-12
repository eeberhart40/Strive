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
                <header><h1>{activity.title} - {activity.sport}</h1></header>
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