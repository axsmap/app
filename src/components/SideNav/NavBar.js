import { array, object, string } from 'prop-types'
import React from 'react'
import { withRouter } from 'react-router-dom'

import NavBar from '../NavBar'

const findTitle = (defaultTitle, config, match) => {
  if (location.pathname === match.url) {
    return defaultTitle
  }

  for (let group = 0; group < config.length; group += 1) {
    const groupObj = config[group]
    for (let row = 0; row < groupObj.rows.length; row += 1) {
      const rowObj = groupObj.rows[row]
      if (location.pathname.endsWith(rowObj.link)) {
        return rowObj.label
      }
    }
  }

  return defaultTitle
}

const CustomNavBar = ({ defaultTitle, config, match }) => {
  const title = findTitle(defaultTitle, config, match)
  return (
    <NavBar
      hideOn="desktop,widescreen"
      isNarrow
      backURL={match.url}
      hideBackButton={location.pathname === match.url}
      title={title}
    />
  )
}

CustomNavBar.propTypes = {
  config: array.isRequired,
  defaultTitle: string.isRequired,
  match: object
}

export default withRouter(CustomNavBar)
