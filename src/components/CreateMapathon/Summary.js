import { array, string } from 'prop-types'
import React from 'react'
import styled, { css } from 'styled-components'

import pinIcon from '../../images/icons/pin.png'
import { colors, fonts, fontSize, fontWeight, media } from '../../styles'
import Icon from '../Icon'

import def1 from '../../images/mapathonsDefaults/def1.jpeg'
import def2 from '../../images/mapathonsDefaults/def2.jpeg'
import def3 from '../../images/mapathonsDefaults/def3.jpeg'
import def4 from '../../images/mapathonsDefaults/def4.jpeg'
import def5 from '../../images/mapathonsDefaults/def5.jpeg'

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
  overflow: hidden;

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
    description: string.isRequired,
    image: string.isRequired
  }

  state = {
    image: null
  }

  componentDidMount() {
    switch (this.props.image) {
      case 'def1':
        this.setState({ image: def1 })
        break
      case 'def2':
        this.setState({ image: def2 })
        break
      case 'def3':
        this.setState({ image: def3 })
        break
      case 'def4':
        this.setState({ image: def4 })
        break
      case 'def5':
        this.setState({ image: def5 })
        break
      default:
        this.setState({ image: this.props.image })
    }
  }

  render() {
    return (
      <Wrapper>
        <Content image>
          <img
            srcSet={this.state.image}
            alt="mapathon"
            style={{ width: '100%' }}
          />
        </Content>
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
                      size={2}
                      color={colors.darkestGrey}
                      alt="Entrance"
                      style={{ margin: 'auto 5px auto 0px' }}
                    />
                  )}
                  {this.props.focusAreas[1] && (
                    <Icon
                      glyph="interior"
                      size={2.5}
                      color={colors.darkestGrey}
                      alt="Interior"
                      style={{ margin: 'auto 5px auto 0px' }}
                    />
                  )}
                  {this.props.focusAreas[2] && (
                    <Icon
                      glyph="restroom"
                      size={2}
                      color={colors.darkestGrey}
                      alt="Restroom"
                      style={{ margin: 'auto 5px auto 0px' }}
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
