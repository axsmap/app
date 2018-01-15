import { array, bool, func, number, string } from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import { media } from '../../styles'

import Container from './Container'
import EditTeamButton from './EditTeamButton'
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

const Detail = props => (
  <Container canEditTeam={props.canEditTeam}>
    <Header
      avatar={props.avatar}
      description={props.description}
      name={props.name}
    />

    <ListsWrapper>
      <Column>
        <Events events={props.events} />
        <SocialMedia teamId={props.id} teamName={props.name} />
      </Column>
      <Stats ranking={props.ranking} reviewsAmount={props.reviewsAmount} />
    </ListsWrapper>

    <ListsWrapper>
      <Managers managers={props.managers} />
      <Members members={props.members} />
    </ListsWrapper>

    {props.canEditTeam ? (
      <EditTeamButton onClickHandler={props.showEditTeam} />
    ) : null}
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
  reviewsAmount: number.isRequired,
  canEditTeam: bool.isRequired,
  showEditTeam: func.isRequired
}

export default Detail
