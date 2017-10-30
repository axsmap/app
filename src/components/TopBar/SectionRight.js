import styled from 'styled-components'

import { media } from '../../styles'

const Section = styled.div`
  display: none;
  align-items: center;
  height: inherit;

  ${media.desktop`
    display: flex;
  `};
`

export default Section
