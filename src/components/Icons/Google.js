import PropTypes from 'prop-types'
import React from 'react'

import Svg from './Svg'
import Wrapper from './Wrapper'

const Google = props => (
  <Wrapper height={props.size} width={props.size}>
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      aria-labelledby="title"
      viewBox="0 0 16 16"
      id="google"
    >
      <title id="title">google</title>
      <g>
        <path
          fill={props.color}
          d="M 16 7.11103L 8.53334 7.11103L 8.53334 9.59993L 13.0887 9.59993C 12.4092 11.7637 10.3881 13.3333 7.99994 13.3333C 5.05437 13.3333 2.66666 10.9454 2.66666 7.99994C 2.66666 5.05435 5.05445 2.66663 7.99994 2.66663C 9.48323 2.66663 10.8248 3.2723 11.7916 4.24963L 13.5982 2.28591C 12.1553 0.872078 10.1797 1.07247e-08 7.99994 1.07247e-08C 3.58171 -4.23766e-05 0 3.58169 0 7.99994C 0 12.4182 3.58171 16 7.99998 16C 11.8702 16 15.2587 13.2514 16 9.59997L 16 7.11107L 16 7.11103Z"
        />
      </g>
    </Svg>
  </Wrapper>
)

Google.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string.isRequired
}

Google.defaultProps = {
  size: 1
}

export default Google
