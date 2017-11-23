import { curryRight, isEqual, kebabCase } from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'
import {
  GoogleMap as GM,
  Marker,
  withGoogleMap,
  withScriptjs
} from 'react-google-maps'
import { injectIntl } from 'react-intl'
import { compose, lifecycle, withProps } from 'recompose'
import styled from 'styled-components'

import ButtonIcon from '../ButtonIcon'
import { venuesCategories } from '../../constants'
import listIcon from '../../images/list.svg'
import locationIcon from '../../images/location.svg'
import redoIcon from '../../images/redo.svg'
import { colors, media } from '../../styles'

import messages from './messages'
import Popup from './Popup'

const Wrapper = styled.div`
  bottom: 3.5rem;
  position: fixed;
  right: 0;
  top: 3.5rem;
  z-index: ${props => (props.visible ? 10 : -1)};

  width: 100%;

  ${media.desktop`
    bottom: 0;
  `};

  ${media.widescreen`
    display: block;
    bottom: 0;
    width: 50%;
  `};
`

const SearchHereButton = styled(ButtonIcon)`
  left: 50%;
  position: absolute;
  top: 1rem;

  transform: translateX(-50%);

  margin: 0 auto;
`

const ShowListButton = styled(ButtonIcon)`
  display: block;

  ${media.widescreen`
    display: none;
  `};
`

const BottomWrapper = styled.div`
  bottom: 2rem;
  position: absolute;

  display: flex;

  justify-content: space-around;

  padding: 0 1rem;
  width: 100%;
`

const injectIntlDecorator = curryRight(injectIntl)

const googleApiKey = process.env.REACT_APP_GOOGLE_API_KEY
const GoogleMap = compose(
  injectIntlDecorator(),
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?v=3.exp&key=${googleApiKey}&libraries=places`,
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div style={{ height: '100%' }} />,
    mapElement: <div style={{ height: '100%' }} />
  }),
  lifecycle({
    componentWillMount() {
      this.setState({
        map: undefined,
        lastMarkerLocation: { lat: 0, lng: 0 },
        popupProperties: {
          location: { lat: 0, lng: 0 },
          photo: '',
          icon: '',
          name: '',
          entryScore: 0,
          bathroomScore: 0
        },
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
        togglePopup: (venue, icon) => {
          const location = { lat: venue.location.lat, lng: venue.location.lng }

          if (this.props.popupVisibility) {
            if (isEqual(location, this.state.lastMarkerLocation)) {
              this.props.hidePopup()
              return
            }

            this.setState({ lastMarkerLocation: location })

            this.props.hidePopup()

            this.setState({
              popupProperties: {
                location,
                photo: venue.photo,
                icon,
                name: venue.name,
                entryScore: venue.entryScore,
                bathroomScore: venue.bathroomScore
              }
            })
            this.props.showPopup(location)
          } else {
            this.setState({ lastMarkerLocation: location })

            this.setState({
              popupProperties: {
                location,
                photo: venue.photo,
                icon,
                name: venue.name,
                entryScore: venue.entryScore,
                bathroomScore: venue.bathroomScore
              }
            })

            this.props.showPopup(location)
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
    gestureHandling: 'greedy',
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

  return (
    <GM
      center={props.centerLocation}
      options={mapOptions}
      ref={props.onMapMounted}
      onClick={props.onClickMap}
      onDrag={props.onDragMap}
      onZoomChanged={props.onZoomMap}
    >
      {props.showSearchHere ? (
        <SearchHereButton
          backgroundColor={colors.alert}
          color="white"
          disabled={props.sendingRequest}
          text={props.intl.formatMessage(messages.searchHereButton)}
          icon={redoIcon}
          onClickHandler={props.loadCenterVenues}
        />
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

        let backgroundIcon = 'primary'
        if (selectedScore === '-bad') backgroundIcon = 'alert'
        if (selectedScore === '-average') backgroundIcon = 'warning'
        if (selectedScore === '-good') backgroundIcon = 'success'
        const icon = {
          url: `https://s3.amazonaws.com/axsmap-media/markers/${kebabCase(
            selectedType
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
          <Marker
            key={venue.placeId}
            position={venue.location}
            icon={venueIcon}
            onClick={() => props.togglePopup(venue, icon)}
          />
        )
      })}

      {props.popupVisibility ? (
        <Popup
          GoogleLatLng={google.maps.LatLng}
          GoogleSize={google.maps.Size}
          {...props.popupProperties}
        />
      ) : null}

      <BottomWrapper>
        <ButtonIcon
          backgroundColor={colors.secondary}
          color="white"
          disabled={props.sendingRequest}
          text={props.intl.formatMessage(messages.locateMeButton)}
          icon={locationIcon}
          onClickHandler={props.getUserLocation}
        />
        <ShowListButton
          backgroundColor={colors.lightestGrey}
          color={colors.darkestGrey}
          disabled={props.sendingRequest}
          text={props.intl.formatMessage(messages.showListButton)}
          icon={listIcon}
          onClickHandler={props.showList}
        />
      </BottomWrapper>
    </GM>
  )
})

const Map = props => (
  <Wrapper visible={props.visible}>
    <GoogleMap {...props} />
  </Wrapper>
)

Map.propTypes = {
  visible: PropTypes.bool.isRequired
}

export default Map
