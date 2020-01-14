import { array } from 'prop-types'
import React from 'react'
import { intlShape } from 'react-intl'
import styled from 'styled-components'

import { media } from '../../styles'

import tyBannerImage from '../../images/thankYou.png'

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

const PhotoPlaceholder = styled.div`
  display: flex;

  align-items: center;
  flex-direction: column;
  justify-content: center;

  flex: 1 0 auto;
  padding: 1rem;
`
const Photos = (props, context) => (
  <Wrapper>
    <PhotoPlaceholder>
      <figure>
        <img src={tyBannerImage} aria-hidden="true" alt="Thank You" />
      </figure>
    </PhotoPlaceholder>
  </Wrapper>
)

Photos.propTypes = {
  photos: array
}

Photos.defaultProps = {
  photos: []
}

Photos.contextTypes = {
  intl: intlShape
}

export default Photos
