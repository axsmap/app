import styled from 'styled-components'

import Ctn from '../Container'
import { media } from '../../styles'

const Container = styled(Ctn)`
  padding: 1rem;

  ${media.tablet`
    padding: 2rem 0;
  `};
`

export default Container
