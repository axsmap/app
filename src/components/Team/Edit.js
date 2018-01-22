/* eslint-disable no-param-reassign */

import { array, bool, func, object } from 'prop-types'
import React, { PureComponent } from 'react'
import { intlShape } from 'react-intl'
import styled from 'styled-components'

import Button from '../Button'
import Ctn from '../Container'
import FormInput from '../FormInput'
import Icon from '../Icon'
import { colors, media } from '../../styles'

import Avatar from './Avatar'
import AvatarSpinner from './AvatarSpinner'
import EditButtons from './EditButtons'
import messages from './messages'
import RemoveAvatarButton from './RemoveAvatarButton'

const Container = styled(Ctn)`
  padding: 2rem 1rem 7rem 1rem;
  max-width: 30rem;

  ${media.desktop`
    padding: 2rem 0;
  `};
`

const Title = styled.h1`
  display: none;
  margin: 0 0 2rem 0;
  color: ${colors.darkestGrey};

  ${media.desktop`
    display: block;
  `};
`

class Edit extends PureComponent {
  static propTypes = {
    team: object.isRequired,
    users: array.isRequired,
    errors: object.isRequired,
    sendingRequest: bool.isRequired,
    setNotificationMessage: func.isRequired,
    clearError: func.isRequired,
    hideEditTeam: func.isRequired,
    editTeam: func.isRequired
  }

  static contextTypes = {
    intl: intlShape
  }

  state = {
    data: {
      name: this.props.team.name,
      description: this.props.team.description,
      avatar: this.props.team.avatar,
      managers: this.props.team.managers,
      members: this.props.team.members
    },
    loadingAvatar: false,
    users: this.props.users
  }

  handleDataChange = event => {
    this.setState({
      data: { ...this.state.data, [event.target.id]: event.target.value }
    })
  }

  handleAvatar = event => {
    this.setState({ loadingAvatar: true })
    this.setState({ data: { ...this.state.data, avatar: null } })
    this.props.setNotificationMessage('')

    const avatarFile = event.target.files[0]
    if (!avatarFile) {
      this.setState({ loadingAvatar: false })
      return
    } else if (avatarFile.size > 8388608) {
      this.setState({ loadingAvatar: false })
      this.props.setNotificationMessage('fileSizeError')
      return
    }

    const reader = new FileReader()
    reader.onloadend = () => {
      this.setState({ loadingAvatar: false })
      this.setState({ data: { ...this.state.data, avatar: reader.result } })
    }
    reader.readAsDataURL(avatarFile)
  }

  render() {
    const formatMessage = this.context.intl.formatMessage
    const {
      errors,
      sendingRequest,
      clearError,
      hideEditTeam,
      editTeam
    } = this.props

    return (
      <Container>
        <Title>{formatMessage(messages.editTeamTitle)}</Title>

        <FormInput
          id="name"
          type="text"
          label={formatMessage(messages.nameLabel)}
          value={this.state.data.name}
          handler={this.handleDataChange}
          error={{
            message: errors.name,
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
          onInputFocus={() => clearError('name')}
        />

        <FormInput
          id="description"
          type="textarea"
          label={formatMessage(messages.descriptionLabel)}
          placeholder={formatMessage(messages.descriptionPlaceholder)}
          value={this.state.data.description}
          handler={this.handleDataChange}
          error={{
            message: errors.description,
            options: ['Should be less than 301 characters'],
            values: [formatMessage(messages.descriptionError)]
          }}
          onInputFocus={() => clearError('description')}
        />

        {this.state.data.avatar ? null : (
          <Button
            backgroundColor={colors.secondary}
            color="white"
            disabled={sendingRequest || this.state.loadingAvatar}
            onClickHandler={() => this.fileInput.click()}
          >
            {formatMessage(messages.addAvatarButton)}
          </Button>
        )}
        <input
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

        {this.state.loadingAvatar ? (
          <AvatarSpinner color={colors.secondary} size={3} />
        ) : null}

        {this.state.data.avatar ? (
          <Avatar
            style={{
              backgroundImage: `url("${this.state.data.avatar}")`
            }}
          >
            <RemoveAvatarButton
              disabled={sendingRequest}
              onClick={() =>
                this.setState({ data: { ...this.state.data, avatar: null } })}
            >
              <Icon glyph="cross" size={1} />
            </RemoveAvatarButton>
          </Avatar>
        ) : null}

        <EditButtons
          sendingRequest={sendingRequest}
          hideEditTeam={hideEditTeam}
          editTeam={() => editTeam(this.props.team.id, this.state.data)}
        />
      </Container>
    )
  }
}

export default Edit
