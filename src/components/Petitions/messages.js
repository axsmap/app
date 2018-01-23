import { defineMessages } from 'react-intl'

export default defineMessages({
  headerTitle: {
    id: 'axsmap.components.Petitions.headerTitle',
    defaultMessage: 'Petitions'
  },
  timeoutError: {
    id: 'axsmap.components.Petitions.timeoutError',
    defaultMessage: 'Slow connection. Try again later.'
  },
  serverError: {
    id: 'axsmap.components.Petitions.serverError',
    defaultMessage: 'Oh Snap! We have internal problems, come back later.'
  },
  notFoundError: {
    id: 'axsmap.components.Petitions.notFoundError',
    defaultMessage: "This Petition doesn't exists"
  },
  alreadyAcceptedError: {
    id: 'axsmap.components.Petitions.alreadyAcceptedError',
    defaultMessage: 'This Petition is already accepted'
  },
  alreadyCanceledError: {
    id: 'axsmap.components.Petitions.alreadyCanceledError',
    defaultMessage: 'This Petition is already canceled'
  },
  alreadyRejectedError: {
    id: 'axsmap.components.Petitions.alreadyRejectedError',
    defaultMessage: 'This Petition is already rejected'
  },
  shouldOnlyBeCanceledError: {
    id: 'axsmap.components.Petitions.shouldOnlyBeCanceledError',
    defaultMessage: 'This Petition should only be canceled'
  },
  eventAlreadyRemovedError: {
    id: 'axsmap.components.Petitions.eventAlreadyRemovedError',
    defaultMessage: 'The Event no longer exists. This petition will be removed'
  },
  userAlreadyParticipantError: {
    id: 'axsmap.components.Petitions.userAlreadyParticipantError',
    defaultMessage:
      'The User is already a participant of the event. This petition will be removed'
  },
  forbiddenActionError: {
    id: 'axsmap.components.Petitions.forbiddenActionError',
    defaultMessage: "You're not allowed to interact with this petition"
  },
  userAlreadyRemovedError: {
    id: 'axsmap.components.Petitions.userAlreadyRemovedError',
    defaultMessage:
      'The User account no longer exists. This petition will be removed'
  },
  teamAlreadyRemovedError: {
    id: 'axsmap.components.Petitions.teamAlreadyRemovedError',
    defaultMessage: 'The Team no longer exists. This petition will be removed'
  },
  userAlreadyMemberError: {
    id: 'axsmap.components.Petitions.userAlreadyMemberError',
    defaultMessage:
      'The User is already a member of the team. This petition will be removed'
  },
  noResultsText: {
    id: 'axsmap.components.Petitions.noResultsText',
    defaultMessage: 'No petitions found'
  },
  filterReceivedLabel: {
    id: 'axsmap.components.Petitions.filterReceivedLabel',
    defaultMessage: 'Received'
  },
  filterSentLabel: {
    id: 'axsmap.components.Petitions.filterSentLabel',
    defaultMessage: 'Sent'
  },
  sentPetitionCanceled: {
    id: 'axsmap.components.Petitions.sentPetitionCanceled',
    defaultMessage: 'You have canceled this petition'
  },
  'sent-accepted-invite-user-event': {
    id: 'axsmap.components.Petitions.sent-accepted-invite-user-event',
    defaultMessage: '{user} has accepted to participate in {event}'
  },
  'received-accepted-invite-user-event': {
    id: 'axsmap.components.Petitions.received-accepted-invite-user-event',
    defaultMessage: 'You have accepted to participate in {event}'
  },
  'sent-pending-invite-user-event': {
    id: 'axsmap.components.Petitions.sent-pending-invite-user-event',
    defaultMessage: '{user} has been invited to participate in {event}'
  },
  'received-pending-invite-user-event': {
    id: 'axsmap.components.Petitions.received-pending-invite-user-event',
    defaultMessage: 'You have been invited to participate in {event}'
  },
  'sent-rejected-invite-user-event': {
    id: 'axsmap.components.Petitions.sent-rejected-invite-user-event',
    defaultMessage: '{user} has declined to participate in {event}'
  },
  'received-rejected-invite-user-event': {
    id: 'axsmap.components.Petitions.received-rejected-invite-user-event',
    defaultMessage: 'You have declined to participate in {event}'
  },
  'sent-accepted-request-user-event': {
    id: 'axsmap.components.Petitions.sent-accepted-request-user-event',
    defaultMessage: 'Your petition to participate in {event} has been accepted'
  },
  'received-accepted-request-user-event': {
    id: 'axsmap.components.Petitions.received-accepted-request-user-event',
    defaultMessage: '{sender} has been accepted to participate in {event}'
  },
  'sent-pending-request-user-event': {
    id: 'axsmap.components.Petitions.sent-pending-request-user-event',
    defaultMessage: 'You have asked to participate in {event}'
  },
  'received-pending-request-user-event': {
    id: 'axsmap.components.Petitions.received-pending-request-user-event',
    defaultMessage: '{sender} has asked to participate in {event}'
  },
  'sent-rejected-request-user-event': {
    id: 'axsmap.components.Petitions.sent-rejected-request-user-event',
    defaultMessage: 'Your petition to participate in {event} has been rejected'
  },
  'received-rejected-request-user-event': {
    id: 'axsmap.components.Petitions.received-rejected-request-user-event',
    defaultMessage: '{sender} has been rejected to participate in {event}'
  },
  'sent-accepted-invite-user-team': {
    id: 'axsmap.components.Petitions.sent-accepted-invite-user-team',
    defaultMessage: '{user} is now a member of {team}'
  },
  'received-accepted-invite-user-team': {
    id: 'axsmap.components.Petitions.received-accepted-invite-user-team',
    defaultMessage: "You're now a member of {team}"
  },
  'sent-pending-invite-user-team': {
    id: 'axsmap.components.Petitions.sent-pending-invite-user-team',
    defaultMessage: '{user} has been invited to join {team}'
  },
  'received-pending-invite-user-team': {
    id: 'axsmap.components.Petitions.received-pending-invite-user-team',
    defaultMessage: 'You have been invited to join {team}'
  },
  'sent-rejected-invite-user-team': {
    id: 'axsmap.components.Petitions.sent-rejected-invite-user-team',
    defaultMessage: '{user} has declined to join {team}'
  },
  'received-rejected-invite-user-team': {
    id: 'axsmap.components.Petitions.received-rejected-invite-user-team',
    defaultMessage: 'You have declined to join {team}'
  },
  'sent-accepted-request-user-team': {
    id: 'axsmap.components.Petitions.sent-accepted-request-user-team',
    defaultMessage: "You're now a member of {team}"
  },
  'received-accepted-request-user-team': {
    id: 'axsmap.components.Petitions.received-accepted-request-user-team',
    defaultMessage: '{sender} is now a member of {team}'
  },
  'sent-pending-request-user-team': {
    id: 'axsmap.components.Petitions.sent-pending-request-user-team',
    defaultMessage: 'You have asked to join {team}'
  },
  'received-pending-request-user-team': {
    id: 'axsmap.components.Petitions.received-pending-request-user-team',
    defaultMessage: '{sender} has asked to join {team}'
  },
  'sent-rejected-request-user-team': {
    id: 'axsmap.components.Petitions.sent-rejected-request-user-team',
    defaultMessage: 'Your petition to join {team} has been rejected'
  },
  'received-rejected-request-user-team': {
    id: 'axsmap.components.Petitions.received-rejected-request-user-team',
    defaultMessage: '{sender} was rejected from joining {team}'
  },
  loadMoreButton: {
    id: 'axsmap.components.Petitions.loadMoreButton',
    defaultMessage: 'Load more'
  },
  cancelPetition: {
    id: 'axsmap.components.Petitions.cancelPetition',
    defaultMessage: 'Cancel'
  },
  acceptPetition: {
    id: 'axsmap.components.Petitions.acceptPetition',
    defaultMessage: 'Accept'
  },
  rejectPetition: {
    id: 'axsmap.components.Petitions.rejectPetition',
    defaultMessage: 'Reject'
  }
})
