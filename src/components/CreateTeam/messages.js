import { defineMessages } from 'react-intl'

export default defineMessages({
  pageTitle: {
    id: 'axsmap.components.CreateTeam.pageTitle',
    defaultMessage: 'Create Your Team | AXS Map'
  },
  headerTitle: {
    id: 'axsmap.components.CreateTeam.headerTitle',
    defaultMessage: 'Create your team'
  },
  timeoutError: {
    id: 'axsmap.components.CreateTeam.timeoutError',
    defaultMessage: 'Slow connection. Try again later.'
  },
  serverError: {
    id: 'axsmap.components.CreateTeam.serverError',
    defaultMessage: 'Oh Snap! We have internal problems, come back later.'
  },
  blockedError: {
    id: 'axsmap.components.CreateTeam.blockedError',
    defaultMessage: "You can't do this because you are blocked"
  },
  fileSizeError: {
    id: 'axsmap.components.CreateTeam.fileSizeError',
    defaultMessage: "Don't upload a photo bigger than 8MB"
  },
  nameLabel: {
    id: 'axsmap.components.CreateTeam.nameLabel',
    defaultMessage: 'Name'
  },
  nameError1: {
    id: 'axsmap.components.CreateTeam.nameError1',
    defaultMessage: 'Is required'
  },
  nameError2: {
    id: 'axsmap.components.CreateTeam.nameError2',
    defaultMessage: 'Should be less than 36 characters'
  },
  descriptionLabel: {
    id: 'axsmap.components.CreateTeam.descriptionLabel',
    defaultMessage: 'Description'
  },
  descriptionPlaceholder: {
    id: 'axsmap.components.CreateTeam.descriptionPlaceholder',
    defaultMessage: "Write about your team's values and goals."
  },
  descriptionError: {
    id: 'axsmap.components.CreateTeam.descriptionError',
    defaultMessage: 'Should be less than 301 characters'
  },
  addAvatarButton: {
    id: 'axsmap.components.CreateTeam.addAvatarButton',
    defaultMessage: 'Add avatar'
  },
  createTeamButton: {
    id: 'axsmap.components.CreateTeam.createTeamButton',
    defaultMessage: 'Create team'
  }
})
