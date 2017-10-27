import { intlShape } from 'react-intl'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import { colors, media } from '../../styles'

import messages from './messages'

const Button = styled.button`
  display: none;

  align-items: center;
  justify-content: center;

  border: none;
  border-radius: 0;
  box-shadow: none;
  height: inherit;
  padding: 0 0.5rem;

  appereance: none;
  background-color: transparent;
  cursor: pointer;

  color: ${colors.darkestGrey};
  text-transform: uppercase;

  &:active,
  &:focus {
    box-shadow: inset 0px 0px 0px 2px ${colors.primary};
    outline: none;
  }

  ${media.desktop`
    display: ${props => (props.isVisible ? 'flex' : 'none')};
  `};
`

const Avatar = styled.img`height: 1.5rem;`

const DropdownButton = (props, context) => (
  <Button {...props}>
    {context.intl.formatMessage(messages.navAccount)}
    <Avatar src={props.avatarUrl} alt="User avatar image" />
  </Button>
)

DropdownButton.propTypes = {
  avatarUrl: PropTypes.string
}

DropdownButton.contextTypes = {
  intl: intlShape
}

export default DropdownButton
