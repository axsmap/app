import { bool, func } from 'prop-types'
import React from 'react'
import { useIntl } from 'react-intl'
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

const EditButtons = (props, context) => (
  <Wrapper>
    <Button
      $backgroundColor={colors.lightGrey}
      float
      disabled={props.sendingRequest}
      onClickHandler={props.hideEditTeam}
    >
      <ButtonContent>
        <Icon glyph="cross" size={1} color={colors.darkestGrey} />
        <p style={{ margin: '0 0 0 0.5rem' }}>
          {context.intl.formatMessage(messages.closeButton)}
        </p>
      </ButtonContent>
    </Button>

    <Button
      float
      disabled={props.sendingRequest}
      onClickHandler={props.editTeam}
    >
      <ButtonContent>
        <Icon glyph="check" size={1} color={colors.darkestGrey} />
        <p style={{ margin: '0 0 0 0.5rem' }}>
          {context.intl.formatMessage(messages.saveChangesButton)}
        </p>
      </ButtonContent>
    </Button>
  </Wrapper>
)

EditButtons.propTypes = {
  sendingRequest: bool.isRequired,
  hideEditTeam: func.isRequired,
  editTeam: func.isRequired
}

EditButtons.contextTypes = {
  intl: useIntl()
}

export default EditButtons
