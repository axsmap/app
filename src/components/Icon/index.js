import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import icons from './icons'
import { media } from '../../styles'

const Wrapper = styled.div`
  position: relative;

  display: inline-block;
  transform: ${props =>
    props.$rotate ? `rotate(${props.$rotate})` : 'rotate(0deg)'};

  height: ${props => `${props.$height}rem` || '1rem'};
  width: ${props => `${props.$width}rem` || '1rem'};

  ${media.tablet`
    height: ${props => `${props.$tabletHeight}rem` || '1rem'};
    width: ${props => `${props.$tabletWidth}rem` || '1rem'};
  `};

  ${media.desktop`
    height: ${props => `${props.$desktopHeight}rem` || '1rem'};
    width: ${props => `${props.$desktopWidth}rem` || '1rem'};
  `};

  ${media.widescreen`
    height: ${props => `${props.$widescreenHeight}rem` || '1rem'};
    width: ${props => `${props.$widescreenWidth}rem` || '1rem'};
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
  fill: ${props.$fillColor};
  stroke: ${props.$strokeColor};

  ${
    props.$onHoverFillColor || props.$onHoverStrokeColor
      ? `
    &:hover {
      fill: ${props.$onHoverFillColor || props.$fillColor};
      stroke: ${props.$onHoverStrokeColor || props.$strokeColor};
    }
  `
      : ''
  }
`

const Path = styled.path`
  ${shapeStyle};
`

const Rect = styled.rect`
  ${shapeStyle};
`

const Circle = styled.circle`
  ${shapeStyle};
`

const Icon = ({
  className = '',
  style,
  glyph,
  size = 1,
  tabletSize,
  desktopSize,
  widescreenSize,
  rotate = '0deg',
  color = 'white',
  onHoverColor,
}) => {
  const icon = icons[glyph];

  const height = size;
  const width = height * icon.ratio;
  let tabletHeight = size;
  let tabletWidth = width;
  let desktopHeight = size;
  let desktopWidth = width;
  let widescreenHeight = size;
  let widescreenWidth = width;

  if (tabletSize) {
    tabletHeight = tabletSize;
    tabletWidth = tabletHeight * icon.ratio;
    desktopHeight = tabletHeight;
    desktopWidth = tabletWidth;
  }
  if (desktopSize) {
    desktopHeight = desktopSize;
    desktopWidth = desktopHeight * icon.ratio;
    widescreenHeight = desktopHeight;
    widescreenWidth = desktopWidth;
  }
  if (widescreenSize) {
    widescreenHeight = widescreenSize;
    widescreenWidth = widescreenHeight * icon.ratio;
  }

  return (
    <Wrapper
      className={className}
      style={style}
      height={height}
      width={width}
      $tabletHeight={tabletHeight}
      $tabletWidth={tabletWidth}
      $desktopHeight={desktopHeight}
      $desktopWidth={desktopWidth}
      $widescreenHeight={widescreenHeight}
      $widescreenWidth={widescreenWidth}
      $rotate={rotate}
    >
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        aria-labelledby="title"
        viewBox={icon.viewBox}
        id={`${glyph}-${color}`}
      >
        <title id="title">{glyph}</title>
        {icon.elements.map((element, index) => {
          if (element.path) {
            return (
              <Path
                key={index}
                $fillColor={element.path.fill === 'none' ? 'none' : color}
                $strokeColor={element.path.fill === 'none' ? color : 'none'}
                $onHoverFillColor={element.path.fill === 'none' ? null : onHoverColor}
                $onHoverStrokeColor={element.path.fill === 'none' ? onHoverColor : null}
                {...element.path}
              />
            );
          } else if (element.rect) {
            return (
              <Rect
                key={index}
                $fillColor={element.rect.fill === 'none' ? 'none' : color}
                $strokeColor={element.rect.fill === 'none' ? color : 'none'}
                $onHoverFillColor={element.rect.fill === 'none' ? null : onHoverColor}
                $onHoverStrokeColor={element.rect.fill === 'none' ? onHoverColor : null}
                {...element.rect}
              />
            );
          }

          return (
            <Circle
              key={index}
              $fillColor={element.circle.fill === 'none' ? 'none' : color}
              $strokeColor={element.circle.fill === 'none' ? color : 'none'}
              $onHoverFillColor={element.circle.fill === 'none' ? null : onHoverColor}
              $onHoverStrokeColor={element.circle.fill === 'none' ? onHoverColor : null}
              {...element.circle}
            />
          );
        })}
      </Svg>
    </Wrapper>
  );
};

Icon.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  glyph: PropTypes.string.isRequired,
  size: PropTypes.number,
  tabletSize: PropTypes.number,
  desktopSize: PropTypes.number,
  widescreenSize: PropTypes.number,
  rotate: PropTypes.string,
  color: PropTypes.string,
  onHoverColor: PropTypes.string,
};

export default Icon
