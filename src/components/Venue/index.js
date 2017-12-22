import { bool, func, object, string } from 'prop-types'
import React, { PureComponent } from 'react'
import Helmet from 'react-helmet'
import { intlShape } from 'react-intl'

import Footer from '../Footer'
import NavBar from '../NavBar'
import Notification from '../../containers/Notification'
import Spinner from '../Spinner'
import TopBar from '../../containers/TopBar'

import Detail from './Detail'
import messages from './messages'
import Wrapper from './Wrapper'

class Venue extends PureComponent {
  static propTypes = {
    match: object.isRequired,
    location: object.isRequired,
    isAuthenticated: bool.isRequired,
    sendingRequest: bool.isRequired,
    createReviewVisible: bool.isRequired,
    venue: object.isRequired,
    notificationMessage: string.isRequired,
    clearCurrentUrl: func.isRequired,
    getVenue: func.isRequired,
    showCreateReview: func.isRequired,
    goToSignIn: func.isRequired,
    setNotificationMessage: func.isRequired,
    hideCreateReview: func.isRequired,
    clearState: func.isRequired,
    createReview: func.isRequired
  }

  static contextTypes = {
    intl: intlShape
  }

  componentDidMount() {
    this.props.clearCurrentUrl()
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
    let pageTitle
    if (this.props.sendingRequest) pageTitle = null
    else if (this.props.venue.placeId && this.props.createReviewVisible)
      pageTitle = (
        <Helmet
          title={this.context.intl.formatMessage(messages.reviewPageTitle, {
            venueName: this.props.venue.name
          })}
        />
      )
    else if (this.props.venue.placeId)
      pageTitle = (
        <Helmet
          title={this.context.intl.formatMessage(messages.detailsPageTitle, {
            venueName: this.props.venue.name
          })}
        />
      )
    else
      pageTitle = (
        <Helmet
          title={this.context.intl.formatMessage(messages.notFoundPageTitle)}
        />
      )

    let navBarTitle = 'detailsHeaderTitle'
    if (this.props.createReviewVisible) navBarTitle = 'reviewHeaderTitle'

    return (
      <Wrapper>
        {pageTitle}

        <TopBar hideOn="phone,tablet" />

        <NavBar
          backURL="/"
          title={this.context.intl.formatMessage(messages[navBarTitle])}
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

        {this.props.sendingRequest ? (
          <Spinner />
        ) : (
          <Detail
            venue={this.props.venue}
            createReviewVisible={this.props.createReviewVisible}
            isAuthenticated={this.props.isAuthenticated}
            sendingRequest={this.props.sendingRequest}
            goToSignIn={this.props.goToSignIn}
            setNotificationMessage={this.props.setNotificationMessage}
            showCreateReview={this.props.showCreateReview}
            hideCreateReview={this.props.hideCreateReview}
            createReview={this.props.createReview}
          />
        )}

        <Footer hideOn="phone,tablet" isNarrow />
      </Wrapper>
    )
  }
}

export default Venue
