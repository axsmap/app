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
  line-height: 1.5;
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
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
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
  margin: 1rem 0;
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
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
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
  bottom: 0rem;
  top: 62.5vh;
  position: absolute;
  display: block;
  padding: 1.375rem 0 0.75rem 0;
  width: 100%;
  text-transform: uppercase;
  text-align: center;
  font-size: ${fontSize.xs};
  font-weight: ${fontWeight.semibold};

  ${media.tablet`
      bottom: 0rem;
      top: 50.5vh;
    `};

  ${media.desktop`
      bottom: 0rem;
      top: 51.5vh;
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
    right: 33% !important;
  `};
`

const YesButton = styled(Button)`
  border-radius: 5px;
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

  ${media.desktop`
    margin: 2.5rem auto 0 auto;
  `};
`

const NoButton = styled(Button)`
  border-radius: 5px;
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
  width: 30px;
  height: 30px;
  border-radius: 50px;
  border: 2px solid ${colors.primary};
  background-color: ${colors.textColor};
  position: absolute;
  top: 7px;
  right: 8px;
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
    hasSwingInDoor: null,
    hasSwingOutDoor: null,
    hasLargeStall: null,
    hasTallSinks: null,
    hasLoweredSinks: null
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
    const { formatMessage } = this.context.intl
    const maxEntryDetails = 9
    const maxBathroomDetails = 5
    const maxInteriorDetails = 7

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
                <Name>{this.props.venue.name}</Name>
                <OverlayButton>
                  <Button
                    onClick={this.props.onClickHandler}
                    className="primary-btn--alt"
                  >
                    Trigger how to rate modal
                  </Button>
                </OverlayButton>
              </DarkHeader>
              <Content>
                <Grid>
                  <Grid.Unit
                    size={{ mobile: 1 / 1, tablet: 1 / 1, desktop: 9 / 12 }}
                    className="mx-auto"
                  >
                    <CarouselProvider
                      naturalSlideWidth={100}
                      naturalSlideHeight={90}
                      totalSlides={21}
                      visibleSlides={1}
                      data-carousel="addReview"
                      className="carousel--lg"
                      dragEnabled={false}
                    >
                      <Slider>
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
                                alt="permanent ramp"
                                color={colors.black}
                              />
                            </ScoreBox>
                            <ScoreDescription>
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
                                    this.changeReview('hasPermanentRamp', true)}
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
                                    this.changeReview('hasPermanentRamp', false)}
                                >
                                  {formatMessage(messages.noButton)}
                                </NoButton>
                              </Grid.Unit>
                            </Grid>

                            <Caption>
                              {' '}
                              {formatMessage(messages.entryTitle)}
                              {' '}
1/9
                            </Caption>
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
                              <Title>
                                {formatMessage(messages.portableRampTitle)}
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
                                    this.changeReview('hasPortableRamp', true)}
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
                                    this.changeReview('hasPortableRamp', false)}
                                >
                                  {formatMessage(messages.noButton)}
                                </NoButton>
                              </Grid.Unit>
                            </Grid>

                            <Caption>
                              {' '}
                              {formatMessage(messages.entryTitle)}
                              {' '}
2/9
                            </Caption>
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
                                alt="steps"
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
                                    this.state.steps === 0
                                      ? colors.primary
                                      : colors.white
                                  }
                                />
                              </StepButton>
                            </ScoreBox>
                            <ScoreDescription>
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
                                    this.state.has0Steps
                                      ? colors.primary
                                      : colors.gray500
                                  }
                                  textColor={
                                    this.state.has0Steps === true
                                      ? colors.textColor
                                      : colors.white
                                  }
                                  disabled={this.props.sendingRequest}
                                  onClick={() =>
                                    this.changeReview('has0Steps', true)}
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
                                    this.state.has0Steps === false
                                      ? colors.primary
                                      : colors.gray500
                                  }
                                  textColor={
                                    this.state.has0Steps === false
                                      ? colors.textColor
                                      : colors.white
                                  }
                                  disabled={this.props.sendingRequest}
                                  onClick={() =>
                                    this.changeReview('has0Steps', false)}
                                >
                                  {formatMessage(messages.noButton)}
                                </NoButton>
                              </Grid.Unit>
                            </Grid>

                            <Caption>
                              {' '}
                              {formatMessage(messages.entryTitle)}
                              {' '}
3/
                              {maxEntryDetails}
                            </Caption>
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
                                  color={colors.white}
                                />
                              </StepButton>
                            </ScoreBox>
                            <ScoreDescription>
                              <Title>
                                {formatMessage(messages.oneStepTitle)}
                              </Title>
                              <Description>
                                {formatMessage(messages.oneStepDescription)}
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
                                  disabled={this.props.sendingRequest}
                                  onClick={() =>
                                    this.changeReview('has1Step', true)}
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
                                    this.state.has1Step === false
                                      ? colors.primary
                                      : colors.gray500
                                  }
                                  textColor={
                                    this.state.has1Step === false
                                      ? colors.textColor
                                      : colors.white
                                  }
                                  disabled={this.props.sendingRequest}
                                  onClick={() =>
                                    this.changeReview('has1Step', false)}
                                >
                                  {formatMessage(messages.noButton)}
                                </NoButton>
                              </Grid.Unit>
                            </Grid>

                            <Caption>
                              {' '}
                              {formatMessage(messages.entryTitle)}
                              {' '}
4/
                              {maxEntryDetails}
                            </Caption>
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
                                  color={colors.white}
                                />
                              </StepButton>
                            </ScoreBox>
                            <ScoreDescription>
                              <Title>
                                {formatMessage(messages.twoStepsTitle)}
                              </Title>
                              <Description>
                                {formatMessage(messages.twoStepsDescription)}
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
                                    this.state.has2Steps === true
                                      ? colors.textColor
                                      : colors.white
                                  }
                                  disabled={this.props.sendingRequest}
                                  onClick={() =>
                                    this.changeReview('has2Steps', true)}
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
                                    this.state.has2Steps === false
                                      ? colors.primary
                                      : colors.gray500
                                  }
                                  textColor={
                                    this.state.has2Steps === false
                                      ? colors.textColor
                                      : colors.white
                                  }
                                  disabled={this.props.sendingRequest}
                                  onClick={() =>
                                    this.changeReview('has2Steps', false)}
                                >
                                  {formatMessage(messages.noButton)}
                                </NoButton>
                              </Grid.Unit>
                            </Grid>

                            <Caption>
                              {' '}
                              {formatMessage(messages.entryTitle)}
                              {' '}
5/
                              {maxEntryDetails}
                            </Caption>
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
                                    this.state.steps === 0
                                      ? colors.primary
                                      : colors.white
                                  }
                                />
                              </StepButton>
                            </ScoreBox>
                            <ScoreDescription>
                              <Title>
                                {formatMessage(messages.threeStepsTitle)}
                              </Title>
                              <Description>
                                {formatMessage(messages.threeStepsDescription)}
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
                                    this.state.has3Steps === true
                                      ? colors.textColor
                                      : colors.white
                                  }
                                  disabled={this.props.sendingRequest}
                                  onClick={() =>
                                    this.changeReview('has3Steps', true)}
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
                                    this.state.has3Steps === false
                                      ? colors.primary
                                      : colors.gray500
                                  }
                                  textColor={
                                    this.state.has3Steps === false
                                      ? colors.textColor
                                      : colors.white
                                  }
                                  disabled={this.props.sendingRequest}
                                  onClick={() =>
                                    this.changeReview('has3Steps', false)}
                                >
                                  {formatMessage(messages.noButton)}
                                </NoButton>
                              </Grid.Unit>
                            </Grid>

                            <Caption>
                              {' '}
                              {formatMessage(messages.entryTitle)}
                              {' '}
6/
                              {maxEntryDetails}
                            </Caption>
                          </ScoreWrapper>
                        </Slide>
                        <Slide index={6}>
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
                              <Title>
                                {formatMessage(messages.reservedParkingTitle)}
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
                                    this.changeReview('hasParking', true)}
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
                                    this.changeReview('hasParking', false)}
                                >
                                  {formatMessage(messages.noButton)}
                                </NoButton>
                              </Grid.Unit>
                            </Grid>
                            <Caption>
                              {' '}
                              {formatMessage(messages.entryTitle)}
                              {' '}
7/
                              {maxEntryDetails}
                            </Caption>
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
                              <Title>
                                {formatMessage(messages.secondEntryTitle)}
                              </Title>
                              <Description>
                                {formatMessage(messages.secondEntryDescription)}
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
                                    this.changeReview('hasSecondEntry', true)}
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
                                    this.changeReview('hasSecondEntry', false)}
                                >
                                  {formatMessage(messages.noButton)}
                                </NoButton>
                              </Grid.Unit>
                            </Grid>
                            <Caption>
                              {' '}
                              {formatMessage(messages.entryTitle)}
                              {' '}
