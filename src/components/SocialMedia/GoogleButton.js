import React, { Component } from 'react'

import { colors } from '../../styles'
import googleIcon from '../../images/google.svg'

import Button from './Button'
import ButtonLink from './ButtonLink'
import Icon from './Icon'

class GoogleButton extends Component {
  componentDidMount() {
    function callback() {
      window.gapi.load('auth2', () => {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        window.auth2 = window.gapi.auth2.init({
          client_id: `${process.env.REACT_APP_GOOGLE_ID}`,
          cookiepolicy: 'single_host_origin'
        })
        const element = document.getElementById('googleBtn')
        window.auth2.attachClickHandler(
          element,
          {},
          googleUser => {
            const profile = googleUser.getBasicProfile()
            console.log(googleUser.getAuthResponse().id_token)
            console.log(profile.getName())
            console.log(profile.getGivenName())
            console.log(profile.getFamilyName())
            console.log(profile.getImageUrl())
            console.log(profile.getEmail())
          },
          () => {}
        )
      })
    }

    const e = document.createElement('script')
    e.type = 'text/javascript'
    e.async = true
    e.onload = callback
    e.src = 'https://apis.google.com/js/api:client.js'

    const t = document.getElementsByTagName('script')[0]
    t.parentNode.insertBefore(e, t)
  }

  render() {
    return (
      <ButtonLink id="googleBtn">
        <Button backgroundColor={colors.google}>
          <Icon src={googleIcon} />
          <div>Google</div>
        </Button>
      </ButtonLink>
    )
  }
}

export default GoogleButton
