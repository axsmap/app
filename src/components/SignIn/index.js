import { intlShape } from 'react-intl'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import React from 'react'
import { Redirect } from 'react-router-dom'

import Button from '../Button'
import { colors } from '../../styles'
import Container from '../Container'
import Form from '../Form'
import FormInput from '../FormInput'
import Link from '../Link'
import Logo from '../Logo'
import Message from '../Message'
import NavBar from '../NavBar'
import SocialMedia from '../SocialMedia'
import Toggle from '../Toggle'
import Wrapper from '../Wrapper'

import messages from './messages'

const SignIn = (props, context) => {
  if (props.authenticated) {
    return <Redirect to="/" />
  }

  return (
    <Wrapper>
      <Helmet title={context.intl.formatMessage(messages.pageTitle)} />

      <NavBar
        backURL="/"
        title={context.intl.formatMessage(messages.headerTitle)}
      />

      <Container>
        <Logo />

        <SocialMedia />

        {props.errorMessage === 'Email or password incorrect'
          ? <Message
              text={context.intl.formatMessage(messages.error1)}
              type="error"
            />
          : null}

        {props.errorMessage === 'Something went wrong'
          ? <Message
              text={context.intl.formatMessage(messages.error1)}
              type="error"
            />
          : null}

        <Form onSubmit={props.handleSubmit} noValidate>
          <FormInput
            label={context.intl.formatMessage(messages.email)}
            id="email"
            type="email"
            value={props.data.email}
            handler={props.handleChangeData}
            error={{
              message: props.errors.email,
              options: ['Is required'],
              values: [context.intl.formatMessage(messages.emailError1)]
            }}
          />

          <FormInput
            label={context.intl.formatMessage(messages.password)}
            id="password"
            type={props.showPassword ? 'text' : 'password'}
            value={props.data.password}
            handler={props.handleChangeData}
            error={{
              message: props.errors.password,
              options: ['Is required'],
              values: [context.intl.formatMessage(messages.passwordError1)]
            }}
          />
          <Toggle
            active={props.showPassword}
            right
            small
            handler={props.handleShowPassword}
          >
            {context.intl.formatMessage(messages.showPassword)}
          </Toggle>

          <Button
            type="submit"
            marginBottom="1rem"
            disabled={props.currentlySending}
          >
            {context.intl.formatMessage(messages.formButton)}
          </Button>
        </Form>

        <Link to="/forgotten-password" marginBottom="2rem">
          {context.intl.formatMessage(messages.forgottenPasswordLink)}
        </Link>

        <Link to="/sign-up" bold color={colors.secondary}>
          {context.intl.formatMessage(messages.signUpLink)}
        </Link>
      </Container>
    </Wrapper>
  )
}

SignIn.contextTypes = {
  intl: intlShape
}

SignIn.propTypes = {
  errorMessage: PropTypes.string.isRequired,
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
  authenticated: PropTypes.bool.isRequired,
  handleChangeData: PropTypes.func.isRequired,
  handleShowPassword: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
}

export default SignIn
