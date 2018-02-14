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
  notFoundPageTitle: {
    id: 'axsmap.components.Mapathon.notFoundPageTitle',
    defaultMessage: 'Mapathon not found | AXS Map'
  },
  detailsHeader: {
    id: 'axsmap.components.Mapathon.detailsHeader',
    defaultMessage: "Mapathon's details"
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
  }
})
