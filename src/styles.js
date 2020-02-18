/* eslint no-param-reassign: off, no-unused-expressions: off */

import { css, injectGlobal } from 'styled-components'
import { rgba } from 'polished'

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
  border: '#e3e1e0',
  accent1: '#04F2C7'
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
  mega: '4.375rem',
  banner: '3.125rem'
}

export const sizes = {
  mobile: 640,
  tablet: 768,
  desktop: 1024,
  widescreen: 1280
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
    margin: 0;

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

      &.alt {
        font-family: ${fonts.tertiary};
        font-size: ${fontSize.xl};
        line-height: 2;
        margin: 0;
        padding: 0;
      }
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

      &.alt{
        font-size: ${fontSize.banner}!important;
        font-family: ${fonts.tertiary}!important;
      }
    }
  }

  #root {
    align-items: center;
    flex-direction: column;
    justify-content: center;
    display: flex;

    body { font-size: 16px; }
    input, select { font-size: 100%; }

    @media screen and (device-aspect-ratio: 2/3) {
      select, textarea, input[type="text"], input[type="password"],
      input[type="datetime"], input[type="datetime-local"],
      input[type="date"], input[type="month"], input[type="time"],
      input[type="week"], input[type="number"], input[type="email"],
      input[type="url"]{ font-size: 16px; }
  }
  
    @media screen and (-webkit-min-device-pixel-ratio:0) { 
      select,
      textarea,
      input {
        font-size: 16px;
      }
    }

    img {
      border-style: none;
    }

    b,
    strong {
      font-weight: bolder;
    }

    input,
    optgroup,
    select,
    textarea {
      font-family: inherit; 
      font-size: 100%; 
      line-height: 1.15; 
      margin: 0; 
    }

    button{
      font-family: inherit; 
      line-height: 1.15; 
    }

    button,
    input { 
      overflow: visible;
    }

    button,
    [type="button"],
    [type="reset"],
    [type="submit"] {
      -webkit-appearance: button;
    }

    button::-moz-focus-inner,
    [type="button"]::-moz-focus-inner,
    [type="reset"]::-moz-focus-inner,
    [type="submit"]::-moz-focus-inner {
      border-style: none;
      padding: 0;
    }

    button:-moz-focusring,
    [type="button"]:-moz-focusring,
    [type="reset"]:-moz-focusring,
    [type="submit"]:-moz-focusring {
      outline: 1px dotted ButtonText;
    }

    [type="search"] {
      -webkit-appearance: textfield; 
      outline-offset: -2px; /
    }
    
    [type="search"]::-webkit-search-decoration {
      -webkit-appearance: none;
    }
    
    .fill-current{
      fill: currentColor;
    }

    .sign-in-btn{
      font-size: ${fontSize.sm};

      ${media.tablet`
        font-size: ${fontSize.xs};
      `};

      @media (min-width:1200px) and (max-width:1299px){
        font-size: ${fontSize.xxxs} !important
      }

      ${media.desktop`
        font-size: ${fontSize.xs};
      `};

      ${media.widescreen`
        font-size: ${fontSize.sm};
      `};
    }

    .top-bar--alt{
      color: ${colors.white};
      background-color: ${colors.darkestGrey};

      a{
        color: ${colors.white};

          &:hover {
            color: ${colors.secondary};
          }

        &.sign-in-btn{
          background-color: ${colors.white};
          color: ${colors.darkestGrey};

          &:hover {
            background-color: ${colors.primary};
          }
        }
      }
    }

    .mobile-hide {
      display: none;

      ${media.desktop`
        display: block;
      `}
    }

    .ipad-hide--portrait{
      @media (min-width: 768px) 
      and (orientation: portrait){
        display: none;
      }
    }

    .ipad-hide--landscape{
      @media only screen 
      and (min-device-width: 768px) 
      and (max-device-width: 1024px) 
      and (-webkit-min-device-pixel-ratio: 2) 
      and (orientation: landscape){
        display: none;
      }
    }


    .ipad-pro-hide--portrait{
      @media only screen 
      and (min-device-width: 1024px) 
      and (max-device-width: 1366px) 
      and (-webkit-min-device-pixel-ratio: 2) 
      and (orientation: portrait){
        display: none;
      }
    }

    .ipad-pro-hide--landscape{
      @media only screen 
      and (min-device-width: 1024px) 
      and (max-device-width: 1366px) 
      and (-webkit-min-device-pixel-ratio: 2) 
      and (orientation: landscape){
        display: none;
      }
    }

    .inline-block	{
      display: inline-block;
    }

    .float-left{
      float: left;
    }	

    .block{
      display: block;
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

    .leading-normal{
        line-height: 1.5;
    }

    .leading-relaxed{
      line-height: 1.625;
    }

    .leading-loose{
      line-height: 2;
    }

    .font-primary {
      font-family: ${fonts.primary};
    }

    .text-xl2{
      font-size: ${fontSize.xl2};
    }
    .text-xl{
      font-size: ${fontSize.xl};
    }

    .text-lg{
      font-size: ${fontSize.lg};
    }

    .text-xxs{
      font-size: ${fontSize.xxs} !important;
    }

    .text-base{
      font-size: ${fontSize.base};
    }

    .bg-lines {
      background-image:url('../../images/backgrounds/lines.png');
      background-repeat: no-repeat;
      background-color: white;
    }

    .yellow-divider{
      &:after{
        background-color: ${colors.primary};
        width: 3px;
        height: 65%;
        content:  '';
        display: block;
        position: absolute;
        top: 20px;
        right: 0;
      }
    }

    .my-15{
      margin-left: 15%;
    }

    .my-2{
      margin-top: 2rem;
      margin-bottom: 2rem;

      ${media.mobile`
        margin-top: 0rem;
        margin-bottom: 0rem;
      `}
    }

    .font-semibold{
      font-weight: ${fontWeight.semibold};
    }

    .overflow-hidden{	
      overflow: hidden;
    }

    .py-1{
      padding-top: 0.9375rem;
      padding-bottom: 0.9375rem
    }

    .py-10{
      padding-top: 2.5rem;
      padding-bottom: 2.5rem;
    }

    .px-2{
      padding-left: 1.75rem !important;
      padding-right: 1.75rem !important;
    }

    .px-9	{
      padding-right: 2.1875rem;
      padding-left: 2.1875rem;
    }

    .p-1{
      padding: 0.9375rem;
    }

    .mx-auto{	
      margin-right: auto;
      margin-left: auto;
    }

    .my-7	{
      margin-top: 0;
      margin-bottom: 0;

      ${media.desktop`
        margin-top: 1.875rem;
        margin-bottom: 1.875rem;
      `}
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

    .h-full{	
      height: 100%;
    }

    .overflow-hidden {	
      overflow: hidden;
    }

    .bg-gray100{
      background-color: ${colors.gray100};
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

    .bg-primary{
      background-color: ${colors.primary};
    }

    .shadow-none	{
      box-shadow: none !important;
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

    .back-btn{
      border-radius: 9999px;
      width: 30px;
      height: 30px;
      display: block;
      padding: 0;
      background-color: ${rgba(colors.darkestGrey, 0.25)};
      cursor: pointer;
      text-align: center;

      &:hover{
        background-color: ${rgba(colors.darkestGrey, 0.35)};
      }
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

    .bordered-fig{
      border-bottom: 3px solid ${colors.accent1};
      padding-bottom: 10px;
    }

    .btn-group-sm .btn-secondary{
      min-width: 33.333%
      width: 33.333%;
      padding: 7px 2px;
      font-size:  ${fontSize.xxxs};

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

      ${media.tablet`
        font-size:  ${fontSize.xs};
        padding: 7px 5px;
      `};

      ${media.desktop`
        font-size:  ${fontSize.xs};
        padding: 7px 5px;
      `};

      ${media.widescreen`
        font-size:  ${fontSize.xs};
        padding: 7px 5px;
      `};
    }

    .btn-group-lg .btn-secondary{
      width: 100%;
    }

    .welcome-close {
      top: 20px;
      padding: 0;
      position: absolute;
      left: 25px;

      ${media.desktop`
        top: 20px;
        position: absolute;
        left: 25px;
      `};
    }

    .btn-rounded-full{
      background-color: ${colors.white};
      border: 1px solid  #D9D9D9;
      color: ${colors.darkestGrey};
      font-weight: ${fontWeight.bold};
      font-size:  ${fontSize.base};
      text-transform: uppercase;
      text-align: center;
      border-radius: 50%;
      width: 100px;
      min-height: 100px;
      height: auto;
      font-family: ${fonts.primary};
      line-height: 1.25;
      padding: 0;
      cursor: pointer;
      margin-bottom: 15px;
      vertical-align: middle;

      ${media.tablet`
        width: 80px;
        min-height: 80px;
        margin-bottom: 10px;
        padding: 20px 0 0 0;
        font-size:  ${fontSize.sm};
      `};

      ${media.desktop`
        padding: 0;
        margin-bottom: 0px;
        width: 80px;
        min-height: 80px;
      `};

      ${media.widescreen`
        padding: 0;
        margin-bottom: 0px;
        width: 110px;
        min-height: 110px;
      `};

      span{
        display: block;
        position: relative;
        height: 100%;
        text-align: center;
        vertical-align: middle;
        padding-top: 25px;

        ${media.tablet`
          padding-top: 0;
        `};

        ${media.desktop`
          padding-top: 25px;
        `};

        ${media.widescreen`
          padding-top: 35px;
        `};
      }


      &:hover {
        background-color: ${colors.primary};
        border: 1px solid  #D9D9D9;
      }

      &.single-line {
        padding-top: 20px;

        ${media.tablet`
          padding-top: 20px;
          margin-bottom: 15px;
        `};

        ${media.desktop`
          padding-top: 20px;
        `};

        ${media.widescreen`
          padding-top: 13%;
        `};

        span{

          ${media.tablet`
            padding-top:17%;
            margin-bottom: 10px;
          `};

          ${media.desktop`
            padding-top: 13%;
          `};

          ${media.widescreen`
            padding-top: 25px;
          `};

        }
      }

      &.active{
        background-color: ${colors.primary};
        border: 1px solid  #D9D9D9;
      }
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
      border: 2px solid ${colors.primary};
      text-decoration: none;

      &:hover{
        border: 2px solid #FFE000;
        background-color: ${colors.white};
        cursor: pointer;
      }

      &.primary-btn--large{
        min-width: 230px;
        font-size: ${fontSize.base};
        text-decoration: none;
        padding: 12px 15px 10px 15px;
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

    .primary-btn--alt-circle{
      border: 2px solid ${colors.primary};
      color: ${colors.white};
      text-align: center;
      text-transform: uppercase;
      font-family: ${fonts.primary};
      font-weight: ${fontWeight.bold};
      line-height: 1;
      font-size: ${fontSize.xs};
      display: block;
      position: relative;
      cursor: pointer;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      border: 2px solid ${colors.primary};
      background-color: ${colors.textColor};
      padding: 0;

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

      &.venue-details{
        ${media.tablet`
            min-width: 100%;
            width: 100%;
        `};

        ${media.desktop`
            min-width: 100%;
            width: 100%;
        `};

        ${media.widescreen`
          min-width: 150px;
          width: 150px;
          float: right;
      `};
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

   .interior-score__details{
    display: block;
    position: relative;

    .arrow {
     position: absolute;
     display: block;
     width: 0.8rem;
     height: 0.4rem;
     top: -11px;
     left: 40%;

     ${media.desktop`
       top: -19px;
       left: 42%;
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

   .interior-score__details__content{
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

      &.details-carousel{
        .carousel__slider{
          height: 620px;

          ${media.desktop`
            height: 485px;
          `}
        }
      }

      &.carousel--lg {
        .carousel__slider{
          height: 620px;

          ${media.desktop`
            height: 565px;
          `}
        }

        .sliderAnimation___300FY {
          transition: none !important;
        }

      }

      .carousel__inner-slide{
        height: auto;
      }

      .carousel__inner-slide,
      .carousel__slide--focused,
      .carousel__slide,
      .focusRing___1airF 
      {
        outline: none!important;

        &:focus {
          outline: none!important;
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
          padding-top: 4px;
          text-align: center;
          display: block;
          // padding-right: 2px;
          margin: 0 auto;
        }

        &.btn-fixed-bottom{
          bottom: 2rem;
          left:15px;
          position: fixed;
          z-index: 1;
          top: auto;
          -webkit-appearance: button;
          text-align: center;
          padding-left: 0;
          padding-right: 0;

          ${media.tablet`
            position: absolute;
            bottom: 0rem;
            left: 25px;
          `}

          ${media.desktop`
            position: absolute;
            bottom: -1.5rem;
            left: 9px;
          `}

          ${media.widescreen`
            position: absolute;
            bottom: -1.5rem;
            left: 0px;
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
          padding-top: 4px;
          text-align: center;
          display: block;
          margin: 0 auto;
        }

        &.btn-fixed-bottom{
          bottom: 2rem;
          position: fixed;
          z-index: 1;
          top: auto;
          padding-left: 0;
          padding-right: 0;


          ${media.tablet`
            position: absolute;
            bottom: 0rem;
            right: 25px;
          `}

          ${media.desktop`
            position: absolute;
            bottom: -1.5rem;
            right: 10px;
          `}

          ${media.widescreen`
            position: absolute;
            bottom: -1.5rem;
            right: 0px;
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
    
    .text-center{
      text-align: center;
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
      cursor: pointer;

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

    .score_alert{
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

  .review-carousel{
    position: relative;
    width: 100%; 

    & * {
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box; }

    .carousel {
        position: relative; 
        position: relative;
    }
    .control-arrow {
        outline: 0;
        border: 0;
        background: none;
        top: 50%;
        margin-top: -13px;
        font-size: 18px; 
    }

    .carousel-slider {
      position: relative;
      margin: 0;
      overflow: hidden; 
    }

    .slider-wrapper {
      overflow: hidden;
      margin: auto;
      width: 100%;
      -webkit-transition: height 0.15s ease-in;
      -moz-transition: height 0.15s ease-in;
      -ms-transition: height 0.15s ease-in;
      -o-transition: height 0.15s ease-in;
      transition: height 0.15s ease-in; 

      &.axis-vertical{
        -ms-box-orient:horizontal;
        display:-moz-flex;
        display:flex

        &.slider{
          flex-direction:column
        }
        
      }

      &.axis-horizontal .slider{
        -ms-box-orient:horizontal;
        display:-moz-flex;
        display:flex

        .slide{
          flex-direction:column;
          flex-flow:column
        }
      }
    }

    .slider {
      margin: 0;
      padding: 0;
      position: relative;
      list-style: none;
      width: 100%; 
    }

    .slider.animated {
      -webkit-transition: all 0.35s ease-in-out;
      -moz-transition: all 0.35s ease-in-out;
      -ms-transition: all 0.35s ease-in-out;
      -o-transition: all 0.35s ease-in-out;
      transition: all 0.35s ease-in-out; 
    }

    .slide {
      min-width: 100%;
      margin: 0;
      position: relative;
      text-align: center;
      background: white; 
    }

    .control-prev{
      bottom: 2rem;
      left:15px;
      position: fixed;
      z-index: 1;
      top: auto;

      ${media.tablet`
        position: absolute;
        bottom: 0rem;
        left: 25px;
      `}

      ${media.desktop`
        position: absolute;
        bottom: -1.5rem;
        left: 9px;
      `}

      ${media.widescreen`
        position: absolute;
        bottom: -1.5rem;
        left: 25px;
      `}
    }

    .control-next{

    }
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
      width: 100%;
      height: 85px;

      ${media.mobile`
        width: 100%;
      `}

      ${media.tablet`
        width: 100%;
        height: 84px;
      `}

      ${media.desktop`
        width: 185px;
        height: 106px;
        padding: 18px 18px 13px 18px;
      `}

      ${media.widescreen`
        width: 100%;
      `}

      @media only screen 
      and (min-device-width: 1024px) 
      and (max-device-width: 1366px) 
      and (-webkit-min-device-pixel-ratio: 2) 
      and (orientation: portrait){
        width: 100%;
      }

      @media only screen 
      and (min-device-width: 768px) 
      and (max-device-width: 1024px) 
      and (-webkit-min-device-pixel-ratio: 2) 
      and (orientation: landscape){
        width: 100%;
      }

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

  .nav {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    padding-left: 0;
    margin-bottom: 0;
    list-style: none;
  }
  
  .nav-tabs .nav-item {
    margin-bottom: -1px;
    width: 50%;
    float: left;
    text-transform: uppercase;
    font-family: ${fonts.primary};
    font-size: ${fontSize.xs};
    background-color: ${colors.darkestGrey};
    color: ${colors.primary};
    text-align: center;
    padding: 0;
    margin: 0 auto;
    list-style-type: none;
    height: 42px;
    overflow: hidden;
    font-weight: ${fontWeight.bold};

    a{
      font-family: ${fonts.primary};
      font-size: ${fontSize.xs};
      background-color: ${colors.darkestGrey};
      color: ${colors.primary};
      text-align: center;
      padding: 12px 0;
      height: 42px;
      font-weight: ${fontWeight.bold};
      display: block;
      cursor: pointer;

      &.active {
        background-color: ${colors.white};
        color: ${colors.darkestGrey};
      }
    }
  }

  .tab-content > .tab-pane{
    display: none;
  }
  .tab-content > .active {
    display: block;
  }

    .is-active-score{
      border: 1px solid black;

      &:after{
        position: absolute;
        content: "";
        border-color: transparent;
        border-style: solid;
        padding: 0.4rem 0;
        bottom: -30px;
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
