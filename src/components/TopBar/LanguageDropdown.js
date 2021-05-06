import { intlShape } from "react-intl";
import PropTypes, { func } from "prop-types";
import React, { Component } from "react";
import { rgba } from "polished";
import styled from "styled-components";

import RouterLink from "../RouterLink";
import { colors, media, fontSize } from "../../styles";
import worldImage from "../../images/icons/world.png";

import messages from "./messages";
import Language from "./Language";

const StyledUl = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
`;

const StyledLi = styled.li`
  float: left;
`;

const Dropbtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: inherit;
  min-height: 64px;
  padding: 0 0.5rem;
  padding-right: 1.5rem;
  width: 100%;
  color: ${colors.darkestGrey};
  font-size: 0.85rem;
  font-weight: bold;
  text-decoration: none;
  text-transform: uppercase;
  cursor: pointer;
  &:hover {
    color: ${colors.secondary};
  }
`;

const DropDownContent = styled.div`
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 130px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
`;

const DropDownLi = styled(StyledLi)`
  display: inline-block;
  cursor: pointer;
  &:hover ${DropDownContent} {
    display: block;
  }
`;

const Icon = styled.img`
  height: 1.25rem;
  padding-right: 0.5rem;
`;

class Menu extends Component {
  render = () => {
    return (
      <StyledUl>
        <DropDownLi>
          <Dropbtn>
            <Icon srcSet={worldImage} alt="language selector" />
            Language
          </Dropbtn>
          <DropDownContent>
            {" "}
            <Language
              language="English"
              locale="en"
              onClick={() => this.onClickHandler("en")}
            />
            <Language
              language="Spanish"
              locale="es"
              onClick={() => this.onClickHandler("es")}
            />
          </DropDownContent>
        </DropDownLi>
      </StyledUl>
    );
  };
}

export default Menu;
