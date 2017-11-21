import InfoBox from 'react-google-maps/lib/components/addons/InfoBox'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import bathroomIcon from '../../images/bathroom.png'
import bathroomAverageIcon from '../../images/bathroom-average.png'
import bathroomBadIcon from '../../images/bathroom-bad.png'
import bathroomGoodIcon from '../../images/bathroom-good.png'
import Button from '../Button'
import entryIcon from '../../images/entry.png'
import entryAverageIcon from '../../images/entry-average.png'
import entryBadIcon from '../../images/entry-bad.png'
import entryGoodIcon from '../../images/entry-good.png'
import greyStarIcon from '../../images/grey-star.svg'
import { colors } from '../../styles'
import yellowStarIcon from '../../images/yellow-star.svg'

const Wrapper = styled.div`
  display: flex;

  align-items: center;
  flex-direction: column;
  justify-content: center;

  height: 22rem;
  width: 15rem;
`

const Content = styled.div`
  display: flex;

  flex-direction: column;
  flex-grow: 1;

  border-bottom-right-radius: 3px;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  height: inherit;
  width: inherit;

  background-color: white;
`

const Photo = styled.div`
  flex-grow: 1;

  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  width: 100%;

  background-image: ${props => `url("${props.backgroundImage}")`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`

const Icon = styled.div`
  flex-grow: 1;

  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  width: 100%;

  background: ${props =>
    `${colors[props.backgroundColor]} url("${props.backgroundImage}")`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: 4rem;
`

const Info = styled.div`
  display: flex;

  flex-direction: column;
  justify-content: center;

  height: 12rem;
  padding: 0.5rem;
`

const Name = styled.h2`
  overflow: hidden;

  margin: 0 0 0.5rem 0;

  color: ${colors.darkestGrey};
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const Score = styled.div`
  display: flex;

  align-items: center;
  justify-content: center;

  margin-bottom: 0.5rem;
  width: 100%;
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

  align-items: center;
  justify-content: center;

  margin-top: 0.5rem;
  width: 100%;
`

const Arrow = styled.div`
  align-self: flex-start;

  border: 0.5rem solid;
  border-color: white transparent transparent white;
  height: 0;
  margin-top: -1px;
  width: 0;

  content: ' ';
`

const Popup = props => {
  let entryScoreIcon = entryIcon
  if (props.entryScore >= 1 && props.entryScore < 3)
    entryScoreIcon = entryBadIcon
  if (props.entryScore >= 3 && props.entryScore < 4)
    entryScoreIcon = entryAverageIcon
  if (props.entryScore >= 4 && props.entryScore <= 5)
    entryScoreIcon = entryGoodIcon

  let bathroomScoreIcon = bathroomIcon
  if (props.bathroomScore >= 1 && props.bathroomScore < 3)
    bathroomScoreIcon = bathroomBadIcon
  if (props.bathroomScore >= 3 && props.bathroomScore < 4)
    bathroomScoreIcon = bathroomAverageIcon
  if (props.bathroomScore >= 4 && props.bathroomScore <= 5)
    bathroomScoreIcon = bathroomGoodIcon

  const maxScore = 5
  const entryScoreStars = []
  const bathroomScoreStars = []
  for (let i = 1; i <= maxScore; i += 1) {
    const YellowStar = (
      <ScoreStar key={i} active src={yellowStarIcon} alt="Yellow star icon" />
    )
    const GreyStar = (
      <ScoreStar key={i} src={greyStarIcon} alt="Grey star icon" />
    )

    if (Math.floor(props.entryScore) >= i) {
      entryScoreStars.push(YellowStar)
    } else {
      entryScoreStars.push(GreyStar)
    }

    if (Math.floor(props.bathroomScore) >= i) {
      bathroomScoreStars.push(YellowStar)
    } else {
      bathroomScoreStars.push(GreyStar)
    }
  }

  return (
    <InfoBox
      position={new props.GoogleLatLng(props.location.lat, props.location.lng)}
      options={{
        closeBoxURL: '',
        enableEventPropagation: false,
        alignBottom: true,
        pixelOffset: new props.GoogleSize(0, -52),
        infoBoxClearance: new props.GoogleSize(20, 20)
      }}
    >
      <Wrapper>
        <Content>
          {props.photo ? (
            <Photo backgroundImage={props.photo} />
          ) : (
            <Icon
              backgroundImage={props.icon.url}
              backgroundColor={props.icon.background}
            />
          )}
          <Info>
            <Name>{props.name}</Name>

            <Score>
              <ScoreImage src={entryScoreIcon} />
              {entryScoreStars}
            </Score>
            <Score>
              <ScoreImage src={bathroomScoreIcon} />
              {bathroomScoreStars}
            </Score>

            <ButtonsWrapper>
              <Button
                borderRadius="3px 0 0 3px"
                backgroundColor={colors.lightestGrey}
                fontSize="0.8rem"
              >
                Details
              </Button>

              <Button
                borderRadius="0 3px 3px 0"
                backgroundColor={colors.primary}
                fontSize="0.8rem"
              >
                Review
              </Button>
            </ButtonsWrapper>
          </Info>
        </Content>
        <Arrow />
      </Wrapper>
    </InfoBox>
  )
}

Popup.propTypes = {
  GoogleLatLng: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  GoogleSize: PropTypes.func.isRequired,
  photo: PropTypes.string,
  icon: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  entryScore: PropTypes.number,
  bathroomScore: PropTypes.number
}

Popup.defaultProps = {
  photo: '',
  entryScore: 0,
  bathroomScore: 0
}

export default Popup
