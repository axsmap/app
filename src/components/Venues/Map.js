import { kebabCase } from 'lodash'
import React from 'react'
import {
  GoogleMap,
  Marker,
  withGoogleMap,
  withScriptjs
} from 'react-google-maps'
import { compose, withHandlers, withProps } from 'recompose'

import { venuesCategories } from '../../constants'

const apiKey = process.env.REACT_APP_GOOGLE_API_KEY

const Map = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?v=3.exp&key=${apiKey}&libraries=places`,
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: (
      <div
        style={{
          bottom: '3.5rem',
          position: 'fixed',
          top: '3.5rem',
          width: '100%'
        }}
      />
    ),
    mapElement: <div style={{ height: '100%' }} />
  }),
  withHandlers(() => {
    const refs = {
      map: undefined
    }

    return {
      onMapMounted: () => ref => {
        refs.map = ref
      },
      fitBounds: props => () => {
        const bounds = new google.maps.LatLngBounds()
        props.venues.map(venue =>
          bounds.extend(
            new google.maps.LatLng(venue.location.lat, venue.location.lng)
          )
        )

        refs.map.fitBounds(bounds)
      }
    }
  }),
  withScriptjs,
  withGoogleMap
)(props => {
  const mapOptions = {
    zoomControlOptions: {
      position: window.google.maps.ControlPosition.LEFT_TOP
    },
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    rotateControl: false,
    fullscreenControl: false,
    styles: [
      {
        featureType: 'poi',
        stylers: [
          {
            visibility: 'off'
          }
        ]
      }
    ]
  }

  if (props.venues.length > 0) {
    props.fitBounds()
  }

  return (
    <GoogleMap
      defaultCenter={{ lat: props.location.lat, lng: props.location.lng }}
      defaultZoom={15}
      options={mapOptions}
      ref={props.onMapMounted}
    >
      {props.venues.map(venue => {
        let selectedType = 'establishment'
        for (let i = 0; i < venuesCategories.length; i += 1) {
          const types = venuesCategories[i][Object.keys(venuesCategories[i])[0]]
          for (let j = 0; j < types.length; j += 1) {
            const type = venue.types.find(t => t === types[j])
            if (type) {
              selectedType = Object.keys(venuesCategories[i])
              break
            }
          }

          if (selectedType !== 'establishment') break
        }

        const venueIcon = {
          url: `https://s3.amazonaws.com/axsmap-media/markers/${kebabCase(
            selectedType
          )}-good.svg`,
          scaledSize: new google.maps.Size(40.66, 50),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(0, 0)
        }
        return (
          <Marker
            key={venue.placeId}
            position={venue.location}
            icon={venueIcon}
          />
        )
      })}
    </GoogleMap>
  )
})

export default Map
