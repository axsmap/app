import { intlShape } from 'react-intl'
import React from 'react'
import styled from 'styled-components'

import { colors } from '../../styles'
import homeImage from '../../images/home-image.svg'
import logo from '../../images/logo.svg'
import searchIcon from '../../images/search.svg'

import messages from './messages'

const Wrapper = styled.div`
  align-items: center;
  flex-direction: column;
  justify-content: center;
  position: relative;

  display: flex;

  height: 8rem;
  width: 100%;

  background-image: url(${homeImage});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`

const Logo = styled.img`
  height: 2.5rem;
  width: auto;
`

const SearchWrapper = styled.div`
  bottom: -1.3rem;
  position: absolute;

  height: 2.5rem;
  margin-left: auto;
  margin-right: auto;
  width: 75%;
`

const SearchIcon = styled.img`
  left: 0;
  position: absolute;
  top: 0;

  height: 1.5rem;
  margin: .5rem 0 .5rem .5rem;
  width: auto;
`

const SearchInput = styled.button`
  display: block;

  border: none;
  border-radius: 3px;
  box-shadow: inset 0px 0px 0px 1px ${colors.darkGrey};
  height: inherit;
  margin: 0;
  padding: .5rem .5rem .5rem 2.5rem;
  width: 100%;

  background-color: white;

  color: ${colors.grey};
  font-size: 1rem;
  text-align: left;

  &:focus {
    box-shadow: inset 0px 0px 0px 2px ${colors.secondary};
    outline: none;
  }
`

const Header = (props, context) =>
  <Wrapper>
    <Logo src={logo} alt="AXS Map logo" />
    <SearchWrapper>
      <SearchIcon src={searchIcon} alt="Search icon" />
      <SearchInput>
        {context.intl.formatMessage(messages.searchPlaceholder)}
      </SearchInput>
    </SearchWrapper>
  </Wrapper>

Header.contextTypes = {
  intl: intlShape
}

export default Header
