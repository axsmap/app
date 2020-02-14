import { kebabCase } from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'
import { intlShape } from 'react-intl'
import styled from 'styled-components'
import Grid from 'styled-components-grid'
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel
} from 'react-accessible-accordion'

import Button from '../Button'
import Footer from '../Footer'
import googleBannerImage from '../../images/google-banner.png'
import Icon from '../Icon'
import Spinner from '../Spinner'
import { colors, media, fontSize, fontWeight, fonts } from '../../styles'
import { getGeneralType } from '../../utilities'
import LinkButton from '../LinkButton'

import messages from './messages'

const Wrapper = styled.div`
  position: relative;
  z-index: ${props => (props.visible ? 20 : -1)};
  display: flex;
  overflow-y: auto;
  align-items: center;
  align-self: flex-start;
  flex-direction: column;
  flex-grow: 1;
  justify-content: space-between;
  width: 100%;

  ${media.tablet`
    z-index: ${props => (props.visible ? 20 : -1)};
    width: 100%;
  `};

  ${media.desktop`
    z-index: 20;
    width: 60%;
    bottom: 0;
  `};

  ${media.widescreen`
    z-index: 20;
    width: 43%;
  `};

  @media only screen and (min-device-width: 1024px) and (max-device-width: 1366px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait) {
    z-index: ${props => (props.visible ? 20 : -1)};
    width: 100%;
  }

  @media only screen and (min-device-width: 1024px) and (max-device-width: 1366px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: landscape) {
    z-index: 22;
    width: 55%;
  }

  @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: landscape) {
    z-index: ${props => (props.visible ? 20 : -1)};
    width: 100%;
  }
`

const CardsWrapper = styled.div`
  flex-grow: 1;
  border-top: 1px solid #cfcecf;
  padding: 0 0 20px 0;
  width: 100%;
  background-color: ${colors.lightestGrey};

  &::after {
    display: table;
    clear: both;
    content: '';
  }

  ${media.tablet`
    padding: 20px 20px 0 20px;
  `};

  ${media.desktop`
    padding: 20px 30px 0 30px;
  `};

  ${media.widescreen`
    padding: 20px 40px 0 40px;
  `};

  @media only screen and (min-device-width: 1024px) and (max-device-width: 1366px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: landscape) {
    padding: 20px 25px 0 25px;
  }

  @media only screen and (min-device-width: 1024px) and (max-device-width: 1366px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait) {
    padding: 20px 25px 40px 25px;
  }
`

const Card = styled.div`
  float: left;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ebecec;
  height: 10rem;
  margin-bottom: 0;
  margin-right: 0;
  width: 100%;
  background-color: white;
  overflow: hidden;

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
    margin-bottom: 25px;
    margin-right: 25px;
    width: calc((100% - 3rem * 1) / 2);

    &:nth-child(2n+2) {
      float: left;
      margin-right: 0;
    }
  `};

  ${media.widescreen`
    margin-bottom: 2rem;
    margin-right: 2rem;
    width: calc((100% - 2rem * 1) / 2);

    &:nth-child(2n+2) {
      float: left;
      margin-right: 0;
    }
  `};

  @media only screen and (min-device-width: 1024px) and (max-device-width: 1366px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait) {
    flex-direction: column;
    height: 11.75rem;
    margin-bottom: 25px;
    margin-right: 25px;
    width: calc((100% - 3rem * 1) / 2);

    &:nth-child(2n + 2) {
      float: left;
      margin-right: 0;
    }
  }

  @media only screen and (min-device-width: 1024px) and (max-device-width: 1366px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: landscape) {
    flex-direction: column;
    height: 18rem;
    margin-bottom: 25px;
    margin-right: 25px;
    width: calc((100% - 3rem * 1) / 2);

    &:nth-child(2n + 2) {
      float: left;
      margin-right: 0;
    }
  }
`

const Photo = styled.div`
  height: inherit;
  width: 100%;
  background-image: ${props => `url("${props.backgroundImage}")`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  ${media.desktop`
    height: 180px;
    width: 100%;
  `};
`

const IconMarker = styled.div`
  height: inherit;
  width: 100%;
  background: ${props =>
    `${colors[props.backgroundColor]} url("${props.backgroundImage}")`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: 3rem;

  ${media.desktop`
    height: 180px;
    width: 100%;
  `};
`

const Info = styled.div`
  display: block;
  position: relative;
  width: 100%;
  height: inherit;
  padding: 12px 14px;

  ${media.tablet`
    padding: 15px 12px;
  `};

  ${media.desktop`
    padding: 1rem;
  `};
`

const Name = styled.h2`
  overflow: hidden;
  display: block;
  position: relative;
  width: 100%;
  text-align: left !important;
  font-size: ${fontSize.sm} !Important;
  font-weight: ${fontWeight.bold};
  font-family: ${fonts.primary} !important;
  color: ${colors.darkestGrey};
  margin-top: 0 !Important;
  margin-bottom: 15px;
  line-height: 1.25;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  ${media.desktop`
    font-size: ${fontSize.sm} !Important;
    margin-top: 0 !Important;
    margin-bottom: 10px;
  `};
`

const Address = styled.p`
  margin: 0 0 0.5rem 0;
  font-family: ${fonts.primary} !important;
  color: ${colors.textColorLight};
  font-weight: ${fontWeight.medium};
  font-size: 11px;
  text-overflow: ellipsis;
  white-space: pre-wrap;
  text-align: left !important;

  ${media.tablet`
    font-size: 11px;
  `};

  ${media.desktop`
    min-height: 52px;
    margin: 0;
    font-size: ${fontSize.xs} !Important;
  `};
`

// const Hours = styled.p`
//   font-family: ${fonts.primary} !important;
//   color: ${colors.textColorLight};
//   font-weight: ${fontWeight.medium};
//   font-size: 11px;
//   text-align: left !important;
//   margin-bottom: 0;

//   ${media.desktop`
//     min-height: 20px;
//     margin-top: 5px;
//     font-size: ${fontSize.xs} !Important;
//   `};
// `

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

const ScoreHeader = styled.div`
  display: block;
  text-align: center;
  text-transform: uppercase;
  color: ${colors.white};
  background-color: ${colors.textColor};
  font-weight: ${fontWeight.bold};
  font-size: 8px;
  font-family: ${fonts.primary};

  ${media.tablet`
    font-size: 8px;
  `};

  ${media.desktop`
    font-size: ${fontSize.xxxs};
  `};

  @media only screen and (min-device-width: 1024px) and (max-device-width: 1366px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait) {
    padding-top: 4px;
    padding-bottom: 4px;
  }

  @media only screen and (min-device-width: 1024px) and (max-device-width: 1366px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: landscape) {
    padding-top: 4px;
    padding-bottom: 4px;
  }
`

const ScoreIcon = styled.div`
  display: block;
  position: relative;
  text-align: center;
  height: 61px;
  width: 100%;
  background-color: ${props => props.backgroundColor || colors.white};
  color: ${props => props.textColor || colors.buttonColor};
`
const ScoreDetail = styled.div`
  display: block;
  position: relative;
  text-align: center;
  font-weight: ${fontWeight.medium};
  font-size: ${fontSize.xxs};
  font-family: ${fonts.primary};
  color: ${colors.textColorLight};
`

const ButtonsWrapper = styled.div`
  bottom: 5rem;
  left: 0;
  position: fixed;
  display: flex;
  justify-content: space-around;
  padding: 0 1rem;
  width: 100%;

  ${media.desktop`
    position: static;
    margin-bottom: 1rem;
  `};
`

const ButtonContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const ShowMapButton = styled(Button)`
  display: block;

  ${media.desktop`
    display: none;
  `};

  ${media.widescreen`
    display: none;
  `};

  @media only screen and (min-device-width: 1024px) and (max-device-width: 1366px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: landscape) {
    display: none;
  }

  @media only screen and (min-device-width: 1024px) and (max-device-width: 1366px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait) {
    display: block;
  }

  @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: landscape) {
    display: block;
  }
`

const GoogleBanner = styled.img.attrs({
  src: googleBannerImage,
  alt: 'Powered by Google image'
})`
  height: 1.5rem;
  margin-bottom: 5rem;
  width: auto;

  ${media.desktop`
    margin-bottom: 1rem;
  `};

  @media only screen and (min-device-width: 1024px) and (max-device-width: 1366px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait) {
    margin-bottom: 4rem;
  }

  @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: landscape) {
    margin-bottom: 4rem;
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
  top: 15% !important;
  left: 5px !important;

  ${media.tablet`
    top: 15% !important;
    left: 5px !important;
  `};

  ${media.desktop`
    top: 15% !important;
    left: 5px !important;
  `};

  ${media.widescreen`
    top: 15% !important;
    left: 5px !important;
  `};

  @media only screen and (min-device-width: 1024px) and (max-device-width: 1366px) and (-webkit-min-device-pixel-ratio: 2) {
    top: 15% !important;
    left: 5px !important;
  }
`

const Slide = styled.div``
const ScoreDescription = styled.div``

const List = (props, context) => (
  <Wrapper visible={props.visible}>
    {props.loadingVenues ? (
      <Spinner />
    ) : (
      <CardsWrapper>
        {props.venues.map(venue => {
          const reviewData = {
            allowsGuideDog: venue.allowsGuideDog,
            restroomScore: venue.restroomScore || 0,
            entranceScore: venue.entranceScore || 0,
            interiorScore: venue.interiorScore || 0,
            hasParking: venue.hasParking,
            hasSecondEntry: venue.hasSecondEntry,
            hasWellLit: venue.hasWellLit,
            isQuiet: venue.isQuiet,
            isSpacious: venue.isSpacious,
            steps: venue.steps
          }
          const reviewsRatioWeight = venue.mapMarkerScore

          let selectedScore = ''
          if (reviewsRatioWeight === 1 && reviewsRatioWeight < 3)
            selectedScore = '-bad'
          else if (reviewsRatioWeight >= 3 && reviewsRatioWeight < 5)
            selectedScore = '-average'
          else if (reviewsRatioWeight >= 5) selectedScore = '-good'

          const selectedType = getGeneralType(venue.types)
          let backgroundIcon = 'grey'
          if (selectedScore === '-bad') backgroundIcon = 'ratingAlert'
          if (selectedScore === '-average') backgroundIcon = 'ratingCaution'
          if (selectedScore === '-good') backgroundIcon = 'ratingAccessible'
          const venueIcon = {
            url: `https://s3.amazonaws.com/axsmap-media/markers/hi-vis/${kebabCase(
              selectedType
            )}${selectedScore}.svg`,
            background: backgroundIcon
          }

          // Entrance
          const localEntranceGlyphs = venue.entranceGlyphs
          let localSeparatedEntranceGlyphs
          try {
            localSeparatedEntranceGlyphs = localEntranceGlyphs.split(',')
          } catch (error) {}

          let entryScoreIcon = (
            <ScoreIcon style={{ paddingTop: '10px' }}>
              <Icon
                glyph="entrylg"
                size={1.5}
                alt="Entrance"
                color={colors.buttonColor}
                style={{
                  marginTop: '5px'
                }}
              />
            </ScoreIcon>
          )
          if (venue.entranceScore === 1 && venue.entranceScore < 3)
            entryScoreIcon = (
              <ScoreIcon
                backgroundColor={colors.ratingAlert}
                textColor={colors.black}
                className="score_alert"
              >
                <Button
                  id={`entry_${venue.placeId}`}
                  className="btn-clear btn-score_alert"
                  disabled={props.sendingRequest}
                >
                  {venue.entranceGlyphs.startsWith('steps') ? (
                    <div>
                      <Icon
                        glyph="steps"
                        size={1.5}
                        alt="Entrance"
                        className="fill-current text-black"
                        color={colors.black}
                        style={{
                          marginTop: '5px'
                        }}
                      />
                      <StepButton disabled={false}>
                        <Icon
                          glyph={localSeparatedEntranceGlyphs[1]}
                          size={0.5}
                          color={colors.white}
                        />
                      </StepButton>
                    </div>
                  ) : (
                    <Icon
                      glyph={venue.entranceGlyphs}
                      size={1.5}
                      alt="Entrance"
                      className="fill-current text-black"
                      color={colors.black}
                      style={{
                        marginTop: '5px'
                      }}
                    />
                  )}
                </Button>
              </ScoreIcon>
            )
          if (venue.entranceScore >= 3 && venue.entranceScore < 5)
            entryScoreIcon = (
              <ScoreIcon
                backgroundColor={colors.ratingCaution}
                textColor={colors.black}
                className="score_caution"
              >
                <Button
                  id={`entry_${venue.placeId}`}
                  className="btn-clear btn-score_caution"
                  disabled={props.sendingRequest}
                >
                  {venue.entranceGlyphs.startsWith('steps') ? (
                    <div>
                      <Icon
                        glyph="steps"
                        size={1.5}
                        alt="Entrance"
                        className="fill-current text-black"
                        color={colors.black}
                        style={{
                          marginTop: '5px'
                        }}
                      />
                      <StepButton disabled={false}>
                        <Icon
                          glyph={localSeparatedEntranceGlyphs[1]}
                          size={0.5}
                          color={colors.white}
                        />
                      </StepButton>
                    </div>
                  ) : (
                    <Icon
                      glyph={venue.entranceGlyphs}
                      size={1.5}
                      alt="Entrance"
                      className="fill-current text-black"
                      color={colors.black}
                      style={{
                        marginTop: '5px'
                      }}
                    />
                  )}
                </Button>
              </ScoreIcon>
            )
          if (venue.entranceScore >= 5)
            entryScoreIcon = (
              <ScoreIcon
                backgroundColor={colors.ratingAccessible}
                textColor={colors.black}
                className="score_accessible"
              >
                <Button
                  id={`entry_${venue.placeId}`}
                  className="btn-clear btn-score_accessible"
                  disabled={props.sendingRequest}
                >
                  {venue.entranceGlyphs.startsWith('steps') ? (
                    <div>
                      <Icon
                        glyph="steps"
                        size={1.5}
                        alt="Entrance"
                        className="fill-current text-black"
                        color={colors.black}
                        style={{
                          marginTop: '5px'
                        }}
                      />
                      <StepButton disabled={false}>
                        <Icon
                          glyph={localSeparatedEntranceGlyphs[1]}
                          size={0.5}
                          color={colors.white}
                        />
                      </StepButton>
                    </div>
                  ) : (
                    <Icon
                      glyph={venue.entranceGlyphs}
                      size={1.5}
                      alt="Entrance"
                      className="fill-current text-black"
                      color={colors.black}
                      style={{
                        marginTop: '5px'
                      }}
                    />
                  )}
                </Button>
              </ScoreIcon>
            )

          let entryDetailsScore
          const maxEntryDetails = 9
          const entryCarouselDetails = []
          let checkHasPermanentRamp = false
          let checkHasPortableRamp = false
          let checkNoSteps = false
          let check1Steps = false
          let check2Steps = false
          let check3Steps = false
          let checkHasParking = false
          let checkHasSecondEntry = false
          let checkHasWideEntrance = false
          let entranceOneLiner = null

          for (let i = 1; i <= maxEntryDetails; i += 1) {
            if (
              venue.hasPermanentRamp &&
              venue.hasPermanentRamp.yes &&
              venue.hasPermanentRamp.yes !== 0 &&
              checkHasPermanentRamp === false
            ) {
              checkHasPermanentRamp = true
              const eCDetails = (
                <Slide>
                  <Grid className="is-full">
                    <Grid.Unit
                      size={{ mobile: 1 / 3, tablet: 1 / 3, desktop: 1 / 3 }}
                    >
                      <Icon
                        glyph="permanentRamp"
                        size={2}
                        className="fill-current text-black"
                        aria-hidden="true"
                        alt=" "
                        color={colors.black}
                      />
                    </Grid.Unit>
                    <Grid.Unit
                      size={{ mobile: 2 / 3, tablet: 2 / 3, desktop: 2 / 3 }}
                    >
                      <ScoreDescription>
                        Entrance has permanent ramp
                      </ScoreDescription>
                    </Grid.Unit>
                  </Grid>
                </Slide>
              )
              entranceOneLiner = eCDetails
              entryCarouselDetails.push(eCDetails)
            } else if (
              venue.hasPortableRamp &&
              venue.hasPortableRamp.yes &&
              venue.hasPortableRamp.yes !== 0 &&
              checkHasPortableRamp === false
            ) {
              checkHasPortableRamp = true
              const eCDetails = (
                <Slide>
                  <Grid className="is-full">
                    <Grid.Unit
                      size={{ mobile: 1 / 3, tablet: 1 / 3, desktop: 1 / 3 }}
                    >
                      <Icon
                        glyph="portableRamp"
                        size={2}
                        className="fill-current text-black"
                        aria-hidden="true"
                        alt=" "
                        color={colors.black}
                      />
                    </Grid.Unit>
                    <Grid.Unit
                      size={{ mobile: 2 / 3, tablet: 2 / 3, desktop: 2 / 3 }}
                    >
                      <ScoreDescription>
                        Entrance has portable ramp.
                      </ScoreDescription>
                    </Grid.Unit>
                  </Grid>
                </Slide>
              )
              entranceOneLiner = eCDetails
              entryCarouselDetails.push(eCDetails)
            } else if (
              checkNoSteps === false &&
              (venue.has0Steps &&
                venue.has0Steps.yes &&
                venue.has0Steps.yes !== 0)
            ) {
              checkNoSteps = true
              const eCDetails = (
                <Slide>
                  <Grid className="is-full">
                    <Grid.Unit
                      size={{ mobile: 1 / 3, tablet: 1 / 3, desktop: 1 / 3 }}
                    >
                      <Icon
                        glyph="steps"
                        size={2}
                        className="fill-current text-black"
                        aria-hidden="true"
                        alt=" "
                        color={colors.black}
                      />
                    </Grid.Unit>
                    <Grid.Unit
                      size={{ mobile: 2 / 3, tablet: 2 / 3, desktop: 2 / 3 }}
                    >
                      <ScoreDescription>
                        Entrance has no steps.
                      </ScoreDescription>
                    </Grid.Unit>
                  </Grid>
                </Slide>
              )
              entranceOneLiner = eCDetails
              entryCarouselDetails.push(eCDetails)
            } else if (
              check1Steps === false &&
              (venue.has1Step && venue.has1Step.yes && venue.has1Step.yes !== 0)
            ) {
              check1Steps = true
              const eCDetails = (
                <Slide>
                  <Grid className="is-full">
                    <Grid.Unit
                      size={{ mobile: 1 / 3, tablet: 1 / 3, desktop: 1 / 3 }}
                    >
                      <Icon
                        glyph="steps"
                        size={2}
                        className="fill-current text-black"
                        aria-hidden="true"
                        alt=" "
                        color={colors.black}
                      />
                    </Grid.Unit>
                    <Grid.Unit
                      size={{ mobile: 2 / 3, tablet: 2 / 3, desktop: 2 / 3 }}
                    >
                      <ScoreDescription>Entrance has 1 step.</ScoreDescription>
                    </Grid.Unit>
                  </Grid>
                </Slide>
              )
              entranceOneLiner = eCDetails
              entryCarouselDetails.push(eCDetails)
            } else if (
              check2Steps === false &&
              (venue.has2Steps &&
                venue.has2Steps.yes &&
                venue.has2Steps.yes !== 0)
            ) {
              check2Steps = true
              const eCDetails = (
                <Slide>
                  <Grid className="is-full">
                    <Grid.Unit
                      size={{ mobile: 1 / 3, tablet: 1 / 3, desktop: 1 / 3 }}
                    >
                      <Icon
                        glyph="steps"
                        size={2}
                        className="fill-current text-black"
                        aria-hidden="true"
                        alt=" "
                        color={colors.black}
                      />
                    </Grid.Unit>
                    <Grid.Unit
                      size={{ mobile: 2 / 3, tablet: 2 / 3, desktop: 2 / 3 }}
                    >
                      <ScoreDescription>Entrance has 2 steps.</ScoreDescription>
                    </Grid.Unit>
                  </Grid>
                </Slide>
              )
              entranceOneLiner = eCDetails
              entryCarouselDetails.push(eCDetails)
            } else if (
              check3Steps === false &&
              (venue.has3Steps &&
                venue.has3Steps.yes &&
                venue.has3Steps.yes !== 0)
            ) {
              check3Steps = true
              const eCDetails = (
                <Slide>
                  <Grid className="is-full">
                    <Grid.Unit
                      size={{ mobile: 1 / 3, tablet: 1 / 3, desktop: 1 / 3 }}
                    >
                      <Icon
                        glyph="steps"
                        size={2}
                        className="fill-current text-black"
                        aria-hidden="true"
                        alt=" "
                        color={colors.black}
                      />
                    </Grid.Unit>
                    <Grid.Unit
                      size={{ mobile: 2 / 3, tablet: 2 / 3, desktop: 2 / 3 }}
                    >
                      <ScoreDescription>
                        Entrance has 3+ Steps.
                      </ScoreDescription>
                    </Grid.Unit>
                  </Grid>
                </Slide>
              )
              entranceOneLiner = eCDetails
              entryCarouselDetails.push(eCDetails)
            } else if (
              venue.hasParking &&
              venue.hasParking.yes &&
              venue.hasParking.yes !== 0 &&
              checkHasParking === false
            ) {
              checkHasParking = true
              const eCDetails = (
                <Slide>
                  <Grid className="is-full">
                    <Grid.Unit
                      size={{ mobile: 1 / 3, tablet: 1 / 3, desktop: 1 / 3 }}
                    >
                      <Icon
                        glyph="parking"
                        size={2}
                        className="fill-current text-black"
                        aria-hidden="true"
                        alt=" "
                        color={colors.black}
                      />
                    </Grid.Unit>
                    <Grid.Unit
                      size={{ mobile: 2 / 3, tablet: 2 / 3, desktop: 2 / 3 }}
                    >
                      <ScoreDescription>
                        Venue has reserved parking.
                      </ScoreDescription>
                    </Grid.Unit>
                  </Grid>
                </Slide>
              )
              entranceOneLiner = eCDetails
              entryCarouselDetails.push(eCDetails)
            } else if (
              venue.hasSecondEntry &&
              venue.hasSecondEntry.yes &&
              venue.hasSecondEntry.yes !== 0 &&
              checkHasSecondEntry === false
            ) {
              checkHasSecondEntry = true
              const eCDetails = (
                <Slide>
                  <Grid className="is-full">
                    <Grid.Unit
                      size={{ mobile: 1 / 3, tablet: 1 / 3, desktop: 1 / 3 }}
                    >
                      <Icon
                        glyph="secondEntry"
                        size={2}
                        className="fill-current text-black"
                        aria-hidden="true"
                        alt=" "
                        color={colors.black}
                      />
                    </Grid.Unit>
                    <Grid.Unit
                      size={{ mobile: 2 / 3, tablet: 2 / 3, desktop: 2 / 3 }}
                    >
                      <ScoreDescription>
                        Venue has secondary entrance.
                      </ScoreDescription>
                    </Grid.Unit>
                  </Grid>
                </Slide>
              )
              entranceOneLiner = eCDetails
              entryCarouselDetails.push(eCDetails)
            } else if (
              venue.hasWideEntrance &&
              venue.hasWideEntrance.yes &&
              venue.hasWideEntrance.yes !== 0 &&
              checkHasWideEntrance === false
            ) {
              checkHasWideEntrance = true
              const eCDetails = (
                <Slide>
                  <Grid className="is-full">
                    <Grid.Unit
                      size={{ mobile: 1 / 3, tablet: 1 / 3, desktop: 1 / 3 }}
                    >
                      <Icon
                        glyph="wideEntry"
                        size={2}
                        className="fill-current text-black"
                        aria-hidden="true"
                        alt=" "
                        color={colors.black}
                      />
                    </Grid.Unit>
                    <Grid.Unit
                      size={{ mobile: 2 / 3, tablet: 2 / 3, desktop: 2 / 3 }}
                    >
                      <ScoreDescription>
                        Venue has wide entrance.
                      </ScoreDescription>
                    </Grid.Unit>
                  </Grid>
                </Slide>
              )
              entranceOneLiner = eCDetails
              entryCarouselDetails.push(eCDetails)
            }
          }

          if (
            venue.entranceScore === 1 &&
            venue.entranceScore < 3 &&
            entryCarouselDetails.length === 0
          )
            entryDetailsScore = (
              <div data-toggler={`#entry_${venue.placeId}`}>
                <div className="entry-score__details">
                  <div className="arrow" />
                  <div className="entry-score__details__content">
                    {context.intl.formatMessage(
                      messages.noEntryDetailsAlertMessage
                    )}
                  </div>
                </div>
              </div>
            )
          else if (
            venue.entranceScore >= 3 &&
            venue.entranceScore < 5 &&
            entryCarouselDetails.length === 0
          )
            entryDetailsScore = (
              <div data-toggler={`#entry_${venue.placeId}`}>
                <div className="entry-score__details">
                  <div className="arrow" />
                  <div className="entry-score__details__content">
                    {context.intl.formatMessage(
                      messages.noEntryDetailsCautionMessage
                    )}
                  </div>
                </div>
              </div>
            )
          else if (
            venue.entranceScore >= 5 &&
            entryCarouselDetails.length === 0
          )
            entryDetailsScore = (
              <div data-toggler={`#entry_${venue.placeId}`}>
                <div className="entry-score__details">
                  <div className="arrow" />
                  <div className="entry-score__details__content">
                    {context.intl.formatMessage(
                      messages.noEntryDetailsAccessibleMessage
                    )}
                  </div>
                </div>
              </div>
            )
          else if (entryCarouselDetails.length > 0)
            entryDetailsScore = (
              <div data-toggler={`#entry_${venue.placeId}`}>
                <div className="entry-score__details">
                  <div className="arrow" />
                  <div className="entry-score__details__content">
                    {entranceOneLiner}
                  </div>
                </div>
              </div>
            )

          // Restroom
          let bathroomScoreIcon = (
            <ScoreIcon style={{ paddingTop: '10px' }}>
              <Icon
                glyph="restroom"
                size={1.5}
                alt="Restroom"
                color={colors.buttonColor}
                style={{
                  marginTop: '5px'
                }}
              />
            </ScoreIcon>
          )
          if (venue.restroomScore === 1 && venue.restroomScore < 3)
            bathroomScoreIcon = (
              <ScoreIcon
                backgroundColor={colors.ratingAlert}
                className="score_alert"
              >
                <Button
                  id={`restroom_${venue.placeId}`}
                  className="btn-clear btn-score_alert"
                  disabled={props.sendingRequest}
                >
                  <Icon
                    glyph={venue.restroomGlyphs}
                    className="fill-current text-black"
                    color={colors.black}
                    size={1.5}
                    alt="Restroom"
                    style={{
                      marginTop: '5px'
                    }}
                  />
                </Button>
              </ScoreIcon>
            )
          if (venue.restroomScore >= 3 && venue.restroomScore < 5)
            bathroomScoreIcon = (
              <ScoreIcon
                backgroundColor={colors.ratingCaution}
                className="score_caution"
              >
                <Button
                  id={`restroom_${venue.placeId}`}
                  className="btn-clear btn-score_caution"
                  disabled={props.sendingRequest}
                >
                  <Icon
                    glyph={venue.restroomGlyphs}
                    className="fill-current text-black"
                    color={colors.black}
                    size={1.5}
                    alt="Restroom"
                    style={{
                      marginTop: '5px'
                    }}
                  />
                </Button>
              </ScoreIcon>
            )
          if (venue.restroomScore >= 5)
            bathroomScoreIcon = (
              <ScoreIcon
                backgroundColor={colors.ratingAccessible}
                className="score_accessible"
              >
                <Button
                  id={`restroom_${venue.placeId}`}
                  className="btn-clear btn-score_accessible"
                  disabled={props.sendingRequest}
                >
                  <Icon
                    glyph={venue.restroomGlyphs}
                    className="fill-current text-black"
                    color={colors.black}
                    size={1.5}
                    alt="Restroom"
                    style={{
                      marginTop: '5px'
                    }}
                  />
                </Button>
              </ScoreIcon>
            )

          let restroomDetailsScore
          const maxBathroomDetails = 5
          const bathroomCarouselDetails = []
          let checkHasSwingOutDoor = false
          let checkHasLargeStall = false
          let checkHasTallSinks = false
          let checkHasLoweredSinks = false
          let bathroomOneLiner

          for (let i = 1; i <= maxBathroomDetails; i += 1) {
            if (
              venue.hasSwingOutDoor &&
              venue.hasSwingOutDoor.yes &&
              venue.hasSwingOutDoor.yes !== 0 &&
              checkHasSwingOutDoor === false
            ) {
              checkHasSwingOutDoor = true
              const eCDetails = (
                <Slide>
                  <Grid className="is-full">
                    <Grid.Unit
                      size={{ mobile: 1 / 3, tablet: 1 / 3, desktop: 1 / 3 }}
                    >
                      <Icon
                        glyph="doorSwingsOut"
                        size={2}
                        className="fill-current text-black"
                        aria-hidden="true"
                        alt=" "
                        color={colors.black}
                      />
                    </Grid.Unit>
                    <Grid.Unit
                      size={{ mobile: 2 / 3, tablet: 2 / 3, desktop: 2 / 3 }}
                    >
                      <ScoreDescription>
                        Restroom has an outward-swinging door.
                      </ScoreDescription>
                    </Grid.Unit>
                  </Grid>
                </Slide>
              )
              bathroomOneLiner = eCDetails
              bathroomCarouselDetails.push(eCDetails)
            } else if (
              venue.hasLargeStall &&
              venue.hasLargeStall.yes &&
              venue.hasLargeStall.yes !== 0 &&
              checkHasLargeStall === false
            ) {
              checkHasLargeStall = true
              const eCDetails = (
                <Slide>
                  <Grid className="is-full">
                    <Grid.Unit
                      size={{ mobile: 1 / 3, tablet: 1 / 3, desktop: 1 / 3 }}
                    >
                      <Icon
                        glyph="stallLarge"
                        size={2}
                        className="text-black"
                        aria-hidden="true"
                        alt=" "
                        color={colors.black}
                      />
                    </Grid.Unit>
                    <Grid.Unit
                      size={{ mobile: 2 / 3, tablet: 2 / 3, desktop: 2 / 3 }}
                    >
                      <ScoreDescription>
                        Restroom has large stall.
                      </ScoreDescription>
                    </Grid.Unit>
                  </Grid>
                </Slide>
              )
              bathroomOneLiner = eCDetails
              bathroomCarouselDetails.push(eCDetails)
            } else if (
              venue.hasTallSinks &&
              venue.hasTallSinks.yes &&
              venue.hasTallSinks.yes !== 0 &&
              checkHasTallSinks === false
            ) {
              checkHasTallSinks = true
              const eCDetails = (
                <Slide>
                  <Grid className="is-full">
                    <Grid.Unit
                      size={{ mobile: 1 / 3, tablet: 1 / 3, desktop: 1 / 3 }}
                    >
                      <Icon
                        glyph="sinkTall"
                        size={2}
                        className="text-black"
                        aria-hidden="true"
                        alt=" "
                        color={colors.black}
                      />
                    </Grid.Unit>
                    <Grid.Unit
                      size={{ mobile: 2 / 3, tablet: 2 / 3, desktop: 2 / 3 }}
                    >
                      <ScoreDescription>
                        Restroom has tall sinks.
                      </ScoreDescription>
                    </Grid.Unit>
                  </Grid>
                </Slide>
              )
              bathroomOneLiner = eCDetails
              bathroomCarouselDetails.push(eCDetails)
            } else if (
              venue.hasLoweredSinks &&
              venue.hasLoweredSinks.yes &&
              venue.hasLoweredSinks.yes !== 0 &&
              checkHasLoweredSinks === false
            ) {
              checkHasLoweredSinks = true
              const eCDetails = (
                <Slide>
                  <Grid className="is-full">
                    <Grid.Unit
                      size={{ mobile: 1 / 3, tablet: 1 / 3, desktop: 1 / 3 }}
                    >
                      <Icon
                        glyph="sinkLowered"
                        size={2}
                        className="text-black"
                        aria-hidden="true"
                        alt=" "
                        color={colors.black}
                      />
                    </Grid.Unit>
                    <Grid.Unit
                      size={{ mobile: 2 / 3, tablet: 2 / 3, desktop: 2 / 3 }}
                    >
                      <ScoreDescription>
                        Restroom has lowered sinks.
                      </ScoreDescription>
                    </Grid.Unit>
                  </Grid>
                </Slide>
              )
              bathroomOneLiner = eCDetails
              bathroomCarouselDetails.push(eCDetails)
            }
          }

          if (
            venue.restroomScore === 1 &&
            venue.restroomScore < 3 &&
            bathroomCarouselDetails.length === 0
          )
            restroomDetailsScore = (
              <div data-toggler={`#restroom_${venue.placeId}`}>
                <div className="restroom-score__details">
                  <div className="arrow" />
                  <div className="restroom-score__details__content">
                    {context.intl.formatMessage(
                      messages.noRestroomDetailsAlertMessage
                    )}
                  </div>
                </div>
              </div>
            )
          else if (
            venue.restroomScore >= 3 &&
            venue.restroomScore < 5 &&
            bathroomCarouselDetails.length === 0
          )
            restroomDetailsScore = (
              <div data-toggler={`#restroom_${venue.placeId}`}>
                <div className="restroom-score__details">
                  <div className="arrow" />
                  <div className="restroom-score__details__content">
                    {context.intl.formatMessage(
                      messages.noRestroomDetailsCautionMessage
                    )}
                  </div>
                </div>
              </div>
            )
          else if (
            venue.restroomScore >= 5 &&
            bathroomCarouselDetails.length === 0
          )
            restroomDetailsScore = (
              <div data-toggler={`#restroom_${venue.placeId}`}>
                <div className="restroom-score__details">
                  <div className="arrow" />
                  <div className="restroom-score__details__content">
                    {context.intl.formatMessage(
                      messages.noRestroomDetailsAccessibleMessage
                    )}
                  </div>
                </div>
              </div>
            )
          else if (bathroomCarouselDetails.length > 0)
            restroomDetailsScore = (
              <div data-toggler={`#restroom_${venue.placeId}`}>
                <div className="restroom-score__details">
                  <div className="arrow" />
                  <div className="restroom-score__details__content">
                    {bathroomOneLiner}
                  </div>
                </div>
              </div>
            )

          // Interior
          const maxInteriorDetails = 7
          const interiorCarouselDetails = []
          let interiorDetailsScore
          let checkIsisSpacious = false
          let checkHasAccessibleTableHeight = false
          let checkHasWellLit = false
          let checkIsQuiet = false
          let checkAllowsGuideDog = false
          let checkHasAccessibleElevator = false
          let checkHasInteriorRamp = false
          let interiorOneLiner

          for (let i = 1; i <= maxInteriorDetails; i += 1) {
            if (
              venue.isSpacious &&
              venue.isSpacious.yes &&
              venue.isSpacious.yes !== 0 &&
              checkIsisSpacious === false
            ) {
              checkIsisSpacious = true
              const eCDetails = (
                <Slide>
                  <Grid className="is-full">
                    <Grid.Unit
                      size={{ mobile: 1 / 3, tablet: 1 / 3, desktop: 1 / 3 }}
                    >
                      <Icon
                        glyph="space"
                        size={2}
                        className="fill-current text-black"
                        aria-hidden="true"
                        alt=" "
                        color={colors.black}
                      />
                    </Grid.Unit>
                    <Grid.Unit
                      size={{ mobile: 2 / 3, tablet: 2 / 3, desktop: 2 / 3 }}
                    >
                      <ScoreDescription>
                        Interior has room to move.
                      </ScoreDescription>
                    </Grid.Unit>
                  </Grid>
                </Slide>
              )
              interiorOneLiner = eCDetails
              interiorCarouselDetails.push(eCDetails)
            } else if (
              venue.hasAccessibleTableHeight &&
              venue.hasAccessibleTableHeight.yes &&
              venue.hasAccessibleTableHeight.yes !== 0 &&
              checkHasAccessibleTableHeight === false
            ) {
              checkHasAccessibleTableHeight = true
              const eCDetails = (
                <Slide>
                  <Grid className="is-full">
                    <Grid.Unit
                      size={{ mobile: 1 / 3, tablet: 1 / 3, desktop: 1 / 3 }}
                    >
                      <Icon
                        glyph="table"
                        size={2}
                        className="fill-current text-black"
                        aria-hidden="true"
                        alt=" "
                        color={colors.black}
                      />
                    </Grid.Unit>
                    <Grid.Unit
                      size={{ mobile: 2 / 3, tablet: 2 / 3, desktop: 2 / 3 }}
                    >
                      <ScoreDescription>
                        Interior has accessible table height.
                      </ScoreDescription>
                    </Grid.Unit>
                  </Grid>
                </Slide>
              )
              interiorOneLiner = eCDetails
              interiorCarouselDetails.push(eCDetails)
            } else if (
              venue.hasWellLit &&
              venue.hasWellLit.yes &&
              venue.hasWellLit.yes !== 0 &&
              checkHasWellLit === false
            ) {
              checkHasWellLit = true
              const eCDetails = (
                <Slide>
                  <Grid className="is-full">
                    <Grid.Unit
                      size={{ mobile: 1 / 3, tablet: 1 / 3, desktop: 1 / 3 }}
                    >
                      <Icon
                        glyph="light"
                        size={2}
                        className="fill-current text-black"
                        aria-hidden="true"
                        alt=" "
                        color={colors.black}
                      />
                    </Grid.Unit>
                    <Grid.Unit
                      size={{ mobile: 2 / 3, tablet: 2 / 3, desktop: 2 / 3 }}
                    >
                      <ScoreDescription>
                        Interior has adequate lighting
                      </ScoreDescription>
                    </Grid.Unit>
                  </Grid>
                </Slide>
              )
              interiorOneLiner = eCDetails
              interiorCarouselDetails.push(eCDetails)
            } else if (
              venue.isQuiet &&
              venue.isQuiet.no &&
              venue.isQuiet.no !== 0 &&
              checkIsQuiet === false
            ) {
              checkIsQuiet = true
              const eCDetails = (
                <Slide>
                  <Grid className="is-full">
                    <Grid.Unit
                      size={{ mobile: 1 / 3, tablet: 1 / 3, desktop: 1 / 3 }}
                    >
                      <Icon
                        glyph="sound"
                        size={2}
                        className="fill-current text-black"
                        aria-hidden="true"
                        alt=" "
                        color={colors.black}
                      />
                    </Grid.Unit>
                    <Grid.Unit
                      size={{ mobile: 2 / 3, tablet: 2 / 3, desktop: 2 / 3 }}
                    >
                      <ScoreDescription>
                        Interior has high noise level
                      </ScoreDescription>
                    </Grid.Unit>
                  </Grid>
                </Slide>
              )
              interiorOneLiner = eCDetails
              interiorCarouselDetails.push(eCDetails)
            } else if (
              venue.allowsGuideDog &&
              venue.allowsGuideDog.yes &&
              venue.allowsGuideDog.yes !== 0 &&
              checkAllowsGuideDog === false
            ) {
              checkAllowsGuideDog = true
              const eCDetails = (
                <Slide>
                  <Grid className="is-full">
                    <Grid.Unit
                      size={{ mobile: 1 / 3, tablet: 1 / 3, desktop: 1 / 3 }}
                    >
                      <Icon
                        glyph="guideDog"
                        size={2}
                        className="fill-current text-black"
                        aria-hidden="true"
                        alt=" "
                        color={colors.black}
                      />
                    </Grid.Unit>
                    <Grid.Unit
                      size={{ mobile: 2 / 3, tablet: 2 / 3, desktop: 2 / 3 }}
                    >
                      <ScoreDescription>
                        Interior allows guided dog.
                      </ScoreDescription>
                    </Grid.Unit>
                  </Grid>
                </Slide>
              )
              interiorOneLiner = eCDetails
              interiorCarouselDetails.push(eCDetails)
            } else if (
              venue.hasAccessibleElevator &&
              venue.hasAccessibleElevator.yes &&
              venue.hasAccessibleElevator.yes !== 0 &&
              checkHasAccessibleElevator === false
            ) {
              checkHasAccessibleElevator = true
              const eCDetails = (
                <Slide>
                  <Grid className="is-full">
                    <Grid.Unit
                      size={{ mobile: 1 / 3, tablet: 1 / 3, desktop: 1 / 3 }}
                    >
                      <Icon
                        glyph="elevator"
                        size={2}
                        className="fill-current text-black"
                        aria-hidden="true"
                        alt=" "
                        color={colors.black}
                      />
                    </Grid.Unit>
                    <Grid.Unit
                      size={{ mobile: 2 / 3, tablet: 2 / 3, desktop: 2 / 3 }}
                    >
                      <ScoreDescription>
                        Interior has accessible elevator.
                      </ScoreDescription>
                    </Grid.Unit>
                  </Grid>
                </Slide>
              )
              interiorOneLiner = eCDetails
              interiorCarouselDetails.push(eCDetails)
            } else if (
              venue.hasInteriorRamp &&
              venue.hasInteriorRamp.yes &&
              venue.hasInteriorRamp.yes !== 0 &&
              checkHasInteriorRamp === false
            ) {
              checkHasInteriorRamp = true
              const eCDetails = (
                <Slide>
                  <Grid className="is-full">
                    <Grid.Unit
                      size={{ mobile: 1 / 3, tablet: 1 / 3, desktop: 1 / 3 }}
                    >
                      <Icon
                        glyph="interiorRamp"
                        size={6}
                        className="fill-current text-black"
                        aria-hidden="true"
                        alt=" "
                        color={colors.black}
                      />
                    </Grid.Unit>
                    <Grid.Unit
                      size={{ mobile: 2 / 3, tablet: 2 / 3, desktop: 2 / 3 }}
                    >
                      <ScoreDescription>
                        Interior has interior ramp
                      </ScoreDescription>
                    </Grid.Unit>
                  </Grid>
                </Slide>
              )
              interiorOneLiner = eCDetails
              interiorCarouselDetails.push(eCDetails)
            }
          }

          if (
            venue.interiorScore === 1 &&
            venue.interiorScore < 3 &&
            interiorCarouselDetails.length === 0
          )
            interiorDetailsScore = (
              <div data-toggler={`#interior_${venue.placeId}`}>
                <div className="interior-score__details">
                  <div className="arrow" />
                  <div className="interior-score__details__content">
                    {context.intl.formatMessage(
                      messages.noInteriorDetailsAlertMessage
                    )}
                  </div>
                </div>
              </div>
            )
          else if (
            venue.interiorScore >= 3 &&
            venue.interiorScore < 5 &&
            interiorCarouselDetails.length === 0
          )
            interiorDetailsScore = (
              <div data-toggler={`#interior_${venue.placeId}`}>
                <div className="interior-score__details">
                  <div className="arrow" />
                  <div className="interior-score__details__content">
                    {context.intl.formatMessage(
                      messages.noInteriorDetailsCautionMessage
                    )}
                  </div>
                </div>
              </div>
            )
          else if (
            venue.interiorScore >= 5 &&
            interiorCarouselDetails.length === 0
          )
            interiorDetailsScore = (
              <div data-toggler={`#interior_${venue.placeId}`}>
                <div className="interior-score__details">
                  <div className="arrow" />
                  <div className="interior-score__details__content">
                    {context.intl.formatMessage(
                      messages.noInteriorDetailsAccessibleMessage
                    )}
                  </div>
                </div>
              </div>
            )
          else if (interiorCarouselDetails.length > 0)
            interiorDetailsScore = (
              <div data-toggler={`#interior_${venue.placeId}`}>
                <div className="interior-score__details">
                  <div className="arrow" />
                  <div className="interior-score__details__content">
                    {interiorOneLiner}
                  </div>
                </div>
              </div>
            )

          let stepsScoreBox = (
            <ScoreIcon style={{ paddingTop: '10px' }}>
              <Icon
                glyph="interior"
                size={2}
                alt="Interior"
                color={colors.buttonColor}
                style={{
                  marginTop: '5px'
                }}
              />
            </ScoreIcon>
          )
          if (venue.interiorScore === 1 && venue.interiorScore < 3) {
            stepsScoreBox = (
              <ScoreIcon
                backgroundColor={colors.ratingAlert}
                className="score_alert"
              >
                <Button
                  id={`interior_${venue.placeId}`}
                  className="btn-clear btn-score_alert"
                  disabled={props.sendingRequest}
                >
                  <Icon
                    glyph={venue.interiorGlyphs}
                    size={2}
                    className="fill-current text-black"
                    color={colors.black}
                    alt="Interior"
                    style={{
                      marginTop: '5px'
                    }}
                  />
                </Button>
              </ScoreIcon>
            )
          } else if (venue.interiorScore >= 3 && venue.interiorScore < 5) {
            stepsScoreBox = (
              <ScoreIcon
                backgroundColor={colors.ratingCaution}
                className="score_caution"
              >
                <Button
                  id={`interior_${venue.placeId}`}
                  className="btn-clear btn-score_caution"
                  disabled={props.sendingRequest}
                >
                  <Icon
                    glyph={venue.interiorGlyphs}
                    size={2}
                    className="fill-current text-black"
                    color={colors.black}
                    alt="Interior"
                    style={{
                      marginTop: '5px'
                    }}
                  />
                </Button>
              </ScoreIcon>
            )
          } else if (venue.interiorScore >= 5) {
            stepsScoreBox = (
              <ScoreIcon
                backgroundColor={colors.ratingAccessible}
                className="score_accessible"
              >
                <Button
                  id={`interior_${venue.placeId}`}
                  className="btn-clear btn-score_accessible"
                  disabled={props.sendingRequest}
                >
                  <Icon
                    glyph={venue.interiorGlyphs}
                    size={2}
                    className="fill-current text-black"
                    color={colors.black}
                    alt="Interior"
                    style={{
                      marginTop: '5px'
                    }}
                  />
                </Button>
              </ScoreIcon>
            )
          }

          let detailsScore
          let disableAccordion = false
          if (
            venue.restroomScore === 0 &&
            venue.entranceScore === 0 &&
            venue.interiorScore === 0
          ) {
            disableAccordion = true
            detailsScore = (
              <ScoreDetail>
                <p className="mt-0">
                  {context.intl.formatMessage(messages.scoreDefaultMessage)}
                </p>

                <LinksWrapper>
                  <LinkButton
                    to={`/venues/${venue.placeId}/review`}
                    backgroundColor={colors.primary}
                    style={{ margin: '5px auto 0px auto' }}
                    disabled={props.sendingRequest}
                    className="primary-btn--alt__sm"
                  >
                    <LinkContent>
                      {context.intl.formatMessage(messages.addReviewLink)}
                    </LinkContent>
                  </LinkButton>
                </LinksWrapper>
              </ScoreDetail>
            )
          } else if (
            (venue.restroomScore === null ||
              venue.restroomScore === undefined) &&
            (venue.entranceScore === null ||
              venue.entranceScore === undefined) &&
            (venue.interiorScore === null || venue.interiorScore === undefined)
          ) {
            disableAccordion = true
            detailsScore = (
              <ScoreDetail>
                <p className="mt-0">
                  {context.intl.formatMessage(messages.scoreDefaultMessage)}
                </p>

                <LinksWrapper>
                  <LinkButton
                    to={`/venues/${venue.placeId}/review`}
                    backgroundColor={colors.primary}
                    style={{ margin: '5px auto 0px auto' }}
                    disabled={props.sendingRequest}
                    className="primary-btn--alt__sm"
                  >
                    <LinkContent>
                      {context.intl.formatMessage(messages.addReviewLink)}
                    </LinkContent>
                  </LinkButton>
                </LinksWrapper>
              </ScoreDetail>
            )
          }

          return (
            <Card key={venue.placeId} data-id={venue.placeId}>
              <Grid className="is-full">
                <Grid.Unit
                  size={{ mobile: 1 / 2, tablet: 1 / 2, desktop: 1 / 1 }}
                >
                  <LinkButton
                    to={`venues/${venue.placeId}`}
                    backgroundColor={colors.white}
                    disabled={props.sendingRequest}
                    onFocus={props.setCenterLocation(venue.location)}
                    className="btn-unstyled"
                  >
                    <Info>
                      <Name>{venue.name}</Name>
                      <Address>
                        {venue.address}
                        {' '}
                      </Address>
                    </Info>
                  </LinkButton>
                </Grid.Unit>
                <Grid.Unit
                  size={{ tablet: 1 / 2, desktop: 1 / 3 }}
                  className="mobile-hide ipad-pro-hide--portrait ipad-hide--landscape"
                >
                  {venue.photo ? (
                    <Photo backgroundImage={venue.photo} />
                  ) : (
                    <IconMarker
                      backgroundImage={venueIcon.url}
                      backgroundColor={venueIcon.background}
                    />
                  )}
                </Grid.Unit>
                <Grid.Unit
                  size={{ mobile: 1 / 2, tablet: 1 / 2, desktop: 2 / 3 }}
                >
                  <Grid className="is-full">
                    <Grid.Unit size={1 / 3}>
                      <ScoreHeader>
                        {context.intl.formatMessage(messages.entrance)}
                      </ScoreHeader>
                    </Grid.Unit>
                    <Grid.Unit size={1 / 3}>
                      <ScoreHeader>
                        {context.intl.formatMessage(messages.interior)}
                      </ScoreHeader>
                    </Grid.Unit>
                    <Grid.Unit size={1 / 3}>
                      <ScoreHeader>
                        {context.intl.formatMessage(messages.restroom)}
                      </ScoreHeader>
                    </Grid.Unit>
                  </Grid>
                  <Grid className="is-full">
                    <Grid.Unit size={1 / 1}>
                      <Accordion
                        className="ratings-accordion--sm"
                        preExpanded={`accordion_entry_${venue.placeId}`}
                      >
                        <AccordionItem
                          uuid={`accordion_entry_${venue.placeId}`}
                        >
                          <AccordionItemHeading>
                            <AccordionItemButton
                              className={`${
                                disableAccordion === true
                                  ? 'is-disabled'
                                  : 'accordion__button'
                              }`}
                            >
                              <ScoreWrapper>{entryScoreIcon}</ScoreWrapper>
                            </AccordionItemButton>
                          </AccordionItemHeading>
                          <AccordionItemPanel
                            className={`${
                              disableAccordion === true
                                ? 'accordion__panel accordion__panel--disabled'
                                : 'accordion__panel'
                            }`}
                          >
                            {detailsScore}
                            {entryDetailsScore}
                          </AccordionItemPanel>
                        </AccordionItem>
                        <AccordionItem
                          uuid={`accordion_interior_${venue.placeId}`}
                        >
                          <AccordionItemHeading>
                            <AccordionItemButton
                              className={`${
                                disableAccordion === true
                                  ? 'is-disabled'
                                  : 'accordion__button'
                              }`}
                            >
                              <ScoreWrapper>{stepsScoreBox}</ScoreWrapper>
                            </AccordionItemButton>
                          </AccordionItemHeading>
                          <AccordionItemPanel
                            className={`${
                              disableAccordion === true
                                ? 'accordion__panel accordion__panel--disabled'
                                : 'accordion__panel'
                            }`}
                          >
                            {detailsScore}
                            {interiorDetailsScore}
                          </AccordionItemPanel>
                        </AccordionItem>
                        <AccordionItem
                          uuid={`accordion_restroom_${venue.placeId}`}
                        >
                          <AccordionItemHeading>
                            <AccordionItemButton
                              className={`${
                                disableAccordion === true
                                  ? 'is-disabled'
                                  : 'accordion__button'
                              }`}
                            >
                              <ScoreWrapper>{bathroomScoreIcon}</ScoreWrapper>
                            </AccordionItemButton>
                          </AccordionItemHeading>
                          <AccordionItemPanel
                            className={`${
                              disableAccordion === true
                                ? 'accordion__panel accordion__panel--disabled'
                                : 'accordion__panel'
                            }`}
                          >
                            {detailsScore}
                            {restroomDetailsScore}
                          </AccordionItemPanel>
                        </AccordionItem>
                      </Accordion>
                    </Grid.Unit>
                  </Grid>
                </Grid.Unit>
              </Grid>
            </Card>
          )
        })}
      </CardsWrapper>
    )}

    <ButtonsWrapper>
      {props.incomingVenues ? (
        <Button
          float
          backgroundColor={colors.ratingCaution}
          color={colors.darkestGrey}
          disabled={props.sendingRequest}
          onClickHandler={props.getVenues}
          className="primary-btn px-2"
        >
          <ButtonContent>
            <Icon glyph="load" size={1} color={colors.darkestGrey} />
            <p style={{ margin: '0 0 0 0.5rem' }}>
              {context.intl.formatMessage(messages.loadMoreButton)}
            </p>
          </ButtonContent>
        </Button>
      ) : null}

      <ShowMapButton
        float
        backgroundColor={colors.gray500}
        color={colors.white}
        disabled={props.sendingRequest}
        onClickHandler={props.showMap}
        className="gray-btn"
      >
        <ButtonContent>
          <Icon glyph="map" size={1} />
          <p style={{ margin: '0 0 0 0.5rem' }}>
            {context.intl.formatMessage(messages.showMapButton)}
          </p>
        </ButtonContent>
      </ShowMapButton>
    </ButtonsWrapper>

    <GoogleBanner />

    <Footer hideOn="phone,tablet" wFontSize="0.9rem" />
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
  showMap: PropTypes.func.isRequired
}

List.contextTypes = {
  intl: intlShape
}

export default List
