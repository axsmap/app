import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import FacebookAuth from '../../components/FacebookAuth'

import { facebookAuthRequest } from './actions'
import makeSelect from './selector'

const mapStateToProps = createStructuredSelector({
  authFailed: makeSelect('authFailed')
})

const mapDispatchToProps = dispatch => ({
  handleFacebookAuth: locationHash => {
    if (locationHash.indexOf('access_token=') === -1) return
    const accessToken = locationHash.split('access_token=')[1].split('&')[0]
    dispatch(facebookAuthRequest(accessToken))
  }
})

const FacebookAuthPage = connect(mapStateToProps, mapDispatchToProps)(
  FacebookAuth
)

export default FacebookAuthPage
