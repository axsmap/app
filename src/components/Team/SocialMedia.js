import { string } from 'prop-types'
import React from 'react'
import { intlShape } from 'react-intl'
import styled from 'styled-components'

import { colors, media } from '../../styles'
import Icon from '../Icon'

import messages from './messages'
import Title from './Title'

const Wrapper = styled.article`
  display: flex;

  align-items: center;
  flex-direction: column;

  margin-top: 2rem;
  width: 100%;
`

const MediaRow = styled.div`
  display: flex;

  justify-content: center;

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
  width: 5rem;

  background-color: ${colors.primary};

  text-decoration: none;

  &:active,
  &:focus {
    outline: 2px solid ${colors.secondary};
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

const SocialMedia = (props, context) => (
  <Wrapper>
    <Title>{context.intl.formatMessage(messages.socialMediaTitle)}</Title>
    <MediaRow>
      <IconLink
        href={`https://facebook.com/sharer/sharer.php?u=${escape(
          `${process.env.REACT_APP_API_URL}/teams/${props.teamId}`
        )}`}
        target="_blank"
        rel="noopener"
      >
        <Icon color={colors.darkestGrey} glyph="facebook" size={2.5} />
        <MediaAction>
          {context.intl.formatMessage(messages.facebookAction)}
        </MediaAction>
      </IconLink>
      <IconLink
        href={`https://twitter.com/intent/tweet/?text=${escape(
          `Support ${props.teamName} in AXS Map`
        )}&amp;url=${escape(
          `${process.env.REACT_APP_API_URL}/teams/${props.teamId}`
        )}`}
        target="_blank"
        rel="noopener"
      >
        <Icon color={colors.darkestGrey} glyph="twitter" size={2.5} />
        <MediaAction>
          {context.intl.formatMessage(messages.twitterAction)}
        </MediaAction>
      </IconLink>
    </MediaRow>
  </Wrapper>
)

SocialMedia.propTypes = {
  teamId: string.isRequired,
  teamName: string.isRequired
}

SocialMedia.contextTypes = {
  intl: intlShape
}

export default SocialMedia
