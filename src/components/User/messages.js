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
  notFoundPageTitle: {
    id: 'axsmap.components.User.notFoundPageTitle',
    defaultMessage: 'User not found | AXS Map'
  },
  detailsHeader: {
    id: 'axsmap.components.User.detailsHeader',
    defaultMessage: "User's details"
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
  }
})
