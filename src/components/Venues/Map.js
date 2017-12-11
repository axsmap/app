import { curryRight, forOwn, isEqual, kebabCase } from 'lodash'
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

import Button from '../Button'
import { venuesCategories } from '../../constants'
import Icon from '../Icon'
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
    z-index: 10;
    bottom: 0;
    width: 50%;
  `};

  &::after {
    bottom: 3.5rem;
    position: fixed;
    right: 0;
    top: 3.5rem;
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

const ButtonContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const SearchHereButton = styled(Button)`
  left: 50%;
  position: absolute;
  top: 1rem;

  transform: translateX(-50%);

  margin: 0 auto;
`

const ShowListButton = styled(Button)`
  display: block;

  ${media.widescreen`
    display: none;
  `};
`

const ButtonsWrapper = styled.div`
  bottom: 2rem;
  position: absolute;

  display: flex;

  justify-content: space-between;

  padding: 0 1rem;
  width: 100%;

  ${media.tablet`
    justify-content: space-around;
  `};
`

const injectIntlDecorator = curryRight(injectIntl)

function getReviewsRatioWeight(reviewData) {
  let reviewsTotalWeight = 0
  let reviewsActualWeight = 0

  if (reviewData.bathroomScore) {
    reviewsTotalWeight += 3

    const bathroomScore = reviewData.bathroomScore
    if (bathroomScore >= 1 && bathroomScore < 3) reviewsActualWeight += 1
    else if (bathroomScore >= 3 && bathroomScore < 4) reviewsActualWeight += 2
    else reviewsActualWeight += 3
  }
  if (reviewData.entryScore) {
    reviewsTotalWeight += 3

    const entryScore = reviewData.entryScore
    if (entryScore >= 1 && entryScore < 3) reviewsActualWeight += 1
    else if (entryScore >= 3 && entryScore < 4) reviewsActualWeight += 2
    else reviewsActualWeight += 3
  }
  if (reviewData.steps) {
    reviewsTotalWeight += 2

    const maxSteps = { value: 0, key: '' }
    forOwn(reviewData.steps, (value, key) => {
      if (value > maxSteps.value) {
        maxSteps.value = value
        maxSteps.key = key
      }
    })

    if (maxSteps.key === 'zero') reviewsActualWeight += 2
    else if (maxSteps.key === 'one') reviewsActualWeight += 1
    else if (maxSteps.key === 'two') reviewsActualWeight += 0.5
  }
  if (reviewData.allowsGuideDog) {
    reviewsTotalWeight += 0.5

    const allowsGuideDog = reviewData.allowsGuideDog
    if (allowsGuideDog.yes > allowsGuideDog.no) reviewsActualWeight += 0.5
    else if (allowsGuideDog.yes === allowsGuideDog.no)
      reviewsActualWeight += 0.25
  }
  if (reviewData.hasParking) {
    reviewsTotalWeight += 0.5

    const hasParking = reviewData.hasParking
    if (hasParking.yes > hasParking.no) reviewsActualWeight += 0.5
    else if (hasParking.yes === hasParking.no) reviewsActualWeight += 0.25
  }
  if (reviewData.hasSecondEntry) {
    reviewsTotalWeight += 0.5

    const hasSecondEntry = reviewData.hasSecondEntry
    if (hasSecondEntry.yes > hasSecondEntry.no) reviewsActualWeight += 0.5
    else if (hasSecondEntry.yes === hasSecondEntry.no)
      reviewsActualWeight += 0.25
  }
  if (reviewData.hasWellLit) {
    reviewsTotalWeight += 0.5

    const hasWellLit = reviewData.hasWellLit
    if (hasWellLit.yes > hasWellLit.no) reviewsActualWeight += 0.5
    else if (hasWellLit.yes === hasWellLit.no) reviewsActualWeight += 0.25
  }
  if (reviewData.isQuiet) {
    reviewsTotalWeight += 0.5

    const isQuiet = reviewData.isQuiet
    if (isQuiet.yes > isQuiet.no) reviewsActualWeight += 0.5
    else if (isQuiet.yes === isQuiet.no) reviewsActualWeight += 0.25
  }
  if (reviewData.isSpacious) {
    reviewsTotalWeight += 1

    const isSpacious = reviewData.isSpacious
    if (isSpacious.yes > isSpacious.no) reviewsActualWeight += 1
    else if (isSpacious.yes === isSpacious.no) reviewsActualWeight += 0.5
  }

  if (reviewsTotalWeight) return reviewsActualWeight / reviewsTotalWeight
  return 0
}

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
          bathroomScore: 0,
          placeId: ''
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
                bathroomScore: venue.bathroomScore,
                placeId: venue.placeId
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
                bathroomScore: venue.bathroomScore,
                placeId: venue.placeId
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
    fullscreenControlOptions: {
      position: window.google.maps.ControlPosition.RIGHT_TOP
    },
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    rotateControl: false,
    fullscreenControl: true,
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
          onClickHandler={props.loadCenterVenues}
        >
          <ButtonContent>
            <Icon glyph="rotate" size={1} color="white" />
            <p style={{ margin: '0 0 0 0.5rem' }}>
              {props.intl.formatMessage(messages.searchHereButton)}
            </p>
          </ButtonContent>
        </SearchHereButton>
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
          const types = venuesCategories[i].options
          for (let j = 0; j < types.length; j += 1) {
            const type = venue.types.find(t => t === types[j])
            if (type) {
              selectedType = venuesCategories[i].value
              break
            }
          }

          if (selectedType !== 'establishment') break
        }

        const reviewData = {
          allowsGuideDog: venue.allowsGuideDog,
          bathroomScore: venue.bathroomScore,
          entryScore: venue.entryScore,
          hasParking: venue.hasParking,
          hasSecondEntry: venue.hasSecondEntry,
          hasWellLit: venue.hasWellLit,
          isQuiet: venue.isQuiet,
          isSpacious: venue.isSpacious,
          steps: venue.steps
        }
        const reviewsRatioWeight = getReviewsRatioWeight(reviewData)
        let selectedScore = ''
        if (reviewsRatioWeight > 0 && reviewsRatioWeight < 0.25)
          selectedScore = '-bad'
        else if (reviewsRatioWeight >= 0.25 && reviewsRatioWeight < 0.75)
          selectedScore = '-average'
        else if (reviewsRatioWeight >= 0.75 && reviewsRatioWeight <= 1)
          selectedScore = '-good'

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
          sendingRequest={props.sendingRequest}
          {...props.popupProperties}
        />
      ) : null}

      <ButtonsWrapper>
        <Button
          backgroundColor={colors.secondary}
          color="white"
          disabled={props.sendingRequest}
          onClickHandler={props.getUserLocation}
        >
          <ButtonContent>
            <Icon glyph="directionArrow" size={1} color="white" />
            <p style={{ margin: '0 0 0 0.5rem' }}>
              {props.intl.formatMessage(messages.locateMeButton)}
            </p>
          </ButtonContent>
        </Button>
        <ShowListButton
          backgroundColor={colors.lightestGrey}
          color={colors.darkestGrey}
          disabled={props.sendingRequest}
          onClickHandler={props.showList}
        >
          <ButtonContent>
            <Icon glyph="list" size={1} color={colors.darkestGrey} />
            <p style={{ margin: '0 0 0 0.5rem' }}>
              {props.intl.formatMessage(messages.showListButton)}
            </p>
          </ButtonContent>
        </ShowListButton>
      </ButtonsWrapper>
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
