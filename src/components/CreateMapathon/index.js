import { array, bool, func, object, string } from 'prop-types'
import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { intlShape } from 'react-intl'
import styled from 'styled-components'

import Footer from '../Footer'
import NavBar from '../NavBar'
import Notification from '../../containers/Notification'
import TopBar from '../../containers/TopBar'
import Wrp from '../Wrapper'

import Form from './Form'
import messages from './messages'

const Wrapper = styled(Wrp)`padding-bottom: 0;`

class CreateMapathon extends Component {
  static propTypes = {
    isAuthenticated: bool.isRequired,
    history: object.isRequired,
    sendingRequest: bool.isRequired,
    notificationMessage: string.isRequired,
    locationCoordinates: object.isRequired,
    errors: object.isRequired,
    loadingTeams: bool.isRequired,
    teams: array.isRequired,
    clearState: func.isRequired,
    setNotificationMessage: func.isRequired,
    clearError: func.isRequired,
    getUserLocation: func.isRequired,
    setLocationCoordinates: func.isRequired,
    getTeams: func.isRequired,
    createMapathon: func.isRequired
  }

  static contextTypes = {
    intl: intlShape
  }

  componentWillMount() {
    if (!this.props.isAuthenticated) this.props.history.push('/sign-in')
  }

  componentWillUnmount() {
    this.props.clearState()
  }

  render() {
    const formatMessage = this.context.intl.formatMessage

    return (
      <Wrapper>
        <Helmet title={formatMessage(messages.pageTitle)} />

        <TopBar hideOn="phone,tablet" />

        <NavBar
          hideOn="desktop,widescreen"
          isNarrow
          title={formatMessage(messages.headerTitle)}
          goBackHandler={() => this.props.history.goBack()}
        />

        {this.props.notificationMessage ? (
          <Notification
            message={formatMessage(messages[this.props.notificationMessage])}
          />
        ) : null}

        <Form
          sendingRequest={this.props.sendingRequest}
          locationCoordinates={this.props.locationCoordinates}
          errors={this.props.errors}
          loadingTeams={this.props.loadingTeams}
          teams={this.props.teams}
          setNotificationMessage={this.props.setNotificationMessage}
          clearError={this.props.clearError}
          getUserLocation={this.props.getUserLocation}
          setLocationCoordinates={this.props.setLocationCoordinates}
          getTeams={this.props.getTeams}
          createMapathon={this.props.createMapathon}
        />

        <Footer hideOn="phone,tablet" isNarrow />
      </Wrapper>
    )
  }
}

export default CreateMapathon
