import { intlShape } from 'react-intl'
import React from 'react'
import { rgba } from 'polished'
import { Link as RouterLink } from 'react-router-dom'
import styled from 'styled-components'

import { colors, media } from '../../styles'

import messages from './messages'

const Wrapper = styled.div`
  position: absolute;
  right: 1rem;
  top: 100%;

  display: none;

  flex-direction: column;

  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  box-shadow: 0 6px 10px -6px ${rgba(colors.darkestGrey, 0.5)};
  padding: 0.5rem;
  width: 10rem;

  background-color: white;

  ${media.desktop`
    display: flex;
  `};
`

const Link = styled(RouterLink)`
  transition: color 0.3s ease-in-out;
  will-change: color;

  margin-bottom: 0.5rem;
  width: 100%;

  color: ${colors.darkGrey};
  font-size: 0.9rem;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;

  &:active,
  &:focus,
  &:hover {
    color: ${colors.primary};
  }
`

const Button = styled.button`
  transition: box-shadow 0.3s ease-in-out, background-color 0.3s ease-in-out;
  will-change: box-shadow, background-color;

  appearance: none;
  border: 0;
  border-radius: 300px;
  box-shadow: none;
  padding: 0.5rem;
  width: 100%;

  background-color: ${colors.alert};
  cursor: pointer;

  color: white;
  font-size: 0.9rem;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;

  &:active,
  &:focus,
  &:hover {
    box-shadow: 0 2px 10px ${rgba(colors.alert, 0.5)};
  }

  &:focus {
    outline: none;
  }

  &:disabled,
  &[disabled] {
    box-shadow: none;

    background-color: ${rgba(colors.alert, 0.5)};
    pointer-events: none;

    color: ${rgba('white', 0.5)};
  }
`

const Dropdown = (props, context) => (
  <Wrapper>
    <Link to="/settings">{context.intl.formatMessage(messages.settings)}</Link>
    <Button>{context.intl.formatMessage(messages.signOut)}</Button>
  </Wrapper>
)

Dropdown.contextTypes = {
  intl: intlShape
}

export default Dropdown
