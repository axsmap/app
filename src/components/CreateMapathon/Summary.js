import { string } from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import { colors, fonts, fontWeight, fontSize, media } from '../../styles'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  width: 100%;
  height: 70%;
  max-width: 75rem;
  max-height: 28rem;
  padding: 2rem 2rem;
  margin-left: auto;
  margin-right: auto;
  border-radius: 10px;
  background-image: linear-gradient(
    180deg,
    ${colors.lightGrey} 50%,
    ${colors.lightestGrey} 50%
  );
  ${media.desktop`
    background-image: linear-gradient(
      90deg,
      ${colors.lightGrey} 50%,
      ${colors.lightestGrey} 50%
    );
  `};
`
const Address = styled.div`
  color: ${colors.black};
  font-family: ${fonts.primary};
  font-size: ${fontSize.sm};
  font-weight: ${fontWeight.semibold};
`

const Title = styled.div`
  color: ${colors.black};
  font-family: ${fonts.primary};
  font-size: ${fontSize.xxl};
  font-weight: ${fontWeight.bold};
`

const Description = styled.div`
  color: ${colors.black};
  font-family: ${fonts.primary};
  font-size: ${fontSize.sm};
`

class Summary extends React.Component {
  static propTypes = {
    title: string.isRequired,
    address: string.isRequired,
    description: string.isRequired,
  }

  render() {
    return (
      <Wrapper>
        <Address>{this.props.address}</Address>
        <Title>{this.props.title}</Title>
        <Description>{this.props.description}</Description>
      </Wrapper>
    )
  }
}

export default Summary
