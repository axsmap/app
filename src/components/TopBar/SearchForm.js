import { placeholder, rgba } from 'polished'
import { func, string } from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import Icon from '../Icon'
import { colors, media } from '../../styles'

const Form = styled.form`
  display: flex;
  height: 3rem;
  width: 100%;

  ${media.desktop`
    flex-grow: 0;
    width: 100%;
    max-width: 23rem;
  `};
`

const Input = styled.input`
  flex-grow: 1;
  border: none;
  min-width: 28rem !important;
  border-bottom-left-radius: 5px;
  border-top-left-radius: 5px;
  box-shadow: inset 0px 0px 0px 1px ${colors.grey};
  height: 100%;
  margin: 0 -0.1rem 0 0rem;
  margin:0px 0px 0px 0px
  padding: 0.5rem 1rem;
  width: 100% !important;

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
    fontSize: '1rem',
    textOverflow: 'ellipsis !important'
  })};

  ${media.desktop`
    width: 83rem !important;
    font-size: 0.8rem;

    ${placeholder({ fontSize: '0.8rem' })};
  `};

  ${media.widescreen`
    width: 16rem;
    font-size: 1rem;

    ${placeholder({ fontSize: '1rem' })};
  `};
`

const Button = styled.button`
  display: flex;

  align-items: center;
  flex-shrink: 0;
  justify-content: center;

  border: 0;
  border-bottom-right-radius: 5px;
  border-top-right-radius: 5px;
  box-shadow: none;
  height: 100%;
  padding: 0;
  width: 3rem;

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
  <Form onSubmit={props.onFormSubmit}>
    <Input
      id="keywords"
      type="text"
      onChange={props.onValueChange}
      value={props.value}
      placeholder={props.placeholder}
    />
    {props.value ? (
      <Button type="button" onClick={props.onValueReset}>
        <Icon glyph="cross" size={1.5} color={colors.darkestGrey} />
      </Button>
    ) : (
      <Button type="submit">
        <Icon glyph="lens" size={1.5} color={colors.darkestGrey} />
      </Button>
    )}
  </Form>
)

SearchForm.propTypes = {
  value: string.isRequired,
  onFormSubmit: func.isRequired,
  onValueChange: func.isRequired,
  onValueReset: func.isRequired,
  placeholder: string.isRequired
}

export default SearchForm
