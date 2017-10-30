import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'

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

        <TabBar />
      </Wrapper>
    )
  }
}

Venues.propTypes = {
  setVenuesUrl: PropTypes.func.isRequired
}

export default Venues
