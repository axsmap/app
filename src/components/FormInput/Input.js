import styled from 'styled-components'

import { colors, fonts } from '../../styles'

const Input = styled.input`
  display: block;

  border: none;
  border-radius: 3px;
  box-shadow: ${props =>
    props.$hasError
      ? `inset 0px 0px 0px 2px ${colors.alert}`
      : `inset 0px 0px 0px 1px ${colors.darkGrey}`};
  height: 3rem;
  padding: ${props =>
    props.$prefix ? '0.5rem 1rem 0.5rem 1.3rem' : '0.5rem 1rem'};
  width: 100%;

  background-color: white;

  color: ${colors.darkestGrey};
  font-size: 1rem;

  &:focus {
    box-shadow: inset 0px 0px 0px 2px ${colors.secondary};
    outline: none;
  }

  &::placeholder {
    color: colors.darkGrey;
    fontFamily: ${fonts.primary};
    textOverflow: 'ellipsis !important';
  }
`

export default Input
