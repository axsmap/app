/* eslint-disable no-param-reassign, camelcase */
import { bool, func, object, string, number } from 'prop-types'
import React from 'react'
import { intlShape } from 'react-intl'
import styled from 'styled-components'
import Grid from 'styled-components-grid'
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext
} from 'pure-react-carousel'
import 'pure-react-carousel/dist/react-carousel.es.css'

import Button from '../Button'
import Icon from '../Icon'
import SelectBox from '../SelectBox'
import { colors, media, fontSize, fontWeight, fonts } from '../../styles'
import FormInput from '../FormInput'
import CloseBtn from './CloseBtn'

import messages from './messages'
import ReviewButtons from './ReviewButtons'
import DetailsMap from './DetailsMap'

const DarkHeader = styled.div`
  width: 100%;
  position: relative;
  overflow: hidden;
  background-color: ${colors.textColor};
  color: ${colors.white};
  text-transform: uppercase;
  text-align: center;
  padding: 7px 8px 9px 13px;
  height: 46px;
`

const Name = styled.div`
  color: ${colors.white};
  text-transform: uppercase;
  text-align: center;
  font-family: ${fonts.primary};
  text-transform: uppercase;
  font-weight: ${fontWeight.semibold};
  font-size: ${fontSize.base};
  line-height: 30px;
`

const Content = styled.div`
  display: block;
  position: relative;
  background-color: ${colors.white};
  padding: 40px 0 45px 0;
`
const SubTitle = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
  padding: 0 1rem;
  width: 100%;
  font-family: ${fonts.primary};
  text-transform: uppercase;
  font-weight: ${fontWeight.bold};
  font-size: ${fontSize.xs};
`

const ScoreDescription = styled.div`
  display: block;
  position: relative;
  padding: 0 1rem;
  width: 100%;
  font-family: ${fonts.tertiary};
  font-size: ${fontSize.base} !important;
  line-height: 1.5;

  ${media.desktop`
    padding: 0;
  `};
`

const Title = styled.div`
  display: block;
  position: relative;
  margin: 0rem 0 1rem 0;
  width: 100%;
  color: ${colors.darkestGrey};
  text-align: center;
  text-transform: uppercase;
  font-family: ${fonts.primary};
  font-weight: ${fontWeight.semibold} !important;
  font-size: ${fontSize.xxl} !important;

  ${media.desktop`
    font-size: ${fontSize.xl2} !important;
  `};
`

const Description = styled.div`
  display: block;
  position: relative;
  padding: 0 1rem;
  width: 100%;
  font-family: ${fonts.tertiary};
  text-align: center;
  font-size: ${fontSize.base} !important;
  line-height: 1.5;

  ${media.desktop`
    min-height: 96px;
    padding: 0;
  `};
`

const Caption = styled.div`
  position: relative;
  display: block;
  padding: 0;
  width: 100%;
  text-transform: uppercase;
  text-align: center;
  font-size: ${fontSize.xs};
  font-weight: ${fontWeight.semibold};
  font-family: ${fonts.primary};
  margin: 1rem auto 0 auto;
  line-height: 1.25;
`

const ScoreWrapper = styled.div`
  display: block;
  position: relative;
  align-items: center;
  justify-content: center;
  width: 100%;
`

const ScoreBox = styled.div`
  display: block;
  align-items: center;
  justify-content: center;
  height: 120px
  margin-right: 0px;
  width: 100%;
  padding: 15px 0 25px 0;
  text-align: center;
  position: relative;
  color: ${colors.black};
`

const mainReviewButtonStyles = () => `
  display: flex;
  opacity: 1;
  align-items: center;
  justify-content: center;
  appearance: none;
  border: none;
  border-radius: none;
  box-shadow: none;
  height: 3rem;
  margin-right: 0.8rem;
  padding: 0;
  background-color: transparent;
  cursor: pointer;

  &:active,
  &:focus {
    outline: 2px solid ${colors.secondary};
  }

  &:disabled,
  &[disabled] {
    opacity: 0.5;
  }

  &:last-of-type {
    margin-right: 0;
  }
`
const StepButton = styled.button`
  ${mainReviewButtonStyles};
  width: 130px;
  text-align: center;
  position: absolute !important;
  top: 30% !important;
  right: 29% !important;

  ${media.desktop`
    width: 96px;
  `};

  ${media.widescreen`
    width: 96px;
    right: 36% !important;
  `};
`

const YesButton = styled(Button)`
  width: 130px;
  height: 130px;
  background-color: ${props => props.backgroundColor || colors.gray500};
  color: ${props => props.textColor || colors.white};
  border: none;
  text-transform: uppercase;
  text-align: center;
  font-size: ${fontSize.xxl};
  font-weight: ${fontWeight.semibold};
  padding-left: 30px;
  padding-right: 30px;
  position: relative;
  display: block;
  margin: 3.5rem auto 0 auto;
  border: 4px solid ${props => props.textColor || colors.gray500};
  border-radius: 5px;

  ${media.desktop`
    margin: 2.5rem auto 0 auto;
  `};
