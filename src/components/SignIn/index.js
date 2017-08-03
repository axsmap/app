/* eslint consistent-return: off */

import { intlShape } from 'react-intl'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import React from 'react'

import Button from '../Button'
import { colors } from '../../styles'
import Content from '../Content'
import Form from '../Form'
import FormInput from '../FormInput'
import Link from '../Link'
import logo from '../../images/logo.svg'
import Message from '../Message'
import SimpleHeader from '../SimpleHeader'
import Toggle from '../Toggle'
import Wrapper from '../Wrapper'

import Logo from './Logo'
import messages from './messages'

const SignIn = (props, context) =>
  <Wrapper>
    <Helmet title={context.intl.formatMessage(messages.pageTitle)} />

    <SimpleHeader
      backURL="/"
      title={context.intl.formatMessage(messages.headerTitle)}
    />

    <Content>
      <Logo src={logo} alt="AXS Map logo" />

      {props.errorMessage
        ? <Message
            text={context.intl.formatMessage(messages.error)}
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
        />

        <FormInput
          label={context.intl.formatMessage(messages.password)}
          id="password"
          type={props.showPassword ? 'text' : 'password'}
          value={props.data.password}
          handler={props.handleChangeData}
        />
        <Toggle
          active={props.showPassword}
          right
          small
          handler={props.handleShowPassword}
        >
          {context.intl.formatMessage(messages.showPassword)}
        </Toggle>

        <Button type="submit" marginBottom="1rem">
          {context.intl.formatMessage(messages.formButton)}
        </Button>
      </Form>

      <Link to="/forgotten-password" marginBottom="2rem">
        {context.intl.formatMessage(messages.forgottenPasswordLink)}
      </Link>

      <Link to="/sign-up" bold color={colors.secondary}>
        {context.intl.formatMessage(messages.signUpLink)}
      </Link>
    </Content>
  </Wrapper>

SignIn.contextTypes = {
  intl: intlShape
}

SignIn.propTypes = {
  errorMessage: PropTypes.string.isRequired,
  data: PropTypes.shape({
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
  }).isRequired,
  showPassword: PropTypes.bool.isRequired,
  handleChangeData: PropTypes.func.isRequired,
  handleShowPassword: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
}

export default SignIn
