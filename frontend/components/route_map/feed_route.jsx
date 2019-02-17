import React from 'react';

class FeedRoute extends React.Component {
    constructor(props) {
        super(props);
        this.routeData = JSON.parse(props.route.route_data);
    }


    componentDidMount() {
        let map = new google.maps.Map(this.mapNode, {
            center: this.routeData.path[Math.floor(this.routeData.path.length / 2)],
            zoom: 11,
            mapTypeId: 'terrain',
            mapTypeControl: false,
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
            label: { text: 'B', color: 'white' },
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

    render() {
        return (
            <div className="user-feed-map-container">
                <div id="map-feed" ref={map => this.mapNode = map}>
                </div>
            </div>

        )
    }

}

export default FeedRoute;