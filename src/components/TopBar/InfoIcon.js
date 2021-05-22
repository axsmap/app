import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import icon from "../../images/Info-Icon.svg";
import RouterLink from "../RouterLink";
import { colors, media } from "../../styles";

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
  @media screen and (max-width: 475px) and (min-width: 414px) {
    position: absolute;
    top: 10px;
    right: 35px;
  }
  @media screen and (max-width: 413px) and (min-width: 320px) {
    position: absolute;
    top: 10px;
    right: 35px;
    cursor: pointer;
  }

  ${media.tablet`
    display: flex;
    margin-left:2rem;
  `};

  ${media.desktop`
    display: flex;
  `};

  ${media.widescreen`
    // margin-left: 12rem;
    // margin-top: 7rem;
  `};
`;

const Icon = styled.img`
  height: 2rem;
`;

const InfoIcon = (props) => (
  /* eslint-disable no-unused-vars */
  <Link to="/" aria-label="Click to display info modal">
    <Icon src={icon} alt="Information icon" onClick={props.onClickHandler} />
  </Link>
  /* eslint-disable no-unused-vars */
);

InfoIcon.propTypes = {
  onClickHandler: PropTypes.func,
};

export default InfoIcon;
