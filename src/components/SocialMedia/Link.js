import styled from 'styled-components'

import { colors } from '../../styles'

const Link = styled.a`
  display: flex;
  opacity: 1;

  align-items: center;
  justify-content: space-between;

  appearance: none;
  border: none;
  border-radius: 3px;
  box-shadow: none;
  height: 3rem;
  margin: 0;
  padding: 0 1rem;
  width: ${props => props.width || 'auto'};

  background-color: ${props => props.backgroundColor};
  cursor: pointer;

  color: ${props => props.color};
  font-size: 1rem;
  font-weight: bold;
  text-decoration: none;
  text-transform: uppercase;

  &:active,
  &:focus {
    outline: 2px solid ${colors.secondary};
  }

  &:disabled,
  &[disabled] {
    opacity: 0.5;
  }
`

export default Link
