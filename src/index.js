import { AppContainer } from 'react-hot-loader'
import FontFaceObserver from 'fontfaceobserver'
import { Provider } from 'react-redux'
import React from 'react'
import ReactDOM from 'react-dom'

import 'sanitize.css/sanitize.css'

import App from './containers/App'
import LanguageProvider from './containers/LanguageProvider'

import store from './store'
import { translationMessages } from './i18n'

import './styles'

const montserratObserver = new FontFaceObserver('Montserrat', {})
const catamaranObserver = new FontFaceObserver('Catamaran', {})
Promise.all([montserratObserver.load(), catamaranObserver.load()]).then(
  () => {
    document.body.classList.add('fontLoaded')
  },
  () => {
    document.body.classList.remove('fontLoaded')
  }
)

const render = messages => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <LanguageProvider messages={messages}>
          <App />
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
    .then(() =>
      Promise.all([
        import('intl/locale-data/jsonp/en.js'),
        import('intl/locale-data/jsonp/es.js')
      ])
    )
    .then(() => render(translationMessages))
    .catch(err => {
      throw err
    })
} else {
  render(translationMessages)
}

if (process.env.NODE_ENV === 'production') {
  const OfflinePluginRuntime = require('offline-plugin/runtime') // eslint-disable-line

  OfflinePluginRuntime.install({
    onUpdateReady: () => OfflinePluginRuntime.applyUpdate(),
    onUpdated: () => (window.appUpdateAvailable = true) // eslint-disable-line
  })
}
