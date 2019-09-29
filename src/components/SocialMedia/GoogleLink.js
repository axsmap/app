import PropTypes from 'prop-types'
import React from 'react'

import Icon from '../Icon'
import { colors } from '../../styles'

import Link from './Link'

const GoogleLink = props => (
  <Link
    href={`https://accounts.google.com/o/oauth2/v2/auth?client_id=${
      process.env.REACT_APP_GOOGLE_ID
    }&redirect_uri=${
      process.env.REACT_APP_GOOGLE_CALLBACK_URL
    }&response_type=code&scope=email profile`}
    width="49%"
    backgroundColor={colors.google}
    color="white"
    disabled={props.disabled}
  >
    <Icon glyph="google" size={1.5} />
    <p style={{ margin: 0 }}>Google</p>
  </Link>
)

GoogleLink.propTypes = {
  disabled: PropTypes.bool.isRequired
}

export default GoogleLink
