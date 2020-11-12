import { camelCase, upperFirst } from 'lodash'
import { bool, func, object } from 'prop-types'
import React from 'react'
import { intlShape } from 'react-intl'
import styled from 'styled-components'
import SearchForm from '../TopBar/SearchForm'
import Button from '../Button'
import { venuesCategories } from '../../constants'
import Dialog from '../Dialog'
import Icon from '../Icon'
import topBarMessages from '../TopBar/messages'
import SelectBox from '../SelectBox'
import { colors, media } from '../../styles'
import FilterButton from '../TopBar/FilterButton'

import messages from './messages'

const Header = styled.div`
  display: flex;

  align-items: center;
  flex: 0 0 auto;
  justify-content: space-between;

  border-bottom: 1px solid ${colors.lightGrey};
  border-radius: 5px 5px 0 0;
  height: 4rem;
  padding: 0.5rem 1rem;

  background-color: white;
`

const Title = styled.h1`
  overflow: hidden;

  margin: 0;

  color: ${colors.darkestGrey};
  font-size: 1.2rem;
  text-overflow: ellipsis;
  text-transform: uppercase;
  white-space: nowrap;
`

const ButtonContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Content = styled.div`
  display: flex;
  overflow-y: auto;

  align-items: center;
  flex-direction: column;
  flex-grow: 1;
  justify-content: space-between;

  border-radius: 0 0 5px 5px;
  padding: 1.5rem 1rem;
`

