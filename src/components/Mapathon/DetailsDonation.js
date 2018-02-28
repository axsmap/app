import { array, number, string } from 'prop-types'
import React from 'react'
import { intlShape } from 'react-intl'
import styled from 'styled-components'

import Icon from '../Icon'
import Spinner from '../Spinner'
import { colors, media } from '../../styles'

import messages from './messages'

const Wrapper = styled.div`
  display: flex;

  align-items: center;
  flex-direction: column;
  justify-content: center;

  width: 100%;
`

const DonationIcon = styled(Icon)`
  margin-bottom: 1rem;
  margin-top: 2rem;

  ${media.desktop`
  margin-top: 3rem;
`};

  ${media.widescreen`
  margin-top: 4rem;
`};
`

const Title = styled.label`
  display: block;

  margin-bottom: 1rem;
  margin-top: 0;
  width: 100%;

  color: ${colors.darkestGrey};
  font-size: 1rem;
  font-weight: bold;
  text-align: center;

  ${media.desktop`
    font-size: 1.1rem;
  `};

  ${media.widescreen`
    font-size: 1.2rem;
  `};
`

const Progress = styled.div`
  height: 0.5rem;
  margin-bottom: 1rem;
  width: 90%;

  background-color: ${colors.lightGrey};

  ${media.tablet`
    width: 75%;
  `};

  ${media.desktop`
    width: 60%;
  `};

  ${media.widescreen`
    width: 50%;
  `};
`

const ProgressBar = styled.div`
  height: inherit;
  width: ${props => props.width};
  background-color: ${colors.success};
`

const InfoWrapper = styled.div`
  display: flex;

  aling-items: center;
  justify-content: space-around;

  margin-bottom: 1rem;
  width: 90%;

  ${media.tablet`
    width: 75%;
  `};

  ${media.desktop`
    width: 60%;
  `};

  ${media.widescreen`
    width: 50%;
  `};
`

const Block = styled.div`
  display: flex;

  align-items: center;
  flex-direction: column;
  justify-content: center;
`

const Text = styled.p`
  display: block;

  margin: 0;
  width: 100%;

  color: ${colors.darkGrey};
  font-size: 1rem;
  font-weight: bold;
  text-align: center;

  ${media.desktop`
    font-size: 1.1rem;
  `};

  ${media.widescreen`
    font-size: 1.2rem;
  `};
`

const Form = styled.iframe`
  display: inline-block;
  overflow: hidden;
  visibility: visible;

  border: 0px none transparent;
  height: 0;
  width: 90%;

  background-color: transparent;

  ${media.tablet`
    width: 75%;
  `};

  ${media.desktop`
    width: 60%;
  `};

  ${media.widescreen`
    width: 50%;
  `};
`

export default class DetailsDonation extends React.Component {
  static propTypes = {
    donationId: string,
    donationAmounts: array,
    donationAmountRaised: number,
    donationDonorsCount: number,
    donationGoal: number
  }

  static contextTypes = {
    intl: intlShape
  }

  state = {
    loadingDonationForm: true
  }

  componentDidMount() {
    if (this.donationForm) {
      this.donationForm.addEventListener('load', () => {
        this.donationForm.style.height = '825px'
        this.setState({ loadingDonationForm: false })
      })
    }
  }

  render() {
    const formatMessage = this.context.intl.formatMessage

    const donationAmounts = this.props.donationAmounts
      .map(a => a.value)
      .join(',')
    const donationDefaultAmount = this.props.donationAmounts[0].value

    return (
      <Wrapper>
        <DonationIcon
          glyph="donate"
          size={2.5}
          tabletSize={3}
          desktopSize={3.5}
          widescreenSize={4}
          color={colors.secondary}
        />

        <Title>{formatMessage(messages.donationLabel)}</Title>

        <Progress>
          <ProgressBar
            width={`${this.props.donationAmountRaised /
              this.props.donationGoal >
            1
              ? 100
              : this.props.donationAmountRaised /
                this.props.donationGoal *
                100}%`}
          />
        </Progress>

        <InfoWrapper>
          <Block>
            <Text>{formatMessage(messages.donationAmountRaisedLabel)}</Text>
            <Text>${this.props.donationAmountRaised}</Text>
          </Block>

          <Block>
            <Text>{formatMessage(messages.donationDonorsLabel)}</Text>
            <Text>{this.props.donationDonorsCount}</Text>
          </Block>

          <Block>
            <Text>{formatMessage(messages.donationGoalLabel)}</Text>
            <Text>${this.props.donationGoal}</Text>
          </Block>
        </InfoWrapper>

        <Form
          className="donately-donation-iframe"
          src={`https://cdn.donately.com/dntly-core/current/iframe.html?donately_id=act_e97bff926c9f&stripe_publishable_key=pk_live_Ys91ZlG44Jz9w11LyANvcfKF&donately_amount=${donationDefaultAmount}&donately_presets=${donationAmounts}&donately_duration=only_onetime&donately_campaign_id=${this
            .props
            .donationId}&donately_currency=true&donately_payment_options=cc,ach&donately_donor_pays_fees=%7B%22cc%22:%7B%22processor_percent%22:%220.029%22,%22processor_fixed%22:%220.30%22,%22dntly_percent%22:%220.04%22%7D%7D&donately_custom_css=%7B%20%22.donately-donation-form%20.donately-btn%22:%7B%22background-color%22:%22%2300A1E4%22%7D,%20%22.donately-donation-form%20.donately-btn:hover%22:%7B%22background-color%22:%22%2300A1E4%22%7D%20%7D`}
          title="Donately form"
          seamless="seamless"
          name="donately"
          frameBorder="0"
          scrolling="no"
          allowpaymentrequest
          innerRef={c => {
            this.donationForm = c
          }}
        />

        {this.props.donationId && this.state.loadingDonationForm ? (
          <Spinner color={colors.secondary} />
        ) : null}
      </Wrapper>
    )
  }
}
