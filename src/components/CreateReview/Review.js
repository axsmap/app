/* eslint-disable no-param-reassign */

import { rgba, transparentize } from 'polished'
import { bool, func, object, string } from 'prop-types'
import React from 'react'
import { intlShape } from 'react-intl'
import styled from 'styled-components'
import Grid from '@material-ui/core/Grid'
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext
} from 'pure-react-carousel'
import 'pure-react-carousel/dist/react-carousel.es.css'

import Button from '../Button'
import Cnt from '../Container'
import Icon from '../Icon'
import SelectBox from '../SelectBox'
import { colors, media, fontSize, fontWeight, fonts } from '../../styles'
import { getGeneralType, getReviewsRatioWeight } from '../../utilities'

import messages from './messages'
import ReviewButtons from './ReviewButtons'

const Container = styled(Cnt)`
  justify-content: flex-start;
  padding: 2rem 0 7rem 0;

  ${media.desktop`
    padding: 2rem 0;
  `};
`

const Wrapper = styled.div`
  display: flex;

  align-items: center;
  flex-direction: column;
  justify-content: flex-start;

  padding: 0 1rem;
  width: 100%;

  ${media.tablet`
    padding: 0;
  `};
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

const Title = styled.h1`
  margin: 0 0 1rem 0;
  width: 100%;
  color: ${colors.darkestGrey};
  text-align: center;
  text-transform: uppercase;
  font-family: ${fonts.primary};
  font-weight: ${fontWeight.semiBold} !important;
  font-size: ${fontSize.xxl} !important;
`
const ScoreDescription = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
  padding: 0 1rem;
  width: 100%;
  font-family: ${fonts.tertiary};
`

const Description = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
  padding: 0 1rem;
  width: 100%;
  font-family: ${fonts.tertiary};
  text-align: center;
`
const Caption = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
  padding: 1.375rem 0 0.75rem 0;
  width: 100%;
  text-transform: uppercase;
  text-align: center;
  font-size: ${fontSize.xs};
  font-weight: ${fontWeight.semibold};
  margin-top: 46% ${media.desktop`
  margin-top: 10%
  `};
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

// const ExitButton = styled.div`
//   display: flex;
//   align-items: center;
//   flex-direction: column;
//   justify-content: flex-start;
//   padding: 0 1rem;
//   width: 100%;
// `

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
`

const YesButton = styled(Button)`
  border-radius: 5px;
  width: 130px;
  height: 130px;
  background-color: ${props => props.backgroundColor};
  color: white;
  border: 4px solid #afb0b3;
  text-transform: uppercase;
  text-align: center;
  font-size: ${fontSize.xxl};
  font-weight: ${fontWeight.semibold};
  padding-left: 30px;
  padding-right: 30px;
  position: relative;
  display: block;
  margin: 3.5rem auto 0 auto;
`

const NoButton = styled(Button)`
  border-radius: 5px;
  width: 130px;
  height: 130px;
  background-color: ${props => props.backgroundColor};
  color: white;
  border: 4px solid #afb0b3;
  text-transform: uppercase;
  text-align: center;
  font-size: ${fontSize.xxl};
  font-weight: ${fontWeight.semibold};
  padding-left: 30px;
  padding-right: 30px;
  position: relative;
  display: block;
  margin: 3.5rem auto 0 auto;
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

export default class Review extends React.Component {
  static propTypes = {
    userData: object.isRequired,
    venue: object.isRequired,
    errors: object.isRequired,
    // photo: string.isRequired,
    sendingRequest: bool.isRequired,
    setNotificationMessage: func.isRequired,
    clearError: func.isRequired,
    createReview: func.isRequired
  }

  static contextTypes = {
    intl: intlShape
  }

  state = {
    entryScore: null,
    entryScoreColor: colors.grey,
    steps: null,
    stepsColor: colors.grey,
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
    ]
  }

  // Dev Note: Comment this out when attempting to merge with master
  // componentWillMount() {
  //   this.setState({
  //     activeEvents: [
  //       ...this.state.activeEvents,
  //       ...[
  //         ...this.props.userData.events,
  //         ...this.props.userData.managedEvents
  //       ].reduce((filtered, e) => {
  //         const eventStartDate = new Date(e.startDate)
  //         const eventEndDate = new Date(e.endDate)
  //         const today = new Date()

  //         if (eventStartDate <= today && eventEndDate >= today) {
  //           filtered.push({
  //             value: e.id,
  //             label: e.name
  //           })
  //         }

  //         return filtered
  //       }, [])
  //     ],
  //     teams: [
  //       ...this.state.teams,
  //       ...[
  //         ...this.props.userData.teams,
  //         ...this.props.userData.managedTeams
  //       ].map(t => ({ value: t.id, label: t.name }))
  //     ]
  //   })
  // }
  // End Dev Note

  changeEntryScore = entryScore => {
    if (entryScore === this.state.entryScore) {
      this.setState({ entryScore: null })
      this.setState({ entryScoreColor: colors.grey })
    } else {
      this.setState({ entryScore })

      if (entryScore === 1 || entryScore === 2)
        this.setState({ entryScoreColor: colors.alert })
      else if (entryScore === 3)
        this.setState({ entryScoreColor: colors.primary })
      else this.setState({ entryScoreColor: colors.success })
    }
  }

  changeSteps = steps => {
    if (steps === this.state.steps) {
      this.setState({ steps: null })
      this.setState({ stepsColor: colors.grey })
    } else {
      this.setState({ steps })

      if (steps === 0) this.setState({ stepsColor: colors.success })
      else if (steps === 1 || steps === 2)
        this.setState({ stepsColor: colors.primary })
      else this.setState({ stepsColor: colors.alert })
    }
  }

  changeBathroomScore = bathroomScore => {
    if (bathroomScore === this.state.bathroomScore) {
      this.setState({ bathroomScore: null })
      this.setState({ bathroomScoreColor: colors.grey })
    } else {
      this.setState({ bathroomScore })

      if (bathroomScore === 1 || bathroomScore === 2)
        this.setState({ bathroomScoreColor: colors.alert })
      else if (bathroomScore === 3)
        this.setState({ bathroomScoreColor: colors.primary })
      else this.setState({ bathroomScoreColor: colors.success })
    }
  }

  changeReview = (review, value) => {
    let reviewColor
    if (value) reviewColor = colors.success
    else if (value === false) reviewColor = colors.alert
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
    const formatMessage = this.context.intl.formatMessage
    const reviewData = {
      allowsGuideDog: this.props.venue.allowsGuideDog,
      bathroomScore: this.props.venue.bathroomScore,
      entryScore: this.props.venue.entryScore,
      hasParking: this.props.venue.hasParking,
      hasSecondEntry: this.props.venue.hasSecondEntry,
      hasWellLit: this.props.venue.hasWellLit,
      isQuiet: this.props.venue.isQuiet,
      isSpacious: this.props.venue.isSpacious,
      steps: this.props.venue.steps,
      hasPermanentRamp: this.props.venue.hasPermanentRamp,
      hasWideEntrance: this.props.venue.hasWideEntrance,
      hasAccessibleTableHeight: this.props.venue.hasAccessibleTableHeight
    }
    const reviewsRatioWeight = getReviewsRatioWeight(reviewData)
    const generalType = getGeneralType(this.props.venue.types)

    return (
      <Container>
        <Wrapper>
          <CarouselProvider
            naturalSlideWidth={100}
            naturalSlideHeight={160}
            totalSlides={25}
            visibleSlides={1}
            data-carousel="addReview"
          >
            <Slider>
              {/* Entry */}
              <Slide index={0}>
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
                      alt=" "
                      color={colors.black}
                    />
                  </ScoreBox>
                  <ScoreDescription>
                    <Title>{formatMessage(messages.permanentRampTitle)}</Title>
                    <Description>
                      {formatMessage(messages.permanentRampDescription)}
                    </Description>
                  </ScoreDescription>

                  <Grid
                    container
                    alignItems="center"
                    justify="center"
                    spacing={3}
                  >
                    <Grid item xs={5} sm={5}>
                      <YesButton
                        backgroundColor={
                          this.state.hasPermanentRamp
                            ? colors.success
                            : transparentize(0.5, colors.success)
                        }
                        disabled={this.props.sendingRequest}
                        onClick={() =>
                          this.changeReview('hasPermanentRamp', true)
                        }
                      >
                        {formatMessage(messages.yesButton)}
                      </YesButton>
                    </Grid>
                    <Grid item xs={5} sm={5}>
                      <NoButton
                        backgroundColor={
                          this.state.hasPermanentRamp === false
                            ? colors.alert
                            : transparentize(0.5, colors.alert)
                        }
                        disabled={this.props.sendingRequest}
                        onClick={() =>
                          this.changeReview('hasPermanentRamp', false)
                        }
                      >
                        {formatMessage(messages.noButton)}
                      </NoButton>
                    </Grid>
                  </Grid>

                  <Caption>Entrance 1/9</Caption>
                </ScoreWrapper>
              </Slide>
              <Slide index={1}>
                <SubTitle>
                  {formatMessage(messages.createReviewSubheader)}
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
                    <Title>{formatMessage(messages.portableRampTitle)}</Title>
                    <Description>
                      {formatMessage(messages.portableRampDescription)}
                    </Description>
                  </ScoreDescription>

                  <Grid
                    container
                    alignItems="center"
                    justify="center"
                    spacing={3}
                  >
                    <Grid item xs={5} sm={5}>
                      <YesButton
                        backgroundColor={
                          this.state.hasPortableRamp
                            ? colors.success
                            : transparentize(0.5, colors.success)
                        }
                        disabled={this.props.sendingRequest}
                        onClick={() =>
                          this.changeReview('hasPortableRamp', true)
                        }
                      >
                        {formatMessage(messages.yesButton)}
                      </YesButton>
                    </Grid>
                    <Grid item xs={5} sm={5}>
                      <NoButton
                        backgroundColor={
                          this.state.hasPortableRamp === false
                            ? colors.alert
                            : transparentize(0.5, colors.alert)
                        }
                        disabled={this.props.sendingRequest}
                        onClick={() =>
                          this.changeReview('hasPortableRamp', false)
                        }
                      >
                        {formatMessage(messages.noButton)}
                      </NoButton>
                    </Grid>
                  </Grid>

                  <Caption>Entrance 2/9</Caption>
                </ScoreWrapper>
              </Slide>
              <Slide index={2}>
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
                      alt=" "
                      color={colors.black}
                    />
                    <StepButton
                      disabled={this.props.sendingRequest}
                      onClick={() => this.changeSteps(0)}
                    >
                      <Icon
                        glyph="zero"
                        size={2.5}
                        color={
                          this.state.steps === 0 ? colors.primary : colors.white
                        }
                      />
                    </StepButton>
                  </ScoreBox>
                  <ScoreDescription>
                    <Title>{formatMessage(messages.noStepsTitle)}</Title>
                    <Description>
                      {formatMessage(messages.noStepsDescription)}
                    </Description>
                  </ScoreDescription>
                  <Grid
                    container
                    alignItems="center"
                    justify="center"
                    spacing={3}
                  >
                    <Grid item xs={5} sm={5}>
                      <YesButton
                        backgroundColor={
                          this.state.has0Steps
                            ? colors.success
                            : transparentize(0.5, colors.success)
                        }
                        disabled={this.props.sendingRequest}
                        onClick={() => this.changeReview('has0Steps', true)}
                      >
                        {formatMessage(messages.yesButton)}
                      </YesButton>
                    </Grid>
                    <Grid item xs={5} sm={5}>
                      <NoButton
                        backgroundColor={
                          this.state.has0Steps === false
                            ? colors.alert
                            : transparentize(0.5, colors.alert)
                        }
                        disabled={this.props.sendingRequest}
                        onClick={() => this.changeReview('has0Steps', false)}
                      >
                        {formatMessage(messages.noButton)}
                      </NoButton>
                    </Grid>
                  </Grid>

                  <Caption>Entrance 3/9</Caption>
                </ScoreWrapper>
              </Slide>
              <Slide index={3}>
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
                      alt=" "
                      color={colors.black}
                    />
                    <StepButton
                      disabled={this.props.sendingRequest}
                      onClick={() => this.changeSteps(1)}
                    >
                      <Icon
                        glyph="one"
                        size={2.5}
                        color={
                          this.state.steps === 0 ? colors.primary : colors.white
                        }
                      />
                    </StepButton>
                  </ScoreBox>
                  <ScoreDescription>
                    <Title>{formatMessage(messages.oneStepTitle)}</Title>
                    <Description>
                      {formatMessage(messages.oneStepDescription)}
                    </Description>
                  </ScoreDescription>
                  <Grid
                    container
                    alignItems="center"
                    justify="center"
                    spacing={3}
                  >
                    <Grid item xs={5} sm={5}>
                      <YesButton
                        backgroundColor={
                          this.state.has1Step
                            ? colors.success
                            : transparentize(0.5, colors.success)
                        }
                        disabled={this.props.sendingRequest}
                        onClick={() => this.changeReview('has1Step', true)}
                      >
                        {formatMessage(messages.yesButton)}
                      </YesButton>
                    </Grid>
                    <Grid item xs={5} sm={5}>
                      <NoButton
                        backgroundColor={
                          this.state.has1Step === false
                            ? colors.alert
                            : transparentize(0.5, colors.alert)
                        }
                        disabled={this.props.sendingRequest}
                        onClick={() => this.changeReview('has1Step', false)}
                      >
                        {formatMessage(messages.noButton)}
                      </NoButton>
                    </Grid>
                  </Grid>

                  <Caption>Entrance 4/9</Caption>
                </ScoreWrapper>
              </Slide>
              <Slide index={4}>
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
                      alt=" "
                      color={colors.black}
                    />
                    <StepButton
                      disabled={this.props.sendingRequest}
                      onClick={() => this.changeSteps(1)}
                    >
                      <Icon
                        glyph="two"
                        size={2.5}
                        color={
                          this.state.steps === 0 ? colors.primary : colors.white
                        }
                      />
                    </StepButton>
                  </ScoreBox>
                  <ScoreDescription>
                    <Title>{formatMessage(messages.twoStepsTitle)}</Title>
                    <Description>
                      {formatMessage(messages.twoStepsDescription)}
                    </Description>
                  </ScoreDescription>
                  <Grid
                    container
                    alignItems="center"
                    justify="center"
                    spacing={3}
                  >
                    <Grid item xs={5} sm={5}>
                      <YesButton
                        backgroundColor={
                          this.state.has2Steps
                            ? colors.success
                            : transparentize(0.5, colors.success)
                        }
                        disabled={this.props.sendingRequest}
                        onClick={() => this.changeReview('has2Steps', true)}
                      >
                        {formatMessage(messages.yesButton)}
                      </YesButton>
                    </Grid>
                    <Grid item xs={5} sm={5}>
                      <NoButton
                        backgroundColor={
                          this.state.has2Steps === false
                            ? colors.alert
                            : transparentize(0.5, colors.alert)
                        }
                        disabled={this.props.sendingRequest}
                        onClick={() => this.changeReview('has2Steps', false)}
                      >
                        {formatMessage(messages.noButton)}
                      </NoButton>
                    </Grid>
                  </Grid>

                  <Caption>Entrance 5/9</Caption>
                </ScoreWrapper>
              </Slide>
              <Slide index={5}>
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
                      alt=" "
                      color={colors.black}
                    />
                    <StepButton
                      disabled={this.props.sendingRequest}
                      onClick={() => this.changeSteps(3)}
                    >
                      <Icon
                        glyph="moreThanTwo"
                        size={2.5}
                        color={
                          this.state.steps === 0 ? colors.primary : colors.white
                        }
                      />
                    </StepButton>
                  </ScoreBox>
                  <ScoreDescription>
                    <Title>{formatMessage(messages.threeStepsTitle)}</Title>
                    <Description>
                      {formatMessage(messages.threeStepsDescription)}
                    </Description>
                  </ScoreDescription>
                  <Grid
                    container
                    alignItems="center"
                    justify="center"
                    spacing={3}
                  >
                    <Grid item xs={5} sm={5}>
                      <YesButton
                        backgroundColor={
                          this.state.has3Steps
                            ? colors.success
                            : transparentize(0.5, colors.success)
                        }
                        disabled={this.props.sendingRequest}
                        onClick={() => this.changeReview('has3Steps', true)}
                      >
                        {formatMessage(messages.yesButton)}
                      </YesButton>
                    </Grid>
                    <Grid item xs={5} sm={5}>
                      <NoButton
                        backgroundColor={
                          this.state.has3Steps === false
                            ? colors.alert
                            : transparentize(0.5, colors.alert)
                        }
                        disabled={this.props.sendingRequest}
                        onClick={() => this.changeReview('has3Steps', false)}
                      >
                        {formatMessage(messages.noButton)}
                      </NoButton>
                    </Grid>
                  </Grid>

                  <Caption>Entrance 6/9</Caption>
                </ScoreWrapper>
              </Slide>
              <Slide index={6}>
                <SubTitle>
                  {formatMessage(messages.createReviewSubheader)}
                </SubTitle>
                <ScoreWrapper>
                  <ScoreBox textColor={colors.white} className="box__dark">
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
                    <Title>
                      {formatMessage(messages.reservedParkingTitle)}
                    </Title>
                    <Description>
                      {formatMessage(messages.reservedParkingDescription)}
                    </Description>
                  </ScoreDescription>
                  <Grid
                    container
                    alignItems="center"
                    justify="center"
                    spacing={3}
                  >
                    <Grid item xs={5} sm={5}>
                      <YesButton
                        backgroundColor={
                          this.state.hasParking
                            ? colors.success
                            : transparentize(0.5, colors.success)
                        }
                        disabled={this.props.sendingRequest}
                        onClick={() => this.changeReview('hasParking', true)}
                      >
                        {formatMessage(messages.yesButton)}
                      </YesButton>
                    </Grid>
                    <Grid item xs={5} sm={5}>
                      <NoButton
                        backgroundColor={
                          this.state.hasParking === false
                            ? colors.alert
                            : transparentize(0.5, colors.alert)
                        }
                        disabled={this.props.sendingRequest}
                        onClick={() => this.changeReview('hasParking', false)}
                      >
                        {formatMessage(messages.noButton)}
                      </NoButton>
                    </Grid>
                  </Grid>
                  <Caption>Entrance 7/9</Caption>
                </ScoreWrapper>
              </Slide>
              <Slide index={7}>
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
                    <Title>{formatMessage(messages.secondEntryTitle)}</Title>
                    <Description>
                      {formatMessage(messages.secondEntryDescription)}
                    </Description>
                  </ScoreDescription>
                  <Grid
                    container
                    alignItems="center"
                    justify="center"
                    spacing={3}
                  >
                    <Grid item xs={5} sm={5}>
                      <YesButton
                        backgroundColor={
                          this.state.hasSecondEntry
                            ? colors.success
                            : transparentize(0.5, colors.success)
                        }
                        disabled={this.props.sendingRequest}
                        onClick={() =>
                          this.changeReview('hasSecondEntry', true)
                        }
                      >
                        {formatMessage(messages.yesButton)}
                      </YesButton>
                    </Grid>
                    <Grid item xs={5} sm={5}>
                      <NoButton
                        backgroundColor={
                          this.state.hasSecondEntry === false
                            ? colors.alert
                            : transparentize(0.5, colors.alert)
                        }
                        disabled={this.props.sendingRequest}
                        onClick={() =>
                          this.changeReview('hasSecondEntry', false)
                        }
                      >
                        {formatMessage(messages.noButton)}
                      </NoButton>
                    </Grid>
                  </Grid>
                  <Caption>Entrance 8/9</Caption>
                </ScoreWrapper>
              </Slide>
              <Slide index={8}>
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
                    <Title>{formatMessage(messages.wideEntranceTitle)}</Title>
                    <Description>
                      {formatMessage(messages.wideEntranceDescription)}
                    </Description>
                  </ScoreDescription>
                  <Grid
                    container
                    alignItems="center"
                    justify="center"
                    spacing={3}
                  >
                    <Grid item xs={5} sm={5}>
                      <YesButton
                        backgroundColor={
                          this.state.hasWideEntrance
                            ? colors.success
                            : transparentize(0.5, colors.success)
                        }
                        disabled={this.props.sendingRequest}
                        onClick={() =>
                          this.changeReview('hasWideEntrance', true)
                        }
                      >
                        {formatMessage(messages.yesButton)}
                      </YesButton>
                    </Grid>
                    <Grid item xs={5} sm={5}>
                      <NoButton
                        backgroundColor={
                          this.state.hasWideEntrance === false
                            ? colors.alert
                            : transparentize(0.5, colors.alert)
                        }
                        disabled={this.props.sendingRequest}
                        onClick={() =>
                          this.changeReview('hasWideEntrance', false)
                        }
                      >
                        {formatMessage(messages.noButton)}
                      </NoButton>
                    </Grid>
                  </Grid>
                  <Caption>Entrance 9/9</Caption>
                </ScoreWrapper>
              </Slide>
              {/* Interior */}
              <Slide index={9}>
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
                    <Title>{formatMessage(messages.roomToMoveTitle)}</Title>
                    <Description>
                      {formatMessage(messages.roomToMoveDescription)}
                    </Description>
                  </ScoreDescription>
                  <Grid
                    container
                    alignItems="center"
                    justify="center"
                    spacing={3}
                  >
                    <Grid item xs={5} sm={5}>
                      <YesButton
                        backgroundColor={
                          this.state.isSpacious
                            ? colors.success
                            : transparentize(0.5, colors.success)
                        }
                        disabled={this.props.sendingRequest}
                        onClick={() => this.changeReview('isSpacious', true)}
                      >
                        {formatMessage(messages.yesButton)}
                      </YesButton>
                    </Grid>
                    <Grid item xs={5} sm={5}>
                      <NoButton
                        backgroundColor={
                          this.state.isSpacious === false
                            ? colors.alert
                            : transparentize(0.5, colors.alert)
                        }
                        disabled={this.props.sendingRequest}
                        onClick={() => this.changeReview('isSpacious', false)}
                      >
                        {formatMessage(messages.noButton)}
                      </NoButton>
                    </Grid>
                  </Grid>
                  <Caption>Interior 1/7</Caption>
                </ScoreWrapper>
              </Slide>
              <Slide index={10}>
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
                    <Title>
                      {formatMessage(messages.accessibleTableHeightTitle)}
                    </Title>
                    <Description>
                      {formatMessage(messages.accessibleTableHeightDescription)}
                    </Description>
                  </ScoreDescription>
                  <Grid
                    container
                    alignItems="center"
                    justify="center"
                    spacing={3}
                  >
                    <Grid item xs={5} sm={5}>
                      <YesButton
                        backgroundColor={
                          this.state.hasAccessibleTableHeight
                            ? colors.success
                            : transparentize(0.5, colors.success)
                        }
                        disabled={this.props.sendingRequest}
                        onClick={() =>
                          this.changeReview('hasAccessibleTableHeight', true)
                        }
                      >
                        {formatMessage(messages.yesButton)}
                      </YesButton>
                    </Grid>
                    <Grid item xs={5} sm={5}>
                      <NoButton
                        backgroundColor={
                          this.state.hasAccessibleTableHeight === false
                            ? colors.alert
                            : transparentize(0.5, colors.alert)
                        }
                        disabled={this.props.sendingRequest}
                        onClick={() =>
                          this.changeReview('hasAccessibleTableHeight', false)
                        }
                      >
                        {formatMessage(messages.noButton)}
                      </NoButton>
                    </Grid>
                  </Grid>
                  <Caption>Interior 2/7</Caption>
                </ScoreWrapper>
              </Slide>
              <Slide index={11}>
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
                    <Title>{formatMessage(messages.brightLightTitle)}</Title>
                    <Description>
                      {formatMessage(messages.brightLightDescription)}
                    </Description>
                  </ScoreDescription>
                  <Grid
                    container
                    alignItems="center"
                    justify="center"
                    spacing={3}
                  >
                    <Grid item xs={5} sm={5}>
                      <YesButton
                        backgroundColor={
                          this.state.hasWellLit
                            ? colors.success
                            : transparentize(0.5, colors.success)
                        }
                        disabled={this.props.sendingRequest}
                        onClick={() => this.changeReview('hasWellLit', true)}
                      >
                        {formatMessage(messages.yesButton)}
                      </YesButton>
                    </Grid>
                    <Grid item xs={5} sm={5}>
                      <NoButton
                        backgroundColor={
                          this.state.hasWellLit === false
                            ? colors.alert
                            : transparentize(0.5, colors.alert)
                        }
                        disabled={this.props.sendingRequest}
                        onClick={() => this.changeReview('hasWellLit', false)}
                      >
                        {formatMessage(messages.noButton)}
                      </NoButton>
                    </Grid>
                  </Grid>
                  <Caption>Interior 3/7</Caption>
                </ScoreWrapper>
              </Slide>
              <Slide index={12}>
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
                    <Title>{formatMessage(messages.highNoiseLevelTitle)}</Title>
                    <Description>
                      {formatMessage(messages.highNoiseLevelDescription)}
                    </Description>
                  </ScoreDescription>
                  <Grid
                    container
                    alignItems="center"
                    justify="center"
                    spacing={3}
                  >
                    <Grid item xs={5} sm={5}>
                      <YesButton
                        backgroundColor={
                          this.state.isQuiet
                            ? colors.success
                            : transparentize(0.5, colors.success)
                        }
                        disabled={this.props.sendingRequest}
                        onClick={() => this.changeReview('isQuiet', true)}
                      >
                        {formatMessage(messages.yesButton)}
                      </YesButton>
                    </Grid>
                    <Grid item xs={5} sm={5}>
                      <NoButton
                        backgroundColor={
                          this.state.isQuiet === false
                            ? colors.alert
                            : transparentize(0.5, colors.alert)
                        }
                        disabled={this.props.sendingRequest}
                        onClick={() => this.changeReview('isQuiet', false)}
                      >
                        {formatMessage(messages.noButton)}
                      </NoButton>
                    </Grid>
                  </Grid>
                  <Caption>Interior 4/7</Caption>
                </ScoreWrapper>
              </Slide>
              <Slide index={13}>
                <SubTitle>
                  {formatMessage(messages.createReviewSubheader)}
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
                    <Title>{formatMessage(messages.guideDogTitle)}</Title>
                    <Description>
                      {formatMessage(messages.guideDogDescription)}
                    </Description>
                  </ScoreDescription>
                  <Grid
                    container
                    alignItems="center"
                    justify="center"
                    spacing={3}
                  >
                    <Grid item xs={5} sm={5}>
                      <YesButton
                        backgroundColor={
                          this.state.allowsGuideDog
                            ? colors.success
                            : transparentize(0.5, colors.success)
                        }
                        disabled={this.props.sendingRequest}
                        onClick={() =>
                          this.changeReview('allowsGuideDog', true)
                        }
                      >
                        {formatMessage(messages.yesButton)}
                      </YesButton>
                    </Grid>
                    <Grid item xs={5} sm={5}>
                      <NoButton
                        backgroundColor={
                          this.state.allowsGuideDog === false
                            ? colors.alert
                            : transparentize(0.5, colors.alert)
                        }
                        disabled={this.props.sendingRequest}
                        onClick={() =>
                          this.changeReview('allowsGuideDog', false)
                        }
                      >
                        {formatMessage(messages.noButton)}
                      </NoButton>
                    </Grid>
                  </Grid>
                  <Caption>Interior 5/7</Caption>
                </ScoreWrapper>
              </Slide>
              <Slide index={14}>
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
                    <Title>
                      {formatMessage(messages.accessibleElevatorTitle)}
                    </Title>
                    <Description>
                      {formatMessage(messages.accessibleElevatorDescription)}
                    </Description>
                  </ScoreDescription>
                  <Grid
                    container
                    alignItems="center"
                    justify="center"
                    spacing={3}
                  >
                    <Grid item xs={5} sm={5}>
                      <YesButton
                        backgroundColor={
                          this.state.hasAccessibleElevator
                            ? colors.success
                            : transparentize(0.5, colors.success)
                        }
                        disabled={this.props.sendingRequest}
                        onClick={() =>
                          this.changeReview('hasAccessibleElevator', true)
                        }
                      >
                        {formatMessage(messages.yesButton)}
                      </YesButton>
                    </Grid>
                    <Grid item xs={5} sm={5}>
                      <NoButton
                        backgroundColor={
                          this.state.hasAccessibleElevator === false
                            ? colors.alert
                            : transparentize(0.5, colors.alert)
                        }
                        disabled={this.props.sendingRequest}
                        onClick={() =>
                          this.changeReview('hasAccessibleElevator', false)
                        }
                      >
                        {formatMessage(messages.noButton)}
                      </NoButton>
                    </Grid>
                  </Grid>
                  <Caption>Interior 6/7</Caption>
                </ScoreWrapper>
              </Slide>
              <Slide index={15}>
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
                    <Title>{formatMessage(messages.interiorRampTitle)}</Title>
                    <Description>
                      {formatMessage(messages.interiorRampDescription)}
                    </Description>
                  </ScoreDescription>
                  <Grid
                    container
                    alignItems="center"
                    justify="center"
                    spacing={3}
                  >
                    <Grid item xs={5} sm={5}>
                      <YesButton
                        backgroundColor={
                          this.state.hasInteriorRamp
                            ? colors.success
                            : transparentize(0.5, colors.success)
                        }
                        disabled={this.props.sendingRequest}
                        onClick={() =>
                          this.changeReview('hasInteriorRamp', true)
                        }
                      >
                        {formatMessage(messages.yesButton)}
                      </YesButton>
                    </Grid>
                    <Grid item xs={5} sm={5}>
                      <NoButton
                        backgroundColor={
                          this.state.hasInteriorRamp === false
                            ? colors.alert
                            : transparentize(0.5, colors.alert)
                        }
                        disabled={this.props.sendingRequest}
                        onClick={() =>
                          this.changeReview('hasInteriorRamp', false)
                        }
                      >
                        {formatMessage(messages.noButton)}
                      </NoButton>
                    </Grid>
                  </Grid>
                  <Caption>Interior 7/7</Caption>
                </ScoreWrapper>
              </Slide>
              {/* 
              <Slide index={16}>
                <SubTitle>
                  {formatMessage(messages.createReviewSubheader)}
                </SubTitle>
                <ScoreWrapper>
                  <ScoreBox>
                    <Icon glyph="guideDog" size={2.5} />
                  </ScoreBox>
                  <ScoreDescription>
                    <Title>{formatMessage(messages.interiorStairsTitle)}</Title>
                    <Description>
                      {formatMessage(messages.interiorStairsDescription)}
                    </Description>
                  </ScoreDescription>
                  <Grid container alignItems='center' justify='center' spacing={3}>
                    <Grid item xs={5} sm={5}>
                      <YesButton
                        backgroundColor={
                          this.state.hasInteriorStairs
                            ? colors.success
                            : transparentize(0.5, colors.success)
                        }
                        disabled={this.props.sendingRequest}
                        onClick={() =>
                          this.changeReview('hasInteriorStairs', true)
                        }
                      >
                        {formatMessage(messages.yesButton)}
                      </YesButton>
                    </Grid>
                    <Grid item xs={5} sm={5}>
                      <NoButton
                        backgroundColor={
                          this.state.hasInteriorStairs === false
                            ? colors.alert
                            : transparentize(0.5, colors.alert)
                        }
                        disabled={this.props.sendingRequest}
                        onClick={() =>
                          this.changeReview('hasInteriorStairs', false)
                        }
                      >
                        {formatMessage(messages.noButton)}
                      </NoButton>
                    </Grid>
                  </Grid>
                  <Caption>Interior 8/9</Caption>
                </ScoreWrapper>
              </Slide>
              <Slide index={17}>
                <SubTitle>
                  {formatMessage(messages.createReviewSubheader)}
                </SubTitle>
                <ScoreWrapper>
                  <ScoreBox>
                    <Icon glyph="guideDog" size={2.5} />
                  </ScoreBox>
                  <ScoreDescription>
                    <Title>{formatMessage(messages.walkUpTitle)}</Title>
                    <Description>
                      {formatMessage(messages.walkUpDescription)}
                    </Description>
                  </ScoreDescription>
                  <Grid container alignItems='center' justify='center' spacing={3}>
                    <Grid item xs={5} sm={5}>
                      <YesButton
                        backgroundColor={
                          this.state.hasWalkUp
                            ? colors.success
                            : transparentize(0.5, colors.success)
                        }
                        disabled={this.props.sendingRequest}
                        onClick={() => this.changeReview('hasWalkUp', true)}
                      >
                        {formatMessage(messages.yesButton)}
                      </YesButton>
                    </Grid>
                    <Grid item xs={5} sm={5}>
                      <NoButton
                        backgroundColor={
                          this.state.hasWalkUp === false
                            ? colors.alert
                            : transparentize(0.5, colors.alert)
                        }
                        disabled={this.props.sendingRequest}
                        onClick={() => this.changeReview('hasWalkUp', false)}
                      >
                        {formatMessage(messages.noButton)}
                      </NoButton>
                    </Grid>
                  </Grid>
                  <Caption>Interior 9/9</Caption>
                </ScoreWrapper>
              </Slide>
              */}
              {/* Restroom */}
              <Slide index={18}>
                <SubTitle>
                  {formatMessage(messages.createReviewSubheader)}
                </SubTitle>
                <ScoreWrapper>
                  <ScoreBox textColor={colors.black}>
                    <Icon
                      glyph="doorSwingsIn"
                      size={6}
                      className="fill-current text-black"
                      aria-hidden="true"
                      alt=" "
                      color={colors.black}
                    />
                  </ScoreBox>
                  <ScoreDescription>
                    <Title>{formatMessage(messages.doorSwingsInTitle)}</Title>
                    <Description>
                      {formatMessage(messages.doorSwingsInDescription)}
                    </Description>
                  </ScoreDescription>
                  <Grid
                    container
                    alignItems="center"
                    justify="center"
                    spacing={3}
                  >
                    <Grid item xs={5} sm={5}>
                      <YesButton
                        backgroundColor={
                          this.state.hasSwingInDoor
                            ? colors.success
                            : transparentize(0.5, colors.success)
                        }
                        disabled={this.props.sendingRequest}
                        onClick={() =>
                          this.changeReview('hasSwingInDoor', true)
                        }
                      >
                        {formatMessage(messages.yesButton)}
                      </YesButton>
                    </Grid>
                    <Grid item xs={5} sm={5}>
                      <NoButton
                        backgroundColor={
                          this.state.hasSwingInDoor === false
                            ? colors.alert
                            : transparentize(0.5, colors.alert)
                        }
                        disabled={this.props.sendingRequest}
                        onClick={() =>
                          this.changeReview('hasSwingInDoor', false)
                        }
                      >
                        {formatMessage(messages.noButton)}
                      </NoButton>
                    </Grid>
                  </Grid>
                  <Caption>Restroom 1/9</Caption>
                </ScoreWrapper>
              </Slide>
              <Slide index={19}>
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
                    <Title>{formatMessage(messages.doorSwingsOutTitle)}</Title>
                    <Description>
                      {formatMessage(messages.doorSwingsOutDescription)}
                    </Description>
                  </ScoreDescription>
                  <Grid
                    container
                    alignItems="center"
                    justify="center"
                    spacing={3}
                  >
                    <Grid item xs={5} sm={5}>
                      <YesButton
                        backgroundColor={
                          this.state.hasSwingOutDoor
                            ? colors.success
                            : transparentize(0.5, colors.success)
                        }
                        disabled={this.props.sendingRequest}
                        onClick={() =>
                          this.changeReview('hasSwingOutDoor', true)
                        }
                      >
                        {formatMessage(messages.yesButton)}
                      </YesButton>
                    </Grid>
                    <Grid item xs={5} sm={5}>
                      <NoButton
                        backgroundColor={
                          this.state.hasSwingOutDoor === false
                            ? colors.alert
                            : transparentize(0.5, colors.alert)
                        }
                        disabled={this.props.sendingRequest}
                        onClick={() =>
                          this.changeReview('hasSwingOutDoor', false)
                        }
                      >
                        {formatMessage(messages.noButton)}
                      </NoButton>
                    </Grid>
                  </Grid>
                  <Caption>Restroom 2/9</Caption>
                </ScoreWrapper>
              </Slide>
              <Slide index={20}>
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
                    <Title>{formatMessage(messages.averageStallsTitle)}</Title>
                    <Description>
                      {formatMessage(messages.averageStallsDescription)}
                    </Description>
                  </ScoreDescription>
                  <Grid
                    container
                    alignItems="center"
                    justify="center"
                    spacing={3}
                  >
                    <Grid item xs={5} sm={5}>
                      <YesButton
                        backgroundColor={
                          this.state.hasAverageStall
                            ? colors.success
                            : transparentize(0.5, colors.success)
                        }
                        disabled={this.props.sendingRequest}
                        onClick={() =>
                          this.changeReview('hasAverageStall', true)
                        }
                      >
                        {formatMessage(messages.yesButton)}
                      </YesButton>
                    </Grid>
                    <Grid item xs={5} sm={5}>
                      <NoButton
                        backgroundColor={
                          this.state.hasAverageStall === false
                            ? colors.alert
                            : transparentize(0.5, colors.alert)
                        }
                        disabled={this.props.sendingRequest}
                        onClick={() =>
                          this.changeReview('hasAverageStall', false)
                        }
                      >
                        {formatMessage(messages.noButton)}
                      </NoButton>
                    </Grid>
                  </Grid>
                  <Caption>Restroom 3/9</Caption>
                </ScoreWrapper>
              </Slide>
              <Slide index={21}>
                <SubTitle>
                  {formatMessage(messages.createReviewSubheader)}
                </SubTitle>
                <ScoreWrapper>
                  <ScoreBox textColor={colors.black}>
                    <style>{`
                  .eBPyXX{
                    fill: "default" !important;
                  }
                  `}</style>
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
                    <Title>{formatMessage(messages.largeStallsTitle)}</Title>
                    <Description>
                      {formatMessage(messages.largeStallsDescription)}
                    </Description>
                  </ScoreDescription>
                  <Grid
                    container
                    alignItems="center"
                    justify="center"
                    spacing={3}
                  >
                    <Grid item xs={5} sm={5}>
                      <YesButton
                        backgroundColor={
                          this.state.hasLargeStall
                            ? colors.success
                            : transparentize(0.5, colors.success)
                        }
                        disabled={this.props.sendingRequest}
                        onClick={() => this.changeReview('hasLargeStall', true)}
                      >
                        {formatMessage(messages.yesButton)}
                      </YesButton>
                    </Grid>
                    <Grid item xs={5} sm={5}>
                      <NoButton
                        backgroundColor={
                          this.state.hasLargeStall === false
                            ? colors.alert
                            : transparentize(0.5, colors.alert)
                        }
                        disabled={this.props.sendingRequest}
                        onClick={() =>
                          this.changeReview('hasLargeStall', false)
                        }
                      >
                        {formatMessage(messages.noButton)}
                      </NoButton>
                    </Grid>
                  </Grid>
                  <Caption>Restroom 4/9</Caption>
                </ScoreWrapper>
              </Slide>
              <Slide index={22}>
                <SubTitle>
                  {formatMessage(messages.createReviewSubheader)}
                </SubTitle>
                <ScoreWrapper>
                  <ScoreBox textColor={colors.black}>
                    <Icon
                      glyph="sinkTall"
                      size={6}
                      className="text-black"
                      aria-hidden="true"
                      alt=" "
                      color={colors.black}
                    />
                  </ScoreBox>
                  <ScoreDescription>
                    <Title>{formatMessage(messages.tallSinksTitle)}</Title>
                    <Description>
                      {formatMessage(messages.tallSinksDescription)}
                    </Description>
                  </ScoreDescription>
                  <Grid
                    container
                    alignItems="center"
                    justify="center"
                    spacing={3}
                  >
                    <Grid item xs={5} sm={5}>
                      <YesButton
                        backgroundColor={
                          this.state.hasTallSinks
                            ? colors.success
                            : transparentize(0.5, colors.success)
                        }
                        disabled={this.props.sendingRequest}
                        onClick={() => this.changeReview('hasTallSinks', true)}
                      >
                        {formatMessage(messages.yesButton)}
                      </YesButton>
                    </Grid>
                    <Grid item xs={5} sm={5}>
                      <NoButton
                        backgroundColor={
                          this.state.hasTallSinks === false
                            ? colors.alert
                            : transparentize(0.5, colors.alert)
                        }
                        disabled={this.props.sendingRequest}
                        onClick={() => this.changeReview('hasTallSinks', false)}
                      >
                        {formatMessage(messages.noButton)}
                      </NoButton>
                    </Grid>
                  </Grid>
                  <Caption>Restroom 5/9</Caption>
                </ScoreWrapper>
              </Slide>
              <Slide index={23}>
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
                      alt=" "
                      color={colors.black}
                    />
                  </ScoreBox>
                  <ScoreDescription>
                    <Title>{formatMessage(messages.loweredSinksTitle)}</Title>
                    <Description>
                      {formatMessage(messages.loweredSinksDescription)}
                    </Description>
                  </ScoreDescription>
                  <Grid
                    container
                    alignItems="center"
                    justify="center"
                    spacing={3}
                  >
                    <Grid item xs={5} sm={5}>
                      <YesButton
                        backgroundColor={
                          this.state.hasLoweredSinks
                            ? colors.success
                            : transparentize(0.5, colors.success)
                        }
                        disabled={this.props.sendingRequest}
                        onClick={() =>
                          this.changeReview('hasLoweredSinks', true)
                        }
                      >
                        {formatMessage(messages.yesButton)}
                      </YesButton>
                    </Grid>
                    <Grid item xs={5} sm={5}>
                      <NoButton
                        backgroundColor={
                          this.state.hasLoweredSinks === false
                            ? colors.alert
                            : transparentize(0.5, colors.alert)
                        }
                        disabled={this.props.sendingRequest}
                        onClick={() =>
                          this.changeReview('hasLoweredSinks', false)
                        }
                      >
                        {formatMessage(messages.noButton)}
                      </NoButton>
                    </Grid>
                  </Grid>
                  <Caption>Restroom 6/9</Caption>
                </ScoreWrapper>
              </Slide>
              <Slide index={24}>
                <SubTitle>
                  {formatMessage(messages.createReviewSubheader)}
                </SubTitle>
                <ScoreWrapper>
                  <ScoreBox textColor={colors.black}>
                    <Icon
                      glyph="noSupport"
                      size={6}
                      className="text-black"
                      aria-hidden="true"
                      alt=" "
                      color={colors.black}
                    />
                  </ScoreBox>
                  <ScoreDescription>
                    <Title>
                      {formatMessage(messages.noSupportAroundToiletTitle)}
                    </Title>
                    <Description>
                      {formatMessage(messages.noSupportAroundToiletDescription)}
                    </Description>
                  </ScoreDescription>
                  <Grid
                    container
                    alignItems="center"
                    justify="center"
                    spacing={3}
                  >
                    <Grid item xs={5} sm={5}>
                      <YesButton
                        backgroundColor={
                          this.state.hasNoSupportAroundToilet
                            ? colors.success
                            : transparentize(0.5, colors.success)
                        }
                        disabled={this.props.sendingRequest}
                        onClick={() =>
                          this.changeReview('hasNoSupportAroundToilet', true)
                        }
                      >
                        {formatMessage(messages.yesButton)}
                      </YesButton>
                    </Grid>
                    <Grid item xs={5} sm={5}>
                      <NoButton
                        backgroundColor={
                          this.state.hasNoSupportAroundToilet === false
                            ? colors.alert
                            : transparentize(0.5, colors.alert)
                        }
                        disabled={this.props.sendingRequest}
                        onClick={() =>
                          this.changeReview('hasNoSupportAroundToilet', false)
                        }
                      >
                        {formatMessage(messages.noButton)}
                      </NoButton>
                    </Grid>
                  </Grid>
                  <Caption>Restroom 7/9</Caption>
                </ScoreWrapper>
              </Slide>
              <Slide index={25}>
                <SubTitle>
                  {formatMessage(messages.createReviewSubheader)}
                </SubTitle>
                <ScoreWrapper>
                  <ScoreBox textColor={colors.black}>
                    <Icon
                      glyph="toiletSupport"
                      size={6}
                      className="text-black"
                      aria-hidden="true"
                      alt=" "
                      color={colors.black}
                    />
                  </ScoreBox>
                  <ScoreDescription>
                    <Title>
                      {formatMessage(messages.oneBarAroundToiletTitle)}
                    </Title>
                    <Description>
                      {formatMessage(messages.oneBarAroundToiletDescription)}
                    </Description>
                  </ScoreDescription>
                  <Grid
                    container
                    alignItems="center"
                    justify="center"
                    spacing={3}
                  >
                    <Grid item xs={5} sm={5}>
                      <YesButton
                        backgroundColor={
                          this.state.hasOneBarAroundToilet
                            ? colors.success
                            : transparentize(0.5, colors.success)
                        }
                        disabled={this.props.sendingRequest}
                        onClick={() =>
                          this.changeReview('hasOneBarAroundToilet', true)
                        }
                      >
                        {formatMessage(messages.yesButton)}
                      </YesButton>
                    </Grid>
                    <Grid item xs={5} sm={5}>
                      <NoButton
                        backgroundColor={
                          this.state.hasOneBarAroundToilet === false
                            ? colors.alert
                            : transparentize(0.5, colors.alert)
                        }
                        disabled={this.props.sendingRequest}
                        onClick={() =>
                          this.changeReview('hasOneBarAroundToilet', false)
                        }
                      >
                        {formatMessage(messages.noButton)}
                      </NoButton>
                    </Grid>
                  </Grid>
                  <Caption>Restroom 8/9</Caption>
                </ScoreWrapper>
              </Slide>
              <Slide index={26}>
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
                    <Title>
                      {formatMessage(messages.twoBarAroundToiletTitle)}
                    </Title>
                    <Description>
                      {formatMessage(messages.twoBarAroundToiletDescription)}
                    </Description>
                  </ScoreDescription>
                  <Grid
                    container
                    alignItems="center"
                    justify="center"
                    spacing={3}
                  >
                    <Grid item xs={5} sm={5}>
                      <YesButton
                        backgroundColor={
                          this.state.hasTwoBarAroundToilet
                            ? colors.success
                            : transparentize(0.5, colors.success)
                        }
                        disabled={this.props.sendingRequest}
                        onClick={() =>
                          this.changeReview('hasTwoBarAroundToilet', true)
                        }
                      >
                        {formatMessage(messages.yesButton)}
                      </YesButton>
                    </Grid>
                    <Grid item xs={5} sm={5}>
                      <NoButton
                        backgroundColor={
                          this.state.hasTwoBarAroundToilet === false
                            ? colors.alert
                            : transparentize(0.5, colors.alert)
                        }
                        disabled={this.props.sendingRequest}
                        onClick={() =>
                          this.changeReview('hasTwoBarAroundToilet', false)
                        }
                      >
                        {formatMessage(messages.noButton)}
                      </NoButton>
                    </Grid>
                  </Grid>
                  <Caption>Restroom 9/9</Caption>
                </ScoreWrapper>
              </Slide>
              {/* 
              <Slide index={27}>
                <SubTitle>
                  {formatMessage(messages.createReviewSubheader)}
                </SubTitle>
                <ScoreWrapper>
                <ScoreBox textColor={colors.black} >
                <Icon 
                glyph="sinkTall" 
                size={6} 
                className="text-black"
                aria-hidden="true"
                alt= " "
                color={colors.black} />
              </ScoreBox>
                  <ScoreDescription>
                    <Title>
                      {formatMessage(messages.roomForSecondPersonTitle)}
                    </Title>
                    <Description>
                      {formatMessage(messages.roomForSecondPersonDescription)}
                    </Description>
                  </ScoreDescription>
                  <Grid container alignItems='center' justify='center' spacing={3}>
                    <Grid item xs={5} sm={5}>
                      <YesButton
                        backgroundColor={
                          this.state.hasTwoBarAroundToilet
                            ? colors.success
                            : transparentize(0.5, colors.success)
                        }
                        disabled={this.props.sendingRequest}
                        onClick={() =>
                          this.changeReview('hasTwoBarAroundToilet', true)
                        }
                      >
                        {formatMessage(messages.yesButton)}
                      </YesButton>
                    </Grid>
                    <Grid item xs={5} sm={5}>
                      <NoButton
                        backgroundColor={
                          this.state.hasTwoBarAroundToilet === false
                            ? colors.alert
                            : transparentize(0.5, colors.alert)
                        }
                        disabled={this.props.sendingRequest}
                        onClick={() =>
                          this.changeReview('hasTwoBarAroundToilet', false)
                        }
                      >
                        {formatMessage(messages.noButton)}
                      </NoButton>
                    </Grid>
                  </Grid>
                  <Caption>Restroom 10/10</Caption>
                </ScoreWrapper>
              </Slide>
              */}
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
          {/* 
          <MainReviewsWrapper>
            <MainReviewColumn>
              <Title>{formatMessage(messages.entryTitle)}</Title>
              <ScoreWrapper>
                <ScoreBox backgroundColor={this.state.entryScoreColor}>
                  <Icon glyph="entry" size={2.5} />
                </ScoreBox>
                <ScoreButton
                  disabled={this.props.sendingRequest}
                  onClick={() => this.changeEntryScore(1)}
                >
                  <Icon
                    glyph="star"
                    size={2.5}
                    color={
                      this.state.entryScore === null
                        ? colors.grey
                        : colors.primary
                    }
                  />
                </ScoreButton>
                <ScoreButton
                  disabled={this.props.sendingRequest}
                  onClick={() => this.changeEntryScore(2)}
                >
                  <Icon
                    glyph="star"
                    size={2.5}
                    color={
                      this.state.entryScore >= 2 ? colors.primary : colors.grey
                    }
                  />
                </ScoreButton>
                <ScoreButton
                  disabled={this.props.sendingRequest}
                  onClick={() => this.changeEntryScore(3)}
                >
                  <Icon
                    glyph="star"
                    size={2.5}
                    color={
                      this.state.entryScore >= 3 ? colors.primary : colors.grey
                    }
                  />
                </ScoreButton>
                <ScoreButton
                  disabled={this.props.sendingRequest}
                  onClick={() => this.changeEntryScore(4)}
                >
                  <Icon
                    glyph="star"
                    size={2.5}
                    color={
                      this.state.entryScore >= 4 ? colors.primary : colors.grey
                    }
                  />
                </ScoreButton>
                <ScoreButton
                  disabled={this.props.sendingRequest}
                  onClick={() => this.changeEntryScore(5)}
                >
                  <Icon
                    glyph="star"
                    size={2.5}
                    color={
                      this.state.entryScore === 5 ? colors.primary : colors.grey
                    }
                  />
                </ScoreButton>
              </ScoreWrapper>
            </MainReviewColumn>

            <MainReviewColumn>
              <Title>{formatMessage(messages.stepsTitle)}</Title>
              <ScoreWrapper>
                <ScoreBox backgroundColor={this.state.stepsColor}>
                  <Icon glyph="steps" size={2.5} />
                </ScoreBox>
                <StepButton
                  disabled={this.props.sendingRequest}
                  onClick={() => this.changeSteps(0)}
                >
                  <Icon
                    glyph="zero"
                    size={2.5}
                    color={
                      this.state.steps === 0 ? colors.primary : colors.grey
                    }
                  />
                </StepButton>
                <StepButton
                  disabled={this.props.sendingRequest}
                  onClick={() => this.changeSteps(1)}
                >
                  <Icon
                    glyph="one"
                    size={2.5}
                    color={
                      this.state.steps === 1 ? colors.primary : colors.grey
                    }
                  />
                </StepButton>
                <StepButton
                  disabled={this.props.sendingRequest}
                  onClick={() => this.changeSteps(2)}
                >
                  <Icon
                    glyph="two"
                    size={2.5}
                    color={
                      this.state.steps === 2 ? colors.primary : colors.grey
                    }
                  />
                </StepButton>
                <StepButton
                  disabled={this.props.sendingRequest}
                  onClick={() => this.changeSteps(3)}
                >
                  <Icon
                    glyph="moreThanTwo"
                    size={2.5}
                    color={
                      this.state.steps === 3 ? colors.primary : colors.grey
                    }
                  />
                </StepButton>
              </ScoreWrapper>
            </MainReviewColumn>

            <MainReviewColumn>
              <Title>{formatMessage(messages.bathroomTitle)}</Title>
              <ScoreWrapper>
                <ScoreBox backgroundColor={this.state.bathroomScoreColor}>
                  <Icon glyph="bathroom" size={2.5} />
                </ScoreBox>
                <ScoreButton
                  disabled={this.props.sendingRequest}
                  onClick={() => this.changeBathroomScore(1)}
                >
                  <Icon
                    glyph="star"
                    size={2.5}
                    color={
                      this.state.bathroomScore === null
                        ? colors.grey
                        : colors.primary
                    }
                  />
                </ScoreButton>
                <ScoreButton
                  disabled={this.props.sendingRequest}
                  onClick={() => this.changeBathroomScore(2)}
                >
                  <Icon
                    glyph="star"
                    size={2.5}
                    color={
                      this.state.bathroomScore >= 2
                        ? colors.primary
                        : colors.grey
                    }
                  />
                </ScoreButton>
                <ScoreButton
                  disabled={this.props.sendingRequest}
                  onClick={() => this.changeBathroomScore(3)}
                >
                  <Icon
                    glyph="star"
                    size={2.5}
                    color={
                      this.state.bathroomScore >= 3
                        ? colors.primary
                        : colors.grey
                    }
                  />
                </ScoreButton>
                <ScoreButton
                  disabled={this.props.sendingRequest}
                  onClick={() => this.changeBathroomScore(4)}
                >
                  <Icon
                    glyph="star"
                    size={2.5}
                    color={
                      this.state.bathroomScore >= 4
                        ? colors.primary
                        : colors.grey
                    }
                  />
                </ScoreButton>
                <ScoreButton
                  disabled={this.props.sendingRequest}
                  onClick={() => this.changeBathroomScore(5)}
                >
                  <Icon
                    glyph="star"
                    size={2.5}
                    color={
                      this.state.bathroomScore === 5
                        ? colors.primary
                        : colors.grey
                    }
                  />
                </ScoreButton>
              </ScoreWrapper>
            </MainReviewColumn>
          </MainReviewsWrapper>
        */}
          {/* <FormInputWrapper>
            <FormInput
              id="comments"
              type="textarea"
              label={formatMessage(messages.comments)}
              placeholder={formatMessage(messages.commentsPlaceholder)}
              value={this.state.comments}
              handler={this.changeComments}
              error={{
                message: this.props.errors.comments,
                options: ['Should be less than 301 characters'],
                values: [formatMessage(messages.commentsError)]
              }}
              onInputFocus={() => this.props.clearError('comments')}
            />
          </FormInputWrapper>

          {this.props.photo
            ? null
            : [
                <Button
                  key="button"
                  backgroundColor={colors.secondary}
                  color="white"
                  disabled={this.props.sendingRequest}
                  onClickHandler={() => this.fileInput.click()}
                >
                  {formatMessage(messages.addPhotoButton)}
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
                  onChange={event => this.handlePhoto(event)}
                  onClick={event => {
                    event.target.value = null
                  }}
                />
              ]}

          {this.props.photo ? (
            <Photo style={{ backgroundImage: `url("${this.props.photo}")` }}>
              <RemovePhotoButton
                disabled={this.props.sendingRequest}
                onClick={this.props.deletePhoto}
              >
                <Icon glyph="cross" size={1} />
              </RemovePhotoButton>
            </Photo>
          ) : null}
           */}

          {this.state.activeEvents.length > 1
            ? [
              <Label
                key="label"
                style={{ marginTop: '1.5rem', maxWidth: '30rem' }}
              >
                {formatMessage(messages.selectedMapathonLabel)}
              </Label>,
              <SelectBox
                key="selectBox"
                value={this.state.selectedEvent}
                options={this.state.activeEvents}
                borderColor={colors.darkGrey}
                onFocusBorderColor={colors.secondary}
                style={{ maxWidth: '30rem' }}
                handleValueChange={this.handleActiveEvents}
              />
              ]
            : null}

          {this.state.teams.length > 1
            ? [
              <Label
                key="label"
                style={{ marginTop: '1.5rem', maxWidth: '30rem' }}
              >
                {formatMessage(messages.selectedTeamLabel)}
              </Label>,
              <SelectBox
                key="selectBox"
                value={this.state.selectedTeam}
                options={this.state.teams}
                borderColor={colors.darkGrey}
                onFocusBorderColor={colors.secondary}
                style={{ maxWidth: '30rem' }}
                handleValueChange={this.handleTeams}
              />
              ]
            : null}
        </Wrapper>

        <ReviewButtons
          sendingRequest={this.props.sendingRequest}
          createReview={() => this.props.createReview(this.state)}
        />
      </Container>
    )
  }
}
