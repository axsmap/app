import React from 'react'
import styled from 'styled-components'

import FacebookButton from './FacebookButton'
import GoogleButton from './GoogleButton'

const SocialMediaCont = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 1rem;

  justify-content: space-between;
`

const SocialMedia = () =>
  <SocialMediaCont>
    <FacebookButton />
    <GoogleButton />
  </SocialMediaCont>

export default SocialMedia
