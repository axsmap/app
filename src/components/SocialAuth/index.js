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
      !this.props.isAuthenticated
    ) {
      return <Spinner />
    } else if (this.props.isAuthenticated) {
      return <Redirect to="/" />
    }
    return <Redirect to="/sign-in" />
  }
}

SocialAuth.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  authFailed: PropTypes.bool.isRequired,
  handleSocialAuth: PropTypes.func.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired
  })
}

export default SocialAuth
