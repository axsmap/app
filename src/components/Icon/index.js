import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import icons from './icons'
import { media } from '../../styles'

const Wrapper = styled.div`
  position: relative;

  display: inline-block;
  transform: ${props =>
    props.rotate ? `rotate(${props.rotate})` : 'rotate(0deg)'};

  height: ${props => `${props.height}rem` || '1rem'};
  width: ${props => `${props.width}rem` || '1rem'};

  ${media.tablet`
    height: ${props => `${props.tabletHeight}rem` || '1rem'};
    width: ${props => `${props.tabletWidth}rem` || '1rem'};
  `};

  ${media.desktop`
    height: ${props => `${props.desktopHeight}rem` || '1rem'};
    width: ${props => `${props.desktopWidth}rem` || '1rem'};
  `};

  ${media.widescreen`
    height: ${props => `${props.widescreenHeight}rem` || '1rem'};
    width: ${props => `${props.widescreenWidth}rem` || '1rem'};
  `};
`

const Svg = styled.svg`
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;

  flex: 1;

  height: 100%;
  width: 100%;

  fill: currentColor;

  color: inherit;
`

const Icon = props => {
  const icon = icons[props.glyph](props.color)

  const height = props.size
  const width = height * icon.ratio
  let tabletHeight = height
  let tabletWidth = width
  let desktopHeight = height
  let desktopWidth = width
  let widescreenHeight = height
  let widescreenWidth = width
  if (props.tabletSize) {
    tabletHeight = props.tabletSize
    tabletWidth = tabletHeight * icon.ratio
    desktopHeight = tabletHeight
    desktopWidth = tabletWidth
  }
  if (props.desktopSize) {
    desktopHeight = props.desktopSize
    desktopWidth = desktopHeight * icon.ratio
    widescreenHeight = desktopHeight
    widescreenWidth = desktopWidth
  }
  if (props.widescreenSize) {
    widescreenHeight = props.widescreenSize
    widescreenWidth = widescreenHeight * icon.ratio
  }

  return (
    <Wrapper
      className={props.className}
      height={height}
      width={width}
      tabletHeight={tabletHeight}
      tabletWidth={tabletWidth}
      desktopHeight={desktopHeight}
      desktopWidth={desktopWidth}
      widescreenHeight={widescreenHeight}
      widescreenWidth={widescreenWidth}
      rotate={props.rotate}
    >
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        aria-labelledby="title"
        viewBox={icon.viewBox}
        id={props.glyph}
      >
        <title id="title">{props.glyph}</title>
        {icon.paths}
      </Svg>
    </Wrapper>
  )
}

Icon.propTypes = {
  className: PropTypes.string,
  glyph: PropTypes.string.isRequired,
  size: PropTypes.number,
  tabletSize: PropTypes.number,
  desktopSize: PropTypes.number,
  widescreenSize: PropTypes.number,
  rotate: PropTypes.string,
  color: PropTypes.string
}

Icon.defaultProps = {
  className: '',
  size: 1,
  rotation: '0deg',
  color: 'white'
}

export default Icon
