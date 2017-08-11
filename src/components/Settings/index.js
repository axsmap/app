import PropTypes from 'prop-types'
import React from 'react'
import { Redirect } from 'react-router-dom'

import Navigation from '../Navigation'

import Wrapper from '../NavigationPagesWrapper'

const Settings = props => {
  if (!props.authenticated) {
    return <Redirect to="/sign-up" />
  }
  return (
    <Wrapper>
      <h1>Settings</h1>
      <Navigation />
    </Wrapper>
  )
}

Settings.propTypes = {
  authenticated: PropTypes.bool.isRequired
}

export default Settings
