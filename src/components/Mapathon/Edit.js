/* eslint-disable no-param-reassign */

import { rgba, transparentize } from 'polished'
import { array, bool, func, object, string } from 'prop-types'
import React, { Component } from 'react'
import DayPicker, { DateUtils } from 'react-day-picker'
import Helmet from 'react-helmet'
import { intlShape } from 'react-intl'
import styled from 'styled-components'

import 'react-day-picker/lib/style.css'

import Button from '../Button'
import FormInput from '../FormInput'
import Icon from '../Icon'
import SB from '../SelectBox'
import { colors, fonts, media } from '../../styles'
import Toggle from '../Toggle'

import EditMap from './EditMap'
import EditTeamManager from './EditTeamManager'
import EditTeamsInvitations from './EditTeamsInvitations'
import EditTeamsParticipants from './EditTeamsParticipants'
import EditUsersInvitations from './EditUsersInvitations'
import EditUsersManagers from './EditUsersManagers'
import EditUsersParticipants from './EditUsersParticipants'
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

const Error = styled.p`
  margin: 0 0 1.5rem 0;

  color: ${colors.alert};
  font-size: 1rem;
  font-weight: bold;
  text-align: right;
`

const Poster = styled.div`
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

const RemovePosterButton = styled.button`
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

const SelectBox = styled(SB)`margin-bottom: 1.5rem;`

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
    mapathon: object.isRequired,
    poster: string.isRequired,
    sendingRequest: bool.isRequired,
    errors: object.isRequired,
    loadingTeamsManagers: bool.isRequired,
    teamsManagers: array.isRequired,
    loadingUsers: bool.isRequired,
    users: array.isRequired,
    loadingTeams: bool.isRequired,
    teams: array.isRequired,
    clearErrors: func.isRequired,
    setNotificationMessage: func.isRequired,
    clearError: func.isRequired,
    createPoster: func.isRequired,
    deletePoster: func.isRequired,
    setLocationCoordinates: func.isRequired,
    getTeamsManagers: func.isRequired,
    removeManager: func.isRequired,
    removeParticipant: func.isRequired,
    promoteParticipant: func.isRequired,
    removeTeam: func.isRequired,
    clearInvitationsState: func.isRequired,
    getUsers: func.isRequired,
    invite: func.isRequired,
    getTeams: func.isRequired,
    hideEditMapathon: func.isRequired,
    editMapathon: func.isRequired
  }

  static contextTypes = {
    intl: intlShape
  }

  state = {
    data: {
      id: this.props.mapathon.id,
      address: this.props.mapathon.address,
      description: this.props.mapathon.description,
      endDate: new Date(this.props.mapathon.endDate),
      isOpen: this.props.mapathon.isOpen,
      managers: this.props.mapathon.managers,
      name: this.props.mapathon.name,
      participants: this.props.mapathon.participants,
      participantsGoal: this.props.mapathon.participantsGoal,
      reviewsGoal: this.props.mapathon.reviewsGoal,
      startDate: new Date(this.props.mapathon.startDate),
      teamManager: this.props.mapathon.teamManager
        ? this.props.mapathon.teamManager.id
        : undefined,
      teams: this.props.mapathon.teams
    },
    hostAs: this.props.mapathon.teamManager
      ? this.props.mapathon.teamManager.id
      : 'individual',
    hostAsOptions: this.props.mapathon.teamManager
      ? [
          {
            value: 'individual',
            label: this.context.intl.formatMessage(messages.individualLabel)
          },
          {
            value: 'team',
            label: this.context.intl.formatMessage(messages.teamLabel)
          },
          {
            value: this.props.mapathon.teamManager.id,
            label: this.props.mapathon.teamManager.name
          }
        ]
      : [
          {
            value: 'individual',
            label: this.context.intl.formatMessage(messages.individualLabel)
          },
          {
            value: 'team',
            label: this.context.intl.formatMessage(messages.teamLabel)
          }
        ]
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

  handleDateChange = (day, { disabled }) => {
    if (disabled) return

    this.props.clearError('startDate')
    this.props.clearError('endDate')

    const range = DateUtils.addDayToRange(day, {
      from: this.state.data.startDate,
      to: this.state.data.endDate
    })
    this.setState({
      data: { ...this.state.data, startDate: range.from, endDate: range.to }
    })
  }

  toggleIsOpen = () => {
    this.setState({
      data: { ...this.state.data, isOpen: !this.state.data.isOpen }
    })
  }

  handlePoster = event => {
    this.props.setNotificationMessage('')

    const posterFile = event.target.files[0]
    if (posterFile.size > 8388608) {
      this.props.setNotificationMessage(
        'axsmap.components.Mapathon.fileSizeError'
      )
      return
    }

    const data = new FormData()
    data.append('photo', posterFile)

    this.props.createPoster(data)
  }

  handleHostAsChange = event => {
    const hostAs = event.target.value
    if (hostAs === 'individual' || hostAs === 'team') {
      this.setState({ data: { ...this.state.data, teamManager: '' } })
    } else {
      this.setState({ data: { ...this.state.data, teamManager: hostAs } })
    }
    this.setState({ hostAs })
  }

  chooseTeamManager = team => {
    this.setState({
      data: { ...this.state.data, teamManager: team.id },
      hostAsOptions: [
        {
          value: 'individual',
          label: this.context.intl.formatMessage(messages.individualLabel)
        },
        {
          value: 'team',
          label: this.context.intl.formatMessage(messages.teamLabel)
        },
        {
          value: team.id,
          label: team.name
        }
      ],
      hostAs: team.id
    })
  }

  render() {
    const formatMessage = this.context.intl.formatMessage
    const { startDate, endDate } = this.state.data
    const today = new Date()
    const dateModifiers = { start: startDate, end: endDate }

    let datesErrors
    if (
      this.props.errors.startDate === 'Is required' &&
      this.props.errors.startDate === 'Is required'
    ) {
      datesErrors = <Error>{formatMessage(messages.datesError)}</Error>
    } else if (this.props.errors.startDate === 'Is required') {
      datesErrors = <Error>{formatMessage(messages.startDateError)}</Error>
    } else if (this.props.errors.endDate === 'Is required') {
      datesErrors = <Error>{formatMessage(messages.endDateError)}</Error>
    }

    return (
      <Wrapper>
        <Helmet>
          <style>{`
            .Selectable {
              font-family: ${fonts.primary};
            }
            .Selectable .DayPicker-Caption > div {
              font-size: 1rem;
            }
            .Selectable .DayPicker-Day:focus {
              box-shadow: inset 0px 0px 0px 2px ${colors.secondary};
            }
            .Selectable .DayPicker-Day--selected:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside) {
              background-color: ${colors.secondary} !important;
            }
            .Selectable .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
              color: ${colors.secondary} !important;
              background-color: ${transparentize(
                0.9,
                colors.secondary
              )} !important;
            }
            .Selectable .DayPicker-Day {
              border-radius: 0 !important;
            }
            .Selectable .DayPicker-Day--start {
              border-top-left-radius: 50% !important;
              border-bottom-left-radius: 50% !important;
            }
            .Selectable .DayPicker-Day--end {
              border-top-right-radius: 50% !important;
              border-bottom-right-radius: 50% !important;
            }
          `}</style>
        </Helmet>

        <Title>{formatMessage(messages.editHeader)}</Title>

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
              'Should be less than 101 characters',
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

        {this.props.poster
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
                {formatMessage(messages.addPosterButton)}
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
                onChange={event => this.handlePoster(event)}
                onClick={event => {
                  event.target.value = null
                }}
              />
            ]}

        {this.props.poster ? (
          <Poster style={{ backgroundImage: `url("${this.props.poster}")` }}>
            <RemovePosterButton
              disabled={this.props.sendingRequest}
              onClick={this.props.deletePoster}
            >
              <Icon glyph="cross" size={1} />
            </RemovePosterButton>
          </Poster>
        ) : null}

        <FormInput
          id="address"
          type="text"
          label={formatMessage(messages.addressLabel)}
          value={this.state.data.address}
          handler={this.handleDataChange}
          error={{
            message: this.props.errors.address,
            options: ['Is required', 'Should be less than 201 characters'],
            values: [
              formatMessage(messages.addressError1),
              formatMessage(messages.addressError2)
            ]
          }}
          onInputFocus={() => this.props.clearError('address')}
        />

        <Label>{formatMessage(messages.locationLabel)}</Label>
        <EditMap
          location={{
            lat: this.props.mapathon.location.coordinates[1],
            lng: this.props.mapathon.location.coordinates[0]
          }}
          onLocationChange={this.props.setLocationCoordinates}
        />

        <Label>{formatMessage(messages.datesLabel)}</Label>
        <DayPicker
          className="Selectable"
          numberOfMonths={2}
          selectedDays={[startDate, { from: startDate, to: endDate }]}
          disabledDays={{ before: today }}
          modifiers={dateModifiers}
          onDayClick={this.handleDateChange}
        />
        {datesErrors}

        <FormInput
          id="participantsGoal"
          type="number"
          label={formatMessage(messages.participantsGoalLabel)}
          value={this.state.data.participantsGoal}
          min={1}
          max={1000}
          handler={this.handleDataChange}
          error={{
            message: this.props.errors.participantsGoal,
            options: [
              'Is required',
              'Should be greater than 0',
              'Should be less than 1001'
            ],
            values: [
              formatMessage(messages.participantsGoalError1),
              formatMessage(messages.participantsGoalError2),
              formatMessage(messages.participantsGoalError3)
            ]
          }}
          onInputFocus={() => this.props.clearError('participantsGoal')}
        />

        <FormInput
          id="reviewsGoal"
          type="number"
          label={formatMessage(messages.reviewsGoalLabel)}
          value={this.state.data.reviewsGoal}
          min={1}
          max={10000}
          handler={this.handleDataChange}
          error={{
            message: this.props.errors.reviewsGoal,
            options: [
              'Is required',
              'Should be greater than 0',
              'Should be less than 10001'
            ],
            values: [
              formatMessage(messages.reviewsGoalError1),
              formatMessage(messages.reviewsGoalError2),
              formatMessage(messages.reviewsGoalError3)
            ]
          }}
          onInputFocus={() => this.props.clearError('reviewsGoal')}
        />

        <Toggle active={this.state.data.isOpen} handler={this.toggleIsOpen}>
          {formatMessage(messages.isOpenLabel)}
        </Toggle>

        <Label>{formatMessage(messages.hostAsLabel)}</Label>
        <SelectBox
          id="type"
          value={this.state.hostAs}
          options={this.state.hostAsOptions}
          borderColor={colors.darkGrey}
          onFocusBorderColor={colors.secondary}
          handleValueChange={this.handleHostAsChange}
        />

        {this.state.hostAs === 'team' ? (
          <EditTeamManager
            sendingRequest={this.props.sendingRequest}
            loadingTeamsManagers={this.props.loadingTeamsManagers}
            teamsManagers={this.props.teamsManagers}
            getTeamsManagers={this.props.getTeamsManagers}
            chooseTeamManager={this.chooseTeamManager}
          />
        ) : null}

        <Label>{formatMessage(messages.managersLabel)}</Label>
        <EditUsersManagers
          managers={this.state.data.managers}
          sendingRequest={this.props.sendingRequest}
          mapathonId={this.state.data.id}
          removeManager={this.props.removeManager}
        />

        {this.state.data.participants && this.state.data.participants.length > 0
          ? [
              <Label key="label">
                {formatMessage(messages.participantsLabel)}
              </Label>,
              <EditUsersParticipants
                key="participants"
                participants={this.state.data.participants}
                sendingRequest={this.props.sendingRequest}
                mapathonId={this.state.data.id}
                promoteParticipant={this.props.promoteParticipant}
                removeParticipant={this.props.removeParticipant}
              />
            ]
          : null}

        {this.state.data.teams && this.state.data.teams.length > 0
          ? [
              <Label key="label">{formatMessage(messages.teamsLabel)}</Label>,
              <EditTeamsParticipants
                key="teams"
                teams={this.state.data.teams}
                sendingRequest={this.props.sendingRequest}
                mapathonId={this.state.data.id}
                removeTeam={this.props.removeTeam}
              />
            ]
          : null}

        <Label>{formatMessage(messages.usersInvitationsLabel)}</Label>
        <EditUsersInvitations
          sendingRequest={this.props.sendingRequest}
          loadingUsers={this.props.loadingUsers}
          users={this.props.users}
          clearInvitationsState={this.props.clearInvitationsState}
          getUsers={this.props.getUsers}
          invite={this.props.invite}
        />

        <Label>{formatMessage(messages.teamsInvitationsLabel)}</Label>
        <EditTeamsInvitations
          sendingRequest={this.props.sendingRequest}
          loadingTeams={this.props.loadingTeams}
          teams={this.props.teams}
          clearInvitationsState={this.props.clearInvitationsState}
          getTeams={this.props.getTeams}
          invite={this.props.invite}
        />

        <ButtonsWrapper>
          <Button
            backgroundColor={colors.lightGrey}
            float
            disabled={this.props.sendingRequest}
            onClickHandler={this.props.hideEditMapathon}
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
            onClickHandler={() =>
              this.props.editMapathon(this.props.mapathon.id, this.state.data)}
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
