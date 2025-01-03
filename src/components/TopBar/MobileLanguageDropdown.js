import React, { Component } from 'react'
import { rgba } from 'polished'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { isEmpty } from 'lodash'
import { intlShape } from 'react-intl'
import { colors, media, fontSize } from '../../styles'
import worldImage from '../../images/icons/icon-language.svg'

import Language from './Language'
import messages from './messages'

const StyledUl = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`

const StyledLi = styled.li`
  float: left;
`

const Dropbtn = styled.div` 
  align-items: center;
  justify-content: center; 
  height: inherit;
  //min-height: 64px;
  padding: .25rem 0.5rem;
  // padding-right: 1.5rem;
  width: max-content;
  color: ${
    colors.gray600
  }; // dark mode and light mode language text color - blue
  font-size: 0.85rem; 
  font-weight: 500;
  text-decoration: none; 
  cursor: pointer;
  border: .1rem solid ${colors.gray600};
  border-radius: 1.5rem;
  cursor: pointer;
  display: none;

  &:after {
    content: " ";
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 7px solid ${colors.gray500};
    margin-left: 4px;
  }

  &:hover {
    color: ${colors.secondary}; 
    filter: invert(57%) sepia(96%) saturate(4394%) hue-rotate(170deg) brightness(100%) contrast(101%);
    // dark mode and light mode language text hover color

    &:after { 
      transform: rotate(180deg);
    }
  }

  &:hover {
    color: ${colors.secondary}; 
  }
  
  @media screen and (max-width: 767px) {
    display: flex;
    position: absolute;
    top: 16px;
    right: 17px;
    max-width: fit-content;
  } 
  
  ${media.tablet`
    font-size: ${fontSize.xs};
  `};

  @media screen and (max-width: 1200px) {
    display: flex;
  }

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
    top: 48px;
    right: 1rem;
  }
  @media screen and (max-width: 413px) and (min-width: 320px) {
    padding-right: 0;
    position: absolute;
    top: 48px;
    right: 1rem;
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
  height: 0.8rem;
  padding-right: 0.25rem;
  text-decoration: none;
  color: ${colors.gray300};
  @media screen and (max-width: 475px) and (min-width: 414px) {
    cursor: pointer;
  }
  @media screen and (max-width: 413px) and (min-width: 320px) {
    cursor: pointer;
  }
`

class MobileLanguageDropdown extends Component {
  static contextTypes = {
    intl: intlShape
  }

  render = () => {
    const { formatMessage } = this.context.intl

    MobileLanguageDropdown.propTypes = { label: PropTypes.string.isRequired }
    return (
      <StyledUl>
        <DropDownLi>
          <Dropbtn>
            <Icon
              className="globe-icon"
              srcSet={worldImage}
              alt="language selector"
            />
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
              language="Español"
              locale="es"
              onClick={() => this.onClickHandler('es')}
            />
            <Language
              language="日本"
              locale="ja"
              onClick={() => this.onClickHandler('ja')}
            />
            <Language
              language="Français"
              locale="fr"
              onClick={() => this.onClickHandler('fr')}
            />
          </DropDownContent>
        </DropDownLi>
      </StyledUl>
    )
  }
}

export default MobileLanguageDropdown
