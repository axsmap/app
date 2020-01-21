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
  margin-left: 1rem !important;

  appearance: none;
  border: 0;
  border-radius: 50%;
  height: 3rem;
  margin-left: 0.7rem;
  padding: 0;
  width: 3rem;
  margin-top: 0.625rem;
  margin-bottom: 0.625rem;

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
  height: 50px;
  z-index: 30;
  display: flex;
  align-items: center;
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
  margin: 3px;
  @media screen and (max-width: 413px) and (min-width: 320px) {
    width: 21%;
    margin: 0px;
  }
`

const Sort = styled.div`
  border-radius: 45px;
  box-shadow: inset 0px 0px 0px 1px ${colors.grey};
  // height: 82%;
  background-color: ${colors.backgroundColor};
  color: ${colors.darkestGrey};
  width: 8%;
  margin: 3px;
  @media screen and (max-width: 413px) and (min-width: 320px) {
    border-bottom: 1px solid ${colors.grey};
    width: 21%;
    margin: 2px;
  }
`

const LabelOpen = styled.span`
  position: absolute;
  left: 14%;
  color: #6f7175;
  font-size: 15px;

  @media screen and (max-width: 475px) and (min-width: 414px) {
    position: absolute;
    left: 34%;
    color: #6f7175;
    font-size: 10px;
  }
  @media screen and (max-width: 413px) and (min-width: 320px) {
    position: absolute;
    left: 34%;
    color: #6f7175;
    font-size: 10px;
  }
`

const LabelRated = styled.span`
  position: absolute;
  left: 30.8%;
  color: #6f7175;
  font-size: 15px;

  @media screen and (max-width: 475px) and (min-width: 414px) {
    position: absolute;
    left: 67%;
    color: #6f7175;
    font-size: 10px;
  }
  @media screen and (max-width: 413px) and (min-width: 320px) {
    position: absolute;
    left: 67%;
    color: #6f7175;
    font-size: 10px;
  }
`

const SelectSort = styled.span`
  position: absolute;
  left: 6%;
  top: 72px;
  color: #6f7175;
  font-size: 15px;

  @media screen and (max-width: 475px) and (min-width: 414px) {
    position: absolute;
    left: 17%;
    top: 132px;
    color: #6f7175;
    font-size: 10px;
  }
  @media screen and (max-width: 413px) and (min-width: 320px) {
    position: absolute;
    left: 17%;
    top: 132px;
    color: #6f7175;
    font-size: 10px;
  }
`

const SelectPrice = styled.span`
  position: absolute;
  left: 23%;
  top: 72px;
  color: #6f7175;
  font-size: 15px;

  @media screen and (max-width: 475px) and (min-width: 414px) {
    position: absolute;
    left: 52%;
    top: 130px;
    color: #6f7175;
    font-size: 10px;
  }
  @media screen and (max-width: 413px) and (min-width: 320px) {
    position: absolute;
    left: 52%;
    top: 130px;
    color: #6f7175;
    font-size: 10px;
  }
`

const SelectHours = styled.span`
  position: absolute;
  left: 39.5%;
  top: 72px;
  color: #6f7175;
  font-size: 15px;

  @media screen and (max-width: 475px) and (min-width: 414px) {
    position: absolute;
    left: 85%;
    top: 131px;
    color: #6f7175;
    font-size: 10px;
  }
  @media screen and (max-width: 413px) and (min-width: 320px) {
    position: absolute;
    left: 85%;
    top: 131px;
    color: #6f7175;
    font-size: 10px;
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
      <SelectSort>Sort By</SelectSort>
    </Sort>
    <Label
      id="type"
      // label="Open now"
      // label={this.context.intl.formatMessage(messages.venueTypeLabel)}
      // value={this.state.type}
      // options={options}
      // optionsGroups={optionsGroups}
      handleValueChange={this.handleStateChange}
    />
    <LabelOpen>Open now</LabelOpen>
    <Sort>
      <SelectBox
        id="type"
        // label="Sort By" // value={this.state.type}
        // options={options}
        // optionsGroups={optionsGroups}
        handleValueChange={this.handleStateChange}
      />
      <SelectPrice>Price</SelectPrice>
    </Sort>
    <Label
      id="type"
      // label={this.context.intl.formatMessage(messages.venueTypeLabel)}
      // value={this.state.type}
      // options={options}
      // optionsGroups={optionsGroups}
      handleValueChange={this.handleStateChange}
    />
    <LabelRated>Top Rated</LabelRated>
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
      <SelectHours>Hours</SelectHours>
    </Sort>
  </FilterBtn>
)

FilterButton.propTypes = {
  onClickHandler: func.isRequired
}

export default FilterButton
