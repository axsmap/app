import React from 'react'
import styled from 'styled-components'

import { colors, media } from '../../styles'
import Icon from '../Icon'

import Title from './Title'

const Wrapper = styled.article`
  align-items: center;
  flex-direction: column;

  display: flex;

  margin: 0;
  width: 100%;
  padding: 2rem 0;
`

const MediaRow = styled.div`
  justify-content: center;

  display: flex;

  margin-top: 1rem;
  width: 100%;
`

const IconLink = styled.a`
  display: flex;

  align-items: center;
  flex-direction: column;
  justify-content: center;

  opacity: 1;

  border-radius: 3px;
  height: 5rem;
  margin-right: 2rem;
  width: 4rem;

  background-color: ${colors.primary};

  text-decoration: none;

  &:active,
  &:focus {
    outline: 2px solid ${colors.secondary};
  }

  &:focus,
  &:hover {
    opacity: 0.8;
  }

  &:last-child {
    margin-right: 0;
  }

  ${media.tablet`
    margin-right: 1rem;
  `};
`

const MediaAction = styled.p`
  margin: 0.2rem 0 0;

  color: ${colors.darkestGrey};
  font-weight: bold;
  font-size: 0.9rem;
  text-transform: uppercase;
`

const SocialMedia = () => (
  <Wrapper>
    <Title>invite friends and family to donate</Title>
    <MediaRow>
      <IconLink
        href="https://facebook.com/axsmap"
        target="_blank"
        rel="noopener"
      >
        <Icon color={colors.darkestGrey} glyph="facebook" size={2.5} />
        <MediaAction>Share</MediaAction>
      </IconLink>
      <IconLink
        href="https://twitter.com/axsmap"
        target="_blank"
        rel="noopener"
      >
        <Icon color={colors.darkestGrey} glyph="twitter" size={2.5} />
        <MediaAction>Tweet</MediaAction>
      </IconLink>
      <IconLink
        href="https://youtube.com/axsmaptv"
        target="_blank"
        rel="noopener"
      >
        <Icon color={colors.darkestGrey} glyph="email" size={2.5} />
        <MediaAction>Email</MediaAction>
      </IconLink>
    </MediaRow>
  </Wrapper>
)

export default SocialMedia
