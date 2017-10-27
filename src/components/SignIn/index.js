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
import ProgressBar from '../ProgressBar'
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

    return (
      <Wrapper>
        <Helmet title={this.context.intl.formatMessage(messages.pageTitle)} />

        <ProgressBar percent={this.props.progressPercent} />

        <TopBar hideOn="phone,tablet" />

        <NavBar
          hideOn="desktop,widescreen"
          backURL="/"
          title={this.context.intl.formatMessage(messages.headerTitle)}
        />

        <Container>
          <Logo />

          <Form onSubmit={this.props.handleSubmit} noValidate>
            {this.props.errorMessage === 'Email or password incorrect' ? (
              <Message
                text={this.context.intl.formatMessage(messages.error1)}
                type="error"
              />
            ) : null}

            {this.props.errorMessage === 'Something went wrong' ? (
              <Message
                text={this.context.intl.formatMessage(messages.error1)}
                type="error"
              />
            ) : null}

            {this.props.bruteForceMessage ? (
              <Message
                text={this.context.intl.formatMessage(messages.bruteForce)}
                type="error"
              />
            ) : null}

            <SocialMedia />

            <FormInput
              label={this.context.intl.formatMessage(messages.email)}
              id="email"
              type="email"
              value={this.props.data.email}
              handler={this.props.handleChangeData}
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
              handler={this.props.handleChangeData}
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
              handler={this.props.handleShowPassword}
            >
              {this.context.intl.formatMessage(messages.showPassword)}
            </Toggle>

            <Button
              type="submit"
              marginBottom="1rem"
              disabled={this.props.currentlySending}
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

SignIn.contextTypes = {
  intl: intlShape
}

SignIn.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  progressPercent: PropTypes.number.isRequired,
  errorMessage: PropTypes.string.isRequired,
  bruteForceMessage: PropTypes.string.isRequired,
  data: PropTypes.shape({
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
  }).isRequired,
  errors: PropTypes.shape({
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
  }).isRequired,
  showPassword: PropTypes.bool.isRequired,
  currentlySending: PropTypes.bool.isRequired,
  setUrl: PropTypes.func.isRequired,
  handleChangeData: PropTypes.func.isRequired,
  onInputFocus: PropTypes.func.isRequired,
  handleShowPassword: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
}

export default SignIn
