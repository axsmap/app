import React from 'react'
import styled, { keyframes } from 'styled-components'

import { colors } from '../../styles'

const Wrapper = styled.div`
  align-items: center;
  justify-content: center;

  display: flex;

  height: 5rem;
  margin-top: 1rem;
  width: 100%;

  background-color: transparent;
`

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
  border-top: 3px solid ${colors.primary};
  height: 30px;
  width: 30px;

  animation: ${rotate360} 1s infinite linear;
`

const LoadSpinner = () =>
  <Wrapper>
    <Circle />
  </Wrapper>

export default LoadSpinner
