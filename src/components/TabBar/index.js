import { intlShape } from 'react-intl'
import PropTypes from 'prop-types'
import React from 'react'

import mapathonIcon from '../../images/mapathon.svg'
import mapathonHighlightedIcon from '../../images/mapathon-highlighted.svg'
import signInIcon from '../../images/sign-in.svg'
import teamIcon from '../../images/team.svg'
import teamHighlightedIcon from '../../images/team-highlighted.svg'
import venueIcon from '../../images/venue.svg'
import venueHighlightedIcon from '../../images/venue-highlighted.svg'

import Container from './Container'
import messages from './messages'
import Tab from './Tab'
import TabAccount from './TabAccount'
import Wrapper from './Wrapper'

const TabBar = (props, context) => (
  <Wrapper>
    <Container>
      <Tab
        src={venueIcon}
        srcHighlighted={venueHighlightedIcon}
        label={context.intl.formatMessage(messages.tabVenues)}
        to="/"
      />
      <Tab
        src={mapathonIcon}
        srcHighlighted={mapathonHighlightedIcon}
        label={context.intl.formatMessage(messages.tabMapathons)}
        to="/mapathons"
      />
      <Tab
        src={teamIcon}
        srcHighlighted={teamHighlightedIcon}
        label={context.intl.formatMessage(messages.tabTeams)}
        to="/teams"
      />
      {props.authenticated ? (
        <TabAccount avatarUrl={props.userData.avatar} />
      ) : (
        <Tab
          src={signInIcon}
          label={context.intl.formatMessage(messages.tabSignIn)}
          to="/sign-in"
        />
      )}
    </Container>
  </Wrapper>
)

TabBar.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  userData: PropTypes.shape({
    id: PropTypes.string,
    avatar: PropTypes.string,
    firstName: PropTypes.string
  }).isRequired
}

TabBar.contextTypes = {
  intl: intlShape
}

export default TabBar
