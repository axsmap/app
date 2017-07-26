import { applyMiddleware, compose, createStore, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { fork } from 'redux-saga/effects'

import languageProviderReducer from './containers/LanguageProvider/reducer'
import signUpReducer from './containers/SignUpPage/reducer'
import signUpSagas from './containers/SignUpPage/sagas'

function* rootSaga() {
  yield fork(signUpSagas)
}

const rootReducer = combineReducers({
  language: languageProviderReducer,
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
