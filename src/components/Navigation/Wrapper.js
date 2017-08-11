import styled from 'styled-components'

import { colors } from '../../styles'

const Wrapper = styled.div`
  align-items: center;
  bottom: 0;
  flex-direction: row;
  justify-content: center;
  position: fixed;
  z-index: 99;

  display: flex;

  height: 4rem;
  width: 100%;

  background-color: ${colors.darkestGrey};
`

export default Wrapper