8/
                              {maxEntryDetails}
                            </Caption>
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
                                    this.changeReview('hasWideEntrance', true)}
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
                                    this.changeReview('hasWideEntrance', false)}
                                >
                                  {formatMessage(messages.noButton)}
                                </NoButton>
                              </Grid.Unit>
                            </Grid>
                            <Caption>
                              {' '}
                              {formatMessage(messages.entryTitle)}
                              {' '}
9/
                              {maxEntryDetails}
                            </Caption>
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
                              <Title>
                                {formatMessage(messages.roomToMoveTitle)}
                              </Title>
                              <Description>
                                {formatMessage(messages.roomToMoveDescription)}
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
                                    this.changeReview('isSpacious', true)}
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
                                    this.changeReview('isSpacious', false)}
                                >
                                  {formatMessage(messages.noButton)}
                                </NoButton>
                              </Grid.Unit>
                            </Grid>
                            <Caption>
                              {formatMessage(messages.stepsTitle)}
                              {' '}
1/
                              {maxInteriorDetails}
                            </Caption>
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
                                    this.state.hasAccessibleTableHeight === true
                                      ? colors.textColor
                                      : colors.white
                                  }
                                  disabled={this.props.sendingRequest}
                                  onClick={() =>
                                    this.changeReview(
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
                                    this.changeReview(
                                      'hasAccessibleTableHeight',
                                      false
                                    )}
                                >
                                  {formatMessage(messages.noButton)}
                                </NoButton>
                              </Grid.Unit>
                            </Grid>
                            <Caption>
                              {formatMessage(messages.stepsTitle)}
                              {' '}
2/
                              {maxInteriorDetails}
                            </Caption>
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
                              <Title>
                                {formatMessage(messages.brightLightTitle)}
                              </Title>
                              <Description>
                                {formatMessage(messages.brightLightDescription)}
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
                                    this.changeReview('hasWellLit', true)}
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
                                    this.changeReview('hasWellLit', false)}
                                >
                                  {formatMessage(messages.noButton)}
                                </NoButton>
                              </Grid.Unit>
                            </Grid>
                            <Caption>
                              {formatMessage(messages.stepsTitle)}
                              {' '}
3/
                              {maxInteriorDetails}
                            </Caption>
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
                              <Title>
                                {formatMessage(messages.highNoiseLevelTitle)}
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
                                    this.changeReview('isQuiet', true)}
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
                                    this.changeReview('isQuiet', false)}
                                >
                                  {formatMessage(messages.noButton)}
                                </NoButton>
                              </Grid.Unit>
                            </Grid>
                            <Caption>
                              {formatMessage(messages.stepsTitle)}
                              {' '}
4/
                              {maxInteriorDetails}
                            </Caption>
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
                              <Title>
                                {formatMessage(messages.guideDogTitle)}
                              </Title>
                              <Description>
                                {formatMessage(messages.guideDogDescription)}
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
                                    this.changeReview('allowsGuideDog', true)}
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
                                    this.changeReview('allowsGuideDog', false)}
                                >
                                  {formatMessage(messages.noButton)}
                                </NoButton>
                              </Grid.Unit>
                            </Grid>
                            <Caption>
                              {formatMessage(messages.stepsTitle)}
                              {' '}
5/
                              {maxInteriorDetails}
                            </Caption>
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
                                    this.state.hasAccessibleElevator === true
                                      ? colors.textColor
                                      : colors.white
                                  }
                                  disabled={this.props.sendingRequest}
                                  onClick={() =>
                                    this.changeReview(
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
                                    this.state.hasAccessibleElevator === false
                                      ? colors.primary
                                      : colors.gray500
                                  }
                                  textColor={
                                    this.state.hasAccessibleElevator === false
                                      ? colors.textColor
                                      : colors.white
                                  }
                                  disabled={this.props.sendingRequest}
                                  onClick={() =>
                                    this.changeReview(
                                      'hasAccessibleElevator',
                                      false
                                    )}
                                >
                                  {formatMessage(messages.noButton)}
                                </NoButton>
                              </Grid.Unit>
                            </Grid>
                            <Caption>
                              {formatMessage(messages.stepsTitle)}
                              {' '}
6/
                              {maxInteriorDetails}
                            </Caption>
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
                                    this.changeReview('hasInteriorRamp', true)}
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
                                    this.changeReview('hasInteriorRamp', false)}
                                >
                                  {formatMessage(messages.noButton)}
                                </NoButton>
                              </Grid.Unit>
                            </Grid>
                            <Caption>
                              {formatMessage(messages.stepsTitle)}
                              {' '}
