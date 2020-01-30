import { object } from 'prop-types'
import React from 'react'
import ReactGA from 'react-ga'
import Helmet from 'react-helmet'
import { intlShape } from 'react-intl'
import styled from 'styled-components'
import Grid from 'styled-components-grid'

import Footer from '../Footer'
import NavBar from '../NavBar'
import { colors, media, fonts, fontSize, fontWeight } from '../../styles'
import TopBar from '../../containers/TopBar'
import Wrp from '../Wrapper'
import Button from '../Button'
import messages from './messages'

import jasonImage from '../../images/jason.png'
import linesBg from '../../images/backgrounds/lines.png'
import userIcon from '../../images/icons/users.png'
import mapathonIcon from '../../images/icons/mapathon.png'
import worldIcon from '../../images/icons/world.png'
import bwDottedBg from '../../images/backgrounds/bg2.png'

const Container = styled.div``

const Lines = styled.div`
  background-image: url(${linesBg});
  background-color: white;
  padding-top: 4.5rem;
  padding-bottom: 2.5rem;
  background-repeat: no-repeat;
  background-size: contain;
`

const DottedBg = styled.div`
  background-image: url(${bwDottedBg});
  background-color: white;
  background-repeat: no-repeat;
  background-size: auto;
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

  ${media.desktop`
    width: 55%
  `};

  ${media.widescreen`
    width: 55%
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

  ${media.desktop`
    width: 70%
  `};
`

const TabbedContent = styled.div`
  display: block;
  position: relative;
  overflow: hidden;
  width: 100%;

  ul {
    display: block;
    position: relative;
    font-family: ${fonts.primary};
    list-style-type: none;
    margin: 0;
    padding: 0;
    height: 42px;
    overflow: hidden;

    li {
      width: 50%;
      float: left;
      text-transform: uppercase;
      font-family: ${fonts.primary};
      font-size: ${fontSize.xs};
      background-color: ${colors.darkestGrey};
      color: ${colors.primary};
      text-align: center;
      padding: 12px 0;
      margin: 0 auto;
      list-style-type: none;
      height: 42px;
      overflow: hidden;
      font-weight: ${fontWeight.bold};

      &.is-active {
        background-color: ${colors.white};
        color: ${colors.darkestGrey};
      }
    }
  }
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

const IconWrapper = styled.div`
  display: block;
  position: relative;
  text-align: center;
`

const Counter = styled.div`
  display: block;
  position: relative;
  overflow: hidden;
  width: 100%;
  text-align: center;
  font-weight: ${fontWeight.semibold};
  font-family: ${fonts.primary};
  font-size: 45px;
  line-height: 1.25;

  &:before {
    content: '';
    position: relative;
    display: block;
    height: 7px;
    background-color: ${colors.primary};
    width: 90px;
    margin: 15px auto;
  }
`

const Caption = styled.div`
  display: block;
  position: relative;
  overflow: hidden;
  width: 100%;
  text-align: center;
  font-weight: ${fontWeight.bold};
  font-family: ${fonts.primary};
  font-size: ${fontSize.sm};
  padding-bottom: 60px;
`

const SmallCtas = styled.div`
  display: block;
  position: relative;
  margin-left: 40px;
  font-weight: ${fontWeight.bold};
  font-family: ${fonts.primary};
  font-size: ${fontSize.base};
  padding: 20px 0;

  ${media.desktop`
    margin-left: 40px;
    padding: 20px 0;
  `};
`

class Donate extends React.Component {
  static propTypes = {
    history: object.isRequired
  }

  static contextTypes = {
    intl: intlShape
  }

  componentWillMount() {
    ReactGA.pageview(window.location.pathname + window.location.search)
  }

