import { array, bool, func, object, string } from 'prop-types'
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

export default class Mapathon extends React.Component {
  static propTypes = {
    loadingMapathon: bool.isRequired,
    mapathon: object.isRequired,
    notificationMessage: string.isRequired,
    isAuthenticated: bool.isRequired,
    userData: object.isRequired,
    editIsVisible: bool.isRequired,
    sendingRequest: bool.isRequired,
    getMapathon: func.isRequired,
    clearState: func.isRequired,
    errors: object.isRequired,
    loadingTeamsManagers: bool.isRequired,
    teamsManagers: array.isRequired,
    setNotificationMessage: func.isRequired,
    showEditMapathon: func.isRequired,
    clearError: func.isRequired,
    setLocationCoordinates: func.isRequired,
    removeManager: func.isRequired,
    promoteParticipant: func.isRequired,
    removeParticipant: func.isRequired,
    clearInvitationsState: func.isRequired,
    getTeamsManagers: func.isRequired,
    invite: func.isRequired,
    hideEditMapathon: func.isRequired,
    editMapathon: func.isRequired
  }

  static contextTypes = {
    intl: intlShape
  }

  componentWillMount() {
    this.props.getMapathon()
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
            mapathonName: this.props.mapathon.name
          })}
        />
      )
    } else if (!this.props.loadingMapathon && this.props.mapathon.id) {
      pageTitle = (
        <Helmet
          title={formatMessage(messages.detailsPageTitle, {
            mapathonName: this.props.mapathon.name
          })}
        />
      )
    } else if (!this.props.loadingMapathon && !this.props.mapathon.id) {
      pageTitle = <Helmet title={formatMessage(messages.notFoundPageTitle)} />
    }

    let headerTitle = formatMessage(messages.detailsHeader)
    if (this.props.editIsVisible) {
      headerTitle = formatMessage(messages.editHeader)
    }

    let canEditMapathon = false
    if (this.props.isAuthenticated) {
      const managedMapathonsIds = this.props.userData.managedEvents.map(
        e => e.id
      )
      if (managedMapathonsIds.includes(this.props.mapathon.id)) {
        canEditMapathon = true
      }
    }

    let container = (
      <Details
        {...this.props.mapathon}
        canEditMapathon={canEditMapathon}
        sendingRequest={this.props.sendingRequest}
        showEditMapathon={this.props.showEditMapathon}
      />
    )
    if (this.props.editIsVisible) {
      container = (
        <Edit
          mapathon={this.props.mapathon}
          errors={this.props.errors}
          loadingTeamsManagers={this.props.loadingTeamsManagers}
          teamsManagers={this.props.teamsManagers}
          sendingRequest={this.props.sendingRequest}
          setNotificationMessage={this.props.setNotificationMessage}
          clearError={this.props.clearError}
          setLocationCoordinates={this.props.setLocationCoordinates}
          removeManager={this.props.removeManager}
          promoteParticipant={this.props.promoteParticipant}
          removeParticipant={this.props.removeParticipant}
          clearInvitationsState={this.props.clearInvitationsState}
          getTeamsManagers={this.props.getTeamsManagers}
          invite={this.props.invite}
          hideEditMapathon={this.props.hideEditMapathon}
          editMapathon={this.props.editMapathon}
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
          backURL="/mapathons"
          title={headerTitle}
        />

        {this.props.notificationMessage ? (
          <Notification
            message={this.context.intl.formatMessage(
              messages[this.props.notificationMessage]
            )}
          />
        ) : null}

        {this.props.loadingMapathon ? <Spinner /> : container}

        <Footer hideOn="phone,tablet" isNarrow />
      </Wrapper>
    )
  }
}
