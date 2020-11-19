import styled from 'styled-components'

import { colors, media } from '../../styles'

const Wrapper = styled.div`
  bottom: 0;
  position: fixed;
  z-index: 30;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 4rem;
  width: 100%;
  background-color: ${colors.darkestGrey};

  ${media.tablet`
    display: flex;
  `};

  ${media.desktop`
    display: none;
  `};

  @media only screen 
  and (min-device-width: 1024px) 
  and (max-device-width: 1366px) 
  and (-webkit-min-device-pixel-ratio: 2) 
  and (orientation: portrait) {
    display: flex;
  }

  @media only screen 
  and (min-device-width: 768px) 
  and (max-device-width: 1024px) 
  and (-webkit-min-device-pixel-ratio: 2) 
  and (orientation: landscape){
    display: flex;
  }
`

export default Wrapper
