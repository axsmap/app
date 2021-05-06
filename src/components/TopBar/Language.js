import { intlShape } from "react-intl";
import PropTypes, { func } from "prop-types";
import React, { Component } from "react";

import styled from "styled-components";
import LanguageProvider from "../../containers/LanguageProvider/index";

const LanguageBtn = styled.a`
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  text-align: left;
  &:hover {
    background-color: #f1f1f1;
  }
`;

class LanguageButton extends Component {
  static propTypes = {
    onClickHandler: func.isRequired,
    locale: PropTypes.string.isRequired,
    language: PropTypes.string.isRequired,
  };

  state = {
    locale: this.props.locale,
  };

  onClickHandler = (action) => {
    if (!action) return;
    if (this.props.language === "English") {
      console.log(this.props.language);
      this.setState({ locale: "en" });
      console.log(this.state);
      LanguageProvider.props = {
        locale: this.props.locale,
        key: this.props.locale,
      };
      console.log(LanguageProvider.props);
    } else if (this.props.language === "Spanish") {
      console.log(this.props.language);
      this.setState({ locale: "es" });
      console.log(this.state);
      LanguageProvider.props = {
        locale: this.props.locale,
        key: this.props.locale,
      };
      console.log(LanguageProvider.props);
    }
  };

  render = () => {
    return (
      <LanguageBtn
        language={this.props.language}
        locale={this.props.locale}
        onClick={this.onClickHandler}
      >
        {this.props.language}
      </LanguageBtn>
    );
  };
}

export default LanguageButton;
