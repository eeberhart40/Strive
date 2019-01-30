import React from 'react';
import { connect } from 'react-redux';
import  RouteIndex from './route_index';
import { fetchRoutes } from '../../actions/map_route_actions';

const msp = state => {
    let routes = state.entities.routes;
    
    return {
        routes: routes,
    };
};

const mdp = dispatch => {
    return {
        fetchRoutes: () => dispatch(fetchRoutes())
    }
};

export default connect(msp, mdp)(RouteIndex)