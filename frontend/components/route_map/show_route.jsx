import React from 'react';
import { Link } from 'react-router-dom';

class ShowRoute extends React.Component {
    constructor(props) {
        super(props);
        debugger
        this.routeData = JSON.parse(props.route.route_data);
    }

    
    componentDidMount() {
        //map centered on manhattan
        let map = new google.maps.Map(this.mapNode, {
            // center: { lat: 40.771, lng: -73.974 }, // this is Manhattan
            center: this.routeData.path[0], //this would center the map at the start of the route
            zoom: 13,
            mapTypeId: 'terrain',
            mapTypeControl: true,
            mapTypeControlOptions: {
                style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
                mapTypeIds: ['roadmap', 'terrain']
            }
        });

        let start = new google.maps.Marker({
            position: this.routeData.path[0],
            label: {text:'A', color: 'white'},
            map: map
        });

        let end = new google.maps.Marker({
            position: this.routeData.path[this.routeData.path.length - 1],
            label: {text:'B', color: 'white'},
            map: map
        });

        let routePoly = new google.maps.Polyline({
            path: this.routeData.path,
            strokeColor: '#0000CC',
            strokeOpacity: 1.0,
            map: map
        })
    }

    //need divs to hold this.state.distance, this.state.travelTime, this.state.sport
    render() {
        return (
            <div>
                <div id="map-show" ref={map => this.mapNode = map}>
                </div>
                <div id='elevation_chart'></div>
                <br />
                <div id='distance'>Distance: </div>
                <div id='duration'>Est. Duration: </div>
                <Link to={"/dashboard"}>Home</Link>
                <Link to={"/routes"}>Index</Link>
            </div>
        )
    }




}

export default ShowRoute;