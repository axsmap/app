import styled from 'styled-components'

import Cnt from '../Container'
import { media } from '../../styles'

const Container = styled(Cnt)`
  align-items: flex-start;
  flex-basis: 0;
  flex-direction: row;
  justify-content: flex-start;

  padding: 2rem 0 7rem 0;

  ${media.desktop`
    padding: 2rem 0;
  `};
`

export default Container
