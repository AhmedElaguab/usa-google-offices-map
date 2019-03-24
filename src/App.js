import React, {Component} from 'react';
import './App.css';
import MapController from './MapController';
import {compose} from 'recompose';
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
  <GoogleMap defaultZoom={4} defaultCenter={props.defaultCenter}>
    {props.offices.map(office => (
      <Marker
        key={office.id}
        position={office.location}
        onClick={() => props.onMarkerToggleOpen(office)}
        animation={office.animation}
      >
        {office.isOpen && (
          <InfoWindow onCloseClick={() => props.onMarkerToggleOpen(office)}>
            <div className={'infowindow-' + office.city}>
              <h3 tabIndex="0">{office.title}</h3>
              <h4 tabIndex="0">About City of Location:</h4>
            </div>
          </InfoWindow>
        )}
      </Marker>
    ))}
  </GoogleMap>
));

class App extends Component {
  state = {
    defaultCenter: {lat: 40.9578777, lng: -118.8299901},
    isMarkerShown: true,
    state: 'All',
    offices: [
      {
        title: 'Google Kirkland',
        location: {lat: 47.670189, lng: -122.197425},
        animation: null,
        state: 'Washington',
        city: 'Kirkland',
        city_state: 'Kirkland, Washington',
        isOpen: false,
        id: 0
      },
      {
        title: 'Google Portland',
        location: {lat: 45.521622, lng: -122.677596},
        animation: null,
        state: 'Oregon',
        city: 'Portland',
        city_state: 'Portland, Oregon',
        isOpen: false,
        id: 1
      },
      {
        title: 'Google Building GWC1',
        location: {lat: 37.424135, lng: -122.09164},
        animation: null,
        state: 'California',
        city: 'Mountain_View',
        city_state: 'Mountain View, California',
        isOpen: false,
        id: 2
      },
      {
        title: 'Google Inc',
        location: {lat: 33.99564, lng: -118.477623},
        animation: null,
        state: 'California',
        city: 'Los_Angeles',
        city_state: 'Los Angeles',
        isOpen: false,
        id: 3
      },
      {
        title: 'Google San Diego',
        location: {lat: 32.90959, lng: -117.181879},
        animation: null,
        state: 'California',
        city: 'San_Diego',
        city_state: 'San Diego',
        isOpen: false,
        id: 4
      }
    ]
  };

  // Hundle marker toggle open.
  hundleMarkerToggleOpen = office => {
    const offices = this.state.offices;
    const toggledOffice = office;

    // Open the InfoWindow if it is not open.
    if (!office.isOpen) {
      toggledOffice.animation = 1;
      toggledOffice.isOpen = true;
      offices[offices.indexOf(office)] = toggledOffice;

      // Stop animation after 2 seconds.
      setTimeout(() => {
        toggledOffice.animation = null;
        offices[offices.indexOf(office)] = toggledOffice;
        this.setState({offices});
      }, 2100);

      fetch(
        'https://en.wikipedia.org/w/api.php?&origin=*&action=opensearch&search=' +
          office.city_state +
          '&limit=1'
      )
        .then(resp => {
          return resp.json();
        })
        .then(data => {
          if (data[2].length) {
            setTimeout(() => {
              document.querySelector(
                '.infowindow-' + office.city
              ).innerHTML += `<p tabindex="0">${
                data[2]
              }<br><span><strong>Source:</strong> <a href="${
                data[3]
              }" target="_blank" aria-label="Read more from Wikipedia">Wikipedia</a></span></p>`;
            }, 50);
          } else {
            setTimeout(() => {
              document.querySelector('.infowindow-' + office.city).innerHTML +=
                '<p tabindex="0"> No information </p>';
            }, 50);
          }
        });

      // If it is open then close it.
    } else {
      toggledOffice.animation = null;
      toggledOffice.isOpen = false;
      offices[offices.indexOf(office)] = toggledOffice;
    }

    this.setState({offices});
  };

  // On space key pressed. for Accessibility.
  onSpaceKeyPress = (event, office, _this) => {
    // if the pressed key is Space
    if (event.which === 32) {
      // Then open the related InfoWindow.
      _this.props.onMarkerToggleOpen(office);
    }
  };

  // Hundle state filter.
  hundleStateFilter = state => {
    this.setState({state});
  };

  render() {
    let shownOffices = this.state.offices;
    // Check if the markers have filtered.
    if (this.state.state !== 'All') {
      shownOffices = this.state.offices.filter(
        office => office.state === this.state.state
      );
    }
    return (
      <div className="App">
        <MapController
          onStateFilter={this.hundleStateFilter}
          offices={shownOffices}
          onMarkerToggleOpen={this.hundleMarkerToggleOpen}
          onSpaceKeyPress={this.onSpaceKeyPress}
        />
        <div className="map">
          <MapWithAMakredInfoWindow
            googleMapURL="https://maps.googleapis.com/maps/api/js?key&v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{height: `100%`}} />}
            containerElement={<div style={{height: `100%`}} />}
            mapElement={<div style={{height: `100%`}} />}
            defaultCenter={this.state.defaultCenter}
            offices={shownOffices}
            onMarkerToggleOpen={this.hundleMarkerToggleOpen}
          />
        </div>
      </div>
    );
  }
}

export default App;
