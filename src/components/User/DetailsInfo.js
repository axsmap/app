import { bool, string } from 'prop-types'
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

const DetailsInfo = props => {
  if (props.showEmail || props.showPhone) {
    return (
      <Wrapper>
        {props.showEmail && props.email ? (
          <Box>
            <Icon
              glyph="email"
              size={2.5}
              tabletSize={3}
              desktopSize={3.5}
              widescreenSize={4}
              color={colors.secondary}
            />
            <Link href={`mailto:${props.email}?Subject=Hello`}>
              {props.email}
            </Link>
          </Box>
        ) : null}

        {props.showPhone && props.phone ? (
          <Box>
            <Icon
              glyph="phone"
              size={2.5}
              tabletSize={3}
              desktopSize={3.5}
              widescreenSize={4}
              color={colors.secondary}
            />
            <Link href={`tel:${props.phone}`}>{props.phone}</Link>
          </Box>
        ) : null}
      </Wrapper>
    )
  }

  return null
}

DetailsInfo.propTypes = {
  showEmail: bool,
  email: string,
  showPhone: bool,
  phone: string
}

export default DetailsInfo
