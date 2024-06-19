import { rgba } from 'polished'
import PropTypes from 'prop-types';
import React, { useEffect } from 'react'
import { useIntl } from 'react-intl'
import styled from 'styled-components'

import Button from '../Button'
import Icon from '../Icon'
import { colors, media } from '../../styles'

import messages from './messages'

const Wrapper = styled.div`
  position: fixed;
  right: 0;
  top: 4rem;
  z-index: 100;

  display: none;

  align-items: center;
  justify-content: space-between;

  box-shadow: 0 3px 5px ${rgba(colors.darkestGrey, 0.4)};
  width: 100%;

  background-color: ${props => props.$backgroundColor};
  cursor: pointer;

  ${media.tablet`
    right: 1rem;
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

const Notification = ({ isVisible, type, message, sendingRequest, actionMessage, close, actionHandler }) => {
  const { formatMessage } = useIntl();

  useEffect(() => {
    let closeTimeout;
    if (isVisible) {
      closeTimeout = setTimeout(() => {
        close();
      }, 5000);
    }

    return () => {
      if (closeTimeout) {
        clearTimeout(closeTimeout);
      }
      close();
    };
  }, [isVisible, close]);

  let backgroundColor = colors.secondary;
  if (type === 'success') {
    backgroundColor = colors.success;
  } else {
    backgroundColor = colors.alert;
  }

  if (!isVisible) return null;

  return (
    <Wrapper $backgroundColor={backgroundColor} onClick={close}>
      <ContentWrapper>
        <Message>{formatMessage(messages[message])}</Message>
        {actionMessage ? (
          <Button
            $backgroundColor="white"
            color={backgroundColor}
            disabled={sendingRequest}
            onClickHandler={actionHandler}
          >
            {actionMessage}
          </Button>
        ) : null}
      </ContentWrapper>
      <IconWrapper>
        <Icon glyph="cross" size={1} />
      </IconWrapper>
    </Wrapper>
  );
};

Notification.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  message: PropTypes.string,
  sendingRequest: PropTypes.bool.isRequired,
  actionMessage: PropTypes.string,
  close: PropTypes.func.isRequired,
  actionHandler: PropTypes.func
};

export default Notification
