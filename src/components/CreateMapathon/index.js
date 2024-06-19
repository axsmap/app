import PropTypes from 'prop-types'
import React, { useEffect } from 'react'
import ReactGA from 'react-ga'
import Helmet from 'react-helmet'
import { useIntl } from 'react-intl'
import styled from 'styled-components'

import Footer from '../Footer'
import NavBar from '../NavBar'
import TopBar from '../../containers/TopBar'
import Wrp from '../Wrapper'

import Form from './Form'
import messages from './messages'

const Wrapper = styled(Wrp)`
  padding-bottom: 0;
`

const CreateMapathon = ({
  isAuthenticated,
  sendingRequest,
  poster,
  locationCoordinates,
  errors,
  loadingTeams,
  teams,
  clearState,
  setNotificationMessage,
  clearError,
  createPoster,
  deletePoster,
  getUserLocation,
  setLocationCoordinates,
  getTeams,
  createMapathon,
}) => {
  const { formatMessage } = useIntl();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/sign-in');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    return () => {
      clearState();
      ReactGA.pageview(window.location.pathname + window.location.search);
    };
  }, [clearState]);

  return (
    <Wrapper>
      <Helmet title={formatMessage(messages.pageTitle)} />

      <TopBar hideOn="phone,tablet" />

      <NavBar
        hideOn="desktop,widescreen"
        isNarrow="true"
        title={formatMessage(messages.headerTitle)}
        goBackHandler={() => navigate(-1)}
      />

      <Form
        sendingRequest={sendingRequest}
        poster={poster}
        locationCoordinates={locationCoordinates}
        errors={errors}
        loadingTeams={loadingTeams}
        teams={teams}
        getUserLocation={getUserLocation}
        setNotificationMessage={setNotificationMessage}
        clearError={clearError}
        createPoster={createPoster}
        deletePoster={deletePoster}
        setLocationCoordinates={setLocationCoordinates}
        getTeams={getTeams}
        createMapathon={createMapathon}
      />

      <Footer hideOn="phone,tablet" isNarrow />
    </Wrapper>
  );
};

CreateMapathon.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
  sendingRequest: PropTypes.bool.isRequired,
  poster: PropTypes.string.isRequired,
  locationCoordinates: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  loadingTeams: PropTypes.bool.isRequired,
  teams: PropTypes.array.isRequired,
  clearState: PropTypes.func.isRequired,
  setNotificationMessage: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
  createPoster: PropTypes.func.isRequired,
  deletePoster: PropTypes.func.isRequired,
  getUserLocation: PropTypes.func.isRequired,
  setLocationCoordinates: PropTypes.func.isRequired,
  getTeams: PropTypes.func.isRequired,
  createMapathon: PropTypes.func.isRequired,
};

export default CreateMapathon
