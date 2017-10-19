import { intlShape } from 'react-intl'
import React from 'react'

import homeIcon from '../../images/home.svg'
import homeHighlightedIcon from '../../images/home-highlighted.svg'
import mapathonIcon from '../../images/mapathon.svg'
import mapathonHighlightedIcon from '../../images/mapathon-highlighted.svg'
import settingsIcon from '../../images/settings.svg'
import settingsHighlightedIcon from '../../images/settings-highlighted.svg'
import teamIcon from '../../images/team.svg'
import teamHighlightedIcon from '../../images/team-highlighted.svg'

import messages from './messages'
import Tab from './Tab'
import Wrapper from './Wrapper'

const TabBar = (props, context) =>
  <Wrapper>
    <Tab
      src={homeIcon}
      srcHighlighted={homeHighlightedIcon}
      label={context.intl.formatMessage(messages.homeTabLabel)}
      to="/"
    />
    <Tab
      src={mapathonIcon}
      srcHighlighted={mapathonHighlightedIcon}
      label={context.intl.formatMessage(messages.mapathonsTabLabel)}
      to="/mapathons"
    />
    <Tab
      src={teamIcon}
      srcHighlighted={teamHighlightedIcon}
      label={context.intl.formatMessage(messages.teamsTabLabel)}
      to="/teams"
    />
    <Tab
      src={settingsIcon}
      srcHighlighted={settingsHighlightedIcon}
      label={context.intl.formatMessage(messages.settingsTabLabel)}
      to="/settings"
    />
  </Wrapper>

TabBar.contextTypes = {
  intl: intlShape
}

export default TabBar
