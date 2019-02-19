import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root';
// import { fetchActivities, fetchActivity, deleteActivity, createActivity, updateActivity } from './util/activity_api_util';

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

    // //testing
    // window.fetchActivities = fetchActivities;
    // // window.fetchActivity = fetchActivity;
    // // window.deleteActivity = deleteActivity;
    // // window.createActivity = createActivity;
    // // window.updateActivity = updateActivity;

    // window.dispatch = store.dispatch;
    // window.getState = store.getState;
    // window.fetchActivities = fetchActivities;



    ReactDOM.render(<Root store={store} />, root);
});