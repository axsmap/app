import PropTypes from 'prop-types'
import React from 'react'
import { intlShape } from 'react-intl'

import Container from './Container'
import NavDropdown from './NavDropdown'
import FilterButton from './FilterButton'
import FilterSelectBox from './FilterSelectBox'
import LinkButton from './LinkButton'
import LinkIcon from './LinkIcon'
import LinkLogo from './LinkLogo'
import messages from './messages'
import NavLink from './NavLink'
import SearchForm from './SearchForm'
import SectionLeft from './SectionLeft'
import SectionRight from './SectionRight'
import Wrapper from './Wrapper'

const TopBar = (props, context) => (
  <Wrapper hideOn={props.hideOn}>
    <Container>
      <SectionLeft>
        <LinkLogo />

        <LinkIcon />

        <SearchForm
          value={props.keywords}
          onFormSubmit={props.handleQuerySubmit}
          onValueChange={props.handleKeywordsChange}
          placeholder={context.intl.formatMessage(
            props.currentUrl === '/teams'
              ? messages.teamsSearchPlaceholder
              : messages.searchPlaceholder
          )}
          large={props.currentUrl === '/teams'}
        />

        {props.currentUrl === '/' && (
          <FilterButton onClickHandler={props.showFilters} />
        )}

        {props.currentUrl === '/' && (
          <FilterSelectBox
            value={props.filters.type}
            handleValueChange={props.handleVenuesTypeChange}
          />
        )}
      </SectionLeft>

      <SectionRight>
        <NavLink
          to="/"
          label={context.intl.formatMessage(messages.navVenues)}
          isActive={props.currentUrl === '/'}
        />
        <NavLink
          to="/mapathons"
          label={context.intl.formatMessage(messages.navMapathons)}
          isActive={props.currentUrl === '/mapathons'}
        />
        <NavLink
          to="/teams"
          label={context.intl.formatMessage(messages.navTeams)}
          isActive={props.currentUrl === '/teams'}
        />

        {props.isAuthenticated ? (
          <NavDropdown
            avatarUrl={props.userData.avatar}
            sendingRequest={props.sendingRequest}
            onSignOutClick={props.handleSignOutClick}
            isActive={props.currentUrl === '/account'}
          />
        ) : (
          <LinkButton
            to="/sign-in"
            label={context.intl.formatMessage(messages.navSignIn)}
          />
        )}
      </SectionRight>
    </Container>
  </Wrapper>
)

TopBar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  hideOn: PropTypes.string,
  keywords: PropTypes.string.isRequired,
  filters: PropTypes.shape({
    type: PropTypes.string.isRequired
  }).isRequired,
  currentUrl: PropTypes.string.isRequired,
  userData: PropTypes.shape({
    avatar: PropTypes.string
  }).isRequired,
  sendingRequest: PropTypes.bool.isRequired,
  handleQuerySubmit: PropTypes.func.isRequired,
  handleKeywordsChange: PropTypes.func.isRequired,
  showFilters: PropTypes.func.isRequired,
  handleVenuesTypeChange: PropTypes.func.isRequired,
  handleSignOutClick: PropTypes.func.isRequired
}

TopBar.defaultProps = {
  hideOn: ''
}

TopBar.contextTypes = {
  intl: intlShape
}

export default TopBar
