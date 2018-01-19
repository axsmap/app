import styled from 'styled-components'

import { media } from '../../styles'

const NoResultsImage = styled.img`
  height: 5rem;
  margin-bottom: 2rem;

  ${media.tablet`
    height: 7rem;
  `};

  ${media.desktop`
    height: 9rem;
  `};

  ${media.widescreen`
    height: 12rem;
  `};
`

export default NoResultsImage
