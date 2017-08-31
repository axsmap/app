import React from 'react'

import { colors } from '../../styles'
import googleIcon from '../../images/google.svg'

import Button from './Button'
import ButtonLink from './ButtonLink'
import Icon from './Icon'

const GoogleButton = () =>
  <ButtonLink
    href={`https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env
      .REACT_APP_GOOGLE_ID}&redirect_uri=${process.env
      .REACT_APP_GOOGLE_CALLBACK_URL}&response_type=code&scope=email profile`}
  >
    <Button backgroundColor={colors.google}>
      <Icon src={googleIcon} />
      <div>Google</div>
    </Button>
  </ButtonLink>

export default GoogleButton
