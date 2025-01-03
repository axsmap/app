import { placeholder, rgba } from 'polished'
import { func, string } from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import Icon from '../Icon'
import { colors, media } from '../../styles'

const Form = styled.form`
  display: none;
  height: 3rem;
  width: 100%;
  min-width: 21rem;
  border-radius: 5px;
  border: 2px solid #dededf;

  @media screen and (min-width: 320px) and (max-width: 359px) {
    min-width: 14rem;
  }

  @media screen and (min-width: 360px) and (max-width: 419px) {
    min-width: 16rem;
    font-size: 0.6rem;
  }

  @media screen and (min-width: 420px) and (max-width: 455px) {
    min-width: 18rem;
    font-size: 0.6rem;
  }
  @media screen and (min-width: 456px) and (max-width: 657px) {
    min-width: 20rem;
    font-size: 0.6rem;
  }
  @media screen and (min-width: 658px) and (max-width: 760px) {
    min-width: 30rem;
  }

  @media screen and (min-width: 768px) {
    display: flex;
  } 

  ${media.tablet`
    flex-grow: 0;
    width: 100%;
    min-width: 30rem;
  `};

  ${media.desktop`
    flex-grow: 0;
    width: 100%;
    min-width: 33rem;
  `};
`

const Input = styled.input`
  flex-grow: 1;
  border: none;
  height: 100%;
  margin: 0 -0.1rem 0 0rem;
  margin:0px 0px 0px 0px
  padding: 0.5rem 1rem;
  width: 100% !important;
  background-color: ${colors.backgroundColor};
  color: ${colors.darkestGrey};

  &:active,
  &:focus {
    box-shadow: inset 0px 0px 0px 2px ${colors.primary};
    outline: none;
    background-color: ${colors.backgroundColor};
  }

  ${placeholder({
    color: colors.darkGrey,
    fontSize: '0.7rem',
    textOverflow: 'ellipsis !important'
  })};

  ${media.desktop`
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
  border: none;
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

    background-color: ${rgba(colors.white, 0.5)};
    pointer-events: none;

    color: ${rgba(colors.lightestGrey, 0.5)};
  }
`

const SearchForm = props => (
  <Form onSubmit={props.onFormSubmit} role="search">
    <label htmlFor="keywords" className="visually-hidden">
      Search:
      {' '}
    </label>

    {props.id ? (
      <Input
        id={props.id}
        name={props.id}
        type="search"
        onChange={props.onValueChange}
        onReset={props.onValueReset}
        value={props.value}
        placeholder={props.placeholder}
        aria-label="Search"
      />
    ) : (
      <Input
        id="keywords"
        name="keywords"
        type="search"
        onChange={props.onValueChange}
        onReset={props.onValueReset}
        value={props.value}
        placeholder={props.placeholder}
        aria-label="Search"
      />
    )}

    <Button type="submit">
      <Icon glyph="lens" size={1.5} color={colors.darkestGrey} />
    </Button>
  </Form>
)

SearchForm.propTypes = {
  value: string.isRequired,
  onFormSubmit: func.isRequired,
  onValueChange: func.isRequired,
  onValueReset: func.isRequired,
  placeholder: string.isRequired,
  id: string
}

export default SearchForm
