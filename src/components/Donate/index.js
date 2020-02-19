import { object } from 'prop-types'
import React from 'react'
import ReactGA from 'react-ga'
import Helmet from 'react-helmet'
import { intlShape } from 'react-intl'
import styled from 'styled-components'
import Grid from 'styled-components-grid'
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap'
import classnames from 'classnames'

import NavBar from '../NavBar'
import { colors, media, fonts, fontSize, fontWeight } from '../../styles'
import TopBar from '../../containers/TopBar'
import Wrp from '../Wrapper'
import messages from './messages'

import linesBg from '../../images/backgrounds/lines.png'
import yellowBg from '../../images/backgrounds/yellow-bg.png'

import Callout from './Callout'
import Info from './Info'

const Container = styled.div`
  background-image: url(${yellowBg});
  background-color: white;
  background-size: contain;
  background-repeat: no-repeat;
`

const Lines = styled.div`
  background-image: url(${linesBg});
  background-color: white;
  padding-top: 4.5rem;
  padding-bottom: 2.5rem;
  background-repeat: no-repeat;
  background-size: contain;

  ${media.tablet`
    padding-top: 2.5rem;
  `};
`
const Wrapper = styled(Wrp)`
  padding-bottom: 0;
`

const Title = styled.h1`
  display: block;
  position: relative;
  font-size: ${fontSize.mega}!important;
  font-family: ${fonts.tertiary}!important;
  text-align: center;
  line-height: 1;
  padding-bottom: 35px;
  margin: 0 auto !important;
  width: 90%;
  background-color: white;

  ${media.tablet`
    width: 62%;
  `};

  ${media.desktop`
    width: 55%;
  `};

  ${media.widescreen`
    width: 55%;
  `};
`

const Description = styled.div`
  display: block;
  position: relative;
  text-align: center;
  font-size: ${fontSize.base};
  font-family: ${fonts.primary};
  padding-bottom: 50px;
  margin: 0 auto;
  width: 85%;

  ${media.tablet`
    width: 65%;
    padding-bottom: 50px;
    background-color: ${colors.white};
  `};

  ${media.desktop`
    width: 60%;
    padding-bottom: 70px;
  `};

  ${media.widescreen`
    width: 60%;
    padding-bottom: 70px;
  `};
`

const DonationsCta = styled.div`
  display: block;
  position: relative;
  margin: 0 auto;
  background-color: ${colors.white};

  ${media.tablet`
    width: 70%
  `};

  ${media.desktop`
    width: 70%
  `};
`

const DonationsCtaHeader = styled.div`
  display: block;
  position: relative;
  overflow: hidden;
  width: 100%;
  padding: 20px 0;
  text-align: center;
  font-family: ${fonts.primary};
  font-size: ${fontSize.xl};
  font-weight: ${fontWeight.semibold};

  &:after {
    content: '';
    width: 10%;
    height: 1px;
    display: block;
    position: relative;
    left: 45%;
    background-color: ${colors.accent1};
    height: 2px;
    margin: 15px 0;
  }
`

const DonateButton = styled.div`
  display: block;
  position: relative;
  text-align: center;
  padding: 40px 0;
`

const LinkAbsolute = styled.a``

class Donate extends React.Component {
  static propTypes = {
    history: object.isRequired
  }

  static contextTypes = {
    intl: intlShape
  }

  state = {
    activeTab: '1',
    singleDonationValue: 50,
    monthlyDonationValue: 'other'
  }

  componentWillMount() {
    ReactGA.pageview(window.location.pathname + window.location.search)
  }

