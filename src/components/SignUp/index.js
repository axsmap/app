/* eslint consistent-return: off */

import { intlShape } from 'react-intl'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import React from 'react'

import Button from '../Button'
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

const SignUp = (props, context) =>
  <Wrapper>
    <Helmet title={context.intl.formatMessage(messages.pageTitle)} />

    <SimpleHeader
      backURL="/"
      title={context.intl.formatMessage(messages.headerTitle)}
    />

    <Content>
      <Logo src={logo} alt="AXS Map logo" />

      {props.successMessage
        ? <Message
            text={context.intl.formatMessage(messages.success)}
            type="success"
          />
        : null}

      {props.errorMessage
        ? <Message
            text={context.intl.formatMessage(messages.error)}
            type="error"
          />
        : null}

      <Form onSubmit={props.handleSubmit} noValidate>
        <FormInput
          label={context.intl.formatMessage(messages.firstName)}
          id="firstName"
          type="text"
          value={props.data.firstName}
          handler={props.handleChangeData}
          error={{
            message: props.errors.firstName,
            options: [
              'Is required',
              'Should have less than 25 characters',
              'Should only be one name'
            ],
            values: [
              context.intl.formatMessage(messages.firstNameError1),
              context.intl.formatMessage(messages.firstNameError2),
              context.intl.formatMessage(messages.firstNameError3)
            ]
          }}
        />

        <FormInput
          label={context.intl.formatMessage(messages.lastName)}
          id="lastName"
          type="text"
          value={props.data.lastName}
          handler={props.handleChangeData}
          error={{
            message: props.errors.lastName,
            options: [
              'Is required',
              'Should have less than 37 characters',
              'Should only be one surname'
            ],
            values: [
              context.intl.formatMessage(messages.lastNameError1),
              context.intl.formatMessage(messages.lastNameError2),
              context.intl.formatMessage(messages.lastNameError3)
            ]
          }}
        />

        <FormInput
          label={context.intl.formatMessage(messages.email)}
          id="email"
          type="email"
          value={props.data.email}
          handler={props.handleChangeData}
          error={{
            message: props.errors.email,
            options: [
              'Is required',
              'Should have less than 255 characters',
              'Should be a valid email',
              'Is already taken'
            ],
            values: [
              context.intl.formatMessage(messages.emailError1),
              context.intl.formatMessage(messages.emailError2),
              context.intl.formatMessage(messages.emailError3),
              context.intl.formatMessage(messages.emailError4)
            ]
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
            options: [
              'Is required',
              'Should have more than 7 characters',
              'Should have less than 31 characters'
            ],
            values: [
              context.intl.formatMessage(messages.passwordError1),
              context.intl.formatMessage(messages.passwordError2),
              context.intl.formatMessage(messages.passwordError3)
            ]
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

        <Toggle
          active={props.data.isSubscribed}
          handler={props.handleIsSubscribed}
        >
          {context.intl.formatMessage(messages.isSubscribed)}
        </Toggle>

        <Button type="submit" marginBottom="2rem">
          {context.intl.formatMessage(messages.formButton)}
        </Button>
      </Form>

      <Link to="/sign-in">
        {context.intl.formatMessage(messages.signInLink)}
      </Link>
    </Content>
  </Wrapper>

SignUp.contextTypes = {
  intl: intlShape
}

SignUp.propTypes = {
  successMessage: PropTypes.string.isRequired,
  errorMessage: PropTypes.string.isRequired,
  data: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    isSubscribed: PropTypes.bool.isRequired,
    password: PropTypes.string.isRequired
  }).isRequired,
  errors: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
  }).isRequired,
  showPassword: PropTypes.bool.isRequired,
  handleChangeData: PropTypes.func.isRequired,
  handleShowPassword: PropTypes.func.isRequired,
  handleIsSubscribed: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
}

export default SignUp
