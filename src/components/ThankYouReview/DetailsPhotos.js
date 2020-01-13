import { array } from 'prop-types'
import React from 'react'
import { intlShape } from 'react-intl'
import styled from 'styled-components'

import Icon from '../Icon'
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

const PhotoPlaceholder = styled.div`
  display: flex;

  align-items: center;
  flex-direction: column;
  justify-content: center;

  flex: 1 0 auto;

  border-radius: 3px;
  height: 14rem;
  width: 14rem;
  min-width: 14rem;
  padding: 1rem;

  background-color: ${colors.lightGrey};
`
const Photos = (props, context) => (
  <Wrapper>
    <PhotoPlaceholder>
      <Icon glyph="photo" size={6} color={colors.darkGrey} />
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
