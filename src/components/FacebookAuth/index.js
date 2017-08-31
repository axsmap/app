import PropTypes from 'prop-types'
import React from 'react'
import { Redirect } from 'react-router-dom'

import Spinner from '../Spinner'

class FacebookAuth extends React.Component {
  componentWillMount() {
    this.props.handleFacebookAuth(this.props.location.hash)
  }

  render() {
    if (
      this.props.location.hash.indexOf('access_token=') >= 0 &&
      !this.props.authFailed &&
      !this.props.authenticated
    ) {
      return <Spinner />
    } else if (this.props.authenticated) {
      return <Redirect to="/" />
    }
    return <Redirect to="/sign-in" />
  }
}

FacebookAuth.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  authFailed: PropTypes.bool.isRequired,
  handleFacebookAuth: PropTypes.func.isRequired,
  location: PropTypes.location
}

export default FacebookAuth
