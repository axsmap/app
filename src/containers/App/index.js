import { BrowserRouter, Route, Switch } from 'react-router-dom'
import React from 'react'

import NotFoundPage from '../NotFoundPage'
import SignUpPage from '../SignUpPage'

const App = () =>
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={SignUpPage} />
      <Route component={NotFoundPage} />
    </Switch>
  </BrowserRouter>

export default App
