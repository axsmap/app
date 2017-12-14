import React from 'react'
import styled from 'styled-components'

import RouterLink from '../RouterLink'
import { colors } from '../../styles'

const Link = styled(({ bold, color, marginBottom, marginTop, ...rest }) => (
  <RouterLink {...rest} />
))`
  margin-bottom: ${props => props.marginBottom || '0'};
  margin-top: ${props => props.marginTop || '0'};

  color: ${props => props.color || colors.darkestGrey};
  font-size: 1rem;
  font-weight: ${props => (props.bold ? 'bold' : 'normal')};
  text-align: center;

  &:active,
  &:focus {
    outline: 2px solid ${colors.secondary};
  }
`

export default Link
