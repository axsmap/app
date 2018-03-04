import { defineMessages } from 'react-intl'

export default defineMessages({
  defaultPageTitle: {
    id: 'axsmap.components.User.defaultPageTitle',
    defaultMessage: "User's details | AXS Map"
  },
  detailsPageTitle: {
    id: 'axsmap.components.User.detailsPageTitle',
    defaultMessage: 'Details of {userName} | AXS Map'
  },
  editPageTitle: {
    id: 'axsmap.components.User.editPageTitle',
    defaultMessage: 'Edit {userName} | AXS Map'
  },
  notFoundPageTitle: {
    id: 'axsmap.components.User.notFoundPageTitle',
    defaultMessage: 'User not found | AXS Map'
  },
  detailsHeader: {
    id: 'axsmap.components.User.detailsHeader',
    defaultMessage: "User's details"
  },
  editHeader: {
    id: 'axsmap.components.User.editHeader',
    defaultMessage: 'Edit user'
  },
  timeoutError: {
    id: 'axsmap.components.User.timeoutError',
    defaultMessage: 'Slow connection. Try again later.'
  },
  serverError: {
    id: 'axsmap.components.User.serverError',
    defaultMessage: 'Oh Snap! We have internal problems, come back later.'
  },
  notFoundError: {
    id: 'axsmap.components.User.notFoundError',
    defaultMessage: "This user doesn't exists."
  },
  blockedError: {
    id: 'axsmap.components.User.blockedError',
    defaultMessage: "You can't do this because you are blocked."
  },
  forbiddenError: {
    id: 'axsmap.components.User.forbiddenError',
    defaultMessage: "You can't do this action."
  },
  fileSizeError: {
    id: 'axsmap.components.User.fileSizeError',
    defaultMessage: "Don't upload a photo bigger than 8MB."
  },
  onlyManagerError: {
    id: 'axsmap.components.User.onlyManagerError',
    defaultMessage: "You can't leave because you are the only manager"
  },
  notMemberError: {
    id: 'axsmap.components.User.notMemberError',
    defaultMessage: "You aren't a member of this team"
  },
  leaveTeamSuccess: {
    id: 'axsmap.components.User.leaveTeamSuccess',
    defaultMessage: 'You left this team'
  },
  mapathonEndedError: {
    id: 'axsmap.components.User.mapathonEndedError',
    defaultMessage: "You can't leave because this mapathon already ended"
  },
  notParticipantError: {
    id: 'axsmap.components.User.notParticipantError',
    defaultMessage: "You aren't a participant of this team"
  },
  leaveMapathonSuccess: {
    id: 'axsmap.components.User.leaveMapathonSuccess',
    defaultMessage: 'You left this mapathon'
  },
  reviewsRanking: {
    id: 'axsmap.components.User.reviewsRanking',
    defaultMessage:
      '{ranking, selectordinal, one {#st} two {#nd} few {#rd} other{#th}} ranked for {amount} {amount, plural, one {review} other {reviews}} made'
  },
  teamsTitle: {
    id: 'axsmap.components.User.teamsTitle',
    defaultMessage:
      '{amount} {amount, plural, one {participation} other {participations}} in teams'
  },
  showAllButton: {
    id: 'axsmap.components.User.showAllButton',
    defaultMessage: 'Show all'
  },
  showLessButton: {
    id: 'axsmap.components.User.showLessButton',
    defaultMessage: 'Show less'
  },
  mapathonsTitle: {
    id: 'axsmap.components.User.mapathonsTitle',
    defaultMessage:
      '{amount} {amount, plural, one {participation} other {participations}} in mapathons'
  },
  editUserButton: {
    id: 'axsmap.components.User.editUserButton',
    defaultMessage: 'Edit user'
  },
  firstNameLabel: {
    id: 'axsmap.components.User.firstNameLabel',
    defaultMessage: 'First name'
  },
  firstNameError1: {
    id: 'axsmap.components.User.firstNameError1',
    defaultMessage: 'Is required'
  },
  firstNameError2: {
    id: 'axsmap.components.User.firstNameError2',
    defaultMessage: 'Should be less than 25 characters'
  },
  firstNameError3: {
    id: 'axsmap.components.User.firstNameError3',
    defaultMessage: 'Should only have letters'
  },
  firstNameError4: {
    id: 'axsmap.components.User.firstNameError4',
    defaultMessage: 'Should only be one first name'
  },
  lastNameLabel: {
    id: 'axsmap.components.User.lastNameLabel',
    defaultMessage: 'Last name'
  },
  lastNameError1: {
    id: 'axsmap.components.User.lastNameError1',
    defaultMessage: 'Is required'
  },
  lastNameError2: {
    id: 'axsmap.components.User.lastNameError2',
    defaultMessage: 'Should be less than 37 characters'
  },
  lastNameError3: {
    id: 'axsmap.components.User.lastNameError3',
    defaultMessage: 'Should only have letters'
  },
  lastNameError4: {
    id: 'axsmap.components.User.lastNameError4',
    defaultMessage: 'Should only be one last name'
  },
  descriptionLabel: {
    id: 'axsmap.components.User.descriptionLabel',
    defaultMessage: 'Description'
  },
  descriptionPlaceholder: {
    id: 'axsmap.components.User. descriptionPlaceholder',
    defaultMessage: 'Talk about your motivations and goals'
  },
  descriptionError: {
    id: 'axsmap.components.User.descriptionError',
    defaultMessage: 'Should be less than 2001 characters'
  },
  addAvatarButton: {
    id: 'axsmap.components.User.addAvatarButton',
    defaultMessage: 'Add avatar'
  },
  genderLabel: {
    id: 'axsmap.components.User.genderLabel',
    defaultMessage: 'Gender'
  },
  femaleLabel: {
    id: 'axsmap.components.User.femaleLabel',
    defaultMessage: 'Female'
  },
  maleLabel: {
    id: 'axsmap.components.User.maleLabel',
    defaultMessage: 'Male'
  },
  otherLabel: {
    id: 'axsmap.components.User.otherLabel',
    defaultMessage: 'Other'
  },
  privateLabel: {
    id: 'axsmap.components.User.privateLabel',
    defaultMessage: 'Private'
  },
  transgenderLabel: {
    id: 'axsmap.components.User.transgenderLabel',
    defaultMessage: 'Transgender'
  },
  isSubscribedLabel: {
    id: 'axsmap.components.User.isSubscribedLabel',
    defaultMessage: 'I want the AXS Newsletter'
  },
  languageLabel: {
    id: 'axsmap.components.User.languageLabel',
    defaultMessage: 'Language'
  },
  englishLabel: {
    id: 'axsmap.components.User.englishLabel',
    defaultMessage: 'English'
  },
  spanishLabel: {
    id: 'axsmap.components.User.spanishLabel',
    defaultMessage: 'Spanish'
  },
  phoneLabel: {
    id: 'axsmap.components.User.phoneLabel',
    defaultMessage: 'Phone number'
  },
  phoneError: {
    id: 'axsmap.components.User.phoneError',
    defaultMessage: 'Should be less than 51 characters'
  },
  showDisabilitiesLabel: {
    id: 'axsmap.components.User.showDisabilitiesLabel',
    defaultMessage: 'Show my disabilities in profile'
  },
  showEmailLabel: {
    id: 'axsmap.components.User.showEmailLabel',
    defaultMessage: 'Show my email in profile'
  },
  showPhoneLabel: {
    id: 'axsmap.components.User.showPhoneLabel',
    defaultMessage: 'Show my phone number in profile'
  },
  usernameLabel: {
    id: 'axsmap.components.User.usernameLabel',
    defaultMessage: 'Username'
  },
  usernameError1: {
    id: 'axsmap.components.User.usernameError1',
    defaultMessage: 'Is required'
  },
  usernameError2: {
    id: 'axsmap.components.User.usernameError2',
    defaultMessage: 'Should be less than 68 characters'
  },
  usernameError3: {
    id: 'axsmap.components.User.usernameError3',
    defaultMessage: 'Should only have lowercase letters and hyphens'
  },
  zipLabel: {
    id: 'axsmap.components.User.zipLabel',
    defaultMessage: 'ZIP'
  },
  zipError: {
    id: 'axsmap.components.User.zipError',
    defaultMessage: 'Should be less than 33 characters'
  },
  teamsLabel: {
    id: 'axsmap.components.User.teamsLabel',
    defaultMessage: 'Teams'
  },
  leaveButton: {
    id: 'axsmap.components.User.leaveButton',
    defaultMessage: 'Leave'
  },
  mapathonsLabel: {
    id: 'axsmap.components.User.mapathonsLabel',
    defaultMessage: 'Mapathons'
  },
  closeButton: {
    id: 'axsmap.components.User.closeButton',
    defaultMessage: 'Close'
  },
  saveButton: {
    id: 'axsmap.components.User.saveButton',
    defaultMessage: 'Save'
  }
})
