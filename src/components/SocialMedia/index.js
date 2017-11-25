import PropTypes from 'prop-types'
import React from 'react'

import FacebookLink from './FacebookLink'
import GoogleLink from './GoogleLink'
import Wrapper from './Wrapper'

const SocialMedia = props => (
  <Wrapper>
    <FacebookLink disabled={props.disabled} />
    <GoogleLink disabled={props.disabled} />
  </Wrapper>
)

SocialMedia.propTypes = {
  disabled: PropTypes.bool.isRequired
}

export default SocialMedia
