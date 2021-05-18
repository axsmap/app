import { intlShape } from "react-intl";
import PropTypes, { func } from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { colors, media, fontSize } from "../../styles";

import styled from "styled-components";
import changeLocale from "../../containers/LanguageProvider/actions";

const LanguageBtn = styled.a`
  color: ${colors.darkestGrey}; // light mode dropdown text color
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  text-align: left;
  &:hover {
    background-color: ${colors.primary}; // dark and light mode dropdown hover color
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
