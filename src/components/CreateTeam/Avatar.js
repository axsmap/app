import styled from 'styled-components'

import { media } from '../../styles'

const Avatar = styled.div`
  position: relative;

  border-radius: 3px;
  height: 14rem;
  width: 14rem;

  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  ${media.tablet`
    height: 16rem;
    width: 16rem;
  `};

  ${media.desktop`
    height: 18rem;
    width: 18rem;
  `};

  ${media.widescreen`
    height: 20rem;
    width: 20rem;
  `};
`

export default Avatar
