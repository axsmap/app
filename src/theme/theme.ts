/**
 * This file contains the application's variables.
 *
 * Define color, sizes, etc. here instead of duplicating them throughout the components.
 * That allows to change them more easily later on.
 */

/**
 * Colors
 */
export const Colors = {
  primary: "#FEE000",
  primary_light: "rgba(254,224,0,0.2)",
  secondary: "#00A1E4",
  success: "#0CCE6B",
  warning: "#F78636",
  alert: "#EF2D56",
  text_secondary: "#4B5563",
  gray100: "#F7F7F7",
  gray300: "#EBECEC",
  gray500: "#969596",
  gray600: "#9A9B9F",
  gray650: "#6b6b6b",
  gray700: "#6F7175",
  blue100: "#f3f3f4",
  lightestGrey: "#FAFAFA",
  lightGrey: "#EBEBEB",
  grey: "#CFCECF",
  darkGrey: "#7B7A7B",
  darkestGrey: "#363537",
  facebook: "#3b5998",
  google: "#ea4335",
  error: "#ea4335",
  twitter: "#1DA1F2",
  youtube: "#FF0000",
  buttonColor: "#D8D8DA",
  textColor: "#42454A",
  textColorLight: "#706E6B",
  backgroundColor: "#FFFFFF",
  iconColor: "#595B60",
  borderColor: "#DEDEDF",
  ratingCaution: "#FEE43C",
  ratingAlert: "#FF5600",
  ratingAccessible: "#4EC2FF",
  border: "#e3e1e0",
  accent1: "#04F2C7",
  transparent: "rgba(0,0,0,0)",
  inputBackground: "#FFFFFF",
  white: "#ffffff",
  black: "#111111",
  text: "#212529",

  blueCode01: "#4267B2",
  blueCode02: "#265FE2",
  blueCode03: "#3B5998",
  blueCode04: "#563BD6",
  blueCode05: "#04f2c7",
  greyCode01: "#363537",
  greyCode02: "#6b6b6b",
  greyCode03: "#rgb(123, 122, 123)",
  greenCode01: "#2C7F3B",
  whiteCode01: "#EBEBEB",
  whiteCode02: "#D8D8DA",
  redCode01: "#EA4335",
  error: "#dc3545",
  danger: "#EA0000",
};

export const NavigationColors = {
  primary: Colors.primary,
};

/**
 * FontSize
 */
export const FontSize = {
  small: 16,
  regular: 20,
  large: 40,
};

// export const { width, height } = Dimensions.get("window");
// const [shortDimension, _] = width < height ? [width, height] : [height, width];

// //Default guideline sizes are based on standard ~5" screen mobile device
// const guidelineBaseWidth = 393;
// const guidelineBaseHeight = 852;

// export const Font = (pxl: number) => {
//   return (height / guidelineBaseHeight) * pxl;
// };

// export const Height = (pxl: number) => {
//   return (height / guidelineBaseHeight) * pxl;
// };

// export const Width = (pxl: number) => {
//   return (width / guidelineBaseWidth) * pxl;
// };

// /**
//  * Metrics Sizes
//  */
// const tiny = 5; // 10
// const small = tiny * 2; // 10
// const regular = tiny * 3; // 15
// const medium = small * 2; // 20
// const large = regular * 2; // 30
// export const MetricsSizes = {
//   tiny,
//   small,
//   regular,
//   medium,
//   large,
// };

const theme = {
  Colors,
  NavigationColors,
};

export default theme;
