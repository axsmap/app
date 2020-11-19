import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import appSelector from '../App/selector'
import ThankYouReviewComp from '../../components/ThankYouReview'

import { clearState, getVenue, setUserReviewFieldsAmount, setUserReviewsAmount } from './actions'
import venueSelector from './selector'

const mapStateToProps = createStructuredSelector({
  isAuthenticated: appSelector('isAuthenticated'),
  sendingRequest: appSelector('sendingRequest'),
  loadingVenue: venueSelector('loadingVenue'),
  venue: venueSelector('venue')
})

const mapDispatchToProps = dispatch => ({
  getVenue: placeId => {
    const userReviewData = localStorage.getItem('reviewResponse');
    var uField, uAmount;
    if(userReviewData){
      uField = userReviewData.userReviewFieldsAmount;
      uAmount = userReviewData.userReviewsAmount;
    }
    else{
      uField = 19;
      uAmount = 1;
    }
    
    dispatch(getVenue(placeId));
    dispatch(setUserReviewFieldsAmount(uField));
    dispatch(setUserReviewsAmount(uAmount));
  },
  clearState: () => {
    localStorage.removeItem('reviewResponse');
    dispatch(clearState())
  }
})

const ThankYouReview = connect(
  mapStateToProps,
  mapDispatchToProps
)(ThankYouReviewComp)

export default ThankYouReview
