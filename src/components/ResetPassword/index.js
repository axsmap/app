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
import ProgressBar from '../../containers/ProgressBar'
import Toggle from '../Toggle'
import TopBar from '../../containers/TopBar'

import messages from './messages'
import Wrapper from './Wrapper'

class ResetPassword extends PureComponent {
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
    } else if (this.props.messageType === 'notFound') {
      message = this.context.intl.formatMessage(messages.notFoundMessage)
    } else if (this.props.messageType === 'expired') {
      message = this.context.intl.formatMessage(messages.expiredMessage)
    } else if (this.props.messageType === 'userNotFound') {
      message = this.context.intl.formatMessage(messages.userNotFoundMessage)
    } else if (this.props.messageType === 'success') {
      return <Redirect to="/sign-in" />
    }

    return (
      <Wrapper>
        <Helmet title={this.context.intl.formatMessage(messages.pageTitle)} />

        <ProgressBar />

        <TopBar hideOn="phone,tablet" />

        <NavBar
          backURL="/sign-in"
          title={this.context.intl.formatMessage(messages.headerTitle)}
          hideOn="desktop,widescreen"
        />

        <Container>
          <Logo />

          <Form
            onSubmit={this.props.onFormSubmit(this.props.location.search)}
            noValidate
          >
            {message ? <Message text={message} type="error" /> : null}

            <FormInput
              label={this.context.intl.formatMessage(messages.password)}
              id="password"
              type={this.props.showPassword ? 'text' : 'password'}
              value={this.props.data.password}
              handler={this.props.onDataChange}
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
              handler={this.props.onShowPasswordChange}
            >
              {this.context.intl.formatMessage(messages.showPassword)}
            </Toggle>

            <Button type="submit" disabled={this.props.sendingRequest}>
              {this.context.intl.formatMessage(messages.formButton)}
            </Button>
          </Form>
        </Container>

        <Footer />
      </Wrapper>
    )
  }
}

ResetPassword.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired
  }),
  authenticated: PropTypes.bool.isRequired,
  messageType: PropTypes.string.isRequired,
  data: PropTypes.shape({
    password: PropTypes.string.isRequired
  }).isRequired,
  errors: PropTypes.shape({
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

ResetPassword.contextTypes = {
  intl: intlShape
}

export default ResetPassword
