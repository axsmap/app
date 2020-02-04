import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import ReactGA from 'react-ga'
import Helmet from 'react-helmet'
import { intlShape } from 'react-intl'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'

import Button from '../Button'
import Container from '../Container'
import Footer from '../Footer'
import Form from '../Form'
import FormInput from '../FormInput'
import Link from '../Link'
import Logo from '../Logo'
import NavBar from '../NavBar'
import ProgressBar from '../../containers/ProgressBar'
import Toggle from '../Toggle'
import TopBar from '../../containers/TopBar'
import Wrp from '../Wrapper'

import messages from './messages'

const Wrapper = styled(Wrp)`
  padding-bottom: 0 !important;
`

class ResetPassword extends PureComponent {
  componentWillMount() {
    ReactGA.pageview(window.location.pathname + window.location.search)
  }

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

        <TopBar hideOn="phone,tablet" showSearch />

        <NavBar
          title={this.context.intl.formatMessage(messages.headerTitle)}
          hideOn="desktop,widescreen"
          goBackHandler={() => this.props.history.goBack()}
        />

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
                  'Should have less than 31 characters',
                  'Is already used'
                ],
                values: [
                  this.context.intl.formatMessage(messages.passwordError1),
                  this.context.intl.formatMessage(messages.passwordError2),
                  this.context.intl.formatMessage(messages.passwordError3),
                  this.context.intl.formatMessage(messages.passwordError4)
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

          <Link to="/sign-in" bold>
            {this.context.intl.formatMessage(messages.signInLink)}
          </Link>
        </Container>

        <Footer isNarrow />
      </Wrapper>
    )
  }
}

ResetPassword.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired
  }),
  isAuthenticated: PropTypes.bool.isRequired,
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
