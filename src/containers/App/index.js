import { BrowserRouter, Route, Switch } from 'react-router-dom'
import React from 'react'

import asyncComponent from '../AsyncComponent'

const AsyncNotFoundPage = asyncComponent(() => import('../NotFoundPage'))
const AsyncSignInPage = asyncComponent(() => import('../SignInPage'))
const AsyncSignUpPage = asyncComponent(() => import('../SignUpPage'))

const App = () =>
  <BrowserRouter>
    <Switch>
      <Route path="/sign-in" component={AsyncSignInPage} />
      <Route path="/sign-up" component={AsyncSignUpPage} />
      <Route component={AsyncNotFoundPage} />
    </Switch>
  </BrowserRouter>

export default App
