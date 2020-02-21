/* global google */

import { isEqual, kebabCase } from 'lodash'
import { array, bool, func, object} from 'prop-types'
import React from 'react'
import {
  GoogleMap as GM,
  Marker,
  withGoogleMap,
  withScriptjs
} from 'react-google-maps'
import { intlShape } from 'react-intl'
import { compose, withProps } from 'recompose'
import styled from 'styled-components'

import Button from '../Button'
import Icon from '../Icon'
import { colors, media } from '../../styles'
import { getGeneralType } from '../../utilities'

import messages from './messages'
import Popup from './Popup'

const Wrapper = styled.div`
  bottom: 4rem;
  position: fixed;
  right: 0;
  top: 8rem;
  z-index: ${props => (props.visible ? 10 : -1)};
  width: 100%;
  overflow: hidden;

  ${media.mobile`
    margin-top: 4rem;
  `};

  ${media.tablet`
    top: 0rem;
  `};

  ${media.desktop`
    bottom: 0;
    margin-top:0;
    width: 40%;
    top: 4rem;
  `};

  ${media.widescreen`
    z-index: 10;
    bottom: 0;
    width: 57%;
    top: 4rem;
  `};

  @media only screen and (min-device-width: 1024px) and (max-device-width: 1366px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: landscape) {
    z-index: ${props => (props.visible ? 20 : -1)};
    top: 4rem;
    width: 45%;
  }

  @media only screen and (min-device-width: 1024px) and (max-device-width: 1366px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait) {
    z-index: ${props => (props.visible ? 20 : -1)};
    top: 4rem;
    width: 100%;
  }

  @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: landscape) {
    z-index: ${props => (props.visible ? 20 : -1)};
    top: 4rem;
    width: 100%;
  }

  &::after {
    bottom: 4rem;
    position: fixed;
    right: 0;
    top: 4rem;
    z-index: ${props => (props.visible ? -1 : 10)};

    height: 100%;
    width: 100%;

    background-color: ${colors.lightestGrey};

    content: ' ';

    ${media.widescreen`
      z-index: -1;
    `};
  }
`
const LocateBgColor = styled.p`
  color: ${colors.white};
`

const ButtonContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const ShowListButton = styled(Button)`
  display: block;

  ${media.tablet`
    display: block;
  `};

  ${media.desktop`
    display: none;
  `};

  ${media.widescreen`
    display: none;
  `};

  @media only screen and (min-device-width: 1024px) and (max-device-width: 1366px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait) {
    display: block;
  }

  @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: landscape) {
    display: block;
  }
`

const ButtonsWrapper = styled.div`
  bottom: 2rem;
  position: absolute;
  display: flex;
  justify-content: space-around;
  padding: 0 1rem;
  width: 100%;

  @media only screen and (min-device-width: 1024px) and (max-device-width: 1366px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait) {
    display: flex;
    bottom: 7rem;
  }

  @media only screen x and (min-device-width: 768px) and (max-device-width: 1024px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: landscape) {
    display: flex;
    bottom: 7rem;
  }
`

const SearchHereButton = styled(Button)`
  left: 50%;
  position: absolute;
  top: 1rem;
  transform: translateX(-50%);
  margin: 0 auto;
  padding-left: 10px !Important;
  padding-right: 10px !Important;
`

const LocateWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const googleApiKey = process.env.REACT_APP_GOOGLE_API_KEY
const myStyles = [
  {
    featureType: 'poi',
    elementType: 'labels',
    stylers: [{ visibility: 'off' }]
  }
]
const GoogleMap = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?v=3.exp&key=${googleApiKey}&libraries=places`,
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div style={{ height: '100%', background: 'transparent!important' }} />,
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
    fullscreenControl: true,
    gestureHandling: 'greedy',
    styles: myStyles
  }

  return (
    <GM
      options={mapOptions}
      center={props.centerLocation}
      zoom={props.zoom}
      ref={props.onMapMounted}
      onClick={props.onClickMap}
      onDrag={props.onDragMap}
      onZoomChanged={props.onZoomMap}
      key="map"
    >
      {props.children}
    </GM>
  )
})

export default class Map extends React.Component {
  static propTypes = {
    visible: bool.isRequired,
    userLocation: object.isRequired,
    centerLocation: object.isRequired,
    sendingRequest: bool.isRequired,
    venues: array.isRequired,
    popupVisibility: bool.isRequired,
    showSearchHere: bool.isRequired,
    showUserMarker: bool.isRequired,
    onClickMap: func.isRequired,
    onDragMap: func.isRequired,
    onZoomMap: func.isRequired,
    loadCenterVenues: func.isRequired,
    showPopup: func.isRequired,
    hidePopup: func.isRequired,
    getUserLocation: func.isRequired,
    showList: func.isRequired
  }

  static contextTypes = {
    intl: intlShape
  }

  state = {
    map: undefined,
    zoom: 15,
    lastZoom: undefined,
    lastMarkerLocation: { lat: 0, lng: 0 },
    popupProperties: {
      location: { lat: 0, lng: 0 },
      icon: '',
      name: '',
      address: '',
      entranceScore: 0,
      interiorScore: 0,
      restroomScore: 0,
      mapMarkerScore: 0,
      placeId: '',
      venue: ''
    }
  }

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

      if (this.state.lastZoom) {
        this.keepZoom()
      } else {
        this.zoomOut()
      }
    }
  }

  onMapMounted = ref => {
    this.setState({ map: ref })
  }

  onZoomMap = () => {
    this.setState({ zoom: this.state.map.getZoom() })
    this.props.onZoomMap()
  }

  keepZoom = () => {
    setTimeout(() => {
      this.setState({ zoom: this.state.lastZoom, lastZoom: undefined })
    }, 100)
  }

  zoomOut = () => {
    setTimeout(() => {
      this.setState({
        zoom: this.state.map.getZoom() - 1,
        lastZoom: undefined
      })
    }, 100)
  }

  loadCenterVenues = () => {
    const location = {
      lat: this.state.map.getCenter().lat(),
      lng: this.state.map.getCenter().lng()
    }
    this.setState({ lastZoom: this.state.zoom })
    this.props.loadCenterVenues(location)
  }

  togglePopup = (venue, icon) => {
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
          icon,
          name: venue.name,
          address: venue.address,
          entranceScore: venue.entranceScore,
          interiorScore: venue.interiorScore,
          restroomScore: venue.restroomScore,
          mapMarkerScore: venue.mapMarkerScore || 0,
          placeId: venue.placeId,
          venue
        }
      })
      this.props.showPopup(location)
    } else {
      this.setState({ lastMarkerLocation: location })

      this.setState({
        popupProperties: {
          location,
          icon,
          name: venue.name,
          address: venue.address,
          entranceScore: venue.entranceScore,
          interiorScore: venue.interiorScore,
          restroomScore: venue.restroomScore,
          mapMarkerScore: venue.mapMarkerScore || 0,
          placeId: venue.placeId,
          venue
        }
      })

      this.props.showPopup(location)
    }
  }

  render() {
    const { formatMessage } = this.context.intl

    return (
      <Wrapper visible={this.props.visible}>
        <GoogleMap
          centerLocation={this.props.centerLocation}
          zoom={this.state.zoom}
          onMapMounted={this.onMapMounted}
          onClickMap={this.props.onClickMap}
          onDragMap={this.props.onDragMap}
          onZoomMap={this.onZoomMap}
          draggable = {true}
        >
          {this.props.showSearchHere ? (
            <SearchHereButton
              float
              disabled={false}
              onClickHandler={this.loadCenterVenues}
              backgroundColor={colors.primary}
              color={colors.black}
              className="primary-btn"
            >
              <LocateWrap>
                <Icon glyph="rotate" size={1} color="black" />
                <span style={{ margin: '0 0 0 0.5rem' }}>
                  {formatMessage(messages.searchHereButton)}
                </span>
              </LocateWrap>
            </SearchHereButton>
          ) : null}

          {this.props.showUserMarker ? (
            <Marker
              position={this.props.userLocation}
              icon={{
                url:
                  'https://s3.amazonaws.com/axsmap-media/markers/hi-vis/location.png',
                scaledSize: new google.maps.Size(40.66, 50),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(20.33, 50)
              }}
              zIndex={google.maps.Marker.MAX_ZINDEX + 1}
            />
          ) : null}

          {this.props.venues.map(venue => {
            const selectedType = getGeneralType(venue.types)

            const reviewsRatioWeight = venue.mapMarkerScore || 0
            let selectedScore = ''
            if (reviewsRatioWeight === 1 && reviewsRatioWeight < 3)
              selectedScore = '-bad'
            else if (reviewsRatioWeight >= 3 && reviewsRatioWeight < 5)
              selectedScore = '-average'
            else if (reviewsRatioWeight >= 5) selectedScore = '-good'

            let backgroundIcon = 'gray700'
            if (selectedScore === '-bad') backgroundIcon = 'ratingCaution'
            if (selectedScore === '-average') backgroundIcon = 'ratingAlert'
            if (selectedScore === '-good') backgroundIcon = 'ratingAccessible'
            const icon = {
              url: `https://s3.amazonaws.com/axsmap-media/markers/hi-vis/${kebabCase(
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
                onClick={() => this.togglePopup(venue, icon)}
              />
            )
          })}

          {this.props.popupVisibility ? (
            <Popup
              GoogleLatLng={google.maps.LatLng}
              GoogleSize={google.maps.Size}
              sendingRequest={this.props.sendingRequest}
              {...this.state.popupProperties}
            />
          ) : null}

          <ButtonsWrapper>
            <Button
              float
              backgroundColor={colors.gray500}
              color={colors.white}
              disabled={this.props.sendingRequest}
              onClickHandler={this.props.getUserLocation}
              className="gray650-btn"
            >
              <ButtonContent>
                <Icon glyph="directionArrow" size={1} color={colors.white} />
                <LocateBgColor style={{ margin: '0 0 0 0.5rem' }}>
                  {formatMessage(messages.locateMeButton)}
                </LocateBgColor>
              </ButtonContent>
            </Button>
            <ShowListButton
              float
              backgroundColor={colors.gray500}
              color={colors.white}
              disabled={this.props.sendingRequest}
              onClickHandler={this.props.showList}
              className="gray650-btn"
            >
              <ButtonContent>
                <Icon glyph="list" size={1} color={colors.white} />
                <p style={{ margin: '0 0 0 0.5rem' }}>
                  {formatMessage(messages.showListButton)}
                </p>
              </ButtonContent>
            </ShowListButton>
          </ButtonsWrapper>
        </GoogleMap>
      </Wrapper>
    )
  }
}
