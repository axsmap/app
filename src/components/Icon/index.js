import PropTypes from 'prop-types'
import React from 'react'

import icons from './icons'
import Svg from './Svg'
import Wrapper from './Wrapper'

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
  glyph: PropTypes.string.isRequired,
  size: PropTypes.number,
  tabletSize: PropTypes.number,
  desktopSize: PropTypes.number,
  widescreenSize: PropTypes.number,
  rotate: PropTypes.string,
  color: PropTypes.string
}

Icon.defaultProps = {
  size: 1,
  rotation: '0deg',
  color: 'white'
}

export default Icon
