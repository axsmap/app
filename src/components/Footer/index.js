import { intlShape } from 'react-intl'
import React from 'react'
import styled from 'styled-components'

import { colors, media } from '../../styles'
import facebookIcon from '../../images/facebook-box.svg'
import Link from '../Link'
import twitterIcon from '../../images/twitter-box.svg'
import youtubeIcon from '../../images/youtube-box.svg'

import messages from './messages'

const Wrapper = styled.div`
  display: flex;

  align-items: center;
  flex-direction: column;
  justify-content: center;

  padding: 1rem;
  width: 100%;

  background-color: white;

  ${media.tablet`
    flex-direction: row;
    justify-content: space-between;
  `};
`

const Brand = styled.p`
  margin: 0;
  color: ${colors.darkestGrey};
  font-size: 0.9rem;

  ${media.tablet`
    order: 1;
  `};
`

const Section = styled.div`
  display: flex;

  align-items: center;
  justify-content: center;

  margin-bottom: 1rem;

  &:last-of-type {
    margin-right: 0;
  }

  ${media.tablet`
    order: 2;
    margin-bottom: 0;
  `};
`

const NavLink = styled(Link)`
  margin-right: 1rem;

  font-size: 0.9rem;
  text-transform: uppercase;

  &:last-child {
    margin-right: 0;
  }
`

const IconLink = styled(Link)`
  margin-right: 2rem;

  &:last-child {
    margin-right: 0;
  }

  ${media.tablet`
    margin-right: 1rem;
  `};
`

const Icon = styled.img`height: 2.5rem;`

const Footer = (props, context) => (
  <Wrapper>
    <Section>
      <NavLink to="/faq">
        {context.intl.formatMessage(messages.linksFaq)}
      </NavLink>
      <NavLink to="/terms-conditions">
        {context.intl.formatMessage(messages.linksTermsAndConditions)}
      </NavLink>
      <NavLink to="/contact">
        {context.intl.formatMessage(messages.linksContact)}
      </NavLink>
    </Section>

    <Section>
      <IconLink to="/">
        <Icon src={facebookIcon} alt="Facebook icon image" />
      </IconLink>
      <IconLink to="/">
        <Icon src={twitterIcon} alt="Twitter icon image" />
      </IconLink>
      <IconLink to="/">
        <Icon src={youtubeIcon} alt="Youtube icon image" />
      </IconLink>
    </Section>

    <Brand>&copy; 2017 AXS MAP</Brand>
  </Wrapper>
)

Footer.contextTypes = {
  intl: intlShape
}

export default Footer
