import { rgba } from 'polished'
import { bool, func, string } from 'prop-types'
import React from 'react'
import { intlShape } from 'react-intl'
import styled from 'styled-components'

import Button from '../Button'
import Icon from '../Icon'
import { colors, media } from '../../styles'

import messages from './messages'

const Wrapper = styled.div`
  position: fixed;
  right: 0;
  top: 3.5rem;
  z-index: 100;

  display: flex;

  align-items: center;
  justify-content: space-between;

  box-shadow: 0 3px 5px ${rgba(colors.darkestGrey, 0.4)};
  width: 100%;

  background-color: ${props => props.backgroundColor};
  cursor: pointer;

  ${media.tablet`
    right: 1rem;
    top: 4.5rem;

    border-radius: 3px;
    width: 20rem;
  `};
`

const ContentWrapper = styled.div`
  display: flex;

  align-items: flex-start;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;

  height: 100%;
  padding: 1rem;
`

const Message = styled.p`
  margin: 0;

  color: white;
  font-size: 0.8rem;
  font-weight: bold;

  ${media.tablet`
    font-size: 1rem;
  `};
`

const IconWrapper = styled.div`
  display: flex;

  align-items: center;
  justify-content: center;

  height: 100%;
  padding: 1rem 1rem 1rem 0;
`

class Notification extends React.Component {
  static propTypes = {
    isVisible: bool.isRequired,
    type: string.isRequired,
    message: string,
    sendingRequest: bool.isRequired,
    actionMessage: string,
    close: func.isRequired,
    actionHandler: func
  }

  static contextTypes = {
    intl: intlShape
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isVisible) {
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
    const formatMessage = this.context.intl.formatMessage

    let backgroundColor = colors.secondary
    if (this.props.type === 'success') {
      backgroundColor = colors.success
    } else {
      backgroundColor = colors.alert
    }

    if (this.props.isVisible) {
      return (
        <Wrapper backgroundColor={backgroundColor} onClick={this.props.close}>
          <ContentWrapper>
            <Message>{formatMessage(messages[this.props.message])}</Message>

            {this.props.actionMessage ? (
              <Button
                backgroundColor="white"
                color={backgroundColor}
                disabled={this.props.sendingRequest}
                onClickHandler={this.props.actionHandler}
              >
                {this.props.actionMessage}
              </Button>
            ) : null}
          </ContentWrapper>

          <IconWrapper>
            <Icon glyph="cross" size={1} />
          </IconWrapper>
        </Wrapper>
      )
    }

    return null
  }
}

export default Notification
