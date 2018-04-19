import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { any, bool, object } from 'prop-types'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      rest.isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/sign-in',
            search: `?referrer=${props.location.pathname}`
          }}
        />
      )}
  />
)

PrivateRoute.propTypes = {
  location: object.isRequired,
  isAuthenticated: bool.isRequired,
  component: any.isRequired
}

export default PrivateRoute
