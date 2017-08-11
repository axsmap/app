import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { colors } from '../../styles'

const Wrapper = styled(Link)`
  align-items: center;

  color: ${colors.lightestGrey};
  text-decoration: none;

  display: flex;
  flex-direction: column;
  position: relative;
  width: 25%;

  &.active {
    color: ${colors.primary};
  }
`

export default Wrapper
