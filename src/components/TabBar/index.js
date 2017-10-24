import { intlShape } from 'react-intl'
import React from 'react'

import mapathonIcon from '../../images/mapathon.svg'
import mapathonHighlightedIcon from '../../images/mapathon-highlighted.svg'
import teamIcon from '../../images/team.svg'
import teamHighlightedIcon from '../../images/team-highlighted.svg'
import venueIcon from '../../images/venue.svg'
import venueHighlightedIcon from '../../images/venue-highlighted.svg'

import Container from './Container'
import messages from './messages'
import Tab from './Tab'
import Wrapper from './Wrapper'

const TabBar = (props, context) => (
  <Wrapper>
    <Container>
      <Tab
        src={venueIcon}
        srcHighlighted={venueHighlightedIcon}
        label={context.intl.formatMessage(messages.venues)}
        to="/"
      />
      <Tab
        src={mapathonIcon}
        srcHighlighted={mapathonHighlightedIcon}
        label={context.intl.formatMessage(messages.mapathons)}
        to="/mapathons"
      />
      <Tab
        src={teamIcon}
        srcHighlighted={teamHighlightedIcon}
        label={context.intl.formatMessage(messages.teams)}
        to="/teams"
      />
    </Container>
  </Wrapper>
)

TabBar.contextTypes = {
  intl: intlShape
}

export default TabBar
