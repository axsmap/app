import { placeholder, rgba } from 'polished'
import { intlShape } from 'react-intl'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import { colors, media } from '../../styles'
import searchIcon from '../../images/search.svg'

import messages from './messages'

const Form = styled.form`
  display: flex;

  flex-grow: 1;

  height: 2.5rem;
  margin-right: 0.5rem;

  ${media.desktop`
    flex-grow: 0;
    width: 16rem;
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
  padding: 0.5rem 1rem 0.5rem 1rem;
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

const Icon = styled.img`
  height: 1.5rem;
  width: auto;
`

const SearchForm = (props, context) => (
  <Form onSubmit={props.onFormSubmit}>
    <Input
      id="keyword"
      type="text"
      onChange={props.onValueChange}
      value={props.value}
      placeholder={context.intl.formatMessage(messages.searchPlaceholder)}
    />
    <Button type="submit">
      <Icon src={searchIcon} alt="Search icon" />
    </Button>
  </Form>
)

SearchForm.propTypes = {
  value: PropTypes.string.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  onValueChange: PropTypes.func.isRequired
}

SearchForm.contextTypes = {
  intl: intlShape
}

export default SearchForm
