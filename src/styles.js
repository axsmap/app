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
  gray500: '#969596',
  gray600: '#9A9B9F',
  gray700: '#6F7175',
  blue100: '#f3f3f4',
  lightestGrey: '#FAFAFA',
  lightGrey: '#EBEBEB',
  grey: '#CFCECF',
  darkGrey: '#7B7A7B',
  darkestGrey: '#363537',
  facebook: '#3b5998',
  google: '#ea4335',
  twitter: '#1DA1F2',
  youtube: '#FF0000',
  buttonColor: '#D8D8DA',
  textColor: '#42454A',
  textColorLight: '#706E6B',
  backgroundColor: '#FFFFFF',
  iconColor: '#595B60',
  borderColor: '#DEDEDF',
  white: '#fff',
  black: '#000',
  ratingCaution: '#FEE43C',
  ratingAlert: '#FF5600',
  ratingAccessible: '#4EC2FF',
  border: '#e3e1e0'
}

export const fonts = {
  primary: 'Montserrat',
  secondary: 'Catamaran',
  tertiary: 'Georgia'
}

export const fontWeight = {
  medium: '400',
  semibold: '600',
  bold: '700'
}

export const fontSize = {
  xxs: '.5rem',
  xs: '.75rem',
  sm: '.875rem',
  base: '1rem',
  lg: '1.125rem',
  xl: '1.25rem',
  xl1: '1.375rem',
  xl2: '1.5rem',
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

html {
  font-size: 16px;
  line-height: 1.5
  -webkit-text-size-adjust: 100%
}

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

    h2 {
      font-family: 'Montserrat', sans-serif !important;
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

    .mobile-hide {
      display: none;

      ${media.desktop`
        display: block;
      `}

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

    .my-2{
      margin-top: 2rem;
      margin-bottom: 2rem;

      ${media.mobile`
        margin-top: 0rem;
        margin-bottom: 0rem;
      `}
    }


    .py-1{
      padding-top: 0.9375rem;
      padding-bottom: 0.9375rem
    }

    .px-2{
      padding-left: 1.75rem !important;
      padding-right: 1.75rem !important;
    }

    .p-1{
      padding: 0.9375rem;
    }

    .text-black{
      color: ${colors.black};
    }

    .text-white{
      color: ${colors.white};
    }

    .bg-blue100{
      background-color: ${colors.blue100};
    }
    .bg-textColor{
      background-color: ${colors.textColor};
    }

    .bg-white{
      background-color: ${colors.white};
    }

    .bg-gray-300{
      background-color: ${colors.gray300};
    }

    .shadow-inner {
      -webkit-box-shadow: inset 0px 3px 6px 0px rgba(0,0,0,0.15);
      -moz-box-shadow: inset 0px 3px 6px 0px rgba(0,0,0,0.15);
      box-shadow: inset 0px 3px 6px 0px rgba(0,0,0,0.15);
    }

    .items-stretch {
      align-items: stretch;
    }

    .tertiary-btn{
      border: 2px solid;
      border-color: ${colors.primary};
      background-color: ${colors.white};
      cursor: pointer;
      color: ${colors.darkestGrey};
      text-transform: uppercase;
      font-weight: ${fontWeight.bold};

      &:hover {
        background-color: ${colors.primary};
      }
    }

    .primary-btn {
      background-color: ${colors.primary};
      color: ${colors.black};
      text-align: center;
      text-transform: uppercase;
      font-family: ${fonts.primary};
      font-size: ${fontSize.sm};
      font-weight: ${fontWeight.bold};
      border-radius: 6px;
      padding: 12px 5px 10px 5px;
    }

    .gray-btn {
      text-transform: uppercase;
      color: ${colors.white};
      background-color: ${colors.gray500};
      font-size: ${fontSize.xs};
      font-weight: ${fontWeight.bold};
      padding: 0 25px;

    }

    .is-full{
      width: 100% !important;
    }

    .no-pad{
      padding: 0 !important;
    }

    .carousel {
      width: 100%;
      display: block;
      align-items: center;
      position: relative;

      &.carousel--lg {
        .carousel__slider{
          height: 620px;

          ${media.desktop`
            height: 485px;
          `}
        }
      }

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

          ${media.desktop`
            position: absolute;
            bottom: -4rem;
            left: 25px;
          `}
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

          ${media.desktop`
            position: absolute;
            bottom: -4rem;
            right: 25px;
          `}
        }
      }

      .carousel__next-button:disabled{
        opacity: 0.5;
        cursor: text;
      }
    }

    .bg-transparent {
      background-color: transparent;
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

    .text-link{
      background-color: transparent;
      text-decoration: underline;

      &:hover {
        background-color: transparent;
      }
    }

    .box__dark{
      width: 85px;
      height: 85px;
      border-radius: 4px;
      background-color: ${colors.darkestGrey};
      padding: 10px 12px 12px 12px;
      margin: 15px auto 25px auto;
    }

    .MuiButton-root{
      padding: 20px 0!important;
      width: 100%;
      height: 100%;

      &:hover{
        width: 100%;
        height: 100%;
      }
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
