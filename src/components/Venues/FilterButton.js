import PropTypes, { func, object } from 'prop-types'

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
  height: 59px;
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ebecec;
  -webkit-box-shadow: 0px 6px 10px 0px rgba(0, 0, 0, 0.25);
  -moz-box-shadow: 0px 6px 10px 0px rgba(0, 0, 0, 0.25);
  box-shadow: 0px 6px 10px 0px rgba(0, 0, 0, 0.25);
  background-color: ${colors.lightestGrey};
  z-index: 20;
  position: fixed;
  overflow: hidden;

  ${media.tablet`
    width: 50%;
    display: flex;
    position: absolute;
  `};

  ${media.desktop`
    z-index: 20;
    border-top: 1px solid #EBECEC;
    box-shadow: none;
    border-bottom: none;
    background-color: transparent;
    display:block;
    width: 60%;
    display: flex;
    position: relative;
    height: 55px;
  `};

  ${media.widescreen`
    z-index: 20;
    border-top: 1px solid #EBECEC;
    box-shadow: none;
    border-bottom: none;
    background-color: transparent;
    display:block;
    width: 63%;
    display: flex;
    position: relative;
    height: 55px;
  `};

  @media only screen and (min-device-width: 1024px) and (max-device-width: 1366px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: landscape) {
    z-index: 22;
    display: flex;
    position: relative;
  }

  @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (-webkit-min-device-pixel-ratio: 2) {
    z-index: 22;
    display: flex;
    width: 100%;
    background-color: ${colors.lightestGrey};
    -webkit-box-shadow: 0px 6px 10px 0px rgba(0, 0, 0, 0.25);
    -moz-box-shadow: 0px 6px 10px 0px rgba(0, 0, 0, 0.25);
    box-shadow: 0px 6px 10px 0px rgba(0, 0, 0, 0.25);
    position: absolute;
  }
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
  float: left;

  padding: var(--gutter) 0;
  display: grid;
  grid-gap: var(--gutter) 0;
  grid-template-columns: var(--gutter) 1fr var(--gutter);
  align-content: start;
`
const AppliedFilter = styled.div`
  display: grid;
  grid-gap: calc(var(--gutter) / 2);
  grid-template-columns: 10px;
  grid-template-rows: minmax(150px, 1fr);
  grid-auto-flow: column;
  grid-auto-columns: calc(50% - var(--gutter) * 2);

  overflow-x: scroll;
  scroll-snap-type: x proximity;
  padding-bottom: calc(0.75 * var(--gutter));
  margin-bottom: calc(-0.25 * var(--gutter));
  scrollbar-width: none;
  margin-bottom: 0;
  padding-bottom: 0;

  &:before,
  &:after {
    content: '';
    width: 10px;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`

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

  scroll-snap-align: center;
  padding: calc(var(--gutter) / 2 * 1.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 125px;
`

class FilterButton extends React.Component {
  static propTypes = {
    onClickHandler: func.isRequired,
    filters: object.isRequired,
    visible: PropTypes.bool.isRequired,
    className: PropTypes.string
  }

  static contextTypes = {
    intl: intlShape
  }

  handleStateChange = event => {
    this.setState({ [event.target.id]: event.target.value })
  }

  render() {
    return (
      <FilterBtn visible={this.props.visible} className={this.props.className}>
        <Button onClick={this.props.onClickHandler} className="float-left">
          <span className="_hide-visual">
            {this.context.intl.formatMessage(messages.filtersTitle)}
          </span>
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

            {this.props.filters.entranceScore >= 3 &&
            this.props.filters.entranceScore < 5 ? (
              <Filter className="bg-caution font-semibold">
                {this.context.intl.formatMessage(messages.entryScoreLabel)}
              </Filter>
            ) : null}

            {this.props.filters.entranceScore >= 5 ? (
              <Filter className="bg-accessible font-semibold">
                {this.context.intl.formatMessage(messages.entryScoreLabel)}
              </Filter>
            ) : null}

            {this.props.filters.interiorScore >= 3 &&
            this.props.filters.interiorScore < 5 ? (
              <Filter className="bg-caution font-semibold">
                {this.context.intl.formatMessage(messages.interiorScoreLabel)}
              </Filter>
            ) : null}
            {this.props.filters.interiorScore >= 5 ? (
              <Filter className="bg-accessible font-semibold">
                {this.context.intl.formatMessage(messages.interiorScoreLabel)}
              </Filter>
            ) : null}

            {this.props.filters.restroomScore >= 3 &&
            this.props.filters.restroomScore < 5 ? (
              <Filter className="bg-caution font-semibold">
                {this.context.intl.formatMessage(messages.bathroomScoreLabel)}
              </Filter>
            ) : null}
            {this.props.filters.restroomScore >= 5 ? (
              <Filter className="bg-accessible font-semibold">
                {this.context.intl.formatMessage(messages.bathroomScoreLabel)}
              </Filter>
            ) : null}
          </AppliedFilter>
        </AppliedFiltersWrapper>
      </FilterBtn>
    )
  }
}

export default FilterButton
