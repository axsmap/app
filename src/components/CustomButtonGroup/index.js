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
const CustomButtonGroup = props => (
  <Wrapper style={props.style}>
    <Label>{props.label}</Label>
    <input
      value={props.value}
      onChange={props.handleValueChange}
      type="hidden"
    />

    <ButtonGroupWrapper>
      <ButtonGroup
        className={props.className}
        size={props.size}
        id={props.id}
        data-value={props.value}
      >
        {props.options
          ? props.options.map(option => (
            <Button
              data-value={option.value}
              onClick={props.handleValueChange}
              key={option.value}
              data-key={option.value}
              className={`${props.value === option.value ? 'is-active' : ''}`}
            >
              {option.label}
            </Button>
            ))
          : null}
      </ButtonGroup>
    </ButtonGroupWrapper>
  </Wrapper>
)

CustomButtonGroup.propTypes = {
  className: PropTypes.string,
  size: PropTypes.string,
  style: PropTypes.object,
  label: PropTypes.string,
  id: PropTypes.string,
  value: PropTypes.string.isRequired,
  options: PropTypes.array,
  handleValueChange: PropTypes.func.isRequired
}

CustomButtonGroup.defaultProps = {
  borderColor: colors.grey,
  onFocusBorderColor: colors.primary
}

export default CustomButtonGroup
