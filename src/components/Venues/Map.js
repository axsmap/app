import { kebabCase } from 'lodash'
import { rgba } from 'polished'
import React from 'react'
import {
  GoogleMap as GMap,
  Marker,
  withGoogleMap,
  withScriptjs
} from 'react-google-maps'
import { compose, withHandlers, withProps } from 'recompose'
import styled from 'styled-components'

import { venuesCategories } from '../../constants'
import listIcon from '../../images/list.svg'
import locationIcon from '../../images/location.svg'
import redoIcon from '../../images/redo.svg'
import { colors } from '../../styles'

const Button = styled.button`
  position: relative;
  z-index: 10;

  appearance: none;
  border: none;
  border-radius: 3px;
  box-shadow: none;
  height: 3rem;
  margin: 0;
  padding: 0 1rem 0 3rem;

  background-color: ${props => props.backgroundColor};
  cursor: pointer;

  color: ${props => props.color};
  font-size: 0.8rem;
  font-weight: bold;
  text-transform: uppercase;

  &:active,
  &:focus {
    outline: 2px solid ${colors.secondary};
  }

  &:disabled,
  &[disabled] {
    background-color: ${props => rgba(props.backgroundColor, 0.5)};
    color: ${props => rgba(props.color, 0.5)};
  }
`

const Icon = styled.img`
  left: 1rem;
  position: absolute;
  top: 0.75rem;
  height: 1.5rem;
`

const TopWrapper = styled.div`
  position: absolute;
  top: 1rem;

  display: flex;

  align-items: center;
  justify-content: center;

  padding: 0 1rem;
  width: 100%;
`

const BottomWrapper = styled.div`
  bottom: 2rem;
  position: absolute;

  display: flex;

  justify-content: space-around;

  padding: 0 1rem;
  width: 100%;
`

const googleApiKey = process.env.REACT_APP_GOOGLE_API_KEY
const GoogleMap = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?v=3.exp&key=${googleApiKey}&libraries=places`,
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
      },
      loadNearbyVenues: props => () => {
        const location = {
          lat: refs.map.getCenter().lat(),
          lng: refs.map.getCenter().lng()
        }
        props.loadNearbyVenues(location)
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
    <GMap
      defaultZoom={15}
      center={props.location}
      options={mapOptions}
      ref={props.onMapMounted}
      onDrag={props.setShowSearchHere(true)}
    >
      {props.showSearchHere ? (
        <TopWrapper>
          <Button
            backgroundColor={colors.alert}
            color="white"
            disabled={props.sendingRequest}
            onClick={props.loadNearbyVenues}
          >
            Search Here<Icon src={redoIcon} />
          </Button>
        </TopWrapper>
      ) : null}

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

        const bathroomScore = venue.bathroomScore || 0
        const entryScore = venue.entryScore || 0
        const averageScore = (bathroomScore + entryScore) / 2
        let selectedScore = ''
        if (averageScore >= 1 && averageScore < 3) selectedScore = '-bad'
        if (averageScore >= 3 && averageScore < 4) selectedScore = '-average'
        if (averageScore >= 4 && averageScore <= 5) selectedScore = -'good'

        const venueIcon = {
          url: `https://s3.amazonaws.com/axsmap-media/markers/${kebabCase(
            selectedType
          )}${selectedScore}.svg`,
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

      <BottomWrapper>
        <Button
          backgroundColor={colors.secondary}
          color="white"
          disabled={props.sendingRequest}
        >
          Locate Me<Icon src={locationIcon} />
        </Button>
        <Button
          backgroundColor={colors.lightestGrey}
          color={colors.darkestGrey}
          disabled={props.sendingRequest}
        >
          Show List<Icon src={listIcon} />
        </Button>
      </BottomWrapper>
    </GMap>
  )
})

export default GoogleMap
