import { placeholder, rgba } from 'polished'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import Icon from '../Icon'
import { colors, media } from '../../styles'

const Form = styled.form`
  display: flex;
  flex-grow: 1;
  height: 3rem;

  ${media.desktop`
    flex-grow: 0;
    max-width: 30rem;
    width: ${props => (props.large ? '80%' : '16rem')};
  `};
`

const Input = styled.input`
  flex-grow: 1;

  border: none;
  border-bottom-left-radius: 3px;
  border-top-left-radius: 3px;
  box-shadow: inset 0px 0px 0px 1px ${colors.grey};
  height: 100%;
  margin: 0 -0.1rem 0 0;
  padding: 0.5rem 1rem;
  width: 100%;

  background-color: ${colors.lightestGrey};

  color: ${colors.darkestGrey};

  &:active,
  &:focus {
    box-shadow: inset 0px 0px 0px 2px ${colors.primary};
    outline: none;
    background-color: white;
  }

  ${placeholder({
    color: colors.darkGrey,
    fontSize: '0.8rem',
    textOverflow: 'ellipsis !important'
  })};

  ${media.desktop`
    width: 13rem;
  `};
`

const Button = styled.button`
  display: flex;

  align-items: center;
  justify-content: center;

  border: 0;
  border-bottom-right-radius: 3px;
  border-top-right-radius: 3px;
  box-shadow: none;
  height: 100%;
  padding: 0;
  width: 4rem;

  appearance: none;
  background-color: ${colors.primary};
  cursor: pointer;

  &:active,
  &:focus {
    box-shadow: inset 0px 0px 0px 2px ${colors.secondary};
    outline: none;
  }

  &:disabled,
  &.is-disabled {
    box-shadow: none;

    background-color: ${rgba(colors.primary, 0.5)};
    pointer-events: none;

    color: ${rgba(colors.lightestGrey, 0.5)};
  }
`

const SearchForm = props => (
  <Form onSubmit={props.onFormSubmit} large={props.large}>
    <Input
      id="keywords"
      type="text"
      onChange={props.onValueChange}
      value={props.value}
      placeholder={props.placeholder}
    />
    <Button type="submit">
      <Icon glyph="lens" size={1.5} color={colors.darkestGrey} />
    </Button>
  </Form>
)

SearchForm.propTypes = {
  large: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  onValueChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired
}

export default SearchForm
