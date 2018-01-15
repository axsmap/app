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
  static propTypes = {
    notificationMessage: string.isRequired,
    isAuthenticated: bool.isRequired,
    userData: object.isRequired,
    editIsVisible: bool.isRequired,
    team: object.isRequired,
    sendingRequest: bool.isRequired,
    getTeam: func.isRequired,
    clearState: func.isRequired,
    showEditTeam: func.isRequired
  }

  static contextTypes = {
    intl: intlShape
  }

  componentDidMount() {
    this.props.getTeam()
  }

  componentWillUnmount() {
    this.props.clearState()
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

    let canEditTeam = false
    if (this.props.isAuthenticated) {
      const managedTeamsIds = this.props.userData.managedTeams.map(t => t.id)
      if (managedTeamsIds.includes(team.id)) canEditTeam = true
    }

    let container = (
      <Detail
        {...team}
        canEditTeam={canEditTeam}
        showEditTeam={this.props.showEditTeam}
      />
    )
    if (this.props.editIsVisible) {
      container = null
    }

    return (
      <Wrapper>
        {pageTitle}

        <TopBar hideOn="phone,tablet" />

        <NavBar
          hideOn="desktop,widescreen"
          isNarrow
          backURL="/teams"
          title={formatMessage(messages.headerTitle)}
        />

        {this.props.notificationMessage ? (
          <Notification
            message={this.context.intl.formatMessage(
              messages[this.props.notificationMessage]
            )}
          />
        ) : null}

        {sendingRequest || !team.id ? <Spinner /> : container}

        <Footer hideOn="phone,tablet" isNarrow />
      </Wrapper>
    )
  }
}

export default Team
