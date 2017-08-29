import { placeholder } from 'polished'
import styled from 'styled-components'

import { colors } from '../../styles'

const Input = styled.input`
  flex-grow: 1;

  overflow: hidden;

  border: none;
  height: inherit;
  margin: 0;
  padding: .5rem;
  width: 100%;

  background-color: transparent;

  color: ${colors.darkestGrey};
  font-size: 1rem;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;

  &:focus {
    outline: none;
  }

  ${placeholder({ color: colors.grey })};
`

export default Input
