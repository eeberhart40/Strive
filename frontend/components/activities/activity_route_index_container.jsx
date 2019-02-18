import React from 'react';
import RouteIndexItem from '../route_index/route_index_item';
import { fetchRoutes } from '../../actions/map_route_actions';
import { openModalAct } from '../../actions/modal_actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class ActivityRouteIndex extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);

    }

    handleClick(routeData, routeId) {
        this.props.openModalAct(routeData, routeId);
    }


    componentDidMount() {

        this.props.fetchRoutes();
    }

    render() {
        let routes = Object.values(this.props.routes).reverse().map(route => {
            return (
                <div 
                key={route.id}
                className="activity-index-route-map"
                onClick={ () => this.handleClick(route.route_data, route.id)}>
                    <RouteIndexItem
                        key={route.id}
                        route={route}
                    />
                </div>
            );
        });

        if (routes.length === 0) {
            return (
                <div className="empty-index-container container">
                    <h1>You don't have any routes. Create routes to record activities.</h1>
                    <button id='create-route-btn'><Link to={'routes/new'}>Create New Route</Link></button>
                </div>
            )
        }

        return (
            <div className="activity-route-index-container container">
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
        openModalAct: (dataString, routeId) => dispatch(openModalAct('activity', dataString, routeId))
    });
};

export default connect(msp, mdp)(ActivityRouteIndex);