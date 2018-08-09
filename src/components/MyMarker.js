import React, { Component } from 'react'
import { Marker, InfoWindow } from 'react-google-maps'
import { fetchRecommendedLocations } from '../forsquareAPI'

class MyMarker extends Component {
  state = {
    recommendations: []
  }

  componentDidUpdate() {
    const { recommendations } = this.state
    if (this.props.isClicked && recommendations.length === 0) {
      const markerLocation = this.props.marker.location
      fetchRecommendedLocations(
        markerLocation.lat,
        markerLocation.lng,
        (recommendations) => this.setState({recommendations })
      )
    }
  }

  render() {
    const { recommendations } = this.state
    const { isClicked, onMarkerClick, deselectMarker } = this.props
    const marker = this.props.marker
    return (
      <Marker
        position={marker.location}
        onClick={onMarkerClick}
        animation={isClicked && window.google.maps.Animation.BOUNCE}
      > 
        {isClicked && recommendations.length > 0 ? (
              <InfoWindow onCloseClick={deselectMarker}>
                <div>
                  <p className='marker-title'><a ole="link" href={marker.website}>{marker.title}</a></p>
                  <p>{marker.address}</p>
                  <p className='recommendations-title'>Recommended loctions nearby:</p>
                  <ul className='recommendations-list'>
                    {
                      recommendations.filter(
                        location => {
                          return location.venue.name !== marker.title
                        }
                      ).map(
                        location => (
                          <li key={location.venue.id}>{location.venue.name}</li>
                        )
                      )
                    }
                  </ul>

                </div>
              </InfoWindow>
        ) : null
        }
      </Marker>
    )
  }
}

export default MyMarker