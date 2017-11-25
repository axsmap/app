import PropTypes from 'prop-types'
import React from 'react'

import Svg from './Svg'
import Wrapper from './Wrapper'

const Facebook = props => (
  <Wrapper height={props.size} width={props.size * 0.5625}>
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      aria-labelledby="title"
      viewBox="0 0 9 16"
      id="facebook"
    >
      <title id="title">facebook</title>
      <g>
        <path
          fill={props.color}
          d="M 8.34347 0.00332907L 6.26394 0C 3.92766 0 2.41786 1.54552 2.41786 3.93762L 2.41786 5.75313L 0.326985 5.75313C 0.146309 5.75313 -5.60035e-08 5.89927 -5.60035e-08 6.07954L -5.60035e-08 8.71001C -5.60035e-08 8.89028 0.146476 9.03626 0.326985 9.03626L 2.41786 9.03626L 2.41786 15.6738C 2.41786 15.854 2.56417 16 2.74484 16L 5.47283 16C 5.65351 16 5.79982 15.8539 5.79982 15.6738L 5.79982 9.03626L 8.24454 9.03626C 8.42521 9.03626 8.57152 8.89028 8.57152 8.71001L 8.57252 6.07954C 8.57252 5.99299 8.53799 5.91009 8.47676 5.84884C 8.41554 5.78758 8.33212 5.75313 8.24537 5.75313L 5.79982 5.75313L 5.79982 4.2141C 5.79982 3.47438 5.97649 3.09886 6.94227 3.09886L 8.34313 3.09836C 8.52364 3.09836 8.66995 2.95222 8.66995 2.77211L 8.66995 0.329578C 8.66995 0.149642 8.52381 0.00366197 8.34347 0.00332907Z"
        />
      </g>
    </Svg>
  </Wrapper>
)

Facebook.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string.isRequired
}

Facebook.defaultProps = {
  size: 1
}

export default Facebook
