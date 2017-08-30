import { rgba } from 'polished'
import styled from 'styled-components'

import { colors } from '../../styles'

const Button = styled.button.attrs({ role: 'button' })`
  border: none;
  border-radius: 3px;
  box-shadow: inset 0px 0px 0px 1px ${colors.darkestGrey};
  height: 3rem;
  margin-bottom: ${props => props.marginBottom || '0'};
  margin-top: ${props => props.marginTop || '0'};
  padding: .5em;
  width: 100%;

  background-color: ${colors.primary};
  cursor: pointer;

  color: ${colors.darkestGrey};
  font-size: 1rem;
  font-weight: bold;
  text-transform: uppercase;

  &:active,
  &:focus {
    outline: 2px solid ${colors.secondary};
  }

  &:disabled,
  &[disabled] {
    box-shadow: inset 0px 0px 0px 1px ${rgba(colors.darkestGrey, 0.5)};
    background-color: ${rgba(colors.primary, 0.5)};
    color: ${rgba(colors.darkestGrey, 0.5)};
  }
`

export default Button
