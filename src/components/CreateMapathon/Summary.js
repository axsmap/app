import { string } from 'prop-types'
import React from 'react'
import styled, { css } from 'styled-components'

import { colors, fonts, fontWeight, fontSize, media } from '../../styles'

const Wrapper = styled.div`
  overflow: scroll;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  width: 100%;
  height: 70%;
  max-width: 75rem;
  min-height: 20rem;
  margin-left: auto;
  margin-right: auto;
  ${media.desktop`
    flex-direction: row;
  `};
`
const Content = styled.div`
  width: 100%;
  height: 50%;
  background-color: ${colors.lightGrey};

  ${media.desktop`
      height: 100%
      width: 50%;
    `};
  ${(props) =>
    props.image &&
    css`
      background-color: ${colors.lightGrey};
    `};
  ${(props) =>
    props.details &&
    css`
      overflow: scroll;
      padding: 1rem 1rem;
      background-color: ${colors.lightestGrey};
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
        <Content image />
        <Content details>
          <Address>{this.props.address}</Address>
          <Title>{this.props.title}</Title>
          <Description>{this.props.description}</Description>
        </Content>
      </Wrapper>
    )
  }
}

export default Summary
