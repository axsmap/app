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

const Photo = styled.div`
  border-radius: 3px;
  height: 10rem;
  margin-bottom: 2rem;
  width: 10rem;

  background-image: ${props => `url("${props.image}")`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  ${media.tablet`
    height: 11rem;
    width: 11rem;
  `};

  ${media.desktop`
    flex-shrink: 0;

    height: 12rem;
    margin-bottom: 0;
    margin-right: 2rem;
    width: 12rem;
  `};

  ${media.widescreen`
    height: 13rem;
    width: 13rem;
  `};
`

const IconWrapper = styled.div`
  display: flex;

  align-items: center;
  justify-content: center;

  border-radius: 3px;
  height: 10rem;
  margin-bottom: 2rem;
  width: 10rem;

  background-color: ${props => props.backgroundColor};

  ${media.tablet`
    height: 11rem;
    width: 11rem;
  `};

  ${media.desktop`
    flex-shrink: 0;

    height: 12rem;
    margin-bottom: 0;
    margin-right: 2rem;
    width: 12rem;
  `};

  ${media.widescreen`
    height: 13rem;
    width: 13rem;
  `};
`

const Info = styled.div`
  display: flex;

  align-items: flex-start;
  flex-direction: column;
  justify-content: center;

  height: 100%;
  padding: 1rem;
  width: 100%;

  background-color: ${props => props.backgroundColor};

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

const Description = styled.p`
  margin: 0.5rem 0 0 0;
  width: 100%;

  color: ${props => props.color};
  font-size: 1rem;
  font-weight: bold;
  text-align: center;

  ${media.tablet`
    font-size: 1rem;
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
    color = colors.darkestGrey
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
        <Photo image={props.coverPhoto} />
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
        <Description color={color}>
          {context.intl.formatMessage(reviewDescriptionMessage)}
        </Description>
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
