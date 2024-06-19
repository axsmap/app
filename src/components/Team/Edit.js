/* eslint-disable no-param-reassign */

import { rgba } from 'polished'
import PropTypes from 'prop-types'
import React, { PureComponent, useEffect, useRef, useState } from 'react'
import { useIntl } from 'react-intl'
import styled from 'styled-components'

import Button from '../Button'
import Ctn from '../Container'
import FormInput from '../FormInput'
import Icon from '../Icon'
import { colors, media } from '../../styles'

import EditButtons from './EditButtons'
import EditManagers from './EditManagers'
import EditMembers from './EditMembers'
import Invitations from './Invitations'
import messages from './messages'

const Container = styled(Ctn)`
  padding: 2rem 1rem 7rem 1rem;
  max-width: 30rem;
  margin-left: auto;
  margin-right: auto;

  ${media.desktop`
    padding: 2rem 0;
  `};
`

const Title = styled.h1`
  display: none;
  margin: 0 0 2rem 0;
  color: ${colors.darkestGrey};

  ${media.desktop`
    display: block;
  `};
`

const Label = styled.label`
  display: block;

  margin-bottom: 0.2rem;
  width: 100%;

  color: ${colors.darkGrey};
  font-size: 1rem;
  font-weight: bold;
  text-align: center;
  text-transform: uppercase;
`

const Avatar = styled.div`
  position: relative;

  border-radius: 3px;
  height: 14rem;
  margin-bottom: 1rem;
  width: 14rem;

  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  ${media.tablet`
    height: 16rem;
    width: 16rem;
  `};

  ${media.desktop`
    height: 18rem;
    width: 18rem;
  `};

  ${media.widescreen`
    height: 20rem;
    width: 20rem;
  `};
`

const RemoveAvatarButton = styled.button`
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;

  display: flex;
  opacity: 1;

  align-items: center;
  justify-content: center;

  appearance: none;
  border: none;
  border-radius: 100%;
  box-shadow: 0 3px 5px ${rgba(colors.darkestGrey, 0.4)};
  height: 3rem;
  margin: 0;
  padding: 0;
  width: 3rem;

  background-color: ${colors.alert};
  cursor: pointer;

  &:active,
  &:focus {
    outline: 2px solid ${colors.secondary};
  }

  &:disabled,
  &[disabled] {
    opacity: 0.5;
  }
`

const Edit = ({
  team,
  avatar,
  loadingUsers,
  users,
  errors,
  sendingRequest,
  clearErrors,
  setNotificationMessage,
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
  const fileInputRef = useRef(null);

  const [data, setData] = useState({
    id: team.id,
    name: team.name,
    description: team.description,
    managers: team.managers,
    members: team.members,
  });

  useEffect(() => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;

    return () => {
      clearErrors();
    };
  }, [clearErrors]);

  const handleDataChange = (event) => {
    setData({ ...data, [event.target.id]: event.target.value });
  };

  const handleAvatar = (event) => {
    setNotificationMessage('');

    const avatarFile = event.target.files[0];
    if (avatarFile.size > 8388608) {
      setNotificationMessage('axsmap.components.Team.fileSizeError');
      return;
    }

    const formData = new FormData();
    formData.append('photo', avatarFile);

    createAvatar(formData);
  };

  return (
    <Container>
      <Title>{formatMessage(messages.editTeamTitle)}</Title>

      <FormInput
        id="name"
        type="text"
        label={formatMessage(messages.nameLabel)}
        value={data.name}
        handler={handleDataChange}
        error={{
          message: errors.name,
          options: [
            'Is required',
            'Should be less than 36 characters',
            'Is already taken',
          ],
          values: [
            formatMessage(messages.nameError1),
            formatMessage(messages.nameError2),
            formatMessage(messages.nameError3),
          ],
        }}
        onInputFocus={() => clearError('name')}
      />

      <FormInput
        id="description"
        type="textarea"
        label={formatMessage(messages.descriptionLabel)}
        placeholder={formatMessage(messages.descriptionPlaceholder)}
        value={data.description}
        handler={handleDataChange}
        error={{
          message: errors.description,
          options: ['Should be less than 301 characters'],
          values: [formatMessage(messages.descriptionError)],
        }}
        onInputFocus={() => clearError('description')}
      />

      {!avatar && (
        <>
          <Button
            // key="button"
            $backgroundColor={colors.secondary}
            color="white"
            disabled={sendingRequest}
            style={{ marginBottom: '1.5rem' }}
            onClickHandler={() => fileInputRef.current.click()}
          >
            {formatMessage(messages.addAvatarButton)}
          </Button>
          <input
            key="input"
            type="file"
            ref={fileInputRef}
            accept=".jpg, .jpeg, .png"
            aria-hidden
            tabIndex="-1"
            style={{ display: 'none' }}
            onChange={handleAvatar}
            onClick={(event) => {
              event.target.value = null;
            }}
          />
        </>
      )}

      {avatar && (
        <Avatar style={{ backgroundImage: `url("${avatar}")` }}>
          <RemoveAvatarButton
            disabled={sendingRequest}
            onClick={deleteAvatar}
          >
            <Icon glyph="cross" size={1} />
          </RemoveAvatarButton>
        </Avatar>
      )}

      <Label>{formatMessage(messages.managersLabel)}</Label>
      <EditManagers
        managers={data.managers}
        sendingRequest={sendingRequest}
        teamId={data.id}
        removeManager={removeManager}
      />

      {data.members && data.members.length > 0 && (
        <>
          <Label>{formatMessage(messages.membersLabel)}</Label>
          <EditMembers
            members={data.members}
            sendingRequest={sendingRequest}
            promoteMember={promoteMember}
            removeMember={removeMember}
          />
        </>
      )}

      <Label>{formatMessage(messages.invitationsLabel)}</Label>
      <Invitations
        sendingRequest={sendingRequest}
        loadingUsers={loadingUsers}
        users={users}
        teamId={data.id}
        clearInvitationsState={clearInvitationsState}
        getUsers={getUsers}
        inviteUser={inviteUser}
      />

      <EditButtons
        sendingRequest={sendingRequest}
        hideEditTeam={hideEditTeam}
        editTeam={() => editTeam(team.id, data)}
      />
    </Container>
  );
};

Edit.propTypes = {
  team: PropTypes.object.isRequired,
  avatar: PropTypes.string.isRequired,
  loadingUsers: PropTypes.bool.isRequired,
  users: PropTypes.array.isRequired,
  errors: PropTypes.object.isRequired,
  sendingRequest: PropTypes.bool.isRequired,
  clearErrors: PropTypes.func.isRequired,
  setNotificationMessage: PropTypes.func.isRequired,
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

export default Edit;