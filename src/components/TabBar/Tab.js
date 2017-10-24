import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import { colors } from '../../styles'

const Wrapper = styled(Link)`
  display: flex;

  align-items: center;
  flex-direction: column;
  justify-content: center;

  height: inherit;

  cursor: pointer;

  color: ${colors.lightestGrey};
  text-decoration: none;

  &:active,
  &:focus {
    box-shadow: inset 0px 0px 0px 2px ${colors.secondary};
    outline: none;
  }

  &.active {
    color: ${colors.primary};
  }
`

const Icon = styled.img`
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

const Tab = (props, context) => {
  const isActive = context.router.route.location.pathname === props.to
  const className = isActive ? 'active' : ''
  const iconSrc = isActive ? props.srcHighlighted : props.src

  return (
    <Wrapper className={className} to={props.to}>
      <Icon src={iconSrc} />
      <Label>{props.label}</Label>
    </Wrapper>
  )
}

Tab.contextTypes = {
  router: PropTypes.object
}

Tab.propTypes = {
  label: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  srcHighlighted: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired
}

export default Tab
