import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { media } from '../../styles'
import SearchForm from '../TopBar/SearchForm'
import icon from '../../images/AXS_Logo.svg'
import Illustration from '../../images/axs_illustration_disilva_entrance_yellow_01_2x.png'

const Wrapper = styled.div`
  z-index: 99;
  position: absolute;
  left: 0;
  top: 0;
  padding: 65px 168px;
  height: 100vh;
  box-shadow: #00000029 0px 0px 0px 3px;

  ${media.widescreen`
    color: #706E6B;
    background: #fff;
    width: 50% !important;
    padding: 65px 164px !important;
    text-align: center !important;
    box-shadow: #00000029 0px 0px 0px 3px;
  `};
  ${media.mobile`
    color: #706E6B;
   background-color: #fff;
    width:100%;
    padding: 25px 21px;
    text-align: justify;
    box-shadow: #00000029 0px 0px 0px 3px;
`};
`

const Icon = styled.img`
  height: 4rem;
  position: relative;
  left: 80px;
  ${media.mobile`
     left:75px;
`};
  ${media.widescreen`
  left:5px !important;
`};
`

const IllustrationIcon = styled.img`
  height: 10rem;
  position: relative;
  left: 6px;
  padding: 6px;

  ${media.mobile`
  left:6px;
  padding: 10px;

`};
`

const SearchBar = styled.div`
  position: relative;
  left: -58px !important;

  align-items: center;
  justify-content: center;
  display: flex;
  ${media.mobile`
  left:0px;
`};
`

const ButtonContent = styled.div`
  background: #d8d8da;
  cursor: pointer;
  width: 60%;
  position: relative;
  left: 15rem;
  top: 32px;
  border-radius: 10px;
  ${media.widescreen`
  // width: 65% !important;
  // position: relative;
  // left: 6rem !important;
  // top: 32px;
  `};
  ${media.mobile`
  left: 8rem;
  width:53%;
`};
`
const WelPara = styled.p`
  text-align: justify;
`
const Explore = styled.p`
  color: #42454a;
  font-size: 11px;
  position: relative;
  top: -20px;
  left: 2px;
  font-weight: 900;
  max-height: 10px;
  text-transform: uppercase;
  ${media.widescreen`
  left:0px !important;
  `};
  ${media.mobile`
  left:9px;
`};
`

const ExpWrap = styled.div`
  height: 2rem;
`

const Line = styled.div`
  border-top: 2px solid #ebecec;
  position: relative;
  bottom: 16px;
  width: 30rem;
  right: 108px;
`

const Logo = styled.div``

const WelcomePage = props => (
  <Wrapper>
    <Logo to="/">
      <Icon src={icon} alt="Logo" />
    </Logo>

    <Logo to="/">
      <IllustrationIcon src={Illustration} alt="Illustration" />
    </Logo>

    <WelPara>
      <p>
        Every trip is a story with a beginning, middle, and end. But for those
        with disabilities, these trips can often be confusing and stressful, or
        end in a letdown – we’re out to change that. By sharing our stories and
        knowledge, we can re-achieve the spontaneity of mobility freedom for
        those of all abilities.<br />
        <br />
        How did you enter the venue? How was your experience inside the venue?
        How did you leave the venue? <br />
        <br />
        With more shared knowledge and more accessible places, we can grow this
        world to create more of the experiences we love - experiences for
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
    <ButtonContent onClick={props.hideWelcome}>
      <Line />
      <ExpWrap />
      <Explore>{props.buttunTxt}</Explore>
    </ButtonContent>
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
