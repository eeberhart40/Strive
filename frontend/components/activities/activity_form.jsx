import React from 'react';
import { withRouter } from 'react-router-dom';


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
        this.props.action(this.state);
        // .then(() => this.props.history.push('/'));
    }

    render() {

        const errors = this.props.errors.map((error, i) => {
            return (
                <li key={`error-${i}`}>{error}</li>
            )
        });

        const routes = Object.values(this.props.routes).map(route => {
            return(
                <option key={route.id}>{route.title}</option>
            );
        });

        return (
            <div className='activity-form-container'>
                <form onSubmit={this.handleSubmit}>
                    <h3>{this.props.formType}</h3>
                    <ul className="activities-errors">
                        {errors}
                    </ul>
                    <br/>
                    <div className="activity-form">
                        <label className= 'activity-input route'>
                            Choose a Route 
                            <select id="select-route" onChange={this.update('routeTitle')}>
                                <option></option>
                                {routes}
                            </select>
                        </label>
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
            </div>
        );
    }
}

export default withRouter(ActivityForm);