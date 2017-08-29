import { intlShape } from 'react-intl'
import PropTypes from 'prop-types'
import React from 'react'

import logo from '../../images/logo.svg'
import Navigation from '../Navigation'
import Search from '../../containers/Search'
import searchIcon from '../../images/search.svg'

import Header from './Header'
import HeaderLogo from './HeaderLogo'
import HeaderSearch from './HeaderSearch'
import messages from './messages'
import SearchButton from './SearchButton'
import SearchIcon from './SearchIcon'
import Wrapper from './Wrapper'

const Home = (props, context) => {
  if (props.showSearch) {
    return <Search />
  }

  return (
    <Wrapper>
      <Header>
        <HeaderLogo src={logo} alt="AXS Map logo" />
        <HeaderSearch>
          <SearchIcon src={searchIcon} alt="Search icon" />
          <SearchButton onClick={props.onSetShowSearch}>
            {context.intl.formatMessage(messages.searchText)}
          </SearchButton>
        </HeaderSearch>
      </Header>
      <Navigation />
    </Wrapper>
  )
}

Home.propTypes = {
  showSearch: PropTypes.bool.isRequired,
  onSetShowSearch: PropTypes.func.isRequired
}

Home.contextTypes = {
  intl: intlShape
}

export default Home
