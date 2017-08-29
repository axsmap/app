import styled from 'styled-components'

import { colors } from '../../styles'

const Button = styled.button`
  border: none;
  height: inherit;
  width: 3rem;

  background-color: transparent;
  cursor: pointer;

  &:active,
  &:focus {
    box-shadow: inset 0px 0px 0px 2px ${colors.secondary};
    outline: none;
  }
`

export default Button
