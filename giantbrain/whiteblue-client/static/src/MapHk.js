import React, { Component } from 'react';
import { render } from 'react-dom';

class MapHk extends Component {
  constructor(props) {
    super(props);
    this.onScriptLoad = this.onScriptLoad.bind(this);
  }

  onScriptLoad() {
    const map = new window.google.maps.Map(
      document.getElementById(this.props.id),
      this.props.options);
	  // Create the initial InfoWindow.
	  var myLatlng = {lat: this.props.lat, lng: this.props.lng};
        var infoWindow = new google.maps.InfoWindow(
            {content: 'Click the map to get Lat/Lng!', position: myLatlng});
        infoWindow.open(map);

        // Configure the click listener.
        map.addListener('click', (mapsMouseEvent) => {
          // Close the current InfoWindow.
          infoWindow.close();

          // Create a new InfoWindow.
          infoWindow = new google.maps.InfoWindow({position: mapsMouseEvent.latLng});
          infoWindow.setContent(mapsMouseEvent.latLng.toString());
		  this.props.setLat(mapsMouseEvent.latLng.longitude) 
		  this.props.setLng(mapsMouseEvent.latLng.latitude) 
          infoWindow.open(map);
        });
		
    this.props.onMapLoad(map)
  }

  componentDidMount() {
    if (!window.google) {
      var s = document.createElement('script');
      s.type = 'text/javascript';
      s.src = `https://maps.google.com/maps/api/js?key=AIzaSyAikV10fnEWg5Uoham_h9Uxsps0xwAdgD8`;
      var x = document.getElementsByTagName('script')[0];
      x.parentNode.insertBefore(s, x);
      // Below is important. 
      //We cannot access google.maps until it's finished loading
      s.addEventListener('load', e => {
        this.onScriptLoad()
      })
    } else {
      this.onScriptLoad()
    }
  }

  render() {
	  let { width, height, id } = this.props;
    return (
      <div style={{ width , height }} id={id} />
    );
  }
}

export default MapHk;
