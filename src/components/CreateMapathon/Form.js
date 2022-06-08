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
import ImageUploader from './ImageUploader'

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
  display: block;
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

const FocusArea = styled.button`
  width: 8rem;
  height: 5rem;
  background-color: ${props => props.backgroundColor || colors.gray100};
  color: ${colors.white};
  border: none;
  margin-right: 1.5rem;
  font-size: ${fontSize.xs};
  font-weight: ${fontWeight.semibold};
  display: inline-grid;
  justify-content: center;
  background-image: linear-gradient(
    to bottom,
    ${colors.gray700},
    ${colors.gray700} 20%,
    ${props => props.backgroundColor || colors.gray100} 0%,
    ${props => props.backgroundColor || colors.gray100}
  );
  background-size: cover;
  background-repeat: no-repeat;
  cursor: pointer;
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
      name: '',
      address: '',
      title: '',
      description: '',
      entranceFocus: null,
      interiorFocus: null,
      restroomFocus: null,
      endDate: undefined,
      isOpen: true,
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
    ],
    stepNumber: 1
  }

  componentWillMount() {
    this.props.getUserLocation()
  }

  handleDataChange = event => {
    this.setState({
      data: { ...this.state.data, [event.target.id]: event.target.value }
    })
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

  setCurrentStep = number => {
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

  toggleFocusArea = (focusArea, value) => {
    const tempState = this.state

    if (focusArea === 'entranceFocus' && value === true) {
      if (tempState.entranceFocus === true) {
        this.setState({ entranceFocus: null })
      } else {
        this.setState({ entranceFocus: true })
      }
    } else if (focusArea === 'entranceFocus') {
      if (tempState.entranceFocus === false) {
        this.setState({ entranceFocus: null })
      } else {
        this.setState({ entranceFocus: value })
      }
    }

    if (focusArea === 'interiorFocus' && value === true) {
      if (tempState.interiorFocus === true) {
        this.setState({ interiorFocus: null })
      } else {
        this.setState({ interiorFocus: true })
      }
    } else if (focusArea === 'interiorFocus') {
      if (tempState.interiorFocus === false) {
        this.setState({ interiorFocus: null })
      } else {
        this.setState({ interiorFocus: value })
      }
    }

    if (focusArea === 'restroomFocus' && value === true) {
      if (tempState.restroomFocus === true) {
        this.setState({ restroomFocus: null })
      } else {
        this.setState({ restroomFocus: true })
      }
    } else if (focusArea === 'restroomFocus') {
      if (tempState.restroomFocus === false) {
        this.setState({ restroomFocus: null })
      } else {
        this.setState({ restroomFocus: value })
      }
    }
  }

  render() {
    const { formatMessage } = this.context.intl

    return (
      <Wrapper>
        <Step
          headerTitle={formatMessage(messages.headerTitle)}
          stepNumber={1}
          currentStepNumber={this.state.stepNumber}
          stepTitle={formatMessage(messages.stepTitle1)}
          isFirstStep
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
              options: ['Is required', 'Should be less than 101 characters'],
              values: [
                formatMessage(messages.nameError1),
                formatMessage(messages.nameError2)
              ]
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
                formatMessage(messages.addressError2)
              ]
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
              options: [
                'Is required',
                'Should be less than 101 characters',
                'Is already taken'
              ],
              values: [
                formatMessage(messages.titleError1),
                formatMessage(messages.titleError2),
                formatMessage(messages.titleError3)
              ]
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
              options: ['Is required', 'Should be less than 301 characters'],
              values: [
                formatMessage(messages.descriptionError),
                formatMessage(messages.descriptionError)
              ]
            }}
            onInputFocus={() => this.props.clearError('description')}
          />
          <Label>{formatMessage(messages.mapathonFocusLabel)}</Label>

          <FocusArea
            backgroundColor={
              this.state.entranceFocus ? colors.gray700 : colors.gray100
            }
            onClick={() => this.toggleFocusArea('entranceFocus', true)}
          >
            Entrance
            <Icon
              glyph="entrylg"
              size={2}
              color={this.state.entranceFocus ? colors.white : colors.gray700}
              alt="Entrance"
              style={{ margin: '0 auto' }}
            />
          </FocusArea>
          <FocusArea
            backgroundColor={
              this.state.interiorFocus ? colors.gray700 : colors.gray100
            }
            onClick={() => this.toggleFocusArea('interiorFocus', true)}
          >
            Interior
            <Icon
              glyph="interior"
              size={3}
              color={this.state.interiorFocus ? colors.white : colors.gray700}
              alt="Interior"
              style={{ margin: '0 auto' }}
            />
          </FocusArea>
          <FocusArea
            backgroundColor={
              this.state.restroomFocus ? colors.gray700 : colors.gray100
            }
            onClick={() => this.toggleFocusArea('restroomFocus', true)}
          >
            Restroom
            <Icon
              glyph="restroom"
              size={2}
              color={this.state.restroomFocus ? colors.white : colors.gray700}
              alt="Restroom"
              style={{ margin: '0 auto' }}
            />
          </FocusArea>
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
          <ImageUploader />
        </Step>
        <Step
          headerTitle={formatMessage(messages.headerTitle)}
          stepNumber={4}
          currentStepNumber={this.state.stepNumber}
          stepTitle={formatMessage(messages.stepTitle4)}
          isFirstStep={false}
          isLastStep
          goPrevStep={() => this.goPreviousStep()}
          goNextStep={() => this.props.createMapathon(this.state.data)}
        >
          <Summary
            title={this.state.data.title}
            address={this.state.data.address}
            description={this.state.data.description}
            focusAreas={[
              this.state.entranceFocus,
              this.state.interiorFocus,
              this.state.restroomFocus
            ]}
          />
        </Step>
      </Wrapper>
    )
  }
}

export default Form
