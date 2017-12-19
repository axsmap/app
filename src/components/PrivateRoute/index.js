import { Redirect, Route } from 'react-router-dom'
import React from 'react'
import PropTypes from 'prop-types'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      rest.isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect to="/sign-in" />
      )}
  />
)

PrivateRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  component: PropTypes.any
}

export default PrivateRoute
