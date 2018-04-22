import { arrayOf, number, shape, string } from 'prop-types'
import React from 'react'
import { intlShape } from 'react-intl'
import styled from 'styled-components'

import Icon from '../Icon'
import { colors, media } from '../../styles'

import messages from './messages'

const Wrapper = styled.div`
  display: flex;

  align-items: center;
  flex-direction: column;
  justify-content: center;

  margin-top: 2rem;
  width: 100%;

  ${media.desktop`
    margin-top: 3rem;
  `};

  ${media.widescreen`
    margin-top: 4rem;
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

const ReviewsWrapper = styled.div`
  display: flex;

  align-items: flex-start;
  flex-direction: column;
  justify-content: center;

  padding: 0 1rem;
  width: 100%;

  ${media.tablet`
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0;
  `};
`

const Review = styled.div`
  display: flex;

  align-items: center;
  flex-direction: column;
  justify-content: center;

  border-radius: 3px;
  margin-bottom: 2rem;
  padding: 1rem;
  width: 100%;

  background-color: ${colors.lightGrey};

  &:last-of-type {
    margin-bottom: 0;
  }

  ${media.tablet`
    width: 48%;

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

const Row = styled.div`
  display: flex;

  align-items: center;
  justify-content: ${props => {
    if (props.isLeft) {
      return 'flex-start'
    } else if (props.isSpaced) {
      return 'space-between'
    }

    return 'center'
  }};

  margin-bottom: 1rem;
  width: 100%;

  &:last-of-type {
    margin-bottom: 0;
  }
`

const UserAvatar = styled.div`
  border-radius: 100%;
  height: 4rem;
  margin-right: 1rem;
  width: 4rem;

  background-image: ${props => `url("${props.image}")`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`

const Column = styled.div`
  display: flex;

  align-items: flex-start;
  flex-direction: column;
  justify-content: center;
`

const UserFullName = styled.p`
  margin: 0 0 0.5rem 0;
  color: ${colors.darkestGrey};
  font-weight: bold;
`

const ReviewDate = styled.p`
  margin: 0;
  color: ${colors.darkGrey};
  font-weight: bold;
`

const ScoreWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`

const ScoreIcon = styled.div`
  display: flex;

  align-items: center;
  justify-content: center;

  border-radius: 3px;
  height: 2rem;
  margin-right: 0.5rem;
  width: 2rem;

  background-color: ${props => props.backgroundColor || colors.grey};
`

const ScoreStar = styled(Icon)`
  margin-right: 0.4rem;

  &:last-of-type {
    margin-right: 0;
  }
`

const Comments = styled.p`
  margin: 0;
  width: 100%;

  color: ${colors.darkestGrey};
  font-style: italic;
`

const DetailsReviews = (props, context) => {
  const formatDate = context.intl.formatDate
  const formatMessage = context.intl.formatMessage

  const reviews = props.reviews.map(r => {
    const entryScoreStars = []
    let i = 1
    while (i <= 5) {
      if (i <= r.entryScore) {
        entryScoreStars.push(
          <ScoreStar
            key={`entryScore${i}`}
            glyph="star"
            size={1}
            color={colors.primary}
          />
        )
      } else {
        entryScoreStars.push(
          <ScoreStar
            key={`entryScore${i}`}
            glyph="star"
            size={1}
            color={colors.grey}
          />
        )
      }
      i += 1
    }

    let entryScoreColor = colors.grey
    if (entryScoreStars.length <= 2) entryScoreColor = colors.alert
    if (entryScoreStars.length === 3) entryScoreColor = colors.warning
    if (entryScoreStars.length > 3) entryScoreColor = colors.success

    const bathroomScoreStars = []
    i = 1
    while (i <= 5) {
      if (i <= r.bathroomScore) {
        bathroomScoreStars.push(
          <ScoreStar
            key={`bathroomScore${i}`}
            glyph="star"
            size={1}
            color={colors.primary}
          />
        )
      } else {
        bathroomScoreStars.push(
          <ScoreStar
            key={`bathroomScore${i}`}
            glyph="star"
            size={1}
            color={colors.grey}
          />
        )
      }
      i += 1
    }

    let bathroomScoreColor = colors.grey
    if (bathroomScoreStars.length <= 2) bathroomScoreColor = colors.alert
    if (bathroomScoreStars.length === 3) bathroomScoreColor = colors.warning
    if (bathroomScoreStars.length > 3) bathroomScoreColor = colors.success

    return (
      <Review key={r.id}>
        <Row isLeft>
          <UserAvatar image={r.user[0].avatar} />
          <Column>
            <UserFullName>{`${r.user[0].firstName} ${r.user[0]
              .lastName[0]}.`}</UserFullName>
            <ReviewDate>
              {formatMessage(messages.reviewedOnText, {
                reviewDate: formatDate(new Date(r.createdAt), {
                  year: 'numeric',
                  month: 'numeric',
                  day: 'numeric'
                })
              })}
            </ReviewDate>
          </Column>
        </Row>

        <Row isSpaced>
          <ScoreWrapper>
            <ScoreIcon backgroundColor={entryScoreColor}>
              <Icon glyph="entry" size={1.5} />
            </ScoreIcon>
            {entryScoreStars}
          </ScoreWrapper>

          <ScoreWrapper>
            <ScoreIcon backgroundColor={bathroomScoreColor}>
              <Icon glyph="bathroom" size={1.5} />
            </ScoreIcon>
            {bathroomScoreStars}
          </ScoreWrapper>
        </Row>

        {r.comments ? (
          <Row>
            <Comments>{r.comments}</Comments>
          </Row>
        ) : null}
      </Review>
    )
  })

  return (
    <Wrapper>
      <Title>{formatMessage(messages.reviewsTitle)}</Title>
      <ReviewsWrapper>{reviews.map(r => r)}</ReviewsWrapper>
    </Wrapper>
  )
}

DetailsReviews.propTypes = {
  reviews: arrayOf(
    shape({
      id: string.isRequired,
      bathroomScore: number,
      comments: string,
      createdAt: string,
      entryScore: number.isRequired,
      user: arrayOf(
        shape({
          id: string.isRequired,
          avatar: string.isRequired,
          firstName: string.isRequired,
          lastName: string.isRequired
        })
      ).isRequired
    })
  )
}

DetailsReviews.contextTypes = {
  intl: intlShape
}

export default DetailsReviews
