import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import RouterLink from '../RouterLink'
import { colors, media } from '../../styles'

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

  height: 2px;
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

  ${media.widescreen`
    font-size: 1rem;
  `};
`

const NavLink = props => (
  <Wrapper>
    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
    <Link to={props.to}>{props.label}</Link>
    <Bar isVisible={props.isActive} />
  </Wrapper>
)

NavLink.propTypes = {
  to: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired
}

export default NavLink
