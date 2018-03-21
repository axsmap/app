import { object, number, string } from 'prop-types'
import React from 'react'
import { intlShape } from 'react-intl'
import styled from 'styled-components'

import LinkButton from '../LinkButton'
import Cnt from '../Container'
import Icon from '../Icon'
import { colors, media } from '../../styles'

import DetailsInfo from './DetailsInfo'
import DetailsMap from './DetailsMap'
import DetailsPhotos from './DetailsPhotos'
import DetailsReviews from './DetailsReviews'
import Header from './Header'
import messages from './messages'

const Container = styled(Cnt)`
  justify-content: flex-start;
  padding: 2rem 0 7rem 0;

  ${media.desktop`
    padding: 2rem 0;
  `};
`

const LinkButtonWrapper = styled(LinkButton)`
  bottom: 2rem;
  left: 50%;
  position: fixed;

  transform: translateX(-50%);

  margin: 0 auto;

  ${media.desktop`
    position: static;
    transform: translateX(0%);
    margin-top: 2rem;
  `};
`

const LinkButtonContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
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

    return (
      <Container>
        <Header
          reviewsRatioWeight={this.props.reviewsRatioWeight}
          generalType={this.props.generalType}
          coverPhoto={this.props.venue.coverPhoto}
          name={this.props.venue.name}
        />

        <DetailsInfo
          address={this.props.venue.address}
          formattedPhone={this.props.venue.formattedPhone}
          internationalPhone={this.props.venue.internationalPhone}
          website={this.props.venue.website}
        />

        <DetailsMap
          reviewsRatioWeight={this.props.reviewsRatioWeight}
          generalType={this.props.generalType}
          location={this.props.venue.location}
        />

        <DetailsPhotos DetailsPhotos={this.props.venue.DetailsPhotos} />

        <DetailsReviews
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
        />

        <LinkButtonWrapper
          to={`/venues/${this.props.venue.placeId}/review`}
          disabled={false}
          float
        >
          <LinkButtonContent>
            <Icon
              glyph="cross"
              size={1}
              rotate="45deg"
              color={colors.darkestGrey}
            />
            <p style={{ margin: '0 0 0 0.5rem' }}>
              {formatMessage(messages.createReviewButton)}
            </p>
          </LinkButtonContent>
        </LinkButtonWrapper>
      </Container>
    )
  }
}
