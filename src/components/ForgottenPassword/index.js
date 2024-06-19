import { useIntl } from 'react-intl'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import React, { PureComponent, useEffect } from 'react'
import ReactGA from 'react-ga'
import { Redirect, useNavigate } from 'react-router-dom'
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
import TopBar from '../../containers/TopBar'
import Wrp from '../Wrapper'

import messages from './messages'

const Wrapper = styled(Wrp)`
  padding-bottom: 0 !important;
`

const ForgottenPassword = ({
  isAuthenticated,
  history,
  data,
  errors,
  sendingRequest,
  clearState,
  onFormSubmit,
  onDataChange,
  onInputFocus,
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

        <Form onSubmit={onFormSubmit} noValidate>
          <FormInput
            label={formatMessage(messages.email)}
            id="email"
            type="email"
            value={data.email}
            handler={onDataChange}
            error={{
              message: errors.email,
              options: ['Is required', 'Should be a valid email'],
              values: [
                formatMessage(messages.emailError1),
                formatMessage(messages.emailError2),
              ],
            }}
            onInputFocus={onInputFocus}
          />

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

ForgottenPassword.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
  data: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }).isRequired,
  errors: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }).isRequired,
  sendingRequest: PropTypes.bool.isRequired,
  clearState: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  onDataChange: PropTypes.func.isRequired,
  onInputFocus: PropTypes.func.isRequired,
};

export default ForgottenPassword;