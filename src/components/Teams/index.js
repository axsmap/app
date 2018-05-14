import { arrayOf, bool, func, number, shape, string } from 'prop-types'
import React, { PureComponent } from 'react'
import ReactGA from 'react-ga'
import Helmet from 'react-helmet'
import { intlShape } from 'react-intl'
import styled from 'styled-components'

import Button from '../Button'
import Ctn from '../Container'
import Footer from '../Footer'
import Icon from '../Icon'
import LinkButton from '../LinkButton'
import NoResultsText from '../NoResults/NoResultsText'
import NoResultsImage from '../NoResults/NoResultsImage'
import NoResultsTitle from '../NoResults/NoResultsTitle'
import NoResultsWrapper from '../NoResults/NoResultsWrapper'
import noResultsImage from '../../images/no-results.png'
import RouterLink from '../RouterLink'
import Spinner from '../Spinner'
import { colors, media } from '../../styles'
import TabBar from '../../containers/TabBar'
import TopBar from '../../containers/TopBar'
import Wrapper from '../Wrapper'

import messages from './messages'

const Container = styled(Ctn)`
  padding: 1rem;

  ${media.tablet`
    padding: 2rem 0;
  `};
`

const CardsWrapper = styled.div`
  flex-grow: 1;

  margin-bottom: 4rem;
  margin-top: 1rem;
  width: 100%;

  background-color: ${colors.lightestGrey};

  &::after {
    display: table;
    clear: both;
    content: '';
  }

  ${media.tablet`
    margin-bottom: 2rem;
    margin-top: 2rem;
  `};

  ${media.desktop`
    margin-bottom: 0;
  `};
`

const Card = styled(RouterLink)`
  float: left;

  display: flex;

  align-items: center;
  justify-content: center;

  border: 1px solid ${colors.grey};
  margin-bottom: 1rem;
  margin-right: 0;
  border-radius: 3px;
  width: 100%;
  height: 10rem;

  background-color: white;

  text-decoration: none;

  &:active,
  &:focus {
    outline: 2px solid ${colors.secondary};
  }

  &:disabled,
  &[disabled] {
    opacity: 0.5;
  }

  &:last-of-type {
    margin-bottom: 0;
  }

  ${media.tablet`
    margin-bottom: 2rem;
    margin-right: 2rem;
    width: calc((100% - 2rem * 1) / 2);

    &:nth-child(2n+2) {
      float: right;
      margin-right: 0;
    }
  `};

  ${media.desktop`
    flex-direction: column;

    margin-bottom: 2rem;
    margin-right: 2rem;
    width: calc((100% - 2rem * 3) / 4);
    height: 18rem;

    &:nth-child(2n+2) {
      float: left;
      margin-right: 2rem;
    }

    &:nth-child(3n+3) {
      float: left;
      margin-right: 2rem;
    }

    &:nth-child(4n+4) {
      float: right;
      margin-right: 0;
    }
  `};
`

const Photo = styled.div`
  border-radius: 3px 0 0 3px;
  width: 30%;
  height: 99.9%;

  background-image: ${props => `url("${props.backgroundImage}")`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  ${media.desktop`
    border-radius: 3px 3px 0 0;
    height: 60%;
    width: 100%;
  `};
`

const Info = styled.div`
  display: flex;

  flex-direction: column;
  justify-content: center;

  height: inherit;
  padding: 1rem 1rem 0;

  ${media.tablet`
    height: 4rem;
  `};
`

const Name = styled.h2`
  overflow: hidden;

  margin: 0;

  color: ${colors.darkestGrey};
  font-size: 1.2rem;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;

  ${media.desktop`
    text-align: center;
  `};
`

const Description = styled.p`
  overflow: hidden;

  margin: 0 0 0.5rem 0;

  color: ${colors.darkGrey};
  font-size: 0.8rem;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;

  ${media.desktop`
    text-align: center;
  `};
`

const TeamPerformance = styled.footer`
  display: flex;

  margin-bottom: 0.5rem;
  width: 100%;

  text-align: center;
`

const Performance = styled.div`
  flex-direction: column;

  display: flex;

  width: 50%;
`

const PerfNumber = styled.h2`
  margin: 0;

  color: ${colors.darkestGrey};
`

