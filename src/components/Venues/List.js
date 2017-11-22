import { kebabCase } from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'
import { intlShape } from 'react-intl'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import bathroomIcon from '../../images/bathroom.png'
import bathroomAverageIcon from '../../images/bathroom-average.png'
import bathroomBadIcon from '../../images/bathroom-bad.png'
import bathroomGoodIcon from '../../images/bathroom-good.png'
import ButtonIcon from '../ButtonIcon'
import { venuesCategories } from '../../constants'
import entryIcon from '../../images/entry.png'
import entryAverageIcon from '../../images/entry-average.png'
import entryBadIcon from '../../images/entry-bad.png'
import entryGoodIcon from '../../images/entry-good.png'
import Footer from '../Footer'
import googleBannerImage from '../../images/google-banner.png'
import greyStarIcon from '../../images/grey-star.svg'
import loadIcon from '../../images/load.svg'
import mapIcon from '../../images/map.svg'
import { colors, media } from '../../styles'
import yellowStarIcon from '../../images/yellow-star.svg'

import messages from './messages'

const Wrapper = styled.div`
  display: ${props => (props.visible ? 'flex' : 'none')};

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
    display: flex;
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

const Icon = styled.div`
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

const Score = styled.div`
  display: flex;

  align-items: center;
  justify-content: flex-start;

  margin-bottom: 0.5rem;
  width: 100%;

  ${media.desktop`
    justify-content: center;
  `};
`

const ScoreImage = styled.img`
  height: 2rem;
  margin-right: 1rem;
  width: 2rem;
`

const ScoreStar = styled.img`
  height: 1rem;
  margin-right: 0.4rem;
  width: auto;

  &:last-of-type {
    margin-right: 0;
  }
`

const ButtonsWrapper = styled.div`
  display: flex;

  justify-content: space-around;

  padding: 0 1rem;
  margin-bottom: 1rem;
  width: 100%;
`

const ShowMapButton = styled(ButtonIcon)`
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
    <CardsWrapper>
      {props.venues.map(venue => {
        let selectedType = 'establishment'
        for (let i = 0; i < venuesCategories.length; i += 1) {
          const types = venuesCategories[i][Object.keys(venuesCategories[i])[0]]
          for (let j = 0; j < types.length; j += 1) {
            const type = venue.types.find(t => t === types[j])
            if (type) {
              selectedType = Object.keys(venuesCategories[i])
              break
            }
          }

          if (selectedType !== 'establishment') break
        }

        const bathroomScore = venue.bathroomScore || 0
        const entryScore = venue.entryScore || 0
        const averageScore = (bathroomScore + entryScore) / 2
        let selectedScore = ''
        if (averageScore >= 1 && averageScore < 3) selectedScore = '-bad'
        if (averageScore >= 3 && averageScore < 4) selectedScore = '-average'
        if (averageScore >= 4 && averageScore <= 5) selectedScore = -'good'

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

        let entryScoreIcon = entryIcon
        if (venue.entryScore >= 1 && venue.entryScore < 3)
          entryScoreIcon = entryBadIcon
        if (venue.entryScore >= 3 && venue.entryScore < 4)
          entryScoreIcon = entryAverageIcon
        if (venue.entryScore >= 4 && venue.entryScore <= 5)
          entryScoreIcon = entryGoodIcon

        let bathroomScoreIcon = bathroomIcon
        if (venue.bathroomScore >= 1 && venue.bathroomScore < 3)
          bathroomScoreIcon = bathroomBadIcon
        if (venue.bathroomScore >= 3 && venue.bathroomScore < 4)
          bathroomScoreIcon = bathroomAverageIcon
        if (venue.bathroomScore >= 4 && venue.bathroomScore <= 5)
          bathroomScoreIcon = bathroomGoodIcon

        const maxScore = 5
        const entryScoreStars = []
        const bathroomScoreStars = []
        for (let i = 1; i <= maxScore; i += 1) {
          const YellowStar = (
            <ScoreStar
              key={i}
              active
              src={yellowStarIcon}
              alt="Yellow star icon"
            />
          )
          const GreyStar = (
            <ScoreStar key={i} src={greyStarIcon} alt="Grey star icon" />
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
              <Icon
                backgroundImage={venueIcon.url}
                backgroundColor={venueIcon.background}
              />
            )}
            <Info>
              <Name>{venue.name}</Name>

              <Address>{venue.address}</Address>

              <Score>
                <ScoreImage src={entryScoreIcon} />
                {entryScoreStars}
              </Score>
              <Score>
                <ScoreImage src={bathroomScoreIcon} />
                {bathroomScoreStars}
              </Score>
            </Info>
          </Card>
        )
      })}
    </CardsWrapper>

    <ButtonsWrapper>
      <ButtonIcon
        backgroundColor={colors.primary}
        color={colors.darkestGrey}
        disabled={props.sendingRequest}
        text={context.intl.formatMessage(messages.loadMoreButton)}
        icon={loadIcon}
        onClickHandler={props.loadMore}
      />
      <ShowMapButton
        backgroundColor={colors.lightGrey}
        color={colors.darkestGrey}
        disabled={props.sendingRequest}
        text={context.intl.formatMessage(messages.showMapButton)}
        icon={mapIcon}
        onClickHandler={props.showMap}
      />
    </ButtonsWrapper>

    <GoogleBanner />

    <Footer />
  </Wrapper>
)

List.propTypes = {
  visible: PropTypes.bool.isRequired,
  venues: PropTypes.array.isRequired,
  sendingRequest: PropTypes.bool.isRequired,
  setCenterLocation: PropTypes.func.isRequired,
  loadMore: PropTypes.func.isRequired,
  showMap: PropTypes.func.isRequired
}

List.contextTypes = {
  intl: intlShape
}

export default List
