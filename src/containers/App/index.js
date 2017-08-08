import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Loadable from 'react-loadable'
import PropTypes from 'prop-types'
import React from 'react'

import Spinner from '../../components/Spinner'

import { handleAuthentication } from './actions'
import makeSelectApp from './selector'

const LoadableNotFoundPage = Loadable({
  loader: () => import('../NotFoundPage'),
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
          <Route path="/sign-in" component={LoadableSignInPage} />
          <Route path="/sign-up" component={LoadableSignUpPage} />
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
