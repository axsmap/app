import PropTypes from 'prop-types'
import React from 'react'

import leftArrow from '../../images/left-arrow.svg'

import Icon from './Icon'
import Title from './Title'
import Wrapper from './Wrapper'

const Header = props =>
  <Wrapper>
    <Icon src={leftArrow} alt="Go Back icon" />
    <Title>
      {props.title}
    </Title>
  </Wrapper>

Header.propTypes = {
  title: PropTypes.string.isRequired
}

export default Header
