import styled from 'styled-components'

import { colors } from '../../styles'

const Content = styled.div`
  align-items: center;
  flex-grow: 1;
  flex-direction: column;
  justify-content: center;

  display: flex;

  padding: 2.5rem 1rem 1rem 1rem;
  width: 100%;

  background-color: ${colors.lightestGrey};
`

export default Content
