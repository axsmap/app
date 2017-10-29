import { intlShape } from 'react-intl'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import { colors } from '../../styles'

import messages from './messages'

const Wrapper = styled(({ isActive, ...rest }) => <Link {...rest} />)`
  display: flex;

  align-items: center;
  flex-direction: column;
  justify-content: center;

  height: inherit;

  cursor: pointer;

  color: ${props => (props.isActive ? colors.primary : colors.lightestGrey)};
  text-decoration: none;

  &:active,
  &:focus {
    outline: 2px solid ${colors.primary};
  }

  &.active {
    color: ${colors.primary};
  }
`

const Image = styled.img`
  border-radius: 100%;
  height: 1.2rem;
  margin-bottom: 0.2rem;
  width: inherit;
`

const Label = styled.p`
  margin: 0;
  width: 100%;

  font-size: 0.7rem;
  text-align: center;
`

const TabAccount = (props, context) => {
  const isActive = context.router.route.location.pathname === '/account'

  return (
    <Wrapper isActive={isActive} to="/account">
      <Image src={props.avatarUrl} alt="Your account avatar" />
      <Label>{context.intl.formatMessage(messages.tabAccount)}</Label>
    </Wrapper>
  )
}

TabAccount.propTypes = {
  avatarUrl: PropTypes.string.isRequired
}

TabAccount.contextTypes = {
  intl: intlShape,
  router: PropTypes.object
}

export default TabAccount
