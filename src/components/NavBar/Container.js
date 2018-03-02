import styled from 'styled-components'

import { media } from '../../styles'

const Container = styled.div`
  position: relative;

  display: flex;

  align-items: center;
  justify-content: space-between;

  height: 100%;
  width: 100%;

  ${media.tablet`
    width: ${props => (props.isNarrow ? '723px' : '100%')};
  `};
`

export default Container
