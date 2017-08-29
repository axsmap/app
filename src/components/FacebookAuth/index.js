import PropTypes from 'prop-types'
import React from 'react'

import Spinner from '../Spinner'

class FacebookAuth extends React.Component {
  componentWillMount() {
    this.props.handleFacebookAuth(this.props.location.search)
  }

  render() {
    return <Spinner />
  }
}

FacebookAuth.propTypes = {
  handleFacebookAuth: PropTypes.func.isRequired,
  location: PropTypes.location
}

export default FacebookAuth
