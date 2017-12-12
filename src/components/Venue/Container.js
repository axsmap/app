import styled from 'styled-components'

import Cnt from '../Container'
import { media } from '../../styles'

const Container = styled(Cnt)`
  justify-content: flex-start;
  padding: 2rem 0 5rem 0;

  ${media.desktop`
    padding: 2rem 0;
  `};
`

export default Container
