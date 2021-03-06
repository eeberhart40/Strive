import * as ActivityApiUtil from  '../util/activity_api_util';

export const RECEIVE_ALL_ACTIVITIES = "RECEIVE_ALL_ACTIVITIES";
export const RECEIVE_ACTIVITY = "RECEIVE_ACTIVITY";
export const REMOVE_ACTIVITY = "REMOVE_ACTIVITY";
export const RECEIVE_ACTIVITIES_ERRORS = "RECEIVE_ACTIVITIES_ERRORS";

const receiveAllActivities = (activities) => {
    return({
        type: RECEIVE_ALL_ACTIVITIES,   
        activities: activities
    });
};

const receiveActivity = activity => {
    return({
        type: RECEIVE_ACTIVITY,   
        activity
    });
};

const removeActivity = activityId => {
    return({
        type: REMOVE_ACTIVITY,   
        activityId
    });
};

export const receiveErrors = errors => ({
    type: RECEIVE_ACTIVITIES_ERRORS,
    errors
});


export const fetchActivities = () => dispatch => {
    return (
        ActivityApiUtil.fetchActivities().then(
            activities => dispatch(receiveAllActivities(activities)))
        );
};

export const fetchActivity = id => dispatch => {
    return (
        ActivityApiUtil.fetchActivity(id).then(
            activity => dispatch(receiveActivity(activity)))
        );
};

export const createActivity = activity => dispatch => {
    return (
        ActivityApiUtil.createActivity(activity).then(
            activity => {
                dispatch(receiveActivity(activity));
                return activity;
            },
            err => (dispatch(receiveErrors(err.responseJSON))
            )
        ));
}

export const deleteActivity = id => dispatch => {
    return (
        ActivityApiUtil.deleteActivity(id).then(
            () => dispatch(removeActivity(id)))
    );
};

export const updateActivity = activity => dispatch => {
    return (
        ActivityApiUtil.updateActivity(activity).then(
            activity => {
                dispatch(receiveActivity(activity));
                return activity;
            },
            err => (dispatch(receiveErrors(err.responseJSON))
            )
    ));
};

