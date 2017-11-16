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
            location={this.props.location}
            showSearchHere={this.props.showSearchHere}
            sendingRequest={this.props.sendingRequest}
            venues={this.props.visibleVenues}
            setShowSearchHere={this.props.setShowSearchHere}
            loadNearbyVenues={this.props.loadNearbyVenues}
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
  location: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired
  }).isRequired,
  showSearchHere: PropTypes.bool.isRequired,
  sendingRequest: PropTypes.bool.isRequired,
  visibleVenues: PropTypes.array.isRequired,
  setVenuesUrl: PropTypes.func.isRequired,
  getVenues: PropTypes.func.isRequired,
  clearState: PropTypes.func.isRequired,
  setShowSearchHere: PropTypes.func.isRequired,
  loadNearbyVenues: PropTypes.func.isRequired
}

export default Venues
