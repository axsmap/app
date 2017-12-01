import { kebabCase } from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'
import { intlShape } from 'react-intl'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import Button from '../Button'
import { venuesCategories } from '../../constants'
import Footer from '../Footer'
import googleBannerImage from '../../images/google-banner.png'
import Icon from '../Icon'
import Spinner from '../Spinner'
import { colors, media } from '../../styles'

import messages from './messages'

const Wrapper = styled.div`
  z-index: ${props => (props.visible ? 20 : -1)};

  display: flex;
  overflow-y: auto;

  align-items: center;
  align-self: flex-start;
  flex-direction: column;
  flex-grow: 1;
  justify-content: space-between;

  width: 100%;

  ${media.desktop`
    bottom: 0;
  `};

  ${media.widescreen`
    z-index: 20;
    width: 50%;
  `};
`

const CardsWrapper = styled.div`
  flex-grow: 1;

  padding: 1rem 1rem 0 1rem;
  width: 100%;

  background-color: ${colors.lightestGrey};

  &::after {
    display: table;
    clear: both;
    content: '';
  }
`

const Card = styled(Link)`
  float: left;

  display: flex;

  align-items: center;
  justify-content: center;

  border-radius: 3px;
  box-shadow: inset 0px 0px 0px 1px ${colors.grey};
  height: 10rem;
  margin-bottom: 1rem;
  margin-right: 0;
  width: 100%;

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

    height: 18rem;
    margin-bottom: 2rem;
    margin-right: 2rem;
    width: calc((100% - 2rem * 3) / 4);

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
  height: inherit;
  width: 30%;

  background-image: ${props => `url("${props.backgroundImage}")`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  ${media.desktop`
    border-radius: 3px 3px 0 0;
    height: 45%;
    width: 100%;
  `};
`

const IconMarker = styled.div`
  border-radius: 3px 0 0 3px;
  height: inherit;
  width: 30%;

  background: ${props =>
    `${colors[props.backgroundColor]} url("${props.backgroundImage}")`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: 3rem;

  ${media.desktop`
    border-radius: 3px 3px 0 0;
    height: 45%;
    width: 100%;
  `};
`

const Info = styled.div`
  display: flex;

  flex-direction: column;
  justify-content: center;

  height: inherit;
  padding: 1rem;
  width: 70%;

  ${media.desktop`
    height: 55%;
    width: 100%;
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

const Address = styled.p`
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

const ScoreWrapper = styled.div`
  display: flex;

  align-items: center;
  justify-content: flex-start;

  margin-bottom: 0.5rem;
  width: 100%;

  ${media.desktop`
    justify-content: center;
  `};
`

const ScoreIcon = styled.div`
  display: flex;

  align-items: center;
  justify-content: center;

  border-radius: 3px;
  height: 2rem;
  margin-right: 1rem;
  width: 2rem;

  background-color: ${props => props.backgroundColor || colors.grey};
`

const ScoreStar = styled(Icon)`
  margin-right: 0.4rem;

  &:last-of-type {
    margin-right: 0;
  }
`

const ButtonsWrapper = styled.div`
  display: flex;

  justify-content: space-between;

  padding: 0 1rem;
  margin-bottom: 1rem;
  width: 100%;

  ${media.tablet`
    justify-content: space-around;
  `};
`

const ButtonContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const ShowFiltersButton = styled(Button)`
  display: none;

  ${media.tablet`
    display: flex;
  `};
`

const ShowMapButton = styled(Button)`
  display: block;

  ${media.widescreen`
    display: none;
  `};
`

const GoogleBanner = styled.img.attrs({
  src: googleBannerImage,
  alt: 'Powered by Google image'
})`
  height: 1.5rem;
  margin-bottom: 1rem;
  width: auto;
