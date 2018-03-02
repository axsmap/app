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
  justify-content: center;

  height: 8rem;
  margin-top: -2rem;
  width: 100%;

  ${media.tablet`
    height: 10rem;
    margin-top: 0;
  `};

  ${media.desktop`
    height: 12rem;
  `};

  ${media.widescreen`
    height: 14rem;
  `};
`

const Photo = styled.div`
  height: 100%;
  width: 30%;

  background-image: ${props => `url("${props.backgroundImage}")`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  ${media.tablet`
    border-bottom-left-radius: 3px;
    border-top-left-radius: 3px;
  `};

  ${media.desktop`
    width: 40%;
  `};

  ${media.widescreen`
    width: 50%;
  `};
`

const IconWrapper = styled.div`
  display: flex;

  align-items: center;
  justify-content: center;

  height: 100%;
  width: 30%;

  background-color: ${props => props.backgroundColor};

  ${media.tablet`
    border-bottom-left-radius: 3px;
    border-top-left-radius: 3px;
  `};

  ${media.desktop`
    width: 40%;
  `};

  ${media.widescreen`
    width: 50%;
  `};
`

const Info = styled.div`
  display: flex;

  align-items: flex-start;
  flex-direction: column;
  justify-content: center;

  height: 100%;
  padding: 1rem;
  width: 70%;

  background-color: ${props => props.backgroundColor};

  ${media.tablet`
    border-bottom-right-radius: 3px;
    border-top-right-radius: 3px;
  `};

  ${media.desktop`
    width: 60%;
  `};

  ${media.widescreen`
    width: 50%;
  `};
`

const Name = styled.h1`
  overflow: hidden;

  margin: 0 0 0.5rem 0;
  width: 100%;

  color: ${props => props.color};
  font-size: 1.2rem;
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

const ReviewDescription = styled.p`
  margin: 0;
  width: 100%;

  color: ${props => props.color};
  font-size: 1rem;
  font-weight: bold;

  ${media.tablet`
    text-align: center;
  `};

  ${media.desktop`
    font-size: 1.1rem;
  `};

  ${media.widescreen`
    font-size: 1.2rem;
  `};
`

const Header = (props, context) => {
  let backgroundColor = colors.primary
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
    backgroundColor = colors.warning
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
      {props.coverPhoto ? (
        <Photo backgroundImage={props.coverPhoto} />
      ) : (
        <IconWrapper backgroundColor={backgroundColor}>
          <Icon
            glyph={props.generalType}
            size={5}
            tabletSize={6}
            desktopSize={7}
            widescreenSize={8}
            color={color}
          />
        </IconWrapper>
      )}
      <Info backgroundColor={backgroundColor}>
        <Name color={color}>{props.name}</Name>
        <ReviewDescription color={color}>
          {context.intl.formatMessage(reviewDescriptionMessage)}
        </ReviewDescription>
      </Info>
    </Wrapper>
  )
}

Header.propTypes = {
  reviewsRatioWeight: number.isRequired,
  coverPhoto: string,
  generalType: string.isRequired,
  name: string.isRequired
}

Header.contextTypes = {
  intl: intlShape
}

export default Header
