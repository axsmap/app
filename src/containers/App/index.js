import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Loadable from 'react-loadable'
import PropTypes from 'prop-types'
import React from 'react'

import Spinner from '../../components/Spinner'

import { handleAuthentication } from './actions'
import makeSelectApp from './selector'

const LoadableForgottenPasswordPage = Loadable({
  loader: () => import('../ForgottenPasswordPage'),
  loading: Spinner
})
const LoadableMapathonsPage = Loadable({
  loader: () => import('../MapathonsPage'),
  loading: Spinner
})
const LoadableNotFoundPage = Loadable({
  loader: () => import('../NotFoundPage'),
  loading: Spinner
})
const LoadableResetPasswordPage = Loadable({
  loader: () => import('../ResetPasswordPage'),
  loading: Spinner
})
const LoadableSettingsPage = Loadable({
  loader: () => import('../SettingsPage'),
  loading: Spinner
})
const LoadableSignInPage = Loadable({
  loader: () => import('../SignInPage'),
  loading: Spinner
})
const LoadableSignUpPage = Loadable({
  loader: () => import('../SignUpPage'),
  loading: Spinner
})
const LoadableSocialAuthPage = Loadable({
  loader: () => import('../SocialAuthPage'),
  loading: Spinner
})
const LoadableTeamsPage = Loadable({
  loader: () => import('../TeamsPage'),
  loading: Spinner
})
const LoadableVenuesPage = Loadable({
  loader: () => import('../VenuesPage'),
  loading: Spinner
})

class App extends React.Component {
  componentWillMount() {
    this.props.handleAuthentication()
  }

  render() {
    if (this.props.isAuthenticating) {
      return <Spinner />
    }

    return (
      <BrowserRouter>
        <Switch>
          {/* Authentication pages */}
          <Route path="/sign-in" component={LoadableSignInPage} />
          <Route path="/auth/facebook" component={LoadableSocialAuthPage} />
          <Route path="/auth/google" component={LoadableSocialAuthPage} />
          <Route path="/sign-up" component={LoadableSignUpPage} />
          <Route
            path="/forgotten-password"
            component={LoadableForgottenPasswordPage}
          />
          <Route path="/reset-password" component={LoadableResetPasswordPage} />

          {/* Venues pages */}
          <Route exact path="/" component={LoadableVenuesPage} />

          {/* Mapathons pages */}
          <Route path="/mapathons" component={LoadableMapathonsPage} />

          {/* Teams pages */}
          <Route path="/teams" component={LoadableTeamsPage} />

          {/* Settings pages */}
          <Route path="/settings" component={LoadableSettingsPage} />

          {/* Not found page */}
          <Route component={LoadableNotFoundPage} />
        </Switch>
      </BrowserRouter>
    )
  }
}

App.propTypes = {
  isAuthenticating: PropTypes.bool.isRequired,
  handleAuthentication: PropTypes.func.isRequired
}

const mapStateToProps = createStructuredSelector({
  isAuthenticating: makeSelectApp('isAuthenticating')
})

const mapDispatchToProps = dispatch => ({
  handleAuthentication: () => {
    dispatch(handleAuthentication())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
