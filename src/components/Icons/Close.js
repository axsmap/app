import PropTypes from 'prop-types'
import React from 'react'

import Svg from './Svg'
import Wrapper from './Wrapper'

const Close = props => (
  <Wrapper size={props.size}>
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      aria-labelledby="title"
      viewBox="0 0 16 16"
      id="close"
    >
      <title id="title">close</title>
      <g>
        <path
          fill={props.color}
          d="M 16 1.78947L 14.2105 0L 8 6.21053L 1.78947 0L 0 1.78947L 6.21053 8L 0 14.2105L 1.78947 16L 8 9.78947L 14.2105 16L 16 14.2105L 9.78947 8L 16 1.78947Z"
        />
      </g>
    </Svg>
  </Wrapper>
)

Close.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string.isRequired
}

Close.defaultProps = {
  size: '1rem'
}

export default Close
