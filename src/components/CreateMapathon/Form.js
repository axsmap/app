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
import SelectBox from '../SelectBox'
import { colors, fonts, media } from '../../styles'
import Toggle from '../Toggle'
import { getRandomString } from '../../utilities'

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

const DonationForm = styled.div`
  display: flex;

  align-items: center;
  flex-direction: column;
  justify-content: center;

  margin-top: 1.5rem;
  width: 100%;
`

const AmountsWrapper = styled.div`
  display: flex;

  align-items: center;
  justify-content: space-between;

  margin-bottom: 1.5rem;
  width: 100%;
`

const AmountWrapper = styled.div`
  display: flex;

  align-items: center;
  justify-content: center;

  margin-right: 1rem;

  &:last-of-type {
    margin-right: 0;
  }
`

const AmountInputWrapper = styled.div`
  position: relative;

  display: flex;

  flex-grow: 1;

  width: 100%;
`

const AmountInputDollar = styled.span`
  left: 0.5rem;
  position: absolute;
  top: 0.9rem;

  color: ${colors.darkestGrey};
  font-size: 1rem;
`

const AmountInput = styled.input`
  border: none;
  border-radius: 3px 0 0 3px;
  box-shadow: ${props =>
    props.hasError
      ? `inset 0px 0px 0px 2px ${colors.alert}`
      : `inset 0px 0px 0px 1px ${colors.darkGrey}`};
  height: 3rem;
  padding: 0.5rem 1rem 0.5rem 1.3rem;
  width: 100%;

  background-color: white;

  color: ${colors.darkestGrey};
  font-size: 1rem;

  &:focus {
    box-shadow: inset 0px 0px 0px 2px ${colors.secondary};
    outline: none;
  }
`

const AmountButton = styled.button`
  display: flex;
  opacity: 1;

  align-items: center;
  align-self: flex-end;
  flex-shrink: 0;
  justify-content: center;

  appearance: none;
  border: none;
  border-radius: 0 3px 3px 0;
  height: 3rem;
  margin: 0;
  padding: 0;
  width: 3rem;

  cursor: pointer;

  &:active,
  &:focus {
    outline: 2px solid ${colors.secondary};
  }

  &:disabled,
  &[disabled] {
    opacity: 0.5;
    pointer-events: none;
  }
`

class Form extends Component {
  static propTypes = {
    sendingRequest: bool.isRequired,
    poster: string.isRequired,
    locationCoordinates: object.isRequired,
    errors: object.isRequired,
    loadingTeams: bool.isRequired,
    teams: array.isRequired,
    getUserLocation: func.isRequired,
    setNotificationMessage: func.isRequired,
    clearError: func.isRequired,
    createPoster: func.isRequired,
    deletePoster: func.isRequired,
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
      reviewsGoal: '',
      startDate: undefined,
      teamManager: '',
      donationEnabled: false,
      donationAmounts: [
        {
          key: getRandomString(),
          value: 5,
          isRemovable: false
        },
        {
          key: getRandomString(),
          value: 10,
          isRemovable: true
        },
        {
          key: getRandomString(),
          value: 15,
          isRemovable: true
        }
      ],
      donationGoal: 10
    },
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

  toggleBoolean = key => {
    if (key === 'donationEnabled') {
      this.setState({
        data: {
          ...this.state.data,
          donationEnabled: !this.state.data.donationEnabled,
          donationAmounts: [
            {
              key: getRandomString(),
              value: 5,
              isRemovable: false
            },
            {
              key: getRandomString(),
              value: 10,
              isRemovable: true
            },
            {
              key: getRandomString(),
              value: 15,
              isRemovable: true
            }
          ],
          donationGoal: 10
        }
      })
    } else {
      this.setState({
        data: { ...this.state.data, [key]: !this.state.data[key] }
      })
    }
  }

