import { object, number, string } from 'prop-types'
import React from 'react'
import { intlShape } from 'react-intl'
import Grid from '@material-ui/core/Grid'

import DetailsInfo from './DetailsInfo'
import DetailsMap from './DetailsMap'
import DetailsPhotos from './DetailsPhotos'
import DetailsScores from './DetailsScores'
import messages from './messages'

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

    return (
      <Grid container>
        <Grid item xs={12} sm={6}>
          <DetailsPhotos photos={this.props.venue.photos} />
          <DetailsInfo
            address={this.props.venue.address}
            formattedPhone={this.props.venue.formattedPhone}
            internationalPhone={this.props.venue.internationalPhone}
            website={this.props.venue.website}
            name={this.props.venue.name}
            formattedAddReview={formatMessage(messages.createReviewButton)}
            venueId={this.props.venue.placeId}
          />
          <DetailsScores
            entryScore={this.props.venue.entryScore}
            entryReviews={this.props.venue.entryReviews}
            bathroomScore={this.props.venue.bathroomScore}
            bathroomReviews={this.props.venue.bathroomReviews}
            steps={this.props.venue.steps}
            allowsGuideDog={this.props.venue.allowsGuideDog}
            hasParking={this.props.venue.hasParking}
            hasSecondEntry={this.props.venue.hasSecondEntry}
            hasWellLit={this.props.venue.hasWellLit}
            isQuiet={this.props.venue.isQuiet}
            isSpacious={this.props.venue.isSpacious}
            review={this.props.venue.reviews}
            noReview={formatMessage(messages.reviewUnknownDescription)}
          />
          {/*
          {this.props.venue.reviews && this.props.venue.reviews.length > 0 ? (
            <DetailsReviews reviews={this.props.venue.reviews} />
          ) : (
            <Grid container>
              <Grid item xs={12}>
                <ReviewsWrapper>
                  <Description>
                    {formatMessage(messages.reviewUnknownDescription)}
                  </Description>
                 
                  <LinkButtonWrapper
                    to={`/venues/${this.props.venue.placeId}/review`}
                    disabled={false}
                    float
                  >
                    <LinkButtonContent>
                      <p>{formatMessage(messages.createReviewButton)}</p>
                    </LinkButtonContent>
                  </LinkButtonWrapper>
                 
                </ReviewsWrapper>
              </Grid>
            </Grid>
          )} */}
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
