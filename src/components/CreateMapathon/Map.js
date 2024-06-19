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
    containerElement: (
      <div
        style={{
          height: '300px',
          marginBottom: '1.5rem',
          width: '100%'
        }}
      />
    ),
    mapElement: <div style={{ height: '100%' }} />
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap
    center={props.location}
    defaultZoom={14}
    defaultCenter={props.location}
  >
    <Marker
      draggable
      position={props.location}
      onDragEnd={props.onLocationChange}
    />
  </GoogleMap>
))

export default Map
