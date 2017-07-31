import { Link as RouterLink } from 'react-router-dom'
import styled from 'styled-components'

import { colors } from '../../styles'

const Link = styled(RouterLink)`
  left: 1rem;
  position: absolute;
  top: 1rem;

  height: 1.5rem;
  width: auto;

  &:active,
  &:focus {
    outline: 2px solid ${colors.primary};
  }
`

export default Link
