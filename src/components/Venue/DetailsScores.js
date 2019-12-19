import { forOwn } from 'lodash'
import { number, shape } from 'prop-types'
import React from 'react'
import { intlShape } from 'react-intl'
import styled from 'styled-components'
import Grid from '@material-ui/core/Grid'

import Icon from '../Icon'
import { colors, media, fonts, fontWeight, fontSize } from '../../styles'

import messages from './messages'

import entryIllustration from '../../images/ratings/entrance-lg.svg'
import interiorIllustration from '../../images/ratings/interior.svg'
import restroomIllustration from '../../images/ratings/restroom.svg'

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

  height: 7.813rem;
  margin-right: 0px;
  width: 100%;
`

const ScoreStar = styled(Icon)`
  margin-right: 0.8rem;

  &:last-of-type {
    margin-right: 0;
  }
`

const Count = styled.p`
  margin: 1rem 0 0 0;
  width: 100%;

  color: ${colors.darkGrey};
  font-size: 1rem;
  font-weight: bold;
  text-align: center;
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
  background-color: ${colors.gray100};
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
      <figure>
        <img src={entryIllustration} alt="Entry" />
      </figure>
    </ScoreBox>
  )
  if (props.entryScore >= 1 && props.entryScore < 3)
    entryScoreBox = (
      <ScoreBox backgroundColor={colors.alert}>
        <figure>
          <img src={entryIllustration} alt="Entry" />
        </figure>
      </ScoreBox>
    )
  else if (props.entryScore >= 3 && props.entryScore < 4)
    entryScoreBox = (
      <ScoreBox backgroundColor={colors.primary}>
        <figure>
          <img src={entryIllustration} alt="Entry" />
        </figure>
      </ScoreBox>
    )
  else if (props.entryScore >= 4 && props.entryScore <= 5)
    entryScoreBox = (
      <ScoreBox backgroundColor={colors.success}>
        <figure>
          <img src={entryIllustration} alt="Entry" />
        </figure>
      </ScoreBox>
    )

  let bathroomScoreBox = (
    <ScoreBox>
      <figure>
        <img src={restroomIllustration} alt="Restroom" />
      </figure>
    </ScoreBox>
  )
  if (props.bathroomScore >= 1 && props.bathroomScore < 3)
    bathroomScoreBox = (
      <ScoreBox backgroundColor={colors.alert}>
        <figure>
          <img src={restroomIllustration} alt="Restroom" />
        </figure>
      </ScoreBox>
    )
  else if (props.bathroomScore >= 3 && props.bathroomScore < 4)
    bathroomScoreBox = (
      <ScoreBox backgroundColor={colors.primary}>
        <figure>
          <img src={restroomIllustration} alt="Restroom" />
        </figure>
      </ScoreBox>
    )
  else if (props.bathroomScore >= 4 && props.bathroomScore <= 5)
    bathroomScoreBox = (
      <ScoreBox backgroundColor={colors.success}>
        <figure>
          <img src={restroomIllustration} alt="Restroom" />
        </figure>
      </ScoreBox>
    )

  const maxScore = 5
  const entryScoreStars = []
  const bathroomScoreStars = []
  for (let i = 1; i <= maxScore; i += 1) {
    const YellowStar = (
      <ScoreStar key={i} glyph="star" size={2.5} color={colors.primary} />
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
      <figure>
        <img src={interiorIllustration} alt="Interior" />
      </figure>
    </ScoreBox>
  )
  if (maxSteps.key === 'zero') {
    stepsCountColor = colors.success
    stepsNumber = 'stepsZero'
    stepsScoreBox = (
      <ScoreBox backgroundColor={colors.success}>
        <figure>
          <img src={interiorIllustration} alt="Interior" />
        </figure>
      </ScoreBox>
    )
  } else if (maxSteps.key === 'one' || maxSteps.key === 'two') {
    stepsNumber = maxSteps.key === 'one' ? 'stepsOne' : 'stepsTwo'
    stepsCountColor = colors.primary
    stepsScoreBox = (
      <ScoreBox backgroundColor={colors.primary}>
        <figure>
          <img src={interiorIllustration} alt="Interior" />
        </figure>
      </ScoreBox>
    )
  } else if (maxSteps.key === 'moreThanTwo') {
    stepsNumber = 'stepsMoreThanTwo'
    stepsCountColor = colors.alert
    stepsScoreBox = (
      <ScoreBox backgroundColor={colors.alert}>
        <figure>
          <img src={interiorIllustration} alt="Interior" />
        </figure>
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
      <ScoreBox marginRight="0" backgroundColor={colors.success}>
        <Icon glyph="guideDog" size={2.5} />
      </ScoreBox>
    )
  else if (
    props.allowsGuideDog.no &&
    props.allowsGuideDog.no > props.allowsGuideDog.yes
  )
    guideDogScoreBox = (
      <ScoreBox marginRight="0" backgroundColor={colors.alert}>
        <Icon glyph="steps" size={2.5} />
      </ScoreBox>
    )
  else if (props.allowsGuideDog.yes && props.allowsGuideDog.no)
    guideDogScoreBox = (
      <ScoreBox marginRight="0" backgroundColor={colors.primary}>
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
      <ScoreBox marginRight="0" backgroundColor={colors.success}>
        <Icon glyph="parking" size={2.5} />
      </ScoreBox>
    )
  else if (props.hasParking.no && props.hasParking.no > props.hasParking.yes)
    parkingScoreBox = (
      <ScoreBox marginRight="0" backgroundColor={colors.alert}>
        <Icon glyph="parking" size={2.5} />
      </ScoreBox>
    )
  else if (props.hasParking.yes && props.hasParking.no)
    parkingScoreBox = (
      <ScoreBox marginRight="0" backgroundColor={colors.primary}>
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
      <ScoreBox marginRight="0" backgroundColor={colors.success}>
        <Icon glyph="secondEntry" size={2.5} />
      </ScoreBox>
    )
  else if (
    props.hasSecondEntry.no &&
    props.hasSecondEntry.no > props.hasSecondEntry.yes
  )
    secondEntryScoreBox = (
      <ScoreBox marginRight="0" backgroundColor={colors.alert}>
        <Icon glyph="secondEntry" size={2.5} />
      </ScoreBox>
    )
  else if (props.hasSecondEntry.yes && props.hasSecondEntry.no)
    secondEntryScoreBox = (
      <ScoreBox marginRight="0" backgroundColor={colors.primary}>
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
      <ScoreBox marginRight="0" backgroundColor={colors.success}>
        <Icon glyph="light" size={2.5} />
      </ScoreBox>
    )
  else if (props.hasWellLit.no && props.hasWellLit.no > props.hasWellLit.yes)
    wellLitScoreBox = (
      <ScoreBox marginRight="0" backgroundColor={colors.alert}>
        <Icon glyph="light" size={2.5} />
      </ScoreBox>
    )
  else if (props.hasWellLit.yes && props.hasWellLit.no)
    wellLitScoreBox = (
      <ScoreBox marginRight="0" backgroundColor={colors.primary}>
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
      <ScoreBox marginRight="0" backgroundColor={colors.success}>
        <Icon glyph="sound" size={2.5} />
      </ScoreBox>
    )
  else if (props.isQuiet.no && props.isQuiet.no > props.isQuiet.yes)
    quietScoreBox = (
      <ScoreBox marginRight="0" backgroundColor={colors.alert}>
        <Icon glyph="sound" size={2.5} />
      </ScoreBox>
    )
  else if (props.isQuiet.yes && props.isQuiet.no)
    quietScoreBox = (
      <ScoreBox marginRight="0" backgroundColor={colors.primary}>
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
      <ScoreBox marginRight="0" backgroundColor={colors.success}>
        <Icon glyph="space" size={2.5} />
      </ScoreBox>
    )
  else if (props.isSpacious.no && props.isSpacious.no > props.isSpacious.yes)
    spaciousScoreBox = (
      <ScoreBox marginRight="0" backgroundColor={colors.alert}>
        <Icon glyph="space" size={2.5} />
      </ScoreBox>
    )
  else if (props.isSpacious.yes && props.isSpacious.no)
    spaciousScoreBox = (
      <ScoreBox marginRight="0" backgroundColor={colors.primary}>
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
            {props.entryReviews ? (
              <Count>
                {context.intl.formatMessage(messages.count, {
                  count: props.entryReviews
                })}
              </Count>
            ) : null}
          </MainReviewColumn>
        </Grid>
        <Grid item xs>
          <MainReviewColumn>
            <Title>{context.intl.formatMessage(messages.stepsTitle)}</Title>
            <ScoreWrapper>{stepsScoreBox}</ScoreWrapper>
            {stepsReviews ? (
              <Count>
                {context.intl.formatMessage(messages.count, {
                  count: stepsReviews
                })}
              </Count>
            ) : null}
          </MainReviewColumn>
        </Grid>
        <Grid item xs>
          <MainReviewColumn>
            <Title>{context.intl.formatMessage(messages.bathroomTitle)}</Title>
            <ScoreWrapper>{bathroomScoreBox}</ScoreWrapper>
            {props.bathroomReviews ? (
              <Count>
                {context.intl.formatMessage(messages.count, {
                  count: props.bathroomReviews
                })}
              </Count>
            ) : null}
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
