import styled from 'styled-components'

import Cnt from '../Container'
import { media } from '../../styles'

const Container = styled(Cnt)`
  justify-content: flex-start;
  padding: ${props => (props.canEditTeam ? '2rem 0 7rem 0' : '2rem 0')};

  ${media.desktop`
    padding: 2rem 0;
  `};
`

export default Container
