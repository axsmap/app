import { array, bool, func, object, string } from 'prop-types'
import React, { Component } from 'react'
import ReactGA from 'react-ga'
import Helmet from 'react-helmet'
import { intlShape } from 'react-intl'
import styled from 'styled-components'

import Footer from '../Footer'
import NavBar from '../NavBar'
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
    poster: string.isRequired,
    locationCoordinates: object.isRequired,
    errors: object.isRequired,
    loadingTeams: bool.isRequired,
    teams: array.isRequired,
    clearState: func.isRequired,
    setNotificationMessage: func.isRequired,
    clearError: func.isRequired,
    createPoster: func.isRequired,
    deletePoster: func.isRequired,
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
    ReactGA.pageview(window.location.pathname + window.location.search)
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

        <Form
          sendingRequest={this.props.sendingRequest}
          poster={this.props.poster}
          locationCoordinates={this.props.locationCoordinates}
          errors={this.props.errors}
          loadingTeams={this.props.loadingTeams}
          teams={this.props.teams}
          getUserLocation={this.props.getUserLocation}
          setNotificationMessage={this.props.setNotificationMessage}
          clearError={this.props.clearError}
          createPoster={this.props.createPoster}
          deletePoster={this.props.deletePoster}
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
