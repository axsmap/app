import { bool, func, number, string } from 'prop-types'
import React, { Component } from 'react'
import { intlShape } from 'react-intl'
import styled from 'styled-components'

import { colors, fonts, fontSize, media } from '../../styles'
import Button from '../Button'
import ProgressBar from './ProgressBar'
import messages from './messages'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: center;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  ${media.desktop`
    padding: 0 0 2rem;
  `};
`
const HeaderTitle = styled.h1`
  display: none;
  margin: 0 0 2rem 0;
  color: ${colors.darkestGrey};

  ${media.desktop`
    display: block;
    padding-bottom: 1rem;
    `};
`

const StepperWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  flex-grow: 1;
  padding: 1rem 1rem 2rem 1rem;
  width: 100%;
  max-width: 75rem;
  margin-left: auto;
  margin-right: auto;
  background-color: ${colors.white};
  outline: ${colors.darkGrey} solid 1px;
  border-radius: 10px;
  ${media.desktop`
    padding: 2rem 5rem;
  `};
`

const StepWrapper = styled.div`
  width: 100%;
  height: 100%;
`

const StepTitle = styled.div`
  padding: 1rem 0;
  color: ${colors.darkestGrey};
  font-family: ${fonts.tertiary}!important;
  font-size: ${fontSize.xl1};
`
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 0 1rem;
  width: 100%;

  ${media.desktop`
    position: static;
    padding: 0;
  `};
`

const ButtonContent = styled.div`
  align-items: center;
  justify-content: space-between;
`

class Step extends Component {
  static propTypes = {
    headerTitle: string.isRequired,
    stepNumber: number.isRequired,
    currentStepNumber: number.isRequired,
    stepTitle: string.isRequired,
    isFirstStep: bool.isRequired,
    isLastStep: bool.isRequired,
    isFilled: bool.isRequired,
    goNextStep: func,
    goPrevStep: func
  }

  static defaultProps = {
    isFilled: true
  }

  static contextTypes = {
    intl: intlShape
  }

  render() {
    const { formatMessage } = this.context.intl
    const display = this.props.currentStepNumber === this.props.stepNumber
    return (
      display && (
        <Wrapper>
          <HeaderTitle>{this.props.headerTitle}</HeaderTitle>
          <StepperWrapper>
            <StepWrapper>
              <ProgressBar currentStep={this.props.stepNumber} />
              <StepTitle>{this.props.stepTitle}</StepTitle>
              {this.props.children}
            </StepWrapper>
            {this.props.isFirstStep ? (
              <ButtonWrapper>
                <Button
                  className="primary-btn mx-auto is-quarter"
                  float
                  onClickHandler={() => this.props.goNextStep()}
                  disabled={!this.props.isFilled || this.props.sendingRequest}
                >
                  <ButtonContent>
                    <p style={{ margin: '0 0 0 0' }}>
                      {formatMessage(messages.continueButton)}
                    </p>
                  </ButtonContent>
                </Button>
              </ButtonWrapper>
            ) : this.props.isLastStep ? (
              <ButtonWrapper>
                <Button
                  className="gray300-btn mx-auto is-quarter"
                  float
                  disabled={this.props.sendingRequest}
                  onClickHandler={() => this.props.goPrevStep()}
                >
                  <ButtonContent>
                    <p style={{ margin: '0 0 0 0' }}>
                      {formatMessage(messages.editDetailsButton)}
                    </p>
                  </ButtonContent>
                </Button>
                <Button
                  className="primary-btn mx-auto is-quarter"
                  type="submit"
                  float
                  disabled={this.props.sendingRequest}
                  onClickHandler={() => this.props.goNextStep()}
                >
                  <ButtonContent>
                    <p style={{ margin: '0 0 0 0' }}>
                      {formatMessage(messages.confirmButton)}
                    </p>
                  </ButtonContent>
                </Button>
              </ButtonWrapper>
            ) : (
              <ButtonWrapper>
                <Button
                  className="gray300-btn mx-auto is-quarter"
                  disabled={this.props.sendingRequest}
                  onClickHandler={() => this.props.goPrevStep()}
                >
                  <ButtonContent>
                    <p style={{ margin: '0 0 0 0' }}>
                      {formatMessage(messages.backButton)}
                    </p>
                  </ButtonContent>
                </Button>
                <Button
                  className="primary-btn mx-auto is-quarter"
                  onClickHandler={() => this.props.goNextStep()}
                  disabled={!this.props.isFilled || this.props.sendingRequest}
                >
                  <ButtonContent>
                    <p style={{ margin: '0 0 0 0' }}>
                      {formatMessage(messages.continueButton)}
                    </p>
                  </ButtonContent>
                </Button>
              </ButtonWrapper>
            )}
          </StepperWrapper>
        </Wrapper>
      )
    )
  }
}

export default Step
