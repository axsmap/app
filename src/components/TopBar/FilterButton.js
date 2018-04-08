import { func, string } from 'prop-types'
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
  margin-left: 0.5rem;
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
    padding: 0 1rem;
    width: auto;
  `};
`

const ButtonContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Label = styled.p`
  display: none;

  margin: 0 0 0 0.5rem;

  color: ${colors.darkestGrey};
  font-size: 1rem;
  font-weight: bold;
  text-transform: uppercase;

  ${media.tablet`
    display: block;
  `};
`

const FilterButton = props => (
  <Button onClick={props.onClickHandler}>
    <ButtonContent>
      <Icon glyph="equalizer" size={1.5} color={colors.darkestGrey} />
      <Label>{props.label}</Label>
    </ButtonContent>
  </Button>
)

FilterButton.propTypes = {
  label: string.isRequired,
  onClickHandler: func.isRequired
}

export default FilterButton
