import React from 'react'
import styled from 'styled-components'

import { colors, media } from '../../styles'
import filterIcon from '../../images/filter.svg'

const Button = styled.button`
  display: flex;

  align-items: center;
  justify-content: center;

  appearance: none;
  border: 0;
  height: 2.5rem;
  padding: 0;
  width: 2.5rem;

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

const Icon = styled.img`height: 1.8rem;`

const FilterButton = () => (
  <Button>
    <Icon src={filterIcon} />
  </Button>
)

export default FilterButton
