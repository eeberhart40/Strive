import * as ApiUtil from '../util/map_routes_util';
export const RECEIVE_ALL_ROUTES = "RECEIVE_ALL_ROUTES";
export const RECEIVE_ROUTE = "RECEIVE_ROUTE";
export const REMOVE_ROUTE = "REMOVE_ROUTE";

const receiveAllRoutes = (routes) => {
    return({
        type: RECEIVE_ALL_ROUTES,
        routes
    });
};

const receiveRoute = (route) => {
    return({
        type: RECEIVE_ROUTE,
        route
    });
};

const removeRoute = (route) => {
    return({
        type: REMOVE_ROUTE,
        routeId: route.id
    });
};

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
        ApiUtil.deleteRoute(id).then(route => dispatch(removeRoute(route)))
    );
};

export const createRoute = (route) => dispatch => {
    return(
        ApiUtil.createRoute(route).then(route => dispatch(receiveRoute(route)))
    );
};

