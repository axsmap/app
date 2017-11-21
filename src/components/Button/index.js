import { rgba } from 'polished'
import styled from 'styled-components'

import { colors } from '../../styles'

const Button = styled.button.attrs({ role: 'button' })`
  appearance: none;
  border: none;
  border-radius: ${props => props.borderRadius || '3px'};
  box-shadow: none;
  height: 3rem;
  margin-bottom: ${props => props.marginBottom || '0'};
  margin-top: ${props => props.marginTop || '0'};
  padding: 0.5rem;
  width: 100%;

  background-color: ${props => props.backgroundColor || colors.primary};
  cursor: pointer;

  color: ${props => props.color || colors.darkestGrey};
  font-size: ${props => props.fontSize || '1rem'};
  font-weight: bold;
  text-transform: uppercase;

  &:active,
  &:focus {
    outline: 2px solid ${colors.secondary};
  }

  &:disabled,
  &[disabled] {
    box-shadow: inset 0px 0px 0px 1px ${rgba(colors.darkestGrey, 0.5)};
    background-color: ${props =>
      rgba(props.backgroundColor || colors.primary, 0.5)};
    color: ${props => rgba(props.color || colors.darkestGrey, 0.5)};
  }
`

export default Button
