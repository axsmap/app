import styled from 'styled-components'

import { colors } from '../../styles'

const FiltersButton = styled.button.attrs({ type: 'button' })`
  bottom: 1rem;
  left: 50%;
  position: absolute;

  transform: translateX(-50%);

  border: none;
  border-radius: 3px;
  box-shadow: inset 0px 0px 0px 1px ${colors.darkestGrey};
  height: 3rem;
  margin: 0;
  padding: .5em;
  width: 50%;

  background-color: ${colors.lightGrey};
  cursor: pointer;

  color: ${colors.darkestGrey};
  font-size: 1rem;
  font-weight: bold;
  text-transform: uppercase;

  &:active,
  &:focus {
    outline: 2px solid ${colors.secondary};
  }
`

export default FiltersButton
