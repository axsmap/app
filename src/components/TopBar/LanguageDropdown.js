/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { colors, media, fontSize } from '../../styles'
import worldImage from '../../images/icons/world.png'

import Language from './Language'

const StyledUl = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
`

const StyledLi = styled.li`
  float: left;
`

const Dropbtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: inherit;
  min-height: 64px;
  padding: 0 0.5rem;
  padding-right: 1.5rem;
  width: 100%;
  color: ${
    colors.darkestGrey
  }; // dark mode and light mode language text color - blue
  font-size: 0.85rem;
  font-weight: bold;
  text-decoration: none;
  text-transform: uppercase;
  cursor: pointer;

  &:hover {
    color: ${
      colors.secondary
    }; // dark mode and light mode language text hover color
  }
    ${media.tablet`
    font-size: ${fontSize.xs};
  `};

  @media (min-width:1200px) and (max-width:1299px){
    font-size: ${fontSize.xxxs} !important
    padding: 8px;
  }

  ${media.desktop`
    font-size: ${fontSize.xs};
  `};

  ${media.widescreen`
    font-size: ${fontSize.sm};
  `};
`

const DropDownContent = styled.div`
  display: none;
  position: absolute;
  background-color: ${colors.white}; // dark mode and light mode dropdown box color
  min-width: 130px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;

  @media screen and (max-width: 475px) and (min-width: 414px) {
    padding-right: 0;

    position: absolute;
    top: 40px;
    right: 5px;
  }
  @media screen and (max-width: 413px) and (min-width: 320px) {
    padding-right: 0;

    position: absolute;
    top: 40px;
    right: 5px;
    cursor: pointer;
  }
`

const DropDownLi = styled(StyledLi)`
  display: inline-block;
  cursor: pointer;
  &:hover ${DropDownContent} {
    display: block;
  }
`

const Icon = styled.img`
  height: 1.25rem;
  padding-right: 0.5rem;
  text-decoration: none;

  @media screen and (max-width: 475px) and (min-width: 414px) {
    padding-right: 0;

    position: absolute;
    top: 17px;
    right: 5px;
  }
  @media screen and (max-width: 413px) and (min-width: 320px) {
    padding-right: 0;

    position: absolute;
    top: 17px;
    right: 5px;
    cursor: pointer;
  }
`

class LanguageDropdown extends Component {
  render = () => {
    LanguageDropdown.propTypes = { label: PropTypes.string.isRequired }
    return (
      <StyledUl>
        <DropDownLi>
          <Dropbtn>
            <Icon srcSet={worldImage} alt="language selector" />
            {this.props.label}
            {' '}
          </Dropbtn>
          <DropDownContent className="language">
            {' '}
            <Language
              language="English"
              locale="en"
              onClick={() => this.onClickHandler('en')}
            />
            <Language
              language="Spanish"
              locale="es"
              onClick={() => this.onClickHandler('es')}
            />
          </DropDownContent>
        </DropDownLi>
      </StyledUl>
    )
  }
}

export default LanguageDropdown
