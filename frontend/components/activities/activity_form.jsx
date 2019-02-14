import React from 'react';
import { withRouter } from 'react-router-dom';
import ActivityRouteIndex from './create_activity_route_index';

//figure out how to display errors

class ActivityForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.activity;
        this.state.routeTitle = '';
        this.state.athlete_id = this.props.athleteId;
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.props.fetchRoutes();
    }


    update(field) {
        return (e) => {
            this.setState({ [field]: e.target.value });
        };
    }

    handleSubmit(e) {
        // if (this.state.routeTitle === '') return
        e.preventDefault();
        Object.values(this.props.routes).some(route => {
            if(route.title === this.state.routeTitle) {
                this.state.route_id = route.id;
                this.state.sport = JSON.parse(route.route_data).sport;
                return true;
            }
        })
        delete this.state.routeTitle;
        const activity = Object.assign({}, this.state);
        this.props.action(activity).then(({activity}) => {
            this.props.history.replace(`/activities/${activity.id}`)});
        // .then(() => this.props.history.push('/'));
    }

    render() {

        const errors = this.props.errors.map((error, i) => {
            return (
                <li key={`error-${i}`}>{error}</li>
            )
        });

        const routes = Object.values(this.props.routes);
        debugger
        return (
            <div className='activity-form-container'>
                <form onSubmit={this.handleSubmit}>
                    <h3>{this.props.formType}</h3>
                    <ul className="activities-errors">
                        {errors}
                    </ul>
                    <br/>
                    <div className="activity-form">
                        {/* <label className= 'activity-input route'>
                            Choose a Route 
                            <select id="select-route" onChange={this.update('routeTitle')}>
                                <option></option>
                                {routes}
                            </select>
                        </label> */}
                        <label className= 'activity-input title'>
                            Title
                            <input
                            type="text"
                            value={this.state.title}
                            onChange={this.update('title')}
                            />
                        </label>
                        <label className= 'activity-input time'>
                            Duration (hh:mm:ss)
                            <input type="text"
                            value={this.state.time}
                            onChange={this.update('time')}
                            />
                        </label>
                        <label className= 'activity-input distance'>
                            Distance
                            <input type="text"
                            value={this.state.distance}
                            onChange={this.update('distance')}
                            />
                        </label>
                        <label className='activity-input elevation'>
                            Elevation
                            <input type="text"
                            value={this.state.elevation}
                            onChange={this.update('elevation')}
                            />
                        </label>
                        <label className= 'activity-input elevation'>
                            Description 
                            <textarea
                                value={this.state.description}
                                onChange={this.update('description')} />
                        </label>

                        <input type="submit" value={this.props.formType} />
                    </div>
                </form>
                {routes ? (<div className="map-index">
                    <ActivityRouteIndex
                        fetchRoutes={this.props.fetchRoutes}
                        routes={routes}
                    />
                </div>) : null}
           
            </div>
        );
    }
}

export default withRouter(ActivityForm);