import InfoBox from 'react-google-maps/lib/components/addons/InfoBox'
import { isEqual, kebabCase } from 'lodash'
import React from 'react'
import {
  GoogleMap,
  Marker,
  withGoogleMap,
  withScriptjs
} from 'react-google-maps'
import { compose, lifecycle, withProps } from 'recompose'
import styled from 'styled-components'

import { venuesCategories } from '../../constants'
import listIcon from '../../images/list.svg'
import locationIcon from '../../images/location.svg'
import redoIcon from '../../images/redo.svg'
import { colors } from '../../styles'

const Button = styled.button`
  position: relative;
  z-index: 10;

  opacity: 1;

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
    opacity: 0.5;
  }
`

const Icon = styled.img`
  left: 1rem;
  position: absolute;
  top: 0.75rem;

  height: 1.5rem;
`

const TopButton = styled(Button)`
  left: 50%;
  position: absolute;
  top: 1rem;

  transform: translateX(-50%);

  margin: 0 auto;
`

const Popup = styled.div`
  display: flex;

  align-items: center;
  flex-direction: column;
  justify-content: center;

  height: 20rem;
  width: 18rem;
`

const Content = styled.div`
  flex-grow: 1;

  background-color: white;
  border-bottom-right-radius: 3px;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  padding: 1rem;
  width: inherit;
`

const ArrowPopup = styled.div`
  align-self: flex-start;

  border: 7px solid;
  border-color: white transparent transparent white;
  height: 0;
  margin-top: -1px;
  width: 0;

  content: ' ';
`

const TextPopup = styled.p`
  margin: 0;
  color: ${colors.darkestGrey};
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
const Map = compose(
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
  lifecycle({
    componentWillMount() {
      this.setState({
        map: undefined,
        lastMarkerLocation: { lat: 0, lng: 0 },
        onMapMounted: ref => {
          this.setState({ map: ref })
        },
        loadCenterVenues: () => {
          const location = {
            lat: this.state.map.getCenter().lat(),
            lng: this.state.map.getCenter().lng()
          }
          this.props.loadCenterVenues(location)
        },
        toggleInfobox: event => {
          if (this.props.infoboxVisibility) {
            const location = {
              lat: event.latLng.lat(),
              lng: event.latLng.lng()
            }

            if (isEqual(location, this.state.lastMarkerLocation)) {
              this.props.hideInfobox()
              return
            }
            this.setState({ lastMarkerLocation: location })

            this.props.hideInfobox()
            this.props.showInfobox(location)
          } else {
            const location = {
              lat: event.latLng.lat(),
              lng: event.latLng.lng()
            }
            this.setState({ lastMarkerLocation: location })
            this.props.showInfobox(location)
          }
        }
      })
    },
    componentDidUpdate(prevProps) {
      if (
        this.props.venues.length > 0 &&
        !isEqual(prevProps.venues, this.props.venues)
      ) {
        const bounds = new google.maps.LatLngBounds()
        this.props.venues.map(venue =>
          bounds.extend(
            new google.maps.LatLng(venue.location.lat, venue.location.lng)
          )
        )

        this.state.map.fitBounds(bounds)
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

  let location
  if (props.userLocation.lat !== 0 && props.userLocation.lng !== 0) {
    location = props.userLocation
  } else {
    location = props.centerLocation
  }

  return (
    <GoogleMap
      center={location}
      options={mapOptions}
      ref={props.onMapMounted}
      onDrag={props.onDragMap}
      onZoomChanged={props.onZoomMap}
    >
      {props.showSearchHere ? (
        <TopButton
          backgroundColor={colors.alert}
          color="white"
          disabled={props.sendingRequest}
          onClick={props.loadCenterVenues}
        >
          Search Here<Icon src={redoIcon} />
        </TopButton>
      ) : null}

      {props.showUserMarker ? (
        <Marker
          position={props.userLocation}
          icon={{
            url: 'https://s3.amazonaws.com/axsmap-media/markers/location.svg',
            scaledSize: new google.maps.Size(40.66, 50),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(20.33, 50)
          }}
          zIndex={google.maps.Marker.MAX_ZINDEX + 1}
        />
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
          anchor: new google.maps.Point(20.33, 50)
        }
        return (
          <Marker
            key={venue.placeId}
            position={venue.location}
            icon={venueIcon}
            onClick={props.toggleInfobox}
          />
        )
      })}

      {props.infoboxVisibility ? (
        <InfoBox
          position={
            new google.maps.LatLng(
              props.infoboxLocation.lat,
              props.infoboxLocation.lng
            )
          }
          options={{
            closeBoxURL: '',
            enableEventPropagation: false,
            alignBottom: true,
            pixelOffset: new google.maps.Size(0, -52)
          }}
        >
          <Popup>
            <Content>
              <TextPopup>asssssssssssssssss</TextPopup>
              <Button
                backgroundColor={colors.secondary}
                color="white"
                disabled={props.sendingRequest}
              >
                Locate Me<Icon src={locationIcon} />
              </Button>
            </Content>
            <ArrowPopup />
          </Popup>
        </InfoBox>
      ) : null}

      <BottomWrapper>
        <Button
          backgroundColor={colors.secondary}
          color="white"
          disabled={props.sendingRequest}
          onClick={props.getUserLocation}
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
    </GoogleMap>
  )
})

export default Map
