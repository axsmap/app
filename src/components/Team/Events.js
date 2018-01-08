import React from 'react'
import { array } from 'prop-types'
import styled from 'styled-components'

import { colors } from '../../styles'
import RouterLink from '../RouterLink'

import Title from './Title'

const Wrapper = styled.article`
  display: flex;

  flex-direction: column;

  margin: 1rem 0;
  width: 100%;
  padding: 2rem 0 0;
`

const List = styled.ul`
  display: flex;
  list-style: outside none none;

  flex-direction: column;

  margin: 0;
  width: 100%;
  padding: 0;
`

const Event = styled.li`
  display: flex;

  margin: 0;
  width: 100%;
`

const EventName = styled.h2`margin: 0;`

const EventLink = styled(RouterLink)`
  display: flex;
  opacity: 1;

  align-items: center;
  flex-direction: column;
  justify-content: center;

  height: inherit;

  cursor: pointer;

  color: ${colors.darkestGrey};

  &:hover {
    opacity: 0.9;
  }

  &:active,
  &:focus {
    outline: 2px solid ${colors.primary};
  }
`

const Events = ({ events }) => (
  <Wrapper>
    <Title>{`we're participating in`}</Title>
    <List>
      {events.map(event => (
        <Event key={event.id}>
          <EventName>
            <EventLink to={`/events/${event.id}`}>{event.name}</EventLink>
          </EventName>
        </Event>
      ))}
    </List>
  </Wrapper>
)

Events.propTypes = {
  events: array.isRequired
}

export default Events
