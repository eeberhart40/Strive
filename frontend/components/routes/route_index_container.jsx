import React from 'react';
import { connect } from 'react-redux';
import  RouteIndex from './route_index';
import { fetchRoutes, deleteRoute } from '../../actions/map_route_actions';

const msp = state => {
    let routes = state.entities.routes;
    // let athletes = state.entities.athletes;
    return {
        routes: routes,

    };
};

const mdp = dispatch => {
    return {
        fetchRoutes: () => dispatch(fetchRoutes()),
        deleteRoute: (id) => dispatch(deleteRoute(id))
    }
};

export default connect(msp, mdp)(RouteIndex)