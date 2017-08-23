import styled from 'styled-components'

import { colors } from '../../styles'

const Wrapper = styled.div`
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
  left: 0;
  position: absolute;
  top: 0;
  z-index: 100;

  display: flex;

  background-color: ${colors.lightestGrey};

  min-height: inherit;
  width: 100%;
`

export default Wrapper
