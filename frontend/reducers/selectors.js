export const selectRoute = (routes, routeId) => { 
    return routes[routeId] || {}
};

export const selectActivity = (activities, activityId) => { 
    return activities[activityId] || {}
};

