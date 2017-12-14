import PropTypes from 'prop-types'
import React from 'react'

import Icon from '../Icon'
import { colors } from '../../styles'

import Container from './Container'
import Link from './Link'
import Title from './Title'
import Wrapper from './Wrapper'

const NavBar = props => (
  <Wrapper hideOn={props.hideOn}>
    <Container isNarrow={props.isNarrow}>
      <Link to={props.backURL}>
        <Icon
          glyph="arrow"
          size={1.5}
          rotate="180deg"
          color={colors.darkestGrey}
        />
      </Link>
      <Title>{props.title}</Title>
    </Container>
  </Wrapper>
)

NavBar.propTypes = {
  hideOn: PropTypes.string,
  isNarrow: PropTypes.bool,
  backURL: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
}

NavBar.defaultProps = {
  isNarrow: false
}

export default NavBar
