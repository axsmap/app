import PropTypes from 'prop-types'
import React, { PureComponent, useEffect } from 'react'
import ReactGA from 'react-ga'
import Helmet from 'react-helmet'
import { useIntl } from 'react-intl'
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
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

const ResetPassword = ({
  history,
  isAuthenticated,
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
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);

    return () => {
      clearState();
    };
  }, [clearState]);

  if (isAuthenticated) {
    return navigate('/');
  }

  return (
    <Wrapper>
      <Helmet title={formatMessage(messages.pageTitle)} />

      <ProgressBar />

      <TopBar hideOn="phone,tablet" />

      <NavBar
        title={formatMessage(messages.headerTitle)}
        hideOn="desktop,widescreen"
        goBackHandler={() => history.goBack()}
      />

      <Container>
        <Logo />

        <Form onSubmit={onFormSubmit(location.search)} noValidate>
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
                'Is already used',
              ],
              values: [
                formatMessage(messages.passwordError1),
                formatMessage(messages.passwordError2),
                formatMessage(messages.passwordError3),
                formatMessage(messages.passwordError4),
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

          <Button
            type="submit"
            marginBottom="1.5rem"
            width="100%"
            disabled={sendingRequest}
          >
            {formatMessage(messages.formButton)}
          </Button>
        </Form>

        <Link to="/sign-in" bold>
          {formatMessage(messages.signInLink)}
        </Link>
      </Container>

      <Footer isNarrow />
    </Wrapper>
  );
};

ResetPassword.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired,
  }),
  isAuthenticated: PropTypes.bool.isRequired,
  data: PropTypes.shape({
    password: PropTypes.string.isRequired,
  }).isRequired,
  errors: PropTypes.shape({
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

export default ResetPassword;