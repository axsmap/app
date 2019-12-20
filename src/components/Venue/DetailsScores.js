import { forOwn } from 'lodash'
import { number, shape } from 'prop-types'
import React from 'react'
import { intlShape } from 'react-intl'
import styled from 'styled-components'
import Grid from '@material-ui/core/Grid'

import Icon from '../Icon'
import { colors, media, fonts, fontWeight, fontSize } from '../../styles'

import messages from './messages'

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

  color: ${colors.darkestGrey};
  font-family: ${fonts.primary} !important;
  font-size: ${fontSize.sm};
  font-weight: ${fontWeight.semibold}!important;
  text-align: center;
  text-transform: uppercase;
  border-bottom: 1px solid #e3e1e0;
  background: ${colors.white};
`

const ScoreWrapper = styled.div`
  display: flex;

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
  padding: 20px 0;


  background-color: ${props => props.backgroundColor || colors.white};
  color: ${props => props.textColor || colors.buttonColor};
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

  color: ${props => props.color};
  font-size: 1.2rem;
  font-weight: bold;
  text-align: center;
`

const ReviewsWrapper = styled.div`
  display: flex;

  flex-wrap: wrap;
  justify-content: space-between;

  width: 100%;
  background: ${colors.white};
  text-align: center;
  font-size: 1rem;
  font-family: ${fonts.primary};
  padding: 25px 15px;
`

const ReviewColumn = styled.div`
  display: flex;

  align-items: center;
  flex-direction: column;
  justify-content: flex-start;

  margin-bottom: 1rem;
  width: 49%;

  &:nth-last-child(-n + 2) {
    margin-bottom: 0;
  }

  ${media.tablet`
    width: 32%;

    &:nth-last-child(-n + 3) {
      margin-bottom: 0;
    }
  `};

  ${media.desktop`
    margin-bottom: 0;
    width: auto;
  `};
`

const DetailsScores = (props, context) => {
  let entryScoreBox = (
    <ScoreBox>
      <Icon
        glyph="entrylg"
        size={4}
        alt="Entrance"
        color={colors.buttonColor}
      />
    </ScoreBox>
  )
  if (props.entryScore >= 1 && props.entryScore < 3)
    entryScoreBox = (
      <ScoreBox backgroundColor={colors.ratingAlert} textColor={colors.black}>
        <Icon
          glyph="entrylg"
          size={4}
          className="fill-current text-black"
          color={colors.black}
          alt="Entrance"
        />
        <Count>
          {context.intl.formatMessage(messages.count, {
            count: props.entryReviews
          })}
        </Count>
      </ScoreBox>
    )
  else if (props.entryScore >= 3 && props.entryScore < 4)
    entryScoreBox = (
      <ScoreBox backgroundColor={colors.ratingCaution} textColor={colors.black}>
        <Icon
          glyph="entrylg"
          size={4}
          className="fill-current text-black"
          color={colors.black}
          alt="Entrance"
        />
        <Count>
          {context.intl.formatMessage(messages.count, {
            count: props.entryReviews
          })}
        </Count>
      </ScoreBox>
    )
  else if (props.entryScore >= 4 && props.entryScore <= 5)
    entryScoreBox = (
      <ScoreBox
        backgroundColor={colors.ratingAccessible}
        textColor={colors.black}
      >
        <Icon
          glyph="entrylg"
          size={4}
          className="fill-current text-black"
          color={colors.black}
          alt="Entrance"
        />
        <Count>
          {context.intl.formatMessage(messages.count, {
            count: props.entryReviews
          })}
        </Count>
      </ScoreBox>
    )

  let bathroomScoreBox = (
    <ScoreBox>
      <Icon
        glyph="restroom"
        size={4}
        alt="Restroom"
        color={colors.buttonColor}
      />
    </ScoreBox>
  )
  if (props.bathroomScore >= 1 && props.bathroomScore < 3)
    bathroomScoreBox = (
      <ScoreBox backgroundColor={colors.ratingAlert}>
        <Icon
          glyph="restroom"
          size={4}
          className="fill-current text-black"
          color={colors.black}
          alt="Restroom"
        />
        <Count>
          {context.intl.formatMessage(messages.count, {
            count: props.bathroomReviews
          })}
        </Count>
      </ScoreBox>
    )
  else if (props.bathroomScore >= 3 && props.bathroomScore < 4)
    bathroomScoreBox = (
      <ScoreBox backgroundColor={colors.ratingCaution}>
        <Icon
          glyph="restroom"
          size={4}
          className="fill-current text-black"
          color={colors.black}
          alt="Restroom"
        />
        <Count>
          {context.intl.formatMessage(messages.count, {
            count: props.bathroomReviews
          })}
        </Count>
      </ScoreBox>
    )
  else if (props.bathroomScore >= 4 && props.bathroomScore <= 5)
    bathroomScoreBox = (
      <ScoreBox backgroundColor={colors.ratingAccessible}>
        <Icon
          glyph="restroom"
          size={4}
          className="fill-current text-black"
          color={colors.black}
          alt="Restroom"
        />
        <Count>
          {context.intl.formatMessage(messages.count, {
            count: props.bathroomReviews
          })}
        </Count>
      </ScoreBox>
    )

  const maxScore = 5
  const entryScoreStars = []
  const bathroomScoreStars = []
  for (let i = 1; i <= maxScore; i += 1) {
    const YellowStar = (
      <ScoreStar key={i} glyph="star" size={2.5} color={colors.ratingCaution} />
    )
    const GreyStar = (
      <ScoreStar key={i} glyph="star" size={2.5} color={colors.grey} />
    )

    if (Math.floor(props.entryScore) >= i) {
      entryScoreStars.push(YellowStar)
    } else {
      entryScoreStars.push(GreyStar)
    }

    if (Math.floor(props.bathroomScore) >= i) {
      bathroomScoreStars.push(YellowStar)
    } else {
      bathroomScoreStars.push(GreyStar)
    }
  }

  let stepsCountColor = colors.grey
  let stepsNumber = 'stepsUnknown'
  let stepsReviews = 0
  const maxSteps = { value: 0, key: '' }
  forOwn(props.steps, (value, key) => {
    stepsReviews += value
    if (value > maxSteps.value) {
      maxSteps.value = value
      maxSteps.key = key
    }
  })
  let stepsScoreBox = (
    <ScoreBox>
      <Icon
        glyph="interior"
        size={5}
        alt="Interior"
        color={colors.buttonColor}
      />
    </ScoreBox>
  )
  if (maxSteps.key === 'zero') {
    stepsCountColor = colors.ratingAccessible
    stepsNumber = 'stepsZero'
    stepsScoreBox = (
      <ScoreBox backgroundColor={colors.ratingAccessible}>
        <Icon
          glyph="interior"
          size={4}
          className="fill-current text-black"
          color={colors.black}
          alt="Interior"
        />
        <Count>
          {context.intl.formatMessage(messages.count, {
            count: stepsReviews
          })}
        </Count>
      </ScoreBox>
    )
  } else if (maxSteps.key === 'one' || maxSteps.key === 'two') {
    stepsNumber = maxSteps.key === 'one' ? 'stepsOne' : 'stepsTwo'
    stepsCountColor = colors.ratingCaution
    stepsScoreBox = (
      <ScoreBox backgroundColor={colors.ratingCaution}>
        <Icon
          glyph="interior"
          size={4}
          className="fill-current text-black"
          color={colors.black}
          alt="Interior"
        />
        <Count>
          {context.intl.formatMessage(messages.count, {
            count: stepsReviews
          })}
        </Count>
      </ScoreBox>
    )
  } else if (maxSteps.key === 'moreThanTwo') {
    stepsNumber = 'stepsMoreThanTwo'
    stepsCountColor = colors.ratingAlert
    stepsScoreBox = (
      <ScoreBox backgroundColor={colors.ratingAlert}>
        <Icon
          glyph="interior"
          size={4}
          className="fill-current text-black"
          color={colors.black}
          alt="Interior"
        />
        <Count>
          {context.intl.formatMessage(messages.count, {
            count: stepsReviews
          })}
        </Count>
      </ScoreBox>
    )
  }

  const guideDogReviews = props.allowsGuideDog.yes + props.allowsGuideDog.no
  let guideDogScoreBox = (
    <ScoreBox marginRight="0">
      <Icon glyph="guideDog" size={2.5} />
    </ScoreBox>
  )
  if (
    props.allowsGuideDog.yes &&
    props.allowsGuideDog.yes > props.allowsGuideDog.no
  )
    guideDogScoreBox = (
      <ScoreBox marginRight="0" backgroundColor={colors.ratingAccessible}>
        <Icon glyph="guideDog" size={2.5} />
      </ScoreBox>
    )
  else if (
    props.allowsGuideDog.no &&
    props.allowsGuideDog.no > props.allowsGuideDog.yes
  )
    guideDogScoreBox = (
      <ScoreBox marginRight="0" backgroundColor={colors.ratingAlert}>
        <Icon glyph="steps" size={2.5} />
      </ScoreBox>
    )
  else if (props.allowsGuideDog.yes && props.allowsGuideDog.no)
    guideDogScoreBox = (
      <ScoreBox marginRight="0" backgroundColor={colors.ratingCaution}>
        <Icon glyph="steps" size={2.5} />
      </ScoreBox>
    )

  const parkingReviews = props.hasParking.yes + props.hasParking.no
  let parkingScoreBox = (
    <ScoreBox marginRight="0">
      <Icon glyph="parking" size={2.5} />
    </ScoreBox>
  )
  if (props.hasParking.yes && props.hasParking.yes > props.hasParking.no)
    parkingScoreBox = (
      <ScoreBox marginRight="0" backgroundColor={colors.ratingAccessible}>
        <Icon glyph="parking" size={2.5} />
      </ScoreBox>
    )
  else if (props.hasParking.no && props.hasParking.no > props.hasParking.yes)
    parkingScoreBox = (
      <ScoreBox marginRight="0" backgroundColor={colors.ratingAlert}>
        <Icon glyph="parking" size={2.5} />
      </ScoreBox>
    )
  else if (props.hasParking.yes && props.hasParking.no)
    parkingScoreBox = (
      <ScoreBox marginRight="0" backgroundColor={colors.ratingCaution}>
        <Icon glyph="parking" size={2.5} />
      </ScoreBox>
    )

  const secondEntryReviews = props.hasSecondEntry.yes + props.hasSecondEntry.no
  let secondEntryScoreBox = (
    <ScoreBox marginRight="0">
      <Icon glyph="secondEntry" size={2.5} />
    </ScoreBox>
  )
  if (
    props.hasSecondEntry.yes &&
    props.hasSecondEntry.yes > props.hasSecondEntry.no
  )
    secondEntryScoreBox = (
      <ScoreBox marginRight="0" backgroundColor={colors.ratingAccessible}>
        <Icon glyph="secondEntry" size={2.5} />
      </ScoreBox>
    )
  else if (
    props.hasSecondEntry.no &&
    props.hasSecondEntry.no > props.hasSecondEntry.yes
  )
    secondEntryScoreBox = (
      <ScoreBox marginRight="0" backgroundColor={colors.ratingAlert}>
        <Icon glyph="secondEntry" size={2.5} />
      </ScoreBox>
    )
  else if (props.hasSecondEntry.yes && props.hasSecondEntry.no)
    secondEntryScoreBox = (
      <ScoreBox marginRight="0" backgroundColor={colors.ratingCaution}>
        <Icon glyph="secondEntry" size={2.5} />
      </ScoreBox>
    )

  const wellLitReviews = props.hasWellLit.yes + props.hasWellLit.no
  let wellLitScoreBox = (
    <ScoreBox marginRight="0">
      <Icon glyph="light" size={2.5} />
    </ScoreBox>
  )
  if (props.hasWellLit.yes && props.hasWellLit.yes > props.hasWellLit.no)
    wellLitScoreBox = (
      <ScoreBox marginRight="0" backgroundColor={colors.ratingAccessible}>
        <Icon glyph="light" size={2.5} />
      </ScoreBox>
    )
  else if (props.hasWellLit.no && props.hasWellLit.no > props.hasWellLit.yes)
    wellLitScoreBox = (
      <ScoreBox marginRight="0" backgroundColor={colors.ratingAlert}>
        <Icon glyph="light" size={2.5} />
      </ScoreBox>
    )
  else if (props.hasWellLit.yes && props.hasWellLit.no)
    wellLitScoreBox = (
      <ScoreBox marginRight="0" backgroundColor={colors.ratingCaution}>
        <Icon glyph="light" size={2.5} />
      </ScoreBox>
    )

  const quietReviews = props.isQuiet.yes + props.isQuiet.no
  let quietScoreBox = (
    <ScoreBox marginRight="0">
      <Icon glyph="sound" size={2.5} />
    </ScoreBox>
  )
  if (props.isQuiet.yes && props.isQuiet.yes > props.isQuiet.no)
    quietScoreBox = (
      <ScoreBox marginRight="0" backgroundColor={colors.ratingAccessible}>
        <Icon glyph="sound" size={2.5} />
      </ScoreBox>
    )
  else if (props.isQuiet.no && props.isQuiet.no > props.isQuiet.yes)
    quietScoreBox = (
      <ScoreBox marginRight="0" backgroundColor={colors.ratingAlert}>
        <Icon glyph="sound" size={2.5} />
      </ScoreBox>
    )
  else if (props.isQuiet.yes && props.isQuiet.no)
    quietScoreBox = (
      <ScoreBox marginRight="0" backgroundColor={colors.ratingCaution}>
        <Icon glyph="sound" size={2.5} />
      </ScoreBox>
    )

  const spaciousReviews = props.isSpacious.yes + props.isSpacious.no
  let spaciousScoreBox = (
    <ScoreBox marginRight="0">
      <Icon glyph="space" size={2.5} />
    </ScoreBox>
  )
  if (props.isSpacious.yes && props.isSpacious.yes > props.isSpacious.no)
    spaciousScoreBox = (
      <ScoreBox marginRight="0" backgroundColor={colors.ratingAccessible}>
        <Icon glyph="space" size={2.5} />
      </ScoreBox>
    )
  else if (props.isSpacious.no && props.isSpacious.no > props.isSpacious.yes)
    spaciousScoreBox = (
      <ScoreBox marginRight="0" backgroundColor={colors.ratingAlert}>
        <Icon glyph="space" size={2.5} />
      </ScoreBox>
    )
  else if (props.isSpacious.yes && props.isSpacious.no)
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
            <Title>{context.intl.formatMessage(messages.entryTitle)}</Title>
            <ScoreWrapper>{entryScoreBox}</ScoreWrapper>
          </MainReviewColumn>
        </Grid>
        <Grid item xs>
          <MainReviewColumn>
            <Title>{context.intl.formatMessage(messages.stepsTitle)}</Title>
            <ScoreWrapper>{stepsScoreBox}</ScoreWrapper>
          </MainReviewColumn>
        </Grid>
        <Grid item xs>
          <MainReviewColumn>
            <Title>{context.intl.formatMessage(messages.bathroomTitle)}</Title>
            <ScoreWrapper>{bathroomScoreBox}</ScoreWrapper>
          </MainReviewColumn>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <ReviewsWrapper />
        </Grid>
      </Grid>
    </div>
  )
}

DetailsScores.propTypes = {
  entryScore: number,
  entryReviews: number,
  bathroomScore: number,
  bathroomReviews: number,
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

DetailsScores.contextTypes = {
  intl: intlShape
}

export default DetailsScores
