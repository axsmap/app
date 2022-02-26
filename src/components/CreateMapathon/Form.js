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
import { colors, fonts, media, fontWeight, fontSize } from '../../styles'
import Toggle from '../Toggle'
import { getRandomString } from '../../utilities'

import Map from './Map'
import messages from './messages'
import Teams from './Teams'
import Step from './Step'
import Summary from './Summary'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  flex-grow: 1;
  overflow: hidden
  padding: 1rem 1rem;
  width: 100%;
  margin-left: auto;
  margin-right: auto;

  ${media.desktop`
    padding: 2rem 0;
  `};
`

const Error = styled.p`
  margin: 0 0 1.5rem 0;

  color: ${colors.alert};
  font-size: 1rem;
  font-weight: bold;
  text-align: right;
`
const Label = styled.label`
  margin-bottom: 0.2rem;
  width: 100%;
  color: ${colors.darkGrey};
  font-size: 1rem;
  font-weight: bold;
  text-transform: uppercase;
`
const SubTitle = styled.div`
  width: 100%;
  color: ${colors.darkestGrey};
  font-family: ${fonts.primary};
  font-size: ${fontSize.base};
  font-weight: ${fontWeight.semibold};
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
    createMapathon: func.isRequired,
  }

  static contextTypes = {
    intl: intlShape,
  }

  state = {
    data: {
      address: '',
      description: '',
      title: '',
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
          isRemovable: false,
        },
        {
          key: getRandomString(),
          value: 10,
          isRemovable: true,
        },
        {
          key: getRandomString(),
          value: 15,
          isRemovable: true,
        },
      ],
      donationGoal: 10,
    },
    hostAs: 'individual',
    hostAsOptions: [
      {
        value: 'individual',
        label: this.context.intl.formatMessage(messages.individualLabel),
      },
      {
        value: 'team',
        label: this.context.intl.formatMessage(messages.teamLabel),
      },
    ],
    stepNumber: 1,
  }

  componentWillMount() {
    this.props.getUserLocation()
  }

  handleDataChange = (event) => {
    this.setState({
      data: { ...this.state.data, [event.target.id]: event.target.value },
    })
  }

  handleDateChange = (day, { disabled }) => {
    if (disabled) return

    this.props.clearError('startDate')
    this.props.clearError('endDate')

    const range = DateUtils.addDayToRange(day, {
      from: this.state.data.startDate,
      to: this.state.data.endDate,
    })
    this.setState({
      data: { ...this.state.data, startDate: range.from, endDate: range.to },
    })
  }

  toggleBoolean = (key) => {
    if (key === 'donationEnabled') {
      this.setState({
        data: {
          ...this.state.data,
          donationEnabled: !this.state.data.donationEnabled,
          donationAmounts: [
            {
              key: getRandomString(),
              value: 5,
              isRemovable: false,
            },
            {
              key: getRandomString(),
              value: 10,
              isRemovable: true,
            },
            {
              key: getRandomString(),
              value: 15,
              isRemovable: true,
            },
          ],
          donationGoal: 10,
        },
      })
    } else {
      this.setState({
        data: { ...this.state.data, [key]: !this.state.data[key] },
      })
    }
  }

  handlePoster = (event) => {
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

  handleHostAsChange = (event) => {
    const hostAs = event.target.value
    if (hostAs === 'individual' || hostAs === 'team') {
      this.setState({ data: { ...this.state.data, teamManager: '' } })
    } else {
      this.setState({ data: { ...this.state.data, teamManager: hostAs } })
    }
    this.setState({ hostAs })
  }

  chooseTeamManager = (team) => {
    this.setState({
      data: { ...this.state.data, teamManager: team.id },
      hostAsOptions: [
        {
          value: 'individual',
          label: this.context.intl.formatMessage(messages.individualLabel),
        },
        {
          value: 'team',
          label: this.context.intl.formatMessage(messages.teamLabel),
        },
        {
          value: team.id,
          label: team.name,
        },
      ],
      hostAs: team.id,
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
        }),
      },
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
            isRemovable: true,
          },
        ],
      },
    })
  }

  removeAmount = (index) => {
    this.setState({
      data: {
        ...this.state.data,
        donationAmounts: this.state.data.donationAmounts.filter(
          (d, i) => i !== index
        ),
      },
    })
  }

  setCurrentStep = (number) => {
    this.setState({ stepNumber: number })
  }

  goNextStep = () => {
    const nextStep = this.state.stepNumber + 1
    if (nextStep <= 4) {
      this.setCurrentStep(nextStep)
    }
  }

  goPreviousStep = () => {
    const previousStep = this.state.stepNumber - 1
    if (previousStep >= 1) {
      this.setCurrentStep(previousStep)
    }
  }

  render() {
    const { formatMessage } = this.context.intl
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
        <Step
          headerTitle={formatMessage(messages.headerTitle)}
          stepNumber={1}
          currentStepNumber={this.state.stepNumber}
          stepTitle={formatMessage(messages.stepTitle1)}
          isFirstStep={true}
          isLastStep={false}
          goNextStep={() => this.goNextStep()}
        >
          <FormInput
            id="name"
            type="text"
            label={formatMessage(messages.yourNameLabel)}
            placeholder={formatMessage(messages.yourNamePlaceholder)}
            value={this.state.data.name}
            handler={this.handleDataChange}
            error={{
              message: this.props.errors.name,
              options: [
                'Is required',
                'Should be less than 101 characters',
                'Is already taken',
              ],
              values: [
                formatMessage(messages.nameError1),
                formatMessage(messages.nameError2),
                formatMessage(messages.nameError3),
              ],
            }}
            onInputFocus={() => this.props.clearError('name')}
          />
          <FormInput
            id="address"
            type="textarea"
            label={formatMessage(messages.yourLocationLabel)}
            placeholder={formatMessage(messages.yourLocationPlaceholder)}
            value={this.state.data.address}
            handler={this.handleDataChange}
            error={{
              message: this.props.errors.address,
              options: ['Is required', 'Should be less than 201 characters'],
              values: [
                formatMessage(messages.addressError1),
                formatMessage(messages.addressError2),
              ],
            }}
            onInputFocus={() => this.props.clearError('address')}
          />
        </Step>

        <Step
          headerTitle={formatMessage(messages.headerTitle)}
          stepNumber={2}
          currentStepNumber={this.state.stepNumber}
          stepTitle={formatMessage(messages.stepTitle2)}
          isFirstStep={false}
          isLastStep={false}
          goNextStep={() => this.goNextStep()}
          goPrevStep={() => this.goPreviousStep()}
        >
          <FormInput
            id="title"
            type="text"
            label={formatMessage(messages.mapathonTitleLabel)}
            placeholder={formatMessage(messages.mapathonTitlePlaceholder)}
            value={this.state.data.title}
            handler={this.handleDataChange}
            error={{
              message: this.props.errors.title,
              options: ['Should be less than 301 characters'],
              values: [formatMessage(messages.descriptionError)],
            }}
            onInputFocus={() => this.props.clearError('title')}
          />
          <FormInput
            id="description"
            type="textarea"
            label={formatMessage(messages.mapathonDescriptionLabel)}
            placeholder={formatMessage(messages.mapathonDescriptionPlaceholder)}
            value={this.state.data.description}
            handler={this.handleDataChange}
            error={{
              message: this.props.errors.description,
              options: ['Should be less than 301 characters'],
              values: [formatMessage(messages.descriptionError)],
            }}
            onInputFocus={() => this.props.clearError('description')}
          />
          <Label>{formatMessage(messages.mapathonFocusLabel)}</Label>
        </Step>
        <Step
          headerTitle={formatMessage(messages.headerTitle)}
          stepNumber={3}
          currentStepNumber={this.state.stepNumber}
          stepTitle={formatMessage(messages.stepTitle3)}
          isFirstStep={false}
          isLastStep={false}
          goPrevStep={() => this.goPreviousStep()}
          goNextStep={() => this.goNextStep()}
        >
          {' '}
          <SubTitle>
            {formatMessage(messages.mapathonPhotoDescription)}
          </SubTitle>
        </Step>
        <Step
          headerTitle={formatMessage(messages.headerTitle)}
          stepNumber={4}
          currentStepNumber={this.state.stepNumber}
          stepTitle={formatMessage(messages.stepTitle4)}
          isFirstStep={false}
          isLastStep={true}
          goPrevStep={() => this.goPreviousStep()}
          goNextStep={() => this.props.createMapathon(this.state.data)}
        >
          <Summary
            title={this.state.data.title}
            address={this.state.data.address}
            description={this.state.data.description}
          />
        </Step>
      </Wrapper>
    )
  }
}

export default Form
