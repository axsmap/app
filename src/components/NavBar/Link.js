import styled from 'styled-components'

import RouterLink from '../RouterLink'
import { colors } from '../../styles'

const Link = styled(RouterLink)`
  align-items: center;
  justify-content: center;
  left: 0;
  position: absolute;
  top: 0;

  display: flex;

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
