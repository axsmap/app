import React from 'react'
import { intlShape } from 'react-intl'
import { array } from 'prop-types'
import styled from 'styled-components'

import { colors } from '../../styles'
import RouterLink from '../RouterLink'

import messages from './messages'
import Title from './Title'

const Wrapper = styled.article`
  display: flex;

  align-items: center;
  flex-direction: column;
  justify-content: center;

  margin-top: 2rem;
  width: 100%;
`

const List = styled.ul`
  display: flex;
  list-style: outside none none;

  align-items: center;
  flex-direction: column;
  justify-content: center;

  margin: 0;
  width: 100%;
  padding: 0;
`

const Event = styled.li`
  display: flex;

  align-items: center;
  justify-content: center;

  margin: 0;
  width: 100%;
`

const EventLink = styled(RouterLink)`
  display: flex;
  opacity: 1;

  align-items: center;
  flex-direction: column;
  justify-content: center;

  height: inherit;

  cursor: pointer;

  color: ${colors.darkGrey};
  font-size: 1rem;
  font-weight: bold;
  text-align: center;

  &:hover {
    opacity: 0.9;
  }

  &:active,
  &:focus {
    outline: 2px solid ${colors.primary};
  }
`

const Events = ({ events }, context) => (
  <Wrapper>
    <Title style={{ marginBottom: '0.5rem' }}>
      {context.intl.formatMessage(messages.eventsTitle)}
    </Title>
    <List>
      {events.map(event => (
        <Event key={event.id}>
          <EventLink to={`/events/${event.id}`}>{event.name}</EventLink>
        </Event>
      ))}
    </List>
  </Wrapper>
)

Events.contextTypes = {
  intl: intlShape
}

Events.propTypes = {
  events: array.isRequired
}

export default Events
