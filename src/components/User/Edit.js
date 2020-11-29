/* eslint-disable no-param-reassign */

import { rgba } from 'polished'
import { array, bool, func, number, object, string } from 'prop-types'
import React, { Component } from 'react'
import { intlShape } from 'react-intl'
import styled from 'styled-components'

import Button from '../Button'
import FormInput from '../FormInput'
import Icon from '../Icon'
import SB from '../SelectBox'
import { colors, media } from '../../styles'
import Toggle from '../Toggle'

import EditMapathons from './EditMapathons'
import EditPetitions from './EditPetitions'
import EditTeams from './EditTeams'
import messages from './messages'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  flex-grow: 1;
  padding: 2rem 1rem 7rem 1rem;
  width: 100%;
  max-width: 40rem;
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
  text-transform: uppercase;
`

const Avatar = styled.div`
  position: relative;

  border-radius: 3px;
  height: 14rem;
  margin-bottom: 1.5rem;
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

const SelectBox = styled(SB)`
  margin-bottom: 1.5rem;
`

const ButtonsWrapper = styled.div`
  bottom: 2rem;
  left: 0;
  position: fixed;

  display: flex;

  justify-content: space-around;

  padding: 0 1rem;
  width: 100%;

  ${media.desktop`
    position: static;
    margin-top: 2rem;
    padding: 0;
  `};
`

const ButtonContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export default class Edit extends Component {
  static propTypes = {
    user: object.isRequired,
    avatar: string.isRequired,
    errors: object.isRequired,
    sendingRequest: bool.isRequired,
    filter: string.isRequired,
    loadingPetitions: bool.isRequired,
    nextPage: number,
    petitions: array.isRequired,
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

  state = {
    data: {
      id: this.props.user.id,
      description: this.props.user.description,
      disabilities: this.props.user.disabilities,
      events: this.props.user.events,
      firstName: this.props.user.firstName,
      gender: this.props.user.gender,
      isSubscribed: this.props.user.isSubscribed,
      lastName: this.props.user.lastName,
      language: this.props.user.language,
      phone: this.props.user.phone,
      showDisabilities: this.props.user.showDisabilities,
      showEmail: this.props.user.showEmail,
      showPhone: this.props.user.showPhone,
      teams: this.props.user.teams,
      username: this.props.user.username,
      zip: this.props.user.zip
    },
    genderOptions: [
      {
        value: 'female',
        label: this.context.intl.formatMessage(messages.femaleLabel)
      },
      {
        value: 'male',
        label: this.context.intl.formatMessage(messages.maleLabel)
      },
      {
        value: 'other',
        label: this.context.intl.formatMessage(messages.otherLabel)
      },
      {
        value: 'private',
        label: this.context.intl.formatMessage(messages.privateLabel)
      },
      {
        value: 'transgender',
        label: this.context.intl.formatMessage(messages.transgenderLabel)
      }
    ],
    languageOptions: [
      {
        value: 'en',
        label: this.context.intl.formatMessage(messages.englishLabel)
      },
      {
        value: 'es',
        label: this.context.intl.formatMessage(messages.spanishLabel)
      }
    ]
  }

  componentWillMount() {
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      data: {
        ...this.state.data,
        events: nextProps.user.events,
        teams: nextProps.user.teams
      }
    })
  }

  componentWillUnmount() {
    this.props.clearErrors()
  }

  handleDataChange = event => {
    this.setState({
      data: { ...this.state.data, [event.target.id]: event.target.value }
    })
  }

  toggleBoolean = key => {
    this.setState({
      data: { ...this.state.data, [key]: !this.state.data[key] }
    })
  }

  handleAvatar = event => {
    this.props.setNotificationMessage('')

    const avatarFile = event.target.files[0]
    if (avatarFile.size > 8388608) {
      this.props.setNotificationMessage('axsmap.components.User.fileSizeError')
      return
    }

    const data = new FormData()
    data.append('photo', avatarFile)

    this.props.createAvatar(data)
  }

  render() {
    const {formatMessage} = this.context.intl

    return (
      <Wrapper className="mx-auto">
        <Title>{formatMessage(messages.editHeader)}</Title>

        <FormInput
          id="firstName"
          type="text"
          label={formatMessage(messages.firstNameLabel)}
          value={this.state.data.firstName}
          error={{
            message: this.props.errors.firstName,
            options: [
              'Is required',
              'Should be less than 25 characters',
              'Should only have letters',
              'Should only be one first name'
            ],
            values: [
              formatMessage(messages.firstNameError1),
              formatMessage(messages.firstNameError2),
              formatMessage(messages.firstNameError3),
              formatMessage(messages.firstNameError4)
            ]
          }}
          handler={this.handleDataChange}
          onInputFocus={() => this.props.clearError('firstName')}
        />

        <FormInput
          id="lastName"
          type="text"
          label={formatMessage(messages.lastNameLabel)}
          value={this.state.data.lastName}
          error={{
            message: this.props.errors.lastName,
            options: [
              'Is required',
              'Should be less than 37 characters',
              'Should only have letters',
              'Should only be one last name'
            ],
            values: [
              formatMessage(messages.lastNameError1),
              formatMessage(messages.lastNameError2),
              formatMessage(messages.lastNameError3),
              formatMessage(messages.lastNameError4)
            ]
          }}
          handler={this.handleDataChange}
          onInputFocus={() => this.props.clearError('lastName')}
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
            options: ['Should be less than 2001 characters'],
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

        <Label>{formatMessage(messages.genderLabel)}</Label>
        <SelectBox
          id="gender"
          value={this.state.data.gender}
          options={this.state.genderOptions}
          borderColor={colors.darkGrey}
          onFocusBorderColor={colors.secondary}
          handleValueChange={this.handleDataChange}
        />

        <Toggle
          active={this.state.data.isSubscribed}
          handler={() => this.toggleBoolean('isSubscribed')}
        >
          {formatMessage(messages.isSubscribedLabel)}
        </Toggle>

        <Label>{formatMessage(messages.languageLabel)}</Label>
        <SelectBox
          id="language"
          value={this.state.data.language}
          options={this.state.languageOptions}
          borderColor={colors.darkGrey}
          onFocusBorderColor={colors.secondary}
          handleValueChange={this.handleDataChange}
        />

        <FormInput
          id="phone"
          type="text"
          label={formatMessage(messages.phoneLabel)}
          value={this.state.data.phone}
          error={{
            message: this.props.errors.phone,
            options: ['Should be less than 51 characters'],
            values: [formatMessage(messages.phoneError)]
          }}
          handler={this.handleDataChange}
          onInputFocus={() => this.props.clearError('phone')}
        />

        <Toggle
          active={this.state.data.showDisabilities}
          handler={() => this.toggleBoolean('showDisabilities')}
        >
          {formatMessage(messages.showDisabilitiesLabel)}
        </Toggle>

        <Toggle
          active={this.state.data.showEmail}
          handler={() => this.toggleBoolean('showEmail')}
        >
          {formatMessage(messages.showEmailLabel)}
        </Toggle>

        <Toggle
          active={this.state.data.showPhone}
          handler={() => this.toggleBoolean('showPhone')}
        >
          {formatMessage(messages.showPhoneLabel)}
        </Toggle>

        <FormInput
          id="username"
          type="text"
          label={formatMessage(messages.usernameLabel)}
          value={this.state.data.username}
          error={{
            message: this.props.errors.username,
            options: [
              'Is required',
              'Should be less than 68 characters',
              'Should only have lowercase letters and hyphens'
            ],
            values: [
              formatMessage(messages.usernameError1),
              formatMessage(messages.usernameError2),
              formatMessage(messages.usernameError3)
            ]
          }}
          handler={this.handleDataChange}
          onInputFocus={() => this.props.clearError('username')}
        />

        <FormInput
          id="zip"
          type="text"
          label={formatMessage(messages.zipLabel)}
          value={this.state.data.zip}
          error={{
            message: this.props.errors.zip,
            options: ['Should be less than 33 characters'],
            values: [formatMessage(messages.zipError)]
          }}
          handler={this.handleDataChange}
          onInputFocus={() => this.props.clearError('zip')}
        />

        <Label style={{ marginBottom: '0.5rem', textAlign: 'center' }}>
          {formatMessage(messages.teamsLabel)}
        </Label>
        <EditTeams
          teams={this.state.data.teams}
          sendingRequest={this.props.sendingRequest}
          leaveTeam={this.props.leaveTeam}
        />

        <Label style={{ marginBottom: '0.5rem', textAlign: 'center' }}>
          {formatMessage(messages.mapathonsLabel)}
        </Label>
        <EditMapathons
          mapathons={this.state.data.events}
          sendingRequest={this.props.sendingRequest}
          leaveMapathon={this.props.leaveMapathon}
        />

        <Label style={{ marginBottom: '0.5rem', textAlign: 'center' }}>
          {formatMessage(messages.petitionsLabel)}
        </Label>
        <EditPetitions
          sendingRequest={this.props.sendingRequest}
          filter={this.props.filter}
          loadingPetitions={this.props.loadingPetitions}
          nextPage={this.props.nextPage}
          petitions={this.props.petitions}
          getPetitions={this.props.getPetitions}
          onClickFilterReceived={this.props.onClickFilterReceived}
          onClickFilterSent={this.props.onClickFilterSent}
          setPetitionAccepted={this.props.setPetitionAccepted}
          setPetitionCanceled={this.props.setPetitionCanceled}
          setPetitionRejected={this.props.setPetitionRejected}
        />

        <ButtonsWrapper>
          <Button
            backgroundColor={colors.lightGrey}
            float
            disabled={this.props.sendingRequest}
            onClickHandler={this.props.hideEditUser}
          >
            <ButtonContent>
              <Icon glyph="cross" size={1} color={colors.darkestGrey} />
              <p style={{ margin: '0 0 0 0.5rem' }}>
                {formatMessage(messages.closeButton)}
              </p>
            </ButtonContent>
          </Button>

          <Button
            type="submit"
            float
            disabled={this.props.sendingRequest}
            onClickHandler={() => this.props.editUser(this.state.data)}
          >
            <ButtonContent>
              <Icon glyph="check" size={1} color={colors.darkestGrey} />
              <p style={{ margin: '0 0 0 0.5rem' }}>
                {formatMessage(messages.saveButton)}
              </p>
            </ButtonContent>
          </Button>
        </ButtonsWrapper>
      </Wrapper>
    )
  }
}
