/* eslint-disable no-param-reassign */
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
import LinkButton from '../LinkButton'

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
    has3Steps: null,
    hasWideEntrance: null,
    hasAccessibleTableHeight: null,
    hasAccessibleElevator: null,
    hasInteriorRamp: null,
    hasSwingOutDoor: null,
    hasLargeStall: null,
    hasSupportAroundToilet: null,
    hasLoweredSinks: null,
    totalCarouselItems: 21,
    maxEntryDetails: 9,
    maxBathroomDetails: 5,
    maxInteriorDetails: 7,
    hideMapathon: false
  }

  // Dev Note: Comment this out when working locally
  componentWillMount() {
    this.setState({
      activeEvents: [
        ...this.state.activeEvents,
        ...[
          ...this.props.userData.events,
          ...this.props.userData.managedEvents
        ].reduce((filtered, e) => {
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
        }, [])
      ],
      teams: [
        ...this.state.teams,
        ...[
          ...this.props.userData.teams,
          ...this.props.userData.managedTeams
        ].map(t => ({ value: t.id, label: t.name }))
      ]
    })
  }
  // End Dev Note

  hideMapathonIntro = event => {
    this.setState({ hideMapathon: true })
  }

  updateTotalSlides = (param, value) => {
    const maxSlidesNumber = 21
    let updateTotalSlides = 21

    // Entrance
    if (param === 'hasPermanentRamp' && value === true) {
      updateTotalSlides -= 5
      this.setState({ totalCarouselItems: updateTotalSlides })
    } else if (param === 'hasPermanentRamp') {
      this.setState({ totalCarouselItems: 21 })
    }

    if (param === 'hasPortableRamp' && value === true) {
      updateTotalSlides -= 4
      this.setState({ totalCarouselItems: updateTotalSlides })
    } else if (param === 'hasPortableRamp') {
      this.setState({ totalCarouselItems: 21 })
    }

    if (param === 'has0Steps' && value === true) {
      updateTotalSlides -= 3
      this.setState({ totalCarouselItems: updateTotalSlides })
    } else if (param === 'has0Steps') {
      this.setState({ totalCarouselItems: 21 })
    }

    // check this one
    if (param === 'has1Step' && value === true) {
      updateTotalSlides -= 2
      this.setState({ totalCarouselItems: updateTotalSlides })
    } else if (param === 'has1Step') {
      this.setState({ totalCarouselItems: 21 })
    }

    if (param === 'has2Steps' && value === true) {
      updateTotalSlides -= 1
      this.setState({ totalCarouselItems: updateTotalSlides })
    } else if (param === 'has2Steps') {
      this.setState({ totalCarouselItems: 21 })
    }
  }

  changeEntryScore = (entryParam, value) => {
    let tempEntryScore = this.state.entryScore || 0

    if (entryParam === 'hasPermanentRamp' && value === true) {
      tempEntryScore += 4
      this.setState({ skipUntilReservedParking: true })
      this.setState({ hasPermanentRamp: value })
      this.updateTotalSlides(entryParam, value)
    } else if (entryParam === 'hasPermanentRamp') {
      this.setState({ hasPermanentRamp: value })
      this.updateTotalSlides(entryParam, value)
    }

    if (entryParam === 'hasPortableRamp' && value === true) {
      tempEntryScore += 1
      this.setState({ skipUntilReservedParking: true })
      this.setState({ hasPortableRamp: value })
      this.updateTotalSlides(entryParam, value)
    } else if (entryParam === 'hasPortableRamp') {
      this.setState({ hasPortableRamp: value })
      this.updateTotalSlides(entryParam, value)
    }

    if (entryParam === 'has0Steps' && value === true) {
      tempEntryScore += 1
      this.setState({ skipUntilReservedParking: true })
      this.setState({ has0Steps: value })
      this.setState({ steps: 0 })
      this.updateTotalSlides(entryParam, value)
    } else if (entryParam === 'has0Steps') {
      this.setState({ has0Steps: value })
      this.updateTotalSlides(entryParam, value)
    }

    if (entryParam === 'has1Step' && value === true) {
      tempEntryScore += 1
      this.setState({ skipUntilReservedParking: true })
      this.setState({ has1Step: value })
      this.setState({ steps: 1 })
      this.updateTotalSlides(entryParam, value)
    } else if (entryParam === 'has1Step') {
      this.setState({ has1Step: value })
      this.updateTotalSlides(entryParam, value)
    }
    if (entryParam === 'has2Steps' && value === true) {
      tempEntryScore += 1
      this.setState({ skipUntilReservedParking: true })
      this.setState({ has2Steps: value })
      this.setState({ steps: 2 })
      this.updateTotalSlides(entryParam, value)
    } else if (entryParam === 'has2Steps') {
      this.setState({ has2Steps: value })
      this.updateTotalSlides(entryParam, value)
    }
    if (entryParam === 'has3Steps' && value === true) {
      tempEntryScore += 1
      this.setState({ skipUntilReservedParking: true })
      this.setState({ has3Steps: value })
      this.setState({ steps: 3 })
    } else if (entryParam === 'has3Steps') {
      this.setState({ has3Steps: value })
    }

    if (entryParam === 'hasParking' && value === true) {
      tempEntryScore += 2
      this.setState({ hasParking: value })
    } else if (entryParam === 'hasParking') {
      this.setState({ hasParking: value })
    }

    if (entryParam === 'hasSecondEntry' && value === true) {
      tempEntryScore += 1
      this.setState({ hasSecondEntry: value })
    } else if (entryParam === 'hasSecondEntry') {
      this.setState({ hasSecondEntry: value })
    }
    if (entryParam === 'hasWideEntrance' && value === true) {
      tempEntryScore += 1
      this.setState({ hasWideEntrance: value })
    } else if (entryParam === 'hasWideEntrance') {
      this.setState({ hasWideEntrance: value })
    }

    if (tempEntryScore !== this.state.entryScore) {
      this.setState({ entryScore: tempEntryScore })

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
    let tempInteriorScore = this.state.interiorScore || 0

    if (interiorParam === 'isSpacious' && value === true) {
      tempInteriorScore += 1
      this.setState({ isSpacious: value })
    } else if (interiorParam === 'isSpacious') {
      this.setState({ isSpacious: value })
    }

    if (interiorParam === 'allowsGuideDog' && value === true) {
      tempInteriorScore += 1
      this.setState({ allowsGuideDog: value })
    } else if (interiorParam === 'allowsGuideDog') {
      this.setState({ allowsGuideDog: value })
    }

    if (interiorParam === 'hasWellLit' && value === true) {
      tempInteriorScore += 1
      this.setState({ hasWellLit: value })
    } else if (interiorParam === 'hasWellLit') {
      this.setState({ hasWellLit: value })
    }

    if (interiorParam === 'isQuiet' && value === true) {
      tempInteriorScore += 1
      this.setState({ isQuiet: value })
    } else if (interiorParam === 'isQuiet') {
      this.setState({ isQuiet: value })
    }

    if (interiorParam === 'hasAccessibleTableHeight' && value === true) {
      tempInteriorScore += 1
      this.setState({ hasAccessibleTableHeight: value })
    } else if (interiorParam === 'hasAccessibleTableHeight') {
      this.setState({ hasAccessibleTableHeight: value })
    }

    if (interiorParam === 'hasAccessibleElevator' && value === true) {
      tempInteriorScore += 1
      this.setState({ hasAccessibleElevator: value })
    } else if (interiorParam === 'hasAccessibleElevator') {
      this.setState({ hasAccessibleElevator: value })
    }

    if (interiorParam === 'hasInteriorRamp' && value === true) {
      tempInteriorScore += 1
      this.setState({ hasInteriorRamp: value })
    } else if (interiorParam === 'hasInteriorRamp') {
      this.setState({ hasInteriorRamp: value })
    }

    if (tempInteriorScore !== this.state.interiorScore) {
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
    let tempBathroomScore = this.state.bathroomScore || 0

    if (bathroomParam === 'hasSwingOutDoor' && value === true) {
      tempBathroomScore += 1
      this.setState({ hasSwingOutDoor: value })
    } else if (bathroomParam === 'hasSwingOutDoor') {
      this.setState({ hasSwingOutDoor: value })
    }

    if (bathroomParam === 'hasLargeStall' && value === true) {
      tempBathroomScore += 1
      this.setState({ hasLargeStall: value })
    } else if (bathroomParam === 'hasLargeStall') {
      this.setState({ hasLargeStall: value })
    }

    if (bathroomParam === 'hasSupportAroundToilet' && value === true) {
      tempBathroomScore += 1
      this.setState({ hasSupportAroundToilet: value })
    } else if (bathroomParam === 'hasSupportAroundToilet') {
      this.setState({ hasSupportAroundToilet: value })
    }

    if (bathroomParam === 'hasLoweredSinks' && value === true) {
      tempBathroomScore += 1
      this.setState({ hasLoweredSinks: value })
    } else if (bathroomParam === 'hasLoweredSinks') {
      this.setState({ hasLoweredSinks: value })
    }

    if (tempBathroomScore !== this.state.bathroomScore) {
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

  changeReview = (review, value) => {
    let reviewColor
    if (value) reviewColor = colors.ratingAccessible
    else if (value === false) reviewColor = colors.ratingCaution
    else reviewColor = colors.grey

    this.setState({
      [review]: value,
      [`${review}Color`]: reviewColor
    })
  }

  handleActiveEvents = event => {
    this.setState({ selectedEvent: event.target.value })
  }

  handleTeams = event => {
    this.setState({ selectedTeam: event.target.value })
  }

  render() {
    const { formatMessage } = this.context.intl

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
                <LinkButton
                  to={`/venues/${this.props.venue.placeId}`}
                  disabled={false}
                  float="true"
                  className="shadow-none"
                  backgroundColor={colors.textColor}
                  color={colors.white}
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
                    disabled={this.props.sendingRequest}
                    onClickHandler={this.props.hide}
                    color={colors.white}
                  />
                </LinkButton>
                <Name>{this.props.venue.name}</Name>
                <OverlayButton>
                  <Button
                    disabled={false}
                    onClick={this.props.onClickHandler}
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
                    {(this.state.activeEvents.length > 1 ||
                      this.state.teams.length > 1) &&
                    this.state.hideMapathon === false ? (
                      <PreSlider>
                        <PreSliderTitle className="alt">
                          {formatMessage(messages.connectMapathon)}
                        </PreSliderTitle>
                        <PreSliderContent>
                          {this.state.activeEvents.length > 1
                            ? [
                              <div style={{ paddingBottom: '20px' }}>
                                <Label
                                  key="label"
                                  style={{
                                      marginTop: '1.5rem',
                                      maxWidth: '30rem'
                                    }}
                                >
                                  {formatMessage(
                                      messages.selectedMapathonLabel
                                    )}
                                </Label>
                                <SelectBox
                                  key="selectBox"
                                  value={this.state.selectedEvent}
                                  options={this.state.activeEvents}
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

                          {this.state.teams.length > 1
                            ? [
                              <div style={{ paddingBottom: '20px' }}>
                                <Label
                                  key="label"
                                  style={{
                                      marginTop: '1.5rem',
                                      maxWidth: '30rem'
                                    }}
                                >
                                  {formatMessage(messages.selectedTeamLabel)}
                                </Label>
                                <SelectBox
                                  key="selectBox"
                                  value={this.state.selectedTeam}
                                  options={this.state.teams}
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
                          totalSlides={this.state.totalCarouselItems}
                          visibleSlides={1}
                          data-carousel="addReview"
                          className="carousel--lg"
                          dragEnabled={false}
                        >
                          <Slider>
                            <Slide index={0} data-label="permanent ramp">
                              <SubTitle>
                                {formatMessage(messages.createReviewSubheader)}
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
                                    {formatMessage(messages.entryTitle)}
                                    {' '}
                                    {/*
  1/9 */}
                                  </Caption>
                                  <Title>
                                    {formatMessage(messages.permanentRampTitle)}
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
                                        this.state.hasPermanentRamp === true
                                          ? colors.primary
                                          : colors.gray500
                                      }
                                      textColor={
                                        this.state.hasPermanentRamp === true
                                          ? colors.textColor
                                          : colors.white
                                      }
                                      disabled={this.props.sendingRequest}
                                      onClick={() =>
                                        this.changeEntryScore(
                                          'hasPermanentRamp',
                                          true
                                        )}
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
                                        this.state.hasPermanentRamp === false
                                          ? colors.primary
                                          : colors.gray500
                                      }
                                      textColor={
                                        this.state.hasPermanentRamp === false
                                          ? colors.textColor
                                          : colors.white
                                      }
                                      disabled={this.props.sendingRequest}
                                      onClick={() =>
                                        this.changeEntryScore(
                                          'hasPermanentRamp',
                                          false
                                        )}
                                    >
                                      {formatMessage(messages.noButton)}
                                    </NoButton>
                                  </Grid.Unit>
                                </Grid>
                              </ScoreWrapper>
                            </Slide>
                            {this.state.hasPermanentRamp !== true ? (
                              <div>
                                <Slide index={1} data-label="portable ramp">
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
                                        )}
                                        {' '}
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
                                            this.state.hasPortableRamp === true
                                              ? colors.primary
                                              : colors.gray500
                                          }
                                          textColor={
                                            this.state.hasPortableRamp === true
                                              ? colors.textColor
                                              : colors.white
                                          }
                                          disabled={this.props.sendingRequest}
                                          onClick={() =>
                                            this.changeEntryScore(
                                              'hasPortableRamp',
                                              true
                                            )}
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
                                            this.state.hasPortableRamp === false
                                              ? colors.primary
                                              : colors.gray500
                                          }
                                          textColor={
                                            this.state.hasPortableRamp === false
                                              ? colors.textColor
                                              : colors.white
                                          }
                                          disabled={this.props.sendingRequest}
                                          onClick={() =>
                                            this.changeEntryScore(
                                              'hasPortableRamp',
                                              false
                                            )}
                                        >
                                          {formatMessage(messages.noButton)}
                                        </NoButton>
                                      </Grid.Unit>
                                    </Grid>
                                  </ScoreWrapper>
                                </Slide>

                                {this.state.hasPortableRamp !== true ? (
                                  <div>
                                    <Slide index={2} data-label="no steps">
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
                                            alt="steps"
                                            color={colors.black}
                                          />
                                          <StepButton
                                            disabled={this.props.sendingRequest}
                                          >
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
                                            {formatMessage(
                                              messages.entryTitle
                                            )}
                                            {' '}
                                            {/* 
      3/
                                    {maxEntryDetails}
                                    */}
                                          </Caption>
                                          <Title>
                                            {formatMessage(
                                              messages.noStepsTitle
                                            )}
                                          </Title>
                                          <Description>
                                            {formatMessage(
                                              messages.noStepsDescription
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
                                                this.state.has0Steps
                                                  ? colors.primary
                                                  : colors.gray500
                                              }
                                              textColor={
                                                this.state.has0Steps === true
                                                  ? colors.textColor
                                                  : colors.white
                                              }
                                              disabled={
                                                this.props.sendingRequest
                                              }
                                              onClick={() =>
                                                this.changeEntryScore(
                                                  'has0Steps',
                                                  true
                                                )}
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
                                                this.state.has0Steps === false
                                                  ? colors.primary
                                                  : colors.gray500
                                              }
                                              textColor={
                                                this.state.has0Steps === false
                                                  ? colors.textColor
                                                  : colors.white
                                              }
                                              disabled={
                                                this.props.sendingRequest
                                              }
                                              onClick={() =>
                                                this.changeEntryScore(
                                                  'has0Steps',
                                                  false
                                                )}
                                            >
                                              {formatMessage(messages.noButton)}
                                            </NoButton>
                                          </Grid.Unit>
                                        </Grid>
                                      </ScoreWrapper>
                                    </Slide>
                                    {this.state.has0Steps !== true ? (
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
                                                disabled={
                                                  this.props.sendingRequest
                                                }
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
                                                )}
                                                {' '}
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
                                                    this.state.has1Step
                                                      ? colors.primary
                                                      : colors.gray500
                                                  }
                                                  textColor={
                                                    this.state.has1Step === true
                                                      ? colors.textColor
                                                      : colors.white
                                                  }
                                                  disabled={
                                                    this.props.sendingRequest
                                                  }
                                                  onClick={() =>
                                                    this.changeEntryScore(
                                                      'has1Step',
                                                      true
                                                    )}
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
                                                    this.state.has1Step ===
                                                    false
                                                      ? colors.primary
                                                      : colors.gray500
                                                  }
                                                  textColor={
                                                    this.state.has1Step ===
                                                    false
                                                      ? colors.textColor
                                                      : colors.white
                                                  }
                                                  disabled={
                                                    this.props.sendingRequest
                                                  }
                                                  onClick={() =>
                                                    this.changeEntryScore(
                                                      'has1Step',
                                                      false
                                                    )}
                                                >
                                                  {formatMessage(
                                                    messages.noButton
                                                  )}
                                                </NoButton>
                                              </Grid.Unit>
                                            </Grid>
                                          </ScoreWrapper>
                                        </Slide>
                                        {this.state.has1Step !== true ? (
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
                                                    disabled={
                                                      this.props.sendingRequest
                                                    }
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
                                                    )}
                                                    {' '}
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
                                                        this.state.has2Steps
                                                          ? colors.primary
                                                          : colors.gray500
                                                      }
                                                      textColor={
                                                        this.state.has2Steps ===
                                                        true
                                                          ? colors.textColor
                                                          : colors.white
                                                      }
                                                      disabled={
                                                        this.props
                                                          .sendingRequest
                                                      }
                                                      onClick={() =>
                                                        this.changeEntryScore(
                                                          'has2Steps',
                                                          true
                                                        )}
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
                                                        this.state.has2Steps ===
                                                        false
                                                          ? colors.primary
                                                          : colors.gray500
                                                      }
                                                      textColor={
                                                        this.state.has2Steps ===
                                                        false
                                                          ? colors.textColor
                                                          : colors.white
                                                      }
                                                      disabled={
                                                        this.props
                                                          .sendingRequest
                                                      }
                                                      onClick={() =>
                                                        this.changeEntryScore(
                                                          'has2Steps',
                                                          false
                                                        )}
                                                    >
                                                      {formatMessage(
                                                        messages.noButton
                                                      )}
                                                    </NoButton>
                                                  </Grid.Unit>
                                                </Grid>
                                              </ScoreWrapper>
                                            </Slide>
                                            {this.state.has2Steps !== true ? (
                                              <Slide
                                                index={5}
                                                data-label="+3 steps"
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
                                                      disabled={
                                                        this.props
                                                          .sendingRequest
                                                      }
                                                    >
                                                      <Icon
                                                        glyph="moreThanTwo"
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
                                                      )}
                                                      {' '}
                                                      {/*
            6/
                                          {maxEntryDetails}
                                          */}
                                                    </Caption>
                                                    <Title>
                                                      {formatMessage(
                                                        messages.threeStepsTitle
                                                      )}
                                                    </Title>
                                                    <Description>
                                                      {formatMessage(
                                                        messages.threeStepsDescription
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
                                                          this.state.has3Steps
                                                            ? colors.primary
                                                            : colors.gray500
                                                        }
                                                        textColor={
                                                          this.state
                                                            .has3Steps === true
                                                            ? colors.textColor
                                                            : colors.white
                                                        }
                                                        disabled={
                                                          this.props
                                                            .sendingRequest
                                                        }
                                                        onClick={() =>
                                                          this.changeEntryScore(
                                                            'has3Steps',
                                                            true
                                                          )}
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
                                                          this.state
                                                            .has3Steps === false
                                                            ? colors.primary
                                                            : colors.gray500
                                                        }
                                                        textColor={
                                                          this.state
                                                            .has3Steps === false
                                                            ? colors.textColor
                                                            : colors.white
                                                        }
                                                        disabled={
                                                          this.props
                                                            .sendingRequest
                                                        }
                                                        onClick={() =>
                                                          this.changeEntryScore(
                                                            'has3Steps',
                                                            false
                                                          )}
                                                      >
                                                        {formatMessage(
                                                          messages.noButton
                                                        )}
                                                      </NoButton>
                                                    </Grid.Unit>
                                                  </Grid>
                                                </ScoreWrapper>
                                              </Slide>
                                            ) : null}
                                          </div>
                                        ) : null}
                                      </div>
                                    ) : null}
                                  </div>
                                ) : null}
                              </div>
                            ) : null}
                            <Slide index={6} data-label="reserved parking">
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
                                    {formatMessage(messages.entryTitle)}
                                    {' '}
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
                                        this.state.hasParking
                                          ? colors.primary
                                          : colors.gray500
                                      }
                                      textColor={
                                        this.state.hasParking === true
                                          ? colors.textColor
                                          : colors.white
                                      }
                                      disabled={this.props.sendingRequest}
                                      onClick={() =>
                                        this.changeEntryScore(
                                          'hasParking',
                                          true
                                        )}
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
                                        this.state.hasParking === false
                                          ? colors.primary
                                          : colors.gray500
                                      }
                                      textColor={
                                        this.state.hasParking === false
                                          ? colors.textColor
                                          : colors.white
                                      }
                                      disabled={this.props.sendingRequest}
                                      onClick={() =>
                                        this.changeEntryScore(
                                          'hasParking',
                                          false
                                        )}
                                    >
                                      {formatMessage(messages.noButton)}
                                    </NoButton>
                                  </Grid.Unit>
                                </Grid>
                              </ScoreWrapper>
                            </Slide>
                            <Slide index={7} data-label="second entry">
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
                                    {formatMessage(messages.entryTitle)}
                                    {' '}
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
                                        this.state.hasSecondEntry
                                          ? colors.primary
                                          : colors.gray500
                                      }
                                      textColor={
                                        this.state.hasSecondEntry === true
                                          ? colors.textColor
                                          : colors.white
                                      }
                                      disabled={this.props.sendingRequest}
                                      onClick={() =>
                                        this.changeEntryScore(
                                          'hasSecondEntry',
                                          true
                                        )}
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
                                        this.state.hasSecondEntry === false
                                          ? colors.primary
                                          : colors.gray500
                                      }
                                      textColor={
                                        this.state.hasSecondEntry === false
                                          ? colors.textColor
                                          : colors.white
                                      }
                                      disabled={this.props.sendingRequest}
                                      onClick={() =>
                                        this.changeEntryScore(
                                          'hasSecondEntry',
                                          false
                                        )}
                                    >
                                      {formatMessage(messages.noButton)}
                                    </NoButton>
                                  </Grid.Unit>
                                </Grid>
                              </ScoreWrapper>
                            </Slide>
                            <Slide index={8} data-label="wide entrance">
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
                                    {formatMessage(messages.entryTitle)}
                                    {' '}
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
                                        this.state.hasWideEntrance
                                          ? colors.primary
                                          : colors.gray500
                                      }
                                      textColor={
                                        this.state.hasWideEntrance === true
                                          ? colors.textColor
                                          : colors.white
                                      }
                                      disabled={this.props.sendingRequest}
                                      onClick={() =>
                                        this.changeEntryScore(
                                          'hasWideEntrance',
                                          true
                                        )}
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
                                        this.state.hasWideEntrance === false
                                          ? colors.primary
                                          : colors.gray500
                                      }
                                      textColor={
                                        this.state.hasWideEntrance === false
                                          ? colors.textColor
                                          : colors.white
                                      }
                                      disabled={this.props.sendingRequest}
                                      onClick={() =>
                                        this.changeEntryScore(
                                          'hasWideEntrance',
                                          false
                                        )}
                                    >
                                      {formatMessage(messages.noButton)}
                                    </NoButton>
                                  </Grid.Unit>
                                </Grid>
                              </ScoreWrapper>
                            </Slide>
                            {/* Interior */}
                            <Slide index={9} data-label="room to move">
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
                                    {formatMessage(messages.stepsTitle)}
                                    {' '}
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
                                        this.state.isSpacious
                                          ? colors.primary
                                          : colors.gray500
                                      }
                                      textColor={
                                        this.state.isSpacious === true
                                          ? colors.textColor
                                          : colors.white
                                      }
                                      disabled={this.props.sendingRequest}
                                      onClick={() =>
                                        this.changeInteriorScore(
                                          'isSpacious',
                                          true
                                        )}
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
                                        this.state.isSpacious === false
                                          ? colors.primary
                                          : colors.gray500
                                      }
                                      textColor={
                                        this.state.isSpacious === false
                                          ? colors.textColor
                                          : colors.white
                                      }
                                      disabled={this.props.sendingRequest}
                                      onClick={() =>
                                        this.changeInteriorScore(
                                          'isSpacious',
                                          false
                                        )}
                                    >
                                      {formatMessage(messages.noButton)}
                                    </NoButton>
                                  </Grid.Unit>
                                </Grid>
                              </ScoreWrapper>
                            </Slide>
                            <Slide index={10} data-label="interior ramp">
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
                                    {formatMessage(messages.stepsTitle)}
                                    {' '}
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
                                        this.state.hasInteriorRamp
                                          ? colors.primary
                                          : colors.gray500
                                      }
                                      textColor={
                                        this.state.hasInteriorRamp === true
                                          ? colors.textColor
                                          : colors.white
                                      }
                                      disabled={this.props.sendingRequest}
                                      onClick={() =>
                                        this.changeInteriorScore(
                                          'hasInteriorRamp',
                                          true
                                        )}
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
                                        this.state.hasInteriorRamp === false
                                          ? colors.primary
                                          : colors.gray500
                                      }
                                      textColor={
                                        this.state.hasInteriorRamp === false
                                          ? colors.textColor
                                          : colors.white
                                      }
                                      disabled={this.props.sendingRequest}
                                      onClick={() =>
                                        this.changeInteriorScore(
                                          'hasInteriorRamp',
                                          false
                                        )}
                                    >
                                      {formatMessage(messages.noButton)}
                                    </NoButton>
                                  </Grid.Unit>
                                </Grid>
                              </ScoreWrapper>
                            </Slide>
                            <Slide index={11} data-label="accessible elevator">
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
                                    {formatMessage(messages.stepsTitle)}
                                    {' '}
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
                                        this.state.hasAccessibleElevator
                                          ? colors.primary
                                          : colors.gray500
                                      }
                                      textColor={
                                        this.state.hasAccessibleElevator ===
                                        true
                                          ? colors.textColor
                                          : colors.white
                                      }
                                      disabled={this.props.sendingRequest}
                                      onClick={() =>
                                        this.changeInteriorScore(
                                          'hasAccessibleElevator',
                                          true
                                        )}
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
                                        this.state.hasAccessibleElevator ===
                                        false
                                          ? colors.primary
                                          : colors.gray500
                                      }
                                      textColor={
                                        this.state.hasAccessibleElevator ===
                                        false
                                          ? colors.textColor
                                          : colors.white
                                      }
                                      disabled={this.props.sendingRequest}
                                      onClick={() =>
                                        this.changeInteriorScore(
                                          'hasAccessibleElevator',
                                          false
                                        )}
                                    >
                                      {formatMessage(messages.noButton)}
                                    </NoButton>
                                  </Grid.Unit>
                                </Grid>
                              </ScoreWrapper>
                            </Slide>
                            <Slide
                              index={12}
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
                                    {formatMessage(messages.stepsTitle)}
                                    {' '}
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
                                        this.state.hasAccessibleTableHeight
                                          ? colors.primary
                                          : colors.gray500
                                      }
                                      textColor={
                                        this.state.hasAccessibleTableHeight ===
                                        true
                                          ? colors.textColor
                                          : colors.white
                                      }
                                      disabled={this.props.sendingRequest}
                                      onClick={() =>
                                        this.changeInteriorScore(
                                          'hasAccessibleTableHeight',
                                          true
                                        )}
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
                                        this.state.hasAccessibleTableHeight ===
                                        false
                                          ? colors.primary
                                          : colors.gray500
                                      }
                                      textColor={
                                        this.state.hasAccessibleTableHeight ===
                                        false
                                          ? colors.textColor
                                          : colors.white
                                      }
                                      disabled={this.props.sendingRequest}
                                      onClick={() =>
                                        this.changeInteriorScore(
                                          'hasAccessibleTableHeight',
                                          false
                                        )}
                                    >
                                      {formatMessage(messages.noButton)}
                                    </NoButton>
                                  </Grid.Unit>
                                </Grid>
                              </ScoreWrapper>
                            </Slide>
                            {/* Restroom */}

                            <Slide index={13} data-label="door swings out">
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
                                    {formatMessage(messages.bathroomTitle)}
                                    {' '}
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
                                        this.state.hasSwingOutDoor
                                          ? colors.primary
                                          : colors.gray500
                                      }
                                      textColor={
                                        this.state.hasSwingOutDoor === true
                                          ? colors.textColor
                                          : colors.white
                                      }
                                      disabled={this.props.sendingRequest}
                                      onClick={() =>
                                        this.changeBathroomScore(
                                          'hasSwingOutDoor',
                                          true
                                        )}
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
                                        this.state.hasSwingOutDoor === false
                                          ? colors.primary
                                          : colors.gray500
                                      }
                                      textColor={
                                        this.state.hasSwingOutDoor === false
                                          ? colors.textColor
                                          : colors.white
                                      }
                                      disabled={this.props.sendingRequest}
                                      onClick={() =>
                                        this.changeBathroomScore(
                                          'hasSwingOutDoor',
                                          false
                                        )}
                                    >
                                      {formatMessage(messages.noButton)}
                                    </NoButton>
                                  </Grid.Unit>
                                </Grid>
                              </ScoreWrapper>
                            </Slide>

                            <Slide index={14} data-label="large stalls">
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
                                    {formatMessage(messages.bathroomTitle)}
                                    {' '}
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
                                        this.state.hasLargeStall
                                          ? colors.primary
                                          : colors.gray500
                                      }
                                      textColor={
                                        this.state.hasLargeStall === true
                                          ? colors.textColor
                                          : colors.white
                                      }
                                      disabled={this.props.sendingRequest}
                                      onClick={() =>
                                        this.changeBathroomScore(
                                          'hasLargeStall',
                                          true
                                        )}
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
                                        this.state.hasLargeStall === false
                                          ? colors.primary
                                          : colors.gray500
                                      }
                                      textColor={
                                        this.state.hasLargeStall === false
                                          ? colors.textColor
                                          : colors.white
                                      }
                                      disabled={this.props.sendingRequest}
                                      onClick={() =>
                                        this.changeBathroomScore(
                                          'hasLargeStall',
                                          false
                                        )}
                                    >
                                      {formatMessage(messages.noButton)}
                                    </NoButton>
                                  </Grid.Unit>
                                </Grid>
                              </ScoreWrapper>
                            </Slide>
                            <Slide
                              index={15}
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
                                    {formatMessage(messages.bathroomTitle)}
                                    {' '}
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
                                        this.state.hasSupportAroundToilet
                                          ? colors.primary
                                          : colors.gray500
                                      }
                                      textColor={
                                        this.state.hasSupportAroundToilet ===
                                        true
                                          ? colors.textColor
                                          : colors.white
                                      }
                                      disabled={this.props.sendingRequest}
                                      onClick={() =>
                                        this.changeBathroomScore(
                                          'hasSupportAroundToilet',
                                          true
                                        )}
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
                                        this.state.hasSupportAroundToilet ===
                                        false
                                          ? colors.primary
                                          : colors.gray500
                                      }
                                      textColor={
                                        this.state.hasSupportAroundToilet ===
                                        false
                                          ? colors.textColor
                                          : colors.white
                                      }
                                      disabled={this.props.sendingRequest}
                                      onClick={() =>
                                        this.changeBathroomScore(
                                          'hasSupportAroundToilet',
                                          false
                                        )}
                                    >
                                      {formatMessage(messages.noButton)}
                                    </NoButton>
                                  </Grid.Unit>
                                </Grid>
                              </ScoreWrapper>
                            </Slide>

                            <Slide index={16} data-label="lowered sinks">
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
                                        this.state.hasLoweredSinks
                                          ? colors.primary
                                          : colors.gray500
                                      }
                                      textColor={
                                        this.state.hasLoweredSinks === true
                                          ? colors.textColor
                                          : colors.white
                                      }
                                      disabled={this.props.sendingRequest}
                                      onClick={() =>
                                        this.changeBathroomScore(
                                          'hasLoweredSinks',
                                          true
                                        )}
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
                                        this.state.hasLoweredSinks === false
                                          ? colors.primary
                                          : colors.gray500
                                      }
                                      textColor={
                                        this.state.hasLoweredSinks === false
                                          ? colors.textColor
                                          : colors.white
                                      }
                                      disabled={this.props.sendingRequest}
                                      onClick={() =>
                                        this.changeBathroomScore(
                                          'hasLoweredSinks',
                                          false
                                        )}
                                    >
                                      {formatMessage(messages.noButton)}
                                    </NoButton>
                                  </Grid.Unit>
                                </Grid>
                              </ScoreWrapper>
                            </Slide>
                            {/* More Interior Items */}
                            <Slide index={17} data-label="bright light">
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
                                    {formatMessage(messages.stepsTitle)}
                                    {' '}
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
                                        this.state.hasWellLit
                                          ? colors.primary
                                          : colors.gray500
                                      }
                                      textColor={
                                        this.state.hasWellLit === true
                                          ? colors.textColor
                                          : colors.white
                                      }
                                      disabled={this.props.sendingRequest}
                                      onClick={() =>
                                        this.changeInteriorScore(
                                          'hasWellLit',
                                          true
                                        )}
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
                                        this.state.hasWellLit === false
                                          ? colors.primary
                                          : colors.gray500
                                      }
                                      textColor={
                                        this.state.hasWellLit === false
                                          ? colors.textColor
                                          : colors.white
                                      }
                                      disabled={this.props.sendingRequest}
                                      onClick={() =>
                                        this.changeInteriorScore(
                                          'hasWellLit',
                                          false
                                        )}
                                    >
                                      {formatMessage(messages.noButton)}
                                    </NoButton>
                                  </Grid.Unit>
                                </Grid>
                              </ScoreWrapper>
                            </Slide>
                            <Slide index={18} data-label="high noise level">
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
                                    {formatMessage(messages.stepsTitle)}
                                    {' '}
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
                                        this.state.isQuiet
                                          ? colors.primary
                                          : colors.gray500
                                      }
                                      textColor={
                                        this.state.isQuiet === true
                                          ? colors.textColor
                                          : colors.white
                                      }
                                      disabled={this.props.sendingRequest}
                                      onClick={() =>
                                        this.changeInteriorScore(
                                          'isQuiet',
                                          true
                                        )}
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
                                        this.state.isQuiet === false
                                          ? colors.primary
                                          : colors.gray500
                                      }
                                      textColor={
                                        this.state.isQuiet === false
                                          ? colors.textColor
                                          : colors.white
                                      }
                                      disabled={this.props.sendingRequest}
                                      onClick={() =>
                                        this.changeInteriorScore(
                                          'isQuiet',
                                          false
                                        )}
                                    >
                                      {formatMessage(messages.noButton)}
                                    </NoButton>
                                  </Grid.Unit>
                                </Grid>
                              </ScoreWrapper>
                            </Slide>
                            <Slide index={19} data-label="guide dog">
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
                                    {formatMessage(messages.stepsTitle)}
                                    {' '}
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
                                        this.state.allowsGuideDog
                                          ? colors.primary
                                          : colors.gray500
                                      }
                                      textColor={
                                        this.state.allowsGuideDog === true
                                          ? colors.textColor
                                          : colors.white
                                      }
                                      disabled={this.props.sendingRequest}
                                      onClick={() =>
                                        this.changeInteriorScore(
                                          'allowsGuideDog',
                                          true
                                        )}
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
                                        this.state.allowsGuideDog === false
                                          ? colors.primary
                                          : colors.gray500
                                      }
                                      textColor={
                                        this.state.allowsGuideDog === false
                                          ? colors.textColor
                                          : colors.white
                                      }
                                      disabled={this.props.sendingRequest}
                                      onClick={() =>
                                        this.changeInteriorScore(
                                          'allowsGuideDog',
                                          false
                                        )}
                                    >
                                      {formatMessage(messages.noButton)}
                                    </NoButton>
                                  </Grid.Unit>
                                </Grid>
                              </ScoreWrapper>
                            </Slide>
                            <Slide index={20} data-label="last screen">
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
                                    value={this.state.comments}
                                    handler={this.changeComments}
                                    error={{
                                      message: this.props.errors.comments,
                                      options: [
                                        'Should be less than 301 characters'
                                      ],
                                      values: [
                                        formatMessage(messages.commentsError)
                                      ]
                                    }}
                                    onInputFocus={() =>
                                      this.props.clearError('comments')}
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
                          sendingRequest={this.props.sendingRequest}
                          createReview={() =>
                            this.props.createReview(this.state)}
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
            reviewsRatioWeight={this.props.reviewsRatioWeight}
            generalType={this.props.generalType}
            location={this.props.venue.location}
          />
        </Grid.Unit>
      </Grid>
    )
  }
}
