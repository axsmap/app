import { intlShape } from 'react-intl'
import PropTypes from 'prop-types'
import React from 'react'

import Icon from '../Icon'

import Container from './Container'
import messages from './messages'
import Tab from './Tab'
import TabAccount from './TabAccount'
import Wrapper from './Wrapper'

import { colors } from '../../styles'

const VenueIcon = <Icon glyph="venue" size={1.2} />
const VenueActiveIcon = <Icon glyph="venue" size={1.2} color={colors.primary} />
const MapathonIcon = <Icon glyph="map" size={1.2} />
const MapathonActiveIcon = (
  <Icon glyph="map" size={1.2} color={colors.primary} />
)
const TeamIcon = <Icon glyph="badge" size={1.2} />
const TeamActiveIcon = <Icon glyph="badge" size={1.2} color={colors.primary} />
const DonateIcon = <Icon glyph="donate" size={1.2} />
const DonateActiveIcon = (
  <Icon glyph="donate" size={1.2} color={colors.primary} />
)
const SignInIcon = <Icon glyph="lock" size={1.2} />

const TabBar = (props, context) => (
  <Wrapper>
    <Container>
      <Tab
        to="/"
        activeIcon={VenueActiveIcon}
        icon={VenueIcon}
        label={context.intl.formatMessage(messages.tabVenues)}
      />
      <Tab
        to="/mapathons"
        activeIcon={MapathonActiveIcon}
        icon={MapathonIcon}
        label={context.intl.formatMessage(messages.tabMapathons)}
      />
      {/* <Tab
        to="/teams"
        activeIcon={TeamActiveIcon}
        icon={TeamIcon}
        label={context.intl.formatMessage(messages.tabTeams)}
      /> */}
      <Tab
        to="/donate"
        activeIcon={DonateActiveIcon}
        icon={DonateIcon}
        label={context.intl.formatMessage(messages.tabDonate)}
      />
      {props.isAuthenticated ? (
        <TabAccount userData={props.userData} />
      ) : (
        <Tab
          to="/sign-in"
          icon={SignInIcon}
          label={context.intl.formatMessage(messages.tabSignIn)}
        />
      )}
    </Container>
  </Wrapper>
)

TabBar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  userData: PropTypes.object.isRequired
}

TabBar.contextTypes = {
  intl: intlShape
}

export default TabBar
