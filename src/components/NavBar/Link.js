import styled from 'styled-components'

import RouterLink from '../RouterLink'
import { colors } from '../../styles'

const Link = styled(RouterLink)`
  display: flex;

  align-items: center;
  justify-content: center;

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
