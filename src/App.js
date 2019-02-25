import React, {Component} from 'react';
import './App.css';
import MapController from './MapController';
import {compose, withStateHandlers} from 'recompose';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from 'react-google-maps';

const MapWithAMakredInfoWindow = compose(
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap defaultZoom={5} defaultCenter={props.defaultCenter}>
    <Marker position={props.defaultCenter} onClick={props.onToggleOpen}>
      {props.isOpen && <InfoWindow />}
    </Marker>
  </GoogleMap>
));

class App extends Component {
  state = {
    defaultCenter: {lat: 39.9578777, lng: -108.8299901},
    isMarkerShown: true
  };

  render() {
    return (
      <div className="App">
        <MapController />
        <MapWithAMakredInfoWindow
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=&v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{height: `100%`}} />}
          containerElement={<div style={{height: `800px`}} />}
          mapElement={<div style={{height: `100%`}} />}
          defaultCenter={this.state.defaultCenter}
        />
      </div>
    );
  }
}

export default App;
