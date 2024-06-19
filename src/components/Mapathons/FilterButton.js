import PropTypes, { func } from 'prop-types'

import React, { useEffect, useState } from 'react'
import { rgba } from 'polished'
import styled from 'styled-components'
import { useIntl } from 'react-intl'

import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'
import RemoveIcon from '@material-ui/icons/Remove'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked'
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked'
import { colors } from '../../styles'

const FilterBtn = styled.div`
  border-radius: 25px;
  box-shadow: ${props =>
    props.float ? `0 3px 5px ${rgba(colors.darkestGrey, 0.4)}` : 'none'};
  background-color: #f4f4f4;
  border: 1px solid #dededf;
  cursor: pointer;
  color: ${props => props.color || colors.darkestGrey};
  min-width: 104px;
  font-size: 1rem;
  margin-right: 20px;
  padding: 5px 10px;
  &:last-child {
    margin-right: 0;
  }
  &:active,
  &:focus {
    outline: 2px solid ${colors.secondary};
    background-color: #6b6b6b;
  }

  &:disabled,
  &[disabled] {
    opacity: 0.5;
  }
  width: auto;
  @media only screen and (max-width: 600px) {
    width: 48%;
    font-size: 10.5px;
    margin-right: 5px;
    margin-bottom: 5px;
  }

  @media only screen and (max-width: 359px) {
    width: 48%;
    font-size: 9.4px;
  }

  @media only screen and (max-width: 343px) {
    width: 48%;
    font-size: 8.4px;
  }
`

const ButtonContent = styled.div`
  display: flex;
  align-items: left;
  justify-content: flex-start;
`
const Text = styled.div`
  margin: 0 0 0 0.5rem;
  @media only screen and (max-width: 600px) {
    margin: 0.2rem 0 0 0.4rem;
  }
`

const FilterButton = ({
  onClickHandler,
  filter,
  visible,
  label,
  for: filterFor,
  type,
  apply
}) => {
  const { formatMessage } = useIntl();
  const [currentFilter, setCurrentFilter] = useState(filter);

  useEffect(() => {
    setCurrentFilter(filter);
  }, [filter]);

  const handleStateChange = async (event) => {
    if (type === 'rangeButton') {
      if (currentFilter === 0) setCurrentFilter(1);
      else if (currentFilter === 1) setCurrentFilter(-1);
      else if (currentFilter === -1) setCurrentFilter(0);
    } else {
      setCurrentFilter(currentFilter === 0 ? 1 : 0);
    }

    if (filterFor === 'date') {
      apply({ date: currentFilter });
    } else if (filterFor === 'numberOfReviews') {
      apply({ numberOfReviews: currentFilter });
    } else if (filterFor === 'hideZeroReviews') {
      apply({ hideZeroReviews: currentFilter });
    } else if (filterFor === 'hideInactiveMapathons') {
      apply({ hideInactiveMapathons: currentFilter });
    }
  };

  return (
    <FilterBtn visible={visible} onClick={handleStateChange}>
      <ButtonContent>
        {type === 'rangeButton' && currentFilter < 0 && (
          <ArrowDownwardIcon style={{ paddingBottom: '0.2rem' }} />
        )}
        {type === 'rangeButton' && currentFilter === 0 && (
          <RemoveIcon style={{ paddingBottom: '0.2rem' }} />
        )}
        {type === 'rangeButton' && currentFilter > 0 && (
          <ArrowUpwardIcon style={{ paddingBottom: '0.2rem' }} />
        )}
        {type === 'radioButton' && currentFilter === 0 && (
          <RadioButtonUncheckedIcon style={{ paddingBottom: '0.2rem' }} />
        )}
        {type === 'radioButton' && currentFilter === 1 && (
          <RadioButtonCheckedIcon style={{ paddingBottom: '0.2rem' }} />
        )}
        <Text>{label}</Text>
      </ButtonContent>
    </FilterBtn>
  );
};

FilterButton.propTypes = {
  onClickHandler: PropTypes.func.isRequired,
  filter: PropTypes.number.isRequired,
  visible: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  for: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  apply: PropTypes.func.isRequired,
};

export default FilterButton;
