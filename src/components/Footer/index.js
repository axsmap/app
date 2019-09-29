import { bool, string } from 'prop-types'
import React from 'react'
import { intlShape } from 'react-intl'
import styled from 'styled-components'

import { colors, media } from '../../styles'
import Icon from '../Icon'
import Link from '../Link'

import messages from './messages'

const Wrapper = styled.div`
  display: ${props => (props.hideOn.includes('phone') ? 'none' : 'flex')};

  align-items: center;
  justify-content: center;

  border-top: 1px solid ${colors.grey};
  width: 100%;

  background-color: white;

  ${media.tablet`
    display: ${props => (props.hideOn.includes('tablet') ? 'none' : 'flex')};
    height: 5rem;
  `};

  ${media.desktop`
    display: ${props => (props.hideOn.includes('desktop') ? 'none' : 'flex')};
  `};

  ${media.widescreen`
    display: ${props =>
      props.hideOn.includes('widescreen') ? 'none' : 'flex'};
  `};
`

const Container = styled.div`
  display: flex;

  align-items: center;
  flex-direction: column;
  justify-content: center;

  padding: 1rem;
  width: 100%;

  ${media.tablet`
    flex-direction: row;
    justify-content: space-between;

    padding: ${props => (props.isNarrow ? '0' : '0 1rem')};
    width: ${props => (props.isNarrow ? '723px' : '100%')};
  `};

  ${media.desktop`
    flex-direction: row;
    justify-content: space-between;

    padding: ${props => (props.isNarrow ? '0' : '0 1rem')};
    width: ${props => (props.isNarrow ? '933px' : '100%')};
  `};

  ${media.widescreen`
    flex-direction: row;
    justify-content: space-between;

    padding: ${props => (props.isNarrow ? '0' : '0 1rem')};
    width: ${props => (props.isNarrow ? '1127px' : '100%')};
  `};
`

const Brand = styled.p`
  margin: 0;
  color: ${colors.darkestGrey};
  font-size: 0.9rem;

  ${media.tablet`
    order: 1;
  `};

  ${media.desktop`
    font-size: 1rem;
  `};

  ${media.widescreen`
    font-size: ${props => props.wFontSize || '1rem'};
  `};
`

const NavSection = styled.div`
  display: flex;

  align-items: center;
  flex-direction: column;
  justify-content: center;

  margin-bottom: 1rem;

  &:last-of-type {
    margin-right: 0;
  }

  ${media.tablet`
    flex-direction: row;
    order: 2;
    margin-bottom: 0;
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

const NavLink = styled(({ wFontSize, ...rest }) => <Link {...rest} />)`
  margin-bottom: 0.5rem;
  margin-right: 0;

  font-size: 0.9rem;
  font-weight: bold;
  text-transform: uppercase;

  &:last-child {
    margin-bottom: 0;
  }

  ${media.tablet`
    margin-bottom: 0;
    margin-right: 1rem;

    &:last-child {
      margin-right: 0;
    }
  `};

  ${media.desktop`
    font-size: 1rem;
  `};

  ${media.widescreen`
    font-size: ${props => props.wFontSize || '1rem'};
  `};
`

const NavAbsoluteLink = styled.a`
  margin: 0.5rem 0;

  color: colors.darkestGrey;
  font-size: 0.9rem;
  font-weight: bold;
  text-align: center;
  text-transform: uppercase;

  &:active,
  &:focus {
    outline: 2px solid ${colors.secondary};
  }

  ${media.tablet`
    margin-bottom: 0;
    margin-right: 1rem;
  `};

  ${media.desktop`
    font-size: 1rem;
  `};

  ${media.widescreen`
    font-size: ${props => props.wFontSize || '1rem'};
  `};
`

const IconLink = styled.a`
  display: flex;

  align-items: center;
  justify-content: center;

  border-radius: 3px;
  height: 3rem;
  margin-right: 2rem;
  width: 3rem;

  background-color: ${colors.darkestGrey};

  &:active,
  &:focus {
    outline: 2px solid ${colors.secondary};
  }

  &:focus,
  &:hover {
    background-color: ${props => props.onFocusBackgroundColor};
  }

  &:last-child {
    margin-right: 0;
  }

  ${media.tablet`
    margin-right: 1rem;
  `};
`

const Footer = (props, context) => (
  <Wrapper hideOn={props.hideOn}>
    <Container isNarrow={props.isNarrow}>
      <NavSection>
        <NavLink to="/faq" wFontSize={props.wFontSize}>
          {context.intl.formatMessage(messages.linksFaq)}
        </NavLink>
        <NavAbsoluteLink
          href="https://axslab.aiacompanystore.com/cl/Shirts/2266"
          wFontSize={props.wFontSize}
          target="_blank"
        >
          {context.intl.formatMessage(messages.linksShop)}
        </NavAbsoluteLink>
        <NavLink to="/terms-conditions" wFontSize={props.wFontSize}>
          {context.intl.formatMessage(messages.linksTermsAndConditions)}
        </NavLink>
        <NavLink to="/contact" wFontSize={props.wFontSize}>
          {context.intl.formatMessage(messages.linksContact)}
        </NavLink>
      </NavSection>

      <Section>
        <IconLink
          href="https://facebook.com/axsmap"
          target="_blank"
          rel="noopener"
          onFocusBackgroundColor={colors.facebook}
        >
          <Icon glyph="facebook" size={2} />
        </IconLink>
        <IconLink
          href="https://twitter.com/axsmap"
          target="_blank"
          rel="noopener"
          onFocusBackgroundColor={colors.twitter}
        >
          <Icon glyph="twitter" size={2} />
        </IconLink>
        <IconLink
          href="https://youtube.com/axsmaptv"
          target="_blank"
          rel="noopener"
          onFocusBackgroundColor={colors.youtube}
        >
          <Icon glyph="youtube" size={2} />
        </IconLink>
      </Section>

      <Brand wFontSize={props.wFontSize}>&reg; 2018 AXS MAP</Brand>
    </Container>
  </Wrapper>
)

Footer.propTypes = {
  hideOn: string,
  isNarrow: bool,
  wFontSize: string
}

Footer.defaultProps = {
  hideOn: '',
  isNarrow: false,
  wFontSize: ''
}

Footer.contextTypes = {
  intl: intlShape
}

export default Footer
