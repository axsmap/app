import { bool, func, object, string } from 'prop-types'
import React from 'react'
import { intlShape } from 'react-intl'

import Container from './Container'
import NavDropdown from './NavDropdown'
import FilterButton from './FilterButton'
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
    location: object.isRequired,
    userData: object.isRequired,
    sendingRequest: bool.isRequired,
    clearKeywords: func.isRequired,
    handleQuerySubmit: func.isRequired,
    handleKeywordsChange: func.isRequired,
    showFilters: func.isRequired,
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
    const formatMessage = this.context.intl.formatMessage

    let searchPlaceholder = messages.searchPlaceholder
    if (this.props.location.pathname.startsWith('/teams')) {
      searchPlaceholder = messages.teamsSearchPlaceholder
    } else if (this.props.location.pathname.startsWith('/mapathons')) {
      searchPlaceholder = messages.mapathonsSearchPlaceholder
    }

    return (
      <Wrapper hideOn={this.props.hideOn}>
        <Container>
          <SectionLeft>
            <LinkLogo />

            <LinkIcon />

            {this.props.location.pathname === '/' ||
            this.props.location.pathname === '/teams' ||
            this.props.location.pathname === '/mapathons' ? (
              <SearchForm
                value={this.props.keywords}
                onFormSubmit={this.props.handleQuerySubmit}
                onValueChange={this.props.handleKeywordsChange}
                placeholder={formatMessage(searchPlaceholder)}
              />
            ) : null}

            {this.props.location.pathname === '/' ? (
              <FilterButton
                label={formatMessage(messages.showFiltersButton)}
                onClickHandler={this.props.showFilters}
              />
            ) : null}
          </SectionLeft>

          <SectionRight>
            <NavLink
              to="/"
              label={formatMessage(messages.navVenues)}
              isActive={this.props.location.pathname === '/'}
            />
            <NavLink
              to="/mapathons"
              label={formatMessage(messages.navMapathons)}
              isActive={this.props.location.pathname.startsWith('/mapathons')}
            />
            <NavLink
              to="/teams"
              label={formatMessage(messages.navTeams)}
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
                label={formatMessage(messages.navSignIn)}
              />
            )}
          </SectionRight>
        </Container>
      </Wrapper>
    )
  }
}
