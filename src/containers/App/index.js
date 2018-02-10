import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { createStructuredSelector } from 'reselect'
import styled from 'styled-components'

import PrivateRoute from '../PrivateRoute'
import ProgressBar from '../ProgressBar'
import Spinner from '../../components/Spinner'

import { handleAuthentication } from './actions'
import * as components from './components'
import makeSelectApp from './selector'

const Wrapper = styled.div`
  display: flex;
  min-height: inherit;
  width: 100%;
`

class App extends React.Component {
  componentWillMount() {
    this.props.handleAuthentication()
  }

  render() {
    if (this.props.isAuthenticating) {
      return <Spinner />
    }

    return (
      <Wrapper>
        <ProgressBar />

        <BrowserRouter>
          <Switch>
            {/* Authentication pages */}
            <Route path="/sign-in" component={components.SignInPage} />
            <Route
              path="/auth/facebook"
              component={components.SocialAuthPage}
            />
            <Route path="/auth/google" component={components.SocialAuthPage} />
            <Route path="/sign-up" component={components.SignUpPage} />
            <Route
              path="/forgotten-password"
              component={components.ForgottenPasswordPage}
            />
            <Route
              path="/reset-password"
              component={components.ResetPasswordPage}
            />

            {/* Venues pages */}
            <Route exact path="/" component={components.VenuesPage} />
            <Route path="/venues/:placeId" component={components.VenuePage} />

            {/* Mapathons pages */}
            <Route
              exact
              path="/mapathons"
              component={components.MapathonsPage}
            />
            <Route
              exact
              path="/mapathons/create"
              component={components.CreateMapathonPage}
            />

            {/* Teams pages */}
            <Route exact path="/teams" component={components.TeamsPage} />
            <Route
              exact
              path="/teams/create"
              component={components.CreateTeamPage}
            />
            <Route path="/teams/:teamId" component={components.TeamPage} />

            {/* Account page */}
            <PrivateRoute path="/account" component={components.AccountPage} />

            {/* Not found page */}
            <Route component={components.NotFoundPage} />
          </Switch>
        </BrowserRouter>
      </Wrapper>
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
