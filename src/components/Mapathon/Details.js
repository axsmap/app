import { array, bool, func, number, object, string } from 'prop-types'
import React from 'react'
import { intlShape } from 'react-intl'
import styled from 'styled-components'

import Button from '../Button'
import Ctn from '../Container'
import Icon from '../Icon'
import Spinner from '../Spinner'
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

const Text = styled.label`
  display: block;

  margin-bottom: 1rem;
  margin-top: 2rem;
  width: 100%;

  color: ${colors.darkestGrey};
  font-size: 1rem;
  font-weight: bold;
  text-align: center;

  ${media.desktop`
    margin-top: 3rem;
    font-size: 1.1rem;
  `};

  ${media.widescreen`
    margin-top: 4rem;
    font-size: 1.2rem;
  `};
`

const DonationForm = styled.iframe`
  height: auto;
  margin-bottom: -2rem;
  width: auto;
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
    sendingRequest: bool,
    canEditMapathon: bool,
    showEditMapathon: func
  }

  static contextTypes = {
    intl: intlShape
  }

  state = {
    loadingDonationForm: true
  }

  componentWillMount() {
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0

    const script = document.createElement('script')
    script.src = 'https://donorbox.org/widget.js'
    script.async = true
    document.body.appendChild(script)
  }

  componentDidMount() {
    if (this.donationForm) {
      this.donationForm.addEventListener('load', () =>
        this.setState({ loadingDonationForm: false })
      )
    }
  }

  render() {
    const formatMessage = this.context.intl.formatMessage

    return (
      <Container canEdit={this.props.canEditMapathon}>
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

        {this.props.donationId
          ? [
              <Text key="donationText">
                {formatMessage(messages.donationLabel)}
              </Text>,
              <DonationForm
                key="donationForm"
                innerRef={c => {
                  this.donationForm = c
                }}
                src={`https://donorbox.org/embed/${this.props.donationId}`}
                title="DonorBox"
                height="auto"
                width="auto"
                seamless="seamless"
                name="donorbox"
                frameBorder="0"
                scrolling="no"
                allowpaymentrequest
              />
            ]
          : null}

        {this.props.donationId && this.state.loadingDonationForm ? (
          <Spinner />
        ) : null}

        {this.props.canEditMapathon ? (
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