const Footer = styled.div`
  display: flex;

  align-items: center;
  flex: 0 0 auto;
  justify-content: space-between;

  border-top: 1px solid ${colors.lightGrey};
  border-radius: 0 0 5px 5px;
  height: 4rem;
  padding: 0.5rem 1rem;

  background-color: white;
`
const SearchFilterWrapper = styled.div`
  position: relative;

  border-radius: 3px;
  box-shadow: inset 0px 0px 0px 1px ${colors.grey};
  height: '3rem';
  width: 100%;
  margin-bottom: '1.5rem';
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
    location: this.props.filters.location,
    date: this.props.filters.date,
    numOfReviews: this.props.filters.numOfReviews,
    numOfParticipants: this.props.filters.numOfParticipants,
    hasReviews: this.props.filters.hideMapathonsWithZeroReviews,
    booleanOptions: [
      {
        value: '1',
        label: this.context.intl.formatMessage(messages.hasReviews)
      },
      {
        value: '0',
        label: this.context.intl.formatMessage(messages.noReviews)
      }
    ]
  }

  handleStateChange = event => {
    this.setState({ [event.target.id]: event.target.value })
  }

  render() {
    const formatMessage = this.context.intl.formatMessage
    const options = [
      {
        value: 'establishment',
        label: this.context.intl.formatMessage(topBarMessages.filtersAll)
      }
    ]

    const optionsGroups = venuesCategories.map(venueCategory => {
      const opts = venueCategory.options.map(option => ({
        value: option,
        label: this.context.intl.formatMessage(
          topBarMessages[`filters${upperFirst(camelCase(option))}`]
        )
      }))

      return {
        value: venueCategory.value,
        label: this.context.intl.formatMessage(
          topBarMessages[`filters${upperFirst(venueCategory.value)}`]
        ),
        options: opts
      }
    })

    return (
      <Dialog hide={this.props.hide}>
        <Header>
          <Title>
            {this.context.intl.formatMessage(messages.filtersTitle)}
          </Title>
          <Button
            backgroundColor={colors.lightGrey}
            color={colors.darkestGrey}
            disabled={this.props.sendingRequest}
            onClickHandler={this.props.hide}
          >
            <ButtonContent>
              <Icon glyph="cross" size={1} color={colors.darkestGrey} />
              <p style={{ margin: '0 0 0 0.5rem' }}>
                {this.context.intl.formatMessage(messages.closeFiltersButton)}
              </p>
            </ButtonContent>
          </Button>
        </Header>

        <Content>
          <SearchFilterWrapper>
            <SearchForm
              style={{ marginBottom: '1.5rem' }}
              value={this.props.address}
              onFormSubmit={this.props.handleQuerySubmit}
              onValueChange={this.props.handleAddressChange}
              placeholder={formatMessage(
                messages.mapathonsSearchLocationPlaceholder
              )}
            />
          </SearchFilterWrapper>

          <SelectBox
            id="hasReviews"
            label={this.context.intl.formatMessage(messages.reviews)}
            value={this.state.hasReviews}
            options={this.state.booleanOptions}
            style={{ marginBottom: '1.5rem' }}
            handleValueChange={this.handleStateChange}
            for="mapathons"
          />

          {/* <SelectBox
            id="bathroomScore"
            label={this.context.intl.formatMessage(messages.bathroomScoreLabel)}
            value={this.state.bathroomScore}
            options={this.state.starsOptions}
            style={{ marginBottom: '1.5rem' }}
            handleValueChange={this.handleStateChange}
          />

          <SelectBox
            id="allowsGuideDog"
            label={this.context.intl.formatMessage(
              messages.allowsGuideDogLabel
            )}
            value={this.state.allowsGuideDog}
            options={this.state.booleanOptions}
            style={{ marginBottom: '1.5rem' }}
            handleValueChange={this.handleStateChange}
          />

          <SelectBox
            id="hasParking"
            label={this.context.intl.formatMessage(messages.hasParkingLabel)}
            value={this.state.hasParking}
            options={this.state.booleanOptions}
            style={{ marginBottom: '1.5rem' }}
            handleValueChange={this.handleStateChange}
          />

          <SelectBox
            id="hasSecondEntry"
            label={this.context.intl.formatMessage(
              messages.hasSecondEntryLabel
            )}
            value={this.state.hasSecondEntry}
            options={this.state.booleanOptions}
            style={{ marginBottom: '1.5rem' }}
            handleValueChange={this.handleStateChange}
          />

          <SelectBox
            id="hasWellLit"
            label={this.context.intl.formatMessage(messages.hasWellLitLabel)}
            value={this.state.hasWellLit}
            options={this.state.booleanOptions}
            style={{ marginBottom: '1.5rem' }}
            handleValueChange={this.handleStateChange}
          />

          <SelectBox
            id="isQuiet"
            label={this.context.intl.formatMessage(messages.isQuietLabel)}
            value={this.state.isQuiet}
            options={this.state.booleanOptions}
            style={{ marginBottom: '1.5rem' }}
            handleValueChange={this.handleStateChange}
          />

          <SelectBox
            id="isSpacious"
            label={this.context.intl.formatMessage(messages.isSpaciousLabel)}
            value={this.state.isSpacious}
            options={this.state.booleanOptions}
            style={{ marginBottom: '1.5rem' }}
            handleValueChange={this.handleStateChange}
          />

          <SelectBox
            id="steps"
            label={this.context.intl.formatMessage(messages.stepsLabel)}
            value={this.state.steps}
            options={this.state.stepsOptions}
            handleValueChange={this.handleStateChange}
          /> */}
        </Content>

        <Footer>
          <Button
            backgroundColor={colors.lightGrey}
            color={colors.darkestGrey}
            disabled={this.props.sendingRequest}
            onClickHandler={this.props.clear}
          >
            {this.context.intl.formatMessage(messages.clearFiltersButton)}
          </Button>
          <Button
            backgroundColor={colors.primary}
            color={colors.darkestGrey}
            disabled={this.props.sendingRequest}
            onClickHandler={() =>
              this.props.apply({
                type: this.state.type,
                entryScore: this.state.entryScore,
                bathroomScore: this.state.bathroomScore,
                allowsGuideDog: this.state.allowsGuideDog,
                hasParking: this.state.hasParking,
                hasSecondEntry: this.state.hasSecondEntry,
                hasWellLit: this.state.hasWellLit,
                isQuiet: this.state.isQuiet,
                isSpacious: this.state.isSpacious,
                steps: this.state.steps
              })
            }
          >
            {this.context.intl.formatMessage(messages.applyFiltersButton)}
          </Button>
        </Footer>
      </Dialog>
    )
  }
}

export default FiltersDialog
