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
  border-radius: 3px;
  height: 3rem;
  padding: 0;
  width: 3rem;

  background-color: ${colors.lightGrey};
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
    <Icon glyph="equalizer" size={1.5} color={colors.darkestGrey} />
  </Button>
)

FilterButton.propTypes = {
  onClickHandler: PropTypes.func.isRequired
}

export default FilterButton
