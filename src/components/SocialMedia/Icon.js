import React from 'react'
import styled from 'styled-components'
import { rgba } from 'polished'

import { colors } from '../../styles'

const IconContainer = styled.div`
  float: left;
  height: 100%;
  width: 3rem;
  box-sizing: border-box;
  border-right: 1px solid ${rgba(colors.darkestGrey, 0.5)};
`

const IconImg = styled.img`
  width: 2rem;
  height: 1.5rem;
`

const Icon = props =>
  <IconContainer>
    <IconImg {...props} />
  </IconContainer>

export default Icon
