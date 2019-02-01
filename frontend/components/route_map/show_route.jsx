import React from 'react';
import { Link, withRouter } from 'react-router-dom';


class ShowRoute extends React.Component {
    constructor(props) {
        super(props);
        this.routeData = JSON.parse(props.route.route_data);

    }

    
    componentDidMount() {
        //map centered on manhattan
        
        let map = new google.maps.Map(this.mapNode, {
            // center: { lat: 40.771, lng: -73.974 }, // this is Manhattan
            center: this.routeData.path[Math.floor(this.routeData.path.length / 2)],
            zoom: 12,
            mapTypeId: 'terrain',
            mapTypeControl: true,
            mapTypeControlOptions: {
                style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
                mapTypeIds: ['roadmap', 'terrain']
            }
        });

        let start = new google.maps.Marker({
            position: this.routeData.path[0],
            label: { text: 'A', color: 'white' },
            map: map,
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 7.0,
                fillColor: "#049D1D",
                fillOpacity: 2.0,
                strokeWeight: 0.4
            },
        });

        let end = new google.maps.Marker({
            position: this.routeData.path[this.routeData.path.length - 1],
            label: {text:'B', color: 'white'},
            map: map,
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 7.0,
                fillColor: "#000",
                fillOpacity: 2.0,
                strokeWeight: 0.4
            },
        });

        let routePoly = new google.maps.Polyline({
            path: this.routeData.path,
            strokeColor: '#FF0000',
            strokeOpacity: 1.0,
            strokeWeight: 2,
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
                <div className='show-route-stats'>
                    <div id='distance'>Distance:  </div>
                    <div id='duration'>Est. Duration: </div>
                </div>
            </div>
        )
    }




}

export default withRouter(ShowRoute);