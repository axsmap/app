import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import { colors } from '../../styles'
import Message from '../Message'

const Wrapper = styled.div`
  align-items: center;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;

  display: flex;

  padding: 1rem;
  width: 100%;
`

const Text = styled.p`
  margin: 0 0 1rem 0;

  color: ${colors.darkestGrey};
  font-size: 1rem;

  text-align: center;
`

const Button = styled.button`
  border: none;
  border-radius: 3px;
  box-shadow: inset 0px 0px 0px 1px ${colors.darkestGrey};
  height: 3rem;
  margin: 0;
  padding: .5em 1em;
  width: auto;

  background-color: ${colors.primary};
  cursor: pointer;

  color: ${colors.darkestGrey};
  font-size: 1rem;
  font-weight: bold;
  text-transform: uppercase;

  &:active,
  &:focus {
    outline: 2px solid ${colors.secondary};
  }
`

const LocationMessage = props => {
  if (props.errorText) {
    return (
      <Wrapper>
        <Message text={props.errorText} type="error" />
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <Text>
        {props.messageText}
      </Text>
      <Button onClick={props.actionHandler}>
        {props.actionText}
      </Button>
    </Wrapper>
  )
}

LocationMessage.propTypes = {
  actionText: PropTypes.string.isRequired,
  errorText: PropTypes.string.isRequired,
  messageText: PropTypes.string.isRequired,
  actionHandler: PropTypes.func.isRequired
}

export default LocationMessage