  handlePoster = event => {
    this.props.setNotificationMessage('')

    const posterFile = event.target.files[0]
    if (posterFile.size > 8388608) {
      this.props.setNotificationMessage(
        'axsmap.components.CreateMapathon.fileSizeError'
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

  handleAmountChange = (index, key, value) => {
    this.setState({
      data: {
        ...this.state.data,
        donationAmounts: this.state.data.donationAmounts.map((d, i) => {
          if (i === index) {
            if (value > 100000) {
              return { ...d, [key]: 100000 }
            }
            return { ...d, [key]: value }
          }
          return d
        })
      }
    })
  }

  addAmount = () => {
    if (this.state.data.donationAmounts.length === 3) return
    this.setState({
      data: {
        ...this.state.data,
        donationAmounts: [
          ...this.state.data.donationAmounts,
          {
            key: Date.now(),
            value: 5,
            isRemovable: true
          }
        ]
      }
    })
  }

  removeAmount = index => {
    this.setState({
      data: {
        ...this.state.data,
        donationAmounts: this.state.data.donationAmounts.filter(
          (d, i) => i !== index
        )
      }
    })
  }

  render() {
    const {formatMessage} = this.context.intl
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
          <style>
            {`
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
          `}
          </style>
        </Helmet>

        <Title>{formatMessage(messages.headerTitle)}</Title>

        <FormInput
          id="name"
          type="text"
          label={formatMessage(messages.nameLabel)}
          placeholder={formatMessage(messages.namePlaceholder)}
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
          type="textarea"
          label={formatMessage(messages.addressLabel)}
          placeholder={formatMessage(messages.addressPlaceholder)}
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

        <Toggle
          active={this.state.data.isOpen}
          handler={() => this.toggleBoolean('isOpen')}
        >
          {formatMessage(messages.isOpenLabel)}
        </Toggle>

        <Label>{formatMessage(messages.hostAsLabel)}</Label>
        <SelectBox
          value={this.state.hostAs}
          options={this.state.hostAsOptions}
          borderColor={colors.darkGrey}
          onFocusBorderColor={colors.secondary}
          style={{ marginBottom: 0 }}
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

        <Toggle
          active={this.state.data.donationEnabled}
          style={{ marginBottom: 0, marginTop: '1.5rem' }}
          handler={() => this.toggleBoolean('donationEnabled')}
        >
          {formatMessage(messages.donationLabel)}
        </Toggle>

        {this.state.data.donationEnabled ? (
          <DonationForm>
            <Label>{formatMessage(messages.donationAmountsLabel)}</Label>
            <AmountsWrapper>
              {this.state.data.donationAmounts.map((a, i) => (
                <AmountWrapper key={a.key}>
                  <AmountInputWrapper>
                    <AmountInputDollar>$</AmountInputDollar>
                    <AmountInput
                      type="number"
                      value={a.value}
                      min={5}
                      max={100000}
                      onChange={e =>
                        this.handleAmountChange(i, 'value', e.target.value)}
                      onBlur={e => {
                        if (!e.target.value || e.target.value < 5) {
                          this.handleAmountChange(i, 'value', 5)
                        }
                      }}
                    />
                  </AmountInputWrapper>
                  <AmountButton
                    disabled={this.props.sendingRequest || !a.isRemovable}
                    style={{ backgroundColor: colors.alert }}
                    onClick={() => this.removeAmount(i)}
                  >
                    <Icon glyph="cross" size={1} />
                  </AmountButton>
                </AmountWrapper>
              ))}

              {this.state.data.donationAmounts.length < 3 ? (
                <AmountButton
                  disabled={this.props.sendingRequest}
                  style={{
                    marginLeft: '1rem',
                    backgroundColor: colors.success
                  }}
                  onClick={this.addAmount}
                >
                  <Icon glyph="cross" rotate="45deg" size={1} />
                </AmountButton>
              ) : null}
            </AmountsWrapper>

            <FormInput
              id="donationGoal"
              type="number"
              label={formatMessage(messages.donationGoalLabel)}
              value={this.state.data.donationGoal}
              min={10}
              max={100000}
              style={{ marginBottom: 0 }}
              error={{
                message: this.props.errors.donationGoal,
                options: [
                  'Is required',
                  'Should be greater than 9',
                  'Should be less than 100001'
                ],
                values: [
                  formatMessage(messages.donationGoalError1),
                  formatMessage(messages.donationGoalError2),
                  formatMessage(messages.donationGoalError3)
                ]
              }}
              prefix="$"
              handler={this.handleDataChange}
              onInputFocus={() => this.props.clearError('donationGoal')}
              onInputBlur={e => {
                if (!e.target.value || e.target.value < 10) {
                  e.target.value = 10
                  this.handleDataChange(e)
                }
              }}
            />
          </DonationForm>
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
