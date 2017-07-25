import { AppContainer } from 'react-hot-loader'
import { BrowserRouter } from 'react-router-dom'
import FontFaceObserver from 'fontfaceobserver'
import { Provider } from 'react-redux'
import React from 'react'
import ReactDOM from 'react-dom'

import 'sanitize.css/sanitize.css'

import App from './containers/App'
import configureStore from './store'
import LanguageProvider from './containers/LanguageProvider'
import registerServiceWorker from './registerServiceWorker'
import { translationMessages } from './i18n'

import './globalStyles'

const montserratObserver = new FontFaceObserver('Montserrat', {})
const rajdhaniObserver = new FontFaceObserver('Rajdhani', {})
Promise.all([montserratObserver.load(), rajdhaniObserver.load()]).then(
  () => {
    document.body.classList.add('fontLoaded')
  },
  () => {
    document.body.classList.remove('fontLoaded')
  }
)

const initialState = {}
const store = configureStore(initialState)

const render = messages => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <LanguageProvider messages={messages}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </LanguageProvider>
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  )
}

if (module.hot) {
  module.hot.accept('./i18n', () => {
    render(translationMessages)
  })
}

if (!window.Intl) {
  new Promise(resolve => {
    resolve(import('intl'))
  })
    .then(() => Promise.all([import('intl/locale-data/jsonp/en.js'), import('intl/locale-data/jsonp/es.js')]))
    .then(() => render(translationMessages))
    .catch(err => {
      throw err
    })
} else {
  render(translationMessages)
}

registerServiceWorker()
