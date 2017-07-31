import PropTypes from 'prop-types'
import React from 'react'

import Error from './Error'
import Input from './Input'
import Label from './Label'
import Wrapper from './Wrapper'

const FormInput = props =>
  <Wrapper>
    <Label htmlFor={props.id}>
      {props.label}
    </Label>
    <Input
      id={props.id}
      type={props.type}
      value={props.value}
      onChange={props.handler}
    />
    {props.error.message
      ? <Error>
          {(() =>
            props.error.values.find(
              (value, index) =>
                props.error.options[index] === props.error.message
            ))()}
        </Error>
      : null}
  </Wrapper>

FormInput.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handler: PropTypes.func.isRequired,
  error: PropTypes.shape({
    message: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    values: PropTypes.arrayOf(PropTypes.string).isRequired
  }).isRequired
}

export default FormInput
