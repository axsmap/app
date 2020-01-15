import { func } from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import Icon from '../Icon'
import { colors, media } from '../../styles'
import SelectBox from '../SelectBox'

const Button = styled.button`
  display: flex;

  align-items: center;
  flex-shrink: 0;
  justify-content: center;
  margin: 0rem !important;
  appearance: none;
  border: 0;
  border-radius: 50%;
  height: 2.5rem;
  margin-left: 0.7rem;
  padding: 0;
  width: 2.5rem;
  background-color: ${colors.backgroundColor};
  border: 1px solid ${colors.borderColor};
  cursor: pointer;

  &:active,
  &:focus {
    box-shadow: inset 0px 0px 0px 2px ${colors.secondary};
    outline: none;
  }

  ${media.tablet`
    margin-left: 1rem;
  `};
`

const FilterBtn = styled.div`
  width: 100%;
  height: 55px;
  z-index: 30;
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ebecec;
  -webkit-box-shadow: 0px 6px 10px 0px rgba(0, 0, 0, 0.25);
  -moz-box-shadow: 0px 6px 10px 0px rgba(0, 0, 0, 0.25);
  box-shadow: 0px 6px 10px 0px rgba(0, 0, 0, 0.25);

  ${media.desktop`
    border-top: 1px solid #EBECEC;
    box-shadow: none;
    border-bottom: none;
  `};
`
const ButtonContent = styled.div`
  display: flex;
  align-items: left;
  justify-content: space-between;
`

const Label = styled.div`
  border-radius: 45px;
  box-shadow: inset 0px 0px 0px 1px ${colors.grey};
  height: 82%;
  background-color: ${colors.backgroundColor};
  color: ${colors.darkestGrey};
  width: 8%;
  margin: 8px;
  @media screen and (max-width: 413px) and (min-width: 320px) {
    width: 18%;
    margin: 0px;
  }
`

const Sort = styled.div`
  border-radius: 45px;
  box-shadow: inset 0px 0px 0px 1px ${colors.grey};
  height: 82%;
  background-color: ${colors.backgroundColor};
  color: ${colors.darkestGrey};
  width: 8%;
  margin: 8px;
  @media screen and (max-width: 413px) and (min-width: 320px) {
    width: 18%;
    margin: 2px;
  }
`

const FilterButton = props => (
  <FilterBtn>
    <Button onClick={props.onClickHandler}>
      <ButtonContent>
        <Icon glyph="equalizer" size={1.5} color={colors.darkestGrey} />
      </ButtonContent>
    </Button>

    <Sort>
      <SelectBox
        id="type"
        // label={this.context.intl.formatMessage(messages.venueTypeLabel)}
        // label="Sort By"
        // value={this.state.type}
        // options={options}
        // optionsGroups={optionsGroups}
        handleValueChange={this.handleStateChange}
      />
    </Sort>
    <Sort>
      <SelectBox
        id="type"
        label="Sort By" // value={this.state.type}
        // options={options}
        // optionsGroups={optionsGroups}
        handleValueChange={this.handleStateChange}
      />
    </Sort>
  </FilterBtn>
)

FilterButton.propTypes = {
  onClickHandler: func.isRequired
}

export default FilterButton
