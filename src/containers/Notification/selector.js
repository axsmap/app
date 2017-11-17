import { createSelector } from 'reselect'

const selectNotification = state => state.notification

export default function makeSelectNotification(attribute) {
  return createSelector(
    selectNotification,
    notificationState => notificationState[attribute]
  )
}
