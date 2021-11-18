import React from 'react'
import PropTypes from 'prop-types'
import { intlShape } from 'react-intl'
import styled from 'styled-components'

import Icon from '../Icon'
import { colors, media } from '../../styles'

export default class Modal extends React.Component {
  onClose = e => {
    this.props.onClose && this.props.onClose(e)
  }

  render() {
    if (!this.props.show) {
      return null
    }
    return (
      <div className="modal" id="modal">
        <div className="modal-container">
          <div className="toggle-button" onClick={this.onClose}>
            <Icon
              glyph="cross"
              size={1}
              backgroundColor={colors.white}
              color={colors.black}
            />
          </div>
          <div className="content">{this.props.children}</div>
        </div>
      </div>
    )
  }
}
Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired
}
