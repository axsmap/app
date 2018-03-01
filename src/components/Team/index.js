import { array, bool, func, object, string } from 'prop-types'
import React, { PureComponent } from 'react'
import Helmet from 'react-helmet'
import { intlShape } from 'react-intl'
import styled from 'styled-components'

import Footer from '../Footer'
import NavBar from '../NavBar'
import Notification from '../../containers/Notification'
import Spinner from '../Spinner'
import TopBar from '../../containers/TopBar'
import Wrp from '../Wrapper'

import Details from './Details'
import Edit from './Edit'
import messages from './messages'

const Wrapper = styled(Wrp)`padding-bottom: 0;`

class Team extends PureComponent {
  static propTypes = {
    loadingTeam: bool.isRequired,
    team: object.isRequired,
    isAuthenticated: bool.isRequired,
    userData: object.isRequired,
    editIsVisible: bool.isRequired,
    errors: object.isRequired,
    loadingUsers: bool.isRequired,
    users: array.isRequired,
    sendingRequest: bool.isRequired,
    notificationMessage: string.isRequired,
    getTeam: func.isRequired,
    clearState: func.isRequired,
    setNotificationMessage: func.isRequired,
    joinTeam: func.isRequired,
    showEditTeam: func.isRequired,
    clearError: func.isRequired,
    removeManager: func.isRequired,
    promoteMember: func.isRequired,
    removeMember: func.isRequired,
    clearInvitationsState: func.isRequired,
    getUsers: func.isRequired,
    inviteUser: func.isRequired,
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

    let pageTitle = <Helmet title={formatMessage(messages.defaultPageTitle)} />
    if (this.props.editIsVisible) {
      pageTitle = (
        <Helmet
          title={formatMessage(messages.editPageTitle, {
            teamName: this.props.team.name
          })}
        />
      )
    } else if (!this.props.loadingTeam && this.props.team.id) {
      pageTitle = (
        <Helmet
          title={formatMessage(messages.detailsPageTitle, {
            teamName: this.props.team.name
          })}
        />
      )
    } else if (!this.props.loadingTeam && !this.props.team.id) {
      pageTitle = <Helmet title={formatMessage(messages.notFoundPageTitle)} />
    }

    let headerTitle = formatMessage(messages.detailsHeader)
    if (this.props.editIsVisible) {
      headerTitle = formatMessage(messages.editHeader)
    }

    let container = (
      <Details
        {...this.props.team}
        sendingRequest={this.props.sendingRequest}
        isAuthenticated={this.props.isAuthenticated}
        userData={this.props.userData}
        joinTeam={this.props.joinTeam}
        showEditTeam={this.props.showEditTeam}
      />
    )
    if (this.props.editIsVisible) {
      container = (
        <Edit
          team={this.props.team}
          errors={this.props.errors}
          loadingUsers={this.props.loadingUsers}
          users={this.props.users}
          sendingRequest={this.props.sendingRequest}
          setNotificationMessage={this.props.setNotificationMessage}
          clearError={this.props.clearError}
          removeManager={this.props.removeManager}
          promoteMember={this.props.promoteMember}
          removeMember={this.props.removeMember}
          clearInvitationsState={this.props.clearInvitationsState}
          getUsers={this.props.getUsers}
          inviteUser={this.props.inviteUser}
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
