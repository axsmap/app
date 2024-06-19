import PropTypes from 'prop-types'

import React from 'react'
import styled from 'styled-components'
import { useIntl } from 'react-intl'

import Icon from '../Icon'
import { colors, media, } from '../../styles'

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
  background-color: ${({ filterApplied }) =>
    filterApplied ? colors.primary : colors.backgroundColor};
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
  width: 10%;
  height: 59px;
  display: flex;
  align-items: center;
  padding: 10px;

  @media only screen and (min-device-width: 360px) and (max-device-width: 480px) {
    display: flex;
    width: auto;
  }

  @media only screen and (min-device-width: 1024px) and (max-device-width: 1366px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: landscape) {
    display: flex;
    width: auto;
  }

  @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (-webkit-min-device-pixel-ratio: 2) {
    display: flex;
    align-items: center;
    width: auto;
  }

  ${media.tablet`
    width: auto;
    display: flex;
  `};

  ${media.desktop`
    z-index: 20;
    box-shadow: none;
    border-bottom: none;
    background-color: transparent;
    display:block;
    width: 10%;
    display: flex;
    position: relative;
    height: 55px;
  `};

  ${media.widescreen`
    z-index: 20;
    box-shadow: none;
    border-bottom: none;
    background-color: transparent;
    display:block;
    width: 10%;
    display: flex;
    position: relative;
    height: 55px;
  `};

`
const ButtonContent = styled.div`
  display: flex;
  align-items: left;
  justify-content: space-between;
`

const FilterButton = ({ onClickHandler, filters, visible, filterApplied }) => {
  const { formatMessage } = useIntl();

  return (
    <FilterBtn visible={visible}>
      <Button
        filterApplied={filterApplied}
        onClick={onClickHandler}
        className="float-left"
      >
        <span className="_hide-visual">
          {formatMessage(messages.filtersTitle)}
        </span>
        <ButtonContent>
          <Icon glyph="equalizer" size={1.5} color={colors.darkestGrey} />
        </ButtonContent>
      </Button>
    </FilterBtn>
  );
};

FilterButton.propTypes = {
  onClickHandler: PropTypes.func.isRequired,
  filters: PropTypes.object.isRequired,
  visible: PropTypes.bool.isRequired,
  filterApplied: PropTypes.bool.isRequired,
};

export default FilterButton;
