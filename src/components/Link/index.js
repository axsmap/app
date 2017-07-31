import { Link as RouterLink } from 'react-router-dom'
import styled from 'styled-components'

import { colors } from '../../styles'

const Link = styled(RouterLink)`
  color: ${colors.darkestGrey};
  font-size: 1rem;

  &:active,
  &:focus {
    outline: 2px solid ${colors.primary};
  }
`

export default Link
