import { object, number, string, func } from 'prop-types'
import React from 'react'
import { intlShape } from 'react-intl'
import Grid from 'styled-components-grid'

import DetailsInfo from './DetailsInfo'
import DetailsMap from './DetailsMap'
import DetailsPhotos from './DetailsPhotos'
import DetailsScores from './DetailsScores'
import messages from './messages'

export default class Details extends React.Component {
  static propTypes = {
    reviewsRatioWeight: number.isRequired,
    generalType: string.isRequired,
    venue: object.isRequired,
    goBackHandler: func.isRequired
  }

  static contextTypes = {
    intl: intlShape
  }

  UNSAFE_componentWillMount() {
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
  }

  render() {
    const { formatMessage } = this.context.intl

    return (
      <Grid className="is-full">
        <Grid.Unit
          size={{ tablet: 1 / 2, desktop: 1 / 2 }}
          className="bg-gray-300"
        >
          <Grid>
            <Grid.Unit
              size={{ mobile: 1 / 1, tablet: 1 / 1, desktop: 8 / 12 }}
              className="bg-white mx-auto my-7 overflow-hidden shadow-outer"
            >
              <DetailsPhotos 
                photos={this.props.venue.photos} 
                goBackHandler={this.props.goBackHandler}
              />
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
                entranceScore={this.props.venue.entranceScore}
                entranceGlyphs={this.props.venue.entranceGlyphs}
                entryReviews={this.props.venue.entryReviews}
                interiorScore={this.props.venue.interiorScore}
                interiorReviews={this.props.venue.interiorReviews}
                interiorGlyphs={this.props.venue.interiorGlyphs}
                restroomScore={this.props.venue.restroomScore}
                restroomGlyphs={this.props.venue.restroomGlyphs}
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
                hasPermanentRamp={this.props.venue.hasPermanentRamp}
                hasPortableRamp={this.props.venue.hasPortableRamp}
                has0Steps={this.props.venue.has0Steps}
                has1Step={this.props.venue.has1Step}
                has2Steps={this.props.venue.has2Steps}
                hasWideEntrance={this.props.venue.hasWideEntrance}
                hasAccessibleTableHeight={
                  this.props.venue.hasAccessibleTableHeight
                }
                hasAccessibleElevator={this.props.venue.hasAccessibleElevator}
                hasInteriorRamp={this.props.venue.hasInteriorRamp}
                hasSwingOutDoor={this.props.venue.hasSwingOutDoor}
                hasLargeStall={this.props.venue.hasLargeStall}
                hasTallSinks={this.props.venue.hasTallSinks}
                hasLoweredSinks={this.props.venue.hasLoweredSinks}
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
            </Grid.Unit>
          </Grid>
        </Grid.Unit>
        <Grid.Unit size={{ tablet: 1 / 2, desktop: 1 / 2 }}>
          <DetailsMap
            reviewsRatioWeight={this.props.venue.mapMarkerScore || 0}
            generalType={this.props.generalType}
            location={this.props.venue.location}
          />
        </Grid.Unit>
      </Grid>
    )
  }
}
