import React from 'react'

import NavigationTab from '../NavigationTab'

import Wrapper from './Wrapper'

const Navigation = () =>
  <Wrapper>
    <NavigationTab label="Home" to="/home" />
    <NavigationTab label="Mapathons" to="/mapathons" />
    <NavigationTab label="Teams" to="/teams" />
    <NavigationTab label="Settings" to="/settings" />
  </Wrapper>

export default Navigation
