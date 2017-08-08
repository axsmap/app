import { applyMiddleware, compose, createStore, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { fork } from 'redux-saga/effects'

import appReducer from './containers/App/reducer'
import appSaga from './containers/App/saga'
import languageProviderReducer from './containers/LanguageProvider/reducer'
import signInReducer from './containers/SignInPage/reducer'
import signInSaga from './containers/SignInPage/saga'
import signUpReducer from './containers/SignUpPage/reducer'
import signUpSaga from './containers/SignUpPage/saga'

function* rootSaga() {
  yield fork(appSaga)
  yield fork(signInSaga)
  yield fork(signUpSaga)
}

const rootReducer = combineReducers({
  app: appReducer,
  language: languageProviderReducer,
  signIn: signInReducer,
  signUp: signUpReducer
})
const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(sagaMiddleware),
    typeof window === 'object' &&
    typeof window.devToolsExtension !== 'undefined'
      ? window.devToolsExtension()
      : f => f
  )
)

sagaMiddleware.run(rootSaga)

export default store
