import { camelCase, upperFirst } from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'
import { intlShape } from 'react-intl'
import styled from 'styled-components'

import SB from '../SelectBox'
import { media } from '../../styles'

import { venuesCategories } from '../../constants'
import messages from './messages'

const SelectBox = styled(SB)`
  display: none;

  flex-grow: 1;

  margin-left: 0.5rem;
  width: auto;

  ${media.tablet`
    display: flex;
    width: auto;
  `};

  ${media.desktop`
    display: flex;
    flex-grow: 0;
    width: 16rem;
  `};
`

const FilterSelectBox = (props, context) => {
  const options = [
    {
      value: 'establishment',
      label: context.intl.formatMessage(messages.filtersAll)
    }
  ]

  const optionsGroups = venuesCategories.map(venueCategory => {
    const opts = venueCategory.options.map(option => ({
      value: option,
      label: context.intl.formatMessage(
        messages[`filters${upperFirst(camelCase(option))}`]
      )
    }))

    return {
      value: venueCategory.value,
      label: context.intl.formatMessage(
        messages[`filters${upperFirst(venueCategory.value)}`]
      ),
      options: opts
    }
  })

  return (
    <SelectBox
      height="3rem"
      id="type"
      value={props.value}
      options={options}
      optionsGroups={optionsGroups}
      handleValueChange={props.handleValueChange}
    />
  )
}

FilterSelectBox.propTypes = {
  value: PropTypes.string.isRequired,
  handleValueChange: PropTypes.func.isRequired
}

FilterSelectBox.contextTypes = {
  intl: intlShape
}

export default FilterSelectBox
