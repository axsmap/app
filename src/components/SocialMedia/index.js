import React from 'react'
import styled from 'styled-components'

import { colors } from '../../styles'
import facebookIcon from '../../images/facebook.svg'
import googleIcon from '../../images/google.svg'

import MediaButton from './MediaButton'

const SocialMediaCont = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 1rem;

  justify-content: space-between;
`

const SocialMedia = () =>
  <SocialMediaCont>
    <MediaButton
      icon={facebookIcon}
      text="Facebook"
      backgroundColor={colors.facebook}
    />
    <MediaButton
      icon={googleIcon}
      text="Google"
      backgroundColor={colors.google}
    />
  </SocialMediaCont>

export default SocialMedia
