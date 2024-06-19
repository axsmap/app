import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { createPath } from 'history'

export default 
  ({...rest }) => {
    const navigate = useNavigate();

    return (
    <Link
      {...rest}
      onClick={event => {
        if (rest.onClick) rest.onClick(event)
        if (event.metaKey || event.ctrlKey) return

        event.preventDefault()

        if (window.appUpdateAvailable === true) {
          const nextLocation =
            typeof rest.to === 'string'
              ? createPath(rest.to, null, null, history.location)
              : rest.to
          window.location = history.createHref(nextLocation)
        } else {
          navigate(rest.to)
        }
      }}
    />
  )}
