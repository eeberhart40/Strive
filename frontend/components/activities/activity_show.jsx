import React from 'react'
import ShowRoute from '../route_map/show_route';

class ActivityShow extends React.Component {

    componentDidMount(){
        this.props.fetchActivity(this.props.activityId);
        this.props.fetchRoute(this.props.routeId);
    }

    render() {
        const route = this.props.route;
        const activity = this.props.activity;
        return(
            <div className="show-activity-container">
                <h1>{activity.title}</h1>
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