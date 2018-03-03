import { string } from 'prop-types'
import React from 'react'
import { intlShape } from 'react-intl'
import styled from 'styled-components'

import { colors, media } from '../../styles'
import Icon from '../Icon'

import messages from './messages'

const Wrapper = styled.div`
  display: flex;

  align-items: center;
  flex-direction: column;

  margin-bottom: 2rem;
  width: 100%;

  ${media.desktop`
    margin-bottom: 3rem;
  `};

  ${media.desktop`
    margin-bottom: 4rem;
  `};
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

  background-color: ${props => props.backgroundColor};

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
  margin: 0.5rem 0 0 0;

  color: white;
  font-weight: bold;
  font-size: 0.9rem;
  text-transform: uppercase;
`

const DetailsSocialMedia = (props, context) => (
  <Wrapper>
    <Title>{context.intl.formatMessage(messages.socialMediaTitle)}</Title>
    <MediaRow>
      <IconLink
        href={`https://facebook.com/sharer/sharer.php?u=${escape(
          `${process.env.REACT_APP_URL}/teams/${props.teamId}`
        )}`}
        target="_blank"
        rel="noopener"
        backgroundColor={colors.facebook}
      >
        <Icon glyph="facebook" size={2} />
        <MediaAction>
          {context.intl.formatMessage(messages.facebookAction)}
        </MediaAction>
      </IconLink>
      <IconLink
        href={`https://twitter.com/intent/tweet/?text=${escape(
          `Support ${props.teamName} in AXS Map`
        )}&amp;url=${escape(
          `${process.env.REACT_APP_URL}/teams/${props.teamId}`
        )}`}
        target="_blank"
        rel="noopener"
        backgroundColor={colors.twitter}
      >
        <Icon glyph="twitter" size={2} />
        <MediaAction>
          {context.intl.formatMessage(messages.twitterAction)}
        </MediaAction>
      </IconLink>
    </MediaRow>
  </Wrapper>
)

DetailsSocialMedia.propTypes = {
  teamId: string.isRequired,
  teamName: string.isRequired
}

DetailsSocialMedia.contextTypes = {
  intl: intlShape
}

export default DetailsSocialMedia
