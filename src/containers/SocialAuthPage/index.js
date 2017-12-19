import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import SocialAuth from '../../components/SocialAuth'
import makeSelectApp from '../App/selector'

import { facebookAuthRequest, googleAuthRequest } from './actions'
import makeSelectSocialAuth from './selector'

const mapStateToProps = createStructuredSelector({
  authFailed: makeSelectSocialAuth('authFailed'),
  isAuthenticated: makeSelectApp('isAuthenticated')
})

const mapDispatchToProps = dispatch => ({
  handleSocialAuth: location => {
    if (!location.search.includes('code=')) return
    const social = location.pathname.split('auth/')[1]
    const code = location.search.split('code=')[1].split('&')[0]
    if (social === 'facebook') {
      dispatch(facebookAuthRequest(code))
    } else {
      dispatch(googleAuthRequest(code))
    }
  }
})

const SocialAuthPage = connect(mapStateToProps, mapDispatchToProps)(SocialAuth)

export default SocialAuthPage
