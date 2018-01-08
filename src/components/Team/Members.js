import React from 'react'
import { arrayOf, shape, string } from 'prop-types'
import styled from 'styled-components'

import { colors, media } from '../../styles'

import Title from './Title'
import UserRow from './UserRow'

const Wrapper = styled.article`
  display: flex;

  flex-direction: column;

  margin: 0;
  width: 100%;
  padding: 2rem 0 0;

  ${media.tablet`
    width: 49%;
  `};
`

const List = styled.ul`
  display: flex;
  list-style: outside none none;

  flex-direction: column;

  margin: 0.5rem 0 0;
  width: 100%;
  padding: 0;
`

const NoMembers = styled.li`
  justify-content: center;

  display: flex;

  border-radius: 10px;
  padding: 0.75rem;

  background-color: ${colors.lightGrey};
`

const NoMembersCaption = styled.p`
  margin: 0;

  font-size: 1.125rem;
  text-transform: uppercase;
`

const Members = ({ members }) => (
  <Wrapper>
    <Title>Team Roster</Title>
    <List>
      {members.map(member => (
        <UserRow
          key={member.id}
          to={`/users/${member.id}`}
        >{`${member.firstName} ${member.lastName}`}</UserRow>
      ))}
      {!members.length && (
        <NoMembers>
          <NoMembersCaption>No members</NoMembersCaption>
        </NoMembers>
      )}
    </List>
  </Wrapper>
)

Members.propTypes = {
  members: arrayOf(
    shape({
      id: string.isRequired,
      firstName: string.isRequired,
      lastName: string.isRequired
    })
  ).isRequired
}

export default Members
