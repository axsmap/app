import { intlShape } from 'react-intl'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { Redirect } from 'react-router-dom'

import Button from '../Button'
import Container from '../Container'
import Footer from '../Footer'
import Form from '../Form'
import FormInput from '../FormInput'
import Logo from '../Logo'
import Message from '../Message'
import NavBar from '../NavBar'
import Toggle from '../Toggle'
import TopBar from '../../containers/TopBar'
import Wrapper from '../Wrapper'

import messages from './messages'

class ResetPassword extends PureComponent {
  componentDidMount() {
    this.props.setUrl()
  }

  render() {
    if (this.props.authenticated) {
      return <Redirect to="/" />
    }

    if (this.props.success) {
      return <Redirect to="/sign-in" />
    }

    return (
      <Wrapper>
        <Helmet title={this.context.intl.formatMessage(messages.pageTitle)} />

        <TopBar hideOn="phone,tablet" />

        <NavBar
          backURL="/"
          title={this.context.intl.formatMessage(messages.headerTitle)}
          hideOn="desktop,widescreen"
        />

        <Container>
          <Logo />

          <Form
            onSubmit={this.props.handleSubmit(this.props.location.search)}
            noValidate
          >
            {this.props.successMessage ? (
              <Message
                text={this.context.intl.formatMessage(messages.success)}
                type="success"
              />
            ) : null}

            {this.props.errorMessage ? (
              <Message
                text={this.context.intl.formatMessage(messages.error)}
                type="error"
              />
            ) : null}

            {this.props.bruteForceMessage ? (
              <Message
                text={this.context.intl.formatMessage(messages.bruteForce)}
                type="error"
              />
            ) : null}

            <FormInput
              label={this.context.intl.formatMessage(messages.password)}
              id="password"
              type={this.props.showPassword ? 'text' : 'password'}
              value={this.props.data.password}
              handler={this.props.handleChangeData}
              error={{
                message: this.props.errors.password,
                options: [
                  'Is required',
                  'Should have more than 7 characters',
                  'Should have less than 31 characters'
                ],
                values: [
                  this.context.intl.formatMessage(messages.passwordError1),
                  this.context.intl.formatMessage(messages.passwordError2),
                  this.context.intl.formatMessage(messages.passwordError3)
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

            <Button type="submit" disabled={this.props.currentlySending}>
              {this.context.intl.formatMessage(messages.formButton)}
            </Button>
          </Form>
        </Container>

        <Footer />
      </Wrapper>
    )
  }
}

ResetPassword.contextTypes = {
  intl: intlShape
}

ResetPassword.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  successMessage: PropTypes.string.isRequired,
  errorMessage: PropTypes.string.isRequired,
  bruteForceMessage: PropTypes.string.isRequired,
  data: PropTypes.shape({
    password: PropTypes.string.isRequired
  }).isRequired,
  errors: PropTypes.shape({
    password: PropTypes.string.isRequired
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired
  }),
  success: PropTypes.bool.isRequired,
  showPassword: PropTypes.bool.isRequired,
  currentlySending: PropTypes.bool.isRequired,
  setUrl: PropTypes.func.isRequired,
  handleChangeData: PropTypes.func.isRequired,
  onInputFocus: PropTypes.func.isRequired,
  handleShowPassword: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
}

export default ResetPassword
