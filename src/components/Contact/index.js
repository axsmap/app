import { bool, func, object } from 'prop-types'
import React from 'react'
import ReactGA from 'react-ga'
import Helmet from 'react-helmet'
import { intlShape } from 'react-intl'
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

export default class Contact extends React.Component {
  static propTypes = {
    history: object.isRequired,
    sendingRequest: bool.isRequired,
    errors: object.isRequired,
    clearState: func.isRequired,
    clearError: func.isRequired,
    sendEmail: func.isRequired
  }

  static contextTypes = {
    intl: intlShape
  }

  state = {
    email: '',
    message: '',
    name: ''
  }

  componentWillUnmount() {
    this.props.clearState()
    ReactGA.pageview(window.location.pathname + window.location.search)
  }

  handleStateChange = event => {
    this.setState({ [event.target.id]: event.target.value })
  }

  render() {
    const {formatMessage} = this.context.intl

    return (
      <Wrapper>
        <Helmet title={formatMessage(messages.pageTitle)} />

        <TopBar hideOn="phone,tablet" showSearch />

        <NavBar
          hideOn="desktop,widescreen"
          isNarrow
          title={formatMessage(messages.headerTitle)}
          goBackHandler={() => this.props.history.goBack()}
        />

        <Container  className="mx-auto" >
          <Title>{formatMessage(messages.headerTitle)}</Title>

          <FormInput
            id="name"
            type="text"
            label={formatMessage(messages.nameLabel)}
            value={this.state.name}
            handler={this.handleStateChange}
            error={{
              message: this.props.errors.name,
              options: ['Is required', 'Should be less than 61 characters'],
              values: [
                formatMessage(messages.nameError1),
                formatMessage(messages.nameError2)
              ]
            }}
            onInputFocus={() => this.props.clearError('name')}
          />

          <FormInput
            id="email"
            type="email"
            label={formatMessage(messages.emailLabel)}
            value={this.state.email}
            handler={this.handleStateChange}
            error={{
              message: this.props.errors.email,
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
            onInputFocus={() => this.props.clearError('email')}
          />

          <FormInput
            id="message"
            type="textarea"
            label={formatMessage(messages.messageLabel)}
            value={this.state.message}
            error={{
              message: this.props.errors.message,
              options: ['Is required', 'Should be less than 301 characters'],
              values: [
                formatMessage(messages.messageError1),
                formatMessage(messages.messageError2)
              ]
            }}
            style={{ marginBottom: 0 }}
            handler={this.handleStateChange}
            onInputFocus={() => this.props.clearError('message')}
          />

          <ButtonWrapper>
            <Button
              type="submit"
              float
              disabled={this.props.sendingRequest}
              onClickHandler={() => this.props.sendEmail(this.state)}
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
    )
  }
}
