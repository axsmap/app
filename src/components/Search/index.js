import { camelCase, isEmpty, upperFirst } from 'lodash'
import { intlShape } from 'react-intl'
import PropTypes from 'prop-types'
import React from 'react'

import filterIcon from '../../images/filter.svg'
import leftArrowIcon from '../../images/left-arrow.svg'
import Spinner from '../Spinner'

import Filters from './Filters'
import FiltersButton from './FiltersButton'
import FiltersLabel from './FiltersLabel'
import FiltersOption from './FiltersOption'
import FiltersSelect from './FiltersSelect'
import FiltersTitle from './FiltersTitle'
import Header from './Header'
import HeaderButton from './HeaderButton'
import HeaderIcon from './HeaderIcon'
import HeaderInput from './HeaderInput'
import { positionErrors, venuesTypes } from './constants'
import LocationMessage from './LocationMessage'
import messages from './messages'
import Results from './Results'
import ResultsData from './ResultsData'
import Wrapper from './Wrapper'

const Search = (props, context) => {
  if (!props.showSearch) {
    return null
  }

  let content = null
  if (props.showFilters) {
    content = (
      <Filters>
        <FiltersTitle>
          {context.intl.formatMessage(messages.filtersTitle)}
        </FiltersTitle>
        <FiltersLabel>
          {context.intl.formatMessage(messages.filtersTypeOfVenue)}
        </FiltersLabel>
        <FiltersSelect value={props.venueType} onChange={props.changeVenueType}>
          {venuesTypes.map(type =>
            <FiltersOption value={type} key={type}>
              {context.intl.formatMessage(
                messages[`filters${upperFirst(camelCase(type))}`]
              )}
            </FiltersOption>
          )}
        </FiltersSelect>
        <FiltersButton onClick={props.hideFilters}>
          {context.intl.formatMessage(messages.filtersButton)}
        </FiltersButton>
      </Filters>
    )
  } else if (props.currentlySending) {
    content = <Spinner />
  } else if (props.venues.length > 0) {
    content = (
      <Results>
        {props.venues.map(venue =>
          <ResultsData
            key={venue.placeId}
            to={`/venues/${venue.placeId}`}
            photo={venue.photo}
            icon={venue.icon}
            name={venue.name}
            generalScore={venue.generalScore}
            entryScore={venue.entryScore}
            bathroomScore={venue.bathroomScore}
          />
        )}
      </Results>
    )
  } else if (isEmpty(props.location)) {
    let errorText = ''

    if (props.locationError === positionErrors.NOT_SUPPORTED) {
      errorText = context.intl.formatMessage(messages.locationError1)
    } else if (props.locationError === positionErrors.PERMISSION_DENIED) {
      errorText = context.intl.formatMessage(messages.locationError2)
    } else if (props.locationError === positionErrors.POSITION_UNAVAILABLE) {
      errorText = context.intl.formatMessage(messages.locationError3)
    } else if (props.locationError === positionErrors.TIMED_OUT) {
      errorText = context.intl.formatMessage(messages.locationError4)
    }

    content = (
      <LocationMessage
        messageText={context.intl.formatMessage(messages.locationMessage)}
        actionText={context.intl.formatMessage(messages.locationAction)}
        errorText={errorText}
        actionHandler={props.getLocation}
      />
    )
  }

  return (
    <Wrapper>
      <Header>
        <HeaderButton onClick={props.hideSearch}>
          <HeaderIcon src={leftArrowIcon} alt="Left arrow icon" />
        </HeaderButton>
        <HeaderInput
          value={props.input}
          placeholder={context.intl.formatMessage(messages.inputPlaceholder)}
          onChange={props.changeInput}
          onFocus={props.onFocusInput}
        />
        <HeaderButton onClick={props.toggleShowFilters}>
          <HeaderIcon src={filterIcon} alt="Filter icon" />
        </HeaderButton>
      </Header>
      {content}
    </Wrapper>
  )
}

Search.contextTypes = {
  intl: intlShape
}

Search.propTypes = {
  currentlySending: PropTypes.bool.isRequired,
  input: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  locationError: PropTypes.string.isRequired,
  showFilters: PropTypes.bool.isRequired,
  venueType: PropTypes.string.isRequired,
  venues: PropTypes.array.isRequired,
  changeInput: PropTypes.func.isRequired,
  changeVenueType: PropTypes.func.isRequired,
  getLocation: PropTypes.func.isRequired,
  hideFilters: PropTypes.func.isRequired,
  onFocusInput: PropTypes.func.isRequired,
  toggleShowFilters: PropTypes.func.isRequired,
  showSearch: PropTypes.bool.isRequired,
  hideSearch: PropTypes.func.isRequired
}

export default Search
