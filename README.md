# Strive
[Live Demo](https://strive-a.herokuapp.com/#/)

<img src="https://github.com/eeberhart40/Strive/blob/master/app/assets/images/favicon.png" width="300">

## Features
* User Authentication
  * User login/Signup
  * Demo User
 * Create/Save biking or running routes
 * Create/Record Activities
 
## Technologies Used
* **Google Maps and Directions Service API** to plot routes
* **PostgresQL** for the database
* **Ruby on Rails** for the backend framework
* **React** for the Frontend with **Redux** to manage state
* **jQuery** AJAX for accessing the backend through **Thunk** actions
* **SASS/CSS** for styling

## Implementation
### Creating Routes
User marks origin and destination waypoints on a globe-spanning, searchable map. Strive generates a route and calculates the distance and estimated travel time depending on mode of travel.
<img src="https://github.com/eeberhart40/Strive/blob/master/app/assets/images/new_route.png" width="600">

The save route modal pops up prompting the user to enter a name for the route.

<img src="https://github.com/eeberhart40/Strive/blob/master/app/assets/images/save_route.png" width="300">

Upon saving, the user is directed to the route's show page.

<img src="https://github.com/eeberhart40/Strive/blob/master/app/assets/images/show_route.png" width="600">

##

### Recording Actvitities
User chooses a route that they ran or biked by clicking on it.

<img src="https://github.com/eeberhart40/Strive/blob/master/app/assets/images/choose_route.png" width="600">

Modal pops up, prompting user to enter the duration of their activity and a title.

<img src="https://github.com/eeberhart40/Strive/blob/master/app/assets/images/activty_modal.png" width="300">

Upon Saving, the user is directed to the activity's show page displaying the distance traveled, duration and average speed.

<img src="https://github.com/eeberhart40/Strive/blob/master/app/assets/images/activity_show.png" width="600">

User's activity feed updates with their most recent activity.

<img src="https://github.com/eeberhart40/Strive/blob/master/app/assets/images/feed_show.png" width="600">

##

## Rendering and Saving Routes: Google Maps and Directions Service API
Google Maps API allows for the rendering of dynamic maps of any size. By enabling certain map controls it is possible to generate an autocompleteing search bar and provide options for different modes of travel and different map overlays. Adding event listeners to a map makes it possible to mark waypoints. 

```javscript
      google.maps.event.addListener(this.map, 'click', (event) => {
            const coords = event.latLng;
            this.handleClick(coords);
            this.waypoints.push(coords);
            if (this.waypoints.length === 2) {
                this.removeOriginalMarkers();
                this.displayRoute(this.waypoints[0], this.waypoints[1], this.directionsService, this.directionsDisplay);
            }

        });
```
A route can be generated between waypoints by using Google Directions Service and Direction Renderer

```javascript
        this.directionsService = new google.maps.DirectionsService;
        this.directionsDisplay = new google.maps.DirectionsRenderer({
            draggable: true,
            map: this.map,
        });
```

When given an orgin, destination, and mode of travel, Directions Service generates an array (`path`) of many coordinate points respresenting a route along established roads and returns that array in a promise. The promise also contains the distance of that route and the estimated travel time depending on the specified mode of travel. 

```javascript
 displayRoute(origin, destination, service, display) {
   let that = this;
   service.route({
            origin: origin,
            destination: destination,
            travelMode: google.maps.TravelMode[selectedMode],
        },  (response, status) => {
            if (status === 'OK') {
                display.setDirections(response);
                this.routeData['distance'] = that.getMiles(response.routes[0].legs[0].distance.value);
                this.routeData['travelTime'] = that.getTravelTime(response.routes[0].legs[0].duration.value);
                this.routeData['path'] = response.routes[0].overview_path;
              }
            }
          );
  });
  
```
Saving the `path` array allows the route to be drawn as a polyline from here on out, avoiding unessecary and expensive Directions Service requests.

```javascript
    constructor(props) {
        super(props);
        this.routeData = JSON.parse(props.route.route_data);
    }
```
```javascript
        let routePoly = new google.maps.Polyline({
            path: this.routeData.path,
            strokeColor: '#FF0000',
            strokeOpacity: 1.0,
            strokeWeight: 2,
            strokeOpacity: 1.0,
            map: map
        })
```

## Recording Activities: React, Redux
The challenge in recording activities lay in figuring out how to grab the specific slice of state attributed to the route with which a user carried out their activity. That data would include the sport (runinng or biking), the distance of the route, and the route's path (array of coordinates)- all necessary peices of information in order to properly record an activity. To accomplish this, I built a Thunk action creator that accepted a specific type of modal, a `datString` (the 'stringified' path of a route) and a `routeId` as arguments and returned an action of type `OPEN_MODAL_ACT` containing the arguments as values. 
```javascript
export const openModalAct = (modal, dataString, routeId) => {
    return {
        type: OPEN_MODAL_ACT,
        modal,
        dataString,
        routeId
    };
};
```
I set up the `modalReducer` to return the the modal associated with an action of type `OPEN_MODAL_ACT`. I also set up the `routeDataReducer` to return the `dataString` and `routeId` when that type of action was dispatched
```javascript
export default function modalReducer(state = null, action) {
    switch (action.type) {
      ...
        case OPEN_MODAL_ACT:
            return action.modal;
       ...
        default:
            return state;
    }
}
```
```javascript
export default function routeDataReducer(state = null, action) {
    switch (action.type) {
     ...
        case OPEN_MODAL_ACT:
            return { dataString: action.dataString, routeId: action.routeId};
     ...
        default:
            return state;
    }
}
```
This allowed me to set up the `uiReducer` such that `modal` and `routeData` could be contained in the `ui` slice of state.
```javascript
import { combineReducers } from 'redux';
import routeData from './route_data_reducer';
import modal from './modal_reducer';

export default combineReducers({
    modal,
    routeData
});
```
Now that the Redux state had a shape I could work with, I went back and set up the modal to render an `ActvityForm` component when passed the argument 'activity',  mapping `routeData` and `routeId` to props by accessing the `ui` slice of state.
```javascript
const mapStateToProps = state => {
    const routeData = state.ui.routeData;
    const routeId = state.ui.routeId;
    if(routeData){
        return {
            modal: state.ui.modal,
            routeData,
            routeId
        }
    } 
    ...
};

function Modal({ modal, closeModal, routeData, routeId }) {
   ...
    let component;
    switch (modal) {
        case 'activity':
            component = 
            <CreateActivityFormContainer 
            routeData={routeData}
            routeId={routeId}
            />
            break;
    ...
        default:
            return null;
    }
    return (
        <div className="modal-background" onClick={closeModal}>
            <div className="modal-child" onClick={e => e.stopPropagation()}>
                {component}
            </div>
        </div>
    );
}
```
In building the component that was to render all the routes that a user could choose from to record their activity, I mapped the `openModalAct` thunk action creator to props.

```javascript
const mdp = dispatch => {
    return({
        fetchRoutes: () => dispatch(fetchRoutes()),
        openModalAct: (dataString, routeId) => dispatch(openModalAct('activity', dataString, routeId))
    });
};
```
This allowed me to build a simple click handling function that could be attached to each `RouteIndexItem` (thumbnail image of route). Effectively, whichever route is clicked, that route's `path` (in this case route_data) and id are carried up as props to an `ActivityForm` modal, allowing access to all the necessary route information to record an activity.

```javascript
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
     ...
   }
```

## Planned Future Features
* Route elevation profiles
* User search funtionality for following other users
* Ability to like and comment on other users activities

