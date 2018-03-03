import { array, bool } from 'prop-types'
import React from 'react'
import { intlShape } from 'react-intl'
import styled from 'styled-components'

import Button from '../Button'
import Icon from '../Icon'
import RouterLink from '../RouterLink'
import { colors, media } from '../../styles'

import messages from './messages'

const Wrapper = styled.div`
  display: flex;

  align-items: center;
  flex-direction: column;
  justify-content: center;

  margin-top: 2rem;
  padding: 0 1rem;
  width: 100%;

  ${media.tablet`
    padding: 0;
  `};

  ${media.desktop`
    margin-top: 3rem;
  `};

  ${media.widescreen`
    margin-top: 4rem;
  `};
`

const Block = styled.div`
  display: flex;

  align-items: center;
  flex-direction: column;
  justify-content: center;

  margin-bottom: 2rem;
  width: 100%;
`

const Title = styled.h1`
  display: block;

  margin: 0;
  width: 100%;

  color: ${colors.darkestGrey};
  font-size: 1.2rem;
  font-weight: bold;
  text-align: center;

  ${media.tablet`
    font-size: 1.5rem;
  `};

  ${media.desktop`
    font-size: 1.6rem;
  `};

  ${media.widescreen`
    font-size: 1.7rem;
  `};
`

const List = styled.div`
  display: flex;

  align-items: flex-start;
  flex-wrap: wrap;
  justify-content: center;

  width: 100%;
`

const Item = styled(RouterLink)`
  display: flex;

  align-items: center;
  flex: 0 1 45%;
  flex-direction: column;
  justify-content: center;

  margin-bottom: 5%;
  margin-right: 5%;

  text-decoration: none;

  &:active,
  &:focus {
    outline: 2px solid ${colors.secondary};
  }

  &:disabled,
  &[disabled] {
    opacity: 0.5;
  }

  &:nth-child(2n + 2) {
    margin-right: 0;
  }

  &:nth-last-child(-n + 2) {
    margin-bottom: 0;
  }

  &:nth-last-child(-n + 1) {
    margin-right: 0;
  }

  ${media.tablet`
    flex: 0 1 21.25%;

    &:nth-child(2n + 2) {
      margin-right: 5%;
    }

    &:nth-last-child(-n + 2) {
      margin-bottom: 5%;
    }

    &:nth-child(4n+4) {
      margin-right: 0;
    }

    &:nth-last-child(-n + 4) {
      margin-bottom: 0;
    }

    &:nth-last-child(-n + 1) {
      margin-right: 0;
    }
  `};
`

const ItemImage = styled.div`
  border-radius: 100%;
  height: 5rem;
  margin-bottom: 1rem;
  width: 5rem;

  background-image: ${props => `url("${props.image}")`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  ${media.tablet`
    height: 6rem;
    width: 6rem;
  `};

  ${media.desktop`
    height: 7rem;
    width: 7rem;
  `};

  ${media.widescreen`
    height: 8rem;
    width: 8rem;
  `};
`

const ItemText = styled.p`
  margin: 0;

  color: ${props => props.color};
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

export default class DetailsTeams extends React.Component {
  static propTypes = {
    teams: array,
    sendingRequest: bool
  }

  static contextTypes = {
    intl: intlShape
  }

  state = {
    visibleTeams: [],
    showAllButtonIsVisible: false,
    showLessButtonIsVisible: false
  }

  componentWillMount() {
    this.setState({
      visibleTeams: this.props.teams.slice(0, 8),
      showAllButtonIsVisible:
        this.props.teams.slice(0, 8).length < this.props.teams.length
    })
  }

  showAll = () => {
    this.setState({
      visibleTeams: this.props.teams,
      showAllButtonIsVisible: false,
      showLessButtonIsVisible: true
    })
  }

  showLess = () => {
    this.setState({
      visibleTeams: this.props.teams.slice(0, 8),
      showAllButtonIsVisible: true,
      showLessButtonIsVisible: false
    })
  }

  render() {
    const formatMessage = this.context.intl.formatMessage

    return (
      <Wrapper>
        <Block>
          <Icon
            glyph="badge"
            size={2.5}
            tabletSize={3}
            desktopSize={3.5}
            widescreenSize={4}
            color={colors.secondary}
            style={{ marginBottom: '0.5rem' }}
          />
          <Title>
            {formatMessage(messages.teamsTitle, {
              amount: this.props.teams.length
            })}
          </Title>
        </Block>

        <List>
          {this.state.visibleTeams.map(t => (
            <Item key={t.id} to={`/teams/${t.id}`}>
              <ItemImage image={t.avatar} />
              <ItemText color={colors.darkGrey}>{t.name}</ItemText>
            </Item>
          ))}
        </List>

        {this.state.showAllButtonIsVisible ? (
          <Button
            backgroundColor={colors.lightGrey}
            marginTop="2rem"
            disabled={this.props.sendingRequest}
            onClickHandler={this.showAll}
          >
            {formatMessage(messages.showAllButton)}
          </Button>
        ) : null}

        {this.state.showLessButtonIsVisible ? (
          <Button
            backgroundColor={colors.lightGrey}
            marginTop="2rem"
            disabled={this.props.sendingRequest}
            onClickHandler={this.showLess}
          >
            {formatMessage(messages.showLessButton)}
          </Button>
        ) : null}
      </Wrapper>
    )
  }
}
