import styled from 'styled-components'

import { colors, media } from '../../styles'

const Wrapper = styled.div`
  left: 0;
  position: fixed;
  top: 0;
  z-index: 10; 
  display: ${props => (props.hideOn.includes('phone') ? 'none' : 'flex')}; 
  align-items: center;
  justify-content: center; 
  //box-shadow: 0 1px 0 0 ${colors.grey};
  height: 4rem;
  width: 100%; 
  background-color: transparent;

  ${media.tablet`
    display: ${props => (props.hideOn.includes('tablet') ? 'none' : 'flex')};
  `};

  ${media.desktop`
    display: ${props => (props.hideOn.includes('desktop') ? 'none' : 'flex')};
  `};

  ${media.widescreen`
    display: ${props =>
      props.hideOn.includes('widescreen') ? 'none' : 'flex'};
  `};
`

export default Wrapper
