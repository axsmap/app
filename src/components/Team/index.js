import { array, bool, func, object, string } from 'prop-types'
import React, { PureComponent } from 'react'
import Helmet from 'react-helmet'
import { intlShape } from 'react-intl'

import Footer from '../Footer'
import NavBar from '../NavBar'
import Notification from '../../containers/Notification'
import Spinner from '../Spinner'
import TopBar from '../../containers/TopBar'

import Detail from './Detail'
import Edit from './Edit'
import messages from './messages'
import Wrapper from './Wrapper'

class Team extends PureComponent {
  static propTypes = {
    loadingTeam: bool.isRequired,
    team: object.isRequired,
    isAuthenticated: bool.isRequired,
    userData: object.isRequired,
    editIsVisible: bool.isRequired,
    errors: object.isRequired,
    users: array.isRequired,
    sendingRequest: bool.isRequired,
    notificationMessage: string.isRequired,
    getTeam: func.isRequired,
    clearState: func.isRequired,
    showEditTeam: func.isRequired,
    setNotificationMessage: func.isRequired,
    clearError: func.isRequired,
    removeManager: func.isRequired,
    promoteMember: func.isRequired,
    hideEditTeam: func.isRequired,
    editTeam: func.isRequired
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
    const formatMessage = this.context.intl.formatMessage

    let pageTitle
    if (this.props.loadingTeam || !this.props.team.id) {
      pageTitle = <Helmet title={formatMessage(messages.pageTitle)} />
    } else if (this.props.editIsVisible) {
      pageTitle = (
        <Helmet
          title={formatMessage(messages.editTeamPageTitle, {
            teamName: this.props.team.name
          })}
        />
      )
    } else {
      pageTitle = (
        <Helmet
          title={formatMessage(messages.teamPageTitle, {
            teamName: this.props.team.name
          })}
        />
      )
    }

    let headerTitle = formatMessage(messages.teamHeaderTitle)
    if (this.props.editIsVisible) {
      headerTitle = formatMessage(messages.editTeamHeaderTitle)
    }

    let canEditTeam = false
    if (this.props.isAuthenticated) {
      const managedTeamsIds = this.props.userData.managedTeams.map(t => t.id)
      if (managedTeamsIds.includes(this.props.team.id)) canEditTeam = true
    }

    let container = (
      <Detail
        {...this.props.team}
        canEditTeam={canEditTeam}
        showEditTeam={this.props.showEditTeam}
      />
    )
    if (this.props.editIsVisible) {
      container = (
        <Edit
          team={this.props.team}
          errors={this.props.errors}
          users={this.props.users}
          sendingRequest={this.props.sendingRequest}
          setNotificationMessage={this.props.setNotificationMessage}
          clearError={this.props.clearError}
          removeManager={this.props.removeManager}
          promoteMember={this.props.promoteMember}
          hideEditTeam={this.props.hideEditTeam}
          editTeam={this.props.editTeam}
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
          backURL="/teams"
          title={headerTitle}
        />

        {this.props.notificationMessage ? (
          <Notification
            message={this.context.intl.formatMessage(
              messages[this.props.notificationMessage]
            )}
          />
        ) : null}

        {this.props.loadingTeam || !this.props.team.id ? (
          <Spinner />
        ) : (
          container
        )}

        <Footer hideOn="phone,tablet" isNarrow />
      </Wrapper>
    )
  }
}

export default Team