  toggle = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      })
    }
  }

  updateSingleDonation = value => {
    if (this.state.singleDonationValue !== value) {
      if (value !== 'other') {
        this.setState({
          singleDonationValue: parseInt(value)
        })
      } else {
        this.setState({
          singleDonationValue: 'other'
        })
      }
    }
  }

  updateMonthlyDonation = value => {
    if (this.state.monthlyDonationValue !== value) {
      if (value !== 'other') {
        this.setState({
          monthlyDonationValue: parseInt(value)
        })
      } else {
        this.setState({
          monthlyDonationValue: 'other'
        })
      }
    }
  }

  render() {
    const { formatMessage } = this.context.intl

    return (
      <Wrapper>
        <Helmet title={formatMessage(messages.pageTitle)} />

        <TopBar hideOn="phone,tablet" alternate />

        <NavBar
          hideOn="desktop,widescreen"
          isNarrow
          title={formatMessage(messages.headerTitle)}
          goBackHandler={() => this.props.history.goBack()}
        />

        <Container>
          <Grid className="is-full">
            <Grid.Unit
              size={{ mobile: 1 / 1, tablet: 10 / 12, desktop: 7 / 12 }}
              className="mx-auto"
            >
              <Lines>
                <Title className="alt">
                  {formatMessage(messages.mainTitle)}
                </Title>
                <Description>{formatMessage(messages.mainMessage)}</Description>

                <DonationsCta className="shadow-outer">
                  <Nav tabs role="tablist">
                    <NavItem role="tab">
                      <NavLink
                        id="donateOnceTabHeader"
                        tabindex="0"
                        className={classnames({
                          active: this.state.activeTab === '1'
                        })}
                        onClick={() => {
                          this.toggle('1')
                        }}
                      >
                        {formatMessage(messages.giveCta1)}
                      </NavLink>
                    </NavItem>
                    <NavItem role="tab">
                      <NavLink
                      id="donateMonthlyTabHeader"
                      tabindex="-1"
                        className={classnames({
                          active: this.state.activeTab === '2'
                        })}
                        onClick={() => {
                          this.toggle('2')
                        }}
                      >
                        {formatMessage(messages.giveCta2)}
                      </NavLink>
                    </NavItem>
                  </Nav>
                  <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1" role="tabpanel" aria-labelledby="donateOnceTabHeader">
                      <DonationsCtaHeader>
                        {formatMessage(messages.giveCta1Description)}
                      </DonationsCtaHeader>
                      <Grid className="is-full px-9">
                        <Grid.Unit
                          size={{
                            mobile: 1 / 2,
                            tablet: 1 / 2,
                            desktop: 1 / 4
                          }}
                        >
                          <div
                            className={`btn-rounded-full mx-auto single-line ${
                              this.state.singleDonationValue === 100
                                ? 'active'
                                : null
                            }`}
                            onClick={() => this.updateSingleDonation('100')}
                          >
                            <span>{formatMessage(messages.amount1)}</span>
                          </div>
                        </Grid.Unit>
                        <Grid.Unit
                          size={{
                            mobile: 1 / 2,
                            tablet: 1 / 2,
                            desktop: 1 / 4
                          }}
                        >
                          <div
                            className={`btn-rounded-full mx-auto single-line ${
                              this.state.singleDonationValue === 50
                                ? 'active'
                                : null
                            }`}
                            onClick={() => this.updateSingleDonation('50')}
                          >
                            <span>{formatMessage(messages.amount2)}</span>
                          </div>
                        </Grid.Unit>
                        <Grid.Unit
                          size={{
                            mobile: 1 / 2,
                            tablet: 1 / 2,
                            desktop: 1 / 4
                          }}
                          c
                        >
                          <div
                            className={`btn-rounded-full mx-auto single-line ${
                              this.state.singleDonationValue === 25
                                ? 'active'
                                : null
                            }`}
                            onClick={() => this.updateSingleDonation('25')}
                          >
                            <span>{formatMessage(messages.amount3)}</span>
                          </div>
                        </Grid.Unit>
                        <Grid.Unit
                          size={{
                            mobile: 1 / 2,
                            tablet: 1 / 2,
                            desktop: 1 / 4
                          }}
                        >
                          <div
                            className={`btn-rounded-full mx-auto ${
                              this.state.singleDonationValue === 'other'
                                ? 'active'
                                : null
                            }`}
                            onClick={() => this.updateSingleDonation('other')}
                          >
                            <span>{formatMessage(messages.amountOther)}</span>
                          </div>
                        </Grid.Unit>
                      </Grid>
                      <DonateButton>
                        {this.state.singleDonationValue !== 'other' ? (
                          <LinkAbsolute
                            href={`https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=info@axslab.org&item_name=Single+Donation&item_number=AXS+Map&&amount=${
                              this.state.singleDonationValue
                            }%2e00&currency_code=USD`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="primary-btn primary-btn--large"
                          >
                            {formatMessage(messages.headerTitle)}
                          </LinkAbsolute>
                        ) : (
                          <LinkAbsolute
                            href="https://www.paypal.me/axslab"
                            target="_blank"
                            className="primary-btn primary-btn--large"
                            rel="noopener noreferrer"
                          >
                            {formatMessage(messages.headerTitle)}
                          </LinkAbsolute>
                        )}
                      </DonateButton>
                    </TabPane>
                    <TabPane tabId="2" role="tabpanel" aria-labelledby="donateMonthlyTabHeader">
                      <DonationsCtaHeader>
                        {formatMessage(messages.giveCta2Description)}
                      </DonationsCtaHeader>
                      <Grid className="is-full px-9">
                        <Grid.Unit
                          size={{
                            mobile: 1 / 2,
                            tablet: 1 / 2,
                            desktop: 1 / 4
                          }}
                        >
                          <div
                            className={`btn-rounded-full mx-auto single-line ${
                              this.state.monthlyDonationValue === 100
                                ? 'active'
                                : null
                            }`}
                            onClick={() => this.updateMonthlyDonation('100')}
                          >
                            <span>{formatMessage(messages.amount1)}</span>
                          </div>
                        </Grid.Unit>
                        <Grid.Unit
                          size={{
                            mobile: 1 / 2,
                            tablet: 1 / 2,
                            desktop: 1 / 4
                          }}
                        >
                          <div
                            className={`btn-rounded-full mx-auto single-line ${
                              this.state.monthlyDonationValue === 50
                                ? 'active'
                                : null
                            }`}
                            onClick={() => this.updateMonthlyDonation('50')}
                          >
                            <span>{formatMessage(messages.amount2)}</span>
                          </div>
                        </Grid.Unit>
                        <Grid.Unit
                          size={{
                            mobile: 1 / 2,
                            tablet: 1 / 2,
                            desktop: 1 / 4
                          }}
                          c
                        >
                          <div
                            className={`btn-rounded-full mx-auto single-line ${
                              this.state.monthlyDonationValue === 25
                                ? 'active'
                                : null
                            }`}
                            onClick={() => this.updateMonthlyDonation('25')}
                          >
                            <span>{formatMessage(messages.amount3)}</span>
                          </div>
                        </Grid.Unit>
                        <Grid.Unit
                          size={{
                            mobile: 1 / 2,
                            tablet: 1 / 2,
                            desktop: 1 / 4
                          }}
                        >
                          <div
                            className={`btn-rounded-full mx-auto ${
                              this.state.monthlyDonationValue === 'other'
                                ? 'active'
                                : null
                            }`}
                            onClick={() => this.updateMonthlyDonation('other')}
                          >
                            <span>{formatMessage(messages.amountOther)}</span>
                          </div>
                        </Grid.Unit>
                      </Grid>
                      <DonateButton>
                        {this.state.monthlyDonationValue !== 'other' ? (
                          <div>
                            {this.state.monthlyDonationValue === 25 ? (
                              <LinkAbsolute
                                href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=V2QSLD9KYLZ4C&source=url"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="primary-btn primary-btn--large"
                              >
                                {formatMessage(messages.headerTitle)}{' '}
                                {formatMessage(messages.giveCta2)}
                              </LinkAbsolute>
                            ) : null}

                            {this.state.monthlyDonationValue === 50 ? (
                              <LinkAbsolute
                                href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=N2HQG66RQGHFU&source=url"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="primary-btn primary-btn--large"
                              >
                                {formatMessage(messages.headerTitle)}{' '}
                                {formatMessage(messages.giveCta2)}
                              </LinkAbsolute>
                            ) : null}

                            {this.state.monthlyDonationValue === 100 ? (
                              <LinkAbsolute
                                href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=JTFTPWCEPDK5Q&source=url"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="primary-btn primary-btn--large"
                              >
                                {formatMessage(messages.headerTitle)}{' '}
                                {formatMessage(messages.giveCta2)}
                              </LinkAbsolute>
                            ) : null}
                          </div>
                        ) : (
                          <LinkAbsolute
                            href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=PR6B6HVBG3EL2&source=url"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="primary-btn primary-btn--large"
                          >
                            {formatMessage(messages.headerTitle)}{' '}
                            {formatMessage(messages.giveCta2)}
                          </LinkAbsolute>
                        )}
                      </DonateButton>
                    </TabPane>
                  </TabContent>
                </DonationsCta>
              </Lines>
            </Grid.Unit>
          </Grid>
          <Callout />
          <Info />
        </Container>
      </Wrapper>
    )
  }
}

export default Donate
