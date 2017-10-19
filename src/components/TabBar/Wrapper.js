import styled from 'styled-components'

import { colors, media } from '../../styles'

const Wrapper = styled.div`
  bottom: 0;
  position: fixed;
  z-index: 99;

  display: flex;

  align-items: center;
  justify-content: center;

  height: 4rem;
  width: 100%;

  background-color: ${colors.darkestGrey};

  ${media.desktop`
    display: none;
  `};
`

export default Wrapper
