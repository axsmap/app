import styled from 'styled-components'

import { colors, media } from '../../styles'

const Container = styled.div`
  align-items: center;
  flex-grow: 1;
  flex-direction: column;
  justify-content: center;

  display: flex;
  padding: 0;
  //padding: 2rem 1rem;
  width: 100%;

  background-color: transparent;

  ${media.tablet`
    padding: 2rem 0;
    width: 723px;
  `};

  ${media.desktop`
    padding: 2rem 0;
    width: 933px;
  `};

  ${media.widescreen`
    padding: 2rem 0;
    width: 1127px;
  `};
`

export default Container
