import { bool, func, object, string } from 'prop-types'
import React, { PureComponent } from 'react'
import Helmet from 'react-helmet'
import { intlShape } from 'react-intl'
import styled from 'styled-components'

import Footer from '../Footer'
import NavBar from '../NavBar'
import Spinner from '../Spinner'
import TopBar from '../../containers/TopBar'
import { getGeneralType, getReviewsRatioWeight } from '../../utilities'
import Wrp from '../Wrapper'

import Details from './Details'
import messages from './messages'
import Review from './Review'

const Wrapper = styled(Wrp)`padding-bottom: 0;`

class Venue extends PureComponent {
  static propTypes = {
    match: object.isRequired,
    location: object.isRequired,
    isAuthenticated: bool.isRequired,
    history: object.isRequired,
    sendingRequest: bool.isRequired,
    loadingVenue: bool.isRequired,
    venue: object.isRequired,
    createReviewIsVisible: bool.isRequired,
    photo: string.isRequired,
    getVenue: func.isRequired,
    showCreateReview: func.isRequired,
    goToSignIn: func.isRequired,
    setNotificationMessage: func.isRequired,
    createPhoto: func.isRequired,
    deletePhoto: func.isRequired,
    hideCreateReview: func.isRequired,
    clearState: func.isRequired,
    createReview: func.isRequired
  }

  static contextTypes = {
    intl: intlShape
  }

  componentDidMount() {
    this.props.getVenue(this.props.match.params.placeId)

    if (this.props.location.hash === '#review') {
      if (this.props.isAuthenticated) {
        this.props.showCreateReview()
      } else {
        this.props.goToSignIn()
      }
    }
  }

  componentWillUnmount() {
    this.props.clearState()
  }

  render() {
    const formatMessage = this.context.intl.formatMessage

    let pageTitle = <Helmet title={formatMessage(messages.defaultPageTitle)} />
    if (this.props.createReviewIsVisible) {
      pageTitle = (
        <Helmet
          title={formatMessage(messages.createReviewPageTitle, {
            venueName: this.props.venue.name
          })}
        />
      )
    } else if (!this.props.loadingVenue && this.props.venue.id) {
      pageTitle = (
        <Helmet
          title={formatMessage(messages.detailsPageTitle, {
            venueName: this.props.venue.name
          })}
        />
      )
    } else if (!this.props.loadingVenue && !this.props.venue.id) {
      pageTitle = <Helmet title={formatMessage(messages.notFoundPageTitle)} />
    }

    let headerTitle = formatMessage(messages.detailsHeader)
    if (this.props.createReviewIsVisible) {
      headerTitle = formatMessage(messages.createReviewHeader)
    }

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

    let container = (
      <Details
        reviewsRatioWeight={reviewsRatioWeight}
        generalType={generalType}
        venue={this.props.venue}
        showCreateReview={this.props.showCreateReview}
      />
    )
    if (this.props.createReviewIsVisible) {
      container = (
        <Review
          isAuthenticated={this.props.isAuthenticated}
          reviewsRatioWeight={reviewsRatioWeight}
          generalType={generalType}
          coverPhoto={this.props.venue.coverPhoto}
          name={this.props.venue.name}
          sendingRequest={this.props.sendingRequest}
          photo={this.props.photo}
          goToSignIn={this.props.goToSignIn}
          setNotificationMessage={this.props.setNotificationMessage}
          createPhoto={this.props.createPhoto}
          deletePhoto={this.props.deletePhoto}
          hideCreateReview={this.props.hideCreateReview}
          createReview={this.props.createReview}
        />
      )
    }

    return (
      <Wrapper>
        {pageTitle}

        <TopBar hideOn="phone,tablet" />

        <NavBar
          hideOn="desktop,widescreen"
          isNarrow
          title={headerTitle}
          goBackHandler={() => this.props.history.goBack()}
        />

        {this.props.loadingVenue ? <Spinner /> : container}

        <Footer hideOn="phone,tablet" isNarrow />
      </Wrapper>
    )
  }
}

export default Venue
