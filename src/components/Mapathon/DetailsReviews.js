import { number } from 'prop-types'
import React from 'react'
import { useIntl } from 'react-intl'
import styled from 'styled-components'

import Icon from '../Icon'
import { colors, media } from '../../styles'

import messages from './messages'

const Wrapper = styled.div`
  display: flex;

  align-items: center;
  flex-direction: column;
  justify-content: center;

  margin: 2rem 0;
  padding: 0 1rem;
  width: 100%;

  ${media.tablet`
    align-items: flex-start;
    flex-direction: row;
    padding: 0;
  `};

  ${media.desktop`
    margin: 3rem 0;
  `};

  ${media.widescreen`
    margin: 4rem 0;
  `};
`

const Block = styled.div`
  display: flex;

  align-items: center;
  flex-direction: column;
  justify-content: center;

  margin-bottom: 2rem;
  width: 75%;

  &:last-of-type {
    margin-bottom: 0;
  }

  ${media.tablet`
    margin-bottom: 0;
    width: 50%;
  `};
`

const Progress = styled.div`
  height: 0.5rem;
  margin: 1rem 0;
  width: 100%;

  background-color: ${colors.lightGrey};
`

const ProgressBar = styled.div`
  height: inherit;
  width: ${props => props.width};
  background-color: ${colors.success};
`

const Title = styled.h1`
  display: block;

  margin: 0;
  width: 100%;

  color: ${colors.darkestGrey};
  font-size: 1.2rem;
  font-weight: bold;
  text-align: center;

  ${media.tablet`
    font-size: 1.5rem;
  `};

  ${media.desktop`
    font-size: 1.6rem;
  `};

  ${media.widescreen`
    font-size: 1.7rem;
  `};
`

const DetailsReviews = (props, context) => {
  const formatMessage = context.intl.formatMessage

  return (
    <Wrapper>
      <Block>
        <Icon
          glyph="reviewsStar"
          size={2.5}
          tabletSize={3}
          desktopSize={3.5}
          widescreenSize={4}
          color={colors.secondary}
        />
        <Title>
          {formatMessage(messages.reviewsRanking, {
            ranking: props.ranking
          })}
        </Title>
      </Block>

      <Block>
        <Icon
          glyph="reviewsCheck"
          size={2.5}
          tabletSize={3}
          desktopSize={3.5}
          widescreenSize={4}
          color={colors.secondary}
        />
        <Progress>
          <ProgressBar
            width={`${props.reviewsAmount / props.reviewsGoal > 1
              ? 100
              : props.reviewsAmount / props.reviewsGoal * 100}%`}
          />
        </Progress>
        <Title>
          {formatMessage(messages.reviewsMade, {
            amount: props.reviewsAmount || '0',
            goal: props.reviewsGoal
          })}
        </Title>
      </Block>
    </Wrapper>
  )
}

DetailsReviews.propTypes = {
  reviewsAmount: number,
  reviewsGoal: number,
  ranking: number
}

DetailsReviews.contextTypes = {
  intl: useIntl()
}

export default DetailsReviews
