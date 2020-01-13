/* global google */

import { kebabCase } from 'lodash'
import { number, shape, string } from 'prop-types'
import React from 'react'
import {
  GoogleMap,
  Marker,
  withGoogleMap,
  withScriptjs
} from 'react-google-maps'
import { compose, withProps } from 'recompose'

const googleApiKey = process.env.REACT_APP_GOOGLE_API_KEY
const Map = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?v=3.exp&key=${googleApiKey}&libraries=places`,
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div style={{ height: '100%', width: '100%' }} />,
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

  let selectedScore = ''
  if (props.reviewsRatioWeight > 0 && props.reviewsRatioWeight < 0.25)
    selectedScore = '-bad'
  else if (props.reviewsRatioWeight >= 0.25 && props.reviewsRatioWeight < 0.75)
    selectedScore = '-average'
  else if (props.reviewsRatioWeight >= 0.75 && props.reviewsRatioWeight <= 1)
    selectedScore = '-good'

  let backgroundIcon = 'grey'
  if (selectedScore === '-bad') backgroundIcon = 'alert'
  if (selectedScore === '-average') backgroundIcon = 'primary'
  if (selectedScore === '-good') backgroundIcon = 'success'
  const icon = {
    url: `https://s3.amazonaws.com/axsmap-media/markers/${kebabCase(
      props.generalType
    )}${selectedScore}.svg`,
    background: backgroundIcon
  }
  const venueIcon = {
    url: icon.url,
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
      <Marker position={props.location} icon={venueIcon} />
    </GoogleMap>
  )
})

Map.propTypes = {
  reviewsRatioWeight: number.isRequired,
  generalType: string.isRequired,
  location: shape({
    lat: number.isRequired,
    lng: number.isRequired
  }).isRequired
}

export default Map
