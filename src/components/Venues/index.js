import { array, bool, func, object } from 'prop-types'
import React, { PureComponent } from 'react'
import ReactGA from 'react-ga'
import Helmet from 'react-helmet'
import { intlShape } from 'react-intl'
import styled from 'styled-components'
import Spinner from '../Spinner'
import { media } from '../../styles'
import TabBar from '../../containers/TabBar'
import TopBar from '../../containers/TopBar'
import Wrp from '../Wrapper'
import FilterButton from './FilterButton'
import WelcomePage from '../../containers/WelcomePage'
import FiltersDialog from './FiltersDialog'
import UsesDialog from './UsesDialog'
import List from './List'
import Map from './Map'
import messages from './messages'

const Wrapper = styled(Wrp)`
  padding: 8rem 0 4rem 0;

  ${media.tablet`
    padding: 4rem 0;
  `};

  ${media.desktop`
    padding: 4rem 0 0 0;
  `};
`
const WelcomeWrap = styled.div`
  width: 100%;
  position: absolute;
  height: 100vh;
  background-color: transparent;
  top: 0;
`

class Venues extends PureComponent {
  static propTypes = {
    filters: object.isRequired,
    listVisibility: bool.isRequired,
    loadingVenues: bool.isRequired,
    incomingVenues: bool.isRequired,
    loadingMap: bool.isRequired,
    mapVisibility: bool.isRequired,
    userLocation: object.isRequired,
    centerLocation: object.isRequired,
    showSearchHere: bool.isRequired,
    sendingRequest: bool.isRequired,
    showUserMarker: bool.isRequired,
    visibleVenues: array.isRequired,
    popupVisibility: bool.isRequired,
    getVenues: func.isRequired,
    clearState: func.isRequired,
    hideFilters: func.isRequired,
    clearFilters: func.isRequired,
    applyFilters: func.isRequired,
    setCenterLocation: func.isRequired,
    showMap: func.isRequired,
    onClickMap: func.isRequired,
    onDragMap: func.isRequired,
    onZoomMap: func.isRequired,
    loadCenterVenues: func.isRequired,
    showPopup: func.isRequired,
    hidePopup: func.isRequired,
    getUserLocation: func.isRequired,
    showList: func.isRequired,
    welcomeVisibility: bool.isRequired,
    usesVisibility: bool.isRequired,
    hideWelcome: func.isRequired,
    hideUses: func.isRequired
  }

  static contextTypes = {
    intl: intlShape
  }

  componentWillMount() {
    ReactGA.pageview(window.location.pathname + window.location.search)
  }

  componentDidMount() {
    this.props.getVenues()

    if (localStorage.getItem('axs-visit')) {
      let visitNumber = localStorage.getItem('axs-visit')
      visitNumber = parseInt(visitNumber) + 1
      localStorage.setItem('axs-visit', visitNumber)
      this.props.hideWelcome()
    } else {
      localStorage.setItem('axs-visit', 1)
    }
  }

  componentWillUnmount() {
    this.props.clearState()
  }

  render() {
    const { formatMessage } = this.context.intl
    return (
      <Wrapper>
        <Helmet title={formatMessage(messages.pageTitle)} />
        <TopBar
          isLarge
          filters={this.props.filters}
          showFilters={this.props.showFilters}
          listVisibility={this.props.listVisibility}
        />
        {this.props.welcomeVisibility && (
          <WelcomeWrap>
            <WelcomePage
              hideWelcome={this.props.hideWelcome}
              placeholderTxt={formatMessage(
                messages.venuesSearchLocationPlaceholder
              )}
              onClickHandler={this.props.showUses}
            />
          </WelcomeWrap>
        )}

        {!this.props.welcomeVisibility && (
          <FilterButton
            label={formatMessage(messages.showFiltersButton)}
            onClickHandler={this.props.showFilters}
            filters={this.props.filters}
            visible={this.props.listVisibility}
          />
        )}

        {this.props.filters.visible ? (
          <FiltersDialog
            filters={this.props.filters}
            sendingRequest={this.props.sendingRequest}
            hide={this.props.hideFilters}
            clear={this.props.clearFilters}
            apply={this.props.applyFilters}
          />
        ) : null}

        {this.props.usesVisibility && (
          <UsesDialog
            sendingRequest={this.props.sendingRequest}
            hide={this.props.hideUses}
          />
        )}

        {!this.props.welcomeVisibility && (
          <List
            visible={this.props.listVisibility}
            loadingVenues={this.props.loadingVenues}
            venues={this.props.visibleVenues}
            sendingRequest={this.props.sendingRequest}
            incomingVenues={this.props.incomingVenues}
            setCenterLocation={this.props.setCenterLocation}
            getVenues={this.props.getVenues}
            showMap={this.props.showMap}
          />
        )}

        {this.props.loadingMap ? (
          <Spinner />
        ) : (
          <Map
            visible={this.props.mapVisibility}
            userLocation={this.props.userLocation}
            centerLocation={this.props.centerLocation}
            showSearchHere={this.props.showSearchHere}
            sendingRequest={this.props.sendingRequest}
            showUserMarker={this.props.showUserMarker}
            venues={this.props.visibleVenues}
            popupVisibility={this.props.popupVisibility}
            onClickMap={this.props.onClickMap}
            onDragMap={this.props.onDragMap}
            onZoomMap={this.props.onZoomMap}
            loadCenterVenues={this.props.loadCenterVenues}
            showPopup={this.props.showPopup}
            hidePopup={this.props.hidePopup}
            getUserLocation={this.props.getUserLocation}
            showList={this.props.showList}
          />
        )}

        <TabBar />
      </Wrapper>
    )
  }
}

export default Venues
