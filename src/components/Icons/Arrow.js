import PropTypes from 'prop-types'
import React from 'react'

import Svg from './Svg'
import Wrapper from './Wrapper'

const Arrow = props => (
  <Wrapper height={props.size} width={props.size * 0.625} rotate={props.rotate}>
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      aria-labelledby="title"
      viewBox="0 0 10 16"
      id="arrow"
    >
      <title id="title">arrow</title>
      <g>
        <path
          fill={props.color}
          d="M 1.57457 16L 2.76162e-07 14.5019L 6.1669 8L 2.76162e-07 1.49805L 1.57457 5.53205e-09L 9.16258 8L 1.57457 16Z"
        />
      </g>
    </Svg>
  </Wrapper>
)

Arrow.propTypes = {
  size: PropTypes.number,
  rotate: PropTypes.string,
  color: PropTypes.string.isRequired
}

Arrow.defaultProps = {
  size: 1,
  rotation: '0deg'
}

export default Arrow
