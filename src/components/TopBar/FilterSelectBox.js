import { camelCase, upperFirst } from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'
import { intlShape } from 'react-intl'
import styled from 'styled-components'

import Icon from '../Icon'
import { colors, media } from '../../styles'

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
  padding: 0.5rem 2.5rem 0.5rem 1rem;
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

const IconWrapper = styled.div`
  position: absolute;
  right: 0rem;
  top: 0rem;

  display: flex;

  align-items: center;
  justify-content: center;

  height: inherit;
  width: 2.5rem;

  pointer-events: none;
`

const Option = styled.option``

const OptionGroup = styled.optgroup``

const FilterSelectBox = (props, context) => (
  <Wrapper>
    <Select id="type" value={props.value} onChange={props.onValueChange}>
      <Option key="establishment" value="establishment">
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
    <IconWrapper>
      <Icon glyph="arrow" size={1} rotate="90deg" color={colors.darkestGrey} />
    </IconWrapper>
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
