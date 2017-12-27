import { arrayOf, bool, func, number, shape, string } from 'prop-types'
import React, { PureComponent } from 'react'
import Helmet from 'react-helmet'
import { intlShape } from 'react-intl'
import styled from 'styled-components'

import Button from '../Button'
import Container from '../Container'
import Footer from '../Footer'
import Icon from '../Icon'
import TabBar from '../../containers/TabBar'
import TopBar from '../../containers/TopBar'
import { colors, media } from '../../styles'
import RouterLink from '../RouterLink'
import Spinner from '../Spinner'
import Wrapper from '../Wrapper'

import messages from './messages'

const CardsWrapper = styled.div`
  flex-grow: 1;

  margin-bottom: 3rem;
  width: 100%;

  background-color: ${colors.lightestGrey};

  &::after {
    display: table;
    clear: both;
    content: '';
  }
`

const Card = styled(RouterLink)`
  float: left;

  display: flex;

  align-items: center;
  justify-content: center;

  box-shadow: inset 0px 0px 0px 1px ${colors.grey};
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

  ${media.widescreen`
    margin-bottom: 2rem;
    margin-right: 2rem;
    width: calc((100% - 2rem * 2) / 3);

    &:nth-child(2n+2) {
      float: left;
      margin-right: 2rem;
    }

    &:nth-child(3n+3) {
      float: right;
      margin-right: 0;
    }
  `};
`

const Photo = styled.div`
  border-radius: 3px 0 0 3px;
  width: 30%;
  height: inherit;

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
    margin-bottom: 1rem;
  `};
`

const ButtonContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

class Teams extends PureComponent {
  componentDidMount() {
    this.props.getTeams()
    this.props.setTeamsUrl()
  }

  render() {
    const formatMessage = this.context.intl.formatMessage

    return (
      <Wrapper>
        <Helmet title={formatMessage(messages.pageTitle)} />

        <TopBar />

        <h1>{formatMessage(messages.headerTitle)}</h1>
        <Container>
          {this.props.loadingTeams ? (
            <Spinner />
          ) : (
            <CardsWrapper>
              {this.props.teams.map(team => (
                <Card key={team.id} to={`/teams/${team.id}`}>
                  <Photo backgroundImage={team.avatar} />
                  <Column>
                    <Info>
                      <Name>{team.name}</Name>
                      <Description>{team.description}</Description>
                    </Info>
                    <TeamPerformance>
                      <Performance>
                        <PerfNumber>{team.rankAccordingToReviews}</PerfNumber>
                        <PerfDesc>
                          {formatMessage(messages.rankCaption)}
                        </PerfDesc>
                      </Performance>
                      <Performance>
                        <PerfNumber>{team.reviews}</PerfNumber>
                        <PerfDesc>
                          {formatMessage(messages.reviewsCaption)}
                        </PerfDesc>
                      </Performance>
                    </TeamPerformance>
                  </Column>
                </Card>
              ))}
            </CardsWrapper>
          )}
          <ButtonsWrapper>
            {this.props.nextPage !== '' ? (
              <Button
                backgroundColor={colors.primary}
                color={colors.darkestGrey}
                disabled={this.props.sendingRequest}
                onClickHandler={this.props.getTeams}
              >
                <ButtonContent>
                  <Icon glyph="load" size={1} color={colors.darkestGrey} />
                  <p style={{ margin: '0 0 0 0.5rem' }}>
                    {this.context.intl.formatMessage(messages.loadMoreButton)}
                  </p>
                </ButtonContent>
              </Button>
            ) : null}
          </ButtonsWrapper>
        </Container>
        <TabBar />

        <Footer hideOn="phone,tablet" wFontSize="0.9rem" />
      </Wrapper>
    )
  }
}

Teams.contextTypes = {
  intl: intlShape
}

Teams.propTypes = {
  nextPage: string.isRequired,
  loadingTeams: bool.isRequired,
  teams: arrayOf(
    shape({
      avatar: string,
      description: string.isRequired,
      id: string.isRequired,
      name: string.isRequired,
      rankAccordingToReviews: number.isRequired,
      reviews: number.isRequired
    })
  ).isRequired,
  sendingRequest: bool.isRequired,
  getTeams: func.isRequired,
  setTeamsUrl: func.isRequired
}

export default Teams
