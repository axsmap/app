import { forOwn } from 'lodash'
import { number, shape, string } from 'prop-types'
import React from 'react'
import { intlShape } from 'react-intl'
import styled from 'styled-components'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
// import { Collapse } from "reactstrap";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext
} from 'pure-react-carousel'
import 'pure-react-carousel/dist/react-carousel.es.css'

import Icon from '../Icon'
import { colors, media, fonts, fontWeight, fontSize } from '../../styles'

import messages from './messages'
// import Button from '../Button'

const MainReviewColumn = styled.div`
  display: block;
  position: relative;

  align-items: center;
  flex-direction: column;
  justify-content: center;

  margin-bottom: 0;
  width: 100%;
  border: 1px solid #e3e1e0;
  border-left: none;
`

const Title = styled.h1`
  margin: 0 0;
  padding: 0.5rem 0;
  width: 100%;

  color: ${colors.white} !important;
  font-family: ${fonts.primary} !important;
  font-size: ${fontSize.sm};
  font-weight: ${fontWeight.semibold}!important;
  text-align: center;
  text-transform: uppercase;
  border-bottom: 1px solid black;
  background: ${colors.black};
`

const SectionTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.darkestGrey};
  font-family: ${fonts.primary} !important;
  font-size: ${fontSize.sm};
  font-weight: ${fontWeight.bold}!important;
  text-align: center;
  width: 100%;
  text-transform: uppercase;
  margin-bottom: 15px;
`

const ScoreWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`

const SectionWrapper = styled.div`
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
  height: 125px
  margin-right: 0px;
  width: 100%;
  background-color: ${colors.white};
  color: ${colors.buttonColor};
  text-align: center;
  position: relative;
`

const ScoreStar = styled(Icon)`
  margin-right: 0.8rem;

  &:last-of-type {
    margin-right: 0;
  }
`

const Count = styled.p`
  margin: 5px 0 0 0;
  width: 100%;
  display: block;
  color: ${colors.black};
  font-size: ${fontSize.base};
  font-weight: ${fontWeight.semibold};
  text-align: center;
  position: relative;
`

const StepsCount = styled.p`
  margin: 0;
  font-size: 1.2rem;
  font-weight: bold;
  text-align: center;
`

const ReviewsWrapper = styled.div`
  display: flex;

  flex-wrap: wrap;
  justify-content: space-between;

  width: 100%;
  text-align: center;
  font-size: 1rem;
  font-family: ${fonts.primary};
  padding: 25px 15px;
`

// const ReviewColumn = styled.div`
//   display: flex;

//   align-items: center;
//   flex-direction: column;
//   justify-content: flex-start;

//   margin-bottom: 1rem;
//   width: 100%;

//   &:nth-last-child(-n + 2) {
//     margin-bottom: 0;
//   }

//   ${media.tablet`

//     &:nth-last-child(-n + 3) {
//       margin-bottom: 0;
//     }
//   `};

//   ${media.desktop`
//     margin-bottom: 0;
//     width: auto;
//   `};
// `
const SectionDefault = styled.div`
  display: block;
  position: relative;
  text-align: center;
  font-family: ${fonts.primary};
  font-size: ${fontSize.xs};
  margin: 0 auto;
  padding: 5%;
`

const Caption = styled.div`
  display: block;
  text-transform: uppercase;
  text-align: center;
  font-family: ${fonts.primary};
  font-size: ${fontSize.xs};
  font-weight: ${fontWeight.semibold};
`
const ScoreDescription = styled.div`
  display: block;
  text-align: center;
  padding: 5px 15px;
  width: auto;

  ${media.desktop`
    width: 85%;
    margin: 0 auto;
  `};
`
const Collapsible = styled.div`
  display: block;
  position: relative;
  width: 100%;
  text-align: center;
  font-family: ${fonts.primary};
  font-size: ${fontSize.xs};
  font-weight: ${fontWeight.medium};
  text-decoration: underline;
  text-transform: uppercase;
`

const CollapsedContent = styled.div`
  display: block;
  position: relative;
  width: 100%;
  text-align: center;
`

const CollapsedTitle = styled.div`
  display: block;
  position: relative;
  width: 100%;
  text-align: center;
  font-size: ${fontSize.sm};
  font-weight: ${fontWeight.bold};
  text-transform: uppercase;
`
const CollapsedDescription = styled.div`
  display: block;
  position: relative;
  width: 100%;
  text-align: center;
  font-family: ${fonts.tertiary};
  font-size: ${fontSize.base};
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
`;

const StepButton = styled.div`
  ${mainReviewButtonStyles};
  width: 130px;
  text-align: center;
  position: absolute !important;
  top: 16% !important;
  right: 28% !important;

  ${media.desktop`
    top: 21% !important;
    right: 39% !important;
  `};
`;

export default class DetailsScores extends React.Component {
  static propTypes = {
    entryScore: number,
    entryReviews: number,
    bathroomScore: number,
    bathroomReviews: number,
    noReview: string,
    steps: shape({
      zero: number,
      one: number,
      two: number,
      moreThanTwo: number
    }),
    allowsGuideDog: shape({
      yes: number,
      no: number
    }),
    hasParking: shape({
      yes: number,
      no: number
    }),
    hasSecondEntry: shape({
      yes: number,
      no: number
    }),
    hasWellLit: shape({
      yes: number,
      no: number
    }),
    isQuiet: shape({
      yes: number,
      no: number
    }),
    isSpacious: shape({
      yes: number,
      no: number
    })
  }

  static contextTypes = {
    intl: intlShape
  }

  state = {
    section: 0,
    expandPermanentRamp: false
  }

  componentWillMount() {
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
  }

  changeSection = value => {
    let sectionSelected
    if (value === 'interior') sectionSelected = 2
    else if (value === 'restroom') sectionSelected = 3
    else if (value === 'entry') sectionSelected = 1
    else sectionSelected = 0

    this.setState({
      section: parseInt(sectionSelected)
    })
  }

  toggleVisibility = value => {}

  render() {
    const formatMessage = this.context.intl.formatMessage

    let entryScoreBox = (
      <ScoreBox>
        <Button onClick={() => this.changeSection('entry')}>
          <Icon
            glyph="entrylg"
            size={4}
            alt="Entrance"
            color={colors.buttonColor}
          />
        </Button>
      </ScoreBox>
    )
    if (this.props.entryScore >= 1 && this.props.entryScore < 3)
      entryScoreBox = (
        <ScoreBox
          backgroundColor={colors.ratingAlert}
          textColor={colors.black}
          className={`score_alert ${
            this.state.section === 1 ? 'is-active-score' : ''
          }`}
        >
          <Button onClick={() => this.changeSection('entry')}>
            <Icon
              glyph="entrylg"
              size={4}
              className="fill-current text-black"
              color={colors.black}
              alt="Entrance"
            />
            {/*
          <Count>
            {formatMessage(messages.count, {
              count: this.props.entryReviews
            })}
          </Count>
           */}
          </Button>
        </ScoreBox>
      )
    else if (this.props.entryScore >= 3 && this.props.entryScore < 4)
      entryScoreBox = (
        <ScoreBox
          backgroundColor={colors.ratingCaution}
          textColor={colors.black}
          className={`score_caution ${
            this.state.section === 1 ? 'is-active-score' : ''
          }`}
        >
          <Button onClick={() => this.changeSection('entry')}>
            <Icon
              glyph="entrylg"
              size={4}
              className="fill-current text-black"
              color={colors.black}
              alt="Entrance"
            />
            {/*
          <Count>
            {formatMessage(messages.count, {
              count: this.props.entryReviews
            })}
          </Count>
          */}
          </Button>
        </ScoreBox>
      )
    else if (this.props.entryScore >= 4 && this.props.entryScore <= 5)
      entryScoreBox = (
        <ScoreBox
          backgroundColor={colors.ratingAccessible}
          textColor={colors.black}
          className={`score_accessible ${
            this.state.section === 1 ? 'is-active-score' : ''
          }`}
        >
          <Button onClick={() => this.changeSection('entry')}>
            <Icon
              glyph="entrylg"
              size={4}
              className="fill-current text-black"
              color={colors.black}
              alt="Entrance"
            />
            {/*
          <Count>
            {formatMessage(messages.count, {
              count: this.props.entryReviews
            })}
          </Count>
          */}
          </Button>
        </ScoreBox>
      )

    let bathroomScoreBox = (
      <ScoreBox>
        <Button onClick={() => this.changeSection('restroom')}>
          <Icon
            glyph="restroom"
            size={4}
            alt="Restroom"
            color={colors.buttonColor}
          />
        </Button>
      </ScoreBox>
    )
    if (this.props.bathroomScore >= 1 && this.props.bathroomScore < 3)
      bathroomScoreBox = (
        <ScoreBox
          backgroundColor={colors.ratingAlert}
          className={`score_alert ${
            this.state.section === 3 ? 'is-active-score' : ''
          }`}
        >
          <Button onClick={() => this.changeSection('restroom')}>
            <Icon
              glyph="restroom"
              size={4}
              className="fill-current text-black"
              color={colors.black}
              alt="Restroom"
            />
            {/*
          <Count>
            {formatMessage(messages.count, {
              count: this.props.bathroomReviews
            })}
          </Count>
          */}
          </Button>
        </ScoreBox>
      )
    else if (this.props.bathroomScore >= 3 && this.props.bathroomScore < 4)
      bathroomScoreBox = (
        <ScoreBox
          backgroundColor={colors.ratingCaution}
          className={`score_caution ${
            this.state.section === 3 ? 'is-active-score' : ''
          }`}
        >
          <Button onClick={() => this.changeSection('restroom')}>
            <Icon
              glyph="restroom"
              size={4}
              className="fill-current text-black"
              color={colors.black}
              alt="Restroom"
            />
            {/*
          <Count>
            {formatMessage(messages.count, {
              count: this.props.bathroomReviews
            })}
          </Count>
        */}
          </Button>
        </ScoreBox>
      )
    else if (this.props.bathroomScore >= 4 && this.props.bathroomScore <= 5)
      bathroomScoreBox = (
        <ScoreBox
          backgroundColor={colors.ratingAccessible}
          className={`score_accessible ${
            this.state.section === 3 ? 'is-active-score' : ''
          }`}
        >
          <Button onClick={() => this.changeSection('restroom')}>
            <Icon
              glyph="restroom"
              size={4}
              className="fill-current text-black"
              color={colors.black}
              alt="Restroom"
            />
            {/*
          <Count>
            {formatMessage(messages.count, {
              count: this.props.bathroomReviews
            })}
          </Count>
          */}
          </Button>
        </ScoreBox>
      )

    const maxScore = 5
    const entryScoreStars = []
    const bathroomScoreStars = []
    for (let i = 1; i <= maxScore; i += 1) {
      const YellowStar = (
        <ScoreStar
          key={i}
          glyph="star"
          size={2.5}
          color={colors.ratingCaution}
        />
      )
      const GreyStar = (
        <ScoreStar key={i} glyph="star" size={2.5} color={colors.grey} />
      )

      if (Math.floor(this.props.entryScore) >= i) {
        entryScoreStars.push(YellowStar)
      } else {
        entryScoreStars.push(GreyStar)
      }

      if (Math.floor(this.props.bathroomScore) >= i) {
        bathroomScoreStars.push(YellowStar)
      } else {
        bathroomScoreStars.push(GreyStar)
      }
    }

    let stepsCountColor = colors.grey
    let stepsNumber = 'stepsUnknown'
    let stepsReviews = 0
    const maxSteps = { value: 0, key: '' }
    forOwn(this.props.steps, (value, key) => {
      stepsReviews += value
      if (value > maxSteps.value) {
        maxSteps.value = value
        maxSteps.key = key
      }
    })
    let stepsScoreBox = (
      <ScoreBox
        className={`${this.state.section === 2 ? 'is-active-score' : ''}`}
      >
        <Button onClick={() => this.changeSection('interior')}>
          <Icon
            glyph="interior"
            size={7}
            alt="Interior"
            color={colors.buttonColor}
          />
        </Button>
      </ScoreBox>
    )
    if (maxSteps.key === 'zero') {
      stepsCountColor = colors.ratingAccessible
      stepsNumber = 'stepsZero'
      stepsScoreBox = (
        <ScoreBox
          backgroundColor={colors.ratingAccessible}
          className={`score_accessible ${
            this.state.section === 2 ? 'is-active-score' : ''
          }`}
        >
          <Button onClick={() => this.changeSection('interior')}>
            <Icon
              glyph="interior"
              size={7}
              className="fill-current text-black"
              color={colors.black}
              alt="Interior"
            />
            <Count>
              {formatMessage(messages.count, {
                count: stepsReviews
              })}
            </Count>
          </Button>
        </ScoreBox>
      )
    } else if (maxSteps.key === 'one' || maxSteps.key === 'two') {
      stepsNumber = maxSteps.key === 'one' ? 'stepsOne' : 'stepsTwo'
      stepsCountColor = colors.ratingCaution
      stepsScoreBox = (
        <ScoreBox
          backgroundColor={colors.ratingCaution}
          className={`score_caution ${
            this.state.section === 2 ? 'is-active-score' : ''
          }`}
        >
          <Button onClick={() => this.changeSection('interior')}>
            <Icon
              glyph="interior"
              size={7}
              className="fill-current text-black"
              color={colors.black}
              alt="Interior"
            />
            <Count>
              {formatMessage(messages.count, {
                count: stepsReviews
              })}
            </Count>
          </Button>
        </ScoreBox>
      )
    } else if (maxSteps.key === 'moreThanTwo') {
      stepsNumber = 'stepsMoreThanTwo'
      stepsCountColor = colors.ratingAlert
      stepsScoreBox = (
        <ScoreBox
          backgroundColor={colors.ratingAlert}
          className={`score_alert ${
            this.state.section === 2 ? 'is-active-score' : ''
          }`}
        >
          <Button onClick={() => this.changeSection('interior')}>
            <Icon
              glyph="interior"
              size={7}
              className="fill-current text-black"
              color={colors.black}
              alt="Interior"
            />
            {/*
          <Count>
            {formatMessage(messages.count, {
              count: stepsReviews
            })}
          </Count>
        */}
          </Button>
        </ScoreBox>
      )
    }

    const guideDogReviews =
      this.props.allowsGuideDog.yes + this.props.allowsGuideDog.no
    let guideDogScoreBox = (
      <ScoreBox className="bg-transparent"marginRight="0">
        <Icon glyph="guideDog" size={2.5} />
      </ScoreBox>
    )
    if (
      this.props.allowsGuideDog.yes &&
      this.props.allowsGuideDog.yes > this.props.allowsGuideDog.no
    )
      guideDogScoreBox = (
        <ScoreBox marginRight="0" backgroundColor={colors.ratingAccessible}>
          <Icon glyph="guideDog" size={2.5} />
        </ScoreBox>
      )
    else if (
      this.props.allowsGuideDog.no &&
      this.props.allowsGuideDog.no > this.props.allowsGuideDog.yes
    )
      guideDogScoreBox = (
        <ScoreBox className="bg-transparent"marginRight="0" backgroundColor={colors.ratingAlert}>
          <Icon glyph="steps" size={2.5} />
        </ScoreBox>
      )
    else if (this.props.allowsGuideDog.yes && this.props.allowsGuideDog.no)
      guideDogScoreBox = (
        <ScoreBox className="bg-transparent"marginRight="0" backgroundColor={colors.ratingCaution}>
          <Icon glyph="steps" size={2.5} />
        </ScoreBox>
      )

    const parkingReviews = this.props.hasParking.yes + this.props.hasParking.no
    let parkingScoreBox = (
      <ScoreBox marginRight="0">
        <Icon glyph="parking" size={2.5} />
      </ScoreBox>
    )
    if (
      this.props.hasParking.yes &&
      this.props.hasParking.yes > this.props.hasParking.no
    )
      parkingScoreBox = (
        <ScoreBox marginRight="0" backgroundColor={colors.ratingAccessible}>
          <Icon glyph="parking" size={2.5} />
        </ScoreBox>
      )
    else if (
      this.props.hasParking.no &&
      this.props.hasParking.no > this.props.hasParking.yes
    )
      parkingScoreBox = (
        <ScoreBox marginRight="0" backgroundColor={colors.ratingAlert}>
          <Icon glyph="parking" size={2.5} />
        </ScoreBox>
      )
    else if (this.props.hasParking.yes && this.props.hasParking.no)
      parkingScoreBox = (
        <ScoreBox marginRight="0" backgroundColor={colors.ratingCaution}>
          <Icon glyph="parking" size={2.5} />
        </ScoreBox>
      )

    const secondEntryReviews =
      this.props.hasSecondEntry.yes + this.props.hasSecondEntry.no
    let secondEntryScoreBox = (
      <ScoreBox marginRight="0">
        <Icon glyph="secondEntry" size={2.5} />
      </ScoreBox>
    )
    if (
      this.props.hasSecondEntry.yes &&
      this.props.hasSecondEntry.yes > this.props.hasSecondEntry.no
    )
      secondEntryScoreBox = (
        <ScoreBox marginRight="0" backgroundColor={colors.ratingAccessible}>
          <Icon glyph="secondEntry" size={2.5} />
        </ScoreBox>
      )
    else if (
      this.props.hasSecondEntry.no &&
      this.props.hasSecondEntry.no > this.props.hasSecondEntry.yes
    )
      secondEntryScoreBox = (
        <ScoreBox marginRight="0" backgroundColor={colors.ratingAlert}>
          <Icon glyph="secondEntry" size={2.5} />
        </ScoreBox>
      )
    else if (this.props.hasSecondEntry.yes && this.props.hasSecondEntry.no)
      secondEntryScoreBox = (
        <ScoreBox
          marginRight="0"
          backgroundColor={colors.ratingCaution}
          className="score_caution"
        >
          <Icon glyph="secondEntry" size={2.5} />
        </ScoreBox>
      )

    const wellLitReviews = this.props.hasWellLit.yes + this.props.hasWellLit.no
    let wellLitScoreBox = (
      <ScoreBox marginRight="0">
        <Icon glyph="light" size={2.5} />
      </ScoreBox>
    )
    if (
      this.props.hasWellLit.yes &&
      this.props.hasWellLit.yes > this.props.hasWellLit.no
    )
      wellLitScoreBox = (
        <ScoreBox marginRight="0" backgroundColor={colors.ratingAccessible}>
          <Icon glyph="light" size={2.5} />
        </ScoreBox>
      )
    else if (
      this.props.hasWellLit.no &&
      this.props.hasWellLit.no > this.props.hasWellLit.yes
    )
      wellLitScoreBox = (
        <ScoreBox marginRight="0" backgroundColor={colors.ratingAlert}>
          <Icon glyph="light" size={2.5} />
        </ScoreBox>
      )
    else if (this.props.hasWellLit.yes && this.props.hasWellLit.no)
      wellLitScoreBox = (
        <ScoreBox marginRight="0" backgroundColor={colors.ratingCaution}>
          <Icon glyph="light" size={2.5} />
        </ScoreBox>
      )

    const quietReviews = this.props.isQuiet.yes + this.props.isQuiet.no
    let quietScoreBox = (
      <ScoreBox marginRight="0">
        <Icon glyph="sound" size={2.5} />
      </ScoreBox>
    )
    if (
      this.props.isQuiet.yes &&
      this.props.isQuiet.yes > this.props.isQuiet.no
    )
      quietScoreBox = (
        <ScoreBox marginRight="0" backgroundColor={colors.ratingAccessible}>
          <Icon glyph="sound" size={2.5} />
        </ScoreBox>
      )
    else if (
      this.props.isQuiet.no &&
      this.props.isQuiet.no > this.props.isQuiet.yes
    )
      quietScoreBox = (
        <ScoreBox marginRight="0" backgroundColor={colors.ratingAlert}>
          <Icon glyph="sound" size={2.5} />
        </ScoreBox>
      )
    else if (this.props.isQuiet.yes && this.props.isQuiet.no)
      quietScoreBox = (
        <ScoreBox marginRight="0" backgroundColor={colors.ratingCaution}>
          <Icon glyph="sound" size={2.5} />
        </ScoreBox>
      )

    const spaciousReviews = this.props.isSpacious.yes + this.props.isSpacious.no
    let spaciousScoreBox = (
      <ScoreBox marginRight="0">
        <Icon glyph="space" size={2.5} />
      </ScoreBox>
    )
    if (
      this.props.isSpacious.yes &&
      this.props.isSpacious.yes > this.props.isSpacious.no
    )
      spaciousScoreBox = (
        <ScoreBox marginRight="0" backgroundColor={colors.ratingAccessible}>
          <Icon glyph="space" size={2.5} />
        </ScoreBox>
      )
    else if (
      this.props.isSpacious.no &&
      this.props.isSpacious.no > this.props.isSpacious.yes
    )
      spaciousScoreBox = (
        <ScoreBox marginRight="0" backgroundColor={colors.ratingAlert}>
          <Icon glyph="space" size={2.5} />
        </ScoreBox>
      )
    else if (this.props.isSpacious.yes && this.props.isSpacious.no)
      spaciousScoreBox = (
        <ScoreBox marginRight="0" backgroundColor={colors.ratingCaution}>
          <Icon glyph="space" size={2.5} />
        </ScoreBox>
      )

    return (
      <div>
        <Grid container>
          <Grid item xs>
            <MainReviewColumn>
              <Title>{formatMessage(messages.entryTitle)}</Title>
              <ScoreWrapper>{entryScoreBox}</ScoreWrapper>
            </MainReviewColumn>
          </Grid>
          <Grid item xs>
            <MainReviewColumn>
              <Title>{formatMessage(messages.stepsTitle)}</Title>
              <ScoreWrapper>{stepsScoreBox}</ScoreWrapper>
            </MainReviewColumn>
          </Grid>
          <Grid item xs>
            <MainReviewColumn>
              <Title>{formatMessage(messages.bathroomTitle)}</Title>
              <ScoreWrapper>{bathroomScoreBox}</ScoreWrapper>
            </MainReviewColumn>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12}>
            <ReviewsWrapper>
              {/* Default state */}
              {this.state.section === 0 ? (
                <SectionDefault>
                  {formatMessage(messages.sectionDefaultMessage)}
                </SectionDefault>
              ) : null}

              {/* Entry */}
              {this.state.section === 1 ? (
                <CarouselProvider
                  naturalSlideWidth={100}
                  naturalSlideHeight={100}
                  totalSlides={9}
                  visibleSlides={1}
                  data-carousel="entry"
                >
                  <Slider>
                    <Slide index={0}>
                      <Caption>Entrance 1/9</Caption>
                      <SectionTitle>
                        {formatMessage(messages.permanentRamp)}
                      </SectionTitle>
                      <SectionWrapper>
                        <ScoreBox textColor={colors.black} className="bg-transparent">
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
                          {formatMessage(messages.permanentRampDescription)}
                        </ScoreDescription>
                        <Collapsible>
                          <Button
                            className="text-link"
                            onClick={this.toggleVisibility(
                              'expandPermanentRamp'
                            )}
                          >
                            {this.state.expandPermanentRamp ? (
                              <span className="close">
                                {formatMessage(messages.close)}
                              </span>
                            ) : null}
                            {!this.state.expandPermanentRamp ? (
                              <span className="open">
                                {formatMessage(messages.moreInfo)}
                              </span>
                            ) : null}
                          </Button>
                        </Collapsible>
                        {this.state.expandPermanentRamp ? (
                          <CollapsedContent>
                            <CollapsedTitle>
                              {formatMessage(messages.why)}
                            </CollapsedTitle>
                            <CollapsedDescription>
                              {formatMessage(
                                messages.permanentRampWhyDescription
                              )}
                            </CollapsedDescription>
                          </CollapsedContent>
                        ) : null}
                      </SectionWrapper>
                    </Slide>
                    <Slide index={1}>
                      <Caption>Entrance 2/9</Caption>
                      <SectionTitle>
                        {formatMessage(messages.portableRampTitle)}
                      </SectionTitle>
                      <SectionWrapper>
                        <ScoreBox className="bg-transparent"textColor={colors.black}>
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
                          {formatMessage(messages.portableRampDescription)}
                        </ScoreDescription>
                      </SectionWrapper>
                    </Slide>
                    <Slide index={2}>
                      <Caption>Entrance 3/9</Caption>
                      <SectionTitle>
                        {formatMessage(messages.noStepsTitle)}
                      </SectionTitle>
                      <SectionWrapper>
                        <ScoreBox className="bg-transparent"textColor={colors.black}>
                          <Icon
                            glyph="steps"
                            size={6}
                            className="fill-current text-black"
                            aria-hidden="true"
                            alt=" "
                            color={colors.black}
                          />
                          <StepButton
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
                          {formatMessage(messages.noStepsDescription)}
                        </ScoreDescription>
                      </SectionWrapper>
                    </Slide>
                    <Slide index={3}>
                      <Caption>Entrance 4/9</Caption>
                      <SectionTitle>
                        {formatMessage(messages.oneStepTitle)}
                      </SectionTitle>
                      <SectionWrapper>
                        <ScoreBox className="bg-transparent"textColor={colors.black}>
                          <Icon
                            glyph="steps"
                            size={6}
                            className="fill-current text-black"
                            aria-hidden="true"
                            alt=" "
                            color={colors.black}
                          />
                          <StepButton
                        >
                          <Icon
                            glyph="one"
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
                          {formatMessage(messages.oneStepDescription)}
                        </ScoreDescription>
                      </SectionWrapper>
                    </Slide>
                    <Slide index={4}>
                      <Caption>Entrance 5/9</Caption>
                      <SectionTitle>
                        {formatMessage(messages.twoStepsTitle)}
                      </SectionTitle>
                      <SectionWrapper>
                        <ScoreBox className="bg-transparent"textColor={colors.black}>
                          <Icon
                            glyph="steps"
                            size={6}
                            className="fill-current text-black"
                            aria-hidden="true"
                            alt=" "
                            color={colors.black}
                          />
                          <StepButton
                        >
                          <Icon
                            glyph="two"
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
                          {formatMessage(messages.twoStepsDescription)}
                        </ScoreDescription>
                      </SectionWrapper>
                    </Slide>
                    <Slide index={5}>
                      <Caption>Entrance 6/9</Caption>
                      <SectionTitle>
                        {formatMessage(messages.threeStepsTitle)}
                      </SectionTitle>
                      <SectionWrapper>
                        <ScoreBox className="bg-transparent"textColor={colors.black}>
                          <Icon
                            glyph="steps"
                            size={6}
                            className="fill-current text-black"
                            aria-hidden="true"
                            alt=" "
                            color={colors.black}
                          />
                          <StepButton
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
                          {formatMessage(messages.threeStepsDescription)}
                        </ScoreDescription>
                      </SectionWrapper>
                    </Slide>
                    <Slide index={6}>
                      <Caption>Entrance 7/9</Caption>
                      <SectionTitle>
                        {formatMessage(messages.reservedParkingTitle)}
                      </SectionTitle>
                      <SectionWrapper>
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
                          {formatMessage(messages.reservedParkingDescription)}
                        </ScoreDescription>
                      </SectionWrapper>
                    </Slide>
                    <Slide index={7}>
                      <Caption>Entrance 8/9</Caption>
                      <SectionTitle>
                        {formatMessage(messages.secondEntryTitle)}
                      </SectionTitle>
                      <SectionWrapper>
                        <ScoreBox className="bg-transparent"textColor={colors.black}>
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
                          {formatMessage(messages.secondEntryDescription)}
                        </ScoreDescription>
                      </SectionWrapper>
                    </Slide>
                    <Slide index={8}>
                      <Caption>Entrance 9/9</Caption>
                      <SectionTitle>
                        {formatMessage(messages.wideEntranceTitle)}
                      </SectionTitle>
                      <SectionWrapper>
                        <ScoreBox className="bg-transparent"textColor={colors.black}>
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
                          {formatMessage(messages.wideEntranceDescription)}
                        </ScoreDescription>
                      </SectionWrapper>
                    </Slide>
                  </Slider>
                  <ButtonBack>
                    <span className="_hide-visual">Back</span>
                    <i>
                      <Icon glyph="chevronLeft" size={1} />
                    </i>
                  </ButtonBack>
                  <ButtonNext>
                    <span className="_hide-visual">Next</span>
                    <i>
                      <Icon glyph="chevronRight" size={1} />
                    </i>
                  </ButtonNext>
                </CarouselProvider>
              ) : null}
              {/* Interior */}
              {this.state.section === 2 ? (
                <CarouselProvider
                  naturalSlideWidth={100}
                  naturalSlideHeight={125}
                  totalSlides={7}
                  visibleSlides={1}
                  data-carousel="interior"
                >
                  <Slider>
                    <Slide index={0}>
                      <Caption>Interior 1/7</Caption>
                      <SectionTitle>
                        {formatMessage(messages.roomToMoveTitle)}
                      </SectionTitle>
                      <SectionWrapper>
                        <ScoreBox className="bg-transparent"textColor={colors.black}>
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
                          {formatMessage(messages.roomToMoveDescription)}
                        </ScoreDescription>
                      </SectionWrapper>
                    </Slide>
                    <Slide index={1}>
                      <Caption>Interior 2/7</Caption>
                      <SectionTitle>
                        {formatMessage(messages.accessibleTableHeightTitle)}
                      </SectionTitle>
                      <SectionWrapper>
                        <ScoreBox className="bg-transparent"textColor={colors.black}>
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
                          {formatMessage(
                            messages.accessibleTableHeightDescription
                          )}
                        </ScoreDescription>
                      </SectionWrapper>
                    </Slide>
                    <Slide index={2}>
                      <Caption>Interior 3/7</Caption>
                      <SectionTitle>
                        {formatMessage(messages.brightLightTitle)}
                      </SectionTitle>
                      <SectionWrapper>
                        <ScoreBox className="bg-transparent"textColor={colors.black}>
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
                          {formatMessage(messages.brightLightDescription)}
                        </ScoreDescription>
                      </SectionWrapper>
                    </Slide>
                    <Slide index={3}>
                      <Caption>Interior 4/7</Caption>
                      <SectionTitle>
                        {formatMessage(messages.highNoiseLevelTitle)}
                      </SectionTitle>
                      <SectionWrapper>
                        <ScoreBox className="bg-transparent"textColor={colors.black}>
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
                          {formatMessage(messages.highNoiseLevelDescription)}
                        </ScoreDescription>
                      </SectionWrapper>
                    </Slide>
                    <Slide index={4}>
                      <Caption>Interior 5/7</Caption>
                      <SectionTitle>
                        {formatMessage(messages.guideDogTitle)}
                      </SectionTitle>
                      <SectionWrapper>
                        <ScoreBox className="bg-transparent"textColor={colors.black}>
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
                          {formatMessage(messages.guideDogDescription)}
                        </ScoreDescription>
                      </SectionWrapper>
                    </Slide>
                    <Slide index={5}>
                      <Caption>Interior 6/7</Caption>
                      <SectionTitle>
                        {formatMessage(messages.accessibleElevatorTitle)}
                      </SectionTitle>
                      <SectionWrapper>
                        <ScoreBox className="bg-transparent"textColor={colors.black}>
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
                          {formatMessage(
                            messages.accessibleElevatorDescription
                          )}
                        </ScoreDescription>
                      </SectionWrapper>
                    </Slide>
                    <Slide index={6}>
                      <Caption>Interior 7/7</Caption>
                      <SectionTitle>
                        {formatMessage(messages.interiorRampTitle)}
                      </SectionTitle>
                      <SectionWrapper>
                        <ScoreBox className="bg-transparent"textColor={colors.black}>
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
                          {formatMessage(messages.interiorRampDescription)}
                        </ScoreDescription>
                      </SectionWrapper>
                    </Slide>
                  </Slider>
                  <ButtonBack>
                    <span className="_hide-visual">Back</span>
                    <i>
                      <Icon glyph="chevronLeft" size={1} />
                    </i>
                  </ButtonBack>
                  <ButtonNext>
                    <span className="_hide-visual">Next</span>
                    <i>
                      <Icon glyph="chevronRight" size={1} />
                    </i>
                  </ButtonNext>
                </CarouselProvider>
              ) : null}

              {/* Restroom */}
              {this.state.section === 3 ? (
                <CarouselProvider
                  naturalSlideWidth={100}
                  naturalSlideHeight={125}
                  totalSlides={9}
                  visibleSlides={1}
                  data-carousel="restroom"
                >
                  <Slider>
                    <Slide index={0}>
                      <Caption>Restroom 1/9</Caption>
                      <SectionTitle>
                        {formatMessage(messages.doorSwingsInTitle)}
                      </SectionTitle>
                      <SectionWrapper>
                        <ScoreBox className="bg-transparent"textColor={colors.black}>
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
                          {formatMessage(messages.doorSwingsInDescription)}
                        </ScoreDescription>
                      </SectionWrapper>
                    </Slide>
                    <Slide index={1}>
                      <Caption>Restroom 2/9</Caption>
                      <SectionTitle>
                        {formatMessage(messages.doorSwingsOutTitle)}
                      </SectionTitle>
                      <SectionWrapper>
                        <ScoreBox className="bg-transparent"textColor={colors.black}>
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
                          {formatMessage(messages.doorSwingsOutDescription)}
                        </ScoreDescription>
                      </SectionWrapper>
                    </Slide>
                    <Slide index={2}>
                      <Caption>Restroom 3/9</Caption>
                      <SectionTitle>
                        {formatMessage(messages.averageStallsTitle)}
                      </SectionTitle>
                      <SectionWrapper>
                        <ScoreBox className="bg-transparent"textColor={colors.black}>
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
                          {formatMessage(messages.averageStallsDescription)}
                        </ScoreDescription>
                      </SectionWrapper>
                    </Slide>
                    <Slide index={3}>
                      <Caption>Restroom 4/9</Caption>
                      <SectionTitle>
                        {formatMessage(messages.largeStallsTitle)}
                      </SectionTitle>
                      <SectionWrapper>
                        <ScoreBox className="bg-transparent"textColor={colors.black}>
                          <style>
                            {`
                 .eBPyXX{
                   fill: "default" !important;
                 }
                 `}
                          </style>
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
                          {formatMessage(messages.largeStallsDescription)}
                        </ScoreDescription>
                      </SectionWrapper>
                    </Slide>
                    <Slide index={4}>
                      <Caption>Restroom 5/9</Caption>
                      <SectionTitle>
                        {formatMessage(messages.tallSinksTitle)}
                      </SectionTitle>
                      <SectionWrapper>
                        <ScoreBox className="bg-transparent"textColor={colors.black}>
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
                          {formatMessage(messages.tallSinksDescription)}
                        </ScoreDescription>
                      </SectionWrapper>
                    </Slide>
                    <Slide index={5}>
                      <Caption>Restroom 6/9</Caption>
                      <SectionTitle>
                        {formatMessage(messages.loweredSinksTitle)}
                      </SectionTitle>
                      <SectionWrapper>
                        <ScoreBox className="bg-transparent"textColor={colors.black}>
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
                          {formatMessage(messages.loweredSinksDescription)}
                        </ScoreDescription>
                      </SectionWrapper>
                    </Slide>
                    <Slide index={6}>
                      <Caption>Restroom 7/9</Caption>
                      <SectionTitle>
                        {formatMessage(messages.noSupportAroundToiletTitle)}
                      </SectionTitle>
                      <SectionWrapper>
                        <ScoreBox className="bg-transparent"textColor={colors.black}>
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
                          {formatMessage(
                            messages.noSupportAroundToiletDescription
                          )}
                        </ScoreDescription>
                      </SectionWrapper>
                    </Slide>
                    <Slide index={7}>
                      <Caption>Restroom 8/9</Caption>
                      <SectionTitle>
                        {formatMessage(messages.oneBarAroundToiletTitle)}
                      </SectionTitle>
                      <SectionWrapper>
                        <ScoreBox className="bg-transparent"textColor={colors.black}>
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
                          {formatMessage(
                            messages.oneBarAroundToiletDescription
                          )}
                        </ScoreDescription>
                      </SectionWrapper>
                    </Slide>
                    <Slide index={8}>
                      <Caption>Restroom 9/9</Caption>
                      <SectionTitle>
                        {formatMessage(messages.twoBarAroundToiletTitle)}
                      </SectionTitle>
                      <SectionWrapper>
                        <ScoreBox className="bg-transparent"textColor={colors.black}>
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
                          {formatMessage(
                            messages.twoBarAroundToiletDescription
                          )}
                        </ScoreDescription>
                      </SectionWrapper>
                    </Slide>
                  </Slider>
                  <ButtonBack>
                    <span className="_hide-visual">Back</span>
                    <i>
                      <Icon glyph="chevronLeft" size={1} />
                    </i>
                  </ButtonBack>
                  <ButtonNext>
                    <span className="_hide-visual">Next</span>
                    <i>
                      <Icon glyph="chevronRight" size={1} />
                    </i>
                  </ButtonNext>
                </CarouselProvider>
              ) : null}
            </ReviewsWrapper>
          </Grid>
        </Grid>
      </div>
    )
  }
}
