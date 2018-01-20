import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import makeSelectApp from '../App/selector'
import Petitions from '../../components/Petitions'

import {
  clearState,
  getPetitions,
  setFilterReceived,
  setFilterSent,
  setPetitionAccepted,
  setPetitionCanceled,
  setPetitionRejected
} from './actions'
import makeSelectPetitions from './selector'

const mapStateToProps = createStructuredSelector({
  sendingRequest: makeSelectApp('sendingRequest'),
  filter: makeSelectPetitions('filter'),
  loadingPetitions: makeSelectPetitions('loadingPetitions'),
  nextPage: makeSelectPetitions('nextPage'),
  notificationMessage: makeSelectPetitions('notificationMessage'),
  petitions: makeSelectPetitions('petitions')
})

const mapDispatchToProps = dispatch => ({
  clearState: () => {
    dispatch(clearState())
  },
  getPetitions: () => {
    dispatch(getPetitions())
  },
  onClickFilterReceived: () => {
    dispatch(clearState())
    dispatch(setFilterReceived())
    dispatch(getPetitions())
  },
  onClickFilterSent: () => {
    dispatch(clearState())
    dispatch(setFilterSent())
    dispatch(getPetitions())
  },
  setPetitionAccepted: id => () => {
    dispatch(setPetitionAccepted(id))
  },
  setPetitionCanceled: id => () => {
    dispatch(setPetitionCanceled(id))
  },
  setPetitionRejected: id => () => {
    dispatch(setPetitionRejected(id))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Petitions)
