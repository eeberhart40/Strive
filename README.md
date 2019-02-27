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
User chooses a route with which they performed an activity.

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

# Planned Future Features
* Route elevation profiles
* User search funtionality for following other users
* Ability to like and comment on other users activities

