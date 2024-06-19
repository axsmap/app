import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import ReactGA from 'react-ga'
import Helmet from 'react-helmet'
import styled from 'styled-components'

import Button from '../Button'
import Ctn from '../Container'
import Footer from '../Footer'
import FormInput from '../FormInput'
import Icon from '../Icon'
import NavBar from '../NavBar'
import { colors, media } from '../../styles'
import TopBar from '../../containers/TopBar'
import Wrp from '../Wrapper'

import messages from './messages'

const Wrapper = styled(Wrp)`
  padding-bottom: 0;
`

const Container = styled(Ctn)`
  padding: 2rem 1rem 7rem 1rem;
  max-width: 30rem;

  ${media.desktop`
    padding: 2rem 0;
  `};
`

const Title = styled.h1`
  display: none;
  margin: 0 0 2rem 0;
  color: ${colors.darkestGrey};

  ${media.desktop`
    display: block;
  `};
`

const ButtonWrapper = styled.div`
  bottom: 2rem;
  left: 0;
  position: fixed;

  display: flex;

  justify-content: space-around;

  padding: 0 1rem;
  width: 100%;

  ${media.desktop`
    position: static;
    margin-top: 2rem;
    padding: 0;
  `};
`

const ButtonContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Contact = ({ history, sendingRequest, errors, clearState, clearError, sendEmail }) => {
  const { formatMessage } = useIntl();

  const [state, setState] = useState({
    email: '',
    message: '',
    name: ''
  });

  useEffect(() => {
    return () => {
      clearState();
      ReactGA.pageview(window.location.pathname + window.location.search);
    };
  }, [clearState]);

  const handleStateChange = (event) => {
    setState((prevState) => ({
      ...prevState,
      [event.target.id]: event.target.value
    }));
  };

  return (
    <Wrapper>
      <Helmet title={formatMessage(messages.pageTitle)} />

      <TopBar hideOn="phone,tablet" showSearch />

      <NavBar
        hideOn="desktop,widescreen"
        isNarrow
        title={formatMessage(messages.headerTitle)}
        goBackHandler={() => history.goBack()}
      />

      <Container className="mx-auto">
        <Title>{formatMessage(messages.headerTitle)}</Title>

        <FormInput
          id="name"
          type="text"
          label={formatMessage(messages.nameLabel)}
          value={state.name}
          handler={handleStateChange}
          error={{
            message: errors.name,
            options: ['Is required', 'Should be less than 61 characters'],
            values: [
              formatMessage(messages.nameError1),
              formatMessage(messages.nameError2)
            ]
          }}
          onInputFocus={() => clearError('name')}
        />

        <FormInput
          id="email"
          type="email"
          label={formatMessage(messages.emailLabel)}
          value={state.email}
          handler={handleStateChange}
          error={{
            message: errors.email,
            options: [
              'Is required',
              'Should be less than 255 characters',
              'Should be a valid email'
            ],
            values: [
              formatMessage(messages.emailError1),
              formatMessage(messages.emailError2),
              formatMessage(messages.emailError3)
            ]
          }}
          onInputFocus={() => clearError('email')}
        />

        <FormInput
          id="message"
          type="textarea"
          label={formatMessage(messages.messageLabel)}
          value={state.message}
          error={{
            message: errors.message,
            options: ['Is required', 'Should be less than 301 characters'],
            values: [
              formatMessage(messages.messageError1),
              formatMessage(messages.messageError2)
            ]
          }}
          style={{ marginBottom: 0 }}
          handler={handleStateChange}
          onInputFocus={() => clearError('message')}
        />

        <ButtonWrapper>
          <Button
            type="submit"
            float
            disabled={sendingRequest}
            onClickHandler={() => sendEmail(state)}
          >
            <ButtonContent>
              <Icon glyph="email" size={1} color={colors.darkestGrey} />
              <p style={{ margin: '0 0 0 0.5rem' }}>
                {formatMessage(messages.sendButton)}
              </p>
            </ButtonContent>
          </Button>
        </ButtonWrapper>
      </Container>

      <Footer hideOn="phone,tablet" isNarrow />
    </Wrapper>
  );
};

Contact.propTypes = {
  history: PropTypes.object.isRequired,
  sendingRequest: PropTypes.bool.isRequired,
  errors: PropTypes.object.isRequired,
  clearState: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
  sendEmail: PropTypes.func.isRequired
};

export default Contact;