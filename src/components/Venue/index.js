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
    sendingRequest: bool.isRequired,
    showCreateReview: bool.isRequired,
    venue: object.isRequired,
    notificationMessage: string.isRequired,
    clearCurrentUrl: func.isRequired,
    getVenue: func.isRequired,
    setShowCreateReview: func.isRequired,
    clearState: func.isRequired
  }

  static contextTypes = {
    intl: intlShape
  }

  componentDidMount() {
    this.props.clearCurrentUrl()
    this.props.getVenue(this.props.match.params.placeId)

    if (this.props.location.hash === '#review') {
      this.props.setShowCreateReview(true)
    }
  }

  componentWillUnmount() {
    this.props.clearState()
  }

  render() {
    let pageTitle
    if (this.props.sendingRequest) pageTitle = null
    else if (this.props.venue.placeId && this.props.showCreateReview)
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
    if (this.props.showCreateReview) navBarTitle = 'reviewHeaderTitle'

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
            showCreateReview={this.props.showCreateReview}
            venue={this.props.venue}
            setShowCreateReview={this.props.setShowCreateReview}
          />
        )}

        <Footer hideOn="phone,tablet" isNarrow />
      </Wrapper>
    )
  }
}

export default Venue
