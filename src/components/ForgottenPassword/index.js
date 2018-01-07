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
import Notification from '../../containers/Notification'
import NavBar from '../NavBar'
import ProgressBar from '../../containers/ProgressBar'
import TopBar from '../../containers/TopBar'

import messages from './messages'
import Wrapper from './Wrapper'

class ForgottenPassword extends PureComponent {
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

        <ProgressBar />

        <TopBar hideOn="phone,tablet" />

        <NavBar
          backURL="/sign-in"
          title={this.context.intl.formatMessage(messages.headerTitle)}
          hideOn="desktop,widescreen"
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
              width="100%"
              disabled={this.props.sendingRequest}
            >
              {this.context.intl.formatMessage(messages.formButton)}
            </Button>
          </Form>

          <Link to="/sign-in" bold>
            {this.context.intl.formatMessage(messages.signInLink)}
          </Link>
        </Container>

        <Footer isNarrow />
      </Wrapper>
    )
  }
}

ForgottenPassword.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  notificationMessage: PropTypes.string,
  data: PropTypes.shape({
    email: PropTypes.string.isRequired
  }).isRequired,
  errors: PropTypes.shape({
    email: PropTypes.string.isRequired
  }).isRequired,
  sendingRequest: PropTypes.bool.isRequired,
  clearState: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  onDataChange: PropTypes.func.isRequired,
  onInputFocus: PropTypes.func.isRequired
}

ForgottenPassword.contextTypes = {
  intl: intlShape
}

export default ForgottenPassword
