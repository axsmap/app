import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import { colors, media } from '../../styles'
import downArrowIcon from '../../images/down-arrow.svg'

const Wrapper = styled.div`
  position: relative;

  display: none;

  flex-grow: 1;

  border-radius: 3px;
  box-shadow: inset 0px 0px 0px 1px ${colors.grey};
  height: 2.5rem;

  ${media.tablet`
    display: flex;
  `};

  ${media.desktop`
    display: flex;
    flex-grow: 0;
    width: 15rem;
  `};
`

const Select = styled.select`
  appearance: none;
  border: none;
  border-radius: inherit;
  box-shadow: inset 0px 0px 0px 1px ${colors.grey};
  height: inherit;
  margin: 0;
  padding: 0.5rem 3.5rem 0.5rem 1rem;
  width: 100%;

  background-color: ${colors.lightestGrey};

  color: ${colors.darkestGrey};
  text-overflow: ellipsis !important;

  &:active,
  &:focus {
    box-shadow: inset 0px 0px 0px 2px ${colors.primary};
    outline: none;
    background-color: white;
  }
`

const Icon = styled.img`
  position: absolute;
  right: 1rem;
  top: 0.8rem;

  height: 1rem;

  pointer-events: none;
`

const Option = styled.option``

const FilterSelectBox = props => (
  <Wrapper>
    <Select id="type" value={props.value} onChange={props.onValueChange}>
      {props.options.map(option => (
        <Option key={option.value} value={option.value}>
          {option.text}
        </Option>
      ))}
    </Select>
    <Icon src={downArrowIcon} alt="Down arrow icon" />
  </Wrapper>
)

FilterSelectBox.propTypes = {
  value: PropTypes.string.isRequired,
  onValueChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      value: PropTypes.string
    })
  ).isRequired
}

export default FilterSelectBox
