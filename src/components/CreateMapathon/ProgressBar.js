import { array, bool, func, number, string } from 'prop-types'
import React from 'react'
import { intlShape } from 'react-intl'
import styled from 'styled-components'


import { colors, fonts, fontWeight, fontSize, media } from '../../styles'

import messages from './messages'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
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
  position: relative;
  width: 100%;
  font-size: ${fontSize.sm};
  line-height: 1.5;
  transition: width 1s cubic-bezier(0.23, 1, 0.32, 1) 0s;
`

const Progress = styled.div`
  position: absolute;
  top: 15px;
  width: 100%;
  z-index: 9;
`

class StepperProgress extends React.Component {
  static propTypes = {
    stepTitles: array.isRequired,
    currentStep: number.isRequired,
  }

  static contextTypes = {
    intl: intlShape,
  }

  handleStateChange = (event) => {
    this.setState({ [event.target.id]: event.target.value })
  }

  render() {
    return (
      <Wrapper>
        <Title>Step 1 of 3</Title>

        <Bar>progress bar goes here</Bar>
      </Wrapper>
    )
  }
}

export default StepperProgress
