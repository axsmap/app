import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import styled from 'styled-components'

import 'react-day-picker/dist/style.css'

import FormInput from '../FormInput'

import Icon from '../Icon'
import { colors, fonts, media, fontWeight, fontSize } from '../../styles'
import { getRandomString } from '../../utilities'

import messages from './messages'
import Step from './Step'
import Summary from './Summary'
import ImageUploader from './ImageUploader'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  flex-grow: 1;
  overflow: hidden
  padding: 1rem 1rem;
  width: 100%;
  margin-left: auto;
  margin-right: auto;

  ${media.desktop`
    padding: 2rem 0;
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
const SubTitle = styled.div`
  width: 100%;
  color: ${colors.darkestGrey};
  font-family: ${fonts.primary};
  font-size: ${fontSize.base};
  font-weight: ${fontWeight.semibold};
`

const FocusArea = styled.button`
  width: 8rem;
  height: 5rem;
  background-color: ${props => props.$backgroundColor || colors.gray100};
  color: ${colors.white};
  border: none;
  margin-right: 1.5rem;
  font-size: ${fontSize.xs};
  font-weight: ${fontWeight.semibold};
  display: inline-grid;
  justify-content: center;
  background-image: linear-gradient(
    to bottom,
    ${colors.gray700},
    ${colors.gray700} 20%,
    ${props => props.$backgroundColor || colors.gray100} 0%,
    ${props => props.$backgroundColor || colors.gray100}
  );
  background-size: cover;
  background-repeat: no-repeat;
  cursor: pointer;
`

const Form = ({
  sendingRequest,
  poster,
  locationCoordinates,
  errors,
  loadingTeams,
  teams,
  getUserLocation,
  setNotificationMessage,
  clearError,
  createPoster,
  deletePoster,
  setLocationCoordinates,
  getTeams,
  createMapathon,
}) => {
  const { formatMessage } = useIntl();

  const [data, setData] = useState({
    name: '',
    address: '',
    title: '',
    description: '',
    entranceFocus: null,
    interiorFocus: null,
    restroomFocus: null,
    endDate: undefined,
    isOpen: true,
    participantsGoal: '',
    reviewsGoal: '',
    startDate: undefined,
    teamManager: '',
    donationEnabled: false,
    donationAmounts: [
      {
        key: getRandomString(),
        value: 5,
        isRemovable: false,
      },
      {
        key: getRandomString(),
        value: 10,
        isRemovable: true,
      },
      {
        key: getRandomString(),
        value: 15,
        isRemovable: true,
      },
    ],
    donationGoal: 10,
  });

  const [hostAs, setHostAs] = useState('individual');
  const [hostAsOptions, setHostAsOptions] = useState([
    {
      value: 'individual',
      label: formatMessage(messages.individualLabel),
    },
    {
      value: 'team',
      label: formatMessage(messages.teamLabel),
    },
  ]);
  const [stepNumber, setStepNumber] = useState(1);
  const [image, setImage] = useState('');

  useEffect(() => {
    getUserLocation();
  }, [getUserLocation]);

  const handleDataChange = (event) => {
    const { id, value } = event.target;
    setData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handlePoster = (event) => {
    setNotificationMessage('');

    const posterFile = event;
    if (posterFile.size > 8388608) {
      setNotificationMessage('axsmap.components.CreateMapathon.fileSizeError');
      return;
    }

    const imageURL = URL.createObjectURL(posterFile);
    setImage(imageURL);

    const data = new FormData();
    data.append('photo', posterFile);

    createPoster(data);
  };

  const toggleFocusArea = (focusArea, value) => {
    setData((prevState) => ({
      ...prevState,
      [focusArea]: prevState[focusArea] === value ? null : value,
    }));
  };

  const goNextStep = () => {
    const nextStep = stepNumber + 1;
    if (nextStep <= 4) {
      setStepNumber(nextStep);
    }
  };

  const goPreviousStep = () => {
    const previousStep = stepNumber - 1;
    if (previousStep >= 1) {
      setStepNumber(previousStep);
    }
  };

  return (
    <Wrapper>
      <Step
        headerTitle={formatMessage(messages.headerTitle)}
        stepNumber={1}
        currentStepNumber={stepNumber}
        stepTitle={formatMessage(messages.stepTitle1)}
        isFirstStep
        isLastStep={false}
        goNextStep={goNextStep}
        isFilled={data.name.length > 0 && data.address.length > 0}
      >
        <FormInput
          id="name"
          type="text"
          label={formatMessage(messages.yourNameLabel)}
          placeholder={formatMessage(messages.yourNamePlaceholder)}
          value={data.name}
          handler={handleDataChange}
          error={{
            message: errors.name,
            options: ['Is required', 'Should be less than 101 characters'],
            values: [
              formatMessage(messages.nameError1),
              formatMessage(messages.nameError2),
            ],
          }}
          onInputFocus={() => clearError('name')}
        />
        <FormInput
          id="address"
          type="textarea"
          label={formatMessage(messages.yourLocationLabel)}
          placeholder={formatMessage(messages.yourLocationPlaceholder)}
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
      </Step>

      <Step
        headerTitle={formatMessage(messages.headerTitle)}
        stepNumber={2}
        currentStepNumber={stepNumber}
        stepTitle={formatMessage(messages.stepTitle2)}
        isFirstStep={false}
        isLastStep={false}
        goNextStep={goNextStep}
        goPrevStep={goPreviousStep}
        isFilled={data.title.length > 0}
      >
        <FormInput
          id="title"
          type="text"
          label={formatMessage(messages.mapathonTitleLabel)}
          placeholder={formatMessage(messages.mapathonTitlePlaceholder)}
          value={data.title}
          handler={handleDataChange}
          error={{
            message: errors.title,
            options: [
              'Is required',
              'Should be less than 101 characters',
              'Is already taken',
            ],
            values: [
              formatMessage(messages.titleError1),
              formatMessage(messages.titleError2),
              formatMessage(messages.titleError3),
            ],
          }}
          onInputFocus={() => clearError('title')}
        />
        <FormInput
          id="description"
          type="textarea"
          label={formatMessage(messages.mapathonDescriptionLabel)}
          placeholder={formatMessage(messages.mapathonDescriptionPlaceholder)}
          value={data.description}
          handler={handleDataChange}
          error={{
            message: errors.description,
            options: ['Is required', 'Should be less than 301 characters'],
            values: [
              formatMessage(messages.descriptionError),
              formatMessage(messages.descriptionError),
            ],
          }}
          onInputFocus={() => clearError('description')}
        />
        <Label>{formatMessage(messages.mapathonFocusLabel)}</Label>

        <FocusArea
          $backgroundColor={data.entranceFocus ? colors.gray700 : colors.gray100}
          onClick={() => toggleFocusArea('entranceFocus', true)}
        >
          Entrance
          <Icon
            glyph="entrylg"
            size={2}
            color={data.entranceFocus ? colors.white : colors.gray700}
            alt="Entrance"
            style={{ margin: '0 auto' }}
          />
        </FocusArea>
        <FocusArea
          $backgroundColor={data.interiorFocus ? colors.gray700 : colors.gray100}
          onClick={() => toggleFocusArea('interiorFocus', true)}
        >
          Interior
          <Icon
            glyph="interior"
            size={3}
            color={data.interiorFocus ? colors.white : colors.gray700}
            alt="Interior"
            style={{ margin: '0 auto' }}
          />
        </FocusArea>
        <FocusArea
          $backgroundColor={data.restroomFocus ? colors.gray700 : colors.gray100}
          onClick={() => toggleFocusArea('restroomFocus', true)}
        >
          Restroom
          <Icon
            glyph="restroom"
            size={2}
            color={data.restroomFocus ? colors.white : colors.gray700}
            alt="Restroom"
            style={{ margin: '0 auto' }}
          />
        </FocusArea>
      </Step>

      <Step
        headerTitle={formatMessage(messages.headerTitle)}
        stepNumber={3}
        currentStepNumber={stepNumber}
        stepTitle={formatMessage(messages.stepTitle3)}
        isFirstStep={false}
        isLastStep={false}
        goPrevStep={goPreviousStep}
        goNextStep={goNextStep}
      >
        <SubTitle>{formatMessage(messages.mapathonPhotoDescription)}</SubTitle>
        <ImageUploader handleUpload={handlePoster} updateImageState={setImage} />
      </Step>

      <Step
        headerTitle={formatMessage(messages.headerTitle)}
        stepNumber={4}
        currentStepNumber={stepNumber}
        stepTitle={formatMessage(messages.stepTitle4)}
        isFirstStep={false}
        isLastStep
        goPrevStep={goPreviousStep}
        goNextStep={() => createMapathon(data)}
      >
        <Summary
          title={data.title}
          address={data.address}
          description={data.description}
          focusAreas={[data.entranceFocus, data.interiorFocus, data.restroomFocus]}
          image={image}
        />
      </Step>
    </Wrapper>
  );
};

Form.propTypes = {
  sendingRequest: PropTypes.bool.isRequired,
  poster: PropTypes.string.isRequired,
  locationCoordinates: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  loadingTeams: PropTypes.bool.isRequired,
  teams: PropTypes.array.isRequired,
  getUserLocation: PropTypes.func.isRequired,
  setNotificationMessage: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
  createPoster: PropTypes.func.isRequired,
  deletePoster: PropTypes.func.isRequired,
  setLocationCoordinates: PropTypes.func.isRequired,
  getTeams: PropTypes.func.isRequired,
  createMapathon: PropTypes.func.isRequired,
};

export default Form
