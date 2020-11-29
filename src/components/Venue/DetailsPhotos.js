import { array, func } from 'prop-types'
import React from 'react'
import { intlShape } from 'react-intl'
import styled from 'styled-components'

import Icon from '../Icon'
import Button from '../Button'
import { colors, media } from '../../styles'

const Wrapper = styled.div`
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  padding: 0;
  width: 100%;

  ${media.tablet`
    padding: 0rem 0;
  `};
`

const PhotoLink = styled.div`
  flex: 1 0 auto;
  border-radius: 3px;
  height: 10.25rem;
  margin-right: 0;
  min-width: 14rem;
`

const Photo = styled.div`
  height: inherit;
  min-width: inherit;
  background-image: ${props => `url("${props.backgroundImage}")`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`

const PhotoPlaceholder = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  flex: 1 0 auto;
  border-radius: 3px;
  height: 10.25rem;
  width: 14rem;
  min-width: 14rem;
  padding: 1rem;

  background-color: ${colors.lightGrey};
`

const BackWrapper = styled.div`
  position: absolute;
  display: none;
  padding-top: 15px;
  padding-left: 15px;

  ${media.desktop`
    display: block;
  `};

  ${media.widescreen`
    display: block;
  `};

  @media only screen and (min-device-width: 1024px) and (max-device-width: 1366px) and (-webkit-min-device-pixel-ratio: 2) {
    display: block;
  }

`

const Photos = (props, context) => (
  <Wrapper>
    <BackWrapper>
      <Button onClick={props.goBackHandler} disabled={false} className="back-btn" aria-label="back button">
        <Icon
          glyph="arrow"
          size={1}
          rotate="180deg"
          color={colors.white}
        />
      </Button>
    </BackWrapper>
    {props.photos && props.photos.length > 0 ? (
        <PhotoLink role="banner">
          <Photo backgroundImage={props.photos} />
        </PhotoLink>

     ):(
    <PhotoPlaceholder role="banner">
      <Icon glyph="photo" size={6} color={colors.darkGrey} />
    </PhotoPlaceholder>
     )}
  </Wrapper>
)

Photos.propTypes = {
  photos: array,
  goBackHandler: func.isRequired
}

Photos.defaultProps = {
  photos: []
}

Photos.contextTypes = {
  intl: intlShape
}

export default Photos
