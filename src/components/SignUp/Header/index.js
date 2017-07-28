import { FormattedMessage } from 'react-intl'
import React from 'react'

import leftArrow from '../../../images/left-arrow.svg'

import Icon from './Icon'
import messages from './messages'
import Title from './Title'
import Wrapper from './Wrapper'

const Header = () =>
  <Wrapper>
    <Icon src={leftArrow} alt="Go Back icon" />
    <Title>
      <FormattedMessage {...messages.title} />
    </Title>
  </Wrapper>

export default Header
