import { bool, func, object, string } from 'prop-types'
import React, { PureComponent } from 'react'
import Helmet from 'react-helmet'
import { intlShape } from 'react-intl'

import Footer from '../Footer'
import NavBar from '../NavBar'
import Notification from '../../containers/Notification'
import Spinner from '../Spinner'
import TopBar from '../../containers/TopBar'
import { getGeneralType, getReviewsRatioWeight } from '../../utilities'

import AddReviewButton from './AddReviewButton'
import Container from './Container'
import Header from './Header'
import Info from './Info'
import Map from './Map'
import messages from './messages'
import Photos from './Photos'
import Reviews from './Reviews'
import Wrapper from './Wrapper'

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
              <Photos key="photos" photos={this.props.venue.photos} />,
              <Reviews
                key="reviews"
                entryScore={this.props.venue.entryScore}
                entryReviews={this.props.venue.entryReviews}
                bathroomScore={this.props.venue.bathroomScore}
                bathroomReviews={this.props.venue.bathroomReviews}
                steps={this.props.venue.steps}
                allowsGuideDog={this.props.venue.allowsGuideDog}
                hasParking={this.props.venue.hasParking}
                hasSecondEntry={this.props.venue.hasSecondEntry}
                hasWellLit={this.props.venue.hasWellLit}
                isQuiet={this.props.venue.isQuiet}
                isSpacious={this.props.venue.isSpacious}
              />,
              <AddReviewButton key="addReviewButton" />
            ]
          )}
        </Container>

        <Footer hideOn="phone,tablet" isNarrow />
      </Wrapper>
    )
  }
}

export default Venue
