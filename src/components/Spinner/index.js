import { number, string } from 'prop-types'
import React from 'react'

import { colors } from '../../styles'

import Circle from './Circle'
import Wrapper from './Wrapper'

const Spinner = ({
  className,
  color = colors.primary,
  size = 5,
}) => (
  <Wrapper className={className}>
    <Circle color={color} size={size} />
  </Wrapper>
);

Spinner.propTypes = {
  className: string,
  color: string,
  size: number
}

export default Spinner
