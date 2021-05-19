import PropTypes, { func } from 'prop-types'

import React from 'react'
import { rgba } from 'polished'
import styled from 'styled-components'
import { intlShape } from 'react-intl'

import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'
import RemoveIcon from '@material-ui/icons/Remove'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked'
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked'
import { colors, media } from '../../styles'

const FilterBtn = styled.div`
  border-radius: 3px;
  box-shadow: ${props =>
    props.float ? `0 3px 5px ${rgba(colors.darkestGrey, 0.4)}` : 'none'};
  height: 3rem;
  margin: 0.2rem;
  padding-top: 0.8rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  padding-bottom: 0.5rem;
  background-color: ${props => props.backgroundColor || colors.primary};
  cursor: pointer;
  color: ${props => props.color || colors.darkestGrey};
  font-weight: bold;
  text-transform: uppercase;

  &:active,
  &:focus {
    outline: 2px solid ${colors.secondary};
  }

  &:disabled,
  &[disabled] {
    opacity: 0.5;
  }
  width: auto;
  @media only screen and (max-width: 600px) {
    width: 48%;
    font-size: 10.5px;
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

class FilterButton extends React.Component {
  static propTypes = {
    onClickHandler: func.isRequired,
    filter: PropTypes.number.isRequired,
    visible: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired,
    for: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
  }

  state = {
    filter: this.props.filter,
    type: this.props.type,
    for: this.props.for
  }

  static contextTypes = {
    intl: intlShape
  }

  handleStateChange = async event => {
    console.log(this.state.filter)
    if (this.state.type === 'rangeButton') {
      if (this.state.filter === 0) await this.setState({ filter: 1 })
      else if (this.state.filter === 1) await this.setState({ filter: -1 })
      else if (this.state.filter === -1) await this.setState({ filter: 0 })
    } else {
      await this.setState({ filter: this.state.filter === 0 ? 1 : 0 })
    }

    if (this.props.for === 'date') {
      this.props.apply({
        date: this.state.filter
      })
    } else if (this.props.for === 'numberOfReviews') {
      this.props.apply({
        numberOfReviews: this.state.filter
      })
    } else if (this.props.for === 'hideZeroReviews') {
      this.props.apply({
        hideZeroReviews: this.state.filter
      })
    } else if (this.props.for === 'hideInactiveMapathons') {
      this.props.apply({
        hideInactiveMapathons: this.state.filter
      })
    }
  }

  render() {
    return (
      <FilterBtn visible={this.props.visible} onClick={this.handleStateChange}>
        <ButtonContent>
          {this.state.type === 'rangeButton' &&
            this.state.filter < 0 && (
              <ArrowDownwardIcon style={{ paddingBottom: '0.2rem' }} />
            )}
          {this.state.type === 'rangeButton' &&
            this.state.filter === 0 && (
              <RemoveIcon style={{ paddingBottom: '0.2rem' }} />
            )}
          {this.state.type === 'rangeButton' &&
            this.state.filter > 0 && (
              <ArrowUpwardIcon style={{ paddingBottom: '0.2rem' }} />
            )}
          {this.state.type === 'radioButton' &&
            this.state.filter === 0 && (
              <RadioButtonUncheckedIcon style={{ paddingBottom: '0.2rem' }} />
            )}
          {this.state.type === 'radioButton' &&
            this.state.filter === 1 && (
              <RadioButtonCheckedIcon style={{ paddingBottom: '0.2rem' }} />
            )}
          <Text>{this.props.label}</Text>
        </ButtonContent>
      </FilterBtn>
    )
  }
}

export default FilterButton
