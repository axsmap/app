/* eslint-disable jsx-a11y/anchor-is-valid */
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import RouterLink from '../RouterLink'
import { colors, media, fontSize } from '../../styles'

const Wrapper = styled.div`
  position: relative;

  display: flex;

  align-items: center;
  justify-content: center;

  height: inherit;
  margin-right: 0.5rem;
`

const Bar = styled.div`
  bottom: 0;
  left: 0;
  position: absolute;

  display: ${props => (props.isVisible ? 'block' : 'none')};

  height: 3px;
  width: 100%;

  background-color: ${colors.primary};
`

const Link = styled(RouterLink)`
  display: flex;

  align-items: center;
  justify-content: center;

  height: inherit;
  padding: 0 0.5rem;
  width: 100%;

  color: ${colors.darkestGrey};
  font-size: 0.6rem;
  font-weight: bold;
  text-decoration: none;
  text-transform: uppercase;

  &:active,
  &:focus {
    box-shadow: inset 0px 0px 0px 2px ${colors.secondary};
    outline: none;
  }

  &:hover {
    color: ${colors.secondary};
  }

  ${media.desktop`
    font-size: ${fontSize.xs};
  `};

  ${media.widescreen`
    font-size: ${fontSize.base};
  `};
`

const LinkAbsolute = styled.a`
  display: flex;

  align-items: center;
  justify-content: center;

  height: inherit;
  padding: 0 0.5rem;
  width: 100%;

  color: ${colors.darkestGrey};
  font-size: 0.6rem;
  font-weight: bold;
  text-decoration: none;
  text-transform: uppercase;

  &:active,
  &:focus {
    box-shadow: inset 0px 0px 0px 2px ${colors.secondary};
    outline: none;
  }

  &:hover {
    color: ${colors.secondary};
  }

  ${media.desktop`
    font-size: ${fontSize.xs};
  `};

  ${media.widescreen`
    font-size: ${fontSize.base};
  `};
`

const NavLink = props => (
  <Wrapper>
    {props.isAbsolute ? (
      <LinkAbsolute href={props.to} target="_blank">
        {props.label}
      </LinkAbsolute>
    ) : (
      <Link to={props.to}>{props.label}</Link>
    )}
    <Bar isVisible={props.isActive} />
  </Wrapper>
)

NavLink.propTypes = {
  isAbsolute: PropTypes.bool,
  to: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired
}

NavLink.defaultProps = {
  isAbsolute: false
}

export default NavLink
