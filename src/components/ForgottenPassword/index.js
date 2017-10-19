import { intlShape } from 'react-intl'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import React from 'react'

import Button from '../Button'
import Container from '../Container'
import Form from '../Form'
import FormInput from '../FormInput'
import Link from '../Link'
import Logo from '../Logo'
import Message from '../Message'
import NavBar from '../NavBar'
import Wrapper from '../Wrapper'

import messages from './messages'

const ForgottenPassword = (props, context) =>
  <Wrapper>
    <Helmet title={context.intl.formatMessage(messages.pageTitle)} />

    <NavBar
      backURL="/"
      title={context.intl.formatMessage(messages.headerTitle)}
    />

    <Container>
      <Logo />

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

      {props.bruteForceMessage
        ? <Message
            text={context.intl.formatMessage(messages.bruteForce)}
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
            options: ['Is required', 'Should be a valid email'],
            values: [
              context.intl.formatMessage(messages.emailError1),
              context.intl.formatMessage(messages.emailError2)
            ]
          }}
        />

        <Button
          type="submit"
          marginBottom="2rem"
          disabled={props.currentlySending}
        >
          {context.intl.formatMessage(messages.formButton)}
        </Button>
      </Form>

      <Link to="/sign-in">
        {context.intl.formatMessage(messages.signInLink)}
      </Link>
    </Container>
  </Wrapper>

ForgottenPassword.contextTypes = {
  intl: intlShape
}

ForgottenPassword.propTypes = {
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
  handleChangeData: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
}

export default ForgottenPassword
