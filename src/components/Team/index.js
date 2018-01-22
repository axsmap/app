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
    const {
      clearError,
      editIsVisible,
      editTeam,
      errors,
      hideEditTeam,
      isAuthenticated,
      loadingTeam,
      notificationMessage,
      sendingRequest,
      setNotificationMessage,
      showEditTeam,
      team,
      userData,
      users
    } = this.props
    const formatMessage = this.context.intl.formatMessage

    let pageTitle
    if (loadingTeam || !team.id) {
      pageTitle = <Helmet title={formatMessage(messages.pageTitle)} />
    } else if (editIsVisible) {
      pageTitle = (
        <Helmet
          title={formatMessage(messages.editTeamPageTitle, {
            teamName: team.name
          })}
        />
      )
    } else {
      pageTitle = (
        <Helmet
          title={formatMessage(messages.teamPageTitle, { teamName: team.name })}
        />
      )
    }

    let headerTitle = formatMessage(messages.teamHeaderTitle)
    if (editIsVisible) {
      headerTitle = formatMessage(messages.editTeamHeaderTitle)
    }

    let canEditTeam = false
    if (isAuthenticated) {
      const managedTeamsIds = userData.managedTeams.map(t => t.id)
      if (managedTeamsIds.includes(team.id)) canEditTeam = true
    }

    let container = (
      <Detail {...team} canEditTeam={canEditTeam} showEditTeam={showEditTeam} />
    )
    if (editIsVisible) {
      container = (
        <Edit
          team={team}
          errors={errors}
          users={users}
          sendingRequest={sendingRequest}
          setNotificationMessage={setNotificationMessage}
          clearError={clearError}
          hideEditTeam={hideEditTeam}
          editTeam={editTeam}
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

        {notificationMessage ? (
          <Notification
            message={this.context.intl.formatMessage(
              messages[notificationMessage]
            )}
          />
        ) : null}

        {loadingTeam || !team.id ? <Spinner /> : container}

        <Footer hideOn="phone,tablet" isNarrow />
      </Wrapper>
    )
  }
}

export default Team
