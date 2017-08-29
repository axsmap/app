import { intlShape } from 'react-intl'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import { colors } from '../../styles'
import starActiveIcon from '../../images/star-active.svg'
import starIcon from '../../images/star.svg'

import messages from './messages'

const Wrapper = styled(Link)`
  align-items: center;
  justify-content: space-between;

  display: flex;

  border-radius: 3px;
  box-shadow: 0px 0px 0px 1px ${colors.darkGrey};
  height: 8rem;
  margin-bottom: 1rem;
  width: 100%;

  background-color: white;
  cursor: pointer;

  text-decoration: none;

  &:active,
  &:focus {
    outline: 2px solid ${colors.secondary};
  }

  &:last-of-type {
    margin-bottom: 0;
  }
`

const Photo = styled.div`
  border-bottom-left-radius: 3px;
  border-right: 1px inset ${colors.darkGrey};
  border-top-left-radius: 3px;
  height: inherit;
  width: 30%;

  background-image: ${props =>
    props.photo ? `url(${props.photo})` : `url(${props.icon})`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: ${props => (props.photo ? 'cover' : '3rem')};
`

const Content = styled.div`
  height: inherit;
  padding: .5rem;
  width: 70%;
`

const Name = styled.p`
  overflow: hidden;

  margin: 0 0 .5rem 0;

  color: ${colors.darkestGrey};
  font-size: 1rem;
  font-weight: bold;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const Score = styled.div`
  align-items: center;
  justify-content: flex-start;

  display: flex;

  margin-bottom: .5rem;

  &:last-of-type {
    margin-bottom: 0;
  }
`

const ScoreText = styled.p`
  overflow: hidden;

  margin: 0 1rem 0 0;

  color: ${colors.grey};
  font-size: .8rem;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const ScoreStar = styled.img`
  height: 1rem;
  margin-right: .4rem;
  width: auto;

  &:last-of-type {
    margin-right: 0;
  }
`

const ResultsData = (props, context) => {
  const maxScore = 5
  const generalScoreStars = []
  const entryScoreStars = []
  const bathroomScoreStars = []
  for (let i = 1; i <= maxScore; i += 1) {
    const StarActive = (
      <ScoreStar key={i} active src={starActiveIcon} alt="Active star icon" />
    )
    const Star = <ScoreStar key={i} src={starIcon} alt="Star icon" />

    if (Math.round(props.generalScore) >= i) {
      generalScoreStars.push(StarActive)
    } else {
      generalScoreStars.push(Star)
    }

    if (Math.round(props.entryScore) >= i) {
      entryScoreStars.push(StarActive)
    } else {
      entryScoreStars.push(Star)
    }

    if (Math.round(props.bathroomScore) >= i) {
      bathroomScoreStars.push(StarActive)
    } else {
      bathroomScoreStars.push(Star)
    }
  }

  return (
    <Wrapper to={props.to}>
      <Photo photo={props.photo} icon={props.icon} />
      <Content>
        <Name>
          {props.name}
        </Name>
        <Score>
          <ScoreText>
            {context.intl.formatMessage(messages.generalScore)}
          </ScoreText>
          {generalScoreStars}
        </Score>
        <Score>
          <ScoreText>
            {context.intl.formatMessage(messages.entryScore)}
          </ScoreText>
          {entryScoreStars}
        </Score>
        <Score>
          <ScoreText>
            {context.intl.formatMessage(messages.bathroomScore)}
          </ScoreText>
          {bathroomScoreStars}
        </Score>
      </Content>
    </Wrapper>
  )
}

ResultsData.contextTypes = {
  intl: intlShape
}

ResultsData.propTypes = {
  to: PropTypes.string.isRequired,
  photo: PropTypes.string,
  icon: PropTypes.string,
  name: PropTypes.string.isRequired,
  generalScore: PropTypes.number,
  entryScore: PropTypes.number,
  bathroomScore: PropTypes.number
}

ResultsData.defaultProps = {
  photo: '',
  icon: '',
  generalScore: 0,
  entryScore: 0,
  bathroomScore: 0
}

export default ResultsData
