/* eslint-disable no-param-reassign */

import { rgba } from 'polished'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import styled from 'styled-components'

import Button from '../Button'
import FormInput from '../FormInput'
import Icon from '../Icon'
import SB from '../SelectBox'
import { colors, media } from '../../styles'
import Toggle from '../Toggle'

import EditMapathons from './EditMapathons'
import EditPetitions from './EditPetitions'
import EditTeams from './EditTeams'
import messages from './messages'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  flex-grow: 1;
  padding: 2rem 1rem 7rem 1rem;
  width: 100%;
  max-width: 40rem;
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
  text-transform: uppercase;
`

const Avatar = styled.div`
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

const SelectBox = styled(SB)`
  margin-bottom: 1.5rem;
`

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
  user,
  avatar,
  errors,
  sendingRequest,
  filter,
  loadingPetitions,
  nextPage,
  petitions,
  clearErrors,
  setNotificationMessage,
  clearError,
  createAvatar,
  deleteAvatar,
  leaveTeam,
  leaveMapathon,
  getPetitions,
  onClickFilterReceived,
  onClickFilterSent,
  setPetitionAccepted,
  setPetitionCanceled,
  setPetitionRejected,
  hideEditUser,
  editUser,
}) => {
  const { formatMessage } = useIntl();

  const [data, setData] = useState({
    id: user.id,
    description: user.description,
    disabilities: user.disabilities,
    events: user.events,
    firstName: user.firstName,
    gender: user.gender,
    isSubscribed: user.isSubscribed,
    lastName: user.lastName,
    language: user.language,
    phone: user.phone,
    showDisabilities: user.showDisabilities,
    showEmail: user.showEmail,
    showPhone: user.showPhone,
    teams: user.teams,
    username: user.username,
    zip: user.zip,
  });

  const genderOptions = [
    { value: 'female', label: formatMessage(messages.femaleLabel) },
    { value: 'male', label: formatMessage(messages.maleLabel) },
    { value: 'other', label: formatMessage(messages.otherLabel) },
    { value: 'private', label: formatMessage(messages.privateLabel) },
    { value: 'transgender', label: formatMessage(messages.transgenderLabel) },
  ];

  const languageOptions = [
    { value: 'en', label: formatMessage(messages.englishLabel) },
    { value: 'es', label: formatMessage(messages.spanishLabel) },
  ];

  useEffect(() => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;

    return () => {
      clearErrors();
    };
  }, [clearErrors]);

  useEffect(() => {
    setData((prevState) => ({
      ...prevState,
      events: user.events,
      teams: user.teams,
    }));
  }, [user.events, user.teams]);

  const handleDataChange = (event) => {
    const { id, value } = event.target;
    setData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const toggleBoolean = (key) => {
    setData((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  const handleAvatar = (event) => {
    setNotificationMessage('');

    const avatarFile = event.target.files[0];
    if (avatarFile.size > 8388608) {
      setNotificationMessage('axsmap.components.User.fileSizeError');
      return;
    }

    const formData = new FormData();
    formData.append('photo', avatarFile);

    createAvatar(formData);
  };

  return (
    <Wrapper className="mx-auto">
      <Title>{formatMessage(messages.editHeader)}</Title>

      <FormInput
        id="firstName"
        type="text"
        label={formatMessage(messages.firstNameLabel)}
        value={data.firstName}
        error={{
          message: errors.firstName,
          options: [
            'Is required',
            'Should be less than 25 characters',
            'Should only have letters',
            'Should only be one first name',
          ],
          values: [
            formatMessage(messages.firstNameError1),
            formatMessage(messages.firstNameError2),
            formatMessage(messages.firstNameError3),
            formatMessage(messages.firstNameError4),
          ],
        }}
        handler={handleDataChange}
        onInputFocus={() => clearError('firstName')}
      />

      <FormInput
        id="lastName"
        type="text"
        label={formatMessage(messages.lastNameLabel)}
        value={data.lastName}
        error={{
          message: errors.lastName,
          options: [
            'Is required',
            'Should be less than 37 characters',
            'Should only have letters',
            'Should only be one last name',
          ],
          values: [
            formatMessage(messages.lastNameError1),
            formatMessage(messages.lastNameError2),
            formatMessage(messages.lastNameError3),
            formatMessage(messages.lastNameError4),
          ],
        }}
        handler={handleDataChange}
        onInputFocus={() => clearError('lastName')}
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
          options: ['Should be less than 2001 characters'],
          values: [formatMessage(messages.descriptionError)],
        }}
        onInputFocus={() => clearError('description')}
      />

      {!avatar ? (
        <>
          <Button
            // key="button"
            $backgroundColor={colors.secondary}
            color="white"
            disabled={sendingRequest}
            style={{ marginBottom: '1.5rem' }}
            onClickHandler={() => this.fileInput.click()}
          >
            {formatMessage(messages.addAvatarButton)}
          </Button>
          <input
            key="input"
            type="file"
            ref={(r) => {
              this.fileInput = r;
            }}
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
      ) : null}

      {avatar ? (
        <Avatar style={{ backgroundImage: `url("${avatar}")` }}>
          <RemoveAvatarButton
            disabled={sendingRequest}
            onClick={deleteAvatar}
          >
            <Icon glyph="cross" size={1} />
          </RemoveAvatarButton>
        </Avatar>
      ) : null}

      <Label>{formatMessage(messages.genderLabel)}</Label>
      <SelectBox
        id="gender"
        value={data.gender}
        options={genderOptions}
        borderColor={colors.darkGrey}
        onFocusBorderColor={colors.secondary}
        handleValueChange={handleDataChange}
      />

      <Toggle
        active={data.isSubscribed}
        handler={() => toggleBoolean('isSubscribed')}
      >
        {formatMessage(messages.isSubscribedLabel)}
      </Toggle>

      <Label>{formatMessage(messages.languageLabel)}</Label>
      <SelectBox
        id="language"
        value={data.language}
        options={languageOptions}
        borderColor={colors.darkGrey}
        onFocusBorderColor={colors.secondary}
        handleValueChange={handleDataChange}
      />

      <FormInput
        id="phone"
        type="text"
        label={formatMessage(messages.phoneLabel)}
        value={data.phone}
        error={{
          message: errors.phone,
          options: ['Should be less than 51 characters'],
          values: [formatMessage(messages.phoneError)],
        }}
        handler={handleDataChange}
        onInputFocus={() => clearError('phone')}
      />

      <Toggle
        active={data.showDisabilities}
        handler={() => toggleBoolean('showDisabilities')}
      >
        {formatMessage(messages.showDisabilitiesLabel)}
      </Toggle>

      <Toggle
        active={data.showEmail}
        handler={() => toggleBoolean('showEmail')}
      >
        {formatMessage(messages.showEmailLabel)}
      </Toggle>

      <Toggle
        active={data.showPhone}
        handler={() => toggleBoolean('showPhone')}
      >
        {formatMessage(messages.showPhoneLabel)}
      </Toggle>

      <FormInput
        id="username"
        type="text"
        label={formatMessage(messages.usernameLabel)}
        value={data.username}
        error={{
          message: errors.username,
          options: [
            'Is required',
            'Should be less than 68 characters',
            'Should only have lowercase letters and hyphens',
          ],
          values: [
            formatMessage(messages.usernameError1),
            formatMessage(messages.usernameError2),
            formatMessage(messages.usernameError3),
          ],
        }}
        handler={handleDataChange}
        onInputFocus={() => clearError('username')}
      />

      <FormInput
        id="zip"
        type="text"
        label={formatMessage(messages.zipLabel)}
        value={data.zip}
        error={{
          message: errors.zip,
          options: ['Should be less than 33 characters'],
          values: [formatMessage(messages.zipError)],
        }}
        handler={handleDataChange}
        onInputFocus={() => clearError('zip')}
      />

      <Label style={{ marginBottom: '0.5rem', textAlign: 'center' }}>
        {formatMessage(messages.teamsLabel)}
      </Label>
      <EditTeams
        teams={data.teams}
        sendingRequest={sendingRequest}
        leaveTeam={leaveTeam}
      />

      <Label style={{ marginBottom: '0.5rem', textAlign: 'center' }}>
        {formatMessage(messages.mapathonsLabel)}
      </Label>
      <EditMapathons
        mapathons={data.events}
        sendingRequest={sendingRequest}
        leaveMapathon={leaveMapathon}
      />

      <Label style={{ marginBottom: '0.5rem', textAlign: 'center' }}>
        {formatMessage(messages.petitionsLabel)}
      </Label>
      <EditPetitions
        sendingRequest={sendingRequest}
        filter={filter}
        loadingPetitions={loadingPetitions}
        nextPage={nextPage}
        petitions={petitions}
        getPetitions={getPetitions}
        onClickFilterReceived={onClickFilterReceived}
        onClickFilterSent={onClickFilterSent}
        setPetitionAccepted={setPetitionAccepted}
        setPetitionCanceled={setPetitionCanceled}
        setPetitionRejected={setPetitionRejected}
      />

      <ButtonsWrapper>
        <Button
          $backgroundColor={colors.lightGrey}
          float
          disabled={sendingRequest}
          onClickHandler={hideEditUser}
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
          onClickHandler={() => editUser(data)}
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
  user: PropTypes.object.isRequired,
  avatar: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired,
  sendingRequest: PropTypes.bool.isRequired,
  filter: PropTypes.string.isRequired,
  loadingPetitions: PropTypes.bool.isRequired,
  nextPage: PropTypes.number,
  petitions: PropTypes.array.isRequired,
  clearErrors: PropTypes.func.isRequired,
  setNotificationMessage: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
  createAvatar: PropTypes.func.isRequired,
  deleteAvatar: PropTypes.func.isRequired,
  leaveTeam: PropTypes.func.isRequired,
  leaveMapathon: PropTypes.func.isRequired,
  getPetitions: PropTypes.func.isRequired,
  onClickFilterReceived: PropTypes.func.isRequired,
  onClickFilterSent: PropTypes.func.isRequired,
  setPetitionAccepted: PropTypes.func.isRequired,
  setPetitionCanceled: PropTypes.func.isRequired,
  setPetitionRejected: PropTypes.func.isRequired,
  hideEditUser: PropTypes.func.isRequired,
  editUser: PropTypes.func.isRequired,
};

export default Edit;