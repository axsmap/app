import { array, bool, func, object } from 'prop-types'
import React, { PureComponent } from 'react'
import Helmet from 'react-helmet'
import { intlShape } from 'react-intl'

import Spinner from '../Spinner'
import TabBar from '../../containers/TabBar'
import TopBar from '../../containers/TopBar'
import Wrapper from '../Wrapper'

import FiltersDialog from './FiltersDialog'
import List from './List'
import Map from './Map'
import messages from './messages'

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
    showList: func.isRequired
  }

  static contextTypes = {
    intl: intlShape
  }

  componentDidMount() {
    this.props.getVenues()
  }

  componentWillUnmount() {
    this.props.clearState()
  }

  render() {
    return (
      <Wrapper>
        <Helmet title={this.context.intl.formatMessage(messages.pageTitle)} />

        <TopBar />

        {this.props.filters.visible ? (
          <FiltersDialog
            filters={this.props.filters}
            sendingRequest={this.props.sendingRequest}
            hide={this.props.hideFilters}
            clear={this.props.clearFilters}
            apply={this.props.applyFilters}
          />
        ) : null}

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
