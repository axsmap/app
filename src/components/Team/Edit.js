/* eslint-disable no-param-reassign */

import { rgba } from 'polished'
import { array, bool, func, object, string } from 'prop-types'
import React, { PureComponent } from 'react'
import { intlShape } from 'react-intl'
import styled from 'styled-components'

import Button from '../Button'
import Ctn from '../Container'
import FormInput from '../FormInput'
import Icon from '../Icon'
import { colors, media } from '../../styles'

import EditButtons from './EditButtons'
import EditManagers from './EditManagers'
import EditMembers from './EditMembers'
import Invitations from './Invitations'
import messages from './messages'

const Container = styled(Ctn)`
  padding: 2rem 1rem 7rem 1rem;
  max-width: 30rem;
  margin-left: auto;
  margin-right: auto;

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

const Label = styled.label`
  display: block;

  margin-bottom: 0.2rem;
  width: 100%;

  color: ${colors.darkGrey};
  font-size: 1rem;
  font-weight: bold;
  text-align: center;
  text-transform: uppercase;
`

const Avatar = styled.div`
  position: relative;

  border-radius: 3px;
  height: 14rem;
  margin-bottom: 1rem;
  width: 14rem;

  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  ${media.tablet`
    height: 16rem;
    width: 16rem;
  `};

  ${media.desktop`
    height: 18rem;
    width: 18rem;
  `};

  ${media.widescreen`
    height: 20rem;
    width: 20rem;
  `};
`

const RemoveAvatarButton = styled.button`
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;

  display: flex;
  opacity: 1;

  align-items: center;
  justify-content: center;

  appearance: none;
  border: none;
  border-radius: 100%;
  box-shadow: 0 3px 5px ${rgba(colors.darkestGrey, 0.4)};
  height: 3rem;
  margin: 0;
  padding: 0;
  width: 3rem;

  background-color: ${colors.alert};
  cursor: pointer;

  &:active,
  &:focus {
    outline: 2px solid ${colors.secondary};
  }

  &:disabled,
  &[disabled] {
    opacity: 0.5;
  }
`

class Edit extends PureComponent {
  static propTypes = {
    team: object.isRequired,
    avatar: string.isRequired,
    loadingUsers: bool.isRequired,
    users: array.isRequired,
    errors: object.isRequired,
    sendingRequest: bool.isRequired,
    clearErrors: func.isRequired,
    setNotificationMessage: func.isRequired,
    clearError: func.isRequired,
    createAvatar: func.isRequired,
    deleteAvatar: func.isRequired,
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

  state = {
    data: {
      id: this.props.team.id,
      name: this.props.team.name,
      description: this.props.team.description,
      managers: this.props.team.managers,
      members: this.props.team.members
    }
  }

  componentWillMount() {
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
  }

  componentWillUnmount() {
    this.props.clearErrors()
  }

  handleDataChange = event => {
    this.setState({
      data: { ...this.state.data, [event.target.id]: event.target.value }
    })
  }

  handleAvatar = event => {
    this.props.setNotificationMessage('')

    const avatarFile = event.target.files[0]
    if (avatarFile.size > 8388608) {
      this.props.setNotificationMessage('axsmap.components.Team.fileSizeError')
      return
    }

    const data = new FormData()
    data.append('photo', avatarFile)

    this.props.createAvatar(data)
  }

  render() {
    const formatMessage = this.context.intl.formatMessage

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
          value={this.state.data.description}
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
                style={{ marginBottom: '1.5rem' }}
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

        <Label>{formatMessage(messages.managersLabel)}</Label>
        <EditManagers
          managers={this.state.data.managers}
          sendingRequest={this.props.sendingRequest}
          teamId={this.state.data.id}
          removeManager={this.props.removeManager}
        />

        {this.state.data.members && this.state.data.members.length > 0
          ? [
              <Label key="label">{formatMessage(messages.membersLabel)}</Label>,
              <EditMembers
                key="editMembers"
                members={this.state.data.members}
                sendingRequest={this.props.sendingRequest}
                promoteMember={this.props.promoteMember}
                removeMember={this.props.removeMember}
              />
            ]
          : null}

        <Label>{formatMessage(messages.invitationsLabel)}</Label>
        <Invitations
          sendingRequest={this.props.sendingRequest}
          loadingUsers={this.props.loadingUsers}
          users={this.props.users}
          teamId={this.state.data.id}
          clearInvitationsState={this.props.clearInvitationsState}
          getUsers={this.props.getUsers}
          inviteUser={this.props.inviteUser}
        />

        <EditButtons
          sendingRequest={this.props.sendingRequest}
          hideEditTeam={this.props.hideEditTeam}
          editTeam={() =>
            this.props.editTeam(this.props.team.id, this.state.data)}
        />
      </Container>
    )
  }
}

export default Edit
