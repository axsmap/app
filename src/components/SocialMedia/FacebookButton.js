import React from 'react'

import { colors } from '../../styles'
import facebookIcon from '../../images/facebook.svg'

import Button from './Button'
import ButtonLink from './ButtonLink'
import Icon from './Icon'

const FacebookButton = () =>
  <ButtonLink
    href={`https://www.facebook.com/v2.10/dialog/oauth?
      client_id=${process.env.REACT_APP_FACEBOOK_ID}
      &redirect_uri=${process.env.REACT_APP_FACEBOOK_CALLBACK_URL}
      &response_type=code
      &scope=email,public_profile`}
  >
    <Button backgroundColor={colors.facebook}>
      <Icon src={facebookIcon} />
      <div>Facebook</div>
    </Button>
  </ButtonLink>

export default FacebookButton
