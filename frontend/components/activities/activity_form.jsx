import React from 'react';
import { withRouter } from 'react-router-dom';

class ActivityForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.activity;
        this.state.athlete_id = this.props.athleteId;
        this.state.routeTitle = this.props.routeTitle;
        this.state.route_id = this.props.routeId;
        this.state.sport = this.props.sport;
        this.state.distance = this.props.distance;
        this.state.elevation = this.props.elevation;
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    update(field) {
        return (e) => {
            this.setState({ [field]: e.target.value });
        };
    }

    handleSubmit(e) {
        e.preventDefault();

        delete this.state.routeTitle;
        const activity = Object.assign({}, this.state);
        this.props.action(activity).then((activity) => {
            this.props.closeModalAct();
            this.props.history.replace(`/activities/${activity.id}`);
        });

    }

    render() {

        const errors = this.props.errors.map((error, i) => {
            return (
                <li key={`error-${i}`}>{error}</li>
            )
        });

        const routes = Object.values(this.props.routes);
        return (
            <div className='activity-form-container'>
                <form className='activity-form' onSubmit={this.handleSubmit}>
                    <h2>{this.props.formType}</h2>
                    <ul className="errors">
                        {errors}
                    </ul>
                    {this.props.elevation ? 
                    <h3>Elevation: {this.props.elevation} ft</h3> :
                    null}
                    <h3>Distance: {this.props.distance} mi</h3>
                    <br/>
                    <div className="activity-form">
                        <label className= 'activity-input time'>
                            Duration:
                            <input 
                            type="text" 
                            value={this.state.time}
                            placeholder="00:00:00"
                            onChange={this.update('time')}/>
                        </label>
                        <label className= 'activity-input title'>
                            Title
                            <input
                            type="text"
                            value={this.state.title}
                            onChange={this.update('title')}
                            />
                        </label>
                        <label className= 'activity-input description'>
                            Description 
                            <textarea
                                value={this.state.description}
                                onChange={this.update('description')} />
                        </label>
                        <input id="create-activity-btn-2" type="submit" value={this.props.formType}/>
                        <button onClick={this.props.closeModalAct} id="cancel-activity-btn">Cancel</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default withRouter(ActivityForm);