import { number, string } from 'prop-types'
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

  margin-bottom: 2rem;
  width: 100%;

  ${media.desktop`
    align-items: flex-start;
    flex-direction: row;
    margin-bottom: 3rem;
  `};

  ${media.widescreen`
    margin-bottom: 4rem;
  `};
`

const Info = styled.div`
  display: flex;

  align-items: flex-start;
  flex-direction: column;
  justify-content: center;

  height: 100%;
  padding: 0 1rem;
  width: 100%;

  ${media.tablet`
    border-radius: 3px;
    padding: 2rem;
  `};

  ${media.desktop`
    min-height: 12rem;
  `};

  ${media.widescreen`
    min-height: 13rem;
  `};
`

const Name = styled.h1`
  overflow: hidden;

  margin: 0;
  width: 100%;

  color: ${props => props.color};
  font-size: 1.2rem;
  text-align: center;
  text-overflow: ellipsis;

  ${media.tablet`
    font-size: 1.5rem;
    text-align: center;
  `};

  ${media.desktop`
    font-size: 1.6rem;
  `};

  ${media.widescreen`
    font-size: 1.7rem;
  `};
`
const Header = (props, context) => {
  let backgroundColor = colors.grey
  let reviewDescriptionMessage = messages.reviewUnknownDescription
  let color = colors.darkestGrey
  if (props.reviewsRatioWeight > 0 && props.reviewsRatioWeight < 0.25) {
    backgroundColor = colors.alert
    color = 'white'
    reviewDescriptionMessage = messages.reviewBadDescription
  } else if (
    props.reviewsRatioWeight >= 0.25 &&
    props.reviewsRatioWeight < 0.75
  ) {
    backgroundColor = colors.primary
    color = 'white'
    reviewDescriptionMessage = messages.reviewAverageDescription
  } else if (
    props.reviewsRatioWeight >= 0.75 &&
    props.reviewsRatioWeight <= 1
  ) {
    backgroundColor = colors.success
    color = 'white'
    reviewDescriptionMessage = messages.reviewGoodDescription
  }

  return (
    <Wrapper>
      <Info backgroundColor={backgroundColor}>
        <Name color={color}>{props.name}</Name>
      </Info>
    </Wrapper>
  )
}

Header.propTypes = {
  reviewsRatioWeight: number.isRequired,
  generalType: string.isRequired,
  name: string.isRequired
}

Header.contextTypes = {
  intl: intlShape
}

export default Header
