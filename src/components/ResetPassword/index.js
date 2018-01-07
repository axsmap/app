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
import Notification from '../../containers/Notification'
import NavBar from '../NavBar'
import ProgressBar from '../../containers/ProgressBar'
import Toggle from '../Toggle'
import TopBar from '../../containers/TopBar'

import messages from './messages'
import Wrapper from './Wrapper'

class ResetPassword extends PureComponent {
  componentWillUnmount() {
    this.props.clearState()
  }

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />
    }

    if (this.props.notificationMessage === 'successMessage') {
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

        {this.props.notificationMessage ? (
          <Notification
            message={this.context.intl.formatMessage(
              messages[this.props.notificationMessage]
            )}
          />
        ) : null}

        <Container>
          <Logo />

          <Form
            onSubmit={this.props.onFormSubmit(this.props.location.search)}
            noValidate
          >
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

            <Button
              type="submit"
              width="100%"
              disabled={this.props.sendingRequest}
            >
              {this.context.intl.formatMessage(messages.formButton)}
            </Button>
          </Form>
        </Container>

        <Footer isNarrow />
      </Wrapper>
    )
  }
}

ResetPassword.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired
  }),
  isAuthenticated: PropTypes.bool.isRequired,
  notificationMessage: PropTypes.string,
  data: PropTypes.shape({
    password: PropTypes.string.isRequired
  }).isRequired,
  errors: PropTypes.shape({
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

ResetPassword.contextTypes = {
  intl: intlShape
}

export default ResetPassword
