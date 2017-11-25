import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import Icon from '../Icon'
import { colors, media } from '../../styles'

const Button = styled.button`
  display: flex;

  align-items: center;
  justify-content: center;

  appearance: none;
  border: 0;
  height: 2.5rem;
  padding: 0;

  background-color: transparent;
  cursor: pointer;

  &:active,
  &:focus {
    box-shadow: inset 0px 0px 0px 2px ${colors.secondary};
    outline: none;
  }

  ${media.tablet`
    display: none;
  `};
`

const FilterButton = props => (
  <Button onClick={props.onClickHandler}>
    <Icon glyph="filter" size={1.5} color={colors.darkestGrey} />
  </Button>
)

FilterButton.propTypes = {
  onClickHandler: PropTypes.func.isRequired
}

export default FilterButton
