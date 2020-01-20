import InfoBox from 'react-google-maps/lib/components/addons/InfoBox'
import PropTypes from 'prop-types'
import React from 'react'
import { intlShape } from 'react-intl'
import styled from 'styled-components'
import Grid from '@material-ui/core/Grid'

import Icon from '../Icon'
import LinkButton from '../LinkButton'
import { colors, fonts, fontSize, fontWeight } from '../../styles'

import messages from './messages'
import { transform } from '@babel/core'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  height: 17rem;
  width: 16rem;
`

const Content = styled.div`
  display: block;
  position: relative;
  border-bottom-right-radius: 3px;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  height: inherit;
  width: inherit;
  background-color: white;
  padding: 15px 15px 10px 15px;
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
  margin: 15px 0 20px 0;
  color: ${colors.black};
  font-size: ${fontSize.sm};
  font-family: ${fonts.primary} !name;
  font-weight: ${fontWeight.bold};
  text-align: left;
  display: block;
  position: relative
  width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0;
`

const Address = styled.address`
  overflow: hidden;
  margin: 0;
  padding: 0 0 10px 0;
  color: ${colors.darkestGrey};
  font-size: ${fontSize.xs};
  font-family: ${fonts.primary};
  font-weight: ${fontWeight.medium};
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const ScoreWrapper = styled.div`
  display: block;
  position: relative;
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-bottom: 0;
`

const ScoreIcon = styled.div`
  display: block;
  align-items: center;
  justify-content: center;
  border: 1px solid #e3e1e0;
  height: 54px;
  width: 100%;
  background-color: ${props => props.backgroundColor || colors.white};
  color: ${props => props.textColor || colors.buttonColor};
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
const ScoreHeader = styled.div`
  align-self: flex-start;
  display: block;
  position: relative;
  background-color: ${colors.black};
  color: ${colors.white};
  text-transform: uppercase;
  font-family: ${fonts.primary};
  font-weight: ${fontWeight.bold};
  font-size: ${fontSize.xxs};
  text-align: center;
  padding: 5px;
  border: 1px solid black;
`

const ScoreMessageDescription = styled.div`
  display: block;
  position: relative;
  padding: 10px 0;
  font-family: ${fonts.primary};
  font-weight: ${fontWeight.medium};
  font-size: ${fontSize.xxs};
  text-align: center;
