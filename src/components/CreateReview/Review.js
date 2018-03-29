/* eslint-disable no-param-reassign */

import { rgba, transparentize } from 'polished'
import { bool, func, object, string } from 'prop-types'
import React from 'react'
import { intlShape } from 'react-intl'
import styled from 'styled-components'

import Button from '../Button'
import Cnt from '../Container'
import FormInput from '../FormInput'
import Icon from '../Icon'
import SelectBox from '../SelectBox'
import { colors, media } from '../../styles'
import { getGeneralType, getReviewsRatioWeight } from '../../utilities'

import Header from './Header'
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

const MainReviewsWrapper = styled.div`
  display: flex;

  align-items: flex-start;
  flex-direction: column;
  justify-content: center;

  margin-bottom: 2rem;
  width: 100%;

  ${media.desktop`
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
  `};
`

const MainReviewColumn = styled.div`
  display: flex;

  align-items: center;
  flex-direction: column;
  justify-content: center;

  margin-bottom: 2rem;
  width: 100%;

  &:last-of-type {
    margin-bottom: 0;
  }

  ${media.desktop`
    margin-bottom: 0;
    width: 32%;
  `};
`

const Title = styled.h1`
  margin: 0 0 1rem 0;
  width: 100%;

  color: ${colors.darkestGrey};
  font-size: 1.2rem;
  font-weight: bold;
  text-align: center;
  text-transform: uppercase;
`

const ScoreWrapper = styled.div`
  display: flex;

  align-items: center;
  justify-content: center;

  width: 100%;
`

const ScoreBox = styled.div`
  display: flex;

  align-items: center;
  justify-content: center;

  border-radius: 3px;
  height: 3.5rem;
  margin-right: ${props => props.marginRight || '1rem'};
  width: 3.5rem;

  background-color: ${props => props.backgroundColor};
`

const ReviewsWrapper = styled.div`
  display: flex;

  flex-wrap: wrap;
  justify-content: space-between;

  margin-bottom: 2rem;
  width: 100%;
`

const ReviewColumn = styled.div`
  display: flex;

  align-items: center;
  flex-direction: column;
  justify-content: flex-start;

  margin-bottom: 1rem;
  width: 100%;

  &:last-of-type {
    margin-bottom: 0;
  }

  ${media.tablet`
    width: 49%;

    &:nth-last-child(-n + 2) {
      margin-bottom: 0;
    }
  `};

  ${media.desktop`
    width: 32%;

    &:nth-last-child(-n + 3) {
      margin-bottom: 0;
    }
  `};
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

const ScoreButton = styled.button`${mainReviewButtonStyles};`

const StepButton = styled.button`
  ${mainReviewButtonStyles};
  width: 3rem;
`

const YesButton = styled(Button)`
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
  width: 5rem;

  background-color: ${props => props.backgroundColor};

  color: white;
`

const NoButton = styled(Button)`
  border-radius: 0;
  width: 5rem;

  background-color: ${props => props.backgroundColor};

  color: white;
`

const DontKnowButton = styled(Button)`
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
  width: 5rem;

  background-color: ${props => props.backgroundColor};

  color: white;
`

const FormInputWrapper = styled.div`
  width: 100%;
  max-width: 30rem;
`

const Photo = styled.div`
  position: relative;

  border-radius: 3px;
  height: 14rem;
  width: 16rem;

  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  ${media.tablet`
    height: 16rem;
    width: 18rem;
  `};

  ${media.desktop`
    height: 18rem;
    width: 20rem;
  `};

  ${media.widescreen`
    height: 20rem;
    width: 22rem;
  `};
