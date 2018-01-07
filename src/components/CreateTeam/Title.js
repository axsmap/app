import styled from 'styled-components'

import { media } from '../../styles'

const Title = styled.h1`
  visibility: hidden;
  margin: 0 0 2rem 0;

  ${media.desktop`
    visibility: visible;
  `};
`

export default Title
