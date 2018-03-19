import { bool, func, object, string } from 'prop-types'
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

export default class TopBar extends React.Component {
  static propTypes = {
    isAuthenticated: bool.isRequired,
    hideOn: string,
    keywords: string.isRequired,
    filters: object.isRequired,
    location: object.isRequired,
    userData: object.isRequired,
    sendingRequest: bool.isRequired,
    clearKeywords: func.isRequired,
    handleQuerySubmit: func.isRequired,
    handleKeywordsChange: func.isRequired,
    showFilters: func.isRequired,
    handleVenuesTypeChange: func.isRequired,
    handleSignOutClick: func.isRequired
  }

  static defaultProps = {
    hideOn: ''
  }

  static contextTypes = {
    intl: intlShape
  }

  componentWillUnmount() {
    this.props.clearKeywords()
  }

  render() {
    let searchPlaceholder = messages.searchPlaceholder
    if (this.props.location.pathname.startsWith('/teams')) {
      searchPlaceholder = messages.teamsSearchPlaceholder
    } else if (this.props.location.pathname.startsWith('/mapathons')) {
      searchPlaceholder = messages.mapathonsSearchPlaceholder
    }

    let searchIsLarge = false
    if (
      this.props.location.pathname.startsWith('/teams') ||
      this.props.location.pathname.startsWith('/mapathons')
    ) {
      searchIsLarge = true
    }

    return (
      <Wrapper hideOn={this.props.hideOn}>
        <Container>
          <SectionLeft>
            <LinkLogo />

            <LinkIcon />

            <SearchForm
              value={this.props.keywords}
              onFormSubmit={this.props.handleQuerySubmit}
              onValueChange={this.props.handleKeywordsChange}
              placeholder={this.context.intl.formatMessage(searchPlaceholder)}
              large={searchIsLarge}
            />

            {this.props.location.pathname === '/' ||
            this.props.location.pathname.startsWith('/venues') ? (
              <FilterButton onClickHandler={this.props.showFilters} />
            ) : null}

            {this.props.location.pathname === '/' ||
            this.props.location.pathname.startsWith('/venues') ? (
              <FilterSelectBox
                value={this.props.filters.type}
                handleValueChange={this.props.handleVenuesTypeChange}
              />
            ) : null}
          </SectionLeft>

          <SectionRight>
            <NavLink
              to="/"
              label={this.context.intl.formatMessage(messages.navVenues)}
              isActive={this.props.location.pathname === '/'}
            />
            <NavLink
              to="/mapathons"
              label={this.context.intl.formatMessage(messages.navMapathons)}
              isActive={this.props.location.pathname.startsWith('/mapathons')}
            />
            <NavLink
              to="/teams"
              label={this.context.intl.formatMessage(messages.navTeams)}
              isActive={this.props.location.pathname.startsWith('/teams')}
            />

            {this.props.isAuthenticated ? (
              <NavDropdown
                userData={this.props.userData}
                sendingRequest={this.props.sendingRequest}
                onSignOutClick={this.props.handleSignOutClick}
                isActive={
                  this.props.location.pathname ===
                  `/users/${this.props.userData.id}`
                }
              />
            ) : (
              <LinkButton
                to="/sign-in"
                label={this.context.intl.formatMessage(messages.navSignIn)}
              />
            )}
          </SectionRight>
        </Container>
      </Wrapper>
    )
  }
}
