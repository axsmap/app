import { array, bool, number, string } from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import Cnt from '../Container'
import { media } from '../../styles'

import DetailsInfo from './DetailsInfo'
import DetailsHeader from './DetailsHeader'
import DetailsMapathons from './DetailsMapathons'
import DetailsReviews from './DetailsReviews'
import DetailsTeams from './DetailsTeams'

const Container = styled(Cnt)`
  justify-content: flex-start;
  padding: ${props => (props.canEdit ? '2rem 0 7rem 0' : '2rem 0')};

  ${media.desktop`
    padding: 2rem 0;
  `};
`

export default class Details extends React.Component {
  static propTypes = {
    avatar: string,
    firstName: string,
    lastName: string,
    description: string,
    showEmail: bool,
    showPhone: bool,
    email: string,
    phone: string,
    ranking: number,
    reviewsAmount: number,
    teams: array,
    events: array,
    sendingRequest: bool.isRequired
  }

  componentWillMount() {
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
  }

  render() {
    return (
      <Container canEdit={false}>
        <DetailsHeader
          avatar={this.props.avatar}
          description={this.props.description}
          name={`${this.props.firstName} ${this.props.lastName}`}
        />

        <DetailsInfo
          showEmail={this.props.showEmail}
          email={this.props.email}
          showPhone={this.props.showPhone}
          phone={this.props.phone}
        />

        <DetailsReviews
          ranking={this.props.ranking}
          amount={this.props.reviewsAmount}
        />

        {this.props.teams && this.props.teams.length > 0 ? (
          <DetailsTeams
            teams={this.props.teams}
            sendingRequest={this.props.sendingRequest}
          />
        ) : null}

        {this.props.events && this.props.events.length > 0 ? (
          <DetailsMapathons
            mapathons={this.props.events}
            sendingRequest={this.props.sendingRequest}
          />
        ) : null}
      </Container>
    )
  }
}
