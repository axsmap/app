import { intlShape } from 'react-intl'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import React from 'react'
import { Redirect } from 'react-router-dom'

import Button from '../Button'
import Content from '../Content'
import Form from '../Form'
import FormInput from '../FormInput'
import logo from '../../images/logo.svg'
import Logo from '../Logo'
import Message from '../Message'
import SimpleHeader from '../SimpleHeader'
import Toggle from '../Toggle'
import Wrapper from '../Wrapper'

import messages from './messages'

const ResetPassword = (props, context) => {
  if (props.success) {
    return <Redirect to="/sign-in" />
  }

  return (
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

        <Form onSubmit={props.handleSubmit(props.location.search)} noValidate>
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

          <Button type="submit">
            {context.intl.formatMessage(messages.formButton)}
          </Button>
        </Form>
      </Content>
    </Wrapper>
  )
}

ResetPassword.contextTypes = {
  intl: intlShape
}

ResetPassword.propTypes = {
  successMessage: PropTypes.string.isRequired,
  errorMessage: PropTypes.string.isRequired,
  data: PropTypes.shape({
    password: PropTypes.string.isRequired
  }).isRequired,
  errors: PropTypes.shape({
    password: PropTypes.string.isRequired
  }).isRequired,
  location: PropTypes.location,
  success: PropTypes.bool.isRequired,
  showPassword: PropTypes.bool.isRequired,
  handleChangeData: PropTypes.func.isRequired,
  handleShowPassword: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
}

export default ResetPassword
