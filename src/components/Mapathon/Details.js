import { array, bool, func, number, object, string } from 'prop-types'
import React from 'react'
import { useIntl } from 'react-intl'
import styled from 'styled-components'

import Button from '../Button'
import Ctn from '../Container'
import Icon from '../Icon'
import { colors, media } from '../../styles'

import DetailsDonation from './DetailsDonation'
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
  margin-left: auto;
  margin-right: auto;
  max-width: none;

  ${media.desktop`
    padding: 2rem 0;
    max-width: 1127px;
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

export default class Details extends React.Component {
  static propTypes = {
    id: string,
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
    donationId: string,
    donationAmounts: array,
    donationAmountRaised: number,
    donationDonorsCount: number,
    donationGoal: number,
    isAuthenticated: bool,
    userData: object,
    sendingRequest: bool,
    joinMapathon: func,
    showEditMapathon: func
  }

  static contextTypes = {
    intl: useIntl()
  }

  componentWillMount() {
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
  }

  render() {
    const formatMessage = this.context.intl.formatMessage

    let canEditMapathon = false
    if (this.props.isAuthenticated) {
      const managedMapathonsIds = this.props.userData.managedEvents.map(
        e => e.id
      )
      if (managedMapathonsIds.includes(this.props.id)) {
        canEditMapathon = true
      }
    }

    let canJoinMapathon = false
    if (this.props.isAuthenticated) {
      const managedMapathonsIds = this.props.userData.managedEvents.map(
        e => e.id
      )
      const mapathonsIds = this.props.userData.events.map(e => e.id)
      const userMapathonsIds = [...managedMapathonsIds, ...mapathonsIds]
      if (!userMapathonsIds.includes(this.props.id)) {
        canJoinMapathon = true
      }
    }

    return (
      <Container canEdit={canEditMapathon || canJoinMapathon}>
        <DetailsHeader
          poster={this.props.poster}
          name={this.props.name}
          description={this.props.description}
        />

        <DetailsInfo
          address={this.props.address}
          startDate={this.props.startDate}
          endDate={this.props.endDate}
        />

        <DetailsMap
          location={{
            lat: this.props.location.coordinates[1],
            lng: this.props.location.coordinates[0]
          }}
        />

        <DetailsReviews
          reviewsAmount={this.props.reviewsAmount}
          reviewsGoal={this.props.reviewsGoal}
          ranking={this.props.ranking}
        />

        <DetailsParticipants
          participants={this.props.participants}
          participantsGoal={this.props.participantsGoal}
          managers={this.props.managers}
          sendingRequest={this.props.sendingRequest}
        />

        {this.props.teamManager ||
        (this.props.teams && this.props.teams.length > 0) ? (
          <DetailsTeams
            teamManager={this.props.teamManager}
            teams={this.props.teams}
            sendingRequest={this.props.sendingRequest}
          />
        ) : null}

        {this.props.donationId ? (
          <DetailsDonation
            donationId={this.props.donationId}
            donationAmounts={this.props.donationAmounts}
            donationAmountRaised={this.props.donationAmountRaised}
            donationDonorsCount={this.props.donationDonorsCount}
            donationGoal={this.props.donationGoal}
          />
        ) : null}

        {canJoinMapathon ? (
          <ButtonWrapper
            float
            disabled={false}
            onClickHandler={() =>
              this.props.joinMapathon(this.props.id, this.props.userData.id)
            }
          >
            <ButtonContent>
              <Icon
                glyph="cross"
                size={1}
                rotate="45deg"
                color={colors.darkestGrey}
              />
              <p style={{ margin: '0 0 0 0.5rem' }}>
                {formatMessage(messages.joinMapathonButton)}
              </p>
            </ButtonContent>
          </ButtonWrapper>
        ) : null}

        {canEditMapathon ? (
          <ButtonWrapper
            float
            disabled={false}
            onClickHandler={this.props.showEditMapathon}
          >
            <ButtonContent>
              <Icon glyph="edit" size={1} color={colors.darkestGrey} />
              <p style={{ margin: '0 0 0 0.5rem' }}>
                {formatMessage(messages.editMapathonButton)}
              </p>
            </ButtonContent>
          </ButtonWrapper>
        ) : null}
      </Container>
    )
  }
}
