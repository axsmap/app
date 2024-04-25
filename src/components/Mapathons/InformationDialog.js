import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { intlShape } from 'react-intl'
import styled from 'styled-components'
import Icon from '../Icon'
import { colors, media } from '../../styles'

const ModalWrapper = styled.div`
  .modal {
    background-color: rgba( 0, 0, 0, .35);
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 99999;
    top: 0;
    right: 0;
  }

  .modal-container {
    background-color: white;
    padding: 20px;
    margin: 40px 20px;
    border-radius: 15px;
    height: 90%
    overflow: auto;
  }
`

const Modal = ({ onClose, show, children }) => {
  useEffect(
    () => {
      const handleBodyOverflow = () => {
        document.body.style.overflow = show ? 'hidden' : 'auto'
      }
      handleBodyOverflow()
      return () => {
        document.body.style.overflow = 'auto'
      }
    },
    [show]
  )

  if (!show) {
    return null
  }

  return <ModalWrapper>
      <div className="modal" id="modal">
        <div className="modal-container">
          <div onClick={onClose}>
            <Icon glyph="cross" size={1} backgroundColor={colors.white} color={colors.black} />
          </div>
          <div className="content">{children}</div>
        </div>
      </div>
    </ModalWrapper>
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
}

export default Modal
