import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'

import TabBar from '../TabBar'
import Wrapper from '../Wrapper'

class Venues extends PureComponent {
  componentDidMount() {
    this.props.setVenuesUrl()
  }

  render() {
    return (
      <Wrapper>
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
