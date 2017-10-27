import PropTypes from 'prop-types'
import React from 'react'

import leftArrow from '../../images/left-arrow.svg'

import Icon from './Icon'
import Link from './Link'
import Title from './Title'
import Wrapper from './Wrapper'

const Header = props => (
  <Wrapper hideOn={props.hideOn}>
    <Link to={props.backURL}>
      <Icon src={leftArrow} alt="Go Back icon" />
    </Link>
    <Title>{props.title}</Title>
  </Wrapper>
)

Header.propTypes = {
  hideOn: PropTypes.string,
  backURL: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
}

export default Header
