import React from 'react'
import { arrayOf, shape, string } from 'prop-types'
import styled from 'styled-components'

import { media } from '../../styles'

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

const Managers = ({ managers }) => (
  <Wrapper>
    <Title>Managers</Title>
    <List>
      {managers.map(manager => (
        <UserRow
          key={manager.id}
          to={`/users/${manager.id}`}
        >{`${manager.firstName} ${manager.lastName}`}</UserRow>
      ))}
    </List>
  </Wrapper>
)

Managers.propTypes = {
  managers: arrayOf(
    shape({
      id: string.isRequired,
      firstName: string.isRequired,
      lastName: string.isRequired
    })
  )
}

export default Managers
