import { object } from 'prop-types'
import React from 'react'
import { Route } from 'react-router-dom'

import TabBar from '../../containers/TabBar'
import TopBar from '../../containers/TopBar'
import Footer from '../Footer'
import SideNav from '../SideNav'
import SideNavContainer from '../SideNav/Container'
import NavBar from '../SideNav/NavBar'
import Wrapper from '../Wrapper'

const Profile = () => <h1>Profile</h1>
const AccountItem = () => <h1>Account</h1>
const Emails = () => <h1>Emails</h1>
const DevSettings = () => <h1>Developer Settings</h1>
const Org = () => <h1>Org 1</h1>

const Account = ({ match }) => {
  const config = [
    {
      id: 'per-settings',
      title: 'Personal settings',
      rows: [
        { label: 'Profile', link: '/profile' },
        { label: 'Account', link: '/account' },
        { label: 'Emails', link: '/emails' }
      ]
    },
    {
      id: 'dev-settings',
      rows: [{ label: 'Developer settings', link: '/dev-settings' }]
    },
    {
      id: 'org-settings',
      title: 'Organization settings',
      rows: [{ label: 'Org 1', link: '/org1' }]
    }
  ]

  return (
    <Wrapper>
      <TopBar hideOn="phone" />
      <NavBar defaultTitle="Account" config={config} />

      <SideNavContainer>
        <SideNav config={config} />
        <Route path={`${match.url}/profile`} component={Profile} />
        <Route path={`${match.url}/account`} component={AccountItem} />
        <Route path={`${match.url}/emails`} component={Emails} />
        <Route path={`${match.url}/dev-settings`} component={DevSettings} />
        <Route path={`${match.url}/org1`} component={Org} />
      </SideNavContainer>

      <Footer hideOn="phone" isNarrow />

      <TabBar />
    </Wrapper>
  )
}

Account.propTypes = {
  match: object.isRequired
}

export default Account
