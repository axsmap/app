/* eslint no-unused-expressions: off */

import { injectGlobal } from 'styled-components'

export default injectGlobal`
  body.fontLoaded {
    a,
    button,
    label,
    p {
      font-family: 'Montserrat', 'Helvetica Neue', Helvetica, Arial, sans-serif;
      line-height: 1.5em;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      font-family: 'Rajdhani', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }
  }

  #root {
    align-items: center;
    flex-direction: column;
    justify-content: center;

    display: flex;
  }
`

export const colors = {
  primary: '#FEE000',
  secondary: '#0077FE',
  alert: '#FE003B',
  lightestGrey: '#FAFAFA',
  lightGrey: '#DDDDDD',
  grey: '#888888',
  darkGrey: '#666666',
  darkestGrey: '#444444'
}
