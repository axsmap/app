import { array } from 'prop-types'
import React from 'react'
import { useIntl } from 'react-intl'
import styled from 'styled-components'

import { media } from '../../styles'

import tyBannerImage from '../../images/banners/thank-you.png'

const Wrapper = styled.div`
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  padding: 0;
  width: 100%;

  ${media.tablet`
    padding: 0;
  `};
`

const PhotoPlaceholder = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  flex: 1 0 auto;
  padding: 0rem;
`

const Photos = () => {
  return (
    <Wrapper>
      <PhotoPlaceholder>
        <figure>
          <img src={tyBannerImage} aria-hidden="true" alt="Thank You" />
        </figure>
      </PhotoPlaceholder>
    </Wrapper>
  );
};

Photos.propTypes = {
  photos: array
}

export default Photos
