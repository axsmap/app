import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { IntlProvider } from "react-intl";
import PropTypes from "prop-types";
import React from "react";

import makeSelectLanguage from "./selector";

const LanguageProvider = (props) => (
  <IntlProvider
    locale={props.locale}
    key={props.locale}
    messages={props.messages[props.locale]}
  >
    {React.Children.only(props.children)}
  </IntlProvider>
);

// const handleChange = (event, data) => {
//   props.setLanguage(data.value);
// };

LanguageProvider.propTypes = {
  children: PropTypes.element.isRequired,
  locale: PropTypes.string,
  messages: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  locale: makeSelectLanguage("locale"),
});

export default connect(mapStateToProps)(LanguageProvider);
