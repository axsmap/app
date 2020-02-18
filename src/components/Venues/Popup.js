import InfoBox from 'react-google-maps/lib/components/addons/InfoBox'
import PropTypes from 'prop-types'
import React from 'react'
import { intlShape } from 'react-intl'
import styled from 'styled-components'
// import Grid from '@material-ui/core/Grid'
import Grid from 'styled-components-grid'

import Icon from '../Icon'
import LinkButton from '../LinkButton'
import { colors, fonts, fontSize, fontWeight, media } from '../../styles'

import messages from './messages'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  height: 19rem;
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
  height: auto;
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
  font-size: ${fontSize.xxxs};
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
  font-size: ${fontSize.xxxs};
  text-align: center;
`

const mainReviewButtonStyles = () => `
display: flex;
opacity: 1;

align-items: center;
justify-content: center;

appearance: none;
border: none;
border-radius: none;
box-shadow: none;
height: 3rem;
margin-right: 0.8rem;
padding: 0;

background-color: transparent;
cursor: pointer;

&:active,
&:focus {
  outline: 2px solid ${colors.secondary};
}

&:disabled,
&[disabled] {
  opacity: 0.5;
}

&:last-of-type {
  margin-right: 0;
}
`

const StepButton = styled.div`
  ${mainReviewButtonStyles};
  width: 100%;
  text-align: center;
  position: absolute !important;
  top: 5% !important;
  left: 7px !important;

  ${media.tablet`
    top: 5% !important;
    left: 7px !important;
  `};

  ${media.desktop`
    top: 5% !important;
    left: 7px !important;
  `};

  ${media.widescreen`
    top: 5% !important;
    left: 7px !important;
  `};

  @media only screen 
  and (min-device-width: 1024px) 
  and (max-device-width: 1366px) 
  and (-webkit-min-device-pixel-ratio: 2) {
    top: 5% !important;
    left: 7px !important;
  }
