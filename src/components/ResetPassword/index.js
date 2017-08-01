import { intlShape } from 'react-intl'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import React from 'react'

import Button from '../Button'
import Form from '../Form'
import FormInput from '../FormInput'
import logo from '../../images/logo.svg'
import Message from '../Message'
import SimpleHeader from '../SimpleHeader'
import Toggle from '../Toggle'

import Content from './Content'
import Logo from './Logo'
import messages from './messages'
import Wrapper from './Wrapper'

const ResetPassword = (props, context) =>
  <Wrapper>
    <Helmet title={context.intl.formatMessage(messages.pageTitle)} />

    <SimpleHeader title={context.intl.formatMessage(messages.headerTitle)} />

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
          label={context.intl.formatMessage(messages.newPassword)}
          id="newPassword"
          type={props.showPassword ? 'text' : 'password'}
          value={props.data.newPassword}
          handler={props.handleChangeData}
          error={{
            message: props.errors.newPassword,
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

        <Button type="submit">
          {context.intl.formatMessage(messages.formButton)}
        </Button>
      </Form>
    </Content>
  </Wrapper>

ResetPassword.contextTypes = {
  intl: intlShape
}

ResetPassword.propTypes = {
  successMessage: PropTypes.string.isRequired,
  errorMessage: PropTypes.string.isRequired,
  data: PropTypes.shape({
    newPassword: PropTypes.string.isRequired
  }).isRequired,
  errors: PropTypes.shape({
    newPassword: PropTypes.string.isRequired
  }).isRequired,
  showPassword: PropTypes.bool.isRequired,
  handleChangeData: PropTypes.func.isRequired,
  handleShowPassword: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
}

export default ResetPassword
