import { camelCase, isEmpty, upperFirst } from 'lodash'
import { intlShape } from 'react-intl'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import filterIcon from '../../images/filter.svg'
import leftArrowIcon from '../../images/left-arrow.svg'
import Spinner from '../Spinner'

import Filters from './Filters'
import FiltersButton from './FiltersButton'
import FiltersLabel from './FiltersLabel'
import FiltersOption from './FiltersOption'
import FiltersSelect from './FiltersSelect'
import FiltersTitle from './FiltersTitle'
import GoogleBanner from './GoogleBanner'
import Header from './Header'
import HeaderButton from './HeaderButton'
import HeaderIcon from './HeaderIcon'
import HeaderInput from './HeaderInput'
import LoadSpinner from './LoadSpinner'
import LocationMessage from './LocationMessage'
import messages from './messages'
import NoResults from './NoResults'
import { positionErrors, venuesTypes } from './constants'
import Results from './Results'
import ResultsData from './ResultsData'
import Wrapper from './Wrapper'

class Search extends Component {
  constructor(props) {
    super(props)
    this.loadVenues = this.loadVenues.bind(this)
  }

  componentDidMount() {
    window.addEventListener('scroll', this.loadVenues)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.loadVenues)
  }

  loadVenues() {
    const documentHeight =
      document.body.scrollHeight >=
      ((document.documentElement && document.documentElement.scrollHeight) ||
        document.body.scrollHeight)
        ? document.body.scrollHeight
        : (document.documentElement && document.documentElement.scrollHeight) ||
          document.body.scrollHeight
    const scrollHeight = window.innerHeight + window.pageYOffset

    if (scrollHeight > documentHeight * 0.9) {
      this.props.loadVenues()
    }
  }

  render() {
    if (!this.props.showSearch) {
      return null
    }

    let content = null
    if (this.props.showFilters) {
      content = (
        <Filters>
          <FiltersTitle>
            {this.context.intl.formatMessage(messages.filtersTitle)}
          </FiltersTitle>
          <FiltersLabel>
            {this.context.intl.formatMessage(messages.filtersTypeOfVenue)}
          </FiltersLabel>
          <FiltersSelect
            value={this.props.venueType}
            onChange={this.props.changeVenueType}
          >
            {venuesTypes.map(type =>
              <FiltersOption value={type} key={type}>
                {this.context.intl.formatMessage(
                  messages[`filters${upperFirst(camelCase(type))}`]
                )}
              </FiltersOption>
            )}
          </FiltersSelect>
          <FiltersButton onClick={this.props.hideFilters}>
            {this.context.intl.formatMessage(messages.filtersButton)}
          </FiltersButton>
        </Filters>
      )
    } else if (this.props.currentlySending) {
      content = [
        <Spinner key="spinner" />,
        <GoogleBanner key="google-banner" />
      ]
    } else if (isEmpty(this.props.location)) {
      let errorText = ''

      if (this.props.locationError === positionErrors.NOT_SUPPORTED) {
        errorText = this.context.intl.formatMessage(messages.locationError1)
      } else if (
        this.props.locationError === positionErrors.PERMISSION_DENIED
      ) {
        errorText = this.context.intl.formatMessage(messages.locationError2)
      } else if (
        this.props.locationError === positionErrors.POSITION_UNAVAILABLE
      ) {
        errorText = this.context.intl.formatMessage(messages.locationError3)
      } else if (this.props.locationError === positionErrors.TIMED_OUT) {
        errorText = this.context.intl.formatMessage(messages.locationError4)
      }

      content = (
        <LocationMessage
          messageText={this.context.intl.formatMessage(
            messages.locationMessage
          )}
          actionText={this.context.intl.formatMessage(messages.locationAction)}
          errorText={errorText}
          actionHandler={this.props.getLocation}
        />
      )
    } else if (this.props.visibleVenues.length === 0) {
      content = (
        <NoResults
          messageText={this.context.intl.formatMessage(
            messages.noResultsMessage
          )}
        />
      )
    } else if (this.props.visibleVenues.length > 0) {
      content = (
        <Results>
          {this.props.visibleVenues.map(venue =>
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
          {this.props.loadingVenues ? <LoadSpinner /> : null}
        </Results>
      )
    }

    return (
      <Wrapper>
        <Header>
          <HeaderButton onClick={this.props.hideSearch}>
            <HeaderIcon src={leftArrowIcon} alt="Left arrow icon" />
          </HeaderButton>
          <HeaderInput
            value={this.props.input}
            placeholder={this.context.intl.formatMessage(
              messages.inputPlaceholder
            )}
            onChange={this.props.changeInput}
            onFocus={this.props.onFocusInput}
          />
          <HeaderButton onClick={this.props.toggleShowFilters}>
            <HeaderIcon src={filterIcon} alt="Filter icon" />
          </HeaderButton>
        </Header>
        {content}
      </Wrapper>
    )
  }
}

Search.contextTypes = {
  intl: intlShape
}

Search.propTypes = {
  currentlySending: PropTypes.bool.isRequired,
  input: PropTypes.string.isRequired,
  loadingVenues: PropTypes.bool.isRequired,
  location: PropTypes.string.isRequired,
  locationError: PropTypes.string.isRequired,
  showFilters: PropTypes.bool.isRequired,
  venueType: PropTypes.string.isRequired,
  visibleVenues: PropTypes.array.isRequired,
  changeInput: PropTypes.func.isRequired,
  changeVenueType: PropTypes.func.isRequired,
  getLocation: PropTypes.func.isRequired,
  hideFilters: PropTypes.func.isRequired,
  loadVenues: PropTypes.func.isRequired,
  onFocusInput: PropTypes.func.isRequired,
  toggleShowFilters: PropTypes.func.isRequired,
  showSearch: PropTypes.bool.isRequired,
  hideSearch: PropTypes.func.isRequired
}

export default Search
