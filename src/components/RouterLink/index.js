import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { createLocation } from 'history'

export default withRouter(
  ({ staticContext, history, location, match, ...rest }) => (
    <Link
      {...rest}
      onClick={event => {
        if (rest.onClick) rest.onClick(event)
        if (event.metaKey || event.ctrlKey) return

        event.preventDefault()

        if (window.appUpdateAvailable === true) {
          const nextLocation =
            typeof rest.to === 'string'
              ? createLocation(rest.to, null, null, history.location)
              : rest.to
          window.location = history.createHref(nextLocation)
        } else {
          history.push(rest.to)
        }
      }}
    />
  )
)
