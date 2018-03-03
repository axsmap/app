import { array, bool, number } from 'prop-types'
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

  padding: 0 1rem;
  width: 100%;

  ${media.tablet`
    padding: 0;
  `};
`

const Block = styled.div`
  display: flex;

  align-items: center;
  flex-direction: column;
  justify-content: center;

  margin-bottom: 2rem;
  width: 75%;

  ${media.tablet`
    width: 50%;
  `};
`

const Progress = styled.div`
  height: 0.5rem;
  margin: 1rem 0;
  width: 100%;

  background-color: ${colors.lightGrey};
`

const ProgressBar = styled.div`
  height: inherit;
  width: ${props => props.width};
  background-color: ${colors.success};
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
  box-shadow: ${props =>
    props.isHighlighted ? `inset 0px 0px 0px 2px ${colors.secondary}` : 'none'};
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

export default class DetailsParticipants extends React.Component {
  static propTypes = {
    managers: array,
    participants: array,
    participantsGoal: number,
    sendingRequest: bool
  }

  static contextTypes = {
    intl: intlShape
  }

  state = {
    allParticipants: [
      ...this.props.managers.map(m => ({ ...m, isManager: true })),
      ...this.props.participants
    ],
    visibleParticipants: [],
    showAllButtonIsVisible: false,
    showLessButtonIsVisible: false
  }

  componentWillMount() {
    this.setState({
      visibleParticipants: this.state.allParticipants.slice(0, 8),
      showAllButtonIsVisible:
        this.state.allParticipants.slice(0, 8).length <
        this.state.allParticipants.length
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      allParticipants: [
        ...nextProps.managers.map(m => ({ ...m, isManager: true })),
        ...nextProps.participants
      ]
    })

    this.setState({
      visibleParticipants: this.state.allParticipants.slice(0, 8),
      showAllButtonIsVisible:
        this.state.allParticipants.slice(0, 8).length <
        this.state.allParticipants.length
    })
  }

  showAll = () => {
    this.setState({
      visibleParticipants: this.state.allParticipants,
      showAllButtonIsVisible: false,
      showLessButtonIsVisible: true
    })
  }

  showLess = () => {
    this.setState({
      visibleParticipants: this.state.allParticipants.slice(0, 8),
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
            glyph="people"
            size={2.5}
            tabletSize={3}
            desktopSize={3.5}
            widescreenSize={4}
            color={colors.secondary}
          />
          <Progress>
            <ProgressBar
              width={`${this.state.allParticipants.length /
                this.props.participantsGoal >
              1
                ? 100
                : this.state.allParticipants.length /
                  this.props.participantsGoal *
                  100}%`}
            />
          </Progress>
          <Title>
            {formatMessage(messages.participantsGoal, {
              amount: this.state.allParticipants.length,
              goal: this.props.participantsGoal
            })}
          </Title>
        </Block>

        <List>
          {this.state.visibleParticipants.map(p => (
            <Item key={p.id} to={`/users/${p.id}`}>
              <ItemImage image={p.avatar} isHighlighted={p.isManager} />
              <ItemText
                color={colors.darkGrey}
              >{`${p.firstName} ${p.lastName}`}</ItemText>
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
