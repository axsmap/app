import { intlShape } from 'react-intl'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import { colors, media } from '../../styles'
import downArrowIcon from '../../images/down-arrow.svg'

import messages from './messages'

const Button = styled.button`
  display: none;

  align-items: center;
  justify-content: center;

  transition: box-shadow 0.3s ease-in-out;
  will-change: box-shadow;

  border: none;
  border-radius: 300px;
  box-shadow: inset 0px 0px 0px 1px ${colors.primary};
  height: 2.5rem;
  padding: 0 1rem;
  width: 10rem;

  appereance: none;
  background-color: transparent;
  cursor: pointer;

  color: ${colors.primary};
  text-transform: uppercase;

  &:active,
  &:focus,
  &:hover {
    box-shadow: inset 0px 0px 0px 2px ${colors.primary};
    outline: none;
  }

  ${media.desktop`
    display: flex;
  `};
`

const Icon = styled.img`
  transform: ${props => (props.rotate ? 'rotate(180deg)' : 'rotate(0deg)')};

  transition: transform 0.3s ease-in-out;
  will-change: transform;

  height: 1.5rem;
  margin-left: 0.5rem;
  width: auto;
`

const DropdownButton = (props, context) => (
  <Button {...props}>
    {context.intl.formatMessage(messages.account)}
    <Icon src={downArrowIcon} rotate={props.showDropdown} />
  </Button>
)

DropdownButton.propTypes = {
  showDropdown: PropTypes.bool.isRequired
}

DropdownButton.contextTypes = {
  intl: intlShape
}

export default DropdownButton
