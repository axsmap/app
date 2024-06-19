import { number } from 'prop-types'
import React from 'react'
import { useIntl } from 'react-intl'
import styled from 'styled-components'

import { fonts, fontWeight, fontSize } from '../../styles'
import messages from './messages'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-top: 1rem 0;
`
const Title = styled.div`
  width: 100%;
  font-family: ${fonts.primary};
  font-weight: ${fontWeight.bold};
  font-size: ${fontSize.xs};
  color: #6848ff;
`
const Bar = styled.div`
  z-index: 3
  width: 100%;
  height: 5px;
  background: #6848ff;
  transition: width 1s cubic-bezier(0.23, 1, 0.32, 1) 0s;

  &:before {
    content: "";
    background: transparent;
    outline: #6848ff solid 1px;
    position: absolute;
    height: 5px;
    width: 7.5rem;
    z-index: -1
`

const ProgressBar = ({ currentStep }) => {
  const { formatMessage } = useIntl();
  const max = 3;
  const progressPerStep = 2.5;
  const progress = currentStep * progressPerStep;

  return (
    <Wrapper>
      {currentStep <= max ? (
        <>
          <Title>
            {formatMessage(messages.stepCount1)} {currentStep}{' '}
            {formatMessage(messages.stepCount2)} 3
          </Title>
          <Bar style={{ width: `${progress}rem` }} />
        </>
      ) : (
        <>
          <Title>{formatMessage(messages.stepConfirm)}</Title>
          <Bar style={{ width: `${max * progressPerStep}rem` }} />
        </>
      )}
    </Wrapper>
  );
};

ProgressBar.propTypes = {
  currentStep: PropTypes.number.isRequired,
};

export default ProgressBar;