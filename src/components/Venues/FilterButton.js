import { func, object } from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import { intlShape } from 'react-intl'

import Icon from '../Icon'
import { colors, media, fontSize, fontWeight } from '../../styles'

import messages from './messages'

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
  z-index: 20;
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
const AppliedFiltersWrapper = styled.div`
  display: block;
  position: relative;
  width: 85%;
  margin-left: 15px;
  height: 40px;
  overflow: hidden;

  ${media.desktop`
    width: 39%;
  `};
`
const AppliedFilter = styled.div``

const Filter = styled.div`
  color: ${colors.gray700};
  background-color: ${colors.white};
  border-radius: 25px;
  margin-right: 15px;
  border: 1px solid ${colors.borderColor};
  font-size: ${fontSize.sm};
  padding: 5px 15px;
  display: inline-block;
  font-weight: ${fontWeight.medium};
  line-height: 2;
  height: 40px;
  overflow: hidden;
`

class FilterButton extends React.Component {
  static propTypes = {
    onClickHandler: func.isRequired,
    filters: object.isRequired
  }

  static contextTypes = {
    intl: intlShape
  }

  handleStateChange = event => {
    this.setState({ [event.target.id]: event.target.value })
  }

  render() {
    return (
      <FilterBtn>
        <Button onClick={this.props.onClickHandler}>
          <ButtonContent>
            <Icon glyph="equalizer" size={1.5} color={colors.darkestGrey} />
          </ButtonContent>
        </Button>

        <AppliedFiltersWrapper>
          <AppliedFilter>
            {this.props.filters.allowsGuideDog === '1' ? (
              <Filter>
                {this.context.intl.formatMessage(messages.allowsGuideDogLabel)}
              </Filter>
            ) : null}

            {this.props.filters.hasParking === '1' ? (
              <Filter>
                {this.props.allowsGuideDog}
                {this.context.intl.formatMessage(messages.hasParkingLabel)}
              </Filter>
            ) : null}

            {this.props.filters.entryScore >= 3 &&
            this.props.filters.entryScore < 4 ? (
              <Filter className="bg-caution font-semibold">
                {this.context.intl.formatMessage(messages.entryScoreLabel)}
              </Filter>
            ) : null}

            {this.props.filters.entryScore >= 4 &&
            this.props.filters.entryScore <= 5 ? (
              <Filter className="bg-accessible font-semibold">
                {this.context.intl.formatMessage(messages.entryScoreLabel)}
              </Filter>
            ) : null}

            {this.props.filters.interiorScore >= 3 &&
            this.props.filters.interiorScore < 4 ? (
              <Filter className="bg-caution font-semibold">
                {this.context.intl.formatMessage(messages.interiorScoreLabel)}
              </Filter>
            ) : null}
            {this.props.filters.interiorScore >= 4 &&
            this.props.filters.interiorScore <= 5 ? (
              <Filter className="bg-accessible font-semibold">
                {this.context.intl.formatMessage(messages.interiorScoreLabel)}
              </Filter>
            ) : null}

            {this.props.filters.bathroomScore >= 3 &&
            this.props.filters.bathroomScore < 4 ? (
              <Filter className="bg-caution font-semibold">
                {this.context.intl.formatMessage(messages.bathroomScoreLabel)}
              </Filter>
            ) : null}
            {this.props.filters.bathroomScore >= 4 &&
            this.props.filters.bathroomScore <= 5 ? (
              <Filter className="bg-accessible font-semibold">
                {this.context.intl.formatMessage(messages.bathroomScoreLabel)}
              </Filter>
            ) : null}
          </AppliedFilter>
        </AppliedFiltersWrapper>

        {/*
        <SelectBox
          id="sort"
          value={this.state.sort}
          options={options}
          optionsGroups={optionsGroups}
          style={{ marginLeft: '10px' }}
          height="40px"
          handleValueChange={this.handleStateChange}
          className="select--small"
          ariaLabel="sort locations"
        />

         {/*
        <SelectBox
          id="price"
          value={this.state.price}
          options={options}
          optionsGroups={optionsGroups}
          style={{ marginLeft: '10px' }}
          height="40px"
          handleValueChange={this.handleStateChange}
          className="select--small"
          ariaLabel="filter by price"
        />
        */}
      </FilterBtn>
    )
  }
}

export default FilterButton
