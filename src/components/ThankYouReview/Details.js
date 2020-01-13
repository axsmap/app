import { object, number, string } from 'prop-types'
import React from 'react'
import { intlShape } from 'react-intl'
import styled from 'styled-components'
import Grid from '@material-ui/core/Grid'

import {fonts, fontSize } from '../../styles'

import DetailsInfo from './DetailsInfo'
import DetailsMap from './DetailsMap'
import DetailsPhotos from './DetailsPhotos'
import messages from './messages'

const Title = styled.div`
  display: block;
  position: relative;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  text-align: center;
  font-size: ${fontSize.xl1};
  font-family: ${fonts.tertiary};
  padding: 25px 15px 50px 15px;
`
export default class Details extends React.Component {
  static propTypes = {
    reviewsRatioWeight: number.isRequired,
    generalType: string.isRequired,
    venue: object.isRequired
  }

  static contextTypes = {
    intl: intlShape
  }

  componentWillMount() {
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
  }

  render() {
    const formatMessage = this.context.intl.formatMessage
    let detailsPageTitle = messages.detailsPageTitle
    let locationsPlaceholder = messages.locationsPlaceholder 
    let itemsPlaceholder = messages.itemsPlaceholder
    let ratingsHeader = messages.ratingsHeader
    let tyDescription = messages.detailsPageDescription

    return (
      <Grid container>
        <Grid item xs={12} sm={6}>
          <Title>
          {formatMessage(detailsPageTitle)}
          </Title>
          <DetailsPhotos photos={this.props.venue.photos} />
          <DetailsInfo
            name={this.props.venue.name}
            description = {formatMessage(tyDescription)} 
            locationPlaceholder={formatMessage(locationsPlaceholder)} 
            itemPlaceholder={formatMessage(itemsPlaceholder)} 
            ratingsHeader = {formatMessage(ratingsHeader)} 
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DetailsMap
            reviewsRatioWeight={this.props.reviewsRatioWeight}
            generalType={this.props.generalType}
            location={this.props.venue.location}
          />
        </Grid>
      </Grid>
    )
  }
}
