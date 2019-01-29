import React from 'react';
import { Link } from 'react-router-dom';
import RouteManager from '../../util/route_manager';
import route_show_container from '../route_show/route_show_container';

let waypoints = [];
let markers = [];
let path = 'path';
let distance = 'distance';
let travelTime = 'travelTime';
let sport = 'sport';
let routeData = {};

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
        this.elevator = new google.maps.ElevationService;
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
        routeData[sport] = selectedMode;
        service.route({
            origin: origin,
            destination: destination,
            travelMode: google.maps.TravelMode[selectedMode],
        }, function (response, status) {
            if (status === 'OK') {
                display.setDirections(response);
                routeData[distance] = that.getMiles(response.routes[0].legs[0].distance.value);
                routeData[travelTime] = that.getTravelTime(response.routes[0].legs[0].duration.value)
                routeData[path] = response.routes[0].overview_path;
                document.getElementById('distance').innerHTML =
                    routeData[distance] + " miles";
                document.getElementById('duration').innerHTML =
                    routeData[travelTime];
            } else {
                alert('Could not display directions due to: ' + status);
            }
        });
       
    }

    clearRoute(){
        this.directionsDisplay.set('directions', null);
        // document.getElementById('distance').innerHTML = "";
        // document.getElementById('duration').innerHTML = "";
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

    getTravelTime(secs) {
        let hours = Math.floor(secs / 3600);
        let minutes = Math.floor((secs - (hours * 3600)) / 60);
        let seconds = secs - (hours * 3600) - (minutes * 60);
        if (minutes < 10) minutes = `0${minutes}`;
        if (seconds < 10) seconds = `0${seconds}`;

        return`${hours}:${minutes}:${seconds}`;
    }

//    displayPathElevation(path, elevator) {
//         // Create a PathElevationRequest object using this array.
//         // Ask for 256 samples along that path.
//         // Initiate the path request.
//         elevator.getElevationAlongPath({
//             'path': path,
//             'samples': path.length
//         }, this.plotElevation);
//     }

//     plotElevation(elevations, status) {
//         var chartDiv = document.getElementById('elevation_chart');
//         if (status !== 'OK') {
//             // Show the error code inside the chartDiv.
//             chartDiv.innerHTML = 'Cannot show elevation: request failed because ' +
//                 status;
//             return;
//         }
//         // Create a new chart in the elevation_chart DIV.
        

//         var chart = new google.visualization.ColumnChart(chartDiv);

//         // Extract the data from which to populate the chart.
//         // Because the samples are equidistant, the 'Sample'
//         // column here does double duty as distance along the
//         // X axis.
//         var data = new google.visualization.DataTable();
//         data.addColumn('string', 'Sample');
//         data.addColumn('number', 'Elevation');
//         for (var i = 0; i < elevations.length; i++) {
//             data.addRow(['', elevations[i].elevation]);
//         }

//         // Draw the chart using the data within its DIV.
//         chart.draw(data, {
//             height: 150,
//             legend: 'none',
//             titleY: 'Elevation (m)'
//         });
//     }

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
                <div id='elevation_chart'></div>
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