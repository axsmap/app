/* eslint no-param-reassign: off, no-unused-expressions: off */

import { css, injectGlobal } from 'styled-components'

export const colors = {
  primary: '#FEE000',
  secondary: '#00A1E4',
  success: '#0CCE6B',
  warning: '#F78636',
  alert: '#EF2D56',
  lightestGrey: '#FAFAFA',
  lightGrey: '#EBEBEB',
  grey: '#CFCECF',
  darkGrey: '#7B7A7B',
  darkestGrey: '#42454A',
  facebook: '#3b5998',
  google: '#ea4335',
  twitter: '#1DA1F2',
  youtube: '#FF0000',
  buttonColor: '#D8D8DA',
  textColor: '#42454A',
  backgroundColor: '#FFFFFF',
  iconColor: '#595B60',
  borderColor: '#DEDEDF',
  ratingCaution: '',
  ratingAlert: ''
}

export const fonts = {
  primary: 'Montserrat',
  secondary: 'Catamaran'
}

export const fontWeight = {
  semibold: '600',
  bold: '700'
}

export const fontSize = {
  xs: '.75rem',
  sm: '.875rem',
  base: '1rem',
  lg: '1.125rem',
  xl: '1.25rem'
}

export const sizes = {
  widescreen: 1200,
  desktop: 992,
  tablet: 768,
  mobile: 360
}

export const media = Object.keys(sizes).reduce((accumulator, label) => {
  const emSize = sizes[label] / 16
  accumulator[label] = (...args) => css`
    @media (min-width: ${emSize}em) {
      ${css(...args)};
    }
  `
  return accumulator
}, {})

export default injectGlobal`
  body.fontLoaded {
    a,
    button,
    input,
    label,
    li,
    ol,
    option,
    p,
    select,
    textarea {
      font-family: 'Montserrat', 'Helvetica Neue', Helvetica, Arial, sans-serif;
      line-height: 1.5em;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      font-family: 'Catamaran', 'Helvetica Neue', Helvetica, Arial, sans-serif;
      font-weight: bold;
    }
  }

  #root {
    align-items: center;
    flex-direction: column;
    justify-content: center;

    display: flex;
  }
`
