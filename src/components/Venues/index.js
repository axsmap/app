import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'

import Footer from '../Footer'
import TabBar from '../../containers/TabBar'
import TopBar from '../../containers/TopBar'
import Wrapper from '../Wrapper'

class Venues extends PureComponent {
  componentDidMount() {
    this.props.setVenuesUrl()
  }

  render() {
    return (
      <Wrapper>
        <TopBar />

        <h1>Venues</h1>

        <Footer />

        <TabBar />
      </Wrapper>
    )
  }
}

Venues.propTypes = {
  setVenuesUrl: PropTypes.func.isRequired
}

export default Venues
