import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { intlShape } from 'react-intl'

import Footer from '../Footer'
import Notification from '../../containers/Notification'
import Spinner from '../Spinner'
import TabBar from '../../containers/TabBar'
import TopBar from '../../containers/TopBar'
import Wrapper from '../Wrapper'

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

        {this.props.loadingMap ? (
          <Spinner />
        ) : (
          <Map
            userLocation={this.props.userLocation}
            centerLocation={this.props.centerLocation}
            showSearchHere={this.props.showSearchHere}
            sendingRequest={this.props.sendingRequest}
            showUserMarker={this.props.showUserMarker}
            venues={this.props.visibleVenues}
            infoboxVisibility={this.props.infoboxVisibility}
            infoboxLocation={this.props.infoboxLocation}
            onDragMap={this.props.onDragMap}
            onZoomMap={this.props.onZoomMap}
            loadCenterVenues={this.props.loadCenterVenues}
            getUserLocation={this.props.getUserLocation}
            showInfobox={this.props.showInfobox}
            hideInfobox={this.props.hideInfobox}
          />
        )}

        <Footer />

        <TabBar />
      </Wrapper>
    )
  }
}

Venues.propTypes = {
  notificationMessage: PropTypes.string,
  loadingMap: PropTypes.bool.isRequired,
  userLocation: PropTypes.object.isRequired,
  centerLocation: PropTypes.object.isRequired,
  showSearchHere: PropTypes.bool.isRequired,
  sendingRequest: PropTypes.bool.isRequired,
  showUserMarker: PropTypes.bool.isRequired,
  visibleVenues: PropTypes.array.isRequired,
  infoboxVisibility: PropTypes.bool.isRequired,
  infoboxLocation: PropTypes.object.isRequired,
  setVenuesUrl: PropTypes.func.isRequired,
  getVenues: PropTypes.func.isRequired,
  clearState: PropTypes.func.isRequired,
  onDragMap: PropTypes.func.isRequired,
  onZoomMap: PropTypes.func.isRequired,
  loadCenterVenues: PropTypes.func.isRequired,
  getUserLocation: PropTypes.func.isRequired,
  showInfobox: PropTypes.func.isRequired,
  hideInfobox: PropTypes.func.isRequired
}

Venues.contextTypes = {
  intl: intlShape
}

export default Venues
