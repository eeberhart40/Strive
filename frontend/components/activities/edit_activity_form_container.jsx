import React from 'react';
import { connect } from 'react-redux';
import ActivityForm from './activity_form';
import { fetchActivity, updateActivity } from '../../actions/activity_actions';

const msp = (state, ownProps) => {
    const activity = state.entities.activites[ownProps.match.params.activityId];
    const formType = "Edit Activity"

    return({
        activity,
        formType
    })
}

const mdp = dispatch => {
    return {
        fetchActivity: id => dispatch(fetchActivity(id)),
        action: activity => dispatch(updateActivity(activity))
    }
}

class EditActivityForm extends React.Component {
    componentDidMount(){
        this.props.fetchActivity(this.props.match.pararms.activityId);
    }

    componentDidUpdate(prevProps){
        if(prevProps.activity.id != this.props.match.params.activityId) {
            this.props.fetchActivity(this.props.match.params.activityId);
        }
    }

    render() {
        const { action, formType, activity } = this.props;
        return (
            <ActivityForm 
            action={action}
            formType={formType}
            activity={activity} />
        );
    }
}

export default connect(msp, mdp)(EditActivityForm);