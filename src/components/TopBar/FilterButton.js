import { func, bool } from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import Icon from '../Icon'
import { colors, media } from '../../styles'

const Button = styled.button`
  display: flex;

  align-items: center;
  flex-shrink: 0;
  justify-content: center;

  appearance: none;
  border: 0;
  border-radius: 3px;
  height: 3rem;
  margin-left: 0.7rem;
  padding: 0;
  width: 3rem;
  background-color: ${({ filterApplied }) =>
    filterApplied ? colors.primary : colors.lightgrey};
  cursor: pointer;

  &:active,
  &:focus {
    box-shadow: inset 0px 0px 0px 2px ${colors.secondary};
    outline: none;
  }

  ${media.tablet`
    margin-left: 1rem;
  `};
`

const ButtonContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const FilterButton = props => (
  <Button filterApplied={props.filterApplied} onClick={props.onClickHandler}>
    <ButtonContent>
      <Icon glyph="equalizer" size={1.5} color={colors.darkestGrey} />
    </ButtonContent>
  </Button>
)

FilterButton.propTypes = {
  onClickHandler: func.isRequired,
  filterApplied: bool.isRequired
}

export default FilterButton
