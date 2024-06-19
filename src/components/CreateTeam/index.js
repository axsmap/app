/* eslint-disable no-param-reassign */

import { bool, func, object, string } from 'prop-types'
import React, { PureComponent, useEffect, useState } from 'react'
import ReactGA from 'react-ga'
import Helmet from 'react-helmet'
import { useIntl } from 'react-intl'

import Button from '../Button'
import Footer from '../Footer'
import FormInput from '../FormInput'
import Icon from '../Icon'
import NavBar from '../NavBar'
import { colors } from '../../styles'
import TopBar from '../../containers/TopBar'

import Avatar from './Avatar'
import ButtonContent from './ButtonContent'
import ButtonWrapper from './ButtonWrapper'
import Container from './Container'
import messages from './messages'
import RemoveAvatarButton from './RemoveAvatarButton'
import Title from './Title'
import Wrapper from './Wrapper'

const CreateTeam = ({
  isAuthenticated,
  sendingRequest,
  avatar,
  errors,
  clearState,
  setNotificationMessage,
  clearError,
  createAvatar,
  deleteAvatar,
  createTeam,
}) => {
  const { formatMessage } = useIntl();
  const history = useHistory();
  const fileInputRef = useRef(null);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (!isAuthenticated) history.push('/sign-in');
    ReactGA.pageview(window.location.pathname + window.location.search);

    return () => {
      clearState();
    };
  }, [isAuthenticated, history, clearState]);

  const handleDataChange = (event) => {
    const { id, value } = event.target;
    if (id === 'name') setName(value);
    if (id === 'description') setDescription(value);
  };

  const handleAvatar = (event) => {
    setNotificationMessage('');

    const avatarFile = event.target.files[0];
    if (avatarFile.size > 8388608) {
      setNotificationMessage('axsmap.components.CreateTeam.fileSizeError');
      return;
    }

    const data = new FormData();
    data.append('photo', avatarFile);

    createAvatar(data);
  };

  return (
    <Wrapper>
      <Helmet title={formatMessage(messages.pageTitle)} />

      <TopBar hideOn="phone,tablet" />

      <NavBar
        hideOn="desktop,widescreen"
        isNarrow
        title={formatMessage(messages.headerTitle)}
        goBackHandler={() => history.goBack()}
      />

      <Container>
        <Title>{formatMessage(messages.headerTitle)}</Title>

        <FormInput
          id="name"
          type="text"
          label={formatMessage(messages.nameLabel)}
          value={name}
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
          value={description}
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

        <ButtonWrapper>
          <Button
            type="submit"
            float
            disabled={sendingRequest}
            onClickHandler={() =>
              createTeam({
                name,
                description,
                avatar,
              })
            }
          >
            <ButtonContent>
              <Icon
                glyph="cross"
                size={1}
                rotate="45deg"
                color={colors.darkestGrey}
              />
              <p style={{ margin: '0 0 0 0.5rem' }}>
                {formatMessage(messages.createTeamButton)}
              </p>
            </ButtonContent>
          </Button>
        </ButtonWrapper>
      </Container>

      <Footer hideOn="phone,tablet" isNarrow />
    </Wrapper>
  );
};

CreateTeam.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  sendingRequest: PropTypes.bool.isRequired,
  avatar: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired,
  clearState: PropTypes.func.isRequired,
  setNotificationMessage: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
  createAvatar: PropTypes.func.isRequired,
  deleteAvatar: PropTypes.func.isRequired,
  createTeam: PropTypes.func.isRequired,
};

export default CreateTeam;