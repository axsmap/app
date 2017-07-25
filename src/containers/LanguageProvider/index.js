import { connect } from 'react-redux'
import { IntlProvider } from 'react-intl'
import PropTypes from 'prop-types'
import React from 'react'

const LanguageProvider = props =>
  <IntlProvider locale={props.locale} key={props.locale} messages={props.messages[props.locale]}>
    {React.Children.only(props.children)}
  </IntlProvider>

LanguageProvider.propTypes = {
  children: PropTypes.element.isRequired,
  locale: PropTypes.string,
  messages: PropTypes.object
}

const mapStateToProps = state => ({
  locale: state.locale
})

export default connect(mapStateToProps)(LanguageProvider)
