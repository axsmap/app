import { bool, func, number, string } from 'prop-types'
import React, { Component } from 'react'
import { useIntl } from 'react-intl'
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
  margin-top: 2rem;
  ${media.desktop`
    position: static;
    padding: 0;
  `};
`

const ButtonContent = styled.div`
  width: 7rem;
  align-items: center;
  justify-content: space-between;
`

const Step = ({
  headerTitle,
  stepNumber,
  currentStepNumber,
  stepTitle,
  isFirstStep,
  isLastStep,
  isFilled = true,
  goNextStep,
  goPrevStep,
  children,
  sendingRequest,
}) => {
  const { formatMessage } = useIntl();
  const display = currentStepNumber === stepNumber;

  return (
    display && (
      <Wrapper>
        <HeaderTitle>{headerTitle}</HeaderTitle>
        <StepperWrapper>
          <StepWrapper>
            <ProgressBar currentStep={stepNumber} />
            <StepTitle>{stepTitle}</StepTitle>
            {children}
          </StepWrapper>
          {isFirstStep ? (
            <ButtonWrapper>
              <Button
                className="primary-btn mx-auto"
                float
                onClickHandler={goNextStep}
                disabled={!isFilled || sendingRequest}
              >
                <ButtonContent>
                  <p style={{ margin: '0 0 0 0' }}>
                    {formatMessage(messages.continueButton)}
                  </p>
                </ButtonContent>
              </Button>
            </ButtonWrapper>
          ) : isLastStep ? (
            <ButtonWrapper>
              <Button
                className="gray300-btn mx-auto"
                float
                disabled={sendingRequest}
                onClickHandler={goPrevStep}
              >
                <ButtonContent>
                  <p style={{ margin: '0 0 0 0' }}>
                    {formatMessage(messages.editDetailsButton)}
                  </p>
                </ButtonContent>
              </Button>
              <Button
                className="primary-btn mx-auto"
                type="submit"
                float
                disabled={sendingRequest}
                onClickHandler={goNextStep}
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
                className="gray300-btn mx-auto"
                disabled={sendingRequest}
                onClickHandler={goPrevStep}
              >
                <ButtonContent>
                  <p style={{ margin: '0 0 0 0' }}>
                    {formatMessage(messages.backButton)}
                  </p>
                </ButtonContent>
              </Button>
              <Button
                className="primary-btn mx-auto"
                onClickHandler={goNextStep}
                disabled={!isFilled || sendingRequest}
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
  );
};

Step.propTypes = {
  headerTitle: PropTypes.string.isRequired,
  stepNumber: PropTypes.number.isRequired,
  currentStepNumber: PropTypes.number.isRequired,
  stepTitle: PropTypes.string.isRequired,
  isFirstStep: PropTypes.bool.isRequired,
  isLastStep: PropTypes.bool.isRequired,
  isFilled: PropTypes.bool,
  goNextStep: PropTypes.func,
  goPrevStep: PropTypes.func,
  children: PropTypes.node.isRequired,
  sendingRequest: PropTypes.bool,
};

export default Step
