import Loadable from 'react-loadable'

import Spinner from '../Spinner'

export default function SpinnerLoader(opts) {
  return Loadable(
    Object.assign(
      {
        loading: Spinner
      },
      opts
    )
  )
}
