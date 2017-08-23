import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import bottomArrowIcon from '../../images/bottom-arrow.svg'
import { colors } from '../../styles'

const Wrapper = styled.div`
  position: relative;

  border-radius: 3px;
  box-shadow: inset 0px 0px 0px 1px ${colors.darkGrey};
  height: 3rem;
  width: 100%;
`

const Select = styled.select`
  appearance: none;
  border: none;
  border-radius: inherit;
  box-shadow: inset 0px 0px 0px 1px ${colors.darkGrey};
  height: inherit;
  padding: .5rem 3.5rem .5rem 1rem;
  width: 100%;

  background-color: white;

  color: ${colors.darkestGrey};

  &:focus {
    box-shadow: inset 0px 0px 0px 2px ${colors.secondary};
    outline: none;
  }
`

const Icon = styled.img`
  position: absolute;
  right: 1rem;
  top: 1rem;

  height: 1rem;
  width: auto;

  pointer-events: none;
`

const FiltersSelect = props =>
  <Wrapper>
    <Select value={props.value} onChange={props.onChange}>
      {props.children}
    </Select>
    <Icon src={bottomArrowIcon} alt="Bottom arrow icon" />
  </Wrapper>

FiltersSelect.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

FiltersSelect.defaultProps = {
  children: null
}

export default FiltersSelect
