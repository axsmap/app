import { connect } from 'react-redux'

import { setCurrentUrl } from '../TopBar/actions'
import Teams from '../../components/Teams'

const mapDispatchToProps = dispatch => ({
  setTeamsUrl: () => {
    dispatch(setCurrentUrl('/teams'))
  }
})

const TeamsPage = connect(null, mapDispatchToProps)(Teams)

export default TeamsPage
