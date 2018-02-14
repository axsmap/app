import { array, bool, number, object, string } from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import Ctn from '../Container'
import { media } from '../../styles'

import DetailsHeader from './DetailsHeader'
import DetailsInfo from './DetailsInfo'
import DetailsMap from './DetailsMap'
import DetailsParticipants from './DetailsParticipants'
import DetailsReviews from './DetailsReviews'
import DetailsTeams from './DetailsTeams'

const Container = styled(Ctn)`
  justify-content: flex-start;
  padding: ${props => (props.canEdit ? '0 0 7rem 0' : '2rem 0')};

  ${media.tablet`
    padding: ${props => (props.canEdit ? '2rem 0 7rem 0' : '2rem 0')};
  `};

  ${media.desktop`
    padding: 2rem 0;
  `};
`

const Details = props => (
  <Container>
    <DetailsHeader
      poster={props.poster}
      name={props.name}
      description={props.description}
    />

    <DetailsInfo
      address={props.address}
      startDate={props.startDate}
      endDate={props.endDate}
    />

    <DetailsMap
      location={{
        lat: props.location.coordinates[1],
        lng: props.location.coordinates[0]
      }}
    />

    <DetailsReviews
      reviewsAmount={props.reviewsAmount}
      reviewsGoal={props.reviewsGoal}
      ranking={props.ranking}
    />

    <DetailsParticipants
      participants={props.participants}
      participantsGoal={props.participantsGoal}
      managers={props.managers}
      sendingRequest={props.sendingRequest}
    />

    {props.teamManager || (props.teams && props.teams.length > 0) ? (
      <DetailsTeams
        teamManager={props.teamManager}
        teams={props.teams}
        sendingRequest={props.sendingRequest}
      />
    ) : null}
  </Container>
)

Details.propTypes = {
  poster: string,
  name: string,
  description: string,
  address: string,
  startDate: string,
  endDate: string,
  location: object,
  reviewsAmount: number,
  reviewsGoal: number,
  ranking: number,
  participants: array,
  participantsGoal: number,
  managers: array,
  teamManager: object,
  teams: array,
  sendingRequest: bool
}

export default Details
