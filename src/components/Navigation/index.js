import { intlShape } from 'react-intl'
import React from 'react'

import homeIcon from '../../images/home.svg'
import homeHighlightedIcon from '../../images/home-highlighted.svg'
import mapathonIcon from '../../images/mapathon.svg'
import mapathonHighlightedIcon from '../../images/mapathon-highlighted.svg'
import teamIcon from '../../images/team.svg'
import teamHighlightedIcon from '../../images/team-highlighted.svg'
import settingsIcon from '../../images/settings.svg'
import settingsHighlightedIcon from '../../images/settings-highlighted.svg'

import NavigationTab from '../NavigationTab'

import messages from './messages'
import Wrapper from './Wrapper'

const Navigation = (props, context) =>
  <Wrapper>
    <NavigationTab
      src={homeIcon}
      srcHighlighted={homeHighlightedIcon}
      label={context.intl.formatMessage(messages.homeTabLabel)}
      to="/"
    />
    <NavigationTab
      src={mapathonIcon}
      srcHighlighted={mapathonHighlightedIcon}
      label={context.intl.formatMessage(messages.mapathonsTabLabel)}
      to="/mapathons"
    />
    <NavigationTab
      src={teamIcon}
      srcHighlighted={teamHighlightedIcon}
      label={context.intl.formatMessage(messages.teamsTabLabel)}
      to="/teams"
    />
    <NavigationTab
      src={settingsIcon}
      srcHighlighted={settingsHighlightedIcon}
      label={context.intl.formatMessage(messages.settingsTabLabel)}
      to="/settings"
    />
  </Wrapper>

Navigation.contextTypes = {
  intl: intlShape
}

export default Navigation
