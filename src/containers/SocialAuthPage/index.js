import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import SocialAuth from '../../components/SocialAuth'
import makeSelectApp from '../App/selector'

import { facebookAuthRequest, googleAuthRequest } from './actions'
import makeSelect from './selector'

const mapStateToProps = createStructuredSelector({
  authFailed: makeSelect('authFailed'),
  authenticated: makeSelectApp('authenticated')
})

const mapDispatchToProps = dispatch => ({
  handleSocialAuth: location => {
    const social = location.pathname.split('auth/')[1]
    if (social === 'facebook') {
      if (!location.hash.includes('access_token=')) return
      const accessToken = location.hash.split('access_token=')[1].split('&')[0]
      dispatch(facebookAuthRequest(accessToken))
    } else {
      if (!location.search.includes('code=')) return
      const code = location.search.split('code=')[1].split('&')[0]
      dispatch(googleAuthRequest(code))
    }
  }
})

const SocialAuthPage = connect(mapStateToProps, mapDispatchToProps)(SocialAuth)

export default SocialAuthPage
