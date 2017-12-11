import { forOwn } from 'lodash'
import { bool, func, object, string } from 'prop-types'
import React, { PureComponent } from 'react'
import Helmet from 'react-helmet'
import { intlShape } from 'react-intl'

import { venuesCategories } from '../../constants'
import Footer from '../Footer'
import NavBar from '../NavBar'
import Notification from '../../containers/Notification'
import Spinner from '../Spinner'
import TopBar from '../../containers/TopBar'

import Container from './Container'
import Header from './Header'
import Info from './Info'
import Map from './Map'
import messages from './messages'
import Photos from './Photos'
import Wrapper from './Wrapper'

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

function getGeneralType(venuesTypes) {
  let generalType = 'store'
  for (let i = 0; i < venuesCategories.length; i += 1) {
    const types = venuesCategories[i].options
    for (let j = 0; j < types.length; j += 1) {
      const type = venuesTypes.find(t => t === types[j])
      if (type) {
        generalType = venuesCategories[i].value
        break
      }
    }

    if (generalType !== 'store') break
  }

  return generalType
}

class Venue extends PureComponent {
  static propTypes = {
    match: object.isRequired,
    sendingRequest: bool.isRequired,
    venue: object.isRequired,
    notificationMessage: string.isRequired,
    clearCurrentUrl: func.isRequired,
    getVenue: func.isRequired
  }

  static contextTypes = {
    intl: intlShape
  }

  componentDidMount() {
    this.props.clearCurrentUrl()
    this.props.getVenue(this.props.match.params.placeId)
  }

  render() {
    const reviewData = {
      allowsGuideDog: this.props.venue.allowsGuideDog,
      bathroomScore: this.props.venue.bathroomScore,
      entryScore: this.props.venue.entryScore,
      hasParking: this.props.venue.hasParking,
      hasSecondEntry: this.props.venue.hasSecondEntry,
      hasWellLit: this.props.venue.hasWellLit,
      isQuiet: this.props.venue.isQuiet,
      isSpacious: this.props.venue.isSpacious,
      steps: this.props.venue.steps
    }

    const reviewsRatioWeight = getReviewsRatioWeight(reviewData)
    const generalType = getGeneralType(this.props.venue.types)

    return (
      <Wrapper>
        <Helmet
          title={this.context.intl.formatMessage(messages.pageTitle, {
            venueName: this.props.venue.name
          })}
        />

        <TopBar hideOn="phone,tablet" />

        <NavBar
          backURL="/"
          title={this.context.intl.formatMessage(messages.headerTitle)}
          hideOn="desktop,widescreen"
          isNarrow
        />

        {this.props.notificationMessage ? (
          <Notification
            message={this.context.intl.formatMessage(
              messages[this.props.notificationMessage]
            )}
          />
        ) : null}

        <Container>
          {this.props.sendingRequest ? (
            <Spinner />
          ) : (
            [
              <Header
                key="header"
                reviewsRatioWeight={reviewsRatioWeight}
                generalType={generalType}
                coverPhoto={this.props.venue.coverPhoto}
                name={this.props.venue.name}
              />,
              <Info
                key="info"
                address={this.props.venue.address}
                formattedPhone={this.props.venue.formattedPhone}
                internationalPhone={this.props.venue.internationalPhone}
                website={this.props.venue.website}
              />,
              <Map
                key="map"
                reviewsRatioWeight={reviewsRatioWeight}
                generalType={generalType}
                location={this.props.venue.location}
              />,
              <Photos key="photos" />
            ]
          )}
        </Container>

        <Footer isNarrow />
      </Wrapper>
    )
  }
}

export default Venue
