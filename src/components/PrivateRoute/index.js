import { Redirect, Route } from 'react-router-dom'
import React from 'react'
import PropTypes from 'prop-types'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      rest.authenticated ? (
        <Component {...props} />
      ) : (
        <Redirect to="/sign-in" />
      )}
  />
)

PrivateRoute.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  component: PropTypes.any
}

export default PrivateRoute
