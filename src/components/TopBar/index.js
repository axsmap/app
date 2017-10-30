import { intlShape } from 'react-intl'
import PropTypes from 'prop-types'
import React from 'react'
import { upperFirst } from 'lodash'

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

const venueTypes = [
  'everything',
  'restaurants',
  'nightlife',
  'shopping',
  'beautyAndSpas',
  'artsAndEntertainment',
  'hotelsAndTravel',
  'healthAndMedical',
  'publicService',
  'education',
  'fitness',
  'financialServices',
  'massMedia',
  'religiousOrganization',
  'museums'
]

const TopBar = (props, context) => {
  const options = venueTypes.map(venueType => ({
    text: context.intl.formatMessage(
      messages[`filters${upperFirst(venueType)}`]
    ),
    value: venueType
  }))

  return (
    <Wrapper hideOn={props.hideOn}>
      <Container>
        <SectionLeft>
          <LinkLogo />

          <LinkIcon />

          <SearchForm
            value={props.query.keyword}
            onFormSubmit={props.onVenuesQuerySubmit}
            onValueChange={props.onQueryChange}
          />

          <FilterButton />

          <FilterSelectBox
            value={props.query.type}
            options={options}
            onValueChange={props.onQueryChange}
          />
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

          {props.authenticated ? (
            <NavDropdown
              avatarUrl={props.userData.avatar}
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
}

TopBar.propTypes = {
  hideOn: PropTypes.string,
  query: PropTypes.shape({
    keyword: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
  }).isRequired,
  currentUrl: PropTypes.string.isRequired,
  authenticated: PropTypes.bool.isRequired,
  userData: PropTypes.shape({
    avatar: PropTypes.string
  }).isRequired,
  onVenuesQuerySubmit: PropTypes.func.isRequired,
  onQueryChange: PropTypes.func.isRequired
}

TopBar.defaultProps = {
  hideOn: ''
}

TopBar.contextTypes = {
  intl: intlShape
}

export default TopBar
