import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import TopBarComp from '../../components/TopBar'

import makeSelectTopBar from './selector'
import { setQuery, toggleShowDropdown } from './actions'

const mapStateToProps = createStructuredSelector({
  query: makeSelectTopBar('query'),
  showDropdown: makeSelectTopBar('showDropdown')
})

const mapDispatchToProps = dispatch => ({
  onVenuesQuerySubmit: () => {},
  onQueryChange: e => {
    dispatch(setQuery(e.target.id, e.target.value))
  },
  onDropdownClick: () => {
    dispatch(toggleShowDropdown())
  }
})

const TopBar = connect(mapStateToProps, mapDispatchToProps)(TopBarComp)

export default TopBar
