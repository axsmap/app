import { intlShape } from 'react-intl'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { Redirect } from 'react-router-dom'

import Button from '../Button'
import { colors } from '../../styles'
import Container from '../Container'
import Footer from '../Footer'
import Form from '../Form'
import FormInput from '../FormInput'
import Link from '../Link'
import Logo from '../Logo'
import Message from '../Message'
import NavBar from '../NavBar'
import ProgressBar from '../../containers/ProgressBar'
import SocialMedia from '../SocialMedia'
import Toggle from '../Toggle'
import TopBar from '../../containers/TopBar'
import Wrapper from '../Wrapper'

import messages from './messages'

class SignIn extends PureComponent {
  componentDidMount() {
    this.props.setUrl()
  }

  render() {
    if (this.props.authenticated) {
      return <Redirect to="/" />
    }

    let message = ''
    if (this.props.messageType === 'timeout') {
      message = this.context.intl.formatMessage(messages.timeoutMessage)
    } else if (this.props.messageType === 'excess') {
      message = this.context.intl.formatMessage(messages.excessMessage)
    } else if (this.props.messageType === 'server') {
      message = this.context.intl.formatMessage(messages.serverMessage)
    } else if (this.props.messageType === 'fields') {
      message = this.context.intl.formatMessage(messages.fieldsMessage)
    } else if (this.props.messageType === 'block') {
      message = this.context.intl.formatMessage(messages.blockMessage)
    }

    return (
      <Wrapper>
        <Helmet title={this.context.intl.formatMessage(messages.pageTitle)} />

        <ProgressBar />

        <TopBar hideOn="phone,tablet" />

        <NavBar
          backURL="/"
          title={this.context.intl.formatMessage(messages.headerTitle)}
          hideOn="desktop,widescreen"
        />

        <Container>
          <Logo />

          <Form onSubmit={this.props.onFormSubmit} noValidate>
            {message ? <Message text={message} type="error" /> : null}

            <SocialMedia />

            <FormInput
              label={this.context.intl.formatMessage(messages.email)}
              id="email"
              type="email"
              value={this.props.data.email}
              handler={this.props.onDataChange}
              error={{
                message: this.props.errors.email,
                options: ['Is required'],
                values: [this.context.intl.formatMessage(messages.emailError1)]
              }}
              onInputFocus={this.props.onInputFocus}
            />

            <FormInput
              label={this.context.intl.formatMessage(messages.password)}
              id="password"
              type={this.props.showPassword ? 'text' : 'password'}
              value={this.props.data.password}
              handler={this.props.onDataChange}
              error={{
                message: this.props.errors.password,
                options: ['Is required'],
                values: [
                  this.context.intl.formatMessage(messages.passwordError1)
                ]
              }}
              onInputFocus={this.props.onInputFocus}
            />
            <Toggle
              active={this.props.showPassword}
              right
              small
              handler={this.props.onShowPasswordChange}
            >
              {this.context.intl.formatMessage(messages.showPassword)}
            </Toggle>

            <Button
              type="submit"
              marginBottom="1rem"
              disabled={this.props.sendingRequest}
            >
              {this.context.intl.formatMessage(messages.formButton)}
            </Button>
          </Form>

          <Link to="/forgotten-password" marginBottom="2rem">
            {this.context.intl.formatMessage(messages.forgottenPasswordLink)}
          </Link>

          <Link to="/sign-up" bold color={colors.secondary}>
            {this.context.intl.formatMessage(messages.signUpLink)}
          </Link>
        </Container>

        <Footer />
      </Wrapper>
    )
  }
}

SignIn.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  messageType: PropTypes.string.isRequired,
  data: PropTypes.shape({
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
  }).isRequired,
  errors: PropTypes.shape({
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
  }).isRequired,
  showPassword: PropTypes.bool.isRequired,
  sendingRequest: PropTypes.bool.isRequired,
  setUrl: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  onDataChange: PropTypes.func.isRequired,
  onInputFocus: PropTypes.func.isRequired,
  onShowPasswordChange: PropTypes.func.isRequired
}

SignIn.contextTypes = {
  intl: intlShape
}

export default SignIn
