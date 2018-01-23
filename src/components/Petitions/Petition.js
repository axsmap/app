import { bool, func, shape, string } from 'prop-types'
import React from 'react'
import { FormattedMessage, intlShape } from 'react-intl'
import styled from 'styled-components'

import { colors, media } from '../../styles'
import RouterLink from '../RouterLink'
import Button from '../Button'

import messages from './messages'

const Wrapper = styled.li`
  display: flex;

  margin: 0;
  border-top: 1px solid ${colors.lightGrey};
  padding: 0.625rem;

  &:last-of-type {
    padding-bottom: 0;
  }

  ${media.tablet`
    height: 6rem;
    padding: 0.625rem 0;

    &:last-of-type {
      padding-bottom: 0;
    }
  `};
`

const AvatarLink = styled(RouterLink)`
  margin-right: 0.625rem;
  width: 4.6875rem;
  height: 4.6875rem;
`

const Avatar = styled.img`
  width: inherit;
  height: inherit;
`

const Content = styled.div`
  flex-direction: column;
  justify-content: space-between;

  display: flex;

  width: 100%;

  ${media.tablet`
    flex-direction: row;
  `};
`

const Info = styled.div`
  display: flex;

  flex-direction: column;
`

const Actions = styled.div`
  align-items: center;
  flex-shrink: 0;
  justify-content: flex-start;

  display: flex;

  min-width: 11rem;

  ${media.tablet`
    justify-content: flex-end;
  `};
`

const Desc = styled.p`margin: 0;`

const ActionButton = styled(Button)`
  height: 2.5rem;
  padding: 0 0.5rem;

  font-size: 0.9rem;
`

const LinkToProfile = styled(RouterLink)`
  color: ${colors.darkestGrey};
  font-weight: bold;
  text-decoration: none;
`

const Petition = (props, context) => {
  const formatMessage = context.intl.formatMessage

  let actionButtons
  let avatar = ''
  let messageTemplate = ''
  let avatarTo = ''
  const ownActions = props.filter === 'sent'
  const templateValues = {
    sender: (
      <LinkToProfile to={`/user/${props.sender.id}`}>
        {props.sender.firstName}
      </LinkToProfile>
    )
  }

  if (props.user) {
    templateValues.user = (
      <LinkToProfile to={`/user/${props.user.id}`}>
        {props.user.firstName}
      </LinkToProfile>
    )
  }

  if (props.state === 'canceled') {
    messageTemplate = messages[`${props.filter}PetitionCanceled`]
  } else {
    messageTemplate = messages[`${props.filter}-${props.state}-${props.type}`]
  }

  switch (props.type) {
    case 'invite-user-event':
    case 'request-user-event':
      avatar = props.event.poster
      avatarTo = `/events/${props.event.id}`
      templateValues.event = (
        <LinkToProfile to={`/events/${props.event.id}`}>
          {props.event.name}
        </LinkToProfile>
      )
      break

    case 'invite-user-team':
    case 'request-user-team':
      avatar = props.team.avatar
      avatarTo = `/teams/${props.team.id}`
      templateValues.team = (
        <LinkToProfile to={`/teams/${props.team.id}`}>
          {props.team.name}
        </LinkToProfile>
      )
      break

    default:
      break
  }

  if (props.state === 'pending')
    if (ownActions) {
      actionButtons = (
        <ActionButton
          backgroundColor={colors.lightGrey}
          disabled={props.sendingRequest}
          onClick={props.setPetitionCanceled(props.id)}
        >
          {formatMessage(messages.cancelPetition)}
        </ActionButton>
      )
    } else {
      actionButtons = [
        <ActionButton
          key="acceptAction"
          marginRight="0.5rem"
          disabled={props.sendingRequest}
          onClick={props.setPetitionAccepted(props.id)}
        >
          {formatMessage(messages.acceptPetition)}
        </ActionButton>,
        <ActionButton
          key="rejectAction"
          backgroundColor={colors.lightGrey}
          disabled={props.sendingRequest}
          onClick={props.setPetitionRejected(props.id)}
        >
          {formatMessage(messages.rejectPetition)}
        </ActionButton>
      ]
    }

  return (
    <Wrapper>
      <AvatarLink to={avatarTo}>
        <Avatar src={avatar} />
      </AvatarLink>
      <Content>
        <Info>
          <Desc>
            <FormattedMessage {...messageTemplate} values={templateValues} />
          </Desc>
          <p>{props.message}</p>
        </Info>
        <Actions>{actionButtons}</Actions>
      </Content>
    </Wrapper>
  )
}

Petition.contextTypes = {
  intl: intlShape
}

Petition.propTypes = {
  id: string.isRequired,
  event: shape({
    id: string.isRequired,
    name: string.isRequired,
    poster: string.isRequired
  }),
  filter: string.isRequired,
  sendingRequest: bool.isRequired,
  message: string,
  sender: shape({
    id: string.isRequired,
    firstName: string.isRequired,
    lastName: string.isRequired
  }).isRequired,
  state: string.isRequired,
  team: shape({
    id: string.isRequired,
    avatar: string.isRequired,
    name: string.isRequired
  }),
  type: string.isRequired,
  setPetitionAccepted: func.isRequired,
  setPetitionCanceled: func.isRequired,
  setPetitionRejected: func.isRequired,
  user: shape({
    id: string.isRequired,
    avatar: string.isRequired,
    firstName: string.isRequired,
    lastName: string.isRequired
  })
}

export default Petition
