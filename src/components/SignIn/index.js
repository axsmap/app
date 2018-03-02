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
import NavBar from '../NavBar'
import Notification from '../../containers/Notification'
import SocialMedia from '../SocialMedia'
import Toggle from '../Toggle'
import TopBar from '../../containers/TopBar'

import messages from './messages'
import Wrapper from './Wrapper'

class SignIn extends PureComponent {
  componentWillUnmount() {
    this.props.clearState()
  }

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />
    }

    return (
      <Wrapper>
        <Helmet title={this.context.intl.formatMessage(messages.pageTitle)} />

        <TopBar hideOn="phone,tablet" />

        <NavBar
          title={this.context.intl.formatMessage(messages.headerTitle)}
          hideOn="desktop,widescreen"
          isNarrow
          goBackHandler={() => this.props.history.goBack()}
        />

        {this.props.notificationMessage ? (
          <Notification
            message={this.context.intl.formatMessage(
              messages[this.props.notificationMessage]
            )}
          />
        ) : null}

        <Container>
          <Logo />

          <Form onSubmit={this.props.onFormSubmit} noValidate>
            <SocialMedia disabled={this.props.sendingRequest} />

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
              marginBottom="1.5rem"
              width="100%"
              disabled={this.props.sendingRequest}
            >
              {this.context.intl.formatMessage(messages.formButton)}
            </Button>
          </Form>

          <Link to="/forgotten-password" bold marginBottom="1.5rem">
            {this.context.intl.formatMessage(messages.forgottenPasswordLink)}
          </Link>

          <Link to="/sign-up" bold color={colors.secondary}>
            {this.context.intl.formatMessage(messages.signUpLink)}
          </Link>
        </Container>

        <Footer isNarrow />
      </Wrapper>
    )
  }
}

SignIn.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
  notificationMessage: PropTypes.string,
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
  clearState: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  onDataChange: PropTypes.func.isRequired,
  onInputFocus: PropTypes.func.isRequired,
  onShowPasswordChange: PropTypes.func.isRequired
}

SignIn.contextTypes = {
  intl: intlShape
}

export default SignIn
