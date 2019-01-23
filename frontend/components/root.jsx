import React from 'react';
import { Provider } from 'react-redux';
import { HasRouter } from 'react-router-dom';
import App from './App';

const Root = ({ store }) => (
    <Provider store={store}>
        <HasRouter>
            <App/>
        </HasRouter>

    </Provider>
);

export default Root;