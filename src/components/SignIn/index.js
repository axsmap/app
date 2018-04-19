import { intlShape } from 'react-intl'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'

import Button from '../Button'
import { colors } from '../../styles'
import Container from '../Container'
import Footer from '../Footer'
import Form from '../Form'
import FormInput from '../FormInput'
import Link from '../Link'
import Logo from '../Logo'
import NavBar from '../NavBar'
import SocialMedia from '../SocialMedia'
import Toggle from '../Toggle'
import TopBar from '../../containers/TopBar'
import Wrp from '../Wrapper'

import messages from './messages'

const Wrapper = styled(Wrp)`padding-bottom: 0 !important;`

class SignIn extends PureComponent {
  state = {
    referrer: ''
  }

  componentWillMount() {
    const queryParams = this.props.location.search
      ? new URLSearchParams(this.props.location.search)
      : undefined
    this.setState({ referrer: queryParams ? queryParams.get('referrer') : '' })
  }

  componentWillUnmount() {
    this.props.clearState()
  }

  onFormSubmit = e => {
    e.preventDefault()
    this.props.onFormSubmit({ referrer: this.state.referrer })
  }

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to={this.props.referrer || '/'} />
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

        <Container>
          <Logo />

          <Form onSubmit={this.onFormSubmit} noValidate>
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
  location: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  referrer: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
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
