import styled from 'styled-components'

import { colors } from '../../styles'

const Input = styled.input`
  display: block;

  border: none;
  border-radius: 3px;
  box-shadow: ${props =>
    props.hasError
      ? `inset 0px 0px 0px 2px ${colors.alert}`
      : `inset 0px 0px 0px 1px ${colors.darkGrey}`};
  height: 3rem;
  padding: 0.5rem 1rem;
  width: 100%;

  background-color: white;

  color: ${colors.darkestGrey};
  font-size: 1rem;

  &:focus {
    box-shadow: inset 0px 0px 0px 2px ${colors.secondary};
    outline: none;
  }
`

export default Input
