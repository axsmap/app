import { array, bool, func, number, string } from 'prop-types'
import React from 'react'
import { intlShape } from 'react-intl'
import styled from 'styled-components'

import Button from '../Button'
import Dialog from '../Dialog'
import Icon from '../Icon'

import { colors, fonts, fontWeight, fontSize, media } from '../../styles'

import messages from './messages'

const Wrapper = styled.div`
  width: 90%;
  position: relative;
  display: flex;
  margin: auto;
  justify-content: space-between;
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

const Title = styled.div`
  text-align: center;
  font-size: 0.7rem;
  align-items: center;
  background: #fff;
  padding: 0 1rem;
  height: 30px;
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
        <Bar />
        <Title />
      </Wrapper>
    )
  }
}

export default StepperProgress
