import styled from 'styled-components'

import { colors } from '../../styles'

const Content = styled.div`
  align-items: center;
  flex-grow: 1;
  flex-direction: column;
  justify-content: center;
  left: 0;
  position: relative;
  top: 2.5rem;

  display: flex;

  padding: 1rem;
  width: 100%;

  background-color: ${colors.lightestGrey};
`

export default Content