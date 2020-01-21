import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import Icon from '../Icon'
import { colors, fontSize, fontWeight, fonts } from '../../styles'

const Wrapper = styled.div`
  display: block;
  width: 100%;
`

const Label = styled.label`
  display: block;
  margin-bottom: 1.25rem;
  width: 100%;
  color: ${colors.darkGrey};
  font-size: ${fontSize.sm};
  font-weight: ${fontWeight.medium};
  font-family: ${fonts.primary};
`

const SelectWrapper = styled.div`
  position: relative;
  border-radius: 22px;
  box-shadow: inset 0px 0px 0px 1px ${colors.grey};
  height: ${props => props.height || '3rem'};
  width: 100%;
`

const Select = styled.select`
  appearance: none;
  border: none;
  border-radius: inherit;
  box-shadow: inset 0px 0px 0px 1px ${props => props.borderColor};
  height: 100%;
  margin: 0;
  padding: 0.5rem 2.5rem 0.5rem 1rem;
  width: 100%;
  background-color: white;
  color: ${colors.darkestGrey};
  text-overflow: ellipsis !important;

  &:active,
  &:focus {
    box-shadow: inset 0px 0px 0px 2px ${props => props.onFocusBorderColor};
    outline: none;
    background-color: white;
  }
`

const IconWrapper = styled.div`
  position: absolute;
  right: 0rem;
  top: 0rem;

  display: flex;

  align-items: center;
  justify-content: center;

  height: inherit;
  width: 2.5rem;

  pointer-events: none;
`

const Option = styled.option``

const OptionGroup = styled.optgroup``

const SelectBox = props => (
  <Wrapper className={props.className} style={props.style}>
    {props.label ? <Label>{props.label}</Label> : null}

    <SelectWrapper height={props.height}>
      <Select
        id={props.id}
        value={props.value}
        onChange={props.handleValueChange}
        borderColor={props.borderColor}
        onFocusBorderColor={props.onFocusBorderColor}
      >
        {props.options
          ? props.options.map(option => (
            <Option key={option.value} value={option.value}>
              {option.label}
            </Option>
            ))
          : null}

        {props.optionsGroups
          ? props.optionsGroups.map(optionGroup => (
            <OptionGroup key={optionGroup.value} label={optionGroup.label}>
              {optionGroup.options.map(option => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
                ))}
            </OptionGroup>
            ))
          : null}
      </Select>
      <IconWrapper>
        <Icon
          glyph="arrow"
          size={1}
          rotate="90deg"
          color={colors.darkestGrey}
        />
      </IconWrapper>
    </SelectWrapper>
  </Wrapper>
)

SelectBox.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  label: PropTypes.string,
  height: PropTypes.string,
  id: PropTypes.string,
  value: PropTypes.string.isRequired,
  options: PropTypes.array,
  optionsGroups: PropTypes.array,
  borderColor: PropTypes.string,
  onFocusBorderColor: PropTypes.string,
  handleValueChange: PropTypes.func.isRequired
}

SelectBox.defaultProps = {
  borderColor: colors.grey,
  onFocusBorderColor: colors.primary
}

export default SelectBox
