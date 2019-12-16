import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { media, colors } from '../../styles'
import SearchForm from '../TopBar/SearchForm'
import icon from '../../images/AXS_Logo.svg'
import Illustration from '../../images/axs_illustration_disilva_entrance_yellow_01_2x.png'

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

const WelPara = styled.p`
  text-align: justify;
  line-height: 1.4 !important;
  font-size: 13px;
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
  margin: 60px auto 0;
  @media screen and (max-width: 413px) and (min-width: 320px) {
    width: 100%;
    height: calc(100% - 0px);
    margin: 0 auto;
  }
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

      <WelPara>
        <p style={{ marginTop: '0 !important', marginBottom: '0 !important' }}>
          Every trip is a story with a beginning, middle, and end. But for those
          with disabilities, these trips can often be confusing and stressful,
          or end in a letdown – we’re out to change that. By sharing our stories
          and knowledge, we can re-achieve the spontaneity of mobility freedom
          for those of all abilities.<br />
          <br />
          How did you enter the venue? How was your experience inside the venue?
          How did you leave the venue? <br />
          <br />
          With more shared knowledge and more accessible places, we can grow
          this world to create more of the experiences we love - experiences for
          everyone.
          <br /> <br />
        </p>
      </WelPara>

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