  render() {
    const {formatMessage} = this.context.intl

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
          <Grid className="is-full" className="bg-primary">
            <Grid.Unit
              size={{ tablet: 1 / 2, desktop: 7 / 12 }}
              className="mx-auto"
            >
              <Lines>
                <Title className="alt">
                  {formatMessage(messages.mainTitle)}
                </Title>
                <Description>{formatMessage(messages.mainMessage)}</Description>

                <DonationsCta className="shadow-outer">
                  <TabbedContent>
                    <ul>
                      <li className="is-active">
                        {' '}
                        {formatMessage(messages.giveCta1)}
                      </li>
                      <li />
                    </ul>
                  </TabbedContent>
                  <DonationsCtaHeader>
                    {formatMessage(messages.giveCta1Description)}
                  </DonationsCtaHeader>
                  <Grid className="is-full px-9">
                    <Grid.Unit size={{ tablet: 1 / 4, desktop: 1 / 4 }}>
                      <div className="btn-rounded-full mx-auto single-line active">
                        {formatMessage(messages.amount1)}
                      </div>
                    </Grid.Unit>
                    <Grid.Unit size={{ tablet: 1 / 4, desktop: 1 / 4 }}>
                      <div className="btn-rounded-full mx-auto single-line">
                        {formatMessage(messages.amount2)}
                      </div>
                    </Grid.Unit>
                    <Grid.Unit size={{ tablet: 1 / 4, desktop: 1 / 4 }} c>
                      <div className="btn-rounded-full mx-auto single-line">
                        {formatMessage(messages.amount3)}
                      </div>
                    </Grid.Unit>
                    <Grid.Unit size={{ tablet: 1 / 4, desktop: 1 / 4 }}>
                      <div className="btn-rounded-full mx-auto">
                        {formatMessage(messages.amountOther)}
                      </div>
                    </Grid.Unit>
                  </Grid>
                  <DonateButton>
                    <Button className="primary-btn primary-btn--large">
                      {formatMessage(messages.headerTitle)}
                    </Button>
                  </DonateButton>
                </DonationsCta>
              </Lines>
            </Grid.Unit>
          </Grid>
          <Grid className="is-full" className="bg-white">
            <Grid.Unit
              size={{ tablet: 1 / 2, desktop: 1 / 2 }}
              className="bg-white mx-auto"
            >
              <Grid>
                <Grid.Unit
                  size={{ tablet: 1 / 3, desktop: 1 / 3 }}
                  className="bg-white mx-auto"
                >
                  <IconWrapper>
                    <figure>
                      <img src={userIcon} aria-hidden="true" alt="users" />
                    </figure>
                  </IconWrapper>
                  <Counter>
                    118
                    <span className="text-xl2">K</span>
                  </Counter>
                  <Caption>{formatMessage(messages.registeredUsers)}</Caption>
                </Grid.Unit>
                <Grid.Unit
                  size={{ tablet: 1 / 3, desktop: 1 / 3 }}
                  className="bg-white mx-auto"
                >
                  <IconWrapper>
                    <figure>
                      <img
                        src={mapathonIcon}
                        aria-hidden="true"
                        alt="mapathon"
                      />
                    </figure>
                  </IconWrapper>
                  <Counter>
                    300
                    <span className="text-xl2">+</span>
                  </Counter>
                  <Caption>
                    {formatMessage(messages.registeredMapatons)}
                  </Caption>
                </Grid.Unit>
                <Grid.Unit
                  size={{ tablet: 1 / 3, desktop: 1 / 3 }}
                  className="bg-white mx-auto"
                >
                  <IconWrapper>
                    <figure>
                      <img src={worldIcon} aria-hidden="true" alt="countries" />
                    </figure>
                  </IconWrapper>
                  <Counter>
                    100
                    <span className="text-xl2">K</span>
                  </Counter>
                  <Caption>
                    {formatMessage(messages.registeredCountries)}
                  </Caption>
                </Grid.Unit>
              </Grid>
            </Grid.Unit>
          </Grid>
          <Grid className="is-full bg-white">
            <Grid.Unit
              size={{ tablet: 1 / 2, desktop: 10 / 12 }}
              className="mx-auto"
            >
              <DottedBg>
                <Grid className="is-full">
                  <Grid.Unit size={{ tablet: 1 / 2, desktop: 1 / 2 }}>
                    <figure
                      style={{ marginTop: '60px' }}
                      className="bordered-fig"
                    >
                      <img
                        src={jasonImage}
                        aria-hidden="true"
                        alt="Jason Dasilva"
                        style={{ width: '100%' }}
                      />
                    </figure>
                    <SmallCtas>{formatMessage(messages.jasonFilms)}</SmallCtas>
                  </Grid.Unit>
                  <Grid.Unit size={{ tablet: 1 / 2, desktop: 1 / 2 }}>
                    <Grid>
                      <Grid.Unit size={{ tablet: 1 / 2, desktop: 3 / 4 }}>
                        <h2 className="alt" style={{ marginTop: '60px' }}>
                          {formatMessage(messages.jasonTitle)}
                        </h2>
                        <p className="font-primary text-base leading-relaxed">
                          {formatMessage(messages.jasonMessage)}
                        </p>
                      </Grid.Unit>
                    </Grid>
                  </Grid.Unit>
                </Grid>
              </DottedBg>
            </Grid.Unit>
          </Grid>
        </Container>
      </Wrapper>
    )
  }
}

export default Donate
