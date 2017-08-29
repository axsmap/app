import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { colors } from '../../styles'

const Wrapper = styled(Link)`
  align-items: center;
  flex-direction: column;
  justify-content: center;
  position: relative;

  display: flex;

  height: inherit;
  width: 25%;

  cursor: pointer;

  color: ${colors.lightestGrey};
  text-decoration: none;

  &:active,
  &:focus {
    box-shadow: inset 0px 0px 0px 2px ${colors.secondary};
    outline: none;
  }

  &.active {
    color: ${colors.primary};
  }
`

export default Wrapper
