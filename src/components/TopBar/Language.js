import { intlShape } from "react-intl";
import PropTypes, { func } from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";

import styled from "styled-components";
import LanguageProvider from "../../containers/LanguageProvider/index";
import changeLocale from "../../containers/LanguageProvider/actions";

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
      this.props.changeLocale("en");
    } else if (this.props.language === "Spanish") {
      this.props.changeLocale("es");
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

const mapDispatchToProps = (dispatch) => ({
  changeLocale: (language) => {
    dispatch(changeLocale(language));
  },
});

LanguageButton = connect(
  null,
  mapDispatchToProps
)(LanguageButton);

export default LanguageButton;