`

const Popup = (props, context) => {
  const localEntranceGlyphs = props.venue.entranceGlyphs
  let localSeparatedEntranceGlyphs
  try {
    localSeparatedEntranceGlyphs = localEntranceGlyphs.split(',')
  } catch (error) {}

  let entryScoreIcon = (
    <ScoreIcon>
    <span className="_hide-visual">{context.intl.formatMessage(messages.noEntryDetailsRate)}</span>
      <Icon
        glyph="entrylg"
        size={2}
        alt="Entrance"
        color={colors.buttonColor}
        style={{ margin: '14% auto', display: 'block' }}
      />
    </ScoreIcon>
  )
  if (props.entranceScore === 1 && props.entranceScore < 3)
    entryScoreIcon = (
      <ScoreIcon backgroundColor={colors.ratingAlert} textColor={colors.black}>
      <span className="_hide-visual">{context.intl.formatMessage(messages.noEntryDetailsAlertMessage)}</span>
        {props.venue.entranceGlyphs.startsWith('steps') ? (
          <div className="mx-auto block text-center">
            <Icon
                glyph="steps"
                size={2}
                className="fill-current text-black"
                color={colors.black}
                alt="Entrance"
                style={{ margin: '14% auto', display: 'block' }}
              />
              <StepButton disabled={false}>
                <Icon
                  glyph={localSeparatedEntranceGlyphs[1]}
                  size={1}
                  color={colors.white}
                />
              </StepButton>
          </div>
        ) : (
        <Icon
          glyph={props.venue.entranceGlyphs}
          size={2}
          className="fill-current text-black"
          color={colors.black}
          style={{ margin: '14% auto', display: 'block' }}
          alt="Entrance"
        />
        )}
      </ScoreIcon>
    )
  if (props.entranceScore >= 3 && props.entranceScore < 5)
    entryScoreIcon = (
      <ScoreIcon
        backgroundColor={colors.ratingCaution}
        textColor={colors.black}
      >
      <span className="_hide-visual">{context.intl.formatMessage(messages.noEntryDetailsCautionMessage)}</span>
      {props.venue.entranceGlyphs.startsWith('steps') ? (
        <div className="mx-auto block text-center">
          <Icon
              glyph="steps"
              size={2}
              className="fill-current text-black"
              color={colors.black}
              alt="Entrance"
              style={{ margin: '14% auto', display: 'block' }}
            />
            <StepButton disabled={false}>
              <Icon
                glyph={localSeparatedEntranceGlyphs[1]}
                size={1}
                color={colors.white}
              />
            </StepButton>
        </div>
      ) : (
      <Icon
        glyph={props.venue.entranceGlyphs}
        size={2}
        className="fill-current text-black"
        color={colors.black}
        style={{ margin: '14% auto', display: 'block' }}
        alt="Entrance"
      />
      )}
      </ScoreIcon>
    )
  if (props.entranceScore >= 5)
    entryScoreIcon = (
      <ScoreIcon
        backgroundColor={colors.ratingAccessible}
        textColor={colors.black}
      >
      <span className="_hide-visual">{context.intl.formatMessage(messages.noEntryDetailsAccessibleMessage)}</span>
      {props.venue.entranceGlyphs.startsWith('steps') ? (
        <div className="mx-auto block text-center">
          <Icon
              glyph="steps"
              size={2}
              className="fill-current text-black"
              color={colors.black}
              alt="Entrance"
              style={{ margin: '14% auto', display: 'block' }}
            />
            <StepButton disabled={false}>
              <Icon
                glyph={localSeparatedEntranceGlyphs[1]}
                size={1}
                color={colors.white}
              />
            </StepButton>
        </div>
      ) : (
      <Icon
        glyph={props.venue.entranceGlyphs}
        size={2}
        className="fill-current text-black"
        color={colors.black}
        style={{ margin: '14% auto', display: 'block' }}
        alt="Entrance"
      />
      )}
      </ScoreIcon>
    )

  let scoreDetails = (
    <ScoreMessageDescription>
      {context.intl.formatMessage(messages.scoreDefaultMessage)}
    </ScoreMessageDescription>
  )
  if (
    props.entranceScore === 0 &&
    props.restroomScore === 0 &&
    props.interiorScore === 0
  )
    scoreDetails = (
      <ScoreMessageDescription>
        {context.intl.formatMessage(messages.scoreDefaultMessage)}
      </ScoreMessageDescription>
    )
  if (
    props.entranceScore > 0 ||
    props.restroomScore > 0 ||
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
            fontSize: '8px',
            fontWeight: 'normal',
            height: 'auto'
          }}
        >
          {context.intl.formatMessage(messages.scoreDetailsMessage)}
        </LinkButton>
      </ScoreMessageDescription>
    )

  let bathroomScoreIcon = (
    <ScoreIcon>
    <span className="_hide-visual">{context.intl.formatMessage(messages.noRestroomDetailsRate)}</span>
      <Icon
        glyph="restroom"
        size={2}
        style={{ margin: '14% auto', display: 'block' }}
        alt="Restroom"
        color={colors.buttonColor}
      />
    </ScoreIcon>
  )
  if (props.restroomScore === 1 && props.restroomScore < 3)
    bathroomScoreIcon = (
      <ScoreIcon backgroundColor={colors.ratingAlert}>
      <span className="_hide-visual">{context.intl.formatMessage(messages.noRestroomDetailsAlertMessage)}</span>
        <Icon
          glyph={props.venue.restroomGlyphs}
          size={2}
          style={{ margin: '14% auto', display: 'block' }}
          className="fill-current text-black"
          color={colors.black}
          alt="Restroom"
        />
      </ScoreIcon>
    )
  if (props.restroomScore >= 3 && props.restroomScore < 5)
    bathroomScoreIcon = (
      <ScoreIcon backgroundColor={colors.ratingCaution}>
      <span className="_hide-visual">{context.intl.formatMessage(messages.noRestroomDetailsCautionMessage)}</span>
        <Icon
          glyph={props.venue.restroomGlyphs}
          size={2}
          className="fill-current text-black"
          color={colors.black}
          alt="Restroom"
          style={{ margin: '14% auto', display: 'block' }}
        />
      </ScoreIcon>
    )
  if (props.restroomScore >= 5)
    bathroomScoreIcon = (
      <ScoreIcon backgroundColor={colors.ratingAccessible}>
      <span className="_hide-visual">{context.intl.formatMessage(messages.noRestroomDetailsAccessibleMessage)}</span>
        <Icon
          glyph={props.venue.restroomGlyphs}
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
    <span className="_hide-visual">{context.intl.formatMessage(messages.noInteriorDetailsRate)}</span>
      <Icon
        glyph="interior"
        size={2.5}
        alt="Interior"
        color={colors.buttonColor}
        style={{ margin: '14% auto', display: 'block' }}
      />
    </ScoreIcon>
  )

  if (props.venue.interiorScore === 1 && props.venue.interiorScore < 3) 
  {
    stepsScoreIcon = (
      <ScoreIcon backgroundColor={colors.ratingAlert} className="score_alert ">
      <span className="_hide-visual">{context.intl.formatMessage(messages.noInteriorDetailsAlertMessage)}</span>
        <Icon
          glyph={props.venue.interiorGlyphs}
          size={2.5}
          className="fill-current text-black"
          color={colors.black}
          alt="Interior"
          style={{ margin: '14% auto', display: 'block' }}
        />
      </ScoreIcon>
    )
  } else if (props.venue.interiorScore >= 3 && props.venue.interiorScore < 5
  ) {
    stepsScoreIcon = (
      <ScoreIcon
        backgroundColor={colors.ratingCaution}
        className="score_caution"
      >
      <span className="_hide-visual">{context.intl.formatMessage(messages.noInteriorDetailsCautionMessage)}</span>
        <Icon
          glyph={props.venue.interiorGlyphs}
          size={2.5}
          className="fill-current text-black"
          color={colors.black}
          alt="Interior"
          style={{ margin: '14% auto', display: 'block' }}
        />
      </ScoreIcon>
    )
  } else if (props.venue.interiorScore >= 5) {
    stepsScoreIcon = (
      <ScoreIcon
        backgroundColor={colors.ratingAccessible}
        className="score_accessible"
      >
      <span className="_hide-visual">{context.intl.formatMessage(messages.noInteriorDetailsAccessibleMessage)}</span>
        <Icon
          glyph={props.venue.interiorGlyphs}
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

            <Grid className="is-full">
              <Grid.Unit
                size={{ mobile: 1 / 3, tablet: 1 / 3, desktop: 1 / 3 }}
              >
                <ScoreHeader>
                  {context.intl.formatMessage(messages.entrance)}
                </ScoreHeader>
                <ScoreWrapper>{entryScoreIcon}</ScoreWrapper>
              </Grid.Unit>
              <Grid.Unit
                size={{ mobile: 1 / 3, tablet: 1 / 3, desktop: 1 / 3 }}
              >
                <ScoreHeader>
                  {context.intl.formatMessage(messages.interior)}
                </ScoreHeader>
                <ScoreWrapper>{stepsScoreIcon}</ScoreWrapper>
              </Grid.Unit>
              <Grid.Unit
                size={{ mobile: 1 / 3, tablet: 1 / 3, desktop: 1 / 3 }}
              >
                <ScoreHeader>
                  {context.intl.formatMessage(messages.restroom)}
                </ScoreHeader>
                <ScoreWrapper>{bathroomScoreIcon}</ScoreWrapper>
              </Grid.Unit>
            </Grid>
            <Grid className="is-full">
              <Grid.Unit
                size={{ mobile: 1 / 1, tablet: 1 / 1, desktop: 1 / 1 }}
              >
                {scoreDetails}
              </Grid.Unit>
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
  entranceScore: PropTypes.number,
  interiorScore: PropTypes.number,
  restroomScore: PropTypes.number,
  placeId: PropTypes.string.isRequired,
  sendingRequest: PropTypes.bool.isRequired,
  venue: PropTypes.object
}

Popup.defaultProps = {
  entranceScore: 0,
  interiorScore: 0,
  restroomScore: 0,
  mapMarkerScore: 0
}

Popup.contextTypes = {
  intl: intlShape
}

export default Popup
