import PropTypes from 'prop-types'
import React from 'react'

import Icon from '../Icon'
import { colors } from '../../styles'

import Container from './Container'
import Button from './Button'
import Link from './Link'
import Title from './Title'
import Wrapper from './Wrapper'

const NavBar = ({
  hideOn,
  isNarrow = false,
  title,
  goBackHandler,
}) => (
  <Wrapper $hideOn={hideOn}>
    <Container $isNarrow={isNarrow}>
      <Button onClick={goBackHandler}>
        <Icon
          glyph="arrow"
          size={1.5}
          rotate="180deg"
          color={colors.darkestGrey}
        />
      </Button>

      <Title>{title}</Title>

      <Link to="/">
        <Icon glyph="home" size={1.5} color={colors.darkestGrey} />
      </Link>
    </Container>
  </Wrapper>
);

NavBar.propTypes = {
  hideOn: PropTypes.string,
  isNarrow: PropTypes.bool,
  title: PropTypes.string.isRequired,
  goBackHandler: PropTypes.func.isRequired
}

export default NavBar
