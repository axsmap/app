import { array, number, string } from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import { media } from '../../styles'

import Container from './Container'
import Events from './Events'
import Header from './Header'
import ListsWrapper from './ListsWrapper'
import Managers from './Managers'
import Members from './Members'
import SocialMedia from './SocialMedia'
import Stats from './Stats'

const Column = styled.div`
  flex-direction: column;

  display: flex;

  width: 100%;

  ${media.tablet`
    width: 49%;
  `};
`

const Detail = ({
  id,
  avatar,
  description,
  events,
  managers,
  members,
  name,
  ranking,
  reviewsAmount
}) => (
  <Container>
    <Header avatar={avatar} description={description} name={name} />
    <ListsWrapper>
      <Column>
        <Events events={events} />
        <SocialMedia teamId={id} teamName={name} />
      </Column>
      <Stats ranking={ranking} reviewsAmount={reviewsAmount} />
    </ListsWrapper>
    <ListsWrapper>
      <Managers managers={managers} />
      <Members members={members} />
    </ListsWrapper>
  </Container>
)

Detail.propTypes = {
  id: string.isRequired,
  avatar: string.isRequired,
  description: string.isRequired,
  events: array.isRequired,
  managers: array.isRequired,
  members: array.isRequired,
  name: string.isRequired,
  ranking: number.isRequired,
  reviewsAmount: number.isRequired
}

export default Detail
