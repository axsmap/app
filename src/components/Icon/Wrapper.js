import styled from 'styled-components'

import { media } from '../../styles'

const Wrapper = styled.div`
  position: relative;

  display: inline-block;
  transform: ${props =>
    props.rotate ? `rotate(${props.rotate})` : 'rotate(0deg)'};

  height: ${props => `${props.height}rem` || '1rem'};
  width: ${props => `${props.width}rem` || '1rem'};

  ${media.tablet`
    height: ${props => `${props.tabletHeight}rem` || '1rem'};
    width: ${props => `${props.tabletWidth}rem` || '1rem'};
  `};

  ${media.desktop`
    height: ${props => `${props.desktopHeight}rem` || '1rem'};
    width: ${props => `${props.desktopWidth}rem` || '1rem'};
  `};

  ${media.widescreen`
    height: ${props => `${props.widescreenHeight}rem` || '1rem'};
    width: ${props => `${props.widescreenWidth}rem` || '1rem'};
  `};
`

export default Wrapper
