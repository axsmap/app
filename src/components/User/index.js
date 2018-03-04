import { bool, func, object, string } from 'prop-types'
import React from 'react'
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

export default class User extends React.Component {
  static propTypes = {
    history: object.isRequired,
    loadingUser: bool.isRequired,
    user: object.isRequired,
    notificationMessage: string.isRequired,
    sendingRequest: bool.isRequired,
    isAuthenticated: bool.isRequired,
    userData: object.isRequired,
    editIsVisible: bool.isRequired,
    errors: object.isRequired,
    getUser: func.isRequired,
    clearState: func.isRequired,
    showEditUser: func.isRequired,
    setNotificationMessage: func.isRequired,
    clearError: func.isRequired,
    leaveTeam: func.isRequired,
    leaveMapathon: func.isRequired,
    hideEditUser: func.isRequired,
    editUser: func.isRequired
  }

  static contextTypes = {
    intl: intlShape
  }

  componentDidMount() {
    this.props.getUser()
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
            userName: `${this.props.user.firstName} ${this.props.user.lastName}`
          })}
        />
      )
    } else if (!this.props.loadingUser && this.props.user.id) {
      pageTitle = (
        <Helmet
          title={formatMessage(messages.detailsPageTitle, {
            userName: `${this.props.user.firstName} ${this.props.user.lastName}`
          })}
        />
      )
    } else if (!this.props.loadingUser && !this.props.user.id) {
      pageTitle = <Helmet title={formatMessage(messages.notFoundPageTitle)} />
    }

    let headerTitle = formatMessage(messages.detailsHeader)
    if (this.props.editIsVisible) {
      headerTitle = formatMessage(messages.editHeader)
    }

    let container = (
      <Details
        {...this.props.user}
        sendingRequest={this.props.sendingRequest}
        isAuthenticated={this.props.isAuthenticated}
        userData={this.props.userData}
        showEditUser={this.props.showEditUser}
      />
    )
    if (this.props.editIsVisible) {
      container = (
        <Edit
          user={this.props.user}
          errors={this.props.errors}
          sendingRequest={this.props.sendingRequest}
          setNotificationMessage={this.props.setNotificationMessage}
          clearError={this.props.clearError}
          leaveTeam={this.props.leaveTeam}
          leaveMapathon={this.props.leaveMapathon}
          hideEditUser={this.props.hideEditUser}
          editUser={this.props.editUser}
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

        {this.props.notificationMessage ? (
          <Notification
            message={this.context.intl.formatMessage(
              messages[this.props.notificationMessage]
            )}
          />
        ) : null}

        {this.props.loadingUser || !this.props.user.id ? (
          <Spinner />
        ) : (
          container
        )}

        <Footer hideOn="phone,tablet" isNarrow />
      </Wrapper>
    )
  }
}
