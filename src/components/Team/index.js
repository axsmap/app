import PropTypes from 'prop-types'
import React, { PureComponent, useEffect } from 'react'
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
import { useNavigate } from 'react-router-dom'

const Wrapper = styled(Wrp)`
  padding-bottom: 0;
`

const Team = ({
  history,
  loadingTeam,
  team,
  avatar,
  isAuthenticated,
  userData,
  editIsVisible,
  errors,
  loadingUsers,
  users,
  sendingRequest,
  getTeam,
  clearState,
  clearErrors,
  setNotificationMessage,
  joinTeam,
  showEditTeam,
  clearError,
  createAvatar,
  deleteAvatar,
  removeManager,
  promoteMember,
  removeMember,
  clearInvitationsState,
  getUsers,
  inviteUser,
  hideEditTeam,
  editTeam,
}) => {
  const { formatMessage } = useIntl();
  const navigate = useNavigate();

  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
    getTeam();

    return () => {
      clearState();
    };
  }, [getTeam, clearState]);

  let pageTitle = <Helmet title={formatMessage(messages.defaultPageTitle)} />;
  if (editIsVisible) {
    pageTitle = (
      <Helmet
        title={formatMessage(messages.editPageTitle, {
          teamName: team.name,
        })}
      />
    );
  } else if (!loadingTeam && team.id) {
    pageTitle = (
      <Helmet
        title={formatMessage(messages.detailsPageTitle, {
          teamName: team.name,
        })}
      />
    );
  } else if (!loadingTeam && !team.id) {
    pageTitle = <Helmet title={formatMessage(messages.notFoundPageTitle)} />;
  }

  let headerTitle = formatMessage(messages.detailsHeader);
  if (editIsVisible) {
    headerTitle = formatMessage(messages.editHeader);
  }

  let container = (
    <Details
      {...team}
      sendingRequest={sendingRequest}
      isAuthenticated={isAuthenticated}
      userData={userData}
      joinTeam={joinTeam}
      showEditTeam={showEditTeam}
    />
  );
  if (editIsVisible) {
    container = (
      <Edit
        team={team}
        avatar={avatar}
        errors={errors}
        loadingUsers={loadingUsers}
        users={users}
        sendingRequest={sendingRequest}
        clearErrors={clearErrors}
        setNotificationMessage={setNotificationMessage}
        clearError={clearError}
        createAvatar={createAvatar}
        deleteAvatar={deleteAvatar}
        removeManager={removeManager}
        promoteMember={promoteMember}
        removeMember={removeMember}
        clearInvitationsState={clearInvitationsState}
        getUsers={getUsers}
        inviteUser={inviteUser}
        hideEditTeam={hideEditTeam}
        editTeam={editTeam}
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

      {loadingTeam ? <Spinner /> : container}

      <Footer hideOn="phone,tablet" isNarrow />
    </Wrapper>
  );
};

Team.propTypes = {
  history: PropTypes.object.isRequired,
  loadingTeam: PropTypes.bool.isRequired,
  team: PropTypes.object.isRequired,
  avatar: PropTypes.string.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  userData: PropTypes.object.isRequired,
  editIsVisible: PropTypes.bool.isRequired,
  errors: PropTypes.object.isRequired,
  loadingUsers: PropTypes.bool.isRequired,
  users: PropTypes.array.isRequired,
  sendingRequest: PropTypes.bool.isRequired,
  getTeam: PropTypes.func.isRequired,
  clearState: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  setNotificationMessage: PropTypes.func.isRequired,
  joinTeam: PropTypes.func.isRequired,
  showEditTeam: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
  createAvatar: PropTypes.func.isRequired,
  deleteAvatar: PropTypes.func.isRequired,
  removeManager: PropTypes.func.isRequired,
  promoteMember: PropTypes.func.isRequired,
  removeMember: PropTypes.func.isRequired,
  clearInvitationsState: PropTypes.func.isRequired,
  getUsers: PropTypes.func.isRequired,
  inviteUser: PropTypes.func.isRequired,
  hideEditTeam: PropTypes.func.isRequired,
  editTeam: PropTypes.func.isRequired,
};

export default Team;