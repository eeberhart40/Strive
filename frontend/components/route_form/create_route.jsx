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
        //map centered on manhattan
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

        //adds place search bar with autocomplete
        this.map.controls[google.maps.ControlPosition.RIGHT_TOP].push(
            document.getElementById('bar'));
        const autocomplete = new google.maps.places.Autocomplete(
            document.getElementById('autoc'));
        autocomplete.bindTo('bounds', this.map);
        autocomplete.addListener('place_changed', function () {
            const place = autocomplete.getPlace();
            if (place.geometry.viewport) {
                that.map.fitBounds(place.geometry.viewport);
            } else {
                that.map.setCenter(place.geometry.location);
                that.map.setZoom(17);
            }
        });

        this.infoWindow = new google.maps.InfoWindow;
        this.directionsService = new google.maps.DirectionsService;
       
        this.directionsDisplay = new google.maps.DirectionsRenderer({
             draggable: true,
             map: this.map,
         });
        
        //sets map to current location if browser location enabled
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
            //
            const coords = event.latLng;
            this.handleClick(coords);
            waypoints.push(coords);
            if (waypoints.length === 2) {
                this.deleteOriginalMarkers();
                this.displayRoute(waypoints[0], waypoints[1], this.directionsService, this.directionsDisplay);
            }
        });

        document.getElementById('mode').addEventListener('change', function () {
            that.displayRoute(waypoints[0], waypoints[1], that.directionsService, that.directionsDisplay);
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

    //displays the route and length in miles
    displayRoute(origin, destination, service, display) {
        let that = this;
        let selectedMode = document.getElementById('mode').value;
        service.route({
            origin: origin,
            destination: destination,
            travelMode: google.maps.TravelMode[selectedMode],
        }, function (response, status) {
            if (status === 'OK') {
                display.setDirections(response);
                document.getElementById('distance').innerHTML =
                    that.getMiles(response.routes[0].legs[0].distance.value) + " miles";
                document.getElementById('duration').innerHTML =
                    response.routes[0].legs[0].duration.value + " seconds";
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


    //does this work?
    handleLocationError(browserHasGeolocation, infoWindow, pos){
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
            'Error: The Geolocation service failed.' :
            'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
    }

    getMiles(m) {
        return Number((m / 1609).toFixed(2));
    }



    render () {
        return(
            <div>
                <div className="map-container" ref={map => this.mapNode = map}>
                </div>
                <div id="bar">
                    <p className="auto"><input type="text" id="autoc" /></p>
                    <button onClick={this.clearRoute}>Clear</button>
                    <select id="mode">
                        <option value="WALKING">Walking</option>
                        <option value="BICYCLING">Bicycling</option>
                    </select>
                </div>
                <br/>
                <div id='distance'>Distance: </div>
                <div id='duration'>Est. Duration: </div>
                <Link to={"/dashboard"}>Home</Link>
                <Link to={"/routes"}>Index</Link>
            </div>
        )
    }




}


export default CreateRouteForm;