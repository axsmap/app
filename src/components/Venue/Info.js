import { string } from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import Icon from '../Icon'
import { colors, media } from '../../styles'

const Wrapper = styled.div`
  display: flex;

  align-items: flex-start;
  flex-direction: column;
  justify-content: center;

  width: 100%;

  ${media.tablet`
    flex-direction: row;
    width: 723px;
  `};

  ${media.desktop`
    width: 933px;
  `};

  ${media.widescreen`
    width: 1127px;
  `};
`

const Box = styled.div`
  display: flex;

  align-items: center;
  flex: 1;
  flex-direction: column;
  justify-content: center;

  padding: 1rem;
  width: 100%;

  &:first-of-type {
    padding-top: 2rem;
  }

  &:last-of-type {
    padding-bottom: 2rem;
  }

  ${media.tablet`
    padding: 2rem 0;

    &:first-of-type {
      padding: 2rem 0;
    }

    &:last-of-type {
      padding: 2rem 0;
    }
  `};

  ${media.desktop`
    padding: 3rem 0;

    &:first-of-type {
      padding: 3rem 0;
    }

    &:last-of-type {
      padding: 3rem 0;
    }
  `};

  ${media.desktop`
    padding: 4rem 0;

    &:first-of-type {
      padding: 4rem 0;
    }

    &:last-of-type {
      padding: 4rem 0;
    }
  `};
`

const Text = styled.p`
  margin: 1rem 0 0 0;

  color: ${colors.darkestGrey};
  font-size: 0.9rem;
  text-align: center;

  ${media.tablet`
    font-size: 1rem;
  `};

  ${media.desktop`
    font-size: 1.1rem;
  `};

  ${media.widescreen`
    font-size: 1.2rem;
  `};
`

const Link = styled.a`
  margin: 1rem 0 0 0;

  color: ${colors.darkestGrey};
  font-size: 0.9rem;
  font-weight: bold;
  text-align: center;

  &:active,
  &:focus {
    outline: 2px solid ${colors.secondary};
  }

  ${media.tablet`
    font-size: 1rem;
  `};

  ${media.desktop`
    font-size: 1.1rem;
  `};

  ${media.widescreen`
    font-size: 1.2rem;
  `};
`

const Info = props => (
  <Wrapper>
    <Box>
      <Icon
        glyph="address"
        size={2.5}
        tabletSize={3}
        desktopSize={3.5}
        widescreenSize={4}
        color={colors.secondary}
      />
      <Text>{props.address}</Text>
    </Box>

    {props.formattedPhone ? (
      <Box>
        <Icon
          glyph="phone"
          size={2.5}
          tabletSize={3}
          desktopSize={3.5}
          widescreenSize={4}
          color={colors.secondary}
        />
        <Link href={`tel:${props.internationalPhone}`}>
          {props.formattedPhone}
        </Link>
      </Box>
    ) : null}

    {props.website ? (
      <Box>
        <Icon
          glyph="website"
          size={2.5}
          tabletSize={3}
          desktopSize={3.5}
          widescreenSize={4}
          color={colors.secondary}
        />
        <Link href={props.website} target="_blank">
          {props.website}
        </Link>
      </Box>
    ) : null}
  </Wrapper>
)

Info.propTypes = {
  address: string.isRequired,
  formattedPhone: string,
  internationalPhone: string,
  website: string
}

export default Info
