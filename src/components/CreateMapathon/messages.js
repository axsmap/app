import { defineMessages } from 'react-intl'

export default defineMessages({
  pageTitle: {
    id: 'axsmap.components.CreateMapathon.pageTitle',
    defaultMessage: 'Create a Mapathon | AXS Map'
  },
  headerTitle: {
    id: 'axsmap.components.CreateMapathon.headerTitle',
    defaultMessage: 'Create'
  },
  nameLabel: {
    id: 'axsmap.components.CreateMapathon.nameLabel',
    defaultMessage: 'Name'
  },
  namePlaceholder: {
    id: 'axsmap.components.CreateMapathon.namePlaceholder',
    defaultMessage: 'Name your Mapathon (eg. New York City Mapathon)'
  },
  nameError1: {
    id: 'axsmap.components.CreateMapathon.nameError1',
    defaultMessage: 'Is required'
  },
  nameError2: {
    id: 'axsmap.components.CreateMapathon.nameError2',
    defaultMessage: 'Should be less than 101 characters'
  },
  nameError3: {
    id: 'axsmap.components.CreateMapathon.nameError3',
    defaultMessage: 'Is already taken'
  },
  titleError1: {
    id: 'axsmap.components.CreateMapathon.titleError1',
    defaultMessage: 'Is required'
  },
  titleError2: {
    id: 'axsmap.components.CreateMapathon.titleError2',
    defaultMessage: 'Should be less than 101 characters'
  },
  titleError3: {
    id: 'axsmap.components.CreateMapathon.titleError3',
    defaultMessage: 'Is already taken'
  },
  descriptionLabel: {
    id: 'axsmap.components.CreateMapathon.descriptionLabel',
    defaultMessage: 'Mapathon description'
  },
  descriptionPlaceholder: {
    id: 'axsmap.components.CreateMapathon.descriptionPlaceholder',
    defaultMessage:
      'Write a short blurb about your Mapathon (eg. Team NYC wants you to come out this Sunday to help add accessibility data to our neighborhood!)'
  },
  descriptionError: {
    id: 'axsmap.components.CreateMapathon.descriptionError',
    defaultMessage: 'Should be less than 301 characters'
  },
  addressLabel: {
    id: 'axsmap.components.CreateMapathon.addressLabel',
    defaultMessage: 'Starting point'
  },
  addressPlaceholder: {
    id: 'axsmap.components.CreateMapathon.addressPlaceholder',
    defaultMessage:
      'Enter your starting point address (eg. 405 East 42nd Street, New York, NY) or move the pin in the map below'
  },
  addressError1: {
    id: 'axsmap.components.CreateMapathon.addressError1',
    defaultMessage: 'Is required'
  },
  addressError2: {
    id: 'axsmap.components.CreateMapathon.addressError2',
    defaultMessage: 'Should be less than 201 characters'
  },
  locationLabel: {
    id: 'axsmap.components.CreateMapathon.locationLabel',
    defaultMessage: 'Location'
  },
  datesLabel: {
    id: 'axsmap.components.CreateMapathon.datesLabel',
    defaultMessage: 'Start date and end date'
  },
  datesError: {
    id: 'axsmap.components.CreateMapathon.datesError',
    defaultMessage: 'Dates are required'
  },
  startDateError: {
    id: 'axsmap.components.CreateMapathon.startDateError',
    defaultMessage: 'Start date is required'
  },
  endDateError: {
    id: 'axsmap.components.CreateMapathon.endDateError',
    defaultMessage: 'End date is required'
  },
  isOpenLabel: {
    id: 'axsmap.components.CreateMapathon.isOpenLabel',
    defaultMessage: 'Make this Mapathon open to the public'
  },
  participantsGoalLabel: {
    id: 'axsmap.components.CreateMapathon.participantsGoalLabel',
    defaultMessage: 'How many participants will be joining?'
  },
  participantsGoalError1: {
    id: 'axsmap.components.CreateMapathon.participantsGoalError1',
    defaultMessage: 'Is required'
  },
  participantsGoalError2: {
    id: 'axsmap.components.CreateMapathon.participantsGoalError2',
    defaultMessage: 'Should be greater than 0'
  },
  participantsGoalError3: {
    id: 'axsmap.components.CreateMapathon.participantsGoalError3',
    defaultMessage: 'Should be less than 1001'
  },
  addPosterButton: {
    id: 'axsmap.components.CreateMapathon.addPosterButton',
    defaultMessage: 'Add poster'
  },
  reviewsGoalLabel: {
    id: 'axsmap.components.CreateMapathon.reviewsGoalLabel',
    defaultMessage: "What's your review goal?"
  },
  reviewsGoalError1: {
    id: 'axsmap.components.CreateMapathon.reviewsGoalError1',
    defaultMessage: 'Is required'
  },
  reviewsGoalError2: {
    id: 'axsmap.components.CreateMapathon.reviewsGoalError2',
    defaultMessage: 'Should be greater than 0'
  },
  reviewsGoalError3: {
    id: 'axsmap.components.CreateMapathon.reviewsGoalError3',
    defaultMessage: 'Should be less than 10001'
  },
  hostAsLabel: {
    id: 'axsmap.components.CreateMapathon.hostAsLabel',
    defaultMessage: 'Host as'
  },
  individualLabel: {
    id: 'axsmap.components.CreateMapathon.individualLabel',
    defaultMessage: 'An individual'
  },
  teamLabel: {
    id: 'axsmap.components.CreateMapathon.teamLabel',
    defaultMessage: 'A team'
  },
  chooseManagerButton: {
    id: 'axsmap.components.CreateMapathon.chooseManagerButton',
    defaultMessage: 'Choose'
  },
  chooseManagerPlaceholder: {
    id: 'axsmap.components.CreateMapathon.chooseManagerPlaceholder',
    defaultMessage: 'Search your teams'
  },
  noTeamsResultsText: {
    id: 'axsmap.components.CreateMapathon.noTeamsResultsText',
    defaultMessage: 'No teams found'
  },
  donationLabel: {
    id: 'axsmap.components.CreateMapathon.donationLabel',
    defaultMessage: 'Yes! I want to make this a Fundraising Event for AXS Lab'
  },
  donationAmountsLabel: {
    id: 'axsmap.components.CreateMapathon.donationAmountsLabel',
    defaultMessage: 'Donation amounts (3 max)'
  },
  donationAmountDescriptionPlaceholder: {
    id: 'axsmap.components.CreateMapathon.donationAmountDescriptionPlaceholder',
    defaultMessage: 'What provides this amount?'
  },
  donationGoalLabel: {
    id: 'axsmap.components.CreateMapathon.donationGoalLabel',
    defaultMessage: 'Donation goal'
  },
  donationGoalError1: {
    id: 'axsmap.components.CreateMapathon.donationGoalError1',
    defaultMessage: 'Is required'
  },
  donationGoalError2: {
    id: 'axsmap.components.CreateMapathon.donationGoalError2',
    defaultMessage: 'Should be greater than 9'
  },
  donationGoalError3: {
    id: 'axsmap.components.CreateMapathon.donationGoalError3',
    defaultMessage: 'Should be less than 100001'
  },
  stepTitle1: {
    id: 'axsmap.components.CreateMapathon.stepTitle1',
    defaultMessage: 'Enter your details.'
  },
  stepTitle2: {
    id: 'axsmap.components.CreateMapathon.stepTitle2',
    defaultMessage: 'Tell your story.'
  },
  stepTitle3: {
    id: 'axsmap.components.CreateMapathon.stepTitle3',
    defaultMessage: 'Add a photo.'
  },
  stepTitle4: {
    id: 'axsmap.components.CreateMapathon.stepTitle4',
    defaultMessage: 'Does this look correct?'
  },
  stepCount1: {
    id: 'axsmap.components.CreateMapathon.stepCount1',
    defaultMessage: 'Step'
  },
  stepCount2: {
    id: 'axsmap.components.CreateMapathon.stepCount2',
    defaultMessage: 'of'
  },
  stepConfirm: {
    id: 'axsmap.components.CreateMapathon.stepConfirm',
    defaultMessage: "Great! Let's confirm."
  },
  yourNameLabel: {
    id: 'axsmap.components.CreateMapathon.yourNameLabel',
    defaultMessage: 'Your name'
  },
  yourNamePlaceholder: {
    id: 'axsmap.components.CreateMapathon.yourNamePlaceholder',
    defaultMessage: 'i.e. John Doe'
  },
  yourLocationLabel: {
    id: 'axsmap.components.CreateMapathon.yourLocationLabel',
    defaultMessage: 'Your location'
  },
  yourLocationPlaceholder: {
    id: 'axsmap.components.CreateMapathon.yourLocationPlaceholder',
    defaultMessage: 'Enter a neighborhood, city, or ZIP code'
  },
  mapathonTitleLabel: {
    id: 'axsmap.components.CreateMapathon.mapathonTitleLabel',
    defaultMessage: 'Give your Mapathon a title.'
  },
  mapathonTitlePlaceholder: {
    id: 'axsmap.components.CreateMapathon.mapathonTitlePlaceholder',
    defaultMessage: 'E.g. Mapping for Jason'
  },
  mapathonDescriptionLabel: {
    id: 'axsmap.components.CreateMapathon.mapathonDescriptionLabel',
    defaultMessage: 'Inspire others to get involved.'
  },
  mapathonDescriptionPlaceholder: {
    id: 'axsmap.components.CreateMapathon.mapathonDescriptionPlaceholder',
    defaultMessage: "I'm doing a Mapathon for..."
  },
  mapathonFocusLabel: {
    id: 'axsmap.components.CreateMapathon.mapathonFocusLabel',
    defaultMessage: 'Select your focus area(s)'
  },
  mapathonPhotoDescription: {
    id: 'axsmap.components.CreateMapathon.mapathonPhotoDescription',
    defaultMessage:
      'A photo helps tell your story and build the AXS Map community!'
  },
  continueButton: {
    id: 'axsmap.components.CreateMapathon.continueButton',
    defaultMessage: 'Continue'
  },
  backButton: {
    id: 'axsmap.components.CreateMapathon.backButton',
    defaultMessage: 'Back'
  },
  editDetailsButton: {
    id: 'axsmap.components.CreateMapathon.editDetailsButton',
    defaultMessage: 'Edit Details'
  },
  confirmButton: {
    id: 'axsmap.components.CreateMapathon.confirmButton',
    defaultMessage: 'Confirm'
  },
  createMapathonButton: {
    id: 'axsmap.components.CreateTeam.createMapathonButton',
    defaultMessage: 'Create mapathon'
  }
})
