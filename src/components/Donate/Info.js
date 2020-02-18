import { object } from 'prop-types'
import React from 'react'
import { intlShape } from 'react-intl'
import styled from 'styled-components'
import Grid from 'styled-components-grid'

import { colors, media, fonts, fontSize, fontWeight } from '../../styles'
import messages from './messages'

import jasonImage from '../../images/jason.png'
import bwDottedBg from '../../images/backgrounds/dotted-bw-bg.png'
import bwGraphic from '../../images/graphic.png'
import fbGraphic from '../../images/icons/facebook.png'
import insGraphic from '../../images/icons/instagram.png'
import twGraphic from '../../images/icons/twitter.png'

const DottedBg = styled.div`
  background-image: url(${bwDottedBg});
  background-color: transparent;
  background-repeat: no-repeat;
  background-size: auto;
`
const BWbackground = styled.div`
  background-color: ${colors.white};

  ${media.desktop`
    min-height: 805px;
    background-image: url(${bwGraphic});
    background-repeat: no-repeat;
    background-size: auto;
    background-position: bottom;
  `};

  ${media.widescreen`
    min-height: 805px;
    background-image: url(${bwGraphic});
    background-repeat: no-repeat;
    background-size: auto;
    background-position: bottom;
  `};
`
const SmallCtas = styled.div`
  display: block;
  position: relative;
  margin-left: 40px;
  font-weight: ${fontWeight.bold};
  font-family: ${fonts.primary};
  font-size: ${fontSize.base};
  padding: 20px 0;

  ${media.desktop`
    margin-left: 40px;
    padding: 20px 0;
  `};

  a {
    font-weight: ${fontWeight.bold};
    font-family: ${fonts.primary};
    font-size: ${fontSize.sm};
    color: ${colors.textColor};
  }
`

const StoryHeader = styled.div`
  display: block;
  position: relative;
  font-family: ${fonts.tertiary};
  font-weight: ${fontWeight.bold};
  font-size: ${fontSize.xl};
  line-height: 2;
  width: 90%;
  tex-align: center;
  margin: 0 auto;
  padding: 0;

  ${media.tablet`
    width: 90%;
    margin: 0 auto;
    margin-top: 60px;
    background-color: white;
  `};

  ${media.desktop`
    width: 100%;
    margin: 0 auto;
    margin-top: 60px;
    background-color: transparent;
  `};
`

const StoryDetails = styled.div`
  display: block;
  position: relative;
  width: 90%;
  tex-align: center;
  margin: 0 auto;
  padding-bottom: 50px;
  background-color: ${colors.white};

  ${media.tablet`
    background-color: white;
  `};

  ${media.desktop`
    width: 100%;
    margin: 0 auto;
    text-align: left;
    background-color: ${colors.white};
  `};
`
const IconListWrapper = styled.div`
  display: block;
  position: relative;

  li {
    position: relative;
    display: inline-block;
    margin-left: 10px;
  }
`
const IconLinkAbsolute = styled.a`
  cursor: pointer;
`

class Info extends React.Component {
  static propTypes = {
    history: object.isRequired
  }

  static contextTypes = {
    intl: intlShape
  }

  state = {}

  render() {
    const { formatMessage } = this.context.intl

    return (
        <Grid className="is-full bg-white">
            <Grid.Unit
              size={{ tablet: 10 / 12, desktop: 10 / 12 }}
              className="mx-auto"
            >
              <BWbackground>
                <DottedBg>
                  <Grid className="is-full">
                    <Grid.Unit size={{ tablet: 1 / 2, desktop: 1 / 2 }}>
                      <figure
                        style={{ marginTop: '60px' }}
                        className="bordered-fig"
                      >
                        <img
                          src={jasonImage}
                          aria-hidden="true"
                          alt="Jason Dasilva"
                          style={{ width: '100%' }}
                        />
                      </figure>

                      <SmallCtas>
                        <a
                          href="https://www.youtube.com/user/AXSMapTV"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-link"
                        >
                          {formatMessage(messages.jasonFilms)}
                        </a>
                      </SmallCtas>

                      <IconListWrapper>
                        <ul className="unstyled-list">
                          <li>
                            <IconLinkAbsolute
                              href="https://facebook.com/axsmap"
                              target="_blank"
                              rel="noopener"
                            >
                              <span className="_hide-visual">
                                {formatMessage(messages.fbLabel)}
                              </span>
                              <img
                                src={fbGraphic}
                                aria-hidden="true"
                                alt="Facebook"
                              />
                            </IconLinkAbsolute>
                          </li>
                          <li>
                            <IconLinkAbsolute
                              href="https://www.instagram.com/axs.map/?hl=en"
                              target="_blank"
                              rel="noopener"
                            >
                              <span className="_hide-visual">
                                {formatMessage(messages.insLabel)}
                              </span>
                              <img
                                src={insGraphic}
                                aria-hidden="true"
                                alt="Instagram"
                              />
                            </IconLinkAbsolute>
                          </li>
                          <li>
                            <IconLinkAbsolute
                              href="https://twitter.com/axsmap"
                              target="_blank"
                              rel="noopener"
                            >
                              <span className="_hide-visual">
                                {formatMessage(messages.twLabel)}
                              </span>
                              <img
                                src={twGraphic}
                                aria-hidden="true"
                                alt="Twitter"
                              />
                            </IconLinkAbsolute>
                          </li>
                        </ul>
                      </IconListWrapper>
                    </Grid.Unit>
                    <Grid.Unit size={{ tablet: 1 / 2, desktop: 1 / 2 }}>
                      <Grid>
                        <Grid.Unit size={{ tablet: 1 / 1, desktop: 3 / 4 }}>
                          <StoryHeader>
                            {formatMessage(messages.jasonTitle)}
                          </StoryHeader>
                          <StoryDetails className="font-primary text-base leading-relaxed">
                            {formatMessage(messages.jasonMessage)}
                          </StoryDetails>
                        </Grid.Unit>
                      </Grid>
                    </Grid.Unit>
                  </Grid>
                </DottedBg>
              </BWbackground>
            </Grid.Unit>
          </Grid>

    )
  }
}

export default Info
