import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import HomeComponent from '../../components/Home'

import makeSelectHome from './selector'
import { setShowSearch } from './actions'

const mapStateToProps = createStructuredSelector({
  showSearch: makeSelectHome('showSearch')
})

const mapDispatchToProps = dispatch => ({
  onSetShowSearch: () => {
    dispatch(setShowSearch(true))
  }
})

const HomePage = connect(mapStateToProps, mapDispatchToProps)(HomeComponent)

export default HomePage
