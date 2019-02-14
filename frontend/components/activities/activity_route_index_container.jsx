import React from 'react';
import RouteIndexItem from '../route_index/route_index_item';
import { fetchRoutes } from '../../actions/map_route_actions';
import { openModalAct } from '../../actions/modal_actions';
import { connect } from 'react-redux';

class ActivityRouteIndex extends React.Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {

        this.props.fetchRoutes();
    }

    render() {
        debugger
        let routes = Object.values(this.props.routes).map(route => {
            return (
                <RouteIndexItem
                    key={route.id}
                    route={route}
                />
            );
        });
        return (
            <div className="index-container">
                <div className='index-bar'>
                    <h1>Choose a Route</h1>
                </div>
                <div className="bottom-border"></div>
                <ul className="index-list">
                    {routes}
                </ul>
            </div>
        );
    };
};


const msp = state => {
    const routes = state.entities.routes;
    return({
        routes
    });
};

const mdp = dispatch => {
    return({
        fetchRoutes: () => dispatch(fetchRoutes()),
        openModalAct: (dataString) => dispatch(openModalAct('activity', dataString))
    });
};

export default connect(msp, mdp)(ActivityRouteIndex);