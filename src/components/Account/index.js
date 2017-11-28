import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'

import Footer from '../Footer'
import TabBar from '../../containers/TabBar'
import TopBar from '../../containers/TopBar'
import Wrapper from '../Wrapper'

class Account extends PureComponent {
  componentDidMount() {
    this.props.setAccountUrl()
  }

  render() {
    return (
      <Wrapper>
        <TopBar />

        <h1>Account</h1>

        <Footer />

        <TabBar />
      </Wrapper>
    )
  }
}

Account.propTypes = {
  setAccountUrl: PropTypes.func.isRequired
}

export default Account