`

const List = (props, context) => (
  <Wrapper visible={props.visible}>
    {props.loadingVenues ? (
      <Spinner />
    ) : (
      <CardsWrapper>
        {props.venues.map(venue => {
          let selectedType = 'establishment'
          for (let i = 0; i < venuesCategories.length; i += 1) {
            const types = venuesCategories[i].options
            for (let j = 0; j < types.length; j += 1) {
              const type = venue.types.find(t => t === types[j])
              if (type) {
                selectedType = venuesCategories[i].value
                break
              }
            }

            if (selectedType !== 'establishment') break
          }

          const bathroomScore = venue.bathroomScore
          const entryScore = venue.entryScore

          let averageScore
          if (!bathroomScore && !entryScore) averageScore = 0
          else if (!bathroomScore) averageScore = entryScore
          else if (!entryScore) averageScore = bathroomScore
          else averageScore = (bathroomScore + entryScore) / 2

          let selectedScore = ''
          if (averageScore >= 1 && averageScore < 3) selectedScore = '-bad'
          if (averageScore >= 3 && averageScore < 4) selectedScore = '-average'
          if (averageScore >= 4 && averageScore <= 5) selectedScore = '-good'

          let backgroundIcon = 'primary'
          if (selectedScore === '-bad') backgroundIcon = 'alert'
          if (selectedScore === '-average') backgroundIcon = 'warning'
          if (selectedScore === '-good') backgroundIcon = 'success'
          const venueIcon = {
            url: `https://s3.amazonaws.com/axsmap-media/markers/${kebabCase(
              selectedType
            )}${selectedScore}.svg`,
            background: backgroundIcon
          }

          let entryScoreIcon = (
            <ScoreIcon>
              <Icon glyph="entry" size={1.5} />
            </ScoreIcon>
          )
          if (venue.entryScore >= 1 && venue.entryScore < 3)
            entryScoreIcon = (
              <ScoreIcon backgroundColor={colors.alert}>
                <Icon glyph="entry" size={1.5} />
              </ScoreIcon>
            )
          if (venue.entryScore >= 3 && venue.entryScore < 4)
            entryScoreIcon = (
              <ScoreIcon backgroundColor={colors.warning}>
                <Icon glyph="entry" size={1.5} />
              </ScoreIcon>
            )
          if (venue.entryScore >= 4 && venue.entryScore <= 5)
            entryScoreIcon = (
              <ScoreIcon backgroundColor={colors.success}>
                <Icon glyph="entry" size={1.5} />
              </ScoreIcon>
            )

          let bathroomScoreIcon = (
            <ScoreIcon>
              <Icon glyph="bathroom" size={1.5} />
            </ScoreIcon>
          )
          if (venue.bathroomScore >= 1 && venue.bathroomScore < 3)
            bathroomScoreIcon = (
              <ScoreIcon backgroundColor={colors.alert}>
                <Icon glyph="bathroom" size={1.5} />
              </ScoreIcon>
            )
          if (venue.bathroomScore >= 3 && venue.bathroomScore < 4)
            bathroomScoreIcon = (
              <ScoreIcon backgroundColor={colors.warning}>
                <Icon glyph="bathroom" size={1.5} />
              </ScoreIcon>
            )
          if (venue.bathroomScore >= 4 && venue.bathroomScore <= 5)
            bathroomScoreIcon = (
              <ScoreIcon backgroundColor={colors.success}>
                <Icon glyph="bathroom" size={1.5} />
              </ScoreIcon>
            )

          const maxScore = 5
          const entryScoreStars = []
          const bathroomScoreStars = []
          for (let i = 1; i <= maxScore; i += 1) {
            const YellowStar = (
              <ScoreStar key={i} glyph="star" size={1} color={colors.primary} />
            )
            const GreyStar = (
              <ScoreStar key={i} glyph="star" size={1} color={colors.grey} />
            )

            if (Math.floor(venue.entryScore) >= i) {
              entryScoreStars.push(YellowStar)
            } else {
              entryScoreStars.push(GreyStar)
            }

            if (Math.floor(venue.bathroomScore) >= i) {
              bathroomScoreStars.push(YellowStar)
            } else {
              bathroomScoreStars.push(GreyStar)
            }
          }

          return (
            <Card
              key={venue.placeId}
              to={`venues/${venue.placeId}`}
              disabled={props.sendingRequest}
              onFocus={props.setCenterLocation(venue.location)}
              onMouseEnter={props.setCenterLocation(venue.location)}
            >
              {venue.photo ? (
                <Photo backgroundImage={venue.photo} />
              ) : (
                <IconMarker
                  backgroundImage={venueIcon.url}
                  backgroundColor={venueIcon.background}
                />
              )}
              <Info>
                <Name>{venue.name}</Name>

                <Address>{venue.address}</Address>

                <ScoreWrapper>
                  {entryScoreIcon}
                  {entryScoreStars}
                </ScoreWrapper>
                <ScoreWrapper>
                  {bathroomScoreIcon}
                  {bathroomScoreStars}
                </ScoreWrapper>
              </Info>
            </Card>
          )
        })}
      </CardsWrapper>
    )}

    <ButtonsWrapper>
      {props.incomingVenues ? (
        <Button
          backgroundColor={colors.primary}
          color={colors.darkestGrey}
          disabled={props.sendingRequest}
          onClickHandler={props.getVenues}
        >
          <ButtonContent>
            <Icon glyph="load" size={1} color={colors.darkestGrey} />
            <p style={{ margin: '0 0 0 0.5rem' }}>
              {context.intl.formatMessage(messages.loadMoreButton)}
            </p>
          </ButtonContent>
        </Button>
      ) : null}
      <ShowFiltersButton
        backgroundColor={colors.lightGrey}
        color={colors.darkestGrey}
        disabled={props.sendingRequest}
        onClickHandler={props.showFilters}
      >
        <ButtonContent>
          <Icon glyph="equalizer" size={1} color={colors.darkestGrey} />
          <p style={{ margin: '0 0 0 0.5rem' }}>
            {context.intl.formatMessage(messages.showFiltersButton)}
          </p>
        </ButtonContent>
      </ShowFiltersButton>
      <ShowMapButton
        backgroundColor={colors.lightGrey}
        color={colors.darkestGrey}
        disabled={props.sendingRequest}
        onClickHandler={props.showMap}
      >
        <ButtonContent>
          <Icon glyph="map" size={1} color={colors.darkestGrey} />
          <p style={{ margin: '0 0 0 0.5rem' }}>
            {context.intl.formatMessage(messages.showMapButton)}
          </p>
        </ButtonContent>
      </ShowMapButton>
    </ButtonsWrapper>

    <GoogleBanner />

    <Footer />
  </Wrapper>
)

List.propTypes = {
  visible: PropTypes.bool.isRequired,
  loadingVenues: PropTypes.bool.isRequired,
  venues: PropTypes.array.isRequired,
  sendingRequest: PropTypes.bool.isRequired,
  incomingVenues: PropTypes.bool.isRequired,
  setCenterLocation: PropTypes.func.isRequired,
  getVenues: PropTypes.func.isRequired,
  showFilters: PropTypes.func.isRequired,
  showMap: PropTypes.func.isRequired
}

List.contextTypes = {
  intl: intlShape
}

export default List
