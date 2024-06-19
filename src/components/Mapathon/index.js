import PropTypes from 'prop-types'
import React, { useEffect } from 'react'
import ReactGA from 'react-ga'
import Helmet from 'react-helmet'
import { useIntl } from 'react-intl'
import styled from 'styled-components'

import Footer from '../Footer'
import NavBar from '../NavBar'
import Spinner from '../Spinner'
import TopBar from '../../containers/TopBar'
import Wrp from '../Wrapper'

import Details from './Details'
import Edit from './Edit'
import messages from './messages'

const Wrapper = styled(Wrp)`
  padding-bottom: 0;
`

const Mapathon = ({
  history,
  loadingMapathon,
  mapathon,
  poster,
  isAuthenticated,
  userData,
  editIsVisible,
  sendingRequest,
  getMapathon,
  clearState,
  errors,
  loadingTeamsManagers,
  teamsManagers,
  loadingUsers,
  users,
  loadingTeams,
  teams,
  clearErrors,
  setNotificationMessage,
  joinMapathon,
  showEditMapathon,
  clearError,
  createPoster,
  deletePoster,
  setLocationCoordinates,
  getTeamsManagers,
  removeManager,
  promoteParticipant,
  removeParticipant,
  removeTeam,
  clearInvitationsState,
  getUsers,
  invite,
  getTeams,
  hideEditMapathon,
  editMapathon,
}) => {
  const intl = useIntl();

  useEffect(() => {
    getMapathon();
    ReactGA.pageview(window.location.pathname + window.location.search);

    return () => {
      clearState();
    };
  }, [getMapathon, clearState]);

  const formatMessage = intl.formatMessage;

  let pageTitle = <Helmet title={formatMessage(messages.defaultPageTitle)} />;
  if (editIsVisible) {
    pageTitle = (
      <Helmet
        title={formatMessage(messages.editPageTitle, {
          mapathonName: mapathon.name,
        })}
      />
    );
  } else if (!loadingMapathon && mapathon.id) {
    pageTitle = (
      <Helmet
        title={formatMessage(messages.detailsPageTitle, {
          mapathonName: mapathon.name,
        })}
      />
    );
  } else if (!loadingMapathon && !mapathon.id) {
    pageTitle = <Helmet title={formatMessage(messages.notFoundPageTitle)} />;
  }

  let headerTitle = formatMessage(messages.detailsHeader);
  if (editIsVisible) {
    headerTitle = formatMessage(messages.editHeader);
  }

  let container = (
    <Details
      {...mapathon}
      isAuthenticated={isAuthenticated}
      userData={userData}
      sendingRequest={sendingRequest}
      joinMapathon={joinMapathon}
      showEditMapathon={showEditMapathon}
    />
  );
  if (editIsVisible) {
    container = (
      <Edit
        mapathon={mapathon}
        poster={poster}
        errors={errors}
        loadingTeamsManagers={loadingTeamsManagers}
        teamsManagers={teamsManagers}
        sendingRequest={sendingRequest}
        loadingUsers={loadingUsers}
        users={users}
        loadingTeams={loadingTeams}
        teams={teams}
        clearErrors={clearErrors}
        setNotificationMessage={setNotificationMessage}
        clearError={clearError}
        createPoster={createPoster}
        deletePoster={deletePoster}
        setLocationCoordinates={setLocationCoordinates}
        getTeamsManagers={getTeamsManagers}
        removeManager={removeManager}
        promoteParticipant={promoteParticipant}
        removeParticipant={removeParticipant}
        removeTeam={removeTeam}
        clearInvitationsState={clearInvitationsState}
        getUsers={getUsers}
        invite={invite}
        getTeams={getTeams}
        hideEditMapathon={hideEditMapathon}
        editMapathon={editMapathon}
      />
    );
  }

  return (
    <Wrapper>
      {pageTitle}

      <TopBar hideOn="phone,tablet" />

      <NavBar
        hideOn="desktop,widescreen"
        isNarrow
        title={headerTitle}
        goBackHandler={() => history.goBack()}
      />

      {loadingMapathon ? <Spinner /> : container}

      <Footer hideOn="phone,tablet" isNarrow />
    </Wrapper>
  );
};

Mapathon.propTypes = {
  history: PropTypes.object.isRequired,
  loadingMapathon: PropTypes.bool.isRequired,
  mapathon: PropTypes.object.isRequired,
  poster: PropTypes.string.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  userData: PropTypes.object.isRequired,
  editIsVisible: PropTypes.bool.isRequired,
  sendingRequest: PropTypes.bool.isRequired,
  getMapathon: PropTypes.func.isRequired,
  clearState: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  loadingTeamsManagers: PropTypes.bool.isRequired,
  teamsManagers: PropTypes.array.isRequired,
  loadingUsers: PropTypes.bool.isRequired,
  users: PropTypes.array.isRequired,
  loadingTeams: PropTypes.bool.isRequired,
  teams: PropTypes.array.isRequired,
  clearErrors: PropTypes.func.isRequired,
  setNotificationMessage: PropTypes.func.isRequired,
  joinMapathon: PropTypes.func.isRequired,
  showEditMapathon: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
  createPoster: PropTypes.func.isRequired,
  deletePoster: PropTypes.func.isRequired,
  setLocationCoordinates: PropTypes.func.isRequired,
  getTeamsManagers: PropTypes.func.isRequired,
  removeManager: PropTypes.func.isRequired,
  promoteParticipant: PropTypes.func.isRequired,
  removeParticipant: PropTypes.func.isRequired,
  removeTeam: PropTypes.func.isRequired,
  clearInvitationsState: PropTypes.func.isRequired,
  getUsers: PropTypes.func.isRequired,
  invite: PropTypes.func.isRequired,
  getTeams: PropTypes.func.isRequired,
  hideEditMapathon: PropTypes.func.isRequired,
  editMapathon: PropTypes.func.isRequired,
};

export default Mapathon;