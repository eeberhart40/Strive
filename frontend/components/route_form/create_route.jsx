import React from 'react';
import { Link } from 'react-router-dom';

class CreateRouteForm extends React.Component {

    componentDidMount() {
        // set the map to show SF
        const mapOptions = {
            center: { lat: 37.7758, lng: -122.435 }, // this is SF
            zoom: 13
        };
        this.map = new google.maps.Map(this.mapNode, mapOptions);
        this.infoWindow = new google.maps.InfoWindow;

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition( position => {
                let pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                this.infoWindow.setPosition(pos);
                this.infoWindow.setContent('Location found.');
                this.infoWindow.open(this.map);
                this.map.setCenter(pos);
            },  () => {
                handleLocationError(true, this.infoWindow, this.map.getCenter());
            });
        } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, this.infoWindow, this.map.getCenter());
        }

       this.drawingManager = new google.maps.drawing.DrawingManager({
            drawingMode: google.maps.drawing.OverlayType.MARKER,
            drawingControl: true,
            drawingControlOptions: {
                position: google.maps.ControlPosition.TOP_CENTER,
                drawingModes: ['marker', 'circle', 'polygon', 'polyline', 'rectangle']
            },
            markerOptions: { icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png' },
            circleOptions: {
                fillColor: '#ffff00',
                fillOpacity: 1,
                strokeWeight: 5,
                clickable: false,
                editable: true,
                zIndex: 1
            }
        });
        this.drawingManager.setMap(this.map);
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