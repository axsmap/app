import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import { Button, ButtonGroup } from 'reactstrap'

import { colors, fontSize, fontWeight, fonts } from '../../styles'

const Wrapper = styled.div`
  display: block;
  width: 100%;
  position: relative;
`
const Label = styled.label`
  display: block;
  margin-bottom: 1.25rem;
  width: 100%;
  color: ${colors.textColor} !important;
  font-size: ${fontSize.sm};
  font-weight: ${fontWeight.medium};
  font-family: ${fonts.primary};
`
const ButtonGroupWrapper = styled.div`
  position: relative;
  display: block;
  width: 100%;
`
const CustomButtonGroup = ({
  className = '',
  size,
  style,
  label,
  id,
  value,
  options = [],
  handleValueChange,
  borderColor = colors.grey,
  onFocusBorderColor = colors.primary,
}) => (
  <Wrapper style={{ ...style, borderColor, onFocusBorderColor }}>
    <Label>{label}</Label>
    <input
      value={value}
      onChange={handleValueChange}
      type="hidden"
    />

    <ButtonGroupWrapper>
      <ButtonGroup
        className={className}
        size={size}
        id={id}
        data-value={value}
      >
        {options.map(option => (
          <Button
            data-value={option.value}
            onClick={handleValueChange}
            key={option.value}
            data-key={option.value}
            className={`${value === option.value ? 'is-active' : ''}`}
          >
            {option.label}
          </Button>
        ))}
      </ButtonGroup>
    </ButtonGroupWrapper>
  </Wrapper>
);

CustomButtonGroup.propTypes = {
  className: PropTypes.string,
  size: PropTypes.string,
  style: PropTypes.object,
  label: PropTypes.string,
  id: PropTypes.string,
  value: PropTypes.string.isRequired,
  options: PropTypes.array,
  handleValueChange: PropTypes.func.isRequired,
  borderColor: PropTypes.string,
  onFocusBorderColor: PropTypes.string,
};

export default CustomButtonGroup;
