import { bool, func, object } from 'prop-types'
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

import Details from './Details'
import messages from './messages'

const Wrapper = styled(Wrp)`
  padding-bottom: 0;
`

export default class ThankYouReview extends React.Component {
  static propTypes = {
    match: object.isRequired,
    history: object.isRequired,
    loadingVenue: bool.isRequired,
    venue: object.isRequired,
    getVenue: func.isRequired,
    clearState: func.isRequired
  }

  static contextTypes = {
    intl: intlShape
  }

  componentWillMount() {
    ReactGA.pageview(window.location.pathname + window.location.search)
  }

  componentDidMount() {
    this.props.getVenue(this.props.match.params.placeId)
  }

  componentWillUnmount() {
    this.props.clearState()
  }

  render() {
    const { formatMessage } = this.context.intl

    let pageTitle = <Helmet title={formatMessage(messages.defaultPageTitle)} />
    if (!this.props.loadingVenue && this.props.venue.placeId) {
      pageTitle = (
        <Helmet
          title={formatMessage(messages.detailsPageTitle, {
            venueName: this.props.venue.name
          })}
        />
      )
    } else if (!this.props.loadingVenue && !this.props.venue.placeId) {
      pageTitle = <Helmet title={formatMessage(messages.notFoundPageTitle)} />
    }

    const headerTitle = formatMessage(messages.detailsHeader)

    const reviewData = {
      allowsGuideDog: this.props.venue.allowsGuideDog,
      restroomScore: this.props.venue.restroomScore,
      entranceScore: this.props.venue.entranceScore,
      interiorScore: this.props.venue.interiorScore,
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
      <Wrapper className="bg-white">
        {pageTitle}

        <TopBar hideOn="phone,tablet" showSearch />

        <NavBar
          hideOn="desktop,widescreen"
          isNarrow
          title={headerTitle}
          goBackHandler={() => this.props.history.goBack()}
        />

        {this.props.loadingVenue ? (
          <Spinner />
        ) : (
          <Details
            reviewsRatioWeight={reviewsRatioWeight}
            generalType={generalType}
            venue={this.props.venue}
            className="bg-white"
          />
        )}

        <Footer hideOn="phone,tablet" isNarrow />
      </Wrapper>
    )
  }
}
