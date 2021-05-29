import { object } from 'prop-types'
import React from 'react'
import ReactGA from 'react-ga'
import Helmet from 'react-helmet'
import { intlShape } from 'react-intl'
import styled from 'styled-components'

import Container from '../Container'
import Footer from '../Footer'
import NavBar from '../NavBar'
import { colors, media } from '../../styles'
import TopBar from '../../containers/TopBar'
import Wrp from '../Wrapper'

import messages from './messages'

const Wrapper = styled(Wrp)`
  padding-bottom: 0;
`

const Title = styled.h1`
  display: none;
  margin: 0 0 1rem 0;
  color: ${colors.darkestGrey};

  ${media.desktop`
    display: block;
  `};
`

const Video = styled.iframe`
  height: 15rem;
  width: 100%;
  max-width: 40rem;

  ${media.tablet`
    height: 20rem;
  `};

  ${media.desktop`
    height: 25rem;
  `};
`

class Faq extends React.Component {
  static propTypes = {
    history: object.isRequired
  }

  static contextTypes = {
    intl: intlShape
  }

  componentWillMount() {
    ReactGA.pageview(window.location.pathname + window.location.search)
  }

  render() {
    const { formatMessage } = this.context.intl

    return (
      <Wrapper>
        <Helmet title={formatMessage(messages.pageTitle)} />

        <TopBar hideOn="phone,tablet" />

        <NavBar
          hideOn="desktop,widescreen"
          isNarrow
          title={formatMessage(messages.headerTitle)}
          goBackHandler={() => this.props.history.goBack()}
        />

        <Container className="mx-auto">
          <Title>{formatMessage(messages.headerTitle)}</Title>

          <Video
            title="video-1"
            src="https://www.youtube.com/embed/7iUUeLaiUBE?rel=0"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullscreen
          />

          <br />

          <h2>{formatMessage(messages.rateVenue)}</h2>
          <p>
            <span>{formatMessage(messages.axsFirstLine)}</span>
          </p>
          <ul>
            <li>
              <span>{formatMessage(messages.entrance)}</span>
              <span>{formatMessage(messages.entranceText)}</span>
            </li>
            <li>
              <span>{formatMessage(messages.interior)}</span>
              <span>{formatMessage(messages.interiorText)}</span>
            </li>
            <li>
              <span>{formatMessage(messages.restroom)}</span>
              <span>{formatMessage(messages.restroomText)}</span>
            </li>
            <li>
              <span>{formatMessage(messages.other)}</span>
              <span>{formatMessage(messages.otherText)}</span>
            </li>
          </ul>

          <h2>
            <span>{formatMessage(messages.placesNotOnAxs)}</span>
          </h2>
          <p>
            <span>{formatMessage(messages.notOnAxsText)}</span>
            <span>
              <a href="https://www.google.com/url?q=https://www.google.com/local/business/add?migratedId%3D06188353489892148674&amp;sa=D&amp;ust=1520224188105000&amp;usg=AFQjCNGl63hbmMkVSmDeWeK5pUKAMYzLyA">
                Google
              </a>
            </span>
            <span>.</span>
          </p>
          <h2>
            <span>{formatMessage(messages.noReview)}</span>
          </h2>
          <p>
            <span>{formatMessage(messages.noReviewText)}</span>
            <span>
              <a href="/mapathons">{formatMessage(messages.checkOut)}</a>
            </span>
            <span>{formatMessage(messages.worksLikeThis)}</span>
            <span>
              <a href="/mapathons">{formatMessage(messages.mapathonsHere)}</a>
            </span>
            <span>.</span>
          </p>
          <h2>
            <span>{formatMessage(messages.reviewNonlivingArea)}</span>
          </h2>
          <p>
            <span>{formatMessage(messages.reviewNonlivingAreaText)}</span>
          </p>
          <h2>
            <span>{formatMessage(messages.register)}</span>
          </h2>
          <p>
            <span>{formatMessage(messages.registerText)}</span>
            <span>
              <a href="/sign-up">
                {formatMessage(messages.joiningText)}
                {' '}
              </a>
            </span>
            <span> </span>
            <span>{formatMessage(messages.joiningText2)}</span>
          </p>
          <h2>
            <span>{formatMessage(messages.findPlace)}</span>
          </h2>
          <p>
            <span>{formatMessage(messages.findPlaceText1)}</span>
          </p>
          <p>
            <span>
              {/* On the main page for AXS Map you will see two search boxes. If you
              are looking for &lsquo;Joe&rsquo;s Coffee&rsquo; in Biloxi,
              Louisiana, then you would type in &lsquo;Joe&rsquo;s Coffee&rsquo;
              in the left search bar and &lsquo;Biloxi, Louisiana&rsquo; in the
              search bar on the right. If you are in a dense city like New York
              City it is helpful to type in the name of the location on the left
              and either a nearby address or the actual address in the right
              hand box.{' '} */}
              {formatMessage(messages.findPlaceText2)}
            </span>
          </p>
          <p>
            <span>
              {/* Another approach is to search &lsquo;Everything&rsquo; in the left
              searchbar and then on the right input an address at or nearby your
              location. The map will return 20 pins of businesses and places
              near that address. For the best results, include the zip code in
              the address. You can then choose to scroll through the search
              results or you can explore the map by panning and zooming. The
              zoom is in the upper left corner of the map. After zooming you can
              hit the &lsquo;Refresh&rsquo; button (magnifying glass icon) in
              the lower right corner of the map to refresh the results. Each
              time you hit the Refresh button, the map will return 20 new pins
              in the area you&rsquo;ve zoomed in on.{' '} */}
              {formatMessage(messages.findPlaceText3)}
            </span>
          </p>
          <p>
            <span>
              {/* If you&rsquo;ve tried these Search approaches and can&rsquo;t find
              the place you&rsquo;d like to review, it may be that the Google
              Places database has not indexed that business. In this case, we
              encourage you to contact Google in order for the location to be
              added to the database. &nbsp; */}
              {formatMessage(messages.findPlaceText4)}
            </span>
          </p>
          <h2>
            <span>{formatMessage(messages.process)}</span>
          </h2>

          <p>{formatMessage(messages.processText)}</p>

          <br />

          <Video
            title="video-1"
            src="https://www.youtube.com/embed/bWvGxKduM3k?rel=0"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullscreen
          />

          <br />

          <h2>
            <span>{formatMessage(messages.toolkit)}</span>
          </h2>

          <p>
            <b>{formatMessage(messages.paperToolkit)}</b>
            {' '}
            <a
              href="https://s3.amazonaws.com/axsmap-media/documents/AXS+Map+Paper+Entry+Form+-+For+people+without+phones.xlsx"
              target="_blank"
              rel="noopener noreferrer"
            >
              {formatMessage(messages.toolkitPaperThese)}
            </a>
            {' '}
            {formatMessage(messages.toolkitPaper)}
          </p>

          <p>
            <b>{formatMessage(messages.brochure)}</b>
            {' '}
            {formatMessage(messages.brochureText)}
            {' '}
            <a
              href="https://s3.amazonaws.com/axsmap-media/documents/AXS+Map+-+For+the+Business+Owner+or+Manager.docx"
              target="_blank"
              rel="noopener noreferrer"
            >
              {formatMessage(messages.brochureText2)}
            </a>
            {' '}
            {formatMessage(messages.brochureText3)}
          </p>

          <p>
            <b>{formatMessage(messages.howToRate)}</b>
            {' '}
            <a
              href="https://s3.amazonaws.com/axsmap-media/documents/AXS+Map-+How+to+Rate+Guidance.docx"
              target="_blank"
              rel="noopener noreferrer"
            >
              {formatMessage(messages.guidance)}
            </a>
            {' '}
            {formatMessage(messages.guidanceText)}
            {' '}
            <a
              href="https://s3.amazonaws.com/axsmap-media/documents/AXS+Map+-+Tips+and+Tricks+of+the+Trade.docx"
              target="_blank"
              rel="noopener noreferrer"
            >
              {formatMessage(messages.howToRateText1)}
            </a>
            {' '}
            {formatMessage(messages.howToRateText2)}
          </p>

          <p style={{ width: '100%', textAlign: 'center' }}>
            {formatMessage(messages.typesOfMapathons)}
          </p>

          <ol>
            <li>
              <span>{formatMessage(messages.schedule)}</span>
              <span>
                {/* : &nbsp;We recommend setting a 4 hour period for a Saturday or
                Sunday, but you can set your Mapathon for a longer time period
                if you prefer &ndash; it can last a whole week! */}
                {formatMessage(messages.scheduleText)}
              </span>
            </li>
            <li>
              <span>{formatMessage(messages.invite)}</span>
              <span>
                {/* : &nbsp;Invite as many people to your Mapathon as possible. */}
                {formatMessage(messages.inviteText)}
              </span>
            </li>
            <li>
              <span>{formatMessage(messages.kickoff)}</span>
              <span>
                {/* : &nbsp;It&rsquo;s usually best for everyone to meet in one spot
                for a kickoff. (You can also have a virtual kickoff if preferred
                for you and your participants.) */}
                {formatMessage(messages.kickoffText)}
              </span>
            </li>
            <li>
              <span>{formatMessage(messages.training)}</span>
              <span>{formatMessage(messages.trainingText)}</span>
            </li>
            <li>
              <span>{formatMessage(messages.registerForAxs)}</span>
              <span>{formatMessage(messages.registerForAxsText)}</span>
            </li>
            <li>
              <span>{formatMessage(messages.registerForMapathon)}</span>
              <span>{formatMessage(messages.registerForMapathonText)}</span>
            </li>
            <li>
              <span>{formatMessage(messages.teams)}</span>
              <span>{formatMessage(messages.teamsText)}</span>
            </li>
            <li>
              <span>{formatMessage(messages.registerTeam)}</span>
              <span>{formatMessage(messages.registerTeamText)}</span>
            </li>
            <li>
              <span>{formatMessage(messages.neighbourhood)}</span>
              <span>{formatMessage(messages.neighbourhoodText)}</span>
            </li>
            <li>
              <span>{formatMessage(messages.prizes)}</span>
              <span>{formatMessage(messages.prizesText)}</span>
            </li>
            <li>
              <span>{formatMessage(messages.tshirt)}</span>
              <span>{formatMessage(messages.tshirtText)}</span>
            </li>
            <li>
              <span>{formatMessage(messages.sendForMapping)}</span>
            </li>
            <li>
              <span>{formatMessage(messages.scoreboard)}</span>
              <span>{formatMessage(messages.scoreboardText)}</span>
            </li>
            <li>
              <span>{formatMessage(messages.locationMeetup)}</span>
              <span>{formatMessage(messages.locationMeetupText)}</span>
            </li>
          </ol>
        </Container>

        <Footer isNarrow />
      </Wrapper>
    )
  }
}

export default Faq
