import styled from 'styled-components'

import { colors } from '../../styles'

const Wrapper = styled.div`
  align-items: center;
  flex-direction: row;
  justify-content: center;

  display: flex;

  background-color: ${colors.darkestGrey};

  position: fixed;
  bottom: 0;
  z-index: 99;
  height: 56px;
  width: 100%;
`

export default Wrapper
