import styled from 'styled-components'

import { colors } from '../../styles'

const ButtonLink = styled.a`
  text-decoration: none;
  width: 49%;

  &:active,
  &:focus {
    outline: 2px solid ${colors.secondary};
  }
`

export default ButtonLink
