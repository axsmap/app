/* eslint-disable no-param-reassign */

import { bool, func, object, string } from 'prop-types'
import React, { PureComponent } from 'react'
import ReactGA from 'react-ga'
import Helmet from 'react-helmet'
import { intlShape } from 'react-intl'

import Button from '../Button'
import Footer from '../Footer'
import FormInput from '../FormInput'
import Icon from '../Icon'
import NavBar from '../NavBar'
import { colors } from '../../styles'
import TopBar from '../../containers/TopBar'

import Avatar from './Avatar'
import ButtonContent from './ButtonContent'
import ButtonWrapper from './ButtonWrapper'
import Container from './Container'
import messages from './messages'
import RemoveAvatarButton from './RemoveAvatarButton'
import Title from './Title'
import Wrapper from './Wrapper'

class CreateTeam extends PureComponent {
  static propTypes = {
    isAuthenticated: bool.isRequired,
    history: object.isRequired,
    sendingRequest: bool.isRequired,
    avatar: string.isRequired,
    errors: object.isRequired,
    clearState: func.isRequired,
    setNotificationMessage: func.isRequired,
    clearError: func.isRequired,
    createAvatar: func.isRequired,
    deleteAvatar: func.isRequired,
    createTeam: func.isRequired
  }

  static contextTypes = {
    intl: intlShape
  }

  state = {
    name: '',
    description: ''
  }

  componentWillMount() {
    if (!this.props.isAuthenticated) this.props.history.push('/sign-in')
    ReactGA.pageview(window.location.pathname + window.location.search)
  }

  componentWillUnmount() {
    this.props.clearState()
  }

  handleDataChange = event => {
    this.setState({ [event.target.id]: event.target.value })
  }

  handleAvatar = event => {
    this.props.setNotificationMessage('')

    const avatarFile = event.target.files[0]
    if (avatarFile.size > 8388608) {
      this.props.setNotificationMessage(
        'axsmap.components.CreateTeam.fileSizeError'
      )
      return
    }

    const data = new FormData()
    data.append('photo', avatarFile)

    this.props.createAvatar(data)
  }

  render() {
    const {formatMessage} = this.context.intl

    return (
      <Wrapper>
        <Helmet title={formatMessage(messages.pageTitle)} />

        <TopBar hideOn="phone,tablet"/>

        <NavBar
          hideOn="desktop,widescreen"
          isNarrow
          title={formatMessage(messages.headerTitle)}
          goBackHandler={() => this.props.history.goBack()}
        />

        <Container>
          <Title>{formatMessage(messages.headerTitle)}</Title>

          <FormInput
            id="name"
            type="text"
            label={formatMessage(messages.nameLabel)}
            value={this.state.name}
            handler={this.handleDataChange}
            error={{
              message: this.props.errors.name,
              options: [
                'Is required',
                'Should be less than 36 characters',
                'Is already taken'
              ],
              values: [
                formatMessage(messages.nameError1),
                formatMessage(messages.nameError2),
                formatMessage(messages.nameError3)
              ]
            }}
            onInputFocus={() => this.props.clearError('name')}
          />

          <FormInput
            id="description"
            type="textarea"
            label={formatMessage(messages.descriptionLabel)}
            placeholder={formatMessage(messages.descriptionPlaceholder)}
            value={this.state.description}
            handler={this.handleDataChange}
            error={{
              message: this.props.errors.description,
              options: ['Should be less than 301 characters'],
              values: [formatMessage(messages.descriptionError)]
            }}
            onInputFocus={() => this.props.clearError('description')}
          />

          {this.props.avatar
            ? null
            : [
              <Button
                key="button"
                backgroundColor={colors.secondary}
                color="white"
                disabled={this.props.sendingRequest}
                onClickHandler={() => this.fileInput.click()}
              >
                {formatMessage(messages.addAvatarButton)}
              </Button>,
              <input
                key="input"
                type="file"
                ref={r => {
                    this.fileInput = r
                  }}
                accept=".jpg, .jpeg, .png"
                aria-hidden
                tabIndex="-1"
                style={{ display: 'none' }}
                onChange={event => this.handleAvatar(event)}
                onClick={event => {
                    event.target.value = null
                  }}
              />
              ]}

          {this.props.avatar ? (
            <Avatar style={{ backgroundImage: `url("${this.props.avatar}")` }}>
              <RemoveAvatarButton
                disabled={this.props.sendingRequest}
                onClick={this.props.deleteAvatar}
              >
                <Icon glyph="cross" size={1} />
              </RemoveAvatarButton>
            </Avatar>
          ) : null}

          <ButtonWrapper>
            <Button
              type="submit"
              float
              disabled={this.props.sendingRequest}
              onClickHandler={() =>
                this.props.createTeam({
                  name: this.state.name,
                  description: this.state.description,
                  avatar: this.state.avatar
                })}
            >
              <ButtonContent>
                <Icon
                  glyph="cross"
                  size={1}
                  rotate="45deg"
                  color={colors.darkestGrey}
                />
                <p style={{ margin: '0 0 0 0.5rem' }}>
                  {formatMessage(messages.createTeamButton)}
                </p>
              </ButtonContent>
            </Button>
          </ButtonWrapper>
        </Container>

        <Footer hideOn="phone,tablet" isNarrow />
      </Wrapper>
    )
  }
}

export default CreateTeam
