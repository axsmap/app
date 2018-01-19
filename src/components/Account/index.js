import { object } from 'prop-types'
import React from 'react'
import { Route } from 'react-router-dom'

import Petitions from '../../containers/PetitionsPage'
import TabBar from '../../containers/TabBar'
import TopBar from '../../containers/TopBar'
import Footer from '../Footer'
import SideNav from '../SideNav'
import SideNavContainer from '../SideNav/Container'
import NavBar from '../SideNav/NavBar'
import Wrapper from '../Wrapper'

const Profile = () => <h1>Profile</h1>

const config = [
  {
    id: 'my-account',
    title: 'My Account',
    rows: [
      { label: 'Edit Profile', link: '/edit-profile' },
      {
        label: 'Petitions',
        link: '/petitions'
      }
    ]
  },
  {
    id: 'sign-out',
    hideOn: 'desktop,widescreen',
    rows: [
      {
        label: 'Sign Out',
        link: '/sign-out'
      }
    ]
  }
]

const Account = ({ match }) => (
  <Wrapper>
    <TopBar hideOn="phone" />
    <NavBar defaultTitle="Account" config={config} />

    <SideNavContainer>
      <SideNav config={config} />
      <Route path={`${match.url}/edit-profile`} component={Profile} />
      <Route path={`${match.url}/petitions`} component={Petitions} />
    </SideNavContainer>

    <Footer hideOn="phone,tablet" isNarrow />

    <TabBar />
  </Wrapper>
)

Account.propTypes = {
  match: object.isRequired
}

export default Account
