/* eslint no-unused-expressions: off */

import { injectGlobal } from 'styled-components'

injectGlobal`
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
`
