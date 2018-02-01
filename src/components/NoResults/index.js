import { string } from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import noResultsImage from '../../images/no-results.svg'
import { colors, media } from '../../styles'

const Wrapper = styled.div`
  display: flex;

  align-items: center;
  flex-direction: column;
  justify-content: center;

  width: 100%;
`

const Image = styled.img`
  height: 5rem;
  margin-bottom: 2rem;

  ${media.tablet`
    height: 7rem;
  `};

  ${media.desktop`
    height: 9rem;
  `};

  ${media.widescreen`
    height: 12rem;
  `};
`

const Title = styled.h1`
  margin: 0 0 1rem 0;
  color: ${colors.darkestGray};
`

const Text = styled.p`
  margin: 0;
  color: ${colors.darkGrey};
  font-weight: bold;
  text-align: center;
`

const NoResults = props => (
  <Wrapper>
    <Image src={noResultsImage} alt="No results" />
    <Title>{props.title}</Title>
    <Text>{props.text}</Text>
  </Wrapper>
)

NoResults.propTypes = {
  title: string.isRequired,
  text: string.isRequired
}

export default NoResults
