import { number, shape } from 'prop-types'
import React from 'react'
import {
  GoogleMap,
  Marker,
  withGoogleMap,
  withScriptjs
} from 'react-google-maps'
import { compose, withProps } from 'recompose'

const googleApiKey = process.env.REACT_APP_GOOGLE_API_KEY
const DetailsMap = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?v=3.exp&key=${googleApiKey}&libraries=places`,
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div style={{ height: '18rem', width: '100%' }} />,
    mapElement: <div style={{ height: '100%' }} />
  }),
  withScriptjs,
  withGoogleMap
)(props => {
  const mapOptions = {
    zoomControlOptions: {
      position: window.google.maps.ControlPosition.LEFT_TOP
    },
    fullscreenControlOptions: {
      position: window.google.maps.ControlPosition.RIGHT_TOP
    },
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    rotateControl: false,
    fullscreenControl: true
  }

  const mapathonIcon = {
    url: 'https://s3.amazonaws.com/axsmap-media/markers/mapathon-marker.svg',
    scaledSize: new google.maps.Size(40.66, 50),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(20.33, 50)
  }

  return (
    <GoogleMap
      defaultCenter={props.location}
      defaultZoom={15}
      options={mapOptions}
    >
      <Marker position={props.location} icon={mapathonIcon} />
    </GoogleMap>
  )
})

DetailsMap.propTypes = {
  location: shape({
    lat: number,
    lng: number
  })
}

export default DetailsMap
