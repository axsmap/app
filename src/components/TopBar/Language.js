import PropTypes, { func } from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { colors } from "../../styles";

import styled from "styled-components";
import changeLocale from "../../containers/LanguageProvider/actions";

const LanguageBtn = styled.a`
  color: ${colors.darkestGrey};
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  text-align: left;
  &:hover {
    background-color: ${colors.primary};
  }
`;

class LanguageButton extends Component {
  static propTypes = {
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
      localStorage.setItem("locale", "en");
    } else if (this.props.language === "Spanish") {
      this.props.changeLocale("es");
      localStorage.setItem("locale", "es");
    }
  };

  render = () => {
    return (
      <LanguageBtn
        language={this.props.language}
        locale={this.props.locale}
        onClick={this.onClickHandler}
        className="language"
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
