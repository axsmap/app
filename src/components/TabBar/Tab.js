import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import RouterLink from '../RouterLink'
import { colors } from '../../styles'

const Wrapper = styled(RouterLink)`
  display: flex;

  align-items: center;
  flex-direction: column;
  justify-content: center;

  height: inherit;

  cursor: pointer;

  text-decoration: none;

  &:active,
  &:focus {
    outline: 2px solid ${colors.primary};
  }
`

const Label = styled.p`
  margin: 0.2rem 0 0 0;
  width: 100%;

  color: ${props => (props.active ? colors.primary : 'white')};
  font-size: 0.5rem;
  text-align: center;
`

const Tab = (props, context) => {
  const active = context.router.route.location.pathname === props.to

  return (
    <Wrapper to={props.to}>
      {active ? props.activeIcon : props.icon}
      <Label active={active}>{props.label}</Label>
    </Wrapper>
  )
}

Tab.contextTypes = {
  router: PropTypes.object
}

Tab.propTypes = {
  to: PropTypes.string.isRequired,
  activeIcon: PropTypes.element,
  icon: PropTypes.element.isRequired,
  label: PropTypes.string.isRequired
}

export default Tab
