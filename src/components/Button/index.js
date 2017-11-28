import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import { colors } from '../../styles'

const Wrapper = styled.button`
  opacity: 1;

  appearance: none;
  border: none;
  border-radius: 3px;
  box-shadow: none;
  height: 3rem;
  margin-bottom: ${props => props.marginBottom || '0'};
  margin-top: ${props => props.marginTop || '0'};
  padding: 0 1rem;
  width: ${props => props.width || 'auto'};

  background-color: ${props => props.backgroundColor || colors.primary};
  cursor: pointer;

  color: ${props => props.color || colors.darkestGrey};
  font-size: ${props => props.fontSize || '1rem'};
  font-weight: bold;
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

const Button = props => (
  <Wrapper
    className={props.className}
    disabled={props.disabled}
    onClick={() => props.onClickHandler(...props.arguments)}
    {...props}
  >
    {props.children}
  </Wrapper>
)

Button.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool.isRequired,
  arguments: PropTypes.array,
  onClickHandler: PropTypes.func,
  children: PropTypes.node.isRequired
}

Button.defaultProps = {
  className: '',
  arguments: [],
  onClickHandler: () => {}
}

export default Button
