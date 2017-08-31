import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import FacebookAuth from '../../components/FacebookAuth'
import makeSelectApp from '../App/selector'

import { facebookAuthRequest } from './actions'
import makeSelect from './selector'

const mapStateToProps = createStructuredSelector({
  authFailed: makeSelect('authFailed'),
  authenticated: makeSelectApp('authenticated')
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
