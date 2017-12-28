import styled, { keyframes } from 'styled-components'

import { colors } from '../../styles'

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`

const Circle = styled.div`
  border: 2px solid ${colors.lightestGrey};
  border-radius: 100%;
  border-top: 3px solid ${props => props.color};
  height: ${props => `${props.size}rem`};
  width: ${props => `${props.size}rem`};

  animation: ${rotate360} 1s infinite linear;
`

export default Circle
