import styled from 'styled-components'

import { colors } from '../../styles'

const Container = styled.div`
  align-items: center;
  flex-grow: 1;
  flex-direction: column;
  justify-content: center;

  display: flex;

  height: auto;
  padding: 5.5rem 1rem 2rem 1rem;
  width: 100%;

  background-color: ${colors.lightestGrey};
`

export default Container
