import React from 'react'
import PropTypes from 'prop-types'

import leftArrow from '../../images/left-arrow.svg'

import Icon from './Icon'
import Label from './Label'
import Wrapper from './Wrapper'

const NavigationTab = props =>
  <Wrapper to={props.to} activeStyle={{ color: 'yellow' }}>
    <Icon src={leftArrow} />
    <Label>
      {props.label}
    </Label>
  </Wrapper>

NavigationTab.propTypes = {
  label: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired
}

export default NavigationTab
