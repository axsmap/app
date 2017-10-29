import PropTypes from 'prop-types'
import React from 'react'
import { Redirect } from 'react-router-dom'

import TabBar from '../../containers/TabBar'
import Wrapper from '../Wrapper'

const Account = props => {
  if (!props.authenticated) {
    return <Redirect to="/sign-in" />
  }
  return (
    <Wrapper>
      <h1>Account</h1>
      <TabBar />
    </Wrapper>
  )
}

Account.propTypes = {
  authenticated: PropTypes.bool.isRequired
}

export default Account
