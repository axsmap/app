import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { colors } from '../../styles'

const Wrapper = styled(Link)`
  align-items: center;
  flex-direction: column;
  position: relative;

  display: flex;

  width: 25%;

  cursor: pointer;

  color: ${colors.lightestGrey};
  text-decoration: none;

  &.active {
    color: ${colors.primary};
  }
`

export default Wrapper
