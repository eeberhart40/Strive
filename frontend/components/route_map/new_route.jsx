import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { openModalSave } from '../../actions/modal_actions';


class NewRoute extends React.Component {
    constructor(props) {
        super(props);
        // this.state = {routeSet: false};
   
        this.routeData = {};
        this.markers = [];
        this.waypoints = [];

        this.saveRoute = this.saveRoute.bind(this);
        this.clearRoute = this.clearRoute.bind(this);
        this.displayRoute = this.displayRoute.bind(this);
    }

    componentDidMount() {

        let that = this;

        //map centered on manhattan
        //map type control options enabled
        this.map = new google.maps.Map(this.mapNode, {
            center: { lat: 40.771, lng: -73.974 }, // this is Manhattan
            zoom: 13,
            mapTypeId: 'terrain',
            mapTypeControl: false,
    
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

        //to calculate elevations 
        this.elevator = new google.maps.ElevationService;

        //info popups for places
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
            this.waypoints.push(coords);
            if (this.waypoints.length === 2) {
                this.removeOriginalMarkers();
                this.displayRoute(this.waypoints[0], this.waypoints[1], this.directionsService, this.directionsDisplay);
            }

        });

        document.getElementById('mode').addEventListener('change', function () {
            that.displayRoute(that.waypoints[0], that.waypoints[1], that.directionsService, that.directionsDisplay);
        });

    }


    handleClick(coords) {
        if (this.markers.length > 1) return
        let marker = new google.maps.Marker({
            position: coords,
            map: this.map
        })
        this.markers.push(marker);
    }


    removeOriginalMarkers() {
        for (let i = 0; i < this.markers.length; i++) {
            this.markers[i].setMap(null);
        }
    }

    //displays the route and length in miles
    displayRoute(origin, destination, service, display) {
        let that = this;
        let selectedMode = document.getElementById('mode').value;
        selectedMode === 'WALKING' ? this.routeData['sport'] = 'run' : this.routeData['sport'] = 'bike'; 
        service.route({
            origin: origin,
            destination: destination,
            travelMode: google.maps.TravelMode[selectedMode],
        },  (response, status) => {
            if (status === 'OK') {
                display.setDirections(response);
                this.routeData['distance'] = that.getMiles(response.routes[0].legs[0].distance.value);
                if(this.routeData.sport === 'WALKING') {
                    this.routeData['travelTime'] = that.getTravelTime(
                        Math.floor(response.routes[0].legs[0].duration.value / 1.8));
                } else {
                    this.routeData['travelTime'] = that.getTravelTime(
                        Math.floor(response.routes[0].legs[0].duration.value / 1.3));
                }
                this.routeData['path'] = response.routes[0].overview_path;
                document.getElementById('distance').innerHTML =
                    "Distance: " + this.routeData['distance'] + " mi";
                document.getElementById('duration').innerHTML =
                    "Est. Travel Time: " + this.routeData['travelTime'];
                // polyPath = routeData[path];
            } else {
                alert('Could not display directions due to: ' + status);
            }
            });

    }

    clearRoute() {
        this.directionsDisplay.set('directions', null);
        document.getElementById('distance').innerHTML = "Distance:";
        document.getElementById('duration').innerHTML = "Est. Travel Time";
        this.markers = [];
        this.waypoints = [];
        this.routeData = {};
        // this.setState({routeSet: false});
    }

    // drawPoly() {
    //     let marker1 = new google.maps.Marker({
    //         position: polyPath[0],
    //         label: {text:'A', color: 'white'},
    //         map: this.map
    //     });
    //     let marker2 = new google.maps.Marker({
    //         position: polyPath[polyPath.length - 1],
    //         label: {text:'B', color: 'white'},
    //         map: this.map
    //     })
    //   this.polyLine.setPath(polyPath);

    // }


    //does this work?
    handleLocationError(browserHasGeolocation, infoWindow, pos) {
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

        return `${hours}:${minutes}:${seconds}`;
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

    saveRoute(){
        if(Object.keys(this.routeData).length === 0) return
        this.props.openModalSave(this.routeData);
    }

    render() {
        // const disableButton = Object.keys(routeData).length === 0  ?'disabled': '';
        return (
            <div className="new-map-container">
                <div id="map-new" ref={map => this.mapNode = map}>
                </div>
                <div id="bar">
                    <p className="auto"><input type="text" id="autoc" /></p>
                    <button id="clear-route-btn" onClick={this.clearRoute}>Clear</button>
                    <button id="save-route-btn" onClick={this.saveRoute}>
                        Save
                    </button>
                    {/* <button onClick={this.drawPoly}>POLY</button> */}
                    <select id="mode">
                        <option value="WALKING">Run</option>
                        <option value="BICYCLING">Bike</option>
                    </select>
                </div>
                {/* <div id='elevation_chart'></div> */}
                <div className='new-route-stats'>
                    <div id='distance'>Distance: {this.routeData['distance']}</div>
                    <div id='duration'>Est. Travel Time: {this.routeData['travelTime']} </div>
                </div>
            </div>
        )
    }




}

const mdp = dispatch => {
    return ({
        openModalSave: (dataString) => dispatch(openModalSave('save', dataString))
    })
}

export default connect(null, mdp)(NewRoute);
