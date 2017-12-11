import InfoBox from 'react-google-maps/lib/components/addons/InfoBox'
import PropTypes from 'prop-types'
import React from 'react'
import { intlShape } from 'react-intl'
import styled from 'styled-components'

import Icon from '../Icon'
import LinkButton from '../LinkButton'
import { colors } from '../../styles'

import messages from './messages'

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

const IconMarker = styled.div`
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

const ScoreWrapper = styled.div`
  display: flex;

  align-items: center;
  justify-content: center;

  margin-bottom: 0.5rem;
  width: 100%;
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

const LinksWrapper = styled.div`
  display: flex;

  align-items: center;
  justify-content: space-between;

  margin-top: 0.5rem;
  width: 100%;
`

const LinkContent = styled.div`
  display: flex;

  align-items: center;
  justify-content: center;

  height: 100%;
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

const Popup = (props, context) => {
  let entryScoreIcon = (
    <ScoreIcon>
      <Icon glyph="entry" size={1.5} />
    </ScoreIcon>
  )
  if (props.entryScore >= 1 && props.entryScore < 3)
    entryScoreIcon = (
      <ScoreIcon backgroundColor={colors.alert}>
        <Icon glyph="entry" size={1.5} />
      </ScoreIcon>
    )
  if (props.entryScore >= 3 && props.entryScore < 4)
    entryScoreIcon = (
      <ScoreIcon backgroundColor={colors.warning}>
        <Icon glyph="entry" size={1.5} />
      </ScoreIcon>
    )
  if (props.entryScore >= 4 && props.entryScore <= 5)
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
  if (props.bathroomScore >= 1 && props.bathroomScore < 3)
    bathroomScoreIcon = (
      <ScoreIcon backgroundColor={colors.alert}>
        <Icon glyph="bathroom" size={1.5} />
      </ScoreIcon>
    )
  if (props.bathroomScore >= 3 && props.bathroomScore < 4)
    bathroomScoreIcon = (
      <ScoreIcon backgroundColor={colors.warning}>
        <Icon glyph="bathroom" size={1.5} />
      </ScoreIcon>
    )
  if (props.bathroomScore >= 4 && props.bathroomScore <= 5)
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
            <IconMarker
              backgroundImage={props.icon.url}
              backgroundColor={props.icon.background}
            />
          )}
          <Info>
            <Name>{props.name}</Name>

            <ScoreWrapper>
              {entryScoreIcon}
              {entryScoreStars}
            </ScoreWrapper>
            <ScoreWrapper>
              {bathroomScoreIcon}
              {bathroomScoreStars}
            </ScoreWrapper>

            <LinksWrapper>
              <LinkButton
                to={`/venues/${props.placeId}`}
                backgroundColor={colors.lightGrey}
                disabled={props.sendingRequest}
              >
                <LinkContent>
                  <p style={{ margin: 0, fontSize: '1rem' }}>
                    {context.intl.formatMessage(messages.popupDetailsLink)}
                  </p>
                </LinkContent>
              </LinkButton>

              <LinkButton
                to={`/venues/${props.placeId}/review`}
                backgroundColor={colors.primary}
                disabled={props.sendingRequest}
              >
                <LinkContent>
                  <p style={{ margin: 0, fontSize: '1rem' }}>
                    {context.intl.formatMessage(messages.popupReviewLink)}
                  </p>
                </LinkContent>
              </LinkButton>
            </LinksWrapper>
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
  bathroomScore: PropTypes.number,
  placeId: PropTypes.string.isRequired,
  sendingRequest: PropTypes.bool.isRequired
}

Popup.defaultProps = {
  photo: '',
  entryScore: 0,
  bathroomScore: 0
}

Popup.contextTypes = {
  intl: intlShape
}

export default Popup
