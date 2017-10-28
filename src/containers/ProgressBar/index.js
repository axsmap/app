import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import ProgressBarComp from '../../components/ProgressBar'

import makeSelectProgressBar from './selector'
import { setPercent } from './actions'

const mapStateToProps = createStructuredSelector({
  percent: makeSelectProgressBar('percent')
})

const mapDispatchToProps = dispatch => ({
  setPercent: percent => {
    dispatch(setPercent(percent))
  }
})

const ProgressBar = connect(mapStateToProps, mapDispatchToProps)(
  ProgressBarComp
)

export default ProgressBar
