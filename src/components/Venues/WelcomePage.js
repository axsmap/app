import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { intlShape } from 'react-intl'

import SearchForm from '../TopBar/SearchForm'
import Icon from '../Icon'
import siteLogo from '../../images/AXS_Logo.svg'
import Illustration from '../../images/banners/main-banner.png'
import { media, colors, fonts, fontSize, fontWeight } from '../../styles'
import Button from '../Button'

import messages from './messages'

const SideWrapper = styled.div`
  z-index: 99;
  position: absolute;
  right: 0;
  top: 0;
  height: 85vh;
  background-color: #0000009e;

  ${media.desktop`
    width: 50%;
    height: 100vh;
  `};

  ${media.widescreen`
    width: 45%;
    height: 100vh;
  `};
`

const Wrapper = styled.div`
  z-index: 99;
  position: absolute;
  left: 0;
  top: 0;
  height: 85vh;
  background-color: ${colors.backgroundColor};
  box-shadow: #00000029 0px 0px 0px 3px;
  width: 100%;

  @media (min-width: 320px) {
    height: 98vh;
    overflow: hidden;
  }

  ${media.tablet`
    width: 100%;
    height: 65vh;
  `};

  ${media.desktop`
    width: 50%;
    height: 100vh;
  `};

  ${media.widescreen`
    width: 55%;
    height: 100vh;
  `};
`
const WrapperInner = styled.div`
  width: 100%;
  margin: 8% auto;
  padding-left: 25px;
  padding-right: 25px;

  ${media.tablet`
    width: 100%;
    height: 60vh;
  `};

  ${media.widescreen`
    width: 70%;
    margin: 13% auto;
  `};

  ${media.desktop`
    width: 70%;
    margin: 13% auto;
  `};
`

const LogoIcon = styled.img`
  height: 4rem;
  position: relative;
  // left: 80px;

  @media screen and (max-width: 413px) and (min-width: 320px) {
    left: 17px;
    height: 3rem;
    width: 100%;
  }
  ${media.desktop`
    left:5px !important;
  `};

  ${media.widescreen`
    left:5px !important;
  `};
`

const IllustrationIcon = styled.img`
  height: 10rem;
  position: relative;
  display: block;
  text-align: center;
  margin: 20px auto 0 auto;
  padding: 6px;
  width: 100%;

  @media screen and (max-width: 413px) and (min-width: 320px) {
    height: 7rem;
    width: 100%;
  }

  ${media.desktop`
    width: auto;
  `};
`
const Logo = styled.div`
  display: block;
  position: relative;
  text-align: center;
`

const SearchBar = styled.div`
  position: relative;
  align-items: center;
  justify-content: center;
  display: flex;

  ${media.mobile`
  left:0px;
`};
`

const WelParaHeader = styled.h1`
  text-align: center;
  display: block;
  position: relative;
  font-family: ${fonts.tertiary};
  font-size: ${fontSize.xl1};
  line-height: 1.5;
  margin-bottom: 32px;
`

const WelPara = styled.p`
  text-align: center;
  display: block;
  position: relative;
  font-weight: ${fontWeight.medium};
  font-family: ${fonts.primary};
  font-size: ${fontSize.base};
  line-height: 1.375;
  margin-bottom: 20px;
`

const OverlayTrigger = styled.div`
  display: block;
  position: relative;
  text-align: center;
  clear: both;
  padding-left: 0;
  padding-right: 0;
  margin: 0 auto 30px auto;

  ${media.desktop`
    margin: 20px auto 30px auto;
    padding-left: 55px;
    padding-right: 55px;
  `};
`

const WelcomePage = (props, context) => (
  <>
    <Wrapper
      aria-labelledby="dialog-title"
      role="region"
      aria-live="polite"
      aria-atomic="true"
      id="WelcomeScreen"
      tabIndex="-1"
    >
      <WrapperInner>
        <Button
          backgroundColor={colors.backgroundColor}
          color={colors.darkestGrey}
          disabled={false}
          onClickHandler={props.hideWelcome}
          style={{ padding: '0rem' }}
          aria-label="close welcome"
        >
          <Icon
            glyph="cross"
            size={1}
            backgroundColor={colors.backgroundColor}
            onClickHandler={props.hideWelcome}
            color={colors.darkestGrey}
          />
        </Button>
        <Logo to="/">
          <LogoIcon src={siteLogo} alt="AXSMap Logo" />
        </Logo>

        <Logo to="/">
          <IllustrationIcon
            src={Illustration}
            alt="AXSMap"
            aria-hidden="true"
          />
        </Logo>

        <WelParaHeader id="dialog-title">
          {' '}
          {context.intl.formatMessage(messages.welcomeLabel)}
        </WelParaHeader>
        <WelPara>{context.intl.formatMessage(messages.welcomeMessage)}</WelPara>
        <OverlayTrigger>
          <Button
            onClick={props.onClickHandler}
            className="primary-btn--alt mx-auto is-full"
            disabled={false}
          >
            {context.intl.formatMessage(messages.welcomeCta)}
          </Button>
        </OverlayTrigger>

        <SearchBar>
          <SearchForm
            value={props.name}
            onFormSubmit={props.handleQuerySubmit}
            onValueChange={props.handleWelcomeAddressChange}
            onValueReset={props.handleWelcomeAddressReset}
            placeholder={props.placeholderTxt}
            id="welcomeSearch"
          />
        </SearchBar>
      </WrapperInner>
    </Wrapper>
    <SideWrapper onClick={() => props.hideWelcome()} />
  </>
)

WelcomePage.propTypes = {
  name: PropTypes.string,
  handleQuerySubmit: PropTypes.func,
  handleWelcomeAddressChange: PropTypes.func,
  handleWelcomeAddressReset: PropTypes.func,
  placeholderTxt: PropTypes.string,
  hideWelcome: PropTypes.func,
  onClickHandler: PropTypes.func,
  welcomeVisibility: PropTypes.bool
}

WelcomePage.contextTypes = {
  intl: intlShape
}

export default WelcomePage
