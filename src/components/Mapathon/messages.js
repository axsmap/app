import { defineMessages } from 'react-intl'

export default defineMessages({
  defaultPageTitle: {
    id: 'axsmap.components.Mapathon.defaultPageTitle',
    defaultMessage: "Mapathon's details | AXS Map"
  },
  detailsPageTitle: {
    id: 'axsmap.components.Mapathon.detailsPageTitle',
    defaultMessage: 'Details of {mapathonName} | AXS Map'
  },
  editPageTitle: {
    id: 'axsmap.components.Mapathon.editPageTitle',
    defaultMessage: 'Edit {mapathonName} | AXS Map'
  },
  notFoundPageTitle: {
    id: 'axsmap.components.Mapathon.notFoundPageTitle',
    defaultMessage: 'Mapathon not found | AXS Map'
  },
  detailsHeader: {
    id: 'axsmap.components.Mapathon.detailsHeader',
    defaultMessage: "Mapathon's details"
  },
  editHeader: {
    id: 'axsmap.components.Mapathon.editHeader',
    defaultMessage: 'Edit mapathon'
  },
  timeoutError: {
    id: 'axsmap.components.Mapathon.timeoutError',
    defaultMessage: 'Slow connection. Try again later.'
  },
  serverError: {
    id: 'axsmap.components.Mapathon.serverError',
    defaultMessage: 'Oh Snap! We have internal problems, come back later.'
  },
  blockedError: {
    id: 'axsmap.components.Mapathon.blockedError',
    defaultMessage: "You can't do this because you are blocked."
  },
  alreadyParticipantError: {
    id: 'axsmap.components.Mapathon.alreadyParticipantError',
    defaultMessage: 'You already are a participant in this event.'
  },
  alreadyPendingRequestError: {
    id: 'axsmap.components.Mapathon.alreadyPendingRequestError',
    defaultMessage: 'You already have a pending petition with this event.'
  },
  alreadyFinishedEventError: {
    id: 'axsmap.components.Mapathon.alreadyFinishedEventError',
    defaultMessage: 'This event has already finished.'
  },
  joinedSuccess: {
    id: 'axsmap.components.Mapathon.joinedSuccess',
    defaultMessage: 'You are now a participant in this event.'
  },
  requestedSuccess: {
    id: 'axsmap.components.Mapathon.requestedSuccess',
    defaultMessage: 'You sent a request to this event.'
  },
  forbiddenError: {
    id: 'axsmap.components.Mapathon.forbiddenError',
    defaultMessage: "You can't do this."
  },
  fileSizeError: {
    id: 'axsmap.components.Mapathon.fileSizeError',
    defaultMessage: "Don't upload a photo bigger than 8MB."
  },
  removeManagersError: {
    id: 'axsmap.components.Mapathon.removeManagersError',
    defaultMessage: "You can't remove all managers."
  },
  sameUserError: {
    id: 'axsmap.components.Mapathon.sameUserError',
    defaultMessage: "You can't invite yourself."
  },
  alreadyPendingUserError: {
    id: 'axsmap.components.Mapathon.alreadyPendingUserError',
    defaultMessage: 'This user already has a pending invitation.'
  },
  alreadyPendingTeamError: {
    id: 'axsmap.components.Mapathon.alreadyPendingTeamError',
    defaultMessage: 'This team already has a pending invitation.'
  },
  alreadyUserParticipantError: {
    id: 'axsmap.components.Mapathon.alreadyUserParticipantError',
    defaultMessage: 'This user is already a participant.'
  },
  alreadyTeamParticipantError: {
    id: 'axsmap.components.Mapathon.alreadyTeamParticipantError',
    defaultMessage: 'This team is already a participant.'
  },
  invitationSuccess: {
    id: 'axsmap.components.Mapathon.invitationSuccess',
    defaultMessage: 'Invitation sent.'
  },
  calendarDates: {
    id: 'axsmap.components.Mapathon.calendarDates',
    defaultMessage: 'From {startDate, date, medium} to {endDate, date, medium}'
  },
  reviewsMade: {
    id: 'axsmap.components.Mapathon.reviewsMade',
    defaultMessage: '{amount} reviews made from {goal} reviews'
  },
  reviewsRanking: {
    id: 'axsmap.components.Mapathon.reviewsRanking',
    defaultMessage:
      '{ranking, selectordinal, one {#st} two {#nd} few {#rd} other{#th}} ranked for reviews made'
  },
  participantsGoal: {
    id: 'axsmap.components.Mapathon.participantsGoal',
    defaultMessage:
      '{amount} participants from {goal} {goal, plural, one {participant} other {participants}}'
  },
  showAllButton: {
    id: 'axsmap.components.Mapathon.showAllButton',
    defaultMessage: 'Show all'
  },
  showLessButton: {
    id: 'axsmap.components.Mapathon.showLessButton',
    defaultMessage: 'Show less'
  },
  teamsAmount: {
    id: 'axsmap.components.Mapathon.teamsAmount',
    defaultMessage:
      '{amount} {amount, plural, one {team participant} other {teams participants}}'
  },
  donationLabel: {
    id: 'axsmap.components.Mapathon.donationLabel',
    defaultMessage: 'Fundraising campaign'
  },
  donationAmountRaisedLabel: {
    id: 'axsmap.components.Mapathon.donationAmountRaisedLabel',
    defaultMessage: 'Raised'
  },
  donationDonorsLabel: {
    id: 'axsmap.components.Mapathon.donationDonorsLabel',
    defaultMessage: 'Donors'
  },
  donationGoalLabel: {
    id: 'axsmap.components.Mapathon.donationGoalLabel',
    defaultMessage: 'Goal'
  },
  joinMapathonButton: {
    id: 'axsmap.components.Mapathon.joinMapathonButton',
    defaultMessage: 'Join mapathon'
  },
  editMapathonButton: {
    id: 'axsmap.components.Mapathon.editMapathonButton',
    defaultMessage: 'Edit mapathon'
  },
  individualLabel: {
    id: 'axsmap.components.Mapathon.individualLabel',
    defaultMessage: 'Individual'
  },
  teamLabel: {
    id: 'axsmap.components.Mapathon.teamLabel',
    defaultMessage: 'Team'
  },
  datesError: {
    id: 'axsmap.components.Mapathon.datesError',
    defaultMessage: 'Dates are required'
  },
  startDateError: {
    id: 'axsmap.components.Mapathon.startDateError',
    defaultMessage: 'Start date is required'
  },
  endDateError: {
    id: 'axsmap.components.Mapathon.endDateError',
    defaultMessage: 'End date is required'
  },
  nameLabel: {
    id: 'axsmap.components.Mapathon.nameLabel',
    defaultMessage: 'Name'
  },
  nameError1: {
    id: 'axsmap.components.Mapathon.nameError1',
    defaultMessage: 'Is required'
  },
  nameError2: {
    id: 'axsmap.components.Mapathon.nameError2',
    defaultMessage: 'Should be less than 101 characters'
  },
  descriptionLabel: {
    id: 'axsmap.components.Mapathon.descriptionLabel',
    defaultMessage: 'Description'
  },
  descriptionPlaceholder: {
    id: 'axsmap.components.Mapathon.descriptionPlaceholder',
    defaultMessage: 'Write about the motivation or activities of your event.'
  },
  descriptionError: {
    id: 'axsmap.components.Mapathon.descriptionError',
    defaultMessage: 'Should be less than 301 characters'
  },
  addPosterButton: {
    id: 'axsmap.components.Mapathon.addPosterButton',
    defaultMessage: 'Add poster'
  },
  addressLabel: {
    id: 'axsmap.components.Mapathon.addressLabel',
    defaultMessage: 'Address'
  },
  addressError1: {
    id: 'axsmap.components.Mapathon.addressError1',
    defaultMessage: 'Is required'
  },
  addressError2: {
    id: 'axsmap.components.Mapathon.addressError2',
    defaultMessage: 'Should be less than 201 characters'
  },
  locationLabel: {
    id: 'axsmap.components.Mapathon.locationLabel',
    defaultMessage: 'Location'
  },
  datesLabel: {
    id: 'axsmap.components.Mapathon.datesLabel',
    defaultMessage: 'Start date and end date'
  },
  participantsGoalLabel: {
    id: 'axsmap.components.Mapathon.participantsGoalLabel',
    defaultMessage: 'How many participants to join?'
  },
  participantsGoalError1: {
    id: 'axsmap.components.Mapathon.participantsGoalError1',
    defaultMessage: 'Is required'
  },
  participantsGoalError2: {
    id: 'axsmap.components.Mapathon.participantsGoalError2',
    defaultMessage: 'Should be greater than 0'
  },
  participantsGoalError3: {
    id: 'axsmap.components.Mapathon.participantsGoalError3',
    defaultMessage: 'Should be less than 1001'
  },
  reviewsGoalLabel: {
    id: 'axsmap.components.Mapathon.reviewsGoalLabel',
    defaultMessage: 'How many reviews to achieve?'
  },
  reviewsGoalError1: {
    id: 'axsmap.components.Mapathon.reviewsGoalError1',
    defaultMessage: 'Is required'
  },
  reviewsGoalError2: {
    id: 'axsmap.components.Mapathon.reviewsGoalError2',
    defaultMessage: 'Should be greater than 0'
  },
  reviewsGoalError3: {
    id: 'axsmap.components.Mapathon.reviewsGoalError3',
    defaultMessage: 'Should be less than 10001'
  },
  isOpenLabel: {
    id: 'axsmap.components.Mapathon.isOpenLabel',
    defaultMessage: 'Is an open event'
  },
  hostAsLabel: {
    id: 'axsmap.components.Mapathon.hostAsLabel',
    defaultMessage: 'Host as'
  },
  chooseTeamManagerButton: {
    id: 'axsmap.components.Mapathon.chooseTeamManagerButton',
    defaultMessage: 'Choose'
  },
  chooseTeamManagerPlaceholder: {
    id: 'axsmap.components.Mapathon.chooseTeamManagerPlaceholder',
    defaultMessage: 'Search your teams'
  },
  noTeamsResultsText: {
    id: 'axsmap.components.Mapathon.noTeamsResultsText',
    defaultMessage: 'No teams found'
  },
  managersLabel: {
    id: 'axsmap.components.Mapathon.managersLabel',
    defaultMessage: 'Managers'
  },
  participantsLabel: {
    id: 'axsmap.components.Mapathon.participantsLabel',
    defaultMessage: 'Participants'
  },
  teamsLabel: {
    id: 'axsmap.components.Mapathon.teamsLabel',
    defaultMessage: 'Teams'
  },
  usersInvitationsLabel: {
    id: 'axsmap.components.Mapathon.usersInvitationsLabel',
    defaultMessage: 'Users invitations'
  },
  inviteButton: {
    id: 'axsmap.components.Mapathon.inviteButton',
    defaultMessage: 'Invite'
  },
  inputUsersPlaceholder: {
    id: 'axsmap.components.Mapathon.inputUsersPlaceholder',
    defaultMessage: 'Search users'
  },
  teamsInvitationsLabel: {
    id: 'axsmap.components.Mapathon.teamsInvitationsLabel',
    defaultMessage: 'Teams invitations'
  },
  inputTeamsPlaceholder: {
    id: 'axsmap.components.Mapathon.inputTeamsPlaceholder',
    defaultMessage: 'Search teams'
  },
  closeButton: {
    id: 'axsmap.components.Mapathon.closeButton',
    defaultMessage: 'Close'
  },
  saveButton: {
    id: 'axsmap.components.Mapathon.saveButton',
    defaultMessage: 'Save'
  }
})
