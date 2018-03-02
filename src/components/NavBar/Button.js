import styled from 'styled-components'

import { colors } from '../../styles'

const Link = styled.button`
  display: flex;

  align-items: center;
  justify-content: center;

  appearance: none;
  border: none;
  height: inherit;
  padding-left: 1rem;
  padding-right: 1rem;
  width: auto;

  cursor: pointer;

  &:active,
  &:focus {
    outline: 2px solid ${colors.secondary};
  }
`

export default Link
