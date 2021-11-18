import { bool, string } from 'prop-types'
import React from 'react'
import { intlShape } from 'react-intl'
import styled from 'styled-components'
import Grid from 'styled-components-grid'

import { colors, media, fontSize, fontWeight } from '../../styles'
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
    display: ${props => (props.hideOn.includes('tablet') ? 'none' : 'block')};
    height: 6rem;
    overflow: hidden;
    margin: 1rem;
  `};

  ${media.desktop`
    display: ${props => (props.hideOn.includes('desktop') ? 'none' : 'block')};
    height: 5rem;
  `};

  ${media.widescreen`
    display: ${props =>
      props.hideOn.includes('widescreen') ? 'none' : 'block'};
      margin: 0;
      padding: 0;
      height: 5rem;
  `};

  @media only screen and (min-device-width: 1024px) and (max-device-width: 1366px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait) {
    display: none;
    height: 3rem;
    overflow: hidden;
    margin: 1rem;
  }

  @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: landscape) {
    display: none;
    height: 3rem;
    overflow: hidden;
    margin: 1rem;
  }
`

const Container = styled.div`
  display: block-flex;
  position: relative;
  overflow: hidden;
  padding: 1rem;
  padding-left: 1rem;
  padding-right: 0.5rem;
  /* padding-top: 1rem;
  padding-left: 1rem;
  padding-right: 0.5rem; */
  width: 100%;

  ${media.tablet`
    padding: 0.5rem;
    justify-content: center;
    align-items:center;
  `};

  ${media.desktop`
    padding: 1rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    justify-content: flex-start;
    align-items: stretch;
  `};

  ${media.widescreen`
    padding: 1rem;
    padding-left: 1rem;
    padding-right: 0.5rem;
    justify-content: flex-start;
    align-items: stretch;
  `};
`

const Brand = styled.p`
  margin: 0;
  margin-bottom: 0.5rem;
  color: ${colors.darkestGrey};
  font-size: ${fontSize.xs};
  line-height: 1 !important;

  ${media.tablet`
    order: 1;
    font-size: ${fontSize.xxs};
    line-height: 1 !important;
    display: flex;
    align-items: center;
    justify-content: center;
  `};

  ${media.desktop`
    font-size: ${fontSize.xs};
    line-height: 1 !important;
    justify-content: flex-start;
    align-items: stretch;
  `};

  ${media.widescreen`
    font-size: ${fontSize.xs};
    line-height: 48px !important;
    justify-content: flex-start;
    align-items: stretch;
  `};

  @media only screen and (min-device-width: 768px) and (max-device-width: 1440px) {
    font-size: 0.5rem;
    line-height: 48px !important;
    justify-content: flex-start;
    align-items: stretch;
  }
`

const NavSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;

  ${media.tablet`
    flex-direction: row;
    order: 2;
    margin-bottom: 0.5rem;
    float: center;
  `};

  ${media.desktop`
    line-height: 48px !important;
    float: left;
  `};

  ${media.widescreen`
    line-height: 48px !important;
    float: left;
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
  margin-right: 0.5rem;
  font-size: 0.9rem;
  font-weight: ${fontWeight.bold};
  text-transform: uppercase;
  font-size: ${fontSize.xs};
  line-height: 1 !important;

  ${media.tablet`
    margin-bottom: 0;
    margin-right: 1rem;
    font-size: ${fontSize.xs};
    line-height: 1 !important;

    &:last-child {
      margin-right: 0;
    }
  `};

  ${media.desktop`
    font-size: ${fontSize.xs};
    line-height: 48px !important;
    margin-right: 0.5rem;
    &:first-child {
      margin-left: 0px;
    }
  `};

  ${media.widescreen`
    font-size: ${fontSize.xs};
    line-height: 48px !important;
    
    &:first-child {
      margin-left: 10px;
    }
  `};

  @media only screen and (min-device-width: 768px) and (max-device-width: 1440px) {
    font-size: 0.5rem;
    line-height: 48px !important;
    margin-right: 0.5rem;
    &:first-child {
      margin-left: 0px;
    }
  }
`

const NavAbsoluteLink = styled.a`
  margin-bottom: 0.5rem;
  margin-right: 0.5rem;
  color: ${colors.darkestGrey};
  font-weight: bold;
  text-align: center;
  text-transform: uppercase;
  font-size: ${fontSize.xs};
  font-weight: ${fontWeight.bold};
  line-height: 1 !important;

  &:active,
  &:focus {
    outline: 2px solid ${colors.secondary};
  }

  &:visited {
    color: ${colors.darkestGrey};
  }

  ${media.tablet`
    margin-bottom: 0;
    margin-right: 1rem;
    font-size: ${fontSize.xs};
    line-height: 1 !important;

    &:last-child {
      margin-right: 0;
    }
  `};

  ${media.desktop`
    font-size: ${fontSize.xs};
    line-height: 48px !important;
    margin-right: 0.5rem;
  `};

  ${media.widescreen`
    font-size: ${fontSize.xs};
    line-height: 48px !important;
  `};

  @media only screen and (min-device-width: 768px) and (max-device-width: 1440px) {
    font-size: 0.5rem;
    line-height: 48px !important;
    margin-right: 0.5rem;
  }
`

const IconLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  height: 3rem;
  margin-right: 2rem;
  width: 100%;
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

  ${media.desktop`
    margin-right: 0.5rem;
  `};

  ${media.widescreen`
    width: 3rem;
  `};
`

const Footer = (props, context) => (
  <Wrapper hideOn={props.hideOn} id="footer" role="contentinfo">
    <Container isNarrow={props.isNarrow}>
      <Grid className="is-full overflow-hidden">
        <Grid.Unit
          size={{
            mobile: 1 / 3,
            tablet: 1 / 1,
            desktop: 1.75 / 12,
            widescreen: 1.5 / 12
          }}
          className="mx-auto"
        >
          <Brand wFontSize={props.wFontSize}>
            &reg; {new Date().getFullYear()} AXS MAP
          </Brand>
        </Grid.Unit>
        <Grid.Unit
          size={{
            mobile: 1 / 1,
            tablet: 1 / 1,
            desktop: 8.1 / 12,
            widescreen: 8 / 12
          }}
          className="mx-auto"
        >
          <NavSection>
            <NavLink to="/faq" wFontSize={props.wFontSize}>
              {context.intl.formatMessage(messages.linksFaq)}
            </NavLink>
            <NavAbsoluteLink
              href="https://axslab.buyproforma.com/"
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
        </Grid.Unit>
        <Grid.Unit
          size={{
            mobile: 1 / 1,
            tablet: 1 / 1,
            desktop: 2.15 / 12,
            widescreen: 2.5 / 12
          }}
          className="mx-auto"
        >
          <Section>
            <IconLink
              href="https://facebook.com/axsmap"
              target="_blank"
              rel="noopener"
              onFocusBackgroundColor={colors.facebook}
            >
              <span className="_hide-visual">Facebook</span>
              <Icon glyph="facebook" desktopSize={1.5} size={2} />
            </IconLink>
            <IconLink
              href="https://twitter.com/axsmap"
              target="_blank"
              rel="noopener"
              onFocusBackgroundColor={colors.twitter}
            >
              <span className="_hide-visual">Twitter</span>
              <Icon glyph="twitter" desktopSize={1.5} size={2} />
            </IconLink>
            <IconLink
              href="https://youtube.com/axsmaptv"
              target="_blank"
              rel="noopener"
              onFocusBackgroundColor={colors.youtube}
            >
              <span className="_hide-visual">Youtube</span>
              <Icon glyph="youtube" desktopSize={1.5} size={2} />
            </IconLink>
          </Section>
        </Grid.Unit>
      </Grid>
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
