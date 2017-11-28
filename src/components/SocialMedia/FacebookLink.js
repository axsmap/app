import PropTypes from 'prop-types'
import React from 'react'

import Icon from '../Icon'
import { colors } from '../../styles'

import Link from './Link'

const FacebookLink = props => (
  <Link
    href={`https://www.facebook.com/v2.10/dialog/oauth?
      client_id=${process.env.REACT_APP_FACEBOOK_ID}
      &redirect_uri=${process.env.REACT_APP_FACEBOOK_CALLBACK_URL}
      &response_type=code
      &scope=email,public_profile`}
    width="49%"
    backgroundColor={colors.facebook}
    color="white"
    disabled={props.disabled}
  >
    <Icon glyph="facebook" size={1.5} />
    <p style={{ margin: 0 }}>Facebook</p>
  </Link>
)

FacebookLink.propTypes = {
  disabled: PropTypes.bool.isRequired
}

export default FacebookLink
