import PropTypes from 'prop-types'
import React from 'react'

import { ArrowIcon } from '../Icons'
import { colors } from '../../styles'

import Link from './Link'
import Title from './Title'
import Wrapper from './Wrapper'

const Header = props => (
  <Wrapper hideOn={props.hideOn}>
    <Link to={props.backURL}>
      <ArrowIcon size={1.5} rotate="180deg" color={colors.darkestGrey} />
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
