import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'

import Footer from '../Footer'
import TabBar from '../../containers/TabBar'
import TopBar from '../../containers/TopBar'
import Wrapper from '../Wrapper'

class Teams extends PureComponent {
  componentDidMount() {
    this.props.setTeamsUrl()
  }

  render() {
    return (
      <Wrapper>
        <TopBar />

        <h1>Teams</h1>

        <Footer />

        <TabBar />
      </Wrapper>
    )
  }
}

Teams.propTypes = {
  setTeamsUrl: PropTypes.func.isRequired
}

export default Teams
