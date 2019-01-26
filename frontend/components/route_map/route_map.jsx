import React from 'react';
import { connect } from 'react-redux'



class RouteMap extends React.Component {

    componentDidMount() {
        // set the map to show SF
        const mapOptions = {
            center: { lat: 37.7758, lng: -122.435 }, // this is SF
            zoom: 13
        };
        this.map = new google.maps.Map(this.mapNode, mapOptions);
    }

    render() {
        return (
            <div  className="map-container" ref={map => this.mapNode = map}>
            </div>
        )
    }
    
}

export default RouteMap;