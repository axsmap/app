import PropTypes from 'prop-types'
import React, { PureComponent, useEffect, useState } from 'react'
import ReactGA from 'react-ga'
import Helmet from 'react-helmet'
import { useIntl } from 'react-intl'
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
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

const Wrapper = styled(Wrp)`
  padding-bottom: 0 !important;
`

const SignIn = ({
  isAuthenticated,
  referrer,
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
}) => {
  const { formatMessage } = useIntl();
  const location = useLocation();
  const navigate = useNavigate();

  const [stateReferrer, setStateReferrer] = useState('');

  useEffect(() => {
    const queryParams = location.search ? new URLSearchParams(location.search) : undefined;
    setStateReferrer(queryParams ? queryParams.get('referrer') : '');
    ReactGA.pageview(window.location.pathname + window.location.search);

    return () => {
      clearState();
    };
  }, [location.search, clearState]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onFormSubmit({ referrer: stateReferrer });
  };

  if (isAuthenticated) {
    return <Navigate to={referrer || '/'} />;
  }

  return (
    <Wrapper>
      <Helmet title={formatMessage(messages.pageTitle)} />

      <TopBar hideOn="phone,tablet" />

      <NavBar
        title={formatMessage(messages.headerTitle)}
        hideOn="desktop,widescreen"
        isNarrow
        goBackHandler={() => history.goBack()}
      />

      <Container className="mx-auto">
        <Logo className="mx-auto" />

        <Form onSubmit={handleFormSubmit} noValidate className="mx-auto">
          <SocialMedia disabled={sendingRequest} />

          <FormInput
            label={formatMessage(messages.email)}
            id="email"
            type="email"
            value={data.email}
            handler={onDataChange}
            error={{
              message: errors.email,
              options: ['Is required'],
              values: [formatMessage(messages.emailError1)],
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
              options: ['Is required'],
              values: [formatMessage(messages.passwordError1)],
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

          <Button
            type="submit"
            marginBottom="1.5rem"
            width="100%"
            disabled={sendingRequest}
          >
            {formatMessage(messages.formButton)}
          </Button>
        </Form>

        <Link to="/forgotten-password" bold marginBottom="1.5rem">
          {formatMessage(messages.forgottenPasswordLink)}
        </Link>

        <Link to="/sign-up" bold color={colors.secondary}>
          {formatMessage(messages.signUpLink)}
        </Link>
      </Container>

      <Footer isNarrow />
    </Wrapper>
  );
};

SignIn.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  referrer: PropTypes.string.isRequired,
  history: PropTypes.object,
  data: PropTypes.shape({
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }).isRequired,
  errors: PropTypes.shape({
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
};

export default SignIn;