import { BrowserRouter, Route, Switch } from 'react-router-dom'
import React from 'react'

import asyncComponent from '../AsyncComponent'

const AsyncNotFoundPage = asyncComponent(() => import('../NotFoundPage'))
const AsyncSignUpPage = asyncComponent(() => import('../SignUpPage'))

const App = () =>
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={AsyncSignUpPage} />
      <Route component={AsyncNotFoundPage} />
    </Switch>
  </BrowserRouter>

export default App
