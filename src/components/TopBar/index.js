import PropTypes from 'prop-types'
import React, { useEffect } from 'react'
import { useIntl } from 'react-intl'
import styled from 'styled-components'

import { colors, media } from '../../styles'
import LogoAlt from '../LogoAlt'
import NavDropdown from './NavDropdown'
import LinkButton from './LinkButton'
import LinkLogo from './LinkLogo'
import InfoIcon from './InfoIcon'
import messages from './messages'
import NavLink from './NavLink'
import SearchForm from './SearchForm'
import RouterLink from '../RouterLink'
import LanguageDropdown from './LanguageDropdown'
import MobileLanguageDropdown from './MobileLanguageDropdown'
import FilterButton from '../Venues/FilterButton'

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  z-index: 30;

  display: ${props => (props.$hideOn.includes('phone') ? 'none' : 'flex')};
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 0 0 ${colors.grey};
  height: ${props => (props.$isLarge ? '8rem' : '4rem')};
  width: 100%;
  background-color: white;

  ${media.tablet`
    display: ${props => (props.$hideOn.includes('tablet') ? 'none' : 'flex')};
    height: 4rem;
  `};

  ${media.desktop`
    display: ${props => (props.$hideOn.includes('desktop') ? 'none' : 'flex')};
  `};

  ${media.widescreen`
    display: ${props =>
      props.$hideOn.includes('widescreen') ? 'none' : 'flex'};
  `};
`

const Container = styled.div`
  align-items: center;
  justify-content: space-between;
  display: flex;
  height: inherit;
  padding: 0 1rem;
  width: 100%;
`

const SectionLeft = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-around;

  @media (max-width: 420px) {
    align-items: flex-start;
  }
  ${media.tablet`
    flex-direction: row;
  `};

  ${media.desktop`
    width: auto;
    margin-right: 1rem;
  `};
`

const SearchFilterWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.7rem;
  width: 100%;

  ${media.tablet`
    justify-content: flex-end;
    margin-left: 1rem;
    margin-top: 0;
  `};
`

const SectionRight = styled.div`
  display: none;
  align-items: center;
  height: inherit;
  overflow: hidden;
  @media (max-width: 1200px) {
    display: none !important;
  }

  ${media.desktop`
    display: flex;
  `};

  ${media.widescreen`
    display: flex;
  `};
`
const LinkAlt = styled(RouterLink)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: inherit;
  text-decoration: none;
  &:active,
  &:focus {
    outline: 2px solid ${colors.secondary};
  }
`

const StyledFilterButton = styled(FilterButton)`
  width: 20%
  height: 3rem;
  padding-left: 10px;
  box-shadow: none;
  background-color: transparent;
  border-bottom: none;
  display: flex;
  position: absolute;
  bottom: 12px;
  right: 5px;
  align-items: center;
  &:focus {
    outline: 2px solid ${colors.secondary};
  }
    
  ${media.desktop`
    display: none;
  `};
  ${media.tablet`
    display: none;
  `};
`

