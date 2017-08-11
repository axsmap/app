import React from 'react'
import PropTypes from 'prop-types'

import Icon from './Icon'
import Label from './Label'
import Wrapper from './Wrapper'

const NavigationTab = (props, context) => {
  const isActive = context.router.route.location.pathname === props.to
  const className = isActive ? 'active' : ''
  const iconSrc = isActive ? props.srcHighlighted : props.src

  return (
    <Wrapper className={className} to={props.to}>
      <Icon src={iconSrc} />
      <Label>
        {props.label}
      </Label>
    </Wrapper>
  )
}

NavigationTab.contextTypes = {
  router: PropTypes.object
}

NavigationTab.propTypes = {
  label: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  srcHighlighted: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired
}

export default NavigationTab
