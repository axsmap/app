import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { useIntl } from "react-intl";
import { colors } from "../../styles";

import changeLocale from "../../containers/LanguageProvider/actions";

const LanguageBtn = styled.a`
  color: ${colors.gray600};
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  text-align: left;
  &:hover {
    background-color: ${colors.primary};
  }
`;

const LanguageButton = ({ locale, language, changeLocale }) => {
  const { formatMessage } = useIntl();

  const onClickHandler = (action) => {
    if (!action) return;
    switch (locale) {
      case "en":
        changeLocale("en");
        localStorage.setItem("locale", "en");
        localStorage.setItem("language", "English");
        break;
      case "es":
        changeLocale("es");
        localStorage.setItem("locale", "es");
        localStorage.setItem("language", "Español");
        break;
      case "ja":
        changeLocale("ja");
        localStorage.setItem("locale", "ja");
        localStorage.setItem("language", "日本");
        break;
      case "fr":
        changeLocale("fr");
        localStorage.setItem("locale", "fr");
        localStorage.setItem("language", "Français");
        break;
      case "zh":
        changeLocale("zh");
        localStorage.setItem("locale", "zh");
        localStorage.setItem("language", "中文");
        break;
      default:
        changeLocale("en");
        localStorage.setItem("locale", "en");
        localStorage.setItem("language", "English");
    }
  };

  return (
    <LanguageBtn
      language={language}
      locale={locale}
      onClick={() => onClickHandler(true)}
      className="language"
    >
      {language}
    </LanguageBtn>
  );
};

LanguageButton.propTypes = {
  locale: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  changeLocale: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  changeLocale: (language) => {
    dispatch(changeLocale(language));
  },
});

export default connect(null, mapDispatchToProps)(LanguageButton);
