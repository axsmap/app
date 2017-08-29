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
      !this.props.authFailed
    ) {
      return <Spinner />
    }
    return <Redirect to="/sign-in" />
  }
}

FacebookAuth.propTypes = {
  authFailed: PropTypes.bool.isRequired,
  handleFacebookAuth: PropTypes.func.isRequired,
  location: PropTypes.location
}

export default FacebookAuth
