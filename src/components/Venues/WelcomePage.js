import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import SearchForm from '../TopBar/SearchForm'
import icon from '../../images/AXS_Logo.svg'
import Illustration from '../../images/banners/main-banner.png'
import { media, colors, fonts, fontSize, fontWeight } from '../../styles'

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
  magin-bottom: 32px;
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
const Explore = styled.button`
  color: #42454a;
  font-size: 11px;
  font-weight: 900;
  background-color: #d8d8da;
  width: 300px;
  height: 45px;
  border-radius: 7px;
  outline: none;
  border: none;
  text-transform: uppercase;
  margin-top: 40px;
  cursor: pointer;
  ${media.widescreen`
  left:0px !important;
  `};

  @media screen and (max-width: 475px) and (min-width: 414px) {
    margin: 34px 30px;
    cursor: pointer;
  }
  @media screen and (max-width: 413px) and (min-width: 320px) {
    margin: 34px 30px;
    cursor: pointer;
  }
`

const Line = styled.div`
  border-top: 2px solid #ebecec;
  position: absolute;
  width: 37.5rem;
  left: 16%;
  margin-top: 20px;
  @media screen and (max-width: 413px) and (min-width: 320px) {
    display: none;
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

const overlayTrigger = styled.div`
  display: block;
  position: relative:
  text-align: center;
  clear: both;
`

const Logo = styled.div``

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
        <p style={{ marginTop: '0 !important', marginBottom: '0 !important' }}>
          a tool designed to help us map inclusion in communities and find more
          places for more people.
        </p>
      </WelPara>
      <overlayTrigger
        className="primary-btn--alt"
        style={{
          marginTop: '20px',
          marginBottom: '30px',
          paddingLeft: '55px',
          paddingRight: '55px'
        }}
      >
        How &amp; why to use the map
      </overlayTrigger>

      {/* important search input from top bar and display here */}

      <SearchBar>
        <SearchForm
          value={props.address}
          onFormSubmit={props.handleQuerySubmit}
          onValueChange={props.handleWelcomeAddressChange}
          onValueReset={props.handleWelcomeAddressReset}
          placeholder={props.placeholderTxt}
        />
      </SearchBar>
      <Line />
      <Explore onClick={props.hideWelcome}>{props.buttunTxt}</Explore>
    </WrapperInner>
  </Wrapper>
)

WelcomePage.propTypes = {
  address: PropTypes.bool,
  handleQuerySubmit: PropTypes.func,
  handleWelcomeAddressChange: PropTypes.func,
  handleWelcomeAddressReset: PropTypes.func,
  placeholderTxt: PropTypes.string,
  hideWelcome: PropTypes.func,
  buttunTxt: PropTypes.string
}

export default WelcomePage
