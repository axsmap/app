/* eslint-disable no-param-reassign */

import { rgba, transparentize } from 'polished'
import { array, bool, func, object } from 'prop-types'
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
import Spinner from '../Spinner'
import { colors, fonts, media } from '../../styles'
import Toggle from '../Toggle'

import Map from './Map'
import messages from './messages'
import Teams from './Teams'

const Wrapper = styled.div`
  display: flex;

  align-items: center;
  flex-direction: column;
  flex-grow: 1;

  padding: 2rem 1rem 7rem 1rem;
  width: 100%;
  max-width: 40rem;

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
  font-size: 0.8rem;
  font-weight: bold;
  text-align: right;
`

const PosterSpinner = styled(Spinner)`margin-bottom: 1.5rem;`

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

const SelectBox = styled(SB)`margin-bottom: 0;`

const ButtonWrapper = styled.div`
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

class Form extends Component {
  static propTypes = {
    sendingRequest: bool.isRequired,
    locationCoordinates: object.isRequired,
    errors: object.isRequired,
    loadingTeams: bool.isRequired,
    teams: array.isRequired,
    getUserLocation: func.isRequired,
    setNotificationMessage: func.isRequired,
    clearError: func.isRequired,
    setLocationCoordinates: func.isRequired,
    getTeams: func.isRequired,
    createMapathon: func.isRequired
  }

  static contextTypes = {
    intl: intlShape
  }

  state = {
    data: {
      address: '',
      description: '',
      endDate: undefined,
      isOpen: true,
      name: '',
      participantsGoal: '',
      poster: '',
      reviewsGoal: '',
      startDate: undefined,
      teamManager: ''
    },
    loadingPoster: false,
    hostAs: 'individual',
    hostAsOptions: [
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
    this.props.getUserLocation()
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
    this.setState({ loadingPoster: true })
    this.setState({ data: { ...this.state.data, poster: null } })
    this.props.setNotificationMessage('')

    const posterFile = event.target.files[0]
    if (!posterFile) {
      this.setState({ loadingPoster: false })
      return
    } else if (posterFile.size > 8388608) {
      this.setState({ loadingPoster: false })
      this.props.setNotificationMessage('fileSizeError')
      return
    }

    const reader = new FileReader()
    reader.onloadend = () => {
      this.setState({ loadingPoster: false })
      this.setState({ data: { ...this.state.data, poster: reader.result } })
    }
    reader.readAsDataURL(posterFile)
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

        <Title>{formatMessage(messages.headerTitle)}</Title>

        <FormInput
          id="name"
          type="text"
          label={formatMessage(messages.nameLabel)}
          value={this.state.data.name}
          handler={this.handleDataChange}
          error={{
            message: this.props.errors.name,
            options: ['Is required', 'Should be less than 101 characters'],
            values: [
              formatMessage(messages.nameError1),
              formatMessage(messages.nameError2)
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

        {this.state.data.poster || this.state.loadingPoster
          ? null
          : [
              <Button
                key="button"
                backgroundColor={colors.secondary}
                color="white"
                disabled={this.props.sendingRequest || this.state.loadingPoster}
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

        {this.state.loadingPoster ? (
          <PosterSpinner color={colors.secondary} size={3} />
        ) : null}

        {this.state.data.poster ? (
          <Poster
            style={{ backgroundImage: `url("${this.state.data.poster}")` }}
          >
            <RemovePosterButton
              disabled={this.props.sendingRequest}
              onClick={() =>
                this.setState({
                  data: {
                    ...this.state.data,
                    poster: ''
                  }
                })}
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
        <Map
          location={this.props.locationCoordinates}
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
          <Teams
            sendingRequest={this.props.sendingRequest}
            loadingTeams={this.props.loadingTeams}
            teams={this.props.teams}
            getTeams={this.props.getTeams}
            chooseTeamManager={this.chooseTeamManager}
          />
        ) : null}

        <ButtonWrapper>
          <Button
            type="submit"
            float
            disabled={this.props.sendingRequest}
            onClickHandler={() => this.props.createMapathon(this.state.data)}
          >
            <ButtonContent>
              <Icon
                glyph="cross"
                size={1}
                rotate="45deg"
                color={colors.darkestGrey}
              />
              <p style={{ margin: '0 0 0 0.5rem' }}>
                {formatMessage(messages.createMapathonButton)}
              </p>
            </ButtonContent>
          </Button>
        </ButtonWrapper>
      </Wrapper>
    )
  }
}

export default Form
