import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root';
import { createRoute, deleteRoute, fetchRoute, fetchRoutes } from './util/map_routes_util';

document.addEventListener('DOMContentLoaded', () => {
    let store;
    if (window.currentUser) {
        const preloadedState = {
            entities: {
                athletes: { [window.currentUser.id]: window.currentUser }
            },
            session: { id: window.currentUser.id }
        };
        store = configureStore(preloadedState);
        delete window.currentUser;
    } else {
        store = configureStore();
    }

    const root = document.getElementById('root');

    //testing
    window.createRoute = createRoute;
    window.deleteRoute = deleteRoute;
    window.fetchRoute = fetchRoute;
    window.fetchRoutes = fetchRoutes;
    window.getState = store.getState;
    window.dispatch = store.dispatch;

    ReactDOM.render(<Root store={store} />, root);
});