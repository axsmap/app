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

class Team extends PureComponent {
  static contextTypes = {
    intl: intlShape
  }

  static propTypes = {
    notificationMessage: string.isRequired,
    team: object.isRequired,
    sendingRequest: bool.isRequired,
    getTeam: func.isRequired
  }

  componentDidMount() {
    this.props.getTeam()
  }

  render() {
    const { sendingRequest, team } = this.props
    const formatMessage = this.context.intl.formatMessage

    let pageTitle
    if (this.props.sendingRequest || !team.id) {
      pageTitle = <Helmet title={formatMessage(messages.pageTitle)} />
    } else {
      pageTitle = (
        <Helmet
          title={formatMessage(messages.teamPageTitle, { teamName: team.name })}
        />
      )
    }

    return (
      <Wrapper>
        {pageTitle}

        <TopBar hideOn="phone,tablet" />

        <NavBar
          backURL="/teams"
          title={formatMessage(messages.headerTitle)}
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

        {sendingRequest || !team.id ? <Spinner /> : <Detail {...team} />}

        <Footer hideOn="phone,tablet" isNarrow />
      </Wrapper>
    )
  }
}

export default Team
