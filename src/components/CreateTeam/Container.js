import styled from 'styled-components'

import Ctn from '../Container'
import { media } from '../../styles'

const Container = styled(Ctn)`
  padding: 2rem 1rem 7rem 1rem;
  max-width: 30rem;

  ${media.desktop`
    padding: 2rem 0;
  `};
`

export default Container
