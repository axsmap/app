import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import RouterLink from '../RouterLink'
import { colors } from '../../styles'

const Link = styled(RouterLink)`
  display: flex;

  align-items: center;
  justify-content: center;

  appearance: none;
  border: none;
  border-radius: 3px;
  box-shadow: none;
  height: 2.5rem;
  padding: 1rem;

  background-color: ${colors.primary};
  cursor: pointer;

  color: ${colors.darkestGrey};
  font-size: 1rem;
  font-weight: bold;
  text-decoration: none;
  text-transform: uppercase;

  &:active,
  &:focus {
    outline: 2px solid ${colors.secondary};
  }
`

const LinkButton = props => (
  <Link to={props.to} {...props}>
    {props.label}
  </Link>
)

LinkButton.propTypes = {
  to: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
}

export default LinkButton