`

const Popup = (props, context) => {
  let entryScoreIcon = (
    <ScoreIcon>
      <Icon
        glyph="entrylg"
        size={2}
        alt="Entrance"
        color={colors.buttonColor}
        style={{ margin: '14% auto', display: 'block' }}
      />
    </ScoreIcon>
  )
  if (props.entryScore >= 1 && props.entryScore < 3)
    entryScoreIcon = (
      <ScoreIcon backgroundColor={colors.ratingAlert} textColor={colors.black}>
        <Icon
          glyph="entrylg"
          size={2}
          className="fill-current text-black"
          color={colors.black}
          style={{ margin: '14% auto', display: 'block' }}
          alt="Entrance"
        />
      </ScoreIcon>
    )
  if (props.entryScore >= 3 && props.entryScore < 4)
    entryScoreIcon = (
      <ScoreIcon
        backgroundColor={colors.ratingCaution}
        textColor={colors.black}
      >
        <Icon
          glyph="entrylg"
          size={2}
          className="fill-current text-black"
          color={colors.black}
          style={{ margin: '14% auto', display: 'block' }}
          alt="Entrance"
        />
      </ScoreIcon>
    )
  if (props.entryScore >= 4 && props.entryScore <= 5)
    entryScoreIcon = (
      <ScoreIcon
        backgroundColor={colors.ratingAccessible}
        textColor={colors.black}
      >
        <Icon
          glyph="entrylg"
          size={2}
          className="fill-current text-black"
          color={colors.black}
          style={{ margin: '14% auto', display: 'block' }}
          alt="Entrance"
        />
      </ScoreIcon>
    )

  let scoreDetails = (
    <ScoreMessageDescription>
      {context.intl.formatMessage(messages.scoreDefaultMessage)}
    </ScoreMessageDescription>
  )
  if (
    props.entryScore === 0 &&
    props.bathroomScore === 0 &&
    props.interiorScore === 0
  )
    scoreDetails = (
      <ScoreMessageDescription>
        {context.intl.formatMessage(messages.scoreDefaultMessage)}
      </ScoreMessageDescription>
    )
  if (
    props.entryScore > 0 ||
    props.bathroomScore > 0 ||
    props.interiorScore > 0
  )
    scoreDetails = (
      <ScoreMessageDescription>
        <LinkButton
          to={`/venues/${props.placeId}`}
          backgroundColor={colors.white}
          disabled={props.sendingRequest}
          className="text-link no-pad"
          style={{
            'text-transform': 'none',
            'font-size': '8px',
            'font-weight': 'normal',
            height: 'auto'
          }}
        >
          {context.intl.formatMessage(messages.scoreDetailsMessage)}
        </LinkButton>
      </ScoreMessageDescription>
    )

  let bathroomScoreIcon = (
    <ScoreIcon>
      <Icon
        glyph="restroom"
        size={2}
        style={{ margin: '14% auto', display: 'block' }}
        alt="Restroom"
        color={colors.buttonColor}
      />
    </ScoreIcon>
  )
  if (props.bathroomScore >= 1 && props.bathroomScore < 3)
    bathroomScoreIcon = (
      <ScoreIcon backgroundColor={colors.ratingAlert}>
        <Icon
          glyph="restroom"
          size={2}
          style={{ margin: '14% auto', display: 'block' }}
          className="fill-current text-black"
          color={colors.black}
          alt="Restroom"
        />
      </ScoreIcon>
    )
  if (props.bathroomScore >= 3 && props.bathroomScore < 4)
    bathroomScoreIcon = (
      <ScoreIcon backgroundColor={colors.ratingCaution}>
        <Icon
          glyph="restroom"
          size={2}
          className="fill-current text-black"
          color={colors.black}
          alt="Restroom"
          style={{ margin: '14% auto', display: 'block' }}
        />
      </ScoreIcon>
    )
  if (props.bathroomScore >= 4 && props.bathroomScore <= 5)
    bathroomScoreIcon = (
      <ScoreIcon backgroundColor={colors.ratingAccessible}>
        <Icon
          glyph="restroom"
          size={2}
          className="fill-current text-black"
          color={colors.black}
          alt="Restroom"
          style={{ margin: '14% auto', display: 'block' }}
        />
      </ScoreIcon>
    )

  let stepsScoreIcon = (
    <ScoreIcon>
      <Icon
        glyph="interior"
        size={2.5}
        alt="Interior"
        color={colors.buttonColor}
        style={{ margin: '14% auto', display: 'block' }}
      />
    </ScoreIcon>
  )

  if (props.interiorScore === 1) {
    stepsScoreIcon = (
      <ScoreIcon
        backgroundColor={colors.ratingAccessible}
        className="score_accessible "
      >
        <Icon
          glyph="interior"
          size={2.5}
          className="fill-current text-black"
          color={colors.black}
          alt="Interior"
          style={{ margin: '14% auto', display: 'block' }}
        />
      </ScoreIcon>
    )
  } else if (props.interiorScore === 2) {
    stepsScoreIcon = (
      <ScoreIcon
        backgroundColor={colors.ratingCaution}
        className="score_caution"
      >
        <Icon
          glyph="interior"
          size={2.5}
          className="fill-current text-black"
          color={colors.black}
          alt="Interior"
          style={{ margin: '14% auto', display: 'block' }}
        />
      </ScoreIcon>
    )
  } else if (props.interiorScore > 2) {
    stepsScoreIcon = (
      <ScoreIcon backgroundColor={colors.ratingAlert} className="score_alert">
        <Icon
          glyph="interior"
          size={2.5}
          className="fill-current text-black"
          color={colors.black}
          alt="Interior"
          style={{ margin: '14% auto', display: 'block' }}
        />
      </ScoreIcon>
    )
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
          <Info>
            <LinkButton
              to={`/venues/${props.placeId}`}
              backgroundColor={colors.white}
              disabled={props.sendingRequest}
              className="text-link no-pad"
            >
              <Name>{props.name}</Name>
            </LinkButton>
            <Address>{props.address}</Address>

            <Grid container>
              <Grid item xs>
                <ScoreHeader>
                  {context.intl.formatMessage(messages.entrance)}
                </ScoreHeader>
                <ScoreWrapper>{entryScoreIcon}</ScoreWrapper>
              </Grid>
              <Grid item xs>
                <ScoreHeader>
                  {context.intl.formatMessage(messages.interior)}
                </ScoreHeader>
                <ScoreWrapper>{stepsScoreIcon}</ScoreWrapper>
              </Grid>
              <Grid item xs>
                <ScoreHeader>
                  {context.intl.formatMessage(messages.restroom)}
                </ScoreHeader>
                <ScoreWrapper>{bathroomScoreIcon}</ScoreWrapper>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12}>
                {scoreDetails}
              </Grid>
            </Grid>

            <LinksWrapper>
              <LinkButton
                to={`/venues/${props.placeId}/review`}
                backgroundColor={colors.primary}
                style={{ margin: '5px auto 0px auto' }}
                disabled={props.sendingRequest}
                className="primary-btn is-full"
              >
                <LinkContent>
                  <p>{context.intl.formatMessage(messages.popupReviewLink)}</p>
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
  name: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  entryScore: PropTypes.number,
  interiorScore: PropTypes.number,
  bathroomScore: PropTypes.number,
  placeId: PropTypes.string.isRequired,
  sendingRequest: PropTypes.bool.isRequired
}

Popup.defaultProps = {
  entryScore: 0,
  interiorScore: 0,
  bathroomScore: 0
}

Popup.contextTypes = {
  intl: intlShape
}

export default Popup
