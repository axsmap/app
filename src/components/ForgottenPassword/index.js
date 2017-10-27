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

          <Form onSubmit={this.props.handleSubmit} noValidate>
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
              label={this.context.intl.formatMessage(messages.email)}
              id="email"
              type="email"
              value={this.props.data.email}
              handler={this.props.handleChangeData}
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
              disabled={this.props.currentlySending}
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

ForgottenPassword.contextTypes = {
  intl: intlShape
}

ForgottenPassword.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  successMessage: PropTypes.string.isRequired,
  errorMessage: PropTypes.string.isRequired,
  bruteForceMessage: PropTypes.string.isRequired,
  data: PropTypes.shape({
    email: PropTypes.string.isRequired
  }).isRequired,
  errors: PropTypes.shape({
    email: PropTypes.string.isRequired
  }).isRequired,
  currentlySending: PropTypes.bool.isRequired,
  setUrl: PropTypes.func.isRequired,
  handleChangeData: PropTypes.func.isRequired,
  onInputFocus: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
}

export default ForgottenPassword
