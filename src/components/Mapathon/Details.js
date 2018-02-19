import { array, bool, func, number, object, string } from 'prop-types'
import React from 'react'
import { intlShape } from 'react-intl'
import styled from 'styled-components'

import Button from '../Button'
import Ctn from '../Container'
import Icon from '../Icon'
import { colors, media } from '../../styles'

import DetailsHeader from './DetailsHeader'
import DetailsInfo from './DetailsInfo'
import DetailsMap from './DetailsMap'
import DetailsParticipants from './DetailsParticipants'
import DetailsReviews from './DetailsReviews'
import DetailsTeams from './DetailsTeams'
import messages from './messages'

const Container = styled(Ctn)`
  justify-content: flex-start;
  padding: ${props => (props.canEdit ? '2rem 0 7rem 0' : '2rem 0')};

  ${media.desktop`
    padding: 2rem 0;
  `};
`

const ButtonWrapper = styled(Button)`
  bottom: 2rem;
  left: 50%;
  position: fixed;

  transform: translateX(-50%);

  margin: 0 auto;

  ${media.desktop`
    position: static;
    transform: translateX(0%);
    margin-top: 2rem;
  `};
`

const ButtonContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Details = (props, context) => (
  <Container canEdit={props.canEditMapathon}>
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

    {props.canEditMapathon ? (
      <ButtonWrapper
        float
        disabled={false}
        onClickHandler={props.showEditMapathon}
      >
        <ButtonContent>
          <Icon glyph="edit" size={1} color={colors.darkestGrey} />
          <p style={{ margin: '0 0 0 0.5rem' }}>
            {context.intl.formatMessage(messages.editMapathonButton)}
          </p>
        </ButtonContent>
      </ButtonWrapper>
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
  sendingRequest: bool,
  canEditMapathon: bool,
  showEditMapathon: func
}

Details.contextTypes = {
  intl: intlShape
}

export default Details
