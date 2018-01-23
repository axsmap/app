import { number } from 'prop-types'
import React from 'react'
import { intlShape } from 'react-intl'
import styled from 'styled-components'

import { colors, media } from '../../styles'
import messages from './messages'
import Title from './Title'

const Wrapper = styled.article`
  display: flex;

  flex-direction: column;

  border-radius: 10px;
  box-shadow: ${colors.grey} 0 0 6px 0;
  margin-top: 2rem;
  padding: 1rem;
  width: 100%;

  ${media.tablet`
    margin: 2rem 0;
    width: 49%;
  `};
`

const Grid = styled.div`
  align-items: flex-start;
  display: flex;
  margin-top: 1rem;
`

const Item = styled.div`
  align-items: center;
  flex-direction: column;

  display: flex;

  width: 50%;
`

const Value = styled.h1`
  margin: 0;

  color: ${colors.secondary};
  font-size: 3.5rem;
  line-height: 0.8;
`

const Label = styled.p`
  margin: 0;

  color: ${props => props.blue && colors.secondary};
  font-size: 0.9rem;
  text-align: center;
`

const StatsTitle = Title.extend`text-align: center;`

const Stats = ({ ranking, reviewsAmount }, context) => (
  <Wrapper>
    <StatsTitle>{context.intl.formatMessage(messages.statsTitle)}</StatsTitle>
    <Grid>
      <Item>
        <Value>{ranking}</Value>
        <Label blue>{context.intl.formatMessage(messages.ranking)}</Label>
        <Label>{context.intl.formatMessage(messages.rankingLabel)}</Label>
      </Item>
      <Item>
        <Value>{reviewsAmount}</Value>
        <Label>{context.intl.formatMessage(messages.reviews)}</Label>
      </Item>
    </Grid>
  </Wrapper>
)

Stats.contextTypes = {
  intl: intlShape
}

Stats.propTypes = {
  ranking: number.isRequired,
  reviewsAmount: number.isRequired
}

export default Stats
