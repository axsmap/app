import { intlShape } from 'react-intl'
import Helmet from 'react-helmet'
// import PropTypes from 'prop-types'
import React from 'react'

import Button from '../Button'
import Form from '../Form'
import FormInput from '../FormInput'
import SimpleHeader from '../SimpleHeader'
// import Toggle from '../Toggle'

import Content from './Content'
import messages from './messages'
import Wrapper from './Wrapper'

const ResetPassword = (props, context) =>
  <Wrapper>
    <Helmet title={context.intl.formatMessage(messages.pageTitle)} />
    <SimpleHeader title="" />
    <Content>
      <Form>
        <h1>
          {context.intl.formatMessage(messages.formHeader)}
        </h1>
        <FormInput
          label={context.intl.formatMessage(messages.newPassword)}
          id="newPassword"
          type="text"
          error={{
            message: '',
            options: [],
            values: []
          }}
        />
        {/* <Toggle
          active={props.showPassword}
          right
          small
          handler={props.handleShowPassword}
        >
          {context.intl.formatMessage(messages.showPassword)}
        </Toggle> */}
        <Button type="submit">
          {context.intl.formatMessage(messages.formButton)}
        </Button>
      </Form>
    </Content>
  </Wrapper>

ResetPassword.contextTypes = {
  intl: intlShape
}

export default ResetPassword
