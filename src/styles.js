/* eslint no-param-reassign: off, no-unused-expressions: off */

import { css, injectGlobal } from 'styled-components'

export const colors = {
  primary: '#FEE000',
  secondary: '#00A1E4',
  success: '#0CCE6B',
  warning: '#F78636',
  alert: '#EF2D56',
  gray100: '#F7F7F7',
  gray300: '#EBECEC',
  gray600: '#9A9B9F',
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
  white: '#fff',
  black: '#000',
  ratingCaution: '#FEE43C',
  ratingAlert: '#FF5600',
  ratingAccessible: '#4EC2FF'
}

export const fonts = {
  primary: 'Montserrat',
  secondary: 'Catamaran',
  tertiary: 'Georgia'
}

export const fontWeight = {
  medium: '500',
  semibold: '600',
  bold: '700'
}

export const fontSize = {
  xs: '.8572rem',
  sm: '.929rem',
  base: '1rem',
  lg: '1.125rem',
  xl: '1.25rem',
  xl1: '1.375rem',
  xxl: '1.69rem',
  mega: '4.375rem'
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

    h1{
      font-weight: bold;
      color: black;
      font-size: ${fontSize.lg} !Important;
      font-family: ${fonts.primary} !important;
      margin: 0;

      &.darker{
        background-color: ${colors.black};
        color: ${colors.white};
      }
    }
  }

  #root {
    align-items: center;
    flex-direction: column;
    justify-content: center;

    display: flex;

    .fill-current{
      fill: currentColor;
    }

    address {
      font-family: ${fonts.primary} !important;
      color: ${colors.darkestGrey};
      font-size: ${fontSize.sm};
      text-align: left;
      margin-top:0;
      font-style:normal;
    }

    address a{
      font-family: ${fonts.primary} !important;
      color: ${colors.darkestGrey} !important;
      font-size: ${fontSize.sm};
      text-align: left;
      margin-top:0;
      font-style:normal;
      font-weight: normal !important;
    }

    .text-black{
      color: ${colors.black};
    }

    .bg-white{
      background-color: ${colors.white};
    }

    .items-stretch {
      align-items: stretch;
    }

    .carousel {
      width: 100%;
      display: block;
      align-items: center;
      position: relative;

      .carousel__back-button{
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: ${colors.gray600};
        color: ${colors.white};
        left:15px;
        top: 25%;
        position: absolute;

        i{
          position: relative;
          padding-top: 6px;
          text-align: center;
          display: block;
          padding-right: 2px;
        }

        &.btn-fixed-bottom{
          bottom: 2rem;
          left:15px;
          position: fixed;
          z-index: 1;
          top: auto;
        }
      }

      .carousel__back-button:disabled{
        opacity: 0.5;
        cursor: text;
      }

      .carousel__next-button{
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: ${colors.gray600};
        color: ${colors.white};
        right: 15px;
        top: 25%;
        position: absolute;

        i{
          position: relative;
          padding-top: 6px;
          text-align: center;
          display: block;
          padding-left: 2px;
        }

        &.btn-fixed-bottom{
          bottom: 2rem;
          position: fixed;
          z-index: 1;
          top: auto;
        }
      }

      .carousel__next-button:disabled{
        opacity: 0.5;
        cursor: text;
      }
    }

    ._hide-visual {
      border: 0 !important;
      clip: rect(0 0 0 0) !important;
      height: 1px !important;
      margin: -1px !important;
      overflow: hidden !important;
      padding: 0 !important;
      position: absolute !important;
      width: 1px !important;
      white-space: nowrap !important;
    }

    .collapse:not(.show){
      display: none;
    }

    .box__dark{
      width: 85px;
      height: 85px;
      border-radius: 4px;
      background-color: ${colors.darkestGrey};
      padding: 10px 12px 12px 12px;
      margin: 15px auto 25px auto;
    }

    .score__alert{
      background-color: ${colors.ratingAlert};
      color: ${colors.black};
    }

    .score_caution{
      background-color: ${colors.ratingCaution};
      color: ${colors.black};
    }

    .score_accessible{
      background-color: ${colors.ratingAccessible};
      color: ${colors.black};
    }

    .is-active-score{
      border: 1px solid black;

      &:after{
        position: absolute;
        content: "";
        border-color: transparent;
        border-style: solid;
        padding: 0.4rem 0;
        bottom: -29px;
        border-width: 18px 18.5px 0;
        border-top-color: #000;
        left: 35%;

        ${media.desktop`
          left: 45%;
        `}
      }
    }


  }
`
