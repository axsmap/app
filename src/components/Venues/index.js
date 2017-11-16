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

  render() {
    return (
      <Wrapper>
        <TopBar />

        {this.props.loadingMap ? (
          <Spinner />
        ) : (
          <Map
            location={this.props.location}
            venues={this.props.visibleVenues}
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
  visibleVenues: PropTypes.array.isRequired,
  setVenuesUrl: PropTypes.func.isRequired,
  getVenues: PropTypes.func.isRequired
}

export default Venues
