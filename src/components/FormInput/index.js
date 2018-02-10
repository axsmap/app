import PropTypes from 'prop-types'
import React from 'react'

import Error from './Error'
import Input from './Input'
import Label from './Label'
import TextArea from './TextArea'
import Wrapper from './Wrapper'

const FormInput = props => (
  <Wrapper>
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
      <Input
        id={props.id}
        type={props.type}
        value={props.value}
        min={props.min}
        max={props.max}
        hasError={props.error.message}
        placeholder={props.placeholder}
        onChange={props.handler}
        onFocus={props.onInputFocus}
      />
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
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  placeholder: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number,
  error: PropTypes.shape({
    message: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    values: PropTypes.arrayOf(PropTypes.string).isRequired
  }),
  handler: PropTypes.func.isRequired,
  onInputFocus: PropTypes.func
}

FormInput.defaultProps = {
  error: {
    message: '',
    options: [],
    values: []
  }
}

export default FormInput
