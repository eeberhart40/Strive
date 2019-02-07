export const fetchActivities = () => {
    return (
        $.ajax({
            method: "GET",
            url: `api/activities`
        })
    );
};

export const fetchActivity = id => {
    return (
        $.ajax({
            method: "GET",
            url: `api/activities/${id}`
        })
    );
};

export const deleteActivity = id => {
    return (
        $.ajax({
            method: "DELETE",
            url: `api/activities/${id}`
        })
    );
};

export const createActivity = activity => {
    return (
        $.ajax({
            method: "POST",
            url: `api/activities`,
            data: { activity }
        })
    );
};


export const updateActivity  = activity => {
    return(
        $.ajax({
            method: "PATCH",
            url: `api/activities/${activity.id}`,
            data: { activity }
        })
    )
}