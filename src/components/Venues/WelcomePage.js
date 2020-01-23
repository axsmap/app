import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import SearchForm from '../TopBar/SearchForm'
import icon from '../../images/AXS_Logo.svg'
import Illustration from '../../images/banners/main-banner.png'
import { media, colors, fonts, fontSize, fontWeight } from '../../styles'
//import Button from '../Button'

const Wrapper = styled.div`
  z-index: 99;
  position: absolute;
  left: 0;
  top: 0;
  height: 100vh;
  background-color: ${colors.backgroundColor};
  box-shadow: #00000029 0px 0px 0px 3px;
  width: 50%;

  @media (min-width: 1200px) {
    color: #706e6b;
    background-color: ${colors.backgroundColor};
    width: 50%;
    text-align: center !important;
    box-shadow: #00000029 0px 0px 0px 3px;
  }
  @media screen and (max-width: 413px) and (min-width: 320px) {
    color: #706e6b;
    background-color: ${colors.backgroundColor};
    width: 100%;
    height: 80vh;
    padding: 20px 15px;
    text-align: justify;
    box-shadow: #00000029 0px 0px 0px 3px;
  }
  @media screen and (max-width: 475px) and (min-width: 414px) {
    color: #706e6b;
    background-color: ${colors.backgroundColor};
    width: 100%;
    height: 80vh;
    padding: 20px 15px;
    text-align: justify;
    box-shadow: #00000029 0px 0px 0px 3px;
  }
`
const WrapperInner = styled.div`
  width: 70%;
  height: calc(93vh - 70px);
  background-color: ${colors.backgroundColor};
  margin: 13% auto;

  @media screen and (max-width: 413px) and (min-width: 320px) {
    width: 100%;
    height: calc(100% - 0px);
    margin: 25x auto 30px auto;
  }
`

const Icon = styled.img`
  height: 4rem;
  position: relative;
  left: 80px;

  @media screen and (max-width: 413px) and (min-width: 320px) {
    left: 17px;
    height: 3rem;
    width: 100%;
  }
  ${media.widescreen`
  left:5px !important;
`};
`

const IllustrationIcon = styled.img`
  height: 10rem;
  position: relative;
  left: 6px;
  padding: 6px;
  margin-top: 20px;

  @media screen and (max-width: 413px) and (min-width: 320px) {
    height: 7rem;
    width: 100%;
  }
`
const Logo = styled.div``

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
  position: relative:
  text-align: center;
  clear: both;
`

const Button = styled.button`
  display: block;
  position: relative:
  text-align: center;
  clear: both;
`

const WelcomePage = props => (
  <Wrapper>
    <WrapperInner>
      <Logo to="/">
        <Icon src={icon} alt="Logo" />
      </Logo>

      <Logo to="/">
        <IllustrationIcon src={Illustration} alt="Illustration" />
      </Logo>

      <WelParaHeader>Welcome to AXS Map,</WelParaHeader>
      <WelPara>
          a tool designed to help us map inclusion in communities and find more
          places for more people.
      </WelPara>
      <OverlayTrigger
        style={{
          marginTop: '20px',
          marginBottom: '30px',
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: '55px',
          paddingRight: '55px'
        }}>
        <Button
        onClick={props.onClickHandler}  className="primary-btn--alt">
          How &amp; why to use the map
        </Button>
      </OverlayTrigger>

      <SearchBar onClick={props.hideWelcome}>
        <SearchForm
          value={props.address}
          onFormSubmit={props.handleQuerySubmit}
          onValueChange={props.handleWelcomeAddressChange}
          onValueReset={props.handleWelcomeAddressReset}
          placeholder={props.placeholderTxt}
        />
      </SearchBar>
    </WrapperInner>
  </Wrapper>
)

WelcomePage.propTypes = {
  address: PropTypes.string,
  handleQuerySubmit: PropTypes.func,
  handleWelcomeAddressChange: PropTypes.func,
  handleWelcomeAddressReset: PropTypes.func,
  placeholderTxt: PropTypes.string,
  hideWelcome: PropTypes.func,
  buttunTxt: PropTypes.string,
  onClickHandler: PropTypes.func
}

export default WelcomePage
