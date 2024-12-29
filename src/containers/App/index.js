import { bool, func, string } from 'prop-types'
import React from 'react'
import ReactGA from 'react-ga'
import { intlShape } from 'react-intl'
import { connect } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { createStructuredSelector } from 'reselect'
import styled from 'styled-components'

import Notification from '../Notification'
import PrivateRoute from '../PrivateRoute'
import ProgressBar from '../ProgressBar'
import notificationSelector from '../Notification/selector'
import Spinner from '../../components/Spinner'

import { getProfile } from './actions'
import * as components from './components'
import appSelector from './selector'

const Wrapper = styled.div`
  display: flex;
  min-height: inherit;
  width: 100%;
`

class App extends React.Component {
  static propTypes = {
    isAuthenticating: bool.isRequired,
    notificationMessage: string,
    getProfile: func.isRequired
  }

  static contextTypes = {
    intl: intlShape
  }

  UNSAFE_componentWillMount() {
    ReactGA.initialize('UA-12719646-3')
    this.props.getProfile()
  }

  render() {
    if (this.props.isAuthenticating) {
      return <Spinner />
    }

    return (
      <Wrapper>
        <ProgressBar />

        {this.props.notificationMessage ? <Notification /> : null}

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

            <PrivateRoute
              path="/venues/:placeId/review"
              component={components.CreateReviewPage}
            />

            <Route
              path="/venues/:placeId/thank-you"
              component={components.ThankYouReviewPage}
            />

            <Route path="/venues/:placeId" component={components.VenuePage} />

            {/* Mapathons pages */}
            <Route
              exact
              path="/mapathons"
              component={components.MapathonsPage}
            />
            <PrivateRoute
              exact
              path="/mapathons/create"
              component={components.CreateMapathonPage}
            />
            <Route
              path="/mapathons/:mapathonId"
              component={components.MapathonPage}
            />

            {/* Teams pages */}
            <Route exact path="/teams" component={components.TeamsPage} />
            <PrivateRoute
              exact
              path="/teams/create"
              component={components.CreateTeamPage}
            />
            <Route path="/teams/:teamId" component={components.TeamPage} />

            {/* User page */}
            <Route path="/users/:userId" component={components.UserPage} />

            {/* Contact page */}
            <Route exact path="/contact" component={components.ContactPage} />

            {/* FAQ page */}
            <Route exact path="/faq" component={components.FaqPage} />

            {/* Privacy Policy page */}
            <Route
              exact
              path="/privacy-policy"
              component={components.PrivacyPolicyPage}
            />

            {/* Terms & Conditions page */}
            <Route
              exact
              path="/terms-conditions"
              component={components.TacPage}
            />

            {/* Donate */}
            <Route exact path="/donate" component={components.DonatePage} />

            {/* Not found page */}
            <Route component={components.NotFoundPage} />
          </Switch>
        </BrowserRouter>
      </Wrapper>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  isAuthenticating: appSelector('isAuthenticating'),
  notificationMessage: notificationSelector('message')
})

const mapDispatchToProps = dispatch => ({
  getProfile: () => {
    dispatch(getProfile())
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
