import { string } from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import { colors, media } from '../../styles'

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

const Info = styled.div`
  display: flex;

  align-items: flex-start;
  flex-direction: column;
  justify-content: center;

  height: 100%;
  padding: 1rem;
  width: 100%;

  background-color: ${colors.lightGrey};

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

  color: ${colors.darkestGrey};
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

  color: ${colors.darkGrey};
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

const DetailsHeader = props => (
  <Wrapper>
    <Photo image={props.avatar} />
    <Info>
      <Name>{props.name}</Name>
      <Description>{props.description}</Description>
    </Info>
  </Wrapper>
)

DetailsHeader.propTypes = {
  avatar: string.isRequired,
  name: string.isRequired,
  description: string.isRequired
}

export default DetailsHeader
