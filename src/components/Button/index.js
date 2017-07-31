import styled from 'styled-components'

import { colors } from '../../styles'

const Button = styled.button.attrs({ role: 'button' })`
  border: none;
  border-radius: 3px;
  box-shadow: inset 0px 0px 0px 1px ${colors.darkestGrey};
  margin-bottom: 2rem;
  padding: .5em;
  width: 100%;

  background-color: ${colors.primary};

  color: ${colors.darkestGrey};
  font-size: 1rem;
  font-weight: bold;
  text-transform: uppercase;

  &:active,
  &:focus {
    outline: 2px solid ${colors.secondary};
  }
`

export default Button
