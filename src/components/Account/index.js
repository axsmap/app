import { bool, func, object } from 'prop-types'
import React from 'react'
import Helmet from 'react-helmet'
import { intlShape } from 'react-intl'
import { Route } from 'react-router-dom'
import styled from 'styled-components'

import Button from '../Button'
import Petitions from '../../containers/PetitionsPage'
import TabBar from '../../containers/TabBar'
import TopBar from '../../containers/TopBar'
import { colors, media } from '../../styles'
import Footer from '../Footer'
import SideNav from '../SideNav'
import SideNavContainer from '../SideNav/Container'
import NavBar from '../SideNav/NavBar'
import Wrapper from '../Wrapper'

import messages from './messages'

const Profile = () => <h1>Profile</h1>

const SignOutButton = styled(Button)`
  align-self: center;

  margin: 2rem 0 0;
  max-width: 12rem;
  width: 50%;

  ${media.tablet`
    margin: 0;
    width: 100%;
  `};
`

const Account = ({ match, sendingRequest, signOutRequest }, context) => {
  const formatMessage = context.intl.formatMessage
  const config = [
    {
      id: 'my-account',
      title: formatMessage(messages.myAccountTitle),
      rows: [
        {
          label: formatMessage(messages.editProfileLabel),
          link: '/edit-profile'
        },
        {
          label: formatMessage(messages.petitionsLabel),
          link: '/petitions'
        }
      ]
    },
    {
      id: 'sign-out',
      hideOn: 'desktop,widescreen',
      rows: [
        {
          component: (
            <SignOutButton
              backgroundColor={colors.alert}
              color="white"
              disabled={sendingRequest}
              onClickHandler={signOutRequest}
            >
              {formatMessage(messages.signOutLabel)}
            </SignOutButton>
          )
        }
      ]
    }
  ]

  return (
    <Wrapper>
      <Helmet title={formatMessage(messages.pageTitle)} />

      <TopBar hideOn="phone" />
      <NavBar
        defaultTitle={formatMessage(messages.headerTitle)}
        config={config}
      />

      <SideNavContainer>
        <SideNav config={config} />
        <Route path={`${match.url}/edit-profile`} component={Profile} />
        <Route path={`${match.url}/petitions`} component={Petitions} />
      </SideNavContainer>

      <Footer hideOn="phone,tablet" isNarrow />

      <TabBar />
    </Wrapper>
  )
}

Account.contextTypes = {
  intl: intlShape
}

Account.propTypes = {
  match: object.isRequired,
  sendingRequest: bool.isRequired,
  signOutRequest: func.isRequired
}

export default Account
