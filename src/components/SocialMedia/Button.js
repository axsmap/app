import { rgba } from 'polished'
import styled from 'styled-components'

import { colors } from '../../styles'

const Button = styled.div.attrs({ role: 'button' })`
  position: relative;

  border: none;
  border-radius: 3px;
  box-shadow: inset 0px 0px 0px 1px ${colors.darkestGrey};
  height: 3rem;
  margin-bottom: ${props => props.marginBottom || '0'};
  margin-top: ${props => props.marginTop || '0'};

  background-color: ${props => props.backgroundColor};

  color: ${colors.lightestGrey};
  font-size: 1rem;
  font-weight: bold;
  line-height: 3rem;
  text-transform: uppercase;
  text-align: center;

  &:active,
  &:focus {
    outline: 2px solid ${colors.alert}; 
  }

  &:disabled,
  &[disabled] {
    box-shadow: inset 0px 0px 0px 1px ${rgba(colors.darkestGrey, 0.5)};
    background-color: ${rgba(colors.primary, 0.5)};
    color: ${rgba(colors.darkestGrey, 0.5)};
  }
`

export default Button
