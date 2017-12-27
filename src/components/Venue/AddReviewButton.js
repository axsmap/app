import React from 'react'
import { intlShape } from 'react-intl'
import styled from 'styled-components'

import Button from '../Button'
import Icon from '../Icon'
import { colors, media } from '../../styles'

import messages from './messages'

const Wrapper = styled(Button)`
  bottom: 2rem;
  left: 50%;
  position: fixed;

  transform: translateX(-50%);

  margin: 0 auto;

  ${media.desktop`
    position: static;
    transform: translateX(0%);
    margin-top: 2rem;
  `};
`

const ButtonContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const AddReviewButton = (props, context) => (
  <Wrapper float disabled={false} {...props}>
    <ButtonContent>
      <Icon glyph="message" size={1} color={colors.darkestGrey} />
      <p style={{ margin: '0 0 0 0.5rem' }}>
        {context.intl.formatMessage(messages.reviewButton)}
      </p>
    </ButtonContent>
  </Wrapper>
)

AddReviewButton.contextTypes = {
  intl: intlShape
}

export default AddReviewButton
