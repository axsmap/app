import { camelCase, upperFirst } from 'lodash'
import { bool, func, object } from 'prop-types'
import React from 'react'
import { intlShape } from 'react-intl'
import styled from 'styled-components'

import { ButtonGroup } from 'reactstrap'
import Button from '../Button'
import Dialog from '../Dialog'
import Icon from '../Icon'
import topBarMessages from '../TopBar/messages'
import SelectBox from '../SelectBox'
import CustomButtonGroup from '../CustomButtonGroup'
import { colors, fonts, fontWeight, fontSize, media } from '../../styles'

import messages from './messages'

const Header = styled.div`
  display: flex;
  align-items: center;
  flex: 0 0 auto;
  justify-content: space-between;
  height: 4rem;
  padding: 15px 20px;
  background-color: ${colors.white};
`

const Title = styled.h2`
  overflow: hidden;
  text-align: center;
  margin: 0;
  color: ${colors.textColor};
  font-family: ${fonts.primary} !important;
  font-weight: ${fontWeight.semibold} !important;
  font-size: ${fontSize.xl2};
  color: ${colors.textColor};
  text-align: center;
  display: block;
  position: relative;
  width: 100%;

  ${media.desktop`
    font-size: ${fontSize.xl};
  `};
`

const Content = styled.div`
  display: flex;
  overflow-y: auto;
  align-items: center;
  flex-direction: column;
  flex-grow: 1;
  justify-content: space-between;
  background-color: ${colors.white};
  padding: 15px 20px;
`

const ButtonGroupWrapper = styled.div`
  display: block;
  width: 100%;
  position: relative;
`
const Label = styled.label`
  display: block;
  margin-bottom: 1.25rem;
  width: 100%;
  color: ${colors.textColor} !important;
  font-size: ${fontSize.sm};
  font-weight: ${fontWeight.medium};
  font-family: ${fonts.primary};
`

const Footer = styled.div`
  display: flex;
  align-items: center;
  flex: 0 0 auto;
  justify-content: space-between;
  height: 84px;
  padding: 20px 26px;
  background-color: ${colors.white};
`

class FiltersDialog extends React.Component {
  static propTypes = {
    filters: object.isRequired,
    sendingRequest: bool.isRequired,
    hide: func.isRequired,
    clear: func.isRequired,
    apply: func.isRequired
  }

  static contextTypes = {
    intl: intlShape
  }

  state = {
    numberOfReviews: this.props.filters.numberOfReviews,
    date: this.props.filters.date,
    geolocation: this.props.filters.geolocation,
    hideZeroReviews: this.props.filters.hideZeroReviews
  }

  handleStateChange = event => {
    this.setState({ [event.target.id]: event.target.value })
  }

  updateNumOfReviews = value => {
    this.setState({numberOfReviews: value})
  }

  updateDate = value => {
    this.setState({date: value})
  }

  updateGeolocation = event => {
    let radius = parseInt(event.target.value)
    navigator.geolocation.getCurrentPosition(position => {
      let lat = position.coords.latitude;
      let long = position.coords.longitude;
      this.setState({
        geolocation: {
          radius: radius, 
          lat: lat, 
          long: long
        }
      })
    });
  }

  updateZeroReviews = () => {
    this.setState({hideZeroReviews: this.state.hideZeroReviews <= 0 ? 1 : -1})
  }

  render() {
    const options = [
      {
        value: '0',
        label: 'All'
      },
      {
        value: '10',
        label: '10 Miles'
      },
      {
        value: '25',
        label: '25 Miles'
      },
      {
        value: '50',
        label: '50 Miles'
      }
    ]

    const booleanOptions = [
      {
        value: 1,
        label: this.context.intl.formatMessage(messages.hideZeroReviews)
      }
    ]

    return (
      <Dialog hide={this.props.hide}>
        <Header>
          <Button
            backgroundColor={colors.backgroundColor}
            color={colors.darkestGrey}
            disabled={this.props.sendingRequest}
            onClickHandler={this.props.hide}
            style={{ padding: '0rem' }}
          >
            <Icon
              glyph="cross"
              size={1}
              backgroundColor={colors.backgroundColor}
              disabled={this.props.sendingRequest}
              onClickHandler={this.props.hide}
              color={colors.darkestGrey}
            />
          </Button>
          <Title>
            {this.context.intl.formatMessage(messages.filtersTitle)}
          </Title>
        </Header>

        <Content>
          <ButtonGroupWrapper style={{ marginBottom: '1.5rem' }}>
            <Label>
              Number of Reviews
            </Label>
            <ButtonGroup size="sm">
              <Button
                disabled={this.props.sendingRequest}
                onClick={() => this.updateNumOfReviews(1)}
                className={`${
                  this.state.numberOfReviews === 1
                    ? 'btn-secondary is-active'
                    : 'btn-secondary'
                }`}
              >
                Ascending
              </Button>
              <Button
                disabled={this.props.sendingRequest}
                onClick={() => this.updateNumOfReviews(-1)}
                className={`${
                  this.state.numberOfReviews === -1
                    ? 'btn-secondary is-active'
                    : 'btn-secondary'
                }`}
              >
                Descending
              </Button>
            </ButtonGroup>
          </ButtonGroupWrapper>
          <ButtonGroupWrapper style={{ marginBottom: '1.5rem' }}>
            <Label>
              Date
            </Label>
            <ButtonGroup size="sm">
              <Button
                disabled={this.props.sendingRequest}
                onClick={() => this.updateDate(1)}
                className={`${
                  this.state.date === 1
                    ? 'btn-secondary is-active'
                    : 'btn-secondary'
                }`}
              >
                Ascending
              </Button>
              <Button
                disabled={this.props.sendingRequest}
                onClick={() => this.updateDate(-1)}
                className={`${
                  this.state.date === -1
                    ? 'btn-secondary is-active'
                    : 'btn-secondary'
                }`}
              >
                Descending
              </Button>
            </ButtonGroup>
          </ButtonGroupWrapper>
          <Label>
            Location
          </Label>
          <SelectBox
            id="radius"
            value={this.state.geolocation.radius}
            options={options}
            style={{ marginBottom: '1.5rem' }}
            handleValueChange={this.updateGeolocation}
            ariaLabel="Filter by Type"
          />

          <CustomButtonGroup
            id="hideZeroReviews"
            value={this.state.hideZeroReviews}
            options={booleanOptions}
            style={{ marginBottom: '1.5rem' }}
            size="lg"
            handleValueChange={this.updateZeroReviews}
          />
        </Content>

        <Footer>
          <Button
            backgroundColor={colors.gray500}
            color={colors.white}
            className="gray-btn btn--medium shadow-outer"
            disabled={this.props.sendingRequest}
            onClickHandler={this.props.clear}
          >
            Clear
          </Button>
          <Button
            backgroundColor={colors.gray500}
            color={colors.white}
            className="gray-btn btn--medium shadow-outer"
            disabled={this.props.sendingRequest}
            onClickHandler={() =>
              this.props.apply({
                numberOfReviews: this.state.numberOfReviews,
                date: this.state.date,
                geolocation: this.state.geolocation,
                hideZeroReviews: this.state.hideZeroReviews
              })
            }
          >
            Apply
          </Button>
        </Footer>
      </Dialog>
    )
  }
}

export default FiltersDialog
