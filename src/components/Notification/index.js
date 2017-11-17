import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import styled from 'styled-components'

import exitIcon from '../../images/exit.svg'
import { colors, media } from '../../styles'

const Wrapper = styled.div`
  position: fixed;
  right: 0;
  top: 3.5rem;
  z-index: 100;

  display: flex;

  align-items: center;
  justify-content: space-between;

  background-color: ${props => props.backgroundColor};
  padding: 1rem;
  width: 100%;

  ${media.tablet`
    right: 1rem;
    top: 4.5rem;

    border-radius: 3px;
    width: 20rem;
  `};
`

const Message = styled.p`
  margin: 0 1rem 0 0;

  color: white;
  font-size: 0.8rem;
  font-weight: bold;
  text-align: center;

  ${media.tablet`
    font-size: 1rem;
  `};
`

const ExitIcon = styled.img`
  height: 1rem;

  ${media.tablet`
    height: 1.5rem;
  `};
`

class Notification extends PureComponent {
  componentWillReceiveProps(nextProps) {
    if (nextProps.visibility) {
      if (this.closeTimeout) {
        clearTimeout(this.closeTimeout)
      }

      this.closeTimeout = setTimeout(() => {
        this.props.close()
      }, 5000)
    }
  }

  componentWillUnmount() {
    if (this.closeTimeout) {
      clearTimeout(this.closeTimeout)
    }

    this.props.close()
  }

  render() {
    let backgroundColor = colors.secondary
    if (this.props.category === 'success') {
      backgroundColor = colors.success
    } else {
      backgroundColor = colors.alert
    }

    if (this.props.visibility) {
      return (
        <Wrapper backgroundColor={backgroundColor} onClick={this.props.close}>
          <Message>{this.props.message}</Message>
          <ExitIcon src={exitIcon} />
        </Wrapper>
      )
    }

    return null
  }
}

Notification.propTypes = {
  category: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  visibility: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired
}

export default Notification
