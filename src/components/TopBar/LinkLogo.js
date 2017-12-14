import React from 'react'
import styled from 'styled-components'

import Logo from '../Logo'
import RouterLink from '../RouterLink'
import { colors, media } from '../../styles'

const Link = styled(RouterLink)`
  display: none;

  align-items: center;
  justify-content: center;

  height: inherit;
  margin-right: 1rem;

  text-decoration: none;

  &:active,
  &:focus {
    outline: 2px solid ${colors.secondary};
  }

  ${media.tablet`
    display: flex;
  `};

  ${media.desktop`
    display: none;
  `};

  ${media.widescreen`
    display: flex;
  `};
`

const LinkLogo = () => (
  <Link to="/">
    <Logo height="2rem" marginBottom="0" />
  </Link>
)

export default LinkLogo
