import styled from 'styled-components'

import { colors } from '../../styles'

const Input = styled.input`
  display: block;

  border: none;
  border-radius: 3px;
  box-shadow: inset 0px 0px 0px 1px ${colors.grey};
  padding: .5rem;
  width: 100%;

  color: ${colors.darkestGrey};
  font-size: 1rem;

  &:focus {
    box-shadow: inset 0px 0px 0px 2px ${colors.secondary};
    outline: none;
  }
`

export default Input
