import PropTypes from 'prop-types'
import React from 'react'
import { Redirect } from 'react-router-dom'

import Spinner from '../Spinner'

class SocialAuth extends React.Component {
  componentWillMount() {
    this.props.handleSocialAuth(this.props.location)
  }

  render() {
    if (
      this.props.location.search.includes('code=') &&
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

SocialAuth.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  authFailed: PropTypes.bool.isRequired,
  handleSocialAuth: PropTypes.func.isRequired,
  location: PropTypes.location
}

export default SocialAuth
