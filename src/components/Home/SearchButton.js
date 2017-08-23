import styled from 'styled-components'

import { colors } from '../../styles'

const SearchButton = styled.button`
  display: block;

  overflow: hidden;

  border: none;
  border-radius: 3px;
  box-shadow: inset 0px 0px 0px 1px ${colors.darkGrey};
  height: inherit;
  margin: 0;
  padding: .5rem .5rem .5rem 2.5rem;
  width: 100%;

  background-color: white;
  cursor: pointer;

  color: ${colors.grey};
  font-size: 1rem;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;

  &:active,
  &:focus {
    box-shadow: inset 0px 0px 0px 2px ${colors.secondary};
    outline: none;
  }
`

export default SearchButton