const PerfDesc = styled.p`
  margin: 0;

  color: ${colors.darkGrey};
`

const Column = styled.div`
  flex-direction: column;

  display: flex;

  width: 70%;

  ${media.desktop`
    width: 100%;
  `};
`

const ButtonsWrapper = styled.div`
  bottom: 5rem;
  left: 0;
  position: fixed;

  display: flex;

  justify-content: space-around;

  padding: 0 1rem;
  width: 100%;

  ${media.desktop`
    position: static;
  `};
`

const ButtonContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

class Teams extends PureComponent {
  static propTypes = {
    nextPage: number,
    loadingTeams: bool.isRequired,
    teams: arrayOf(
      shape({
        id: string.isRequired,
        avatar: string,
        description: string,
        name: string.isRequired,
        ranking: number.isRequired,
        reviewsAmount: number.isRequired
      })
    ).isRequired,
    sendingRequest: bool.isRequired,
    getTeams: func.isRequired,
    clearState: func.isRequired
  }

  static contextTypes = {
    intl: intlShape
  }

  componentWillMount() {
    ReactGA.pageview(window.location.pathname + window.location.search)
  }

  componentDidMount() {
    this.props.getTeams()
  }

  componentWillUnmount() {
    this.props.clearState()
  }

  render() {
    const formatMessage = this.context.intl.formatMessage

    let teamsCards
    if (this.props.teams && this.props.teams.length > 0) {
      teamsCards = (
        <CardsWrapper>
          {this.props.teams.map(team => (
            <Card
              key={team.id}
              to={`/teams/${team.id}`}
              disabled={this.props.sendingRequest}
            >
              <Photo backgroundImage={team.avatar} />
              <Column>
                <Info>
                  <Name>{team.name}</Name>
                  <Description>{team.description}</Description>
                </Info>
                <TeamPerformance>
                  <Performance>
                    <PerfNumber>{team.ranking}</PerfNumber>
                    <PerfDesc>{formatMessage(messages.rankCaption)}</PerfDesc>
                  </Performance>
                  <Performance>
                    <PerfNumber>{team.reviewsAmount}</PerfNumber>
                    <PerfDesc>
                      {formatMessage(messages.reviewsCaption)}
                    </PerfDesc>
                  </Performance>
                </TeamPerformance>
              </Column>
            </Card>
          ))}
        </CardsWrapper>
      )
    }

    return (
      <Wrapper>
        <Helmet title={formatMessage(messages.pageTitle)} />

        <TopBar />

        <Container>
          {this.props.loadingTeams ||
          (this.props.teams && this.props.teams.length === 0) ? null : (
            <LinkButton to="teams/create" disabled={this.props.sendingRequest}>
              <ButtonContent>
                <Icon
                  glyph="cross"
                  size={1}
                  rotate="45deg"
                  color={colors.darkestGrey}
                />
                <p style={{ margin: '0 0 0 0.5rem' }}>
                  {formatMessage(messages.createTeamButton)}
                </p>
              </ButtonContent>
            </LinkButton>
          )}

          {this.props.loadingTeams ? <Spinner /> : teamsCards}

          {this.props.nextPage ? (
            <ButtonsWrapper>
              <Button
                disabled={this.props.sendingRequest}
                float
                onClickHandler={this.props.getTeams}
              >
                <ButtonContent>
                  <Icon glyph="load" size={1} color={colors.darkestGrey} />
                  <p style={{ margin: '0 0 0 0.5rem' }}>
                    {formatMessage(messages.loadMoreButton)}
                  </p>
                </ButtonContent>
              </Button>
            </ButtonsWrapper>
          ) : null}

          {!this.props.loadingTeams &&
          this.props.teams &&
          this.props.teams.length === 0 ? (
            <NoResultsWrapper>
              <NoResultsImage src={noResultsImage} alt="No results" />
              <NoResultsTitle>
                {formatMessage(messages.noResultsTitle)}
              </NoResultsTitle>
              <NoResultsText>
                {formatMessage(messages.noResultsText)}
              </NoResultsText>
            </NoResultsWrapper>
          ) : null}
        </Container>
        <TabBar />

        <Footer isNarrow hideOn="phone,tablet" wFontSize="0.9rem" />
      </Wrapper>
    )
  }
}

export default Teams
