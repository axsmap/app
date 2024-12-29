import PropTypes, { func } from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { intlShape } from 'react-intl'
import { colors } from '../../styles'

import changeLocale from '../../containers/LanguageProvider/actions'
import messages from './messages'

const LanguageBtn = styled.a`
  color: ${colors.gray600};
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  text-align: left;
  &:hover {
    background-color: ${colors.primary};
  }
`

class LanguageButton extends Component {
  static propTypes = {
    locale: PropTypes.string.isRequired,
    language: PropTypes.string.isRequired
  }

  state = {
    locale: this.props.locale
  }

  static contextTypes = {
    intl: intlShape
  }

  onClickHandler = action => {
    if (!action) return
    switch (this.props.locale) {
      case 'en':
        this.props.changeLocale('en')
        localStorage.setItem('locale', 'en')
        localStorage.setItem('language', 'English')
        break
      case 'es':
        this.props.changeLocale('es')
        localStorage.setItem('locale', 'es')
        localStorage.setItem('language', 'Español')
        break
      case 'ja':
        this.props.changeLocale('ja')
        localStorage.setItem('locale', 'ja')
        localStorage.setItem('language', '日本')
        break
      case 'fr':
        this.props.changeLocale('fr')
        localStorage.setItem('locale', 'fr')
        localStorage.setItem('language', 'Français')
        break
      default:
        this.props.changeLocale('en')
        localStorage.setItem('locale', 'en')
        localStorage.setItem('language', 'English')
    }
  }

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
    )
  }
}

const mapDispatchToProps = dispatch => ({
  changeLocale: language => {
    dispatch(changeLocale(language))
  }
})

LanguageButton = connect(
  null,
  mapDispatchToProps
)(LanguageButton)

export default LanguageButton
