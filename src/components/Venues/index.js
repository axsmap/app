import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import Helmet from 'react-helmet'
import { intlShape } from 'react-intl'

import Notification from '../../containers/Notification'
import Spinner from '../Spinner'
import TabBar from '../../containers/TabBar'
import TopBar from '../../containers/TopBar'
import Wrapper from '../Wrapper'

import FiltersDialog from './FiltersDialog'
import List from './List'
import Map from './Map'
import messages from './messages'

class Venues extends PureComponent {
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

        {this.props.notificationMessage ? (
          <Notification
            message={this.context.intl.formatMessage(
              messages[this.props.notificationMessage]
            )}
          />
        ) : null}

        {this.props.filters.visible ? (
          <FiltersDialog
            sendingRequest={this.props.sendingRequest}
            type={this.props.filters.type}
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
          showFilters={this.props.showFilters}
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

Venues.propTypes = {
  notificationMessage: PropTypes.string,
  filters: PropTypes.shape({
    visible: PropTypes.bool.isRequired,
    type: PropTypes.string.isRequired
  }).isRequired,
  listVisibility: PropTypes.bool.isRequired,
  loadingVenues: PropTypes.bool.isRequired,
  incomingVenues: PropTypes.bool.isRequired,
  loadingMap: PropTypes.bool.isRequired,
  mapVisibility: PropTypes.bool.isRequired,
  userLocation: PropTypes.object.isRequired,
  centerLocation: PropTypes.object.isRequired,
  showSearchHere: PropTypes.bool.isRequired,
  sendingRequest: PropTypes.bool.isRequired,
  showUserMarker: PropTypes.bool.isRequired,
  visibleVenues: PropTypes.array.isRequired,
  popupVisibility: PropTypes.bool.isRequired,
  getVenues: PropTypes.func.isRequired,
  clearState: PropTypes.func.isRequired,
  hideFilters: PropTypes.func.isRequired,
  clearFilters: PropTypes.func.isRequired,
  applyFilters: PropTypes.func.isRequired,
  setCenterLocation: PropTypes.func.isRequired,
  showFilters: PropTypes.func.isRequired,
  showMap: PropTypes.func.isRequired,
  onClickMap: PropTypes.func.isRequired,
  onDragMap: PropTypes.func.isRequired,
  onZoomMap: PropTypes.func.isRequired,
  loadCenterVenues: PropTypes.func.isRequired,
  showPopup: PropTypes.func.isRequired,
  hidePopup: PropTypes.func.isRequired,
  getUserLocation: PropTypes.func.isRequired,
  showList: PropTypes.func.isRequired
}

Venues.contextTypes = {
  intl: intlShape
}

export default Venues
