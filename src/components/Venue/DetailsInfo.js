import { string } from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import Icon from '../Icon'
import { colors, media } from '../../styles'

const Wrapper = styled.div`
  display: flex;

  align-items: center;
  flex-direction: column;
  justify-content: center;

  margin-bottom: 2rem;
  padding: 0 1rem;
  width: 100%;

  ${media.tablet`
    align-items: flex-start;
    flex-direction: row;
    padding: 0;
  `};

  ${media.desktop`
    margin-bottom: 3rem;
  `};

  ${media.widescreen`
    margin-bottom: 4rem;
  `};
`

const Box = styled.div`
  display: flex;

  align-items: center;
  flex-direction: column;
  justify-content: center;

  margin-bottom: 2rem;
  width: 75%;

  &:last-of-type {
    margin-bottom: 0;
  }

  ${media.tablet`
    margin-bottom: 0;
    width: 50%;
  `};
`

const Text = styled.p`
  margin: 1rem 0 0 0;

  color: ${colors.darkestGrey};
  font-size: 1rem;
  font-weight: bold;
  text-align: center;

  ${media.desktop`
    font-size: 1.1rem;
  `};

  ${media.widescreen`
    font-size: 1.2rem;
  `};
`

const Link = styled.a`
  overflow: hidden;

  margin: 1rem 0 0 0;
  width: 100%;

  color: ${colors.darkestGrey};
  font-size: 1rem;
  font-weight: bold;
  text-align: center;
  text-overflow: ellipsis;

  &:active,
  &:focus {
    outline: 2px solid ${colors.secondary};
  }

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
