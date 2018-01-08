import { number } from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import { colors, media } from '../../styles'
import Title from './Title'

const Wrapper = styled.article`
  display: flex;

  flex-direction: column;

  margin: 0;
  box-shadow: ${colors.grey} 0 0 6px 0;
  border-radius: 10px;
  width: 100%;
  height: 11rem;
  padding: 1rem;

  ${media.tablet`
    margin: 2rem 0;
    width: 49%;
  `};
`

const Grid = styled.div`
  align-items: flex-end;

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
`

const StatsTitle = Title.extend`text-align: center;`

const Stats = ({ ranking, reviewsAmount }) => (
  <Wrapper>
    <StatsTitle>total team stats for axs map</StatsTitle>
    <Grid>
      <Item>
        <Label blue>ranked</Label>
        <Value>{ranking}</Value>
        <Label>for venues reviewed</Label>
      </Item>
      <Item>
        <Value>{reviewsAmount}</Value>
        <Label>reviews</Label>
      </Item>
    </Grid>
  </Wrapper>
)

Stats.propTypes = {
  ranking: number.isRequired,
  reviewsAmount: number.isRequired
}

export default Stats
