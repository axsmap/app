import React from 'react'
import styled from 'styled-components'

const IconContainer = styled.div`
  float: left;
  height: 100%;
  width: 3rem;
  box-sizing: border-box;
`

const IconImg = styled.img`
  width: 2rem;
  height: 1.5rem;
`

const Icon = props => (
  <IconContainer>
    <IconImg {...props} />
  </IconContainer>
)

export default Icon
