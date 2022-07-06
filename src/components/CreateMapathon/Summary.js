import { array, string } from 'prop-types'
import React from 'react'
import styled, { css } from 'styled-components'

import { colors, fonts, fontWeight, fontSize, media } from '../../styles'
import pinIcon from '../../images/icons/pin.png'
import Icon from '../Icon'

const Wrapper = styled.div`
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  width: 100%;
  height: 70%;
  max-width: 75rem;
  max-height: 20rem;
  margin-left: auto;
  margin-right: auto;
  overflow: hidden;
  box-shadow: 3px 3px 10px ${colors.lightGrey};
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
  ${props =>
    props.image &&
    css`
      background-color: ${colors.lightGrey};
    `};
  ${props =>
    props.details &&
    css`
      padding: 1rem 1rem;
      background-color: ${colors.lightestGrey};
      overflow-y: scroll;
    `};
`

const Address = styled.div`
  color: ${colors.black};
  font-family: ${fonts.primary};
  font-size: ${fontSize.sm};
  font-weight: ${fontWeight.semibold};
`

const FocusAreas = styled.div`
  color: ${colors.black};
  display: flex;
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

const Icon2 = styled.img`
  height: 1.5rem;
  padding-right: 0.25rem;
  padding-bottom: 0.25rem;
  text-decoration: none;
  @media screen and (max-width: 475px) and (min-width: 414px) {
    padding-right: 0;
  }
`

const Line = styled.hr`
  border: 1px solid ${colors.primary};
`

class Summary extends React.Component {
  static propTypes = {
    title: string.isRequired,
    address: string.isRequired,
    focusAreas: array.isRequired,
    description: string.isRequired
  }

  render() {
    return (
      <Wrapper>
        <Content image>{this.props.image}</Content>
        <Content details>
          {this.props.address && (
            <Address>
              <Icon2 srcSet={pinIcon} />
              {this.props.address}
              {this.props.focusAreas && (
                <FocusAreas>
                  {this.props.focusAreas[0] && (
                    <Icon
                      glyph="entrylg"
                      size={1}
                      color={colors.darkestGrey}
                      alt="Entrance"
                      style={{ margin: 'auto 0' }}
                    />
                  )}
                  {this.props.focusAreas[1] && (
                    <Icon
                      glyph="interior"
                      size={1.0}
                      color={colors.darkestGrey}
                      alt="Interior"
                      style={{ margin: 'auto 0' }}
                    />
                  )}
                  {this.props.focusAreas[2] && (
                    <Icon
                      glyph="restroom"
                      size={1}
                      color={colors.darkestGrey}
                      alt="Restroom"
                      style={{ margin: 'auto 0' }}
                    />
                  )}
                </FocusAreas>
              )}
            </Address>
          )}
          <Title>{this.props.title}</Title>
          {this.props.description && (
            <Description>
              {' '}
              <Line />
              {this.props.description}
            </Description>
          )}
        </Content>
      </Wrapper>
    )
  }
}

export default Summary
