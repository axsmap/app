import { array, bool, func, number, string } from 'prop-types'
import React from 'react'
import { intlShape } from 'react-intl'
import styled from 'styled-components'


import { colors, fonts, fontWeight, fontSize, media } from '../../styles'

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

class ProgressBar extends React.Component {
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
    const step = 1
    const progressPerStep = 2.4
    const progress = step * progressPerStep

    return (
      <Wrapper>
        <Title>Step 1 of 3</Title>

        <Bar style={{ width: progress + 'rem' }} />
      </Wrapper>
    )
  }
}

export default ProgressBar
