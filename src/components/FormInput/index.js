import PropTypes from 'prop-types'
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

const FormInput = ({
  className,
  style,
  label,
  id,
  type,
  value,
  placeholder,
  min,
  max,
  error = { message: '', options: [], values: [] },
  prefix = '',
  handler,
  onInputFocus,
  onInputBlur,
}) => (
  <Wrapper className={className} style={style}>
    <Label htmlFor={id}>{label}</Label>

    {type === 'textarea' ? (
      <TextArea
        id={id}
        rows="3"
        value={value}
        $hasError={error.message}
        placeholder={placeholder}
        onChange={handler}
        onFocus={onInputFocus}
      />
    ) : (
      <InputWrapper>
        {prefix ? <InputPrefix>{prefix}</InputPrefix> : null}
        <Input
          id={id}
          type={type}
          value={value}
          min={min}
          max={max}
          $hasError={error.message}
          placeholder={placeholder}
          $prefix={prefix}
          onChange={handler}
          onFocus={onInputFocus}
          onBlur={onInputBlur}
        />
      </InputWrapper>
    )}

    {error.message ? (
      <Error>
        {error.values.find((value, index) => error.options[index] === error.message)}
      </Error>
    ) : null}
  </Wrapper>
);

FormInput.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
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
    values: PropTypes.arrayOf(PropTypes.string).isRequired,
  }),
  prefix: PropTypes.string,
  handler: PropTypes.func.isRequired,
  onInputFocus: PropTypes.func,
  onInputBlur: PropTypes.func,
};

export default FormInput
