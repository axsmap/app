import PropTypes from "prop-types";
import React from "react";
import ReactGA from "react-ga";
import Helmet from "react-helmet";
import { useIntl } from "react-intl";
import styled from "styled-components";

import Footer from "../Footer";
import NavBar from "../NavBar";
import Spinner from "../Spinner";
import TopBar from "../../containers/TopBar";
import { getGeneralType, getReviewsRatioWeight } from "../../utilities";
import Wrp from "../Wrapper";

import messages from "./messages";
import Review from "./Review";
import RateDetailsDialog from "./RateDetailsDialog";

const Wrapper = styled(Wrp)`
  padding-bottom: 0;
`;

const CreateReview = ({
  match,
  loadingVenue,
  venue,
  history,
  errors,
  userData,
  photo,
  sendingRequest,
  getVenue,
  clearState,
  setNotificationMessage,
  clearError,
  createReview,
  howToRateVisibility,
  hideHowToRate,
}) => {
  const { formatMessage } = useIntl();

  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  useEffect(() => {
    getVenue(match.params.placeId);
  }, [getVenue, match.params.placeId]);

  useEffect(() => {
    return () => {
      clearState();
    };
  }, [clearState]);

  let pageTitle = <Helmet title={formatMessage(messages.defaultPageTitle)} />;
  if (!loadingVenue && !venue.placeId) {
    pageTitle = <Helmet title={formatMessage(messages.notFoundPageTitle)} />;
  }

  const reviewData = {
    allowsGuideDog: venue.allowsGuideDog,
    restroomScore: venue.restroomScore,
    entranceScore: venue.entranceScore,
    hasParking: venue.hasParking,
    hasSecondEntry: venue.hasSecondEntry,
    hasWellLit: venue.hasWellLit,
    isQuiet: venue.isQuiet,
    isSpacious: venue.isSpacious,
    steps: venue.steps,
    hasPermanentRamp: venue.hasPermanentRamp,
    hasPortableRamp: venue.hasPortableRamp,
    has0Steps: venue.has0Steps,
    has1Step: venue.has1Step,
    has2Steps: venue.has2Steps,
    has3Steps: venue.has3Steps,
    hasWideEntrance: venue.hasWideEntrance,
    hasAccessibleTableHeight: venue.hasAccessibleTableHeight,
    hasAccessibleElevator: venue.hasAccessibleElevator,
    hasInteriorRamp: venue.hasInteriorRamp,
    hasSwingOutDoor: venue.hasSwingOutDoor,
    hasLargeStall: venue.hasLargeStall,
    hasTallSinks: venue.hasTallSinks,
    hasLoweredSinks: venue.hasLoweredSinks,
    hasSupportAroundToilet: venue.hasSupportAroundToilet,
  };

  const headerTitle = formatMessage(messages.createReviewHeader);

  const reviewsRatioWeight = getReviewsRatioWeight(reviewData);
  const generalType = getGeneralType(venue.types);

  return (
    <Wrapper>
      {pageTitle}

      <TopBar hideOn="phone,tablet" showSearch />

      <NavBar
        hideOn="desktop,widescreen"
        isNarrow
        title={headerTitle}
        goBackHandler={() => history.goBack()}
      />

      {loadingVenue ? (
        <Spinner />
      ) : (
        <Review
          userData={userData}
          reviewsRatioWeight={reviewsRatioWeight}
          generalType={generalType}
          venue={venue}
          errors={errors}
          sendingRequest={sendingRequest}
          setNotificationMessage={setNotificationMessage}
          clearError={clearError}
          createReview={createReview}
          onClickHandler={hideHowToRate}
          history={history}
        />
      )}

      {howToRateVisibility && (
        <RateDetailsDialog
          sendingRequest={sendingRequest}
          hide={hideHowToRate}
        />
      )}

      <Footer hideOn="phone,tablet" isNarrow />
    </Wrapper>
  );
};

CreateReview.propTypes = {
  match: PropTypes.object.isRequired,
  loadingVenue: PropTypes.bool.isRequired,
  venue: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  userData: PropTypes.object.isRequired,
  photo: PropTypes.string.isRequired,
  sendingRequest: PropTypes.bool.isRequired,
  getVenue: PropTypes.func.isRequired,
  clearState: PropTypes.func.isRequired,
  setNotificationMessage: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
  createReview: PropTypes.func.isRequired,
  howToRateVisibility: PropTypes.bool.isRequired,
  hideHowToRate: PropTypes.func.isRequired,
};

export default CreateReview;
