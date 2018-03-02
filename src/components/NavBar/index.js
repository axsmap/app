import PropTypes from 'prop-types'
import React from 'react'

import Icon from '../Icon'
import { colors } from '../../styles'

import Container from './Container'
import Button from './Button'
import Link from './Link'
import Title from './Title'
import Wrapper from './Wrapper'

const NavBar = props => (
  <Wrapper hideOn={props.hideOn}>
    <Container isNarrow={props.isNarrow}>
      <Button onClick={props.goBackHandler}>
        <Icon
          glyph="arrow"
          size={1.5}
          rotate="180deg"
          color={colors.darkestGrey}
        />
      </Button>

      <Title>{props.title}</Title>

      <Link to="/">
        <Icon glyph="home" size={1.5} color={colors.darkestGrey} />
      </Link>
    </Container>
  </Wrapper>
)

NavBar.propTypes = {
  hideOn: PropTypes.string,
  isNarrow: PropTypes.bool,
  title: PropTypes.string.isRequired,
  goBackHandler: PropTypes.func.isRequired
}

NavBar.defaultProps = {
  isNarrow: false
}

export default NavBar
