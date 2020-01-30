import { bool, func, object, string } from 'prop-types'
import React from 'react'
import { intlShape } from 'react-intl'
import styled from 'styled-components'

import { colors, media } from '../../styles'

import NavDropdown from './NavDropdown'
import LinkButton from './LinkButton'
import LinkIcon from './LinkIcon'
import LinkLogo from './LinkLogo'
import InfoIcon from './InfoIcon'
import messages from './messages'
import NavLink from './NavLink'
import SearchForm from './SearchForm'

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  z-index: 30;

  display: ${props => (props.hideOn.includes('phone') ? 'none' : 'flex')};

  align-items: center;
  justify-content: center;

  box-shadow: 0 1px 0 0 ${colors.grey};
  height: ${props => (props.isLarge ? '8rem' : '4rem')};
  width: 100%;

  background-color: white;

  ${media.tablet`
    display: ${props => (props.hideOn.includes('tablet') ? 'none' : 'flex')};
    height: 4rem;
  `};

  ${media.desktop`
    display: ${props => (props.hideOn.includes('desktop') ? 'none' : 'flex')};
  `};

  ${media.widescreen`
    display: ${props =>
      props.hideOn.includes('widescreen') ? 'none' : 'flex'};
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

  // width: 100%;
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

  ${media.desktop`
    display: flex;
  `};
`

export default class TopBar extends React.Component {
  static propTypes = {
    isAuthenticated: bool.isRequired,
    hideOn: string,
    isLarge: bool,
    address: string.isRequired,
    location: object.isRequired,
    userData: object.isRequired,
    sendingRequest: bool.isRequired,
    clearKeywords: func.isRequired,
    handleQuerySubmit: func.isRequired,
    handleAddressChange: func.isRequired,
    handleAddressReset: func.isRequired,
    handleSignOutClick: func.isRequired,
    setWelcomeVisibility: func.isRequired,
    showSearch: bool,
    alternate: bool,
    id: string
  }

  static contextTypes = {
    intl: intlShape
  }

  static defaultProps = {
    hideOn: ''
  }

  componentWillUnmount() {
    this.props.clearKeywords()
  }

  render() {
    const { formatMessage } = this.context.intl

    /* eslint-disable no-unused-vars */
    let searchPlaceholder = messages.venuesSearchNamesPlaceholder
    /* eslint-disable no-unused-vars */
    if (this.props.location.pathname.startsWith('/teams')) {
      searchPlaceholder = messages.teamsSearchPlaceholder
    } else if (this.props.location.pathname.startsWith('/mapathons')) {
      searchPlaceholder = messages.mapathonsSearchPlaceholder
    }

    return (
      <Wrapper
        hideOn={this.props.hideOn}
        isLarge={this.props.isLarge}
        className={this.props.alternate ? 'top-bar--alt' : null}
      >
        <Container>
          <SectionLeft>
            <LinkLogo />
            <LinkIcon />
            {this.props.location.pathname === '/' || this.props.showSearch ? (
              <SearchFilterWrapper>
                <SearchForm
                  value={this.props.address}
                  onFormSubmit={this.props.handleQuerySubmit}
                  onValueChange={this.props.handleAddressChange}
                  onValueReset={this.props.handleAddressReset}
                  placeholder={formatMessage(
                    messages.venuesSearchLocationPlaceholder
                  )}
                />
                <InfoIcon onClickHandler={this.props.setWelcomeVisibility} />
              </SearchFilterWrapper>
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
            <NavLink
              isAbsolute
              to="https://www.paypal.me/axslab"
              label={formatMessage(messages.navDonate)}
              isActive={false}
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
                className="sign-in-btn"
                label={formatMessage(messages.navSignIn)}
              />
            )}
          </SectionRight>
        </Container>
      </Wrapper>
    )
  }
}
