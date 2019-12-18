import styled from 'styled-components'

import { media } from '../../styles'

const Wrapper = styled.div`
  position: relative;

  align-items: center;
  flex-direction: column;
  justify-content: space-between;

  display: flex;

  min-height: inherit;
  padding: 4rem 0;
  width: 100%;

  ${media.desktop`
    padding-bottom: 0;
  `};
  ${media.mobile`
  -webkit-align-items:end !important;
  `};
`

export default Wrapper
