import { number, string } from 'prop-types'
import React from 'react'

import { colors } from '../../styles'

import Circle from './Circle'
import Wrapper from './Wrapper'

const Spinner = props => (
  <Wrapper className={props.className}>
    <Circle color={props.color} size={props.size} />
  </Wrapper>
)

Spinner.propTypes = {
  className: string,
  color: string,
  size: number
}

Spinner.defaultProps = {
  color: colors.primary,
  size: 5
}

export default Spinner
