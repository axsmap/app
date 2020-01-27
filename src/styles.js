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
  gray650: '#6b6b6b',
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
  xxxs: '.5625rem',
  xxs: '.6875rem',
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

    .text-xl{
      font-size: ${fontSize.xl};
    }

    .text-xxs{
      font-size: ${fontSize.xxs} !important;
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

    .select--small{
      width: 150px;
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

    .bg-accessible{
      background-color: ${colors.ratingAccessible};
    }

    .bg-caution{
      background-color: ${colors.ratingCaution};
    }

    .bg-alert{
      background-color: ${colors.ratingAlert};
    }

    .shadow-inner {
      -webkit-box-shadow: inset 0px 3px 6px 0px rgba(0,0,0,0.15);
      -moz-box-shadow: inset 0px 3px 6px 0px rgba(0,0,0,0.15);
      box-shadow: inset 0px 3px 6px 0px rgba(0,0,0,0.15);
    }

    .shadow-outer {
      -webkit-box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.25);
      -moz-box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.25);
      box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.25);
    }

    .items-stretch {
      align-items: stretch;
    }

    .mx-auto	{
      margin-right: auto;
      margin-left: auto;
    }

    .btn-clear{
      background: transparent;
      height: auto;
      padding: 0;
    }

    .btn-score_alert{
      width: 100%;
      height: 100%;

      &:hover {
        background-color: rgba(0, 0, 0, 0.08);
        text-decoration: none;
        transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
        -webkit-appearance: none;
        -webkit-tap-highlight-color: transparent;
        width: 100%;
        height: 100%;
      }
    }

    .btn-score_caution{
      width: 100%;
      height: 100%;

      &:hover {
        background-color: rgba(0, 0, 0, 0.08);
        text-decoration: none;
        transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
        -webkit-appearance: none;
        -webkit-tap-highlight-color: transparent;
        width: 100%;
        height: 100%;
      }
    }

    .btn-score_accessible{
      width: 100%;
      height: 100%;

      &:hover {
        background-color: rgba(0, 0, 0, 0.08);
        text-decoration: none;
        transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
        -webkit-appearance: none;
        -webkit-tap-highlight-color: transparent;
        width: 100%;
        height: 100%;
      }
    }

    .btn-unstyled{
      display: block;
      padding: 0;
      height: auto;
      border-radius: 0;
    }

    .btn--medium{
      width: 150px;
    }

    .btn--round--small{
      border-radius: 50%;
      width: 32px;
      height: 32px;
      overflow: hidden;
      padding: 0 !important;
    }

    .btn-secondary{
      font-weight: ${fontWeight.medium};
      font-family: ${fonts.primary};
      font-size: ${fontSize.sm};
      color: ${colors.gray700};
      background-color: ${colors.white};
      border: 1px solid #DEDEDF;
      text-align: center;
      padding: 7px;
      min-width: 50%;
      box-shadow: inset 0px 0px 0px 1px #DEDEDF;
      border-radius: 9999px!important;
      cursor: pointer;

      &:hover{
        background-color: ${colors.gray700};
        color: ${colors.white};
      }

      &.is-active{
        background-color: ${colors.gray700};
        color: ${colors.white};
      }
    }

    .btn-group-sm .btn-secondary{
      min-width: 33.333%
      width: 33.333%;
      padding: 7px 5px;
      font-size:  ${fontSize.xs};

      &:first-child{
        border-radius: 9999px!important;
        border-top-right-radius: 0 !important;
        border-bottom-right-radius: 0 !important;
        border-right: none;
      }
      &:nth-child(2n) {
        border-radius: 0 !important;
      }
      &:last-child{
        border-radius: 9999px!important;
        border-top-left-radius: 0 !important;
        border-bottom-left-radius: 0 !important;
        border-left: none;
      }
    }

    .btn-group-lg .btn-secondary{
      width: 100%;
    }

    .tertiary-btn{
      border: 2px solid;
      border-color: ${colors.primary};
      background-color: ${colors.white};
      cursor: pointer;
      color: ${colors.darkestGrey};
      text-transform: uppercase;
      font-weight: ${fontWeight.bold};
      cursor: pointer;

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
      cursor: pointer;

      &:hover{
        border: 2px solid #FFE000;
        background-color: ${colors.white};
      }
    }

    .primary-btn__sm {
      background-color: ${colors.primary};
      color: ${colors.black};
      text-align: center;
      text-transform: uppercase;
      font-family: ${fonts.primary};
      font-size: ${fontSize.xxs};
      font-weight: ${fontWeight.bold};
      border-radius: 6px;
      padding: 12px 5px 10px 5px;
      width: 140px;
      line-height: 1;
      height: 32px;
      cursor: pointer;
    }

    .primary-btn--alt{
      border: 2px solid ${colors.primary};
      background: transparent;
      color: ${colors.black};
      text-align: center;
      text-transform: uppercase;
      font-family: ${fonts.primary};
      font-weight: ${fontWeight.bold};
      border-radius: 6px;
      padding: 12px 5px 10px 5px;
      width: 325px;
      line-height: 1;
      height: 40px;
      font-size: ${fontSize.xxs};
      display: block;
      position: relative;
      cursor: pointer;

      &:hover {
        background-color: ${colors.primary};
        color: ${colors.black};
      }
    }

    .primary-btn--alt__sm {
      border: 2px solid ${colors.primary};
      background: transparent;
      color: ${colors.black};
      text-align: center;
      text-transform: uppercase;
      font-family: ${fonts.primary};
      font-weight: ${fontWeight.bold};
      border-radius: 6px;
      padding: 12px 5px 10px 5px;
      width: 140px;
      line-height: 1;
      height: 32px;
      font-size: ${fontSize.xxs};
      cursor: pointer;

      &:hover {
        background-color: ${colors.primary};
        color: ${colors.black};
      }
    }
    .gray650-btn {
      text-transform: uppercase;
      color: ${colors.white};
      background-color: ${colors.gray650};
      font-size: ${fontSize.xs};
      font-weight: ${fontWeight.bold};
      padding: 0 25px;
      cursor: pointer;

      &:hover{
        background-color: ${colors.gray500};
      }
    }

    .gray-btn {
      text-transform: uppercase;
      color: ${colors.white};
      background-color: ${colors.gray500};
      font-size: ${fontSize.xs};
      font-weight: ${fontWeight.bold};
      padding: 0 25px;
      cursor: pointer;

      &:hover{
        background-color: ${colors.gray650};
      }
    }

    .is-full{
      width: 100% !important;
    }

    .no-pad{
      padding: 0 !important;
    }

    .mt-0{
      margin-top: 0;
    }

    .collapse:not(.show) {
      display: none;
    }
    
   .entry-score__details{
     display: block;
     position: relative;

     .arrow {
      position: absolute;
      display: block;
      width: 0.8rem;
      height: 0.4rem;
      top: -11px;
      left: 12px;

      ${media.desktop`
        top: -19px;
        left: 0;
      `}
    }
    
    .arrow::before {
      position: absolute;
      content: "";
      border-color: transparent;
      border-style: solid;
      padding: 0.4rem 0
      top: 0;
      border-width: 9px 9.5px 0;
      border-top-color: #000;
      bottom: 0;
    }

    .entry-score__details__content{
      padding-top: 15px;

      ${media.desktop`
        padding-top: 5px;
      `}
    }

   }

   .restroom-score__details{
    .arrow {
      position: absolute;
      display: block;
      width: 0.8rem;
      height: 0.4rem;
      right: 17%;
      top: 0;
    }
    
    .arrow::before {
      position: absolute;
      content: "";
      border-color: transparent;
      border-style: solid;
      padding: 0.4rem 0
      top: 0;
      border-width: 9px 9.5px 0;
      border-top-color: #000;
      bottom: 0;
    }

    .restroom-score__details__content{
      padding-top: 15px;

      ${media.desktop`
        padding-top: 5px;
      `}
    }
   }

    .collapse{
      font-size: ${fontSize.xxs};
      font-weight: ${fontWeight.medium};
      font-family: ${fonts.primary};
      text-align: center;
      background-color:  ${colors.blue100};
      padding: 18px 18px 13px 18px;
      position: absolute;
      top: -8px;
      left: 0;
      width: 100%;
    }

    .collapsing {
      position: relative;
      height: 0;
      overflow: hidden;
      transition: height 0.35s ease;
    }
    
    @media (prefers-reduced-motion: reduce) {
      .collapsing {
        transition: none;
      }
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

    .visually-hidden { 
      position: absolute !important;
      height: 1px; 
      width: 1px;
      overflow: hidden;
      clip: rect(1px 1px 1px 1px); /* IE6, IE7 */
      clip: rect(1px, 1px, 1px, 1px);
      white-space: nowrap; /* added line */
  }

  .ratings-accordion--sm {
    display: block;
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 146px;
    border-left: 1px solid ${colors.buttonColor};

    ${media.tablet`
      height: 146px;
      border-left: 1px solid ${colors.buttonColor};
    `}


    ${media.desktop`
      height: 167px;
      border-left: 0;
    `}

    .accordion__item {
      width: 33.3333%;
      float: left;
    }

    .is-disabled{
      cursor: text;
      padding: 0;
      background-color: transparent;
      overflow: hidden;
      width: 100%;
      text-align: left;
      border: 1px solid ${colors.blue100};
      height: 61px;

      &[aria-expanded='true'],
      &[aria-selected='true']{
        border: 1px solid ${colors.blue100};
      }
    }

    .accordion__button{
      padding: 0;
      background-color: transparent;
      overflow: hidden;
      cursor: pointer;
      width: 100%;
      text-align: left;
      border: 1px solid ${colors.blue100};
      height: 61px;

      &[aria-expanded='true'],
      &[aria-selected='true']{
        border: 1px solid black;
      }
    }

    .accordion__panel--disabled{
      background-color:  ${colors.white} !important;
      display: block;
    }

    .accordion__panel{
      position: absolute;
      left: 0;
      bottom: 0;
      font-size: ${fontSize.xxs};
      font-weight: ${fontWeight.medium};
      font-family: ${fonts.primary};
      text-align: center;
      background-color:  ${colors.blue100};
      padding: 10px 5px 12px 5px;
      width: 185px;
      height: 85px;

      ${media.tablet`
        width: 185px;
        height: 70px;
      `}

      ${media.desktop`
        width: 215px;
        height: 106px;
        padding: 18px 18px 13px 18px;
      `}

      p{
        margin-bottom: 0;

        ${media.tablet`
          margin-bottom: 0;
        `}

        ${media.desktop`
          margin-bottom: 10px;
        `}
      }
    }
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
