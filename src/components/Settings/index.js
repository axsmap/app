import PropTypes from 'prop-types'
import React from 'react'
import { Redirect } from 'react-router-dom'

import TabBar from '../TabBar'
import Wrapper from '../Wrapper'

const Settings = props => {
  if (!props.authenticated) {
    return <Redirect to="/sign-in" />
  }
  return (
    <Wrapper>
      <h1>Settings</h1>
      <TabBar />
    </Wrapper>
  )
}

Settings.propTypes = {
  authenticated: PropTypes.bool.isRequired
}

export default Settings
