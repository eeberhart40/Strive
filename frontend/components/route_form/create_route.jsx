import React from 'react';
import { Link } from 'react-router-dom';
import RouteManager from '../../util/route_manager';
import route_show_container from '../route_show/route_show_container';

let waypoints = [];
let markers = [];

class CreateRouteForm extends React.Component {
    constructor(props) {
        super(props);
        this.clearRoute = this.clearRoute.bind(this);
    }

    componentDidMount() {
        let that = this;
        this.map = new google.maps.Map(this.mapNode, {
            center: { lat: 40.771, lng: -73.974 }, // this is Manhattan
            zoom: 13,
            mapTypeId: 'terrain',
            mapTypeControl: true,
            mapTypeControlOptions: {
                style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
                mapTypeIds: ['roadmap', 'terrain']
            }
        });
        this.infoWindow = new google.maps.InfoWindow;
        this.directionsService = new google.maps.DirectionsService;
        this.directionsDisplay = new google.maps.DirectionsRenderer({
             draggable: true,
             map: this.map,
         });
        

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                let pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                this.infoWindow.setPosition(pos);
                this.infoWindow.setContent('Location found.');
                this.infoWindow.open(this.map);
                this.map.setCenter(pos);
            }, () => {
                this.handleLocationError(true, this.infoWindow, this.map.getCenter());
            });
        } else {
            // Browser doesn't support Geolocation
            this.handleLocationError(false, this.infoWindow, this.map.getCenter());
        }


        // Add a listener for the click event
        google.maps.event.addListener(this.map, 'click', (event) => {
            // const coords = getCoordsObj(event.latLng);
            // debugger
            const coords = event.latLng;
            this.handleClick(coords);
            waypoints.push(coords);
            if (waypoints.length === 2) {
                this.deleteOriginalMarkers();
                this.displayRoute(waypoints[0], waypoints[1], this.directionsService, this.directionsDisplay);
            }
        });

    }


    handleClick(coords) {
        if (markers.length > 1) return
        let marker = new google.maps.Marker({
            position: coords,
            map: this.map
        })
        markers.push(marker);
    }


    deleteOriginalMarkers() {
        for (let i = 0; i < markers.length; i++) {
            markers[i].setMap(null);
        }
    }


    displayRoute(origin, destination, service, display) {
        service.route({
            origin: origin,
            destination: destination,
            travelMode: 'BICYCLING',
        }, function (response, status) {
            if (status === 'OK') {
                display.setDirections(response);
            } else {
                alert('Could not display directions due to: ' + status);
            }
        });
    }

    clearRoute(){
        this.directionsDisplay.set('directions', null);
        markers = [];
        waypoints = [];
    
    }


    handleLocationError(browserHasGeolocation, infoWindow, pos){
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
            'Error: The Geolocation service failed.' :
            'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
    }




    render () {
        return(
            <div>
                <div className="map-container" ref={map => this.mapNode = map}>
                </div>
                    <button onClick={this.clearRoute}>Clear</button>
                <Link to={"/dashboard"}>Home</Link>
                <Link to={"/routes"}>Index</Link>
            </div>
        )
    }




}


export default CreateRouteForm;