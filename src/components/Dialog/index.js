import { rgba } from 'polished'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import { colors, media } from '../../styles'

const Overlay = styled.div`
  left: 0;
  position: fixed;
  top: 0;
  z-index: ${props => (props.visible ? 100 : -1)};

  display: ${props => (props.visible ? 'flex' : 'none')};
  opacity: ${props => (props.visible ? 1 : 0)};

  align-items: center;
  justify-content: center;

  transition: opacity 0.3s ease;

  border: none;
  height: 100%;
  width: 100%;

  background-color: ${rgba(colors.darkestGrey, 0.5)};
`

const Box = styled.div`
  box-shadow: 1px 3px 3px 0 ${rgba(colors.darkestGrey, 0.2)},
    1px 3px 15px 2px ${rgba(colors.darkestGrey, 0.2)};
  height: 100%;
  width: 100%;

  background-color: ${colors.lightestGrey};

  ${media.tablet`
    border-radius: 3px;
    max-height: 80%;
    width: 27rem;
  `};
`

const Dialog = props => (
  <Overlay visible={props.visible} onClick={props.hide}>
    <Box onClick={event => event.stopPropagation()}>{props.children}</Box>
  </Overlay>
)

Dialog.propTypes = {
  visible: PropTypes.bool.isRequired,
  children: PropTypes.any,
  hide: PropTypes.func.isRequired
}

export default Dialog
