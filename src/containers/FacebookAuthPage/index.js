import { connect } from 'react-redux'

import FacebookAuth from '../../components/FacebookAuth'

import { facebookAuthRequest } from './actions'

const mapDispatchToProps = dispatch => ({
  handleFacebookAuth: locationSearch => {
    const accessToken = locationSearch.split('access_token=')[1].split('&')[0]
    dispatch(facebookAuthRequest(accessToken))
  }
})

const FacebookAuthPage = connect(mapDispatchToProps)(FacebookAuth)

export default FacebookAuthPage
