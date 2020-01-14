import { bool, func, object, string } from 'prop-types'
import React from 'react'
import ReactGA from 'react-ga'
import Helmet from 'react-helmet'
import { intlShape } from 'react-intl'
import styled from 'styled-components'

import Footer from '../Footer'
import NavBar from '../NavBar'
import Spinner from '../Spinner'
import TopBar from '../../containers/TopBar'
import { getGeneralType, getReviewsRatioWeight } from '../../utilities'
import Wrp from '../Wrapper'

import messages from './messages'
import Review from './Review'

const Wrapper = styled(Wrp)`
  padding-bottom: 0;
`

export default class CreateReview extends React.Component {
  static propTypes = {
    match: object.isRequired,
    loadingVenue: bool.isRequired,
    venue: object.isRequired,
    history: object.isRequired,
    errors: object.isRequired,
    userData: object.isRequired,
    photo: string.isRequired,
    sendingRequest: bool.isRequired,
    getVenue: func.isRequired,
    clearState: func.isRequired,
    setNotificationMessage: func.isRequired,
    clearError: func.isRequired,
    createReview: func.isRequired
  }

  static contextTypes = {
    intl: intlShape
  }

  componentWillMount() {
    // Dev Note: Uncomment out when merging with master
    // ReactGA.pageview(window.location.pathname + window.location.search)
  }

  componentDidMount() {
    this.props.getVenue(this.props.match.params.placeId)
  }

  componentWillUnmount() {
    this.props.clearState()
  }

  render() {
    const formatMessage = this.context.intl.formatMessage

    let pageTitle = <Helmet title={formatMessage(messages.defaultPageTitle)} />
    if (!this.props.loadingVenue && !this.props.venue.placeId) {
      pageTitle = <Helmet title={formatMessage(messages.notFoundPageTitle)} />
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

    const headerTitle = formatMessage(messages.createReviewHeader)

    const reviewsRatioWeight = getReviewsRatioWeight(reviewData)
    const generalType = getGeneralType(this.props.venue.types)

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

        {this.props.loadingVenue ? (
          <Spinner />
        ) : (
          <Review
            userData={this.props.userData}
            reviewsRatioWeight={reviewsRatioWeight}
            generalType={generalType}
            venue={this.props.venue}
            errors={this.props.errors}
            sendingRequest={this.props.sendingRequest}
            setNotificationMessage={this.props.setNotificationMessage}
            clearError={this.props.clearError}
            createReview={this.props.createReview}
          />
        )}

        <Footer hideOn="phone,tablet" isNarrow />
      </Wrapper>
    )
  }
}
