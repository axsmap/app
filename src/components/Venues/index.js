import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'

import Footer from '../Footer'
import Spinner from '../Spinner'
import TabBar from '../../containers/TabBar'
import TopBar from '../../containers/TopBar'
import Wrapper from '../Wrapper'

import Map from './Map'

class Venues extends PureComponent {
  componentDidMount() {
    this.props.setVenuesUrl()
    this.props.getVenues()
  }

  componentWillUnmount() {
    this.props.clearState()
  }

  render() {
    return (
      <Wrapper>
        <TopBar />

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
            setShowSearchHere={this.props.setShowSearchHere}
            loadCenterVenues={this.props.loadCenterVenues}
            getUserLocation={this.props.getUserLocation}
          />
        )}

        <Footer />

        <TabBar />
      </Wrapper>
    )
  }
}

Venues.propTypes = {
  loadingMap: PropTypes.bool.isRequired,
  userLocation: PropTypes.object.isRequired,
  centerLocation: PropTypes.object.isRequired,
  showSearchHere: PropTypes.bool.isRequired,
  sendingRequest: PropTypes.bool.isRequired,
  showUserMarker: PropTypes.bool.isRequired,
  visibleVenues: PropTypes.array.isRequired,
  setVenuesUrl: PropTypes.func.isRequired,
  getVenues: PropTypes.func.isRequired,
  clearState: PropTypes.func.isRequired,
  setShowSearchHere: PropTypes.func.isRequired,
  loadCenterVenues: PropTypes.func.isRequired,
  getUserLocation: PropTypes.func.isRequired
}

export default Venues
