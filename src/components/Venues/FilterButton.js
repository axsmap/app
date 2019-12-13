import { func } from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import Icon from '../Icon'
import { colors, media } from '../../styles'

const Button = styled.button`
  display: flex;

  align-items: center;
  flex-shrink: 0;
  justify-content: center;
  margin-left: 1rem !important;

  appearance: none;
  border: 0;
  border-radius: 50%;
  height: 3rem;
  margin-left: 0.7rem;
  padding: 0;
  width: 3rem;
  margin-top: 0.625rem;
  margin-bottom: 0.625rem;

  background-color: ${colors.lightGrey};
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

const FilterBtn = styled.div`
  width: 100%;
  z-index: 30;
`
const ButtonContent = styled.div`
  display: flex;
  align-items: left;
  justify-content: space-between;
`

const FilterButton = props => (
  <FilterBtn>
    <Button onClick={props.onClickHandler}>
      <ButtonContent>
        <Icon glyph="equalizer" size={1.5} color={colors.darkestGrey} />
      </ButtonContent>
    </Button>
  </FilterBtn>
)

FilterButton.propTypes = {
  onClickHandler: func.isRequired
}

export default FilterButton
