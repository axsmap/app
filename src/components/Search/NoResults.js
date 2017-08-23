import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import { colors } from '../../styles'

const Wrapper = styled.div`
  align-items: center;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;

  display: flex;

  padding: 1rem;
  width: 100%;

  background-color: ${colors.lightestGrey};
`

const Message = styled.h2`
  margin: 0;
  color: ${colors.darkestGrey};
  text-align: center;
`

const NoResults = props =>
  <Wrapper>
    <Message>
      {props.messageText}
    </Message>
  </Wrapper>

NoResults.propTypes = {
  messageText: PropTypes.string.isRequired
}

export default NoResults
