import * as ApiUtil from '../util/map_routes_util';
export const RECEIVE_ALL_ROUTES = "RECEIVE_ALL_ROUTES";
export const RECEIVE_ROUTE = "RECEIVE_ROUTE";
export const REMOVE_ROUTE = "REMOVE_ROUTE";
export const RECEIVE_ROUTE_ERRORS = "RECEIVE_ROUTE_ERRORS";

const receiveAllRoutes = (routes) => {
    return({
        type: RECEIVE_ALL_ROUTES,
        routes
    });
};

const receiveRoute = (route) => {
    return({
        type: RECEIVE_ROUTE,
        route: route,
    });
};

const removeRoute = (id) => {
    return({
        type: REMOVE_ROUTE,
        routeId: id
    });
};

export const receiveErrors = errors => ({
    type: RECEIVE_ROUTE_ERRORS,
    errors
});

export const fetchRoutes = () => dispatch => {
    return(
        ApiUtil.fetchRoutes().then(routes => dispatch(receiveAllRoutes(routes)))
    );
};

export const fetchRoute = (id) => dispatch => {
    return(
        ApiUtil.fetchRoute(id).then(route => dispatch(receiveRoute(route)))
    );
};

export const deleteRoute = (id) => dispatch => {
    return(
        ApiUtil.deleteRoute(id).then(() => dispatch(removeRoute(id)))
    );
};

export const createRoute = (route) => dispatch => {
    return(
        ApiUtil.createRoute(route).then(
            route =>  {
                dispatch(receiveRoute(route));
                return route;
            },
            err => {
                (dispatch(receiveErrors(err.responseJSON)));
            }
        )
    );
};

