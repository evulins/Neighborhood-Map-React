import React, { Component } from 'react'
import { GoogleMap, withGoogleMap, withScriptjs } from 'react-google-maps'
import MyMarker from './MyMarker'
import PropTypes from 'prop-types'

class Map extends Component {

  static propTypes = {
    markers: PropTypes.array.isRequired,
    onMarkerClick: PropTypes.func.isRequired,
    deselectMarker: PropTypes.func.isRequired,
    selectedMarker: PropTypes.string.isRequired
  }

  render() {
    return (
      <GoogleMap
        defaultZoom={14}
        defaultCenter={{ lat: 50.0506762, lng: 19.9474994 }}
      >
        {
          this.props.markers.map(
            marker => (
              <MyMarker
                key={marker.title}
                marker={marker}
                isClicked={marker.title === this.props.selectedMarker}
                onMarkerClick={this.props.onMarkerClick(marker.title)}
                deselectMarker={this.props.deselectMarker}
              />
            )
          )
        }

      </GoogleMap>
    );
  }
}
 
export default withScriptjs(withGoogleMap(Map))