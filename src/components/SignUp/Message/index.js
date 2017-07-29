import PropTypes from 'prop-types'
import React from 'react'
import { ThemeProvider } from 'styled-components'

import { colors } from '../../../styles'
import failureIcon from '../../../images/failure.svg'
import successIcon from '../../../images/success.svg'

import Icon from './Icon'
import Text from './Text'
import Wrapper from './Wrapper'

const Message = props => {
  let color = colors.secondary
  let icon = successIcon
  if (props.type !== 'success') {
    color = colors.alert
    icon = failureIcon
  }

  return (
    <ThemeProvider theme={{ color }}>
      <Wrapper>
        <Icon src={icon} alt="Message icon" />
        <Text>
          {props.text}
        </Text>
      </Wrapper>
    </ThemeProvider>
  )
}

Message.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
}

export default Message
