import React from 'react';
import { Link } from 'react-router-dom';
import RouteManager from '../../util/route_manager';
import route_show_container from '../route_show/route_show_container';

const getCoordsObj = latLng => ({
    lat: latLng.lat(),
    lng: latLng.lng()
});

const mapOptions = {
    center: { lat: 40.771, lng: -73.974 }, // this is Manhattan
    zoom: 13
};

let poly;

class CreateRouteForm extends React.Component {

    componentDidMount() {

        this.map = new google.maps.Map(this.mapNode, mapOptions);
        this.infoWindow = new google.maps.InfoWindow;
        poly = new google.maps.Polyline({
            strokeColor: '#000000',
            strokeOpacity: 1.0,
            strokeWeight: 3
        });
        // poly.setMap(this.map);

        // Add a listener for the click event
        google.maps.event.addListener(this.map, 'click', (event) =>{
            const coords = getCoordsObj(event.latLng);
            this.handleClick(coords);
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
    }



    handleClick(coords) {
        debugger
        let marker = new google.maps.Marker({
            position: coords,
            map: this.map
        })
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
                <Link to={"/dashboard"}>Home</Link>
                <Link to={"/routes"}>Index</Link>
            </div>
        )
    }




}


export default CreateRouteForm;