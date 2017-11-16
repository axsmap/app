import { camelCase, upperFirst } from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'
import { intlShape } from 'react-intl'
import styled from 'styled-components'

import { colors, media } from '../../styles'
import downArrowIcon from '../../images/down-arrow.svg'

import { venuesCategories } from '../../constants'
import messages from './messages'

const Wrapper = styled.div`
  position: relative;

  display: none;

  flex-grow: 1;

  border-radius: 3px;
  box-shadow: inset 0px 0px 0px 1px ${colors.grey};
  height: 2.5rem;

  ${media.tablet`
    display: flex;
  `};

  ${media.desktop`
    display: flex;
    flex-grow: 0;
    width: 16rem;
  `};
`

const Select = styled.select`
  appearance: none;
  border: none;
  border-radius: inherit;
  box-shadow: inset 0px 0px 0px 1px ${colors.grey};
  height: inherit;
  margin: 0;
  padding: 0.5rem 3.5rem 0.5rem 1rem;
  width: 100%;

  background-color: ${colors.lightestGrey};

  color: ${colors.darkestGrey};
  text-overflow: ellipsis !important;

  &:active,
  &:focus {
    box-shadow: inset 0px 0px 0px 2px ${colors.primary};
    outline: none;
    background-color: white;
  }
`

const Icon = styled.img`
  position: absolute;
  right: 1rem;
  top: 0.8rem;

  height: 1rem;

  pointer-events: none;
`

const Option = styled.option``

const OptionGroup = styled.optgroup``

const FilterSelectBox = (props, context) => (
  <Wrapper>
    <Select id="type" value={props.value} onChange={props.onValueChange}>
      <Option key="all" value="all">
        {context.intl.formatMessage(messages.filtersAll)}
      </Option>
      {venuesCategories.map(k => (
        <OptionGroup
          key={Object.keys(k)[0]}
          label={context.intl.formatMessage(
            messages[`filters${upperFirst(Object.keys(k)[0])}`]
          )}
        >
          {k[Object.keys(k)[0]].map(v => (
            <Option key={v} value={v}>
              {context.intl.formatMessage(
                messages[`filters${upperFirst(camelCase(v))}`]
              )}
            </Option>
          ))}
        </OptionGroup>
      ))}
    </Select>
    <Icon src={downArrowIcon} alt="Down arrow icon" />
  </Wrapper>
)

FilterSelectBox.propTypes = {
  value: PropTypes.string.isRequired,
  onValueChange: PropTypes.func.isRequired
}

FilterSelectBox.contextTypes = {
  intl: intlShape
}

export default FilterSelectBox
