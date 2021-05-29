import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import icon from '../../images/Info-Icon.svg'
import RouterLink from '../RouterLink'
import { colors, media } from '../../styles'

const Link = styled(RouterLink)`
  align-items: center;
  justify-content: center;

  height: inherit;
  margin-right: 1rem;

  text-decoration: none;

  &:active,
  &:focus {
    outline: 2px solid ${colors.secondary};
  }
  @media screen and (min-width: 360px) and (max-width: 413px) {
    padding-right: 0;

    position: absolute;
    top: 11px;
    right: 25px;
  }

  @media screen and (min-width: 320px) and (max-width: 475px) {
    padding-right: 0;

    position: absolute;
    top: 11px;
    right: 28px;
  }

  @media screen and (max-width: 475px) and (min-width: 414px) {
    display: flex;
  }
  @media screen and (max-width: 413px) and (min-width: 320px) {
    display: flex;
    cursor: pointer;
  }

  @media screen and (max-width: 1280px) and (min-width: 1024px) {
    display: flex;
    padding-left: 10px;
  }

  @media screen and (max-width: 1024px) and (min-width: 475px) {
    display: flex;
    padding-left: 10px;
  }

  ${media.tablet`
    display: flex;
    margin-left:1rem;
  `};

  ${media.desktop`
    // display: flex;
  `};

  ${media.widescreen`
    // display: flex;
    // margin-left:0rem;
  `};
`

const Icon = styled.img`
  height: 2rem;
`

const InfoIcon = props => (
  /* eslint-disable no-unused-vars */
  <Link to="/" aria-label="Click to display info modal">
    <Icon src={icon} alt="Information icon" onClick={props.onClickHandler} />
  </Link>
  /* eslint-disable no-unused-vars */
)

InfoIcon.propTypes = {
  onClickHandler: PropTypes.func
}

export default InfoIcon