`

const RemovePhotoButton = styled.button`
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
    photo: string.isRequired,
    sendingRequest: bool.isRequired,
    setNotificationMessage: func.isRequired,
    createPhoto: func.isRequired,
    deletePhoto: func.isRequired,
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
    comments: '',
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

  changeEntryScore = entryScore => {
    if (entryScore === this.state.entryScore) {
      this.setState({ entryScore: null })
      this.setState({ entryScoreColor: colors.grey })
    } else {
      this.setState({ entryScore })

      if (entryScore === 1 || entryScore === 2)
        this.setState({ entryScoreColor: colors.alert })
      else if (entryScore === 3)
        this.setState({ entryScoreColor: colors.warning })
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
        this.setState({ stepsColor: colors.warning })
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
        this.setState({ bathroomScoreColor: colors.warning })
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

  changeComments = event => {
    this.setState({ comments: event.target.value })
  }

  handlePhoto = event => {
    this.props.setNotificationMessage('')

    const photoFile = event.target.files[0]
    if (photoFile.size > 8388608) {
      this.props.setNotificationMessage(
        'axsmap.components.CreateReview.fileSizeError'
      )
      return
    }

    const data = new FormData()
    data.append('photo', photoFile)
    data.append('isWide', true)

    this.props.createPhoto(data)
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
      steps: this.props.venue.steps
    }
    const reviewsRatioWeight = getReviewsRatioWeight(reviewData)
    const generalType = getGeneralType(this.props.venue.types)

    return (
      <Container>
        <Header
          reviewsRatioWeight={reviewsRatioWeight}
          generalType={generalType}
          coverPhoto={this.props.venue.coverPhoto}
          name={this.props.venue.name}
        />

        <Wrapper>
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

          <ReviewsWrapper>
            <ReviewColumn>
              <Title>{formatMessage(messages.guideDogTitle)}</Title>
              <ScoreWrapper>
                <ScoreBox backgroundColor={this.state.allowsGuideDogColor}>
                  <Icon glyph="guideDog" size={2.5} />
                </ScoreBox>
                <YesButton
                  backgroundColor={
                    this.state.allowsGuideDog
                      ? colors.success
                      : transparentize(0.5, colors.success)
                  }
                  disabled={this.props.sendingRequest}
                  onClick={() => this.changeReview('allowsGuideDog', true)}
                >
                  {formatMessage(messages.yesButton)}
                </YesButton>
                <NoButton
                  backgroundColor={
                    this.state.allowsGuideDog === false
                      ? colors.alert
                      : transparentize(0.5, colors.alert)
                  }
                  disabled={this.props.sendingRequest}
                  onClick={() => this.changeReview('allowsGuideDog', false)}
                >
                  {formatMessage(messages.noButton)}
                </NoButton>
                <DontKnowButton
                  backgroundColor={
                    this.state.allowsGuideDog === null
                      ? colors.grey
                      : transparentize(0.5, colors.grey)
                  }
                  disabled={this.props.sendingRequest}
                  onClick={() => this.changeReview('allowsGuideDog', null)}
                >
                  ?
                </DontKnowButton>
              </ScoreWrapper>
            </ReviewColumn>

            <ReviewColumn>
              <Title>{formatMessage(messages.parkingTitle)}</Title>
              <ScoreWrapper>
                <ScoreBox backgroundColor={this.state.hasParkingColor}>
                  <Icon glyph="parking" size={2.5} />
                </ScoreBox>
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
                <DontKnowButton
                  backgroundColor={
                    this.state.hasParking === null
                      ? colors.grey
                      : transparentize(0.5, colors.grey)
                  }
                  disabled={this.props.sendingRequest}
                  onClick={() => this.changeReview('hasParking', null)}
                >
                  ?
                </DontKnowButton>
              </ScoreWrapper>
            </ReviewColumn>

            <ReviewColumn>
              <Title>{formatMessage(messages.secondEntryTitle)}</Title>
              <ScoreWrapper>
                <ScoreBox backgroundColor={this.state.hasSecondEntryColor}>
                  <Icon glyph="secondEntry" size={2.5} />
                </ScoreBox>
                <YesButton
                  backgroundColor={
                    this.state.hasSecondEntry
                      ? colors.success
                      : transparentize(0.5, colors.success)
                  }
                  disabled={this.props.sendingRequest}
                  onClick={() => this.changeReview('hasSecondEntry', true)}
                >
                  {formatMessage(messages.yesButton)}
                </YesButton>
                <NoButton
                  backgroundColor={
                    this.state.hasSecondEntry === false
                      ? colors.alert
                      : transparentize(0.5, colors.alert)
                  }
                  disabled={this.props.sendingRequest}
                  onClick={() => this.changeReview('hasSecondEntry', false)}
                >
                  {formatMessage(messages.noButton)}
                </NoButton>
                <DontKnowButton
                  backgroundColor={
                    this.state.hasSecondEntry === null
                      ? colors.grey
                      : transparentize(0.5, colors.grey)
                  }
                  disabled={this.props.sendingRequest}
                  onClick={() => this.changeReview('hasSecondEntry', null)}
                >
                  ?
                </DontKnowButton>
              </ScoreWrapper>
            </ReviewColumn>

            <ReviewColumn>
              <Title>{formatMessage(messages.wellLitTitle)}</Title>
              <ScoreWrapper>
                <ScoreBox backgroundColor={this.state.hasWellLitColor}>
                  <Icon glyph="light" size={2.5} />
                </ScoreBox>
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
                <DontKnowButton
                  backgroundColor={
                    this.state.hasWellLit === null
                      ? colors.grey
                      : transparentize(0.5, colors.grey)
                  }
                  disabled={this.props.sendingRequest}
                  onClick={() => this.changeReview('hasWellLit', null)}
                >
                  ?
                </DontKnowButton>
              </ScoreWrapper>
            </ReviewColumn>

            <ReviewColumn>
              <Title>{formatMessage(messages.quietTitle)}</Title>
              <ScoreWrapper>
                <ScoreBox backgroundColor={this.state.isQuietColor}>
                  <Icon glyph="sound" size={2.5} />
                </ScoreBox>
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
                <DontKnowButton
                  backgroundColor={
                    this.state.isQuiet === null
                      ? colors.grey
                      : transparentize(0.5, colors.grey)
                  }
                  disabled={this.props.sendingRequest}
                  onClick={() => this.changeReview('isQuiet', null)}
                >
                  ?
                </DontKnowButton>
              </ScoreWrapper>
            </ReviewColumn>

            <ReviewColumn>
              <Title>{formatMessage(messages.spaciousTitle)}</Title>
              <ScoreWrapper>
                <ScoreBox backgroundColor={this.state.isSpaciousColor}>
                  <Icon glyph="space" size={2.5} />
                </ScoreBox>
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
                <DontKnowButton
                  backgroundColor={
                    this.state.isSpacious === null
                      ? colors.grey
                      : transparentize(0.5, colors.grey)
                  }
                  disabled={this.props.sendingRequest}
                  onClick={() => this.changeReview('isSpacious', null)}
                >
                  ?
                </DontKnowButton>
              </ScoreWrapper>
            </ReviewColumn>
          </ReviewsWrapper>

          <FormInputWrapper>
            <FormInput
              id="comments"
              type="textarea"
              label={formatMessage(messages.comments)}
              placeholder={formatMessage(messages.commentsPlaceholder)}
              value={this.state.comments}
              handler={this.changeComments}
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

          {this.state.activeEvents.length > 1
            ? [
                <Label key="label" style={{ marginTop: '1.5rem' }}>
                  {formatMessage(messages.selectedMapathonLabel)}
                </Label>,
                <SelectBox
                  key="selectBox"
                  value={this.state.selectedEvent}
                  options={this.state.activeEvents}
                  borderColor={colors.darkGrey}
                  onFocusBorderColor={colors.secondary}
                  handleValueChange={this.handleActiveEvents}
                />
              ]
            : null}

          {this.state.teams.length > 1
            ? [
                <Label key="label" style={{ marginTop: '1.5rem' }}>
                  {formatMessage(messages.selectedTeamLabel)}
                </Label>,
                <SelectBox
                  key="selectBox"
                  value={this.state.selectedTeam}
                  options={this.state.teams}
                  borderColor={colors.darkGrey}
                  onFocusBorderColor={colors.secondary}
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
