import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'

import TabBar from '../../containers/TabBar'
import TopBar from '../../containers/TopBar'
import Wrapper from '../Wrapper'

class Mapathons extends PureComponent {
  componentDidMount() {
    this.props.setMapathonsUrl()
  }

  render() {
    return (
      <Wrapper>
        <TopBar />

        <h1>Mapathons</h1>

        <TabBar />
      </Wrapper>
    )
  }
}

Mapathons.propTypes = {
  setMapathonsUrl: PropTypes.func.isRequired
}

export default Mapathons
