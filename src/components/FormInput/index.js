import {
  arrayOf,
  func,
  number,
  object,
  oneOfType,
  shape,
  string
} from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import { colors } from '../../styles'

import Error from './Error'
import Input from './Input'
import Label from './Label'
import TextArea from './TextArea'
import Wrapper from './Wrapper'

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`

const InputPrefix = styled.span`
  left: 0.5rem;
  position: absolute;
  top: 0.9rem;

  color: ${colors.darkestGrey};
  font-size: 1rem;
`

const FormInput = props => (
  <Wrapper className={props.className} style={props.style}>
    <Label htmlFor={props.id}>{props.label}</Label>

    {props.type === 'textarea' ? (
      <TextArea
        id={props.id}
        rows="3"
        value={props.value}
        hasError={props.error.message}
        placeholder={props.placeholder}
        onChange={props.handler}
        onFocus={props.onInputFocus}
      />
    ) : (
      <InputWrapper>
        {props.prefix ? <InputPrefix>{props.prefix}</InputPrefix> : null}
        <Input
          id={props.id}
          type={props.type}
          value={props.value}
          min={props.min}
          max={props.max}
          hasError={props.error.message}
          placeholder={props.placeholder}
          prefix={props.prefix}
          onChange={props.handler}
          onFocus={props.onInputFocus}
          onBlur={props.onInputBlur}
        />
      </InputWrapper>
    )}

    {props.error.message ? (
      <Error>
        {(() =>
          props.error.values.find(
            (value, index) => props.error.options[index] === props.error.message
          ))()}
      </Error>
    ) : null}
  </Wrapper>
)

FormInput.propTypes = {
  className: string,
  style: object,
  label: string.isRequired,
  id: string.isRequired,
  type: string.isRequired,
  value: oneOfType([string, number]),
  placeholder: string,
  min: number,
  max: number,
  error: shape({
    message: string.isRequired,
    options: arrayOf(string).isRequired,
    values: arrayOf(string).isRequired
  }),
  prefix: string,
  handler: func.isRequired,
  onInputFocus: func,
  onInputBlur: func
}

FormInput.defaultProps = {
  error: {
    message: '',
    options: [],
    values: []
  },
  prefix: ''
}

export default FormInput
