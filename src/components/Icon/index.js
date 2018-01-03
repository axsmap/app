import { number, string } from 'prop-types'
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

  fill: currentColor;
  height: 100%;
  width: 100%;
`

const shapeStyle = props => `
  fill: ${props.fillColor};
  stroke: ${props.strokeColor};

  ${props.onHoverFillColor || props.onHoverStrokeColor
    ? `
    &:hover {
      fill: ${props.onHoverFillColor || props.fillColor};
      stroke: ${props.onHoverStrokeColor || props.strokeColor};
    }
  `
    : ''}
`

const Path = styled.path`${shapeStyle};`

const Rect = styled.rect`${shapeStyle};`

const Circle = styled.circle`${shapeStyle};`

const Icon = props => {
  const icon = icons[props.glyph]

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

  let color = props.color
  let onHoverColor
  if (props.onHoverColor) onHoverColor = props.onHoverColor

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
        ariaLabelledby="title"
        viewBox={icon.viewBox}
        id={`${props.glyph}-${props.color}`}
      >
        <title id="title">{props.glyph}</title>
        {icon.elements.map(element => {
          if (element.path.fill && element.path.fill !== 'none') {
            color = element.path.fill
          }

          if (element.path) {
            return (
              <Path
                fillColor={element.path.fill === 'none' ? 'none' : color}
                strokeColor={element.path.fill === 'none' ? color : 'none'}
                onHoverFillColor={
                  element.path.fill === 'none' ? null : onHoverColor
                }
                onHoverStrokeColor={
                  element.path.fill === 'none' ? onHoverColor : null
                }
                {...element.path}
              />
            )
          } else if (element.rect) {
            return (
              <Rect
                fillColor={element.rect.fill === 'none' ? 'none' : color}
                strokeColor={element.rect.fill === 'none' ? color : 'none'}
                onHoverFillColor={
                  element.rect.fill === 'none' ? null : onHoverColor
                }
                onHoverStrokeColor={
                  element.rect.fill === 'none' ? onHoverColor : null
                }
                {...element.rect}
              />
            )
          }

          return (
            <Circle
              fillColor={element.circle.fill === 'none' ? 'none' : color}
              strokeColor={element.circle.fill === 'none' ? color : 'none'}
              onHoverFillColor={
                element.circle.fill === 'none' ? null : onHoverColor
              }
              onHoverStrokeColor={
                element.circle.fill === 'none' ? onHoverColor : null
              }
              {...element.circle}
            />
          )
        })}
      </Svg>
    </Wrapper>
  )
}

Icon.propTypes = {
  className: string,
  glyph: string.isRequired,
  size: number,
  tabletSize: number,
  desktopSize: number,
  widescreenSize: number,
  rotate: string,
  color: string,
  onHoverColor: string
}

Icon.defaultProps = {
  className: '',
  size: 1,
  rotation: '0deg',
  color: 'white'
}

export default Icon
