import { bool, func } from 'prop-types'
import React from 'react'
import { intlShape } from 'react-intl'
import styled from 'styled-components'

import Button from '../Button'
import Icon from '../Icon'
import { colors, media } from '../../styles'

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

  ${media.desktop`
    position: static;
    margin-top: 2rem;
    padding: 0;
  `};
`

const ButtonContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const ReviewButtons = (props, context) => (
  <Wrapper>
    <Button
      float
      disabled={props.sendingRequest}
      onClickHandler={props.createReview}
    >
      <ButtonContent>
        <Icon glyph="check" size={1} color={colors.darkestGrey} />
        <p style={{ margin: '0 0 0 0.5rem' }}>
          {context.intl.formatMessage(messages.createReviewButton)}
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
  intl: intlShape
}

export default ReviewButtons
