/* eslint-disable no-param-reassign */

import { rgba, transparentize } from 'polished'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { DayPicker } from 'react-day-picker'
import Helmet from 'react-helmet'
import { useIntl } from 'react-intl'
import styled from 'styled-components'

// import 'react-day-picker/lib/style.css'

import Button from '../Button'
import FormInput from '../FormInput'
import Icon from '../Icon'
import SB from '../SelectBox'
import { colors, fonts, media } from '../../styles'
import Toggle from '../Toggle'

import EditMap from './EditMap'
import EditTeamManager from './EditTeamManager'
import EditTeamsInvitations from './EditTeamsInvitations'
import EditTeamsParticipants from './EditTeamsParticipants'
import EditUsersInvitations from './EditUsersInvitations'
import EditUsersManagers from './EditUsersManagers'
import EditUsersParticipants from './EditUsersParticipants'
import messages from './messages'

const Wrapper = styled.div`
  display: flex;

  align-items: center;
  flex-direction: column;
  flex-grow: 1;

  padding: 2rem 1rem 7rem 1rem;
  width: 100%;
  max-width: 40rem;

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
  text-transform: uppercase;
`

const Error = styled.p`
  margin: 0 0 1.5rem 0;

  color: ${colors.alert};
  font-size: 1rem;
  font-weight: bold;
  text-align: right;
`

const Poster = styled.div`
  position: relative;

  border-radius: 3px;
  height: 14rem;
  margin-bottom: 1.5rem;
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

const RemovePosterButton = styled.button`
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

const SelectBox = styled(SB)`margin-bottom: 1.5rem;`

const ButtonsWrapper = styled.div`
  bottom: 2rem;
  left: 0;
  position: fixed;

  display: flex;

  justify-content: space-around;

  padding: 0 1rem;
  width: 100%;

  ${media.desktop`
    position: static;
    margin-top: 2rem;
    padding: 0;
  `};
`

const ButtonContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Edit = ({
  mapathon,
  poster,
  sendingRequest,
  errors,
  loadingTeamsManagers,
  teamsManagers,
  loadingUsers,
  users,
  loadingTeams,
  teams,
  clearErrors,
  setNotificationMessage,
  clearError,
  createPoster,
  deletePoster,
  setLocationCoordinates,
  getTeamsManagers,
  removeManager,
  removeParticipant,
  promoteParticipant,
  removeTeam,
  clearInvitationsState,
  getUsers,
  invite,
  getTeams,
  hideEditMapathon,
  editMapathon,
}) => {
  const { formatMessage } = useIntl();

  const [data, setData] = useState({
    id: mapathon.id,
    address: mapathon.address,
    description: mapathon.description,
    endDate: new Date(mapathon.endDate),
    isOpen: mapathon.isOpen,
    managers: mapathon.managers,
    name: mapathon.name,
    participants: mapathon.participants,
    participantsGoal: mapathon.participantsGoal,
    reviewsGoal: mapathon.reviewsGoal,
    startDate: new Date(mapathon.startDate),
    teamManager: mapathon.teamManager ? mapathon.teamManager.id : undefined,
    teams: mapathon.teams,
  });

  const [hostAs, setHostAs] = useState(
    mapathon.teamManager ? mapathon.teamManager.id : 'individual'
  );

  const [hostAsOptions, setHostAsOptions] = useState(
    mapathon.teamManager
      ? [
          {
            value: 'individual',
            label: formatMessage(messages.individualLabel),
          },
          {
            value: 'team',
            label: formatMessage(messages.teamLabel),
          },
          {
            value: mapathon.teamManager.id,
            label: mapathon.teamManager.name,
          },
        ]
      : [
          {
            value: 'individual',
            label: formatMessage(messages.individualLabel),
          },
          {
            value: 'team',
            label: formatMessage(messages.teamLabel),
          },
        ]
  );

  useEffect(() => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;

    return () => {
      clearErrors();
    };
  }, [clearErrors]);

  const handleDataChange = (event) => {
    const { id, value } = event.target;
    setData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleDateChange = (day, { disabled }) => {
    if (disabled) return;

    clearError('startDate');
    clearError('endDate');

    const range = DayPicker.addToRange(day, {
      from: data.startDate,
      to: data.endDate,
    });
    setData((prevState) => ({
      ...prevState,
      startDate: range.from,
      endDate: range.to,
    }));
  };

  const toggleIsOpen = () => {
    setData((prevState) => ({
      ...prevState,
      isOpen: !prevState.isOpen,
    }));
  };

  const handlePoster = (event) => {
    setNotificationMessage('');

    const posterFile = event.target.files[0];
    if (posterFile.size > 8388608) {
      setNotificationMessage('axsmap.components.Mapathon.fileSizeError');
      return;
    }

    const formData = new FormData();
    formData.append('photo', posterFile);

    createPoster(formData);
  };

  const handleHostAsChange = (event) => {
    const hostAs = event.target.value;
    if (hostAs === 'individual' || hostAs === 'team') {
      setData((prevState) => ({ ...prevState, teamManager: '' }));
    } else {
      setData((prevState) => ({ ...prevState, teamManager: hostAs }));
    }
    setHostAs(hostAs);
  };

  const chooseTeamManager = (team) => {
    setData((prevState) => ({
      ...prevState,
      teamManager: team.id,
    }));
    setHostAsOptions([
      {
        value: 'individual',
        label: formatMessage(messages.individualLabel),
      },
      {
        value: 'team',
        label: formatMessage(messages.teamLabel),
      },
      {
        value: team.id,
        label: team.name,
      },
    ]);
    setHostAs(team.id);
  };

  const { startDate, endDate } = data;
  const today = new Date();
  const dateModifiers = { start: startDate, end: endDate };

  let datesErrors;
  if (
    errors.startDate === 'Is required' &&
    errors.endDate === 'Is required'
  ) {
    datesErrors = <Error>{formatMessage(messages.datesError)}</Error>;
  } else if (errors.startDate === 'Is required') {
    datesErrors = <Error>{formatMessage(messages.startDateError)}</Error>;
  } else if (errors.endDate === 'Is required') {
    datesErrors = <Error>{formatMessage(messages.endDateError)}</Error>;
  }

  return (
    <Wrapper>
      <Helmet>
        <style>{`
          .Selectable {
            font-family: ${fonts.primary};
          }
          .Selectable .DayPicker-Caption > div {
            font-size: 1rem;
          }
          .Selectable .DayPicker-Day:focus {
            box-shadow: inset 0px 0px 0px 2px ${colors.secondary};
          }
          .Selectable .DayPicker-Day--selected:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside) {
            background-color: ${colors.secondary} !important;
          }
          .Selectable .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
            color: ${colors.secondary} !important;
            background-color: ${transparentize(0.9, colors.secondary)} !important;
          }
          .Selectable .DayPicker-Day {
            border-radius: 0 !important;
          }
          .Selectable .DayPicker-Day--start {
            border-top-left-radius: 50% !important;
            border-bottom-left-radius: 50% !important;
          }
          .Selectable .DayPicker-Day--end {
            border-top-right-radius: 50% !important;
            border-bottom-right-radius: 50% !important;
          }
        `}</style>
      </Helmet>

      <Title>{formatMessage(messages.editHeader)}</Title>

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
            'Should be less than 101 characters',
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

      {!poster ? (
        <>
          <Button
            $backgroundColor={colors.secondary}
            color="white"
            disabled={sendingRequest}
            style={{ marginBottom: '1.5rem' }}
            onClick={() => this.fileInput.click()}
          >
            {formatMessage(messages.addPosterButton)}
          </Button>
          <input
            type="file"
            ref={(r) => {
              this.fileInput = r;
            }}
            accept=".jpg, .jpeg, .png"
            aria-hidden
            tabIndex="-1"
            style={{ display: 'none' }}
            onChange={handlePoster}
            onClick={(event) => {
              event.target.value = null;
            }}
          />
        </>
      ) : null}

      {poster ? (
        <Poster style={{ backgroundImage: `url("${poster}")` }}>
          <RemovePosterButton
            disabled={sendingRequest}
            onClick={deletePoster}
          >
            <Icon glyph="cross" size={1} />
          </RemovePosterButton>
        </Poster>
      ) : null}

      <FormInput
        id="address"
        type="text"
        label={formatMessage(messages.addressLabel)}
        value={data.address}
        handler={handleDataChange}
        error={{
          message: errors.address,
          options: ['Is required', 'Should be less than 201 characters'],
          values: [
            formatMessage(messages.addressError1),
            formatMessage(messages.addressError2),
          ],
        }}
        onInputFocus={() => clearError('address')}
      />

      <Label>{formatMessage(messages.locationLabel)}</Label>
      <EditMap
        location={{
          lat: mapathon.location.coordinates[1],
          lng: mapathon.location.coordinates[0],
        }}
        onLocationChange={setLocationCoordinates}
      />

      <Label>{formatMessage(messages.datesLabel)}</Label>
      <DayPicker
        className="Selectable"
        numberOfMonths={2}
        selectedDays={[startDate, { from: startDate, to: endDate }]}
        disabledDays={{ before: today }}
        modifiers={dateModifiers}
        onDayClick={handleDateChange}
      />
      {datesErrors}

      <FormInput
        id="participantsGoal"
        type="number"
        label={formatMessage(messages.participantsGoalLabel)}
        value={data.participantsGoal}
        min={1}
        max={1000}
        handler={handleDataChange}
        error={{
          message: errors.participantsGoal,
          options: [
            'Is required',
            'Should be greater than 0',
            'Should be less than 1001',
          ],
          values: [
            formatMessage(messages.participantsGoalError1),
            formatMessage(messages.participantsGoalError2),
            formatMessage(messages.participantsGoalError3),
          ],
        }}
        onInputFocus={() => clearError('participantsGoal')}
      />

      <FormInput
        id="reviewsGoal"
        type="number"
        label={formatMessage(messages.reviewsGoalLabel)}
        value={data.reviewsGoal}
        min={1}
        max={10000}
        handler={handleDataChange}
        error={{
          message: errors.reviewsGoal,
          options: [
            'Is required',
            'Should be greater than 0',
            'Should be less than 10001',
          ],
          values: [
            formatMessage(messages.reviewsGoalError1),
            formatMessage(messages.reviewsGoalError2),
            formatMessage(messages.reviewsGoalError3),
          ],
        }}
        onInputFocus={() => clearError('reviewsGoal')}
      />

      <Toggle active={data.isOpen} handler={toggleIsOpen}>
        {formatMessage(messages.isOpenLabel)}
      </Toggle>

      <Label>{formatMessage(messages.hostAsLabel)}</Label>
      <SelectBox
        id="type"
        value={hostAs}
        options={hostAsOptions}
        borderColor={colors.darkGrey}
        onFocusBorderColor={colors.secondary}
        handleValueChange={handleHostAsChange}
      />

      {hostAs === 'team' ? (
        <EditTeamManager
          sendingRequest={sendingRequest}
          loadingTeamsManagers={loadingTeamsManagers}
          teamsManagers={teamsManagers}
          getTeamsManagers={getTeamsManagers}
          chooseTeamManager={chooseTeamManager}
        />
      ) : null}

      <Label>{formatMessage(messages.managersLabel)}</Label>
      <EditUsersManagers
        managers={data.managers}
        sendingRequest={sendingRequest}
        mapathonId={data.id}
        removeManager={removeManager}
      />

      {data.participants && data.participants.length > 0 ? (
        <>
          <Label>{formatMessage(messages.participantsLabel)}</Label>
          <EditUsersParticipants
            participants={data.participants}
            sendingRequest={sendingRequest}
            mapathonId={data.id}
            promoteParticipant={promoteParticipant}
            removeParticipant={removeParticipant}
          />
        </>
      ) : null}

      {data.teams && data.teams.length > 0 ? (
        <>
          <Label>{formatMessage(messages.teamsLabel)}</Label>
          <EditTeamsParticipants
            teams={data.teams}
            sendingRequest={sendingRequest}
            mapathonId={data.id}
            removeTeam={removeTeam}
          />
        </>
      ) : null}

      <Label>{formatMessage(messages.usersInvitationsLabel)}</Label>
      <EditUsersInvitations
        sendingRequest={sendingRequest}
        loadingUsers={loadingUsers}
        users={users}
        clearInvitationsState={clearInvitationsState}
        getUsers={getUsers}
        invite={invite}
      />

      <Label>{formatMessage(messages.teamsInvitationsLabel)}</Label>
      <EditTeamsInvitations
        sendingRequest={sendingRequest}
        loadingTeams={loadingTeams}
        teams={teams}
        clearInvitationsState={clearInvitationsState}
        getTeams={getTeams}
        invite={invite}
      />

      <ButtonsWrapper>
        <Button
          $backgroundColor={colors.lightGrey}
          float
          disabled={sendingRequest}
          onClickHandler={hideEditMapathon}
        >
          <ButtonContent>
            <Icon glyph="cross" size={1} color={colors.darkestGrey} />
            <p style={{ margin: '0 0 0 0.5rem' }}>
              {formatMessage(messages.closeButton)}
            </p>
          </ButtonContent>
        </Button>

        <Button
          type="submit"
          float
          disabled={sendingRequest}
          onClickHandler={() => editMapathon(mapathon.id, data)}
        >
          <ButtonContent>
            <Icon glyph="check" size={1} color={colors.darkestGrey} />
            <p style={{ margin: '0 0 0 0.5rem' }}>
              {formatMessage(messages.saveButton)}
            </p>
          </ButtonContent>
        </Button>
      </ButtonsWrapper>
    </Wrapper>
  );
};

Edit.propTypes = {
  mapathon: PropTypes.object.isRequired,
  poster: PropTypes.string.isRequired,
  sendingRequest: PropTypes.bool.isRequired,
  errors: PropTypes.object.isRequired,
  loadingTeamsManagers: PropTypes.bool.isRequired,
  teamsManagers: PropTypes.array.isRequired,
  loadingUsers: PropTypes.bool.isRequired,
  users: PropTypes.array.isRequired,
  loadingTeams: PropTypes.bool.isRequired,
  teams: PropTypes.array.isRequired,
  clearErrors: PropTypes.func.isRequired,
  setNotificationMessage: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
  createPoster: PropTypes.func.isRequired,
  deletePoster: PropTypes.func.isRequired,
  setLocationCoordinates: PropTypes.func.isRequired,
  getTeamsManagers: PropTypes.func.isRequired,
  removeManager: PropTypes.func.isRequired,
  removeParticipant: PropTypes.func.isRequired,
  promoteParticipant: PropTypes.func.isRequired,
  removeTeam: PropTypes.func.isRequired,
  clearInvitationsState: PropTypes.func.isRequired,
  getUsers: PropTypes.func.isRequired,
  invite: PropTypes.func.isRequired,
  getTeams: PropTypes.func.isRequired,
  hideEditMapathon: PropTypes.func.isRequired,
  editMapathon: PropTypes.func.isRequired,
};

export default Edit;