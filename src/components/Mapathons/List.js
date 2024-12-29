import { array, bool } from 'prop-types'
import React from 'react'
import { intlShape } from 'react-intl'
import styled from 'styled-components'

import Icn from '../Icon'
import RouterLink from '../RouterLink'
import { colors, media } from '../../styles'

import messages from './messages'

const Wrapper = styled.div`
  flex-grow: 1;
  width: 100%;

  &::after {
    display: table;
    clear: both;
    content: '';
  }
`

const Item = styled(RouterLink)`
  float: left;

  display: flex;

  align-items: center;
  justify-content: center;

  border: 1px solid ${colors.grey};
  margin-bottom: 1rem;
  margin-right: 0;
  border-radius: 3px;
  width: 100%;
  height: 10rem;

  background-color: white;

  text-decoration: none;

  &:active,
  &:focus {
    outline: 2px solid ${colors.secondary};
  }

  &:disabled,
  &[disabled] {
    opacity: 0.5;
  }

  ${media.tablet`
    margin-bottom: 2rem;
    margin-right: 2rem;
    width: calc((100% - 2rem * 1) / 2);

    &:nth-child(2n+2) {
      float: right;
      margin-right: 0;
    }
  `};

  ${media.desktop`
    flex-direction: column;

    margin-bottom: 2rem;
    margin-right: 2rem;
    width: calc((100% - 2rem * 3) / 4);
    height: 20rem;

    &:nth-child(2n+2) {
      float: left;
      margin-right: 2rem;
    }

    &:nth-child(3n+3) {
      float: left;
      margin-right: 2rem;
    }

    &:nth-child(4n+4) {
      float: right;
      margin-right: 0;
    }
  `};
`

const Poster = styled.div`
  flex-shrink: 0;

  border-radius: 3px 0 0 3px;
  width: 30%;
  height: 99.9%;

  background-image: ${props => `url("${props.image}")`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  ${media.desktop`
    flex-shrink: 1;

    border-radius: 3px 3px 0 0;
    height: 50%;
    width: 100%;
  `};
`

const Info = styled.div`
  display: flex;

  flex-direction: column;
  justify-content: space-between;

  height: inherit;
  padding: 1rem;
  width: 70%;

  ${media.desktop`
    border-radius: 0 0 3px 3px;
    height: 50%;
    width: 100%;
  `};
`

const Name = styled.h3`
  overflow: hidden;

  margin: 0 0 1rem 0;
  width: 100%;

  color: ${colors.darkestGrey};
  text-overflow: ellipsis;
  white-space: nowrap;
`

const AddressWrapper = styled.div`
  display: flex;

  align-items: center;

  margin-bottom: 0.2rem;
  width: 100%;
`

const Icon = styled(Icn)`flex-shrink: 0;`

const AddressText = styled.p`
  overflow: hidden;

  margin: 0 0 0 0.5rem;

  color: ${colors.darkestGrey};
  font-size: 0.9rem;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const DatesWrapper = styled.div`
  display: flex;

  align-items: center;

  margin-bottom: 1rem;
  width: 100%;
`

const DatesText = styled.p`
  overflow: hidden;

  margin: 0 0 0 0.5rem;

  color: ${colors.darkestGrey};
  font-size: 0.9rem;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const ReviewsBar = styled.div`
  height: 0.2rem;
  width: 100%;
  background-color: ${colors.lightGrey};
`

const ReviewsFill = styled.div`
  height: inherit;
  width: ${props => props.width};
  background-color: ${colors.success};
`

const ReviewsText = styled.p`
  overflow: hidden;

  margin: 0 0 0.5rem 0;

  color: ${colors.darkestGrey};
  font-size: 0.9rem;
  font-weight: bold;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const List = (props, context) => {
  const formatMessage = context.intl.formatMessage
  const formatDate = context.intl.formatDate

  if (props.mapathons.length === 0) return null

  return (
    <Wrapper>
      {props.mapathons.map(m => (
        <Item
          key={m.id}
          to={`/mapathons/${m.id}`}
          disabled={props.sendingRequest}
        >
          <Poster image={m.poster} />

          <Info>
            <Name>{m.name}</Name>

            <AddressWrapper>
              <Icon glyph="marker" size={1} color={colors.darkGrey} />
              <AddressText>{m.address}</AddressText>
            </AddressWrapper>
            <DatesWrapper>
              <Icon glyph="calendar" size={1} color={colors.darkGrey} />
              <DatesText>
                {formatMessage(messages.dates, {
                  startDate: formatDate(new Date(m.startDate), {
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric'
                  }),
                  endDate: formatDate(new Date(m.endDate), {
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric'
                  })
                })}
              </DatesText>
            </DatesWrapper>

            <ReviewsText>
              {formatMessage(messages.reviews, {
                amount: m.reviewsAmount === 0 ? '0' : m.reviewsAmount,
                goal: m.reviewsGoal
              })}
            </ReviewsText>
            <ReviewsBar>
              <ReviewsFill
                width={`${m.reviewsAmount / m.reviewsGoal > 1
                  ? 100
                  : m.reviewsAmount / m.reviewsGoal * 100}%`}
              />
            </ReviewsBar>
          </Info>
        </Item>
      ))}
    </Wrapper>
  )
}

List.propTypes = {
  mapathons: array.isRequired,
  sendingRequest: bool.isRequired
}

List.contextTypes = {
  intl: intlShape
}

export default List
