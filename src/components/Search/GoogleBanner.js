import React from 'react'
import styled from 'styled-components'

import googleBannerImage from '../../images/google-banner.png'

const Image = styled.img`
  bottom: 1rem;
  left: 50%;
  position: absolute;

  transform: translateX(-50%);

  height: 1.5rem;
  width: auto;
`

const GoogleBanner = () =>
  <Image src={googleBannerImage} alt="Powered by Google image" />

export default GoogleBanner
