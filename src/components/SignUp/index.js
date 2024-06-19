import PropTypes from 'prop-types'
import React, { PureComponent, useEffect } from 'react'
import ReactGA from 'react-ga'
import Helmet from 'react-helmet'
import { useIntl } from 'react-intl'
import { Navigate, useNavigate } from 'react-router-dom';
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

const SignUp = ({
  isAuthenticated,
  history,
  data,
  errors,
  showPassword,
  sendingRequest,
  clearState,
  onFormSubmit,
  onDataChange,
  onInputFocus,
  onShowPasswordChange,
  onIsSubscribedChange,
}) => {
  const { formatMessage } = useIntl();
  const navigate = useNavigate();

  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);

    return () => {
      clearState();
    };
  }, [clearState]);

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <Wrapper>
      <Helmet title={formatMessage(messages.pageTitle)} />

      <ProgressBar />

      <TopBar hideOn="phone,tablet" />

      <NavBar
        hideOn="desktop,widescreen"
        title={formatMessage(messages.headerTitle)}
        goBackHandler={() => history.goBack()}
      />

      <Container className="mx-auto">
        <Logo />

        <Form onSubmit={onFormSubmit} noValidate>
          <FormInput
            label={formatMessage(messages.firstName)}
            id="firstName"
            type="text"
            value={data.firstName}
            handler={onDataChange}
            error={{
              message: errors.firstName,
              options: [
                'Is required',
                'Should only have letters',
                'Should have less than 25 characters',
              ],
              values: [
                formatMessage(messages.firstNameError1),
                formatMessage(messages.firstNameError2),
                formatMessage(messages.firstNameError3),
              ],
            }}
            onInputFocus={onInputFocus}
          />

          <FormInput
            label={formatMessage(messages.lastName)}
            id="lastName"
            type="text"
            value={data.lastName}
            handler={onDataChange}
            error={{
              message: errors.lastName,
              options: [
                'Is required',
                'Should only have letters',
                'Should have less than 37 characters',
              ],
              values: [
                formatMessage(messages.lastNameError1),
                formatMessage(messages.lastNameError2),
                formatMessage(messages.lastNameError3),
              ],
            }}
            onInputFocus={onInputFocus}
          />

          <FormInput
            label={formatMessage(messages.email)}
            id="email"
            type="email"
            value={data.email}
            handler={onDataChange}
            error={{
              message: errors.email,
              options: [
                'Is required',
                'Should have less than 255 characters',
                'Should be a valid email',
                'Is already taken',
              ],
              values: [
                formatMessage(messages.emailError1),
                formatMessage(messages.emailError2),
                formatMessage(messages.emailError3),
                formatMessage(messages.emailError4),
              ],
            }}
            onInputFocus={onInputFocus}
          />

          <FormInput
            label={formatMessage(messages.password)}
            id="password"
            type={showPassword ? 'text' : 'password'}
            value={data.password}
            handler={onDataChange}
            error={{
              message: errors.password,
              options: [
                'Is required',
                'Should have more than 7 characters',
                'Should have less than 31 characters',
              ],
              values: [
                formatMessage(messages.passwordError1),
                formatMessage(messages.passwordError2),
                formatMessage(messages.passwordError3),
              ],
            }}
            onInputFocus={onInputFocus}
          />
          <Toggle
            active={showPassword}
            right
            small
            handler={onShowPasswordChange}
          >
            {formatMessage(messages.showPassword)}
          </Toggle>

          <Toggle
            active={data.isSubscribed}
            handler={onIsSubscribedChange}
          >
            {formatMessage(messages.isSubscribed)}
          </Toggle>

          <Button
            type="submit"
            marginBottom="1.5rem"
            width="100%"
            disabled={sendingRequest}
          >
            {formatMessage(messages.formButton)}
          </Button>
        </Form>

        <Link to="/sign-in" href="/#" bold>
          {formatMessage(messages.signInLink)}
        </Link>
      </Container>

      <Footer isNarrow />
    </Wrapper>
  );
};

SignUp.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
  data: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    isSubscribed: PropTypes.bool.isRequired,
    password: PropTypes.string.isRequired,
  }).isRequired,
  errors: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }).isRequired,
  showPassword: PropTypes.bool.isRequired,
  sendingRequest: PropTypes.bool.isRequired,
  clearState: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  onDataChange: PropTypes.func.isRequired,
  onInputFocus: PropTypes.func.isRequired,
  onShowPasswordChange: PropTypes.func.isRequired,
  onIsSubscribedChange: PropTypes.func.isRequired,
};

export default SignUp;