`

const NoButton = styled(Button)`
  width: 130px;
  height: 130px;
  background-color: ${props => props.backgroundColor || colors.gray500};
  color: ${props => props.textColor || colors.white};
  border: none;
  text-transform: uppercase;
  text-align: center;
  font-size: ${fontSize.xxl};
  font-weight: ${fontWeight.semibold};
  padding-left: 30px;
  padding-right: 30px;
  position: relative;
  display: block;
  margin: 3.5rem auto 0 auto;
  border: 4px solid ${props => props.textColor || colors.gray500};
  border-radius: 5px;

  ${media.desktop`
    margin: 2.5rem auto 0 auto;
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

const OverlayButton = styled.div`
  display: block;
  position: absolute;
  top: 7px;
  right: 8px;
`

const PreSlider = styled.div`
  display: block;
  text-align: center;
  position: relative;
  height: 547px;
`

const PreSliderTitle = styled.h2`
  display: block;
  text-align: center;
  position: relative;
  font-size: ${fontSize.xl} !important;
`

const PreSliderContent = styled.div`
  display: block;
  text-align: center;
  position: relative;
  padding: 25px 0;
`

const PreSliderCta = styled.div`
  display: block;
  text-align: center;
`
const FormInputWrapper = styled.div`
  width: 100%;
  max-width: 30rem;
  margin: 0 auto;
`

export default class Review extends React.Component {
  static propTypes = {
    userData: object.isRequired,
    venue: object.isRequired,
    errors: object.isRequired,
    sendingRequest: bool.isRequired,
    setNotificationMessage: func.isRequired,
    clearError: func.isRequired,
    createReview: func.isRequired,
    reviewsRatioWeight: number.isRequired,
    generalType: string.isRequired,
    onClickHandler: func.isRequired
  }

  static contextTypes = {
    intl: intlShape
  }

  state = {
    entryScore: 0,
    entranceScore: 0,
    entryScoreColor: colors.grey,
    steps: null,
    stepsColor: colors.grey,
    interiorScore: null,
    interiorScoreColor: colors.grey,
    bathroomScore: null,
    bathroomScoreColor: colors.grey,
    allowsGuideDog: null,
    allowsGuideDogColor: colors.grey,
    hasParking: null,
    hasParkingColor: colors.grey,
    hasSecondEntry: null,
    hasSecondEntryColor: colors.grey,
    hasWellLit: null,
    hasWellLitColor: colors.grey,
    isQuiet: null,
    isQuietColor: colors.grey,
    isSpacious: null,
    isSpaciousColor: colors.grey,
    selectedEvent: 'none',
    activeEvents: [
      {
        value: 'none',
        label: this.context.intl.formatMessage(messages.noneLabel)
      }
    ],
    selectedTeam: 'none',
    teams: [
      {
        value: 'none',
        label: this.context.intl.formatMessage(messages.noneLabel)
      }
    ],
    hasPermanentRamp: null,
    hasPortableRamp: null,
    has0Steps: null,
    has1Step: null,
    has2Steps: null,
    hasWideEntrance: null,
    hasAccessibleTableHeight: null,
    hasAccessibleElevator: null,
    hasInteriorRamp: null,
    hasSwingOutDoor: null,
    hasLargeStall: null,
    hasSupportAroundToilet: null,
    hasLoweredSinks: null,
    totalCarouselItems: 20,
    maxEntryDetails: 9,
    maxBathroomDetails: 5,
    maxInteriorDetails: 7,
    hideMapathon: false
  }

  // Dev Note: Comment this out when working locally
  UNSAFE_componentWillMount() {
    const { activeEvents, teams } = this.state
    const { userData } = this.props

    this.setState({
      activeEvents: [
        ...activeEvents,
        ...[...userData.events, ...userData.managedEvents].reduce(
          (filtered, e) => {
            const eventStartDate = new Date(e.startDate)
            const eventEndDate = new Date(e.endDate)
            const today = new Date()

            if (eventStartDate <= today && eventEndDate >= today) {
              filtered.push({
                value: e.id,
                label: e.name
              })
            }

            return filtered
          },
          []
        )
      ],
      teams: [
        ...teams,
        ...[...userData.teams, ...userData.managedTeams].map(t => ({
          value: t.id,
          label: t.name
        }))
      ]
    })
  }
  // End Dev Note

  hideMapathonIntro = () => {
    this.setState({ hideMapathon: true })
  }

  updateTotalSlides = (param, value) => {
    let updateTotalSlides = 20

    // Entrance
    if (param === 'has0Steps' && value === true) {
      updateTotalSlides -= 4
      this.setState({ totalCarouselItems: updateTotalSlides })
    } else if (param === 'has0Steps') {
      this.setState({ totalCarouselItems: 20 })
    }

    if (param === 'hasPermanentRamp' && value === true) {
      updateTotalSlides -= 3
      this.setState({ totalCarouselItems: updateTotalSlides })
    } else if (param === 'hasPermanentRamp') {
      this.setState({ totalCarouselItems: 20 })
    }

    if (param === 'hasPortableRamp' && value === true) {
      updateTotalSlides -= 2
      this.setState({ totalCarouselItems: updateTotalSlides })
    } else if (param === 'hasPortableRamp') {
      this.setState({ totalCarouselItems: 20 })
    }

    // check this one
    if (param === 'has1Step' && value === true) {
      updateTotalSlides -= 1
      this.setState({ totalCarouselItems: updateTotalSlides })
    } else if (param === 'has1Step') {
      this.setState({ totalCarouselItems: 20 })
    }

    // if (param === "has2Steps" && value === true) {
    //   updateTotalSlides -= 1;
    //   this.setState({ totalCarouselItems: updateTotalSlides });
    // } else if (param === "has2Steps") {
    //   this.setState({ totalCarouselItems: 20 });
    // }
  }

  changeEntryScore = (entryParam, value) => {
    const { entranceScore } = this.state
    let tempEntryScore = this.state.entranceScore || 0
    const tempState = this.state

    /*
      Below function is for ensuring if user selects has2Steps 
      then goes back and selects has0Steps, has 2Steps becomes null
    */
    const revertValues = entryParam => {
      const compliancyTree = [
        'has0Steps',
        'hasPermanentRamp',
        'hasPortableRamp',
        'has1Step',
        'has2Steps'
      ]

      const entryIndex = compliancyTree.indexOf(entryParam) + 1
      if (entryIndex <= 0) return

      const stateObject = {}

      for (let i = entryIndex; i < compliancyTree.length; i++) {
        stateObject[compliancyTree[i]] = null
      }
      return this.setState(stateObject)
    }

    if (entryParam === 'hasPermanentRamp' && value === true) {
      if (tempState.hasPermanentRamp === true) {
        this.setState({ hasPermanentRamp: null })
        this.setState({ totalCarouselItems: 20 })
      } else {
        tempEntryScore += 4
        revertValues(entryParam)
        this.setState({ skipUntilReservedParking: true })
        this.setState({ hasPermanentRamp: value })
        this.updateTotalSlides(entryParam, value)
      }
    } else if (entryParam === 'hasPermanentRamp') {
      if (tempState.hasPermanentRamp === false) {
        this.setState({ hasPermanentRamp: null })
        this.setState({ totalCarouselItems: 20 })
      } else {
        this.setState({ hasPermanentRamp: value })
        this.updateTotalSlides(entryParam, value)
      }
    }

    if (entryParam === 'hasPortableRamp' && value === true) {
      if (tempState.hasPortableRamp === true) {
        this.setState({ hasPortableRamp: null })
        this.setState({ totalCarouselItems: 20 })
      } else {
        tempEntryScore += 1
        this.setState({ skipUntilReservedParking: true })
        this.setState({ hasPortableRamp: value })
        this.updateTotalSlides(entryParam, value)
        revertValues(entryParam)
      }
    } else if (entryParam === 'hasPortableRamp') {
      if (tempState.hasPortableRamp === false) {
        this.setState({ hasPortableRamp: null })
        this.setState({ totalCarouselItems: 20 })
      } else {
        this.setState({ hasPortableRamp: value })
        this.updateTotalSlides(entryParam, value)
      }
    }

    if (entryParam === 'has0Steps' && value === true) {
      if (tempState.has0Steps === true) {
        this.setState({ has0Steps: null })
        this.setState({ totalCarouselItems: 20 })
        this.setState({ steps: null })
      } else {
        tempEntryScore += 1
        this.setState({ has0Steps: value })
        this.setState({ steps: 0 })
        this.updateTotalSlides(entryParam, value)
        revertValues(entryParam)
      }
    } else if (entryParam === 'has0Steps') {
      if (tempState.has0Steps === false) {
        this.setState({ has0Steps: null })
        this.setState({ totalCarouselItems: 20 })
        this.setState({ steps: null })
      } else {
        this.setState({ has0Steps: value })
        this.updateTotalSlides(entryParam, value)
      }
    }

    if (entryParam === 'has1Step' && value === true) {
      if (tempState.has1Step === true) {
        this.setState({ has1Step: null })
        this.setState({ totalCarouselItems: 20 })
        this.setState({ steps: null })
      } else {
        tempEntryScore += 1
        this.setState({ skipUntilReservedParking: true })
        this.setState({ has1Step: value })
        this.setState({ steps: 1 })
        this.updateTotalSlides(entryParam, value)
        revertValues(entryParam)
      }
    } else if (entryParam === 'has1Step') {
      if (tempState.has1Step === false) {
        this.setState({ has1Step: null })
        this.setState({ totalCarouselItems: 20 })
        this.setState({ steps: null })
      } else {
        this.setState({ has1Step: value })
        this.setState({ steps: 1 })
        this.updateTotalSlides(entryParam, value)
      }
    }
    if (entryParam === 'has2Steps' && value === true) {
      if (tempState.has2Steps === true) {
        this.setState({ has2Steps: null })
        this.setState({ totalCarouselItems: 20 })
        this.setState({ steps: null })
      } else {
        tempEntryScore += 1
        this.setState({ skipUntilReservedParking: true })
        this.setState({ has2Steps: value })
        this.setState({ steps: 2 })
        this.updateTotalSlides(entryParam, value)
        revertValues(entryParam)
      }
    } else if (entryParam === 'has2Steps') {
      if (tempState.has2Steps === false) {
        this.setState({ has2Steps: null })
        this.setState({ totalCarouselItems: 20 })
        this.setState({ steps: null })
      } else {
        this.setState({ has2Steps: value })
        this.updateTotalSlides(entryParam, value)
      }
    }

    if (entryParam === 'hasParking' && value === true) {
      if (tempState.hasParking === true) {
        this.setState({ hasParking: null })
      } else {
        tempEntryScore += 2
        this.setState({ hasParking: value })
      }
    } else if (entryParam === 'hasParking') {
      if (tempState.hasParking === false) {
        this.setState({ hasParking: null })
      } else {
        this.setState({ hasParking: value })
      }
    }

    if (entryParam === 'hasSecondEntry' && value === true) {
      if (tempState.hasSecondEntry === true) {
        this.setState({ hasSecondEntry: null })
      } else {
        tempEntryScore += 1
        this.setState({ hasSecondEntry: value })
      }
    } else if (entryParam === 'hasSecondEntry') {
      if (tempState.hasSecondEntry === false) {
        this.setState({ hasSecondEntry: null })
      } else {
        this.setState({ hasSecondEntry: value })
      }
    }
    if (entryParam === 'hasWideEntrance' && value === true) {
      if (tempState.hasWideEntrance === true) {
        this.setState({ hasWideEntrance: null })
      } else {
        tempEntryScore += 1
        this.setState({ hasWideEntrance: value })
      }
    } else if (entryParam === 'hasWideEntrance') {
      if (tempState.hasWideEntrance === false) {
        this.setState({ hasWideEntrance: null })
      } else {
        this.setState({ hasWideEntrance: value })
      }
    }

    if (tempEntryScore !== entranceScore) {
      this.setState({ entranceScore: tempEntryScore })

      if (tempEntryScore >= 1 && tempEntryScore < 4) {
        this.setState({ entryScoreColor: colors.ratingCaution })
      } else if (tempEntryScore >= 4 && tempEntryScore < 6) {
        this.setState({ entryScoreColor: colors.ratingAlert })
      } else if (tempEntryScore >= 6) {
        this.setState({ entryScoreColor: colors.ratingAccessible })
      }
    }
  }

  changeInteriorScore = (interiorParam, value) => {
    const { interiorScore } = this.state
    let tempInteriorScore = interiorScore || 0
    const tempState = this.state
    if (interiorParam === 'isSpacious' && value === true) {
      if (tempState.isSpacious === true) {
        this.setState({ isSpacious: null })
      } else {
        tempInteriorScore += 1
        this.setState({ isSpacious: value })
      }
    } else if (interiorParam === 'isSpacious') {
      if (tempState.isSpacious === false) {
        this.setState({ isSpacious: null })
      } else {
        this.setState({ isSpacious: value })
      }
    }

    if (interiorParam === 'allowsGuideDog' && value === true) {
      if (tempState.allowsGuideDog === true) {
        this.setState({ allowsGuideDog: null })
      } else {
        tempInteriorScore += 1
        this.setState({ allowsGuideDog: value })
      }
    } else if (interiorParam === 'allowsGuideDog') {
      if (tempState.allowsGuideDog === false) {
        this.setState({ allowsGuideDog: null })
      } else {
        this.setState({ allowsGuideDog: value })
      }
    }

    if (interiorParam === 'hasWellLit' && value === true) {
      if (tempState.hasWellLit === true) {
        this.setState({ hasWellLit: null })
      } else {
        tempInteriorScore += 1
        this.setState({ hasWellLit: value })
      }
    } else if (interiorParam === 'hasWellLit') {
      if (tempState.hasWellLit === false) {
        this.setState({ hasWellLit: null })
      } else {
        this.setState({ hasWellLit: value })
      }
    }

    if (interiorParam === 'isQuiet' && value === true) {
      if (tempState.isQuiet === true) {
        this.setState({ isQuiet: null })
      } else {
        tempInteriorScore += 1
        this.setState({ isQuiet: value })
      }
    } else if (interiorParam === 'isQuiet') {
      if (tempState.isQuiet === false) {
        this.setState({ isQuiet: null })
      } else {
        this.setState({ isQuiet: value })
      }
    }

    if (interiorParam === 'hasAccessibleTableHeight' && value === true) {
      if (tempState.hasAccessibleTableHeight === true) {
        this.setState({ hasAccessibleTableHeight: null })
      } else {
        tempInteriorScore += 1
        this.setState({ hasAccessibleTableHeight: value })
      }
    } else if (interiorParam === 'hasAccessibleTableHeight') {
      if (tempState.hasAccessibleTableHeight === false) {
        this.setState({ hasAccessibleTableHeight: null })
      } else {
        this.setState({ hasAccessibleTableHeight: value })
      }
    }

    if (interiorParam === 'hasAccessibleElevator' && value === true) {
      if (tempState.hasAccessibleElevator === true) {
        this.setState({ hasAccessibleElevator: null })
      } else {
        tempInteriorScore += 1
        this.setState({ hasAccessibleElevator: value })
      }
    } else if (interiorParam === 'hasAccessibleElevator') {
      if (tempState.hasAccessibleElevator === false) {
        this.setState({ hasAccessibleElevator: null })
      } else {
        this.setState({ hasAccessibleElevator: value })
      }
    }

    if (interiorParam === 'hasInteriorRamp' && value === true) {
      if (tempState.hasInteriorRamp === true) {
        this.setState({ hasInteriorRamp: null })
      } else {
        tempInteriorScore += 1
        this.setState({ hasInteriorRamp: value })
      }
    } else if (interiorParam === 'hasInteriorRamp') {
      if (tempState.hasInteriorRamp === false) {
        this.setState({ hasInteriorRamp: null })
      } else {
        this.setState({ hasInteriorRamp: value })
      }
    }

    if (tempInteriorScore !== interiorScore) {
      this.setState({ interiorScore: tempInteriorScore })

      if (tempInteriorScore >= 1 && tempInteriorScore < 4) {
        this.setState({ interiorScoreColor: colors.ratingCaution })
      } else if (tempInteriorScore >= 4 && tempInteriorScore < 6) {
        this.setState({ interiorScoreColor: colors.ratingAlert })
      } else if (tempInteriorScore >= 6) {
        this.setState({ interiorScoreColor: colors.ratingAccessible })
      }
    }
  }

  changeBathroomScore = (bathroomParam, value) => {
    const { bathroomScore } = this.state
    let tempBathroomScore = bathroomScore || 0
    const tempState = this.state

    if (bathroomParam === 'hasSwingOutDoor' && value === true) {
      if (tempState.hasSwingOutDoor === true) {
        this.setState({ hasSwingOutDoor: null })
      } else {
        tempBathroomScore += 1
        this.setState({ hasSwingOutDoor: value })
      }
    } else if (bathroomParam === 'hasSwingOutDoor') {
      if (tempState.hasSwingOutDoor === false) {
        this.setState({ hasSwingOutDoor: null })
      } else {
        this.setState({ hasSwingOutDoor: value })
      }
    }

    if (bathroomParam === 'hasLargeStall' && value === true) {
      if (tempState.hasLargeStall === true) {
        this.setState({ hasLargeStall: null })
      } else {
        tempBathroomScore += 1
        this.setState({ hasLargeStall: value })
      }
    } else if (bathroomParam === 'hasLargeStall') {
      if (tempState.hasLargeStall === false) {
        this.setState({ hasLargeStall: null })
      } else {
        this.setState({ hasLargeStall: value })
      }
    }

    if (bathroomParam === 'hasSupportAroundToilet' && value === true) {
      if (tempState.hasSupportAroundToilet === true) {
        this.setState({ hasSupportAroundToilet: null })
      } else {
        tempBathroomScore += 1
        this.setState({ hasSupportAroundToilet: value })
      }
    } else if (bathroomParam === 'hasSupportAroundToilet') {
      if (tempState.hasSupportAroundToilet === false) {
        this.setState({ hasSupportAroundToilet: null })
      } else {
        this.setState({ hasSupportAroundToilet: value })
      }
    }

    if (bathroomParam === 'hasLoweredSinks' && value === true) {
      if (tempState.hasLoweredSinks === true) {
        this.setState({ hasLoweredSinks: null })
      } else {
        tempBathroomScore += 1
        this.setState({ hasLoweredSinks: value })
      }
    } else if (bathroomParam === 'hasLoweredSinks') {
      if (tempState.hasLoweredSinks === false) {
        this.setState({ hasLoweredSinks: null })
      } else {
        this.setState({ hasLoweredSinks: value })
      }
    }

    if (tempBathroomScore !== bathroomScore) {
      this.setState({ bathroomScore: tempBathroomScore })

      if (tempBathroomScore === 1) {
        this.setState({ bathroomScoreColor: colors.ratingCaution })
      } else if (tempBathroomScore === 2) {
        this.setState({ bathroomScoreColor: colors.ratingAlert })
      } else if (tempBathroomScore >= 3) {
        this.setState({ bathroomScoreColor: colors.ratingAccessible })
      }
    }
  }

  changeComments = event => {
    this.setState({ comments: event.target.value })
  }

  handleActiveEvents = event => {
    this.setState({ selectedEvent: event.target.value })
  }

  handleTeams = event => {
    this.setState({ selectedTeam: event.target.value })
  }

  render() {
    const { intl } = this.context
    const { formatMessage } = intl
    const {
      activeEvents,
      teams,
      hideMapathon,
      selectedEvent,
      selectedTeam,
      totalCarouselItems,
      has0Steps,
      hasPermanentRamp,
      hasPortableRamp,
      has1Step,
      has2Steps,
      hasParking,
      hasSecondEntry,
      hasWideEntrance,
      isSpacious,
      hasInteriorRamp,
      hasAccessibleElevator,
      hasAccessibleTableHeight,
      hasSwingOutDoor,
      hasLargeStall,
      hasSupportAroundToilet,
      hasLoweredSinks,
      hasWellLit,
      isQuiet,
      allowsGuideDog,
      comments
    } = this.state

    const {
      sendingRequest,
      createReview,
      venue,
      onClickHandler,
      errors,
      clearError,
      reviewsRatioWeight,
      generalType
    } = this.props

    return (
      <Grid className="is-full">
        <Grid.Unit
          size={{ tablet: 1 / 2, desktop: 1 / 2 }}
          className="bg-gray-300"
        >
          <Grid>
            <Grid.Unit
              size={{ mobile: 1 / 1, tablet: 1 / 1, desktop: 8 / 12 }}
              className="bg-white mx-auto my-7 overflow-hidden shadow-outer"
            >
              <DarkHeader>
                <CloseBtn
                  float="true"
                  className="shadow-none"
                  backgroundColor={colors.textColor}
                  color={colors.white}
                  disabled={sendingRequest}
                  onClick={() => {
                    createReview(this.state)
                  }}
                  style={{
                    padding: '0rem',
                    position: 'absolute',
                    top: '-3px',
                    left: '13px'
                  }}
                >
                  <Icon
                    glyph="cross"
                    size={1}
                    backgroundColor={colors.textColor}
                    color={colors.white}
                  />
                </CloseBtn>
                <Name>{venue.name}</Name>
                <OverlayButton>
                  <Button
                    disabled={false}
                    onClick={onClickHandler}
                    className="primary-btn--alt-circle"
                  >
                    <span className="_hide-visual">
                      Trigger how to rate modal
                    </span>
                    ?
                  </Button>
                </OverlayButton>
              </DarkHeader>
              <Content>
                <Grid>
                  <Grid.Unit
                    size={{ mobile: 1 / 1, tablet: 1 / 1, desktop: 10 / 12 }}
                    className="mx-auto"
                  >
                    {(activeEvents.length > 1 || teams.length > 1) &&
                    hideMapathon === false ? (
                      <PreSlider>
                        <PreSliderTitle className="alt">
                          {formatMessage(messages.connectMapathon)}
                        </PreSliderTitle>
                        <PreSliderContent>
                          {activeEvents.length > 1
                            ? [
                                <div
                                  style={{ paddingBottom: '20px' }}
                                  key="mapathon-screen"
                                >
                                  <Label
                                    key="label"
                                    style={{
                                      marginTop: '1.5rem',
                                      marginBottom: '1.5rem',
                                      maxWidth: '30rem'
                                    }}
                                  >
                                    {formatMessage(
                                      messages.selectedMapathonLabel
                                    )}
                                  </Label>
                                  <SelectBox
                                    key="selectBox"
                                    value={selectedEvent}
                                    options={activeEvents}
                                    borderColor={colors.darkGrey}
                                    onFocusBorderColor={colors.secondary}
                                    style={{
                                      maxWidth: '30rem',
                                      paddingBottom: '40px',
                                      marginLeft: 'auto',
                                      marginRight: 'auto'
                                    }}
                                    handleValueChange={this.handleActiveEvents}
                                  />
                                </div>
                              ]
                            : null}

                          {teams.length > 1
                            ? [
                                <div style={{ paddingBottom: '20px' }}>
                                  <Label
                                    key="label"
                                    style={{
                                      marginTop: '1.5rem',
                                      marginBottom: '1.5rem',
                                      maxWidth: '30rem'
                                    }}
                                  >
                                    {formatMessage(messages.selectedTeamLabel)}
                                  </Label>
                                  <SelectBox
                                    key="selectBox"
                                    value={selectedTeam}
                                    options={teams}
                                    borderColor={colors.darkGrey}
                                    onFocusBorderColor={colors.secondary}
                                    style={{
                                      maxWidth: '30rem',
                                      paddingBottom: '40px',
                                      marginLeft: 'auto',
                                      marginRight: 'auto'
                                    }}
                                    handleValueChange={this.handleTeams}
                                  />
                                </div>
                              ]
                            : null}
                        </PreSliderContent>
                        <PreSliderCta>
                          <Button
                            className="primary-btn primary-btn--large"
                            onClick={this.hideMapathonIntro}
                            disabled={false}
                          >
                            {' '}
                            {formatMessage(messages.mapathonReview)}
                          </Button>
                        </PreSliderCta>
                      </PreSlider>
                    ) : (
                      <div>
                        <CarouselProvider
                          naturalSlideWidth={100}
                          naturalSlideHeight={90}
                          totalSlides={totalCarouselItems}
                          visibleSlides={1}
                          data-carousel="addReview"
                          className="carousel--lg"
                          dragEnabled={false}
                        >
                          <Slider>
                            <Slide index={0} data-label="no steps">
                              <SubTitle>
                                {formatMessage(messages.createReviewSubheader)}
                              </SubTitle>
                              <ScoreWrapper>
                                <ScoreBox textColor={colors.black}>
                                  <Icon
                                    glyph="steps"
                                    size={6}
                                    className="fill-current text-black"
                                    aria-hidden="true"
                                    alt="steps"
                                    color={colors.black}
                                  />
                                  <StepButton disabled={sendingRequest}>
                                    <Icon
                                      glyph="zero"
                                      size={2.5}
                                      color={colors.white}
                                    />
                                  </StepButton>
                                </ScoreBox>
                                <ScoreDescription>
                                  <Caption>
                                    {' '}
                                    {formatMessage(messages.entryTitle)}{' '}
                                    {/* 
      3/
                                    {maxEntryDetails}
                                    */}
                                  </Caption>
                                  <Title>
                                    {formatMessage(messages.noStepsTitle)}
                                  </Title>
                                  <Description>
                                    {formatMessage(messages.noStepsDescription)}
                                  </Description>
                                </ScoreDescription>
                                <Grid className="is-full">
                                  <Grid.Unit
                                    size={{
                                      mobile: 1 / 2,
                                      tablet: 1 / 2,
                                      desktop: 4 / 12
                                    }}
                                    className="mx-auto"
                                  >
                                    <YesButton
                                      backgroundColor={
                                        has0Steps
                                          ? colors.primary
                                          : colors.gray500
                                      }
                                      textColor={
                                        has0Steps === true
                                          ? colors.textColor
                                          : colors.white
                                      }
                                      disabled={sendingRequest}
                                      onClick={() =>
                                        this.changeEntryScore('has0Steps', true)
                                      }
                                    >
                                      {formatMessage(messages.yesButton)}
                                    </YesButton>
                                  </Grid.Unit>
                                  <Grid.Unit
                                    size={{
                                      mobile: 1 / 2,
                                      tablet: 1 / 2,
                                      desktop: 4 / 12
                                    }}
                                    className="mx-auto"
                                  >
                                    <NoButton
                                      backgroundColor={
                                        has0Steps === false
                                          ? colors.primary
                                          : colors.gray500
                                      }
                                      textColor={
                                        has0Steps === false
                                          ? colors.textColor
                                          : colors.white
                                      }
                                      disabled={sendingRequest}
                                      onClick={() =>
                                        this.changeEntryScore(
                                          'has0Steps',
                                          false
                                        )
                                      }
                                    >
                                      {formatMessage(messages.noButton)}
                                    </NoButton>
                                  </Grid.Unit>
                                </Grid>
                              </ScoreWrapper>
                            </Slide>
                            {this.state.has0Steps !== true ? (
                              <div>
                                <Slide index={1} data-label="permanent ramp">
                                  <SubTitle>
                                    {formatMessage(
                                      messages.createReviewSubheader
                                    )}
                                  </SubTitle>
                                  <ScoreWrapper>
                                    <ScoreBox textColor={colors.black}>
                                      <Icon
                                        glyph="permanentRamp"
                                        size={6}
                                        className="fill-current text-black"
                                        aria-hidden="true"
                                        alt="permanent ramp"
                                        color={colors.black}
                                      />
                                    </ScoreBox>
                                    <ScoreDescription>
                                      <Caption>
                                        {' '}
                                        {formatMessage(
                                          messages.entryTitle
                                        )}{' '}
                                        {/*
  1/9 */}
                                      </Caption>
                                      <Title>
                                        {formatMessage(
                                          messages.permanentRampTitle
                                        )}
                                      </Title>
                                      <Description>
                                        {formatMessage(
                                          messages.permanentRampDescription
                                        )}
                                      </Description>
                                    </ScoreDescription>

                                    <Grid className="is-full">
                                      <Grid.Unit
                                        size={{
                                          mobile: 1 / 2,
                                          tablet: 1 / 2,
                                          desktop: 4 / 12
                                        }}
                                        className="mx-auto"
                                      >
                                        <YesButton
                                          backgroundColor={
                                            hasPermanentRamp === true
                                              ? colors.primary
                                              : colors.gray500
                                          }
                                          textColor={
                                            hasPermanentRamp === true
                                              ? colors.textColor
                                              : colors.white
                                          }
                                          disabled={sendingRequest}
                                          onClick={() =>
                                            this.changeEntryScore(
                                              'hasPermanentRamp',
                                              true
                                            )
                                          }
                                        >
                                          {formatMessage(messages.yesButton)}
                                        </YesButton>
                                      </Grid.Unit>
                                      <Grid.Unit
                                        size={{
                                          mobile: 1 / 2,
                                          tablet: 1 / 2,
                                          desktop: 4 / 12
                                        }}
                                        className="mx-auto"
                                      >
                                        <NoButton
                                          backgroundColor={
                                            hasPermanentRamp === false
                                              ? colors.primary
                                              : colors.gray500
                                          }
                                          textColor={
                                            hasPermanentRamp === false
                                              ? colors.textColor
                                              : colors.white
                                          }
                                          disabled={sendingRequest}
                                          onClick={() =>
                                            this.changeEntryScore(
                                              'hasPermanentRamp',
                                              false
                                            )
                                          }
                                        >
                                          {formatMessage(messages.noButton)}
                                        </NoButton>
                                      </Grid.Unit>
                                    </Grid>
                                  </ScoreWrapper>
                                </Slide>
                                {hasPermanentRamp !== true ? (
                                  <div>
                                    <Slide index={2} data-label="portable ramp">
                                      <SubTitle>
                                        {formatMessage(
                                          messages.createReviewSubheader
                                        )}
                                      </SubTitle>
                                      <ScoreWrapper>
                                        <ScoreBox textColor={colors.black}>
                                          <Icon
                                            glyph="portableRamp"
                                            size={6}
                                            className="fill-current text-black"
                                            aria-hidden="true"
                                            alt=" "
                                            color={colors.black}
                                          />
                                        </ScoreBox>
                                        <ScoreDescription>
                                          <Caption>
                                            {' '}
                                            {formatMessage(
                                              messages.entryTitle
                                            )}{' '}
                                            {/* 
  2/9 */}
                                          </Caption>
                                          <Title>
                                            {formatMessage(
                                              messages.portableRampTitle
                                            )}
                                          </Title>
                                          <Description>
                                            {formatMessage(
                                              messages.portableRampDescription
                                            )}
                                          </Description>
                                        </ScoreDescription>

                                        <Grid className="is-full">
                                          <Grid.Unit
                                            size={{
                                              mobile: 1 / 2,
                                              tablet: 1 / 2,
                                              desktop: 4 / 12
                                            }}
                                            className="mx-auto"
                                          >
                                            <YesButton
                                              backgroundColor={
                                                hasPortableRamp === true
                                                  ? colors.primary
                                                  : colors.gray500
                                              }
                                              textColor={
                                                hasPortableRamp === true
                                                  ? colors.textColor
                                                  : colors.white
                                              }
                                              disabled={sendingRequest}
                                              onClick={() =>
                                                this.changeEntryScore(
                                                  'hasPortableRamp',
                                                  true
                                                )
                                              }
                                            >
                                              {formatMessage(
                                                messages.yesButton
                                              )}
                                            </YesButton>
                                          </Grid.Unit>
                                          <Grid.Unit
                                            size={{
                                              mobile: 1 / 2,
                                              tablet: 1 / 2,
                                              desktop: 4 / 12
                                            }}
                                            className="mx-auto"
                                          >
                                            <NoButton
                                              backgroundColor={
                                                hasPortableRamp === false
                                                  ? colors.primary
                                                  : colors.gray500
                                              }
                                              textColor={
                                                hasPortableRamp === false
                                                  ? colors.textColor
                                                  : colors.white
                                              }
                                              disabled={sendingRequest}
                                              onClick={() =>
                                                this.changeEntryScore(
                                                  'hasPortableRamp',
                                                  false
                                                )
                                              }
                                            >
                                              {formatMessage(messages.noButton)}
                                            </NoButton>
                                          </Grid.Unit>
                                        </Grid>
                                      </ScoreWrapper>
                                    </Slide>

                                    {hasPortableRamp !== true ? (
                                      <div>
                                        <Slide index={3} data-label="one step">
                                          <SubTitle>
                                            {formatMessage(
                                              messages.createReviewSubheader
                                            )}
                                          </SubTitle>
                                          <ScoreWrapper>
                                            <ScoreBox textColor={colors.black}>
                                              <Icon
                                                glyph="steps"
                                                size={6}
                                                className="fill-current text-black"
                                                aria-hidden="true"
                                                alt=" "
                                                color={colors.black}
                                              />
                                              <StepButton
                                                disabled={sendingRequest}
                                              >
                                                <Icon
                                                  glyph="one"
                                                  size={2.5}
                                                  color={colors.white}
                                                />
                                              </StepButton>
                                            </ScoreBox>
                                            <ScoreDescription>
                                              <Caption>
                                                {' '}
                                                {formatMessage(
                                                  messages.entryTitle
                                                )}{' '}
                                                {/*
          4/
                                        {maxEntryDetails}
                                        */}
                                              </Caption>
                                              <Title>
                                                {formatMessage(
                                                  messages.oneStepTitle
                                                )}
                                              </Title>
                                              <Description>
                                                {formatMessage(
                                                  messages.oneStepDescription
                                                )}
                                              </Description>
                                            </ScoreDescription>
                                            <Grid className="is-full">
                                              <Grid.Unit
                                                size={{
                                                  mobile: 1 / 2,
                                                  tablet: 1 / 2,
                                                  desktop: 4 / 12
                                                }}
                                                className="mx-auto"
                                              >
                                                <YesButton
                                                  backgroundColor={
                                                    has1Step
                                                      ? colors.primary
                                                      : colors.gray500
                                                  }
                                                  textColor={
                                                    has1Step === true
                                                      ? colors.textColor
                                                      : colors.white
                                                  }
                                                  disabled={sendingRequest}
                                                  onClick={() =>
                                                    this.changeEntryScore(
                                                      'has1Step',
                                                      true
                                                    )
                                                  }
                                                >
                                                  {formatMessage(
                                                    messages.yesButton
                                                  )}
                                                </YesButton>
                                              </Grid.Unit>
                                              <Grid.Unit
                                                size={{
                                                  mobile: 1 / 2,
                                                  tablet: 1 / 2,
                                                  desktop: 4 / 12
                                                }}
                                                className="mx-auto"
                                              >
                                                <NoButton
                                                  backgroundColor={
                                                    has1Step === false
                                                      ? colors.primary
                                                      : colors.gray500
                                                  }
                                                  textColor={
                                                    has1Step === false
                                                      ? colors.textColor
                                                      : colors.white
                                                  }
                                                  disabled={sendingRequest}
                                                  onClick={() =>
                                                    this.changeEntryScore(
                                                      'has1Step',
                                                      false
                                                    )
                                                  }
                                                >
                                                  {formatMessage(
                                                    messages.noButton
                                                  )}
                                                </NoButton>
                                              </Grid.Unit>
                                            </Grid>
                                          </ScoreWrapper>
                                        </Slide>
                                        {has1Step !== true ? (
                                          <div>
                                            <Slide
                                              index={4}
                                              data-label="two steps"
                                            >
                                              <SubTitle>
                                                {formatMessage(
                                                  messages.createReviewSubheader
                                                )}
                                              </SubTitle>
                                              <ScoreWrapper>
                                                <ScoreBox
                                                  textColor={colors.black}
                                                >
                                                  <Icon
                                                    glyph="steps"
                                                    size={6}
                                                    className="fill-current text-black"
                                                    aria-hidden="true"
                                                    alt=" "
                                                    color={colors.black}
                                                  />
                                                  <StepButton
                                                    disabled={sendingRequest}
                                                  >
                                                    <Icon
                                                      glyph="two"
                                                      size={2.5}
                                                      color={colors.white}
                                                    />
                                                  </StepButton>
                                                </ScoreBox>
                                                <ScoreDescription>
                                                  <Caption>
                                                    {' '}
                                                    {formatMessage(
                                                      messages.entryTitle
                                                    )}{' '}
                                                    {/*
            5/
                                          {maxEntryDetails}
                                          */}
                                                  </Caption>
                                                  <Title>
                                                    {formatMessage(
                                                      messages.twoStepsTitle
                                                    )}
                                                  </Title>
                                                  <Description>
                                                    {formatMessage(
                                                      messages.twoStepsDescription
                                                    )}
                                                  </Description>
                                                </ScoreDescription>
                                                <Grid className="is-full">
                                                  <Grid.Unit
                                                    size={{
                                                      mobile: 1 / 2,
                                                      tablet: 1 / 2,
                                                      desktop: 4 / 12
                                                    }}
                                                    className="mx-auto"
                                                  >
                                                    <YesButton
                                                      backgroundColor={
                                                        has2Steps
                                                          ? colors.primary
                                                          : colors.gray500
                                                      }
                                                      textColor={
                                                        has2Steps === true
                                                          ? colors.textColor
                                                          : colors.white
                                                      }
                                                      disabled={sendingRequest}
                                                      onClick={() =>
                                                        this.changeEntryScore(
                                                          'has2Steps',
                                                          true
                                                        )
                                                      }
                                                    >
                                                      {formatMessage(
                                                        messages.yesButton
                                                      )}
                                                    </YesButton>
                                                  </Grid.Unit>
                                                  <Grid.Unit
                                                    size={{
                                                      mobile: 1 / 2,
                                                      tablet: 1 / 2,
                                                      desktop: 4 / 12
                                                    }}
                                                    className="mx-auto"
                                                  >
                                                    <NoButton
                                                      backgroundColor={
                                                        has2Steps === false
                                                          ? colors.primary
                                                          : colors.gray500
                                                      }
                                                      textColor={
                                                        has2Steps === false
                                                          ? colors.textColor
                                                          : colors.white
                                                      }
                                                      disabled={sendingRequest}
                                                      onClick={() =>
                                                        this.changeEntryScore(
                                                          'has2Steps',
                                                          false
                                                        )
                                                      }
                                                    >
                                                      {formatMessage(
                                                        messages.noButton
                                                      )}
                                                    </NoButton>
                                                  </Grid.Unit>
                                                </Grid>
                                              </ScoreWrapper>
                                            </Slide>
                                          </div>
                                        ) : null}
                                      </div>
                                    ) : null}
                                  </div>
                                ) : null}
                              </div>
                            ) : null}
                            <Slide index={5} data-label="reserved parking">
                              <SubTitle>
                                {formatMessage(messages.createReviewSubheader)}
                              </SubTitle>
                              <ScoreWrapper>
                                <ScoreBox
                                  textColor={colors.white}
                                  className="box__dark"
                                >
                                  <Icon
                                    glyph="parking"
                                    size={6}
                                    className="fill-current text-white"
                                    aria-hidden="true"
                                    alt=" "
                                    color={colors.white}
                                  />
                                </ScoreBox>
                                <ScoreDescription>
                                  <Caption>
                                    {' '}
                                    {formatMessage(messages.entryTitle)}{' '}
                                    {/*
  7/
                                {maxEntryDetails}
                                */}
                                  </Caption>
                                  <Title>
                                    {formatMessage(
                                      messages.reservedParkingTitle
                                    )}
                                  </Title>
                                  <Description>
                                    {formatMessage(
                                      messages.reservedParkingDescription
                                    )}
                                  </Description>
                                </ScoreDescription>
                                <Grid className="is-full">
                                  <Grid.Unit
                                    size={{
                                      mobile: 1 / 2,
                                      tablet: 1 / 2,
                                      desktop: 4 / 12
                                    }}
                                    className="mx-auto"
                                  >
                                    <YesButton
                                      backgroundColor={
                                        hasParking
                                          ? colors.primary
                                          : colors.gray500
                                      }
                                      textColor={
                                        hasParking === true
                                          ? colors.textColor
                                          : colors.white
                                      }
                                      disabled={sendingRequest}
                                      onClick={() =>
                                        this.changeEntryScore(
                                          'hasParking',
                                          true
                                        )
                                      }
                                    >
                                      {formatMessage(messages.yesButton)}
                                    </YesButton>
                                  </Grid.Unit>
                                  <Grid.Unit
                                    size={{
                                      mobile: 1 / 2,
                                      tablet: 1 / 2,
                                      desktop: 4 / 12
                                    }}
                                    className="mx-auto"
                                  >
                                    <NoButton
                                      backgroundColor={
                                        hasParking === false
                                          ? colors.primary
                                          : colors.gray500
                                      }
                                      textColor={
                                        hasParking === false
                                          ? colors.textColor
                                          : colors.white
                                      }
                                      disabled={sendingRequest}
                                      onClick={() =>
                                        this.changeEntryScore(
                                          'hasParking',
                                          false
                                        )
                                      }
                                    >
                                      {formatMessage(messages.noButton)}
                                    </NoButton>
                                  </Grid.Unit>
                                </Grid>
                              </ScoreWrapper>
                            </Slide>
                            <Slide index={6} data-label="second entry">
                              <SubTitle>
                                {formatMessage(messages.createReviewSubheader)}
                              </SubTitle>
                              <ScoreWrapper>
                                <ScoreBox textColor={colors.black}>
                                  <Icon
                                    glyph="secondEntry"
                                    size={6}
                                    className="fill-current text-black"
                                    aria-hidden="true"
                                    alt=" "
                                    color={colors.black}
                                  />
                                </ScoreBox>
                                <ScoreDescription>
                                  <Caption>
                                    {' '}
                                    {formatMessage(messages.entryTitle)}{' '}
                                    {/*
  8/
                                {maxEntryDetails}
                                */}
                                  </Caption>
                                  <Title>
                                    {formatMessage(messages.secondEntryTitle)}
                                  </Title>
                                  <Description>
                                    {formatMessage(
                                      messages.secondEntryDescription
                                    )}
                                  </Description>
                                </ScoreDescription>
                                <Grid className="is-full">
                                  <Grid.Unit
                                    size={{
                                      mobile: 1 / 2,
                                      tablet: 1 / 2,
                                      desktop: 4 / 12
                                    }}
                                    className="mx-auto"
                                  >
                                    <YesButton
                                      backgroundColor={
                                        hasSecondEntry
                                          ? colors.primary
                                          : colors.gray500
                                      }
                                      textColor={
                                        hasSecondEntry === true
                                          ? colors.textColor
                                          : colors.white
                                      }
                                      disabled={sendingRequest}
                                      onClick={() =>
                                        this.changeEntryScore(
                                          'hasSecondEntry',
                                          true
                                        )
                                      }
                                    >
                                      {formatMessage(messages.yesButton)}
                                    </YesButton>
                                  </Grid.Unit>
                                  <Grid.Unit
                                    size={{
                                      mobile: 1 / 2,
                                      tablet: 1 / 2,
                                      desktop: 4 / 12
                                    }}
                                    className="mx-auto"
                                  >
                                    <NoButton
                                      backgroundColor={
                                        hasSecondEntry === false
                                          ? colors.primary
                                          : colors.gray500
                                      }
                                      textColor={
                                        hasSecondEntry === false
                                          ? colors.textColor
                                          : colors.white
                                      }
                                      disabled={sendingRequest}
                                      onClick={() =>
                                        this.changeEntryScore(
                                          'hasSecondEntry',
                                          false
                                        )
                                      }
                                    >
                                      {formatMessage(messages.noButton)}
                                    </NoButton>
                                  </Grid.Unit>
                                </Grid>
                              </ScoreWrapper>
                            </Slide>
                            <Slide index={7} data-label="wide entrance">
                              <SubTitle>
                                {formatMessage(messages.createReviewSubheader)}
                              </SubTitle>
                              <ScoreWrapper>
                                <ScoreBox textColor={colors.black}>
                                  <Icon
                                    glyph="wideEntry"
                                    size={6}
                                    className="fill-current text-black"
                                    aria-hidden="true"
                                    alt=" "
                                    color={colors.black}
                                  />
                                </ScoreBox>
                                <ScoreDescription>
                                  <Caption>
                                    {' '}
                                    {formatMessage(messages.entryTitle)}{' '}
                                    {/*
  9/
                                {maxEntryDetails}
                                */}
                                  </Caption>
                                  <Title>
                                    {formatMessage(messages.wideEntranceTitle)}
                                  </Title>
                                  <Description>
                                    {formatMessage(
                                      messages.wideEntranceDescription
                                    )}
                                  </Description>
                                </ScoreDescription>
                                <Grid className="is-full">
                                  <Grid.Unit
                                    size={{
                                      mobile: 1 / 2,
                                      tablet: 1 / 2,
                                      desktop: 4 / 12
                                    }}
                                    className="mx-auto"
                                  >
                                    <YesButton
                                      backgroundColor={
                                        hasWideEntrance
                                          ? colors.primary
                                          : colors.gray500
                                      }
                                      textColor={
                                        hasWideEntrance === true
                                          ? colors.textColor
                                          : colors.white
                                      }
                                      disabled={sendingRequest}
                                      onClick={() =>
                                        this.changeEntryScore(
                                          'hasWideEntrance',
                                          true
                                        )
                                      }
                                    >
                                      {formatMessage(messages.yesButton)}
                                    </YesButton>
                                  </Grid.Unit>
                                  <Grid.Unit
                                    size={{
                                      mobile: 1 / 2,
                                      tablet: 1 / 2,
                                      desktop: 4 / 12
                                    }}
                                    className="mx-auto"
                                  >
                                    <NoButton
                                      backgroundColor={
                                        hasWideEntrance === false
                                          ? colors.primary
                                          : colors.gray500
                                      }
                                      textColor={
                                        hasWideEntrance === false
                                          ? colors.textColor
                                          : colors.white
                                      }
                                      disabled={sendingRequest}
                                      onClick={() =>
                                        this.changeEntryScore(
                                          'hasWideEntrance',
                                          false
                                        )
                                      }
                                    >
                                      {formatMessage(messages.noButton)}
                                    </NoButton>
                                  </Grid.Unit>
                                </Grid>
                              </ScoreWrapper>
                            </Slide>
                            {/* Interior */}
                            <Slide index={8} data-label="room to move">
                              <SubTitle>
                                {formatMessage(messages.createReviewSubheader)}
                              </SubTitle>
                              <ScoreWrapper>
                                <ScoreBox textColor={colors.black}>
                                  <Icon
                                    glyph="space"
                                    size={6}
                                    className="fill-current text-black"
                                    aria-hidden="true"
                                    alt=" "
                                    color={colors.black}
                                  />
                                </ScoreBox>
                                <ScoreDescription>
                                  <Caption>
                                    {formatMessage(messages.stepsTitle)}{' '}
                                    {/*
  1/
                                {maxInteriorDetails}
                                */}
                                  </Caption>
                                  <Title>
                                    {formatMessage(messages.roomToMoveTitle)}
                                  </Title>
                                  <Description>
                                    {formatMessage(
                                      messages.roomToMoveDescription
                                    )}
                                  </Description>
                                </ScoreDescription>
                                <Grid className="is-full">
                                  <Grid.Unit
                                    size={{
                                      mobile: 1 / 2,
                                      tablet: 1 / 2,
                                      desktop: 4 / 12
                                    }}
                                    className="mx-auto"
                                  >
                                    <YesButton
                                      backgroundColor={
                                        isSpacious
                                          ? colors.primary
                                          : colors.gray500
                                      }
                                      textColor={
                                        isSpacious === true
                                          ? colors.textColor
                                          : colors.white
                                      }
                                      disabled={sendingRequest}
                                      onClick={() =>
                                        this.changeInteriorScore(
                                          'isSpacious',
                                          true
                                        )
                                      }
                                    >
                                      {formatMessage(messages.yesButton)}
                                    </YesButton>
                                  </Grid.Unit>
                                  <Grid.Unit
                                    size={{
                                      mobile: 1 / 2,
                                      tablet: 1 / 2,
                                      desktop: 4 / 12
                                    }}
                                    className="mx-auto"
                                  >
                                    <NoButton
                                      backgroundColor={
                                        isSpacious === false
                                          ? colors.primary
                                          : colors.gray500
                                      }
                                      textColor={
                                        isSpacious === false
                                          ? colors.textColor
                                          : colors.white
                                      }
                                      disabled={sendingRequest}
                                      onClick={() =>
                                        this.changeInteriorScore(
                                          'isSpacious',
                                          false
                                        )
                                      }
                                    >
                                      {formatMessage(messages.noButton)}
                                    </NoButton>
                                  </Grid.Unit>
                                </Grid>
                              </ScoreWrapper>
                            </Slide>
                            <Slide index={9} data-label="interior ramp">
                              <SubTitle>
                                {formatMessage(messages.createReviewSubheader)}
                              </SubTitle>
                              <ScoreWrapper>
                                <ScoreBox textColor={colors.black}>
                                  <Icon
                                    glyph="interiorRamp"
                                    size={6}
                                    className="fill-current text-black"
                                    aria-hidden="true"
                                    alt=" "
                                    color={colors.black}
                                  />
                                </ScoreBox>
                                <ScoreDescription>
                                  <Caption>
                                    {formatMessage(messages.stepsTitle)}{' '}
                                    {/*
  7/
                              {maxInteriorDetails}
                              */}
                                  </Caption>
                                  <Title>
                                    {formatMessage(messages.interiorRampTitle)}
                                  </Title>
                                  <Description>
                                    {formatMessage(
                                      messages.interiorRampDescription
                                    )}
                                  </Description>
                                </ScoreDescription>
                                <Grid className="is-full">
                                  <Grid.Unit
                                    size={{
                                      mobile: 1 / 2,
                                      tablet: 1 / 2,
                                      desktop: 4 / 12
                                    }}
                                    className="mx-auto"
                                  >
                                    <YesButton
                                      backgroundColor={
                                        hasInteriorRamp
                                          ? colors.primary
                                          : colors.gray500
                                      }
                                      textColor={
                                        hasInteriorRamp === true
                                          ? colors.textColor
                                          : colors.white
                                      }
                                      disabled={sendingRequest}
                                      onClick={() =>
                                        this.changeInteriorScore(
                                          'hasInteriorRamp',
                                          true
                                        )
                                      }
                                    >
                                      {formatMessage(messages.yesButton)}
                                    </YesButton>
                                  </Grid.Unit>
                                  <Grid.Unit
                                    size={{
                                      mobile: 1 / 2,
                                      tablet: 1 / 2,
                                      desktop: 4 / 12
                                    }}
                                    className="mx-auto"
                                  >
                                    <NoButton
                                      backgroundColor={
                                        hasInteriorRamp === false
                                          ? colors.primary
                                          : colors.gray500
                                      }
                                      textColor={
                                        hasInteriorRamp === false
                                          ? colors.textColor
                                          : colors.white
                                      }
                                      disabled={sendingRequest}
                                      onClick={() =>
                                        this.changeInteriorScore(
                                          'hasInteriorRamp',
                                          false
                                        )
                                      }
                                    >
                                      {formatMessage(messages.noButton)}
                                    </NoButton>
                                  </Grid.Unit>
                                </Grid>
                              </ScoreWrapper>
                            </Slide>
                            <Slide index={10} data-label="accessible elevator">
                              <SubTitle>
                                {formatMessage(messages.createReviewSubheader)}
                              </SubTitle>
                              <ScoreWrapper>
                                <ScoreBox textColor={colors.black}>
                                  <Icon
                                    glyph="elevator"
                                    size={6}
                                    className="fill-current text-black"
                                    aria-hidden="true"
                                    alt=" "
                                    color={colors.black}
                                  />
                                </ScoreBox>
                                <ScoreDescription>
                                  <Caption>
                                    {formatMessage(messages.stepsTitle)}{' '}
                                    {/* 
      6/
                                {maxInteriorDetails}
                                */}
                                  </Caption>
                                  <Title>
                                    {formatMessage(
                                      messages.accessibleElevatorTitle
                                    )}
                                  </Title>
                                  <Description>
                                    {formatMessage(
                                      messages.accessibleElevatorDescription
                                    )}
                                  </Description>
                                </ScoreDescription>
                                <Grid className="is-full">
                                  <Grid.Unit
                                    size={{
                                      mobile: 1 / 2,
                                      tablet: 1 / 2,
                                      desktop: 4 / 12
                                    }}
                                    className="mx-auto"
                                  >
                                    <YesButton
                                      backgroundColor={
                                        hasAccessibleElevator
                                          ? colors.primary
                                          : colors.gray500
                                      }
                                      textColor={
                                        hasAccessibleElevator === true
                                          ? colors.textColor
                                          : colors.white
                                      }
                                      disabled={sendingRequest}
                                      onClick={() =>
                                        this.changeInteriorScore(
                                          'hasAccessibleElevator',
                                          true
                                        )
                                      }
                                    >
                                      {formatMessage(messages.yesButton)}
                                    </YesButton>
                                  </Grid.Unit>
                                  <Grid.Unit
                                    size={{
                                      mobile: 1 / 2,
                                      tablet: 1 / 2,
                                      desktop: 4 / 12
                                    }}
                                    className="mx-auto"
                                  >
                                    <NoButton
                                      backgroundColor={
                                        hasAccessibleElevator === false
                                          ? colors.primary
                                          : colors.gray500
                                      }
                                      textColor={
                                        hasAccessibleElevator === false
                                          ? colors.textColor
                                          : colors.white
                                      }
                                      disabled={sendingRequest}
                                      onClick={() =>
                                        this.changeInteriorScore(
                                          'hasAccessibleElevator',
                                          false
                                        )
                                      }
                                    >
                                      {formatMessage(messages.noButton)}
                                    </NoButton>
                                  </Grid.Unit>
                                </Grid>
                              </ScoreWrapper>
                            </Slide>
                            <Slide
                              index={11}
                              data-label="accessible table height"
                            >
                              <SubTitle>
                                {formatMessage(messages.createReviewSubheader)}
                              </SubTitle>
                              <ScoreWrapper>
                                <ScoreBox textColor={colors.black}>
                                  <Icon
                                    glyph="table"
                                    size={6}
                                    className="fill-current text-black"
                                    aria-hidden="true"
                                    alt=" "
                                    color={colors.black}
                                  />
                                </ScoreBox>
                                <ScoreDescription>
                                  <Caption>
                                    {formatMessage(messages.stepsTitle)}{' '}
                                    {/*
  2/
                                {maxInteriorDetails}
                                */}
                                  </Caption>
                                  <Title>
                                    {formatMessage(
                                      messages.accessibleTableHeightTitle
                                    )}
                                  </Title>
                                  <Description>
                                    {formatMessage(
                                      messages.accessibleTableHeightDescription
                                    )}
                                  </Description>
                                </ScoreDescription>
                                <Grid className="is-full">
                                  <Grid.Unit
                                    size={{
                                      mobile: 1 / 2,
                                      tablet: 1 / 2,
                                      desktop: 4 / 12
                                    }}
                                    className="mx-auto"
                                  >
                                    <YesButton
                                      backgroundColor={
                                        hasAccessibleTableHeight
                                          ? colors.primary
                                          : colors.gray500
                                      }
                                      textColor={
                                        hasAccessibleTableHeight === true
                                          ? colors.textColor
                                          : colors.white
                                      }
                                      disabled={sendingRequest}
                                      onClick={() =>
                                        this.changeInteriorScore(
                                          'hasAccessibleTableHeight',
                                          true
                                        )
                                      }
                                    >
                                      {formatMessage(messages.yesButton)}
                                    </YesButton>
                                  </Grid.Unit>
                                  <Grid.Unit
                                    size={{
                                      mobile: 1 / 2,
                                      tablet: 1 / 2,
                                      desktop: 4 / 12
                                    }}
                                    className="mx-auto"
                                  >
                                    <NoButton
                                      backgroundColor={
                                        hasAccessibleTableHeight === false
                                          ? colors.primary
                                          : colors.gray500
                                      }
                                      textColor={
                                        hasAccessibleTableHeight === false
                                          ? colors.textColor
                                          : colors.white
                                      }
                                      disabled={sendingRequest}
                                      onClick={() =>
                                        this.changeInteriorScore(
                                          'hasAccessibleTableHeight',
                                          false
                                        )
                                      }
                                    >
                                      {formatMessage(messages.noButton)}
                                    </NoButton>
                                  </Grid.Unit>
                                </Grid>
                              </ScoreWrapper>
                            </Slide>
                            {/* Restroom */}
                            <Slide index={12} data-label="door swings out">
                              <SubTitle>
                                {formatMessage(messages.createReviewSubheader)}
                              </SubTitle>
                              <ScoreWrapper>
                                <ScoreBox textColor={colors.black}>
                                  <Icon
                                    glyph="doorSwingsOut"
                                    size={6}
                                    className="fill-current text-black"
                                    aria-hidden="true"
                                    alt=" "
                                    color={colors.black}
                                  />
                                </ScoreBox>
                                <ScoreDescription>
                                  <Caption>
                                    {formatMessage(messages.bathroomTitle)}{' '}
                                    {/*
  2/
                                {maxBathroomDetails}
                                */}
                                  </Caption>
                                  <Title>
                                    {formatMessage(messages.doorSwingsOutTitle)}
                                  </Title>
                                  <Description>
                                    {formatMessage(
                                      messages.doorSwingsOutDescription
                                    )}
                                  </Description>
                                </ScoreDescription>
                                <Grid>
                                  <Grid.Unit
                                    size={{
                                      mobile: 1 / 2,
                                      tablet: 1 / 2,
                                      desktop: 4 / 12
                                    }}
                                    className="mx-auto"
                                  >
                                    <YesButton
                                      backgroundColor={
                                        hasSwingOutDoor
                                          ? colors.primary
                                          : colors.gray500
                                      }
                                      textColor={
                                        hasSwingOutDoor === true
                                          ? colors.textColor
                                          : colors.white
                                      }
                                      disabled={sendingRequest}
                                      onClick={() =>
                                        this.changeBathroomScore(
                                          'hasSwingOutDoor',
                                          true
                                        )
                                      }
                                    >
                                      {formatMessage(messages.yesButton)}
                                    </YesButton>
                                  </Grid.Unit>
                                  <Grid.Unit
                                    size={{
                                      mobile: 1 / 2,
                                      tablet: 1 / 2,
                                      desktop: 4 / 12
                                    }}
                                    className="mx-auto"
                                  >
                                    <NoButton
                                      backgroundColor={
                                        hasSwingOutDoor === false
                                          ? colors.primary
                                          : colors.gray500
                                      }
                                      textColor={
                                        hasSwingOutDoor === false
                                          ? colors.textColor
                                          : colors.white
                                      }
                                      disabled={sendingRequest}
                                      onClick={() =>
                                        this.changeBathroomScore(
                                          'hasSwingOutDoor',
                                          false
                                        )
                                      }
                                    >
                                      {formatMessage(messages.noButton)}
                                    </NoButton>
                                  </Grid.Unit>
                                </Grid>
                              </ScoreWrapper>
                            </Slide>
                            <Slide index={13} data-label="large stalls">
                              <SubTitle>
                                {formatMessage(messages.createReviewSubheader)}
                              </SubTitle>
                              <ScoreWrapper>
                                <ScoreBox textColor={colors.black}>
                                  <Icon
                                    glyph="stallLarge"
                                    size={6}
                                    className="text-black"
                                    aria-hidden="true"
                                    alt=" "
                                    color={colors.black}
                                  />
                                </ScoreBox>
                                <ScoreDescription>
                                  <Caption>
                                    {formatMessage(messages.bathroomTitle)}{' '}
                                    {/*
  3/
                                {maxBathroomDetails}
                                */}
                                  </Caption>
                                  <Title>
                                    {formatMessage(messages.largeStallsTitle)}
                                  </Title>
                                  <Description>
                                    {formatMessage(
                                      messages.largeStallsDescription
                                    )}
                                  </Description>
                                </ScoreDescription>
                                <Grid className="is-full">
                                  <Grid.Unit
                                    size={{
                                      mobile: 1 / 2,
                                      tablet: 1 / 2,
                                      desktop: 4 / 12
                                    }}
                                    className="mx-auto"
                                  >
                                    <YesButton
                                      backgroundColor={
                                        hasLargeStall
                                          ? colors.primary
                                          : colors.gray500
                                      }
                                      textColor={
                                        hasLargeStall === true
                                          ? colors.textColor
                                          : colors.white
                                      }
                                      disabled={sendingRequest}
                                      onClick={() =>
                                        this.changeBathroomScore(
                                          'hasLargeStall',
                                          true
                                        )
                                      }
                                    >
                                      {formatMessage(messages.yesButton)}
                                    </YesButton>
                                  </Grid.Unit>
                                  <Grid.Unit
                                    size={{
                                      mobile: 1 / 2,
                                      tablet: 1 / 2,
                                      desktop: 4 / 12
                                    }}
                                    className="mx-auto"
                                  >
                                    <NoButton
                                      backgroundColor={
                                        hasLargeStall === false
                                          ? colors.primary
                                          : colors.gray500
                                      }
                                      textColor={
                                        hasLargeStall === false
                                          ? colors.textColor
                                          : colors.white
                                      }
                                      disabled={sendingRequest}
                                      onClick={() =>
                                        this.changeBathroomScore(
                                          'hasLargeStall',
                                          false
                                        )
                                      }
                                    >
                                      {formatMessage(messages.noButton)}
                                    </NoButton>
                                  </Grid.Unit>
                                </Grid>
                              </ScoreWrapper>
                            </Slide>
                            <Slide
                              index={14}
                              data-label="support around the toilet"
                            >
                              <SubTitle>
                                {formatMessage(messages.createReviewSubheader)}
                              </SubTitle>
                              <ScoreWrapper>
                                <ScoreBox textColor={colors.black}>
                                  <Icon
                                    glyph="toiletTwoBarSupport"
                                    size={6}
                                    className="text-black"
                                    aria-hidden="true"
                                    alt=" "
                                    color={colors.black}
                                  />
                                </ScoreBox>
                                <ScoreDescription>
                                  <Caption>
                                    {formatMessage(messages.bathroomTitle)}{' '}
                                    {/*
  4/
                                {maxBathroomDetails}
                                */}
                                  </Caption>
                                  <Title>
                                    {formatMessage(
                                      messages.twoBarAroundToiletTitle
                                    )}
                                  </Title>
                                  <Description>
                                    {formatMessage(
                                      messages.twoBarAroundToiletDescription
                                    )}
                                  </Description>
                                </ScoreDescription>
                                <Grid className="is-full">
                                  <Grid.Unit
                                    size={{
                                      mobile: 1 / 2,
                                      tablet: 1 / 2,
                                      desktop: 4 / 12
                                    }}
                                    className="mx-auto"
                                  >
                                    <YesButton
                                      backgroundColor={
                                        hasSupportAroundToilet
                                          ? colors.primary
                                          : colors.gray500
                                      }
                                      textColor={
                                        hasSupportAroundToilet === true
                                          ? colors.textColor
                                          : colors.white
                                      }
                                      disabled={sendingRequest}
                                      onClick={() =>
                                        this.changeBathroomScore(
                                          'hasSupportAroundToilet',
                                          true
                                        )
                                      }
                                    >
                                      {formatMessage(messages.yesButton)}
                                    </YesButton>
                                  </Grid.Unit>
                                  <Grid.Unit
                                    size={{
                                      mobile: 1 / 2,
                                      tablet: 1 / 2,
                                      desktop: 4 / 12
                                    }}
                                    className="mx-auto"
                                  >
                                    <NoButton
                                      backgroundColor={
                                        hasSupportAroundToilet === false
                                          ? colors.primary
                                          : colors.gray500
                                      }
                                      textColor={
                                        hasSupportAroundToilet === false
                                          ? colors.textColor
                                          : colors.white
                                      }
                                      disabled={sendingRequest}
                                      onClick={() =>
                                        this.changeBathroomScore(
                                          'hasSupportAroundToilet',
                                          false
                                        )
                                      }
                                    >
                                      {formatMessage(messages.noButton)}
                                    </NoButton>
                                  </Grid.Unit>
                                </Grid>
                              </ScoreWrapper>
                            </Slide>
                            <Slide index={15} data-label="lowered sinks">
                              <SubTitle>
                                {formatMessage(messages.createReviewSubheader)}
                              </SubTitle>
                              <ScoreWrapper>
                                <ScoreBox textColor={colors.black}>
                                  <Icon
                                    glyph="sinkLowered"
                                    size={6}
                                    className="text-black"
                                    aria-hidden="true"
                                    alt="lowered sinks"
                                    color={colors.black}
                                  />
                                </ScoreBox>
                                <ScoreDescription>
                                  <Caption>
                                    {formatMessage(messages.bathroomTitle)}
                                  </Caption>
                                  <Title>
                                    {formatMessage(messages.loweredSinksTitle)}
                                  </Title>
                                  <Description>
                                    {formatMessage(
                                      messages.loweredSinksDescription
                                    )}
                                  </Description>
                                </ScoreDescription>
                                <Grid className="is-full">
                                  <Grid.Unit
                                    size={{
                                      mobile: 1 / 2,
                                      tablet: 1 / 2,
                                      desktop: 4 / 12
                                    }}
                                    className="mx-auto"
                                  >
                                    <YesButton
                                      backgroundColor={
                                        hasLoweredSinks
                                          ? colors.primary
                                          : colors.gray500
                                      }
                                      textColor={
                                        hasLoweredSinks === true
                                          ? colors.textColor
                                          : colors.white
                                      }
                                      disabled={sendingRequest}
                                      onClick={() =>
                                        this.changeBathroomScore(
                                          'hasLoweredSinks',
                                          true
                                        )
                                      }
                                    >
                                      {formatMessage(messages.yesButton)}
                                    </YesButton>
                                  </Grid.Unit>
                                  <Grid.Unit
                                    size={{
                                      mobile: 1 / 2,
                                      tablet: 1 / 2,
                                      desktop: 4 / 12
                                    }}
                                    className="mx-auto"
                                  >
                                    <NoButton
                                      backgroundColor={
                                        hasLoweredSinks === false
                                          ? colors.primary
                                          : colors.gray500
                                      }
                                      textColor={
                                        hasLoweredSinks === false
                                          ? colors.textColor
                                          : colors.white
                                      }
                                      disabled={sendingRequest}
                                      onClick={() =>
                                        this.changeBathroomScore(
                                          'hasLoweredSinks',
                                          false
                                        )
                                      }
                                    >
                                      {formatMessage(messages.noButton)}
                                    </NoButton>
                                  </Grid.Unit>
                                </Grid>
                              </ScoreWrapper>
                            </Slide>
                            {/* More Interior Items */}
                            <Slide index={16} data-label="bright light">
                              <SubTitle>
                                {formatMessage(messages.createReviewSubheader)}
                              </SubTitle>
                              <ScoreWrapper>
                                <ScoreBox textColor={colors.black}>
                                  <Icon
                                    glyph="light"
                                    size={6}
                                    className="fill-current text-black"
                                    aria-hidden="true"
                                    alt=" "
                                    color={colors.black}
                                  />
                                </ScoreBox>
                                <ScoreDescription>
                                  <Caption>
                                    {formatMessage(messages.stepsTitle)}{' '}
                                    {/*
  3/
                                {maxInteriorDetails}
                                */}
                                  </Caption>
                                  <Title>
                                    {formatMessage(messages.brightLightTitle)}
                                  </Title>
                                  <Description>
                                    {formatMessage(
                                      messages.brightLightDescription
                                    )}
                                  </Description>
                                </ScoreDescription>
                                <Grid className="is-full">
                                  <Grid.Unit
                                    size={{
                                      mobile: 1 / 2,
                                      tablet: 1 / 2,
                                      desktop: 4 / 12
                                    }}
                                    className="mx-auto"
                                  >
                                    <YesButton
                                      backgroundColor={
                                        hasWellLit
                                          ? colors.primary
                                          : colors.gray500
                                      }
                                      textColor={
                                        hasWellLit === true
                                          ? colors.textColor
                                          : colors.white
                                      }
                                      disabled={sendingRequest}
                                      onClick={() =>
                                        this.changeInteriorScore(
                                          'hasWellLit',
                                          true
                                        )
                                      }
                                    >
                                      {formatMessage(messages.yesButton)}
                                    </YesButton>
                                  </Grid.Unit>
                                  <Grid.Unit
                                    size={{
                                      mobile: 1 / 2,
                                      tablet: 1 / 2,
                                      desktop: 4 / 12
                                    }}
                                    className="mx-auto"
                                  >
                                    <NoButton
                                      backgroundColor={
                                        hasWellLit === false
                                          ? colors.primary
                                          : colors.gray500
                                      }
                                      textColor={
                                        hasWellLit === false
                                          ? colors.textColor
                                          : colors.white
                                      }
                                      disabled={sendingRequest}
                                      onClick={() =>
                                        this.changeInteriorScore(
                                          'hasWellLit',
                                          false
                                        )
                                      }
                                    >
                                      {formatMessage(messages.noButton)}
                                    </NoButton>
                                  </Grid.Unit>
                                </Grid>
                              </ScoreWrapper>
                            </Slide>
                            <Slide index={17} data-label="high noise level">
                              <SubTitle>
                                {formatMessage(messages.createReviewSubheader)}
                              </SubTitle>
                              <ScoreWrapper>
                                <ScoreBox textColor={colors.black}>
                                  <Icon
                                    glyph="sound"
                                    size={6}
                                    className="fill-current text-black"
                                    aria-hidden="true"
                                    alt=" "
                                    color={colors.black}
                                  />
                                </ScoreBox>
                                <ScoreDescription>
                                  <Caption>
                                    {formatMessage(messages.stepsTitle)}{' '}
                                    {/* 
  4/
                                {maxInteriorDetails}
                              */}
                                  </Caption>
                                  <Title>
                                    {formatMessage(
                                      messages.highNoiseLevelTitle
                                    )}
                                  </Title>
                                  <Description>
                                    {formatMessage(
                                      messages.highNoiseLevelDescription
                                    )}
                                  </Description>
                                </ScoreDescription>
                                <Grid className="is-full">
                                  <Grid.Unit
                                    size={{
                                      mobile: 1 / 2,
                                      tablet: 1 / 2,
                                      desktop: 4 / 12
                                    }}
                                    className="mx-auto"
                                  >
                                    <YesButton
                                      backgroundColor={
                                        isQuiet === false
                                          ? colors.primary
                                          : colors.gray500
                                      }
                                      textColor={
                                        isQuiet === false
                                          ? colors.textColor
                                          : colors.white
                                      }
                                      disabled={sendingRequest}
                                      onClick={() =>
                                        this.changeInteriorScore(
                                          'isQuiet',
                                          false
                                        )
                                      }
                                    >
                                      {formatMessage(messages.yesButton)}
                                    </YesButton>
                                  </Grid.Unit>
                                  <Grid.Unit
                                    size={{
                                      mobile: 1 / 2,
                                      tablet: 1 / 2,
                                      desktop: 4 / 12
                                    }}
                                    className="mx-auto"
                                  >
                                    <NoButton
                                      backgroundColor={
                                        isQuiet === true
                                          ? colors.primary
                                          : colors.gray500
                                      }
                                      textColor={
                                        isQuiet === true
                                          ? colors.textColor
                                          : colors.white
                                      }
                                      disabled={sendingRequest}
                                      onClick={() =>
                                        this.changeInteriorScore(
                                          'isQuiet',
                                          true
                                        )
                                      }
                                    >
                                      {formatMessage(messages.noButton)}
                                    </NoButton>
                                  </Grid.Unit>
                                </Grid>
                              </ScoreWrapper>
                            </Slide>
                            <Slide index={18} data-label="service dog">
                              <SubTitle>
                                {formatMessage(messages.createReviewSubheader2)}
                              </SubTitle>
                              <ScoreWrapper>
                                <ScoreBox textColor={colors.black}>
                                  <Icon
                                    glyph="guideDog"
                                    size={6}
                                    className="fill-current text-black"
                                    aria-hidden="true"
                                    alt=" "
                                    color={colors.black}
                                  />
                                </ScoreBox>
                                <ScoreDescription>
                                  <Caption>
                                    {formatMessage(messages.stepsTitle)}{' '}
                                    {/* 
  5/
                                {maxInteriorDetails}
                                */}
                                  </Caption>
                                  <Title>
                                    {formatMessage(messages.guideDogTitle)}
                                  </Title>
                                  <Description>
                                    {formatMessage(
                                      messages.guideDogDescription
                                    )}
                                  </Description>
                                </ScoreDescription>
                                <Grid className="is-full">
                                  <Grid.Unit
                                    size={{
                                      mobile: 1 / 2,
                                      tablet: 1 / 2,
                                      desktop: 4 / 12
                                    }}
                                    className="mx-auto"
                                  >
                                    <YesButton
                                      backgroundColor={
                                        allowsGuideDog
                                          ? colors.primary
                                          : colors.gray500
                                      }
                                      textColor={
                                        allowsGuideDog === true
                                          ? colors.textColor
                                          : colors.white
                                      }
                                      disabled={sendingRequest}
                                      onClick={() =>
                                        this.changeInteriorScore(
                                          'allowsGuideDog',
                                          true
                                        )
                                      }
                                    >
                                      {formatMessage(messages.yesButton)}
                                    </YesButton>
                                  </Grid.Unit>
                                  <Grid.Unit
                                    size={{
                                      mobile: 1 / 2,
                                      tablet: 1 / 2,
                                      desktop: 4 / 12
                                    }}
                                    className="mx-auto"
                                  >
                                    <NoButton
                                      backgroundColor={
                                        allowsGuideDog === false
                                          ? colors.primary
                                          : colors.gray500
                                      }
                                      textColor={
                                        allowsGuideDog === false
                                          ? colors.textColor
                                          : colors.white
                                      }
                                      disabled={sendingRequest}
                                      onClick={() =>
                                        this.changeInteriorScore(
                                          'allowsGuideDog',
                                          false
                                        )
                                      }
                                    >
                                      {formatMessage(messages.noButton)}
                                    </NoButton>
                                  </Grid.Unit>
                                </Grid>
                              </ScoreWrapper>
                            </Slide>
                            <Slide index={19} data-label="last screen">
                              <ScoreDescription>
                                <FormInputWrapper>
                                  <FormInput
                                    id="comments"
                                    type="textarea"
                                    className="mx-auto"
                                    label={formatMessage(messages.comments)}
                                    placeholder={formatMessage(
                                      messages.commentsPlaceholder
                                    )}
                                    value={comments}
                                    handler={this.changeComments}
                                    error={{
                                      message: errors.comments,
                                      options: [
                                        'Should be less than 301 characters'
                                      ],
                                      values: [
                                        formatMessage(messages.commentsError)
                                      ]
                                    }}
                                    onInputFocus={() => clearError('comments')}
                                  />
                                </FormInputWrapper>
                                <Description>
                                  {formatMessage(messages.endReviewMessage)}
                                </Description>
                              </ScoreDescription>
                            </Slide>
                          </Slider>
                          <ButtonBack className="btn-fixed-bottom btn-back">
                            <span className="_hide-visual">Back</span>
                            <i>
                              <Icon glyph="chevronLeft" size={1} />
                            </i>
                          </ButtonBack>
                          <ButtonNext className="btn-fixed-bottom btn-next">
                            <span className="_hide-visual">Next</span>
                            <i>
                              <Icon glyph="chevronRight" size={1} />
                            </i>
                          </ButtonNext>
                        </CarouselProvider>

                        <ReviewButtons
                          sendingRequest={sendingRequest}
                          createReview={() => createReview(this.state)}
                        />
                      </div>
                    )}
                  </Grid.Unit>
                </Grid>
              </Content>
            </Grid.Unit>
          </Grid>
        </Grid.Unit>
        <Grid.Unit size={{ tablet: 1 / 2, desktop: 1 / 2 }}>
          <DetailsMap
            reviewsRatioWeight={reviewsRatioWeight}
            generalType={generalType}
            location={venue.location}
          />
        </Grid.Unit>
      </Grid>
    )
  }
}

// Review.propTypes = propTypes
// Review.contextTypes = contextTypes

// export default Review
