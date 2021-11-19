import React from 'react'
import styled from 'styled-components'

import Logo from '../Logo'
import RouterLink from '../RouterLink'
import { colors, media } from '../../styles'

const Link = styled(RouterLink)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: inherit;
  text-decoration: none;  
  &:active,
  &:focus {
    outline: 2px solid ${colors.secondary};
  }

  @media (max-width: 475px) {
    display: flex;
    align-self: flex-start; 
    align-items: flex-start; 
  }

  // ${media.mobile`
  //   display: flex; 
  // `};

  // ${media.tablet`
  //   display: flex;
  //   color: yellow;
  // `};

  // ${media.desktop`
  //   display: flex;
  // `};

  // ${media.widescreen`
  //   display: flex;
  // `};
`
const LinkLogo = () => (
  /* eslint-disable jsx-a11y/anchor-is-valid */
  <Link to="/">
    <Logo height="2rem" marginBottom="0" aria-label="AXS Map logo" />
  </Link>
  /* eslint-disable jsx-a11y/anchor-is-valid */
)

export default LinkLogo
