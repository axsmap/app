import { array, bool, func, number, object, string } from 'prop-types'
import React from 'react'
import ReactGA from 'react-ga'
import Helmet from 'react-helmet'
import { intlShape } from 'react-intl'
import styled from 'styled-components'

import Footer from '../Footer'
import NavBar from '../NavBar'
import Spinner from '../Spinner'
import TopBar from '../../containers/TopBar'
import Wrp from '../Wrapper'

import Details from './Details'
import Edit from './Edit'
import messages from './messages'

const Wrapper = styled(Wrp)`
  padding-bottom: 0;
`

export default class User extends React.Component {
  static propTypes = {
    history: object.isRequired,
    loadingUser: bool.isRequired,
    user: object.isRequired,
    avatar: string.isRequired,
    sendingRequest: bool.isRequired,
    isAuthenticated: bool.isRequired,
    userData: object.isRequired,
    editIsVisible: bool.isRequired,
    errors: object.isRequired,
    filter: string.isRequired,
    loadingPetitions: bool.isRequired,
    nextPage: number,
    petitions: array.isRequired,
    getUser: func.isRequired,
    clearState: func.isRequired,
    signOut: func.isRequired,
    showEditUser: func.isRequired,
    clearErrors: func.isRequired,
    setNotificationMessage: func.isRequired,
    clearError: func.isRequired,
    createAvatar: func.isRequired,
    deleteAvatar: func.isRequired,
    leaveTeam: func.isRequired,
    leaveMapathon: func.isRequired,
    getPetitions: func.isRequired,
    onClickFilterReceived: func.isRequired,
    onClickFilterSent: func.isRequired,
    setPetitionAccepted: func.isRequired,
    setPetitionCanceled: func.isRequired,
    setPetitionRejected: func.isRequired,
    hideEditUser: func.isRequired,
    editUser: func.isRequired
  }

  static contextTypes = {
    intl: intlShape
  }

  componentWillMount() {
    ReactGA.pageview(window.location.pathname + window.location.search)
  }

  componentDidMount() {
    this.props.getUser()
  }

  componentWillUnmount() {
    this.props.clearState()
  }

  render() {
    const {formatMessage} = this.context.intl

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
        signOut={this.props.signOut}
        showEditUser={this.props.showEditUser}
      />
    )
    if (this.props.editIsVisible) {
      container = (
        <Edit
          user={this.props.user}
          avatar={this.props.avatar}
          errors={this.props.errors}
          sendingRequest={this.props.sendingRequest}
          filter={this.props.filter}
          loadingPetitions={this.props.loadingPetitions}
          nextPage={this.props.nextPage}
          petitions={this.props.petitions}
          clearErrors={this.props.clearErrors}
          setNotificationMessage={this.props.setNotificationMessage}
          clearError={this.props.clearError}
          createAvatar={this.props.createAvatar}
          deleteAvatar={this.props.deleteAvatar}
          leaveTeam={this.props.leaveTeam}
          leaveMapathon={this.props.leaveMapathon}
          getPetitions={this.props.getPetitions}
          onClickFilterReceived={this.props.onClickFilterReceived}
          onClickFilterSent={this.props.onClickFilterSent}
          setPetitionAccepted={this.props.setPetitionAccepted}
          setPetitionCanceled={this.props.setPetitionCanceled}
          setPetitionRejected={this.props.setPetitionRejected}
          hideEditUser={this.props.hideEditUser}
          editUser={this.props.editUser}
        />
      )
    }

    return (
      <Wrapper>
        {pageTitle}

        <TopBar hideOn="phone,tablet" showSearch />

        <NavBar
          hideOn="desktop,widescreen"
          isNarrow
          title={headerTitle}
          goBackHandler={() => this.props.history.goBack()}
        />

        {this.props.loadingUser ? <Spinner /> : container}

        <Footer hideOn="phone,tablet" isNarrow />
      </Wrapper>
    )
  }
}
