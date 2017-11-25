import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
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
    this.props.setVenuesUrl()
    this.props.getVenues()
  }

  componentWillUnmount() {
    this.props.clearState()
  }

  render() {
    const notificationMessage = this.props.notificationMessage || 'serverError'

    return (
      <Wrapper>
        <TopBar />

        <Notification
          message={this.context.intl.formatMessage(
            messages[notificationMessage]
          )}
        />

        <FiltersDialog
          visible={this.props.filters.visible}
          sendingRequest={this.props.sendingRequest}
          hide={this.props.hideFilters}
        />

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

Venues.propTypes = {
  notificationMessage: PropTypes.string,
  filters: PropTypes.shape({
    visible: PropTypes.bool.isRequired
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
  setVenuesUrl: PropTypes.func.isRequired,
  getVenues: PropTypes.func.isRequired,
  clearState: PropTypes.func.isRequired,
  hideFilters: PropTypes.func.isRequired,
  setCenterLocation: PropTypes.func.isRequired,
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
