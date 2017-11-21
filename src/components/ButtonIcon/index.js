import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import { colors } from '../../styles'

const Button = styled.button`
  position: relative;
  z-index: 10;

  opacity: 1;

  appearance: none;
  border: none;
  border-radius: 3px;
  box-shadow: none;
  height: 3rem;
  margin: 0;
  padding: 0 1rem 0 3rem;

  background-color: ${props => props.backgroundColor};
  cursor: pointer;

  color: ${props => props.color};
  font-size: 0.8rem;
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

const Icon = styled.img`
  left: 1rem;
  position: absolute;
  top: 0.75rem;

  height: 1.5rem;
`

const ButtonIcon = props => (
  <Button
    className={props.className}
    backgroundColor={props.backgroundColor}
    color={props.color}
    disabled={props.disabled}
    onClick={() => props.onClick.apply(this, props.arguments)}
  >
    {props.text}
    <Icon src={props.icon} />
  </Button>
)

ButtonIcon.propTypes = {
  className: PropTypes.string,
  backgroundColor: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  arguments: PropTypes.array,
  text: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}

ButtonIcon.defaultProps = {
  className: '',
  arguments: []
}

export default ButtonIcon
