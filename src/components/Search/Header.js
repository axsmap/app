import styled from 'styled-components'

import { colors } from '../../styles'

const Header = styled.div`
  align-items: center;
  justify-content: space-between;

  display: flex;

  border: none;
  border-bottom: 1px inset ${colors.darkGrey};
  height: 4rem;
  width: 100%;

  background-color: white;
`

export default Header
