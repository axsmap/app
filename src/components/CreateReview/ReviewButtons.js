import { bool, func } from 'prop-types'
import React from 'react'
import { useIntl } from 'react-intl'
import styled from 'styled-components'

import Button from '../Button'
import { media } from '../../styles'

import messages from './messages'

const Wrapper = styled.div`
  bottom: 2rem;
  left: 0;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 0 1rem;
  width: 100%;

  ${media.tablet`
    position: static;
    margin-top: -1rem;
    padding: 0;
  `};

  ${media.desktop`
    position: static;
    margin-top: -1rem;
    padding: 0;
  `};

  ${media.widescreen`
    position: static;
    margin-top: -1rem;
    padding: 0;
  `};
`

const ButtonContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: auto;
  margin-right: auto;
`

const ReviewButtons = (props, context) => (
  <Wrapper>
    <Button
      float
      disabled={props.sendingRequest}
      onClickHandler={props.createReview}
    >
      <ButtonContent>
        <p style={{ margin: '0' }}>
          {context.intl.formatMessage(messages.exitButton)}
        </p>
      </ButtonContent>
    </Button>
  </Wrapper>
)

ReviewButtons.propTypes = {
  sendingRequest: bool.isRequired,
  createReview: func.isRequired
}

ReviewButtons.contextTypes = {
  intl: useIntl()
}

export default ReviewButtons
