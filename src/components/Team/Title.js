import { rgba } from 'polished'
import styled from 'styled-components'

import { colors } from '../../styles'

const Title = styled.h2`
  margin: 0;

  color: ${rgba(colors.darkestGrey, 0.9)};
`

export default Title
