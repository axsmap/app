import { intlShape } from "react-intl";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { rgba } from "polished";
import styled from "styled-components";

import RouterLink from "../RouterLink";
import { colors, media, fontSize } from "../../styles";
import worldImage from "../../images/icons/world.png";

import messages from "./messages";

// const Wrapper = styled.div`
//   position: relative;
//   display: flex;
//   align-items: center;
//   justify-content: center;

//   height: inherit;
// `;

// const Link = styled(RouterLink)`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   height: inherit;
//   margin-right: 0.2rem;
//   padding: 0 0.5rem;
//   width: 100%;
//   color: ${colors.darkestGrey};
//   font-weight: bold;
//   font-size: ${fontSize.sm};
//   text-decoration: none;
//   text-transform: uppercase;

//   &:active,
//   &:focus {
//     box-shadow: inset 0px 0px 0px 2px ${colors.secondary};
//     outline: none;
//   }

//   &:hover {
//     color: ${colors.secondary};
//   }

//   ${media.tablet`
//     font-size: ${fontSize.xs};
//   `};

//   @media (min-width: 1200px) and (max-width: 1299px) {
//     font-size: ${fontSize.xxxs}!important;
//   }

//   ${media.desktop`
//     font-size: ${fontSize.xs};
//   `};

//   ${media.widescreen`
//     font-size: ${fontSize.sm};
//   `};
// `;

// const Image = styled.img`
//   border-radius: 100%;
//   height: 2rem;
//   width: inherit;
// `;

// const Bar = styled.div`
//   bottom: 0;
//   left: 0;
//   position: absolute;

//   display: ${(props) => (props.isVisible ? "block" : "none")};

//   height: 2px;
//   width: 100%;

//   background-color: ${colors.primary};
// `;

// const Dropdown = styled.div`
//   position: absolute;
//   right: 0;
//   top: 100%;

//   display: ${(props) => (props.isVisible ? "flex" : "none")};

//   flex-direction: column;

//   box-shadow: 0 1px 0 0 ${colors.grey};
//   padding: 0.5rem;
//   width: 100%;

//   background-color: white;

//   ${media.desktop`
//     display: ${(props) => (props.isVisible ? "flex" : "none")};
//   `};
// `;

// const Icon = styled.img`
//   height: 1.5rem;
//   padding-right: 0.5rem;
// `;

// const Button = styled.button`
//   appearance: none;
//   border: none;
//   border-radius: 3px;
//   box-shadow: none;
//   height: 3rem;
//   margin: 0;
//   padding: 0.5em;
//   width: 100%;

//   background-color: ${colors.alert};
//   cursor: pointer;

//   color: white;
//   font-size: 1rem;
//   font-weight: bold;
//   text-transform: uppercase;

//   &:active,
//   &:focus {
//     outline: 2px solid ${colors.secondary};
//   }

//   &:disabled,
//   &[disabled] {
//     background-color: ${rgba(colors.alert, 0.5)};
//     color: ${rgba("white", 0.5)};
//   }
// `;

// class LanguageDropdown extends PureComponent {
//   static propTypes = {};

//   static contextTypes = {
//     intl: intlShape,
//   };

//   state = {
//     showDropdown: true,
//   };

//   hideDropdown = () => this.setState({ showDropdown: false });

//   showDropdown = () => this.setState({ showDropdown: true });

//   render() {
//     return (
//       <Wrapper
//         onMouseEnter={this.showDropdown}
//         onMouseLeave={this.hideDropdown}
//       >
//         <Link to="/" aria-label="Select your preferred language">
//           <Icon src={worldImage} alt="Language Select" />
//           English
//         </Link>

//         <Bar isVisible={this.props.isActive} />

//         <Dropdown isVisible="{this.state.showDropdown}">
//           <Button />
//         </Dropdown>
//       </Wrapper>
//     );
//   }
// }

// export default LanguageDropdown;

// import React, { Component } from "react";
// import styled from "styled-components";

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
  padding: 0 0.5rem;
  padding-right: 1.5rem;
  width: 100%;
  color: ${colors.darkestGrey};
  font-size: 0.85rem;
  font-weight: bold;
  text-decoration: none;
  text-transform: uppercase;
  &:hover {
    color: ${colors.secondary};
  }
`;

const DropDownContent = styled.div`
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
`;

const DropDownLi = styled(StyledLi)`
  display: inline-block;
  &:hover ${DropDownContent} {
    display: block;
  }
`;

const StyledA = styled.a`
  display: inline-block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  &:hover {
    background-color: red;
  }
`;

const SubA = styled.a`
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  text-align: left;
  &:hover {
    background-color: #f1f1f1;
  }
`;

const Icon = styled.img`
  height: 1.25rem;
  padding-right: 0.5rem;
`;

class Menu extends Component {
  handleClick = (action) => {
    if (!action) return;

    if (this.props.onClick) this.props.onClick(action);
  };

  render = () => {
    return (
      <StyledUl>
        <DropDownLi>
          <Dropbtn onClick={() => this.handleClick("DropDown")}>
            <Icon srcSet={worldImage} alt="language selector" />
            Language
          </Dropbtn>
          <DropDownContent>
            {" "}
            <SubA onClick={() => this.handleClick("Link1")}>English</SubA>
            <SubA onClick={() => this.handleClick("Link2")}>Spanish</SubA>
          </DropDownContent>
        </DropDownLi>
      </StyledUl>
    );
  };
}

export default Menu;
