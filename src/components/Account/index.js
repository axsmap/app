import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { Redirect } from 'react-router-dom'

import TabBar from '../../containers/TabBar'
import TopBar from '../../containers/TopBar'
import Wrapper from '../Wrapper'

class Account extends PureComponent {
  componentDidMount() {
    this.props.setAccountUrl()
  }

  render() {
    if (!this.props.authenticated) {
      return <Redirect to="/sign-in" />
    }

    return (
      <Wrapper>
        <TopBar />

        <h1>Account</h1>

        <TabBar />
      </Wrapper>
    )
  }
}

Account.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  setAccountUrl: PropTypes.func.isRequired
}

export default Account
