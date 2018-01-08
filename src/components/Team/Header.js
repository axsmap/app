import { string } from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import { colors, media } from '../../styles'

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

const Info = styled.div`
  display: flex;

  align-items: flex-start;
  flex-direction: column;
  justify-content: center;

  height: 100%;
  padding: 1rem;
  width: 70%;

  background-color: ${colors.lightGrey};

  color: ${colors.darkestGrey};

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

const Description = styled.p`
  margin: 0;
  width: 100%;

  font-size: 0.9rem;
  font-weight: bold;

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

const Header = ({ avatar, description, name }) => (
  <Wrapper>
    <Photo backgroundImage={avatar} />
    <Info>
      <Name>{name}</Name>
      <Description>{description}</Description>
    </Info>
  </Wrapper>
)

Header.propTypes = {
  avatar: string.isRequired,
  description: string.isRequired,
  name: string.isRequired
}

export default Header
