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
    {props.offices.map(office => (
      <Marker
        key={office.id}
        position={office.location}
        onClick={props.onToggleOpen}
      >
        {office.isOpen && (
          <InfoWindow>
            <h4>{office.title}</h4>
          </InfoWindow>
        )}
      </Marker>
    ))}
  </GoogleMap>
));

class App extends Component {
  state = {
    defaultCenter: {lat: 39.9578777, lng: -108.8299901},
    isMarkerShown: true,
    offices: [
      {
        title: 'Google Kirkland',
        location: {lat: 47.670189, lng: -122.197425},
        state: 'Washington',
        isOpen: true,
        id: 0
      },
      {
        title: 'Google Portland',
        location: {lat: 45.521622, lng: -122.677596},
        state: 'Oregon',
        isOpen: false,
        id: 1
      },
      {
        title: 'Google Building GWC1',
        location: {lat: 37.424135, lng: -122.09164},
        state: 'California',
        isOpen: false,
        id: 2
      },
      {
        title: 'Google Inc',
        location: {lat: 33.99564, lng: -118.477623},
        state: 'California',
        isOpen: false,
        id: 3
      },
      {
        title: 'Google San Diego',
        location: {lat: 32.90959, lng: -117.181879},
        state: 'California',
        isOpen: false,
        id: 4
      },
      {
        title: 'Google Thornton',
        location: {lat: 39.922389, lng: -104.983322},
        state: 'Colorado',
        isOpen: false,
        id: 5
      }
    ]
  };

  render() {
    let shownOffices = this.state.offices;
    return (
      <div className="App">
        <MapController />
        <MapWithAMakredInfoWindow
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=&v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{height: `100%`}} />}
          containerElement={<div style={{height: `800px`}} />}
          mapElement={<div style={{height: `100%`}} />}
          defaultCenter={this.state.defaultCenter}
          offices={shownOffices}
        />
      </div>
    );
  }
}

export default App;
