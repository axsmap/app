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
import Link from '../Link'
import Logo from '../Logo'
import Message from '../Message'
import NavBar from '../NavBar'
import ProgressBar from '../../containers/ProgressBar'
import TopBar from '../../containers/TopBar'
import Wrapper from '../Wrapper'

import messages from './messages'

class ForgottenPassword extends PureComponent {
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
    } else if (this.props.messageType === 'success') {
      message = this.context.intl.formatMessage(messages.successMessage)
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

          <Form onSubmit={this.props.onFormSubmit} noValidate>
            {message ? (
              <Message
                text={message}
                type={
                  this.props.messageType === 'success' ? 'success' : 'error'
                }
              />
            ) : null}

            <FormInput
              label={this.context.intl.formatMessage(messages.email)}
              id="email"
              type="email"
              value={this.props.data.email}
              handler={this.props.onDataChange}
              error={{
                message: this.props.errors.email,
                options: ['Is required', 'Should be a valid email'],
                values: [
                  this.context.intl.formatMessage(messages.emailError1),
                  this.context.intl.formatMessage(messages.emailError2)
                ]
              }}
              onInputFocus={this.props.onInputFocus}
            />

            <Button
              type="submit"
              marginBottom="2rem"
              disabled={this.props.sendingRequest}
            >
              {this.context.intl.formatMessage(messages.formButton)}
            </Button>
          </Form>

          <Link to="/sign-in">
            {this.context.intl.formatMessage(messages.signInLink)}
          </Link>
        </Container>

        <Footer />
      </Wrapper>
    )
  }
}

ForgottenPassword.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  messageType: PropTypes.string.isRequired,
  data: PropTypes.shape({
    email: PropTypes.string.isRequired
  }).isRequired,
  errors: PropTypes.shape({
    email: PropTypes.string.isRequired
  }).isRequired,
  sendingRequest: PropTypes.bool.isRequired,
  setUrl: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  onDataChange: PropTypes.func.isRequired,
  onInputFocus: PropTypes.func.isRequired
}

ForgottenPassword.contextTypes = {
  intl: intlShape
}

export default ForgottenPassword