7/
                              {maxInteriorDetails}
                            </Caption>
                          </ScoreWrapper>
                        </Slide>
                        {/* Restroom */}
                        <Slide index={16}>
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
                              <Title>
                                {formatMessage(messages.doorSwingsInTitle)}
                              </Title>
                              <Description>
                                {formatMessage(
                                  messages.doorSwingsInDescription
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
                                    this.state.hasSwingInDoor
                                      ? colors.primary
                                      : colors.gray500
                                  }
                                  textColor={
                                    this.state.hasSwingInDoor === true
                                      ? colors.textColor
                                      : colors.white
                                  }
                                  disabled={this.props.sendingRequest}
                                  onClick={() =>
                                    this.changeReview('hasSwingInDoor', true)}
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
                                    this.state.hasSwingInDoor === false
                                      ? colors.primary
                                      : colors.gray500
                                  }
                                  textColor={
                                    this.state.hasSwingInDoor === false
                                      ? colors.textColor
                                      : colors.white
                                  }
                                  disabled={this.props.sendingRequest}
                                  onClick={() =>
                                    this.changeReview('hasSwingInDoor', false)}
                                >
                                  {formatMessage(messages.noButton)}
                                </NoButton>
                              </Grid.Unit>
                            </Grid>
                            <Caption>
                              {formatMessage(messages.bathroomTitle)}
                              {' '}
1/
                              {maxBathroomDetails}
                            </Caption>
                          </ScoreWrapper>
                        </Slide>
                        <Slide index={17}>
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
                                    this.changeReview('hasSwingOutDoor', true)}
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
                                    this.changeReview('hasSwingOutDoor', false)}
                                >
                                  {formatMessage(messages.noButton)}
                                </NoButton>
                              </Grid.Unit>
                            </Grid>
                            <Caption>
                              {formatMessage(messages.bathroomTitle)}
                              {' '}
2/
                              {maxBathroomDetails}
                            </Caption>
                          </ScoreWrapper>
                        </Slide>
                        <Slide index={18}>
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
                              <Title>
                                {formatMessage(messages.largeStallsTitle)}
                              </Title>
                              <Description>
                                {formatMessage(messages.largeStallsDescription)}
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
                                    this.changeReview('hasLargeStall', true)}
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
                                    this.changeReview('hasLargeStall', false)}
                                >
                                  {formatMessage(messages.noButton)}
                                </NoButton>
                              </Grid.Unit>
                            </Grid>
                            <Caption>
                              {formatMessage(messages.bathroomTitle)}
                              {' '}
3/
                              {maxBathroomDetails}
                            </Caption>
                          </ScoreWrapper>
                        </Slide>
                        <Slide index={19}>
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
                              <Title>
                                {formatMessage(messages.tallSinksTitle)}
                              </Title>
                              <Description>
                                {formatMessage(messages.tallSinksDescription)}
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
                                    this.state.hasTallSinks
                                      ? colors.primary
                                      : colors.gray500
                                  }
                                  textColor={
                                    this.state.hasTallSinks === true
                                      ? colors.textColor
                                      : colors.white
                                  }
                                  disabled={this.props.sendingRequest}
                                  onClick={() =>
                                    this.changeReview('hasTallSinks', true)}
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
                                    this.state.hasTallSinks === false
                                      ? colors.primary
                                      : colors.gray500
                                  }
                                  textColor={
                                    this.state.hasTallSinks === false
                                      ? colors.textColor
                                      : colors.white
                                  }
                                  disabled={this.props.sendingRequest}
                                  onClick={() =>
                                    this.changeReview('hasTallSinks', false)}
                                >
                                  {formatMessage(messages.noButton)}
                                </NoButton>
                              </Grid.Unit>
                            </Grid>
                            <Caption>
                              {formatMessage(messages.bathroomTitle)}
                              {' '}
4/
                              {maxBathroomDetails}
                            </Caption>
                          </ScoreWrapper>
                        </Slide>
                        <Slide index={20}>
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
                                    this.changeReview('hasLoweredSinks', true)}
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
                                    this.changeReview('hasLoweredSinks', false)}
                                >
                                  {formatMessage(messages.noButton)}
                                </NoButton>
                              </Grid.Unit>
                            </Grid>
                            <Caption>
                              {formatMessage(messages.bathroomTitle)}
                              {' '}
5/
                              {maxBathroomDetails}
                            </Caption>
                          </ScoreWrapper>
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

                    <ReviewButtons
                      sendingRequest={this.props.sendingRequest}
                      createReview={() => this.props.createReview(this.state)}
                    />
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