const TopBar = ({
  isAuthenticated,
  hideOn = '',
  test,
  isLarge,
  name,
  location,
  userData,
  sendingRequest,
  clearKeywords,
  handleQuerySubmit,
  handleAddressChange,
  handleAddressReset,
  handleKeywordsReset,
  handleSignOutClick,
  setWelcomeVisibility,
  showSearch,
  alternate,
  id,
  keywords,
  handleKeywordsChange,
  filterButtonLabel,
  filterButtonOnClickHandler,
  filterButtonFilters,
  filterButtonVisible,
  filterButtonFilterApplied,
  setVenueWelcomeVisibility,
}) => {
  const { formatMessage } = useIntl();

  useEffect(() => {
    return () => {
      clearKeywords();
    };
  }, [clearKeywords]);

  let searchPlaceholder = messages.venuesSearchNamesPlaceholder;
  if (location?.pathname.startsWith('/teams')) {
    searchPlaceholder = messages.teamsSearchPlaceholder;
  } else if (location?.pathname.startsWith('/mapathons')) {
    searchPlaceholder = messages.mapathonsSearchPlaceholder;
  }

  return (
    <Wrapper
      $hideOn={hideOn}
      $isLarge={isLarge}
      className={alternate ? 'top-bar--alt' : null}
      role="banner"
    >
      <Container>
        <SectionLeft>
          {alternate ? (
            <LinkAlt to="/">
              <LogoAlt height="2rem" $marginBottom="0" aria-label="AXS Map logo" />
            </LinkAlt>
          ) : (
            <LinkLogo />
          )}

          {(location?.pathname === '/teams' || location?.pathname === '/mapathons') && (
            <SearchFilterWrapper>
              <SearchForm
                value={keywords}
                onFormSubmit={handleQuerySubmit}
                onValueChange={handleKeywordsChange}
                onValueReset={handleKeywordsReset}
                placeholder={formatMessage(searchPlaceholder)}
              />
              <MobileLanguageDropdown label={localStorage.getItem('language')} />
            </SearchFilterWrapper>
          )}

          {(location?.pathname === '/' || showSearch) && (
            <SearchFilterWrapper>
              <SearchForm
                value={name}
                onFormSubmit={handleQuerySubmit}
                onValueChange={handleAddressChange}
                onValueReset={handleAddressReset}
                placeholder={formatMessage(messages.venuesSearchLocationPlaceholder)}
              />
              {location?.pathname === '/' && (
                <StyledFilterButton
                  label={filterButtonLabel}
                  onClickHandler={filterButtonOnClickHandler}
                  filters={filterButtonFilters}
                  visible={filterButtonVisible}
                  filterApplied={filterButtonFilterApplied}
                />
              )}
              {location?.pathname.startsWith('/venues') ? (
                <InfoIcon
                  to={location?.pathname}
                  onClickHandler={setVenueWelcomeVisibility}
                />
              ) : (
                <InfoIcon
                  to={location?.pathname}
                  onClickHandler={setWelcomeVisibility}
                />
              )}
              <MobileLanguageDropdown label={localStorage.getItem('language')} />
            </SearchFilterWrapper>
          )}
        </SectionLeft>

        <SectionRight>
          <NavLink
            to="/"
            label={formatMessage(messages.navVenues)}
            isActive={location?.pathname === '/'}
          />
          <NavLink
            to="/mapathons"
            label={formatMessage(messages.navMapathons)}
            isActive={location?.pathname.startsWith('/mapathons')}
          />
          {/* <NavLink
            to="/teams"
            label={formatMessage(messages.navTeams)}
            isActive={location?.pathname.startsWith('/teams')}
          /> */}
          <NavLink
            to="/donate"
            label={formatMessage(messages.navDonate)}
            isActive={location?.pathname.startsWith('/donate')}
          />
          {isAuthenticated ? (
            <NavDropdown
              userData={userData}
              sendingRequest={sendingRequest}
              onSignOutClick={handleSignOutClick}
              isActive={location?.pathname === `/users/${userData.id}`}
            />
          ) : (
            <LinkButton
              to="/sign-in"
              className="sign-in-btn"
              label={formatMessage(messages.navSignIn)}
            />
          )}

          <LanguageDropdown hideOn={hideOn} label={localStorage.getItem('language') || " "} />
        </SectionRight>
      </Container>
    </Wrapper>
  );
};

TopBar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  hideOn: PropTypes.string,
  test: PropTypes.string,
  isLarge: PropTypes.bool,
  name: PropTypes.string.isRequired,
  location: PropTypes.object,
  userData: PropTypes.object.isRequired,
  sendingRequest: PropTypes.bool.isRequired,
  clearKeywords: PropTypes.func.isRequired,
  handleQuerySubmit: PropTypes.func.isRequired,
  handleAddressChange: PropTypes.func.isRequired,
  handleAddressReset: PropTypes.func.isRequired,
  handleKeywordsReset: PropTypes.func.isRequired,
  handleSignOutClick: PropTypes.func.isRequired,
  setWelcomeVisibility: PropTypes.func.isRequired,
  showSearch: PropTypes.bool,
  alternate: PropTypes.bool,
  id: PropTypes.string,
  keywords: PropTypes.string,
  handleKeywordsChange: PropTypes.func,
  filterButtonLabel: PropTypes.string,
  filterButtonOnClickHandler: PropTypes.func,
  filterButtonFilters: PropTypes.object,
  filterButtonVisible: PropTypes.bool,
  filterButtonFilterApplied: PropTypes.bool,
  setVenueWelcomeVisibility: PropTypes.func,
};

export default TopBar;