import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import RouterLink from '../RouterLink'
import { colors } from '../../styles'

const Wrapper = styled(({ width, backgroundColor, color, ...rest }) => (
  <RouterLink {...rest} />
))`
  opacity: 1;

  appearance: none;
  border: none;
  border-radius: 3px;
  box-shadow: none;
  height: 3rem;
  margin: 0;
  padding: 0 1rem;
  width: ${props => props.width || 'auto'};

  background-color: ${props => props.backgroundColor || colors.primary};
  cursor: pointer;

  color: ${props => props.color || colors.darkestGrey};
  font-size: ${props => props.fontSize || '1rem'};
  font-weight: bold;
  text-decoration: none;
  text-transform: uppercase;

  &:active,
  &:focus {
    outline: 2px solid ${colors.secondary};
  }

  &:disabled,
  &[disabled] {
    opacity: 0.5;
  }
`

const LinkButton = props => (
  <Wrapper disabled={props.disabled} {...props}>
    {props.children}
  </Wrapper>
)

LinkButton.propTypes = {
  disabled: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired
}

export default LinkButton