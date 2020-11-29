import { array, bool, func, number, object, string } from 'prop-types'
import React from 'react'
import { intlShape } from 'react-intl'
import styled from 'styled-components'

import Button from '../Button'
import Cnt from '../Container'
import Icon from '../Icon'
import { colors, media } from '../../styles'

import DetailsHeader from './DetailsHeader'
import DetailsMapathons from './DetailsMapathons'
import DetailsMembers from './DetailsMembers'
import DetailsReviews from './DetailsReviews'
import DetailsSocialMedia from './DetailsSocialMedia'
import messages from './messages'

const Container = styled(Cnt)`
  justify-content: flex-start;
  padding: ${props => (props.canEdit ? '2rem 0 7rem 0' : '2rem 0')};
  margin-left: auto;
  margin-right: auto;

  ${media.desktop`
    padding: 2rem 0;
  `};
`

const SocialMediaRankingWrapper = styled.div`
  display: flex;

  align-items: center;
  flex-direction: column;
  justify-content: center;

  width: 100%;

  ${media.desktop`
    flex-direction: row;
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
    id: string.isRequired,
    avatar: string.isRequired,
    name: string.isRequired,
    description: string.isRequired,
    ranking: number.isRequired,
    reviewsAmount: number.isRequired,
    managers: array.isRequired,
    members: array.isRequired,
    events: array.isRequired,
    sendingRequest: bool.isRequired,
    isAuthenticated: bool.isRequired,
    userData: object.isRequired,
    joinTeam: func.isRequired,
    showEditTeam: func.isRequired
  }

  static contextTypes = {
    intl: intlShape
  }

  componentWillMount() {
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
  }

  render() {
    const formatMessage = this.context.intl.formatMessage

    let canEditTeam = false
    if (this.props.isAuthenticated) {
      const managedTeamsIds = this.props.userData.managedTeams.map(t => t.id)
      if (managedTeamsIds.includes(this.props.id)) canEditTeam = true
    }

    let canJoinTeam = false
    if (this.props.isAuthenticated) {
      const managedTeamsIds = this.props.userData.managedTeams.map(t => t.id)
      const teamsIds = this.props.userData.teams.map(t => t.id)
      const userTeamsIds = [...managedTeamsIds, ...teamsIds]
      if (!userTeamsIds.includes(this.props.id)) {
        canJoinTeam = true
      }
    }

    return (
      <Container canEdit={canEditTeam || canJoinTeam}>
        <DetailsHeader
          avatar={this.props.avatar}
          description={this.props.description}
          name={this.props.name}
        />

        <SocialMediaRankingWrapper>
          <DetailsSocialMedia
            teamId={this.props.id}
            teamName={this.props.name}
          />

          <DetailsReviews
            ranking={this.props.ranking}
            amount={this.props.reviewsAmount}
          />
        </SocialMediaRankingWrapper>

        <DetailsMembers
          managers={this.props.managers}
          members={this.props.members}
          sendingRequest={this.props.sendingRequest}
        />

        {this.props.events && this.props.events.length > 0 ? (
          <DetailsMapathons
            mapathons={this.props.events}
            sendingRequest={this.props.sendingRequest}
          />
        ) : null}

        {canJoinTeam ? (
          <ButtonWrapper
            float
            disabled={false}
            onClickHandler={() =>
              this.props.joinTeam(this.props.id, this.props.userData.id)}
          >
            <ButtonContent>
              <Icon
                glyph="cross"
                size={1}
                rotate="45deg"
                color={colors.darkestGrey}
              />
              <p style={{ margin: '0 0 0 0.5rem' }}>
                {formatMessage(messages.joinTeamButton)}
              </p>
            </ButtonContent>
          </ButtonWrapper>
        ) : null}

        {canEditTeam ? (
          <ButtonWrapper
            float
            disabled={false}
            onClickHandler={this.props.showEditTeam}
          >
            <ButtonContent>
              <Icon glyph="edit" size={1} color={colors.darkestGrey} />
              <p style={{ margin: '0 0 0 0.5rem' }}>
                {formatMessage(messages.editTeamButton)}
              </p>
            </ButtonContent>
          </ButtonWrapper>
        ) : null}
      </Container>
    )
  }
}
