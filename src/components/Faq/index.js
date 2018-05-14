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

const Wrapper = styled(Wrp)`padding-bottom: 0;`

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
    const formatMessage = this.context.intl.formatMessage

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

        <Container>
          <Title>{formatMessage(messages.headerTitle)}</Title>

          <Video
            title="video-1"
            src="https://www.youtube.com/embed/4Chta29jjXQ?rel=0"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullscreen
          />

          <h2>How do I rate a location?</h2>

          <Video
            title="video-1"
            src="https://www.youtube.com/embed/DFswxhQj6UI?rel=0"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullscreen
          />

          <br />

          <p>
            This video explains it best. It&#39;s short and provides important
            background especially for able-bodied people who may not have
            experience being around people using wheelchairs, power chairs, or
            scooters. We here at AXS Map encourage everyone to contribute
            ratings on accessibility!
          </p>

          <h2>How do I rate the entryway?</h2>
          <p>
            <span>
              Consider the following criteria when rating an entryway:
            </span>
          </p>
          <ul>
            <li>
              <span>1 star</span>
              <span>
                &nbsp;&ndash; narrow, multiple steps to climb, no ramp available
              </span>
            </li>
            <li>
              <span>2 stars</span>
              <span>
                &nbsp;&ndash; narrow, one step to climb, no ramp available
              </span>
            </li>
            <li>
              <span>3 stars</span>
              <span>
                &nbsp;&ndash; portable ramp available, too steep or difficult to
                navigate
              </span>
            </li>
            <li>
              <span>4 stars</span>
              <span>
                &nbsp;&ndash; wide entrance with steps, portable ramp available
                that is accessible
              </span>
            </li>
            <li>
              <span>5 stars</span>
              <span>
                &nbsp;&ndash; wide entrance, no steps or has permanent ramp,
                easily accessible
              </span>
            </li>
          </ul>
          <h2>
            <span>How do I rate the bathroom?</span>
          </h2>
          <p>
            <span>Consider the following criteria when rating a bathroom:</span>
          </p>
          <ul>
            <li>
              <span>1 star</span>
              <span>
                &nbsp;&ndash; door swings in, small stalls, tall sinks, no bar
                supports around toilet
              </span>
            </li>
            <li>
              <span>2 stars</span>
              <span>
                &nbsp;&ndash; door swings in, average stalls, tall sinks, no bar
                supports around toilet
              </span>
            </li>
            <li>
              <span>3 stars</span>
              <span>
                &nbsp;&ndash; door swings out, large stalls, tall sinks, no bar
                supports around toilet
              </span>
            </li>
            <li>
              <span>4 stars</span>
              <span>
                &nbsp;&ndash; door swings out, large stalls, lowered sinks, one
                bar support around toilet
              </span>
            </li>
            <li>
              <span>5 stars</span>
              <span>
                &nbsp;&ndash; door swings out, large stalls, lowered sinks, two
                bar supports around toilet
              </span>
            </li>
          </ul>
          <h2>
            <span>Can I add a place that&#39;s not on AXS Map?</span>
          </h2>
          <p>
            <span>
              No&mdash;AXS Map pulls from the Google Places database to populate
              its maps. Google Places is working to catalogue businesses around
              the world. If a place is missing, we recommend submitting an
              inquiry to{' '}
            </span>
            <span>
              <a href="https://www.google.com/url?q=https://www.google.com/local/business/add?migratedId%3D06188353489892148674&amp;sa=D&amp;ust=1520224188105000&amp;usg=AFQjCNGl63hbmMkVSmDeWeK5pUKAMYzLyA">
                Google
              </a>
            </span>
            <span>.</span>
          </p>
          <h2>
            <span>
              In my neighborhood or city, there are a lot of places that
              haven&#39;t been reviewed. What should I do?
            </span>
          </h2>
          <p>
            <span>
              We need communities to band together to map their neighborhoods.
              At AXS Map we&rsquo;ve started a special tool to help you and your
              community do this. It&#39;s called the &#39;Mapathon&#39; tool,
              &amp;{' '}
            </span>
            <span>
              <a href="/mapathons">you should check it out!</a>
            </span>
            <span>
              &nbsp;It works like this: to jumpstart your community&rsquo;s
              accessibility push we recommend having an event where a large
              group of people together to go out and strategically map out the
              neighborhood. If you don&#39;t want to start a Mapathon, you can
              join one&mdash;we offer all the tools for you to make it happen.
              Check out the{' '}
            </span>
            <span>
              <a href="/mapathons">Mapathons page here</a>
            </span>
            <span>.</span>
          </p>
          <h2>
            <span>Can I review places where I don&#39;t live?</span>
          </h2>
          <p>
            <span>
              Absolutely. If you have been to a place and have a good memory of
              it (perhaps it&#39;s a place you frequent) feel free to give a
              review!{' '}
            </span>
          </p>
          <h2>
            <span>Do I have to register in order to use AXS Map?</span>
          </h2>
          <p>
            <span>
              No, you do not need to join in order to use AXS Map. Without
              joining, you will still be able to see all the reviews on AXS Map,
              and you will have full access to everything on our maps. But if
              you would like to give reviews we will need you to join first.{' '}
            </span>
            <span>
              <a href="/sign-up">Joining is free and easy</a>
            </span>
            <span>, &amp; a</span>
            <span>
              ll information you provide to AXS Map will remain anonymous.{' '}
            </span>
          </p>
          <h2>
            <span>
              How do I find a place I want to review on the AXS Map database?
            </span>
          </h2>
          <p>
            <span>There are several ways to find a place on AXS Map. </span>
          </p>
          <p>
            <span>
              On the main page for AXS Map you will see two search boxes. If you
              are looking for &lsquo;Joe&rsquo;s Coffee&rsquo; in Biloxi,
              Louisiana, then you would type in &lsquo;Joe&rsquo;s Coffee&rsquo;
              in the left search bar and &lsquo;Biloxi, Louisiana&rsquo; in the
              search bar on the right. If you are in a dense city like New York
              City it is helpful to type in the name of the location on the left
              and either a nearby address or the actual address in the right
              hand box.{' '}
            </span>
          </p>
          <p>
            <span>
              Another approach is to search &lsquo;Everything&rsquo; in the left
              searchbar and then on the right input an address at or nearby your
              location. The map will return 20 pins of businesses and places
              near that address. For the best results, include the zip code in
              the address. You can then choose to scroll through the search
              results or you can explore the map by panning and zooming. The
              zoom is in the upper left corner of the map. After zooming you can
              hit the &lsquo;Refresh&rsquo; button (magnifying glass icon) in
              the lower right corner of the map to refresh the results. Each
              time you hit the Refresh button, the map will return 20 new pins
              in the area you&rsquo;ve zoomed in on.{' '}
            </span>
          </p>
          <p>
            <span>
              If you&rsquo;ve tried these Search approaches and can&rsquo;t find
              the place you&rsquo;d like to review, it may be that the Google
              Places database has not indexed that business. In this case, we
              encourage you to contact Google in order for the location to be
              added to the database. &nbsp;
            </span>
          </p>
          <h2>
            <span>What&rsquo;s the process for a Mapathon&trade;?</span>
          </h2>

          <p>
            Have you watched our Mapathon animation? If not, then see it here.
          </p>

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
            <span>Mapathon Toolkit</span>
          </h2>

          <p>
            <b>Paper review forms:</b>{' '}
            <a
              href="https://s3.amazonaws.com/axsmap-media/documents/AXS+Map+Paper+Entry+Form+-+For+people+without+phones.xlsx"
              target="_blank"
              rel="noopener noreferrer"
            >
              These
            </a>{' '}
            forms allow your participants to enter reviews on paper. This is a
            good thing to have in case someone’s phone doesn’t work or in case a
            participant doesn’t have a phone.
          </p>

          <p>
            <b>Brochure for handing out to businesses:</b> When your Mapathon
            participants are out roaming the neighborhoods, sometimes it can be
            a bit startling to a business owner when they request to ‘see’ their
            bathroom.{' '}
            <a
              href="https://s3.amazonaws.com/axsmap-media/documents/AXS+Map+-+For+the+Business+Owner+or+Manager.docx"
              target="_blank"
              rel="noopener noreferrer"
            >
              Here’s
            </a>{' '}
            a brochure to help your Mapathoners introduce themselves to a
            business owner politely and explain what they’re doing.
          </p>

          <p>
            <b>How to rate:</b>{' '}
            <a
              href="https://s3.amazonaws.com/axsmap-media/documents/AXS+Map-+How+to+Rate+Guidance.docx"
              target="_blank"
              rel="noopener noreferrer"
            >
              Guidance on Giving Reviews
            </a>{' '}
            - Some of your participants may like to see some guidance on giving
            reviews.{' '}
            <a
              href="https://s3.amazonaws.com/axsmap-media/documents/AXS+Map+-+Tips+and+Tricks+of+the+Trade.docx"
              target="_blank"
              rel="noopener noreferrer"
            >
              This
            </a>{' '}
            document will provide some tips and instructions.
          </p>

          <p style={{ width: '100%', textAlign: 'center' }}>
            These are the steps for a typical Mapathon:
          </p>

          <ol>
            <li>
              <span>Schedule the Mapathon</span>
              <span>
                : &nbsp;We recommend setting a 4 hour period for a Saturday or
                Sunday, but you can set your Mapathon for a longer time period
                if you prefer &ndash; it can last a whole week!
              </span>
            </li>
            <li>
              <span>Invite people to participate</span>
              <span>
                : &nbsp;Invite as many people to your Mapathon as possible.
              </span>
            </li>
            <li>
              <span>Kickoff the Mapathon</span>
              <span>
                : &nbsp;It&rsquo;s usually best for everyone to meet in one spot
                for a kickoff. (You can also have a virtual kickoff if preferred
                for you and your participants.)
              </span>
            </li>
            <li>
              <span>Give a Quick Training to Participants</span>
              <span>
                : &nbsp;We show volunteers our &#39;How To Rate video&#39; and
                give them some other background from our toolkit. The toolkit
                includes a &lsquo;Tips&rsquo; page which describes how you can
                use AXS Map from your phone&rsquo;s web browser (Safari or
                Chrome) or use the AXS Map application for Android or for
                iPhone. If you don&rsquo;t have a phone, you can even use paper
                forms, which are also part of the toolkit.
              </span>
            </li>
            <li>
              <span>Register for AXS Map</span>
              <span>
                : &nbsp;Make sure all participants have registered on AXS Map so
                they can input reviews. This is very easy&mdash;it just requires
                an email address!
              </span>
            </li>
            <li>
              <span>Register for the Mapathon</span>
              <span>
                : &nbsp;Make sure your participants register for the Mapathon so
                we can count their reviews. This way at the end of the day you
                will know how many reviews were inputted from your Mapathon!
              </span>
            </li>
            <li>
              <span>Divide into Teams</span>
              <span>
                : &nbsp;After your volunteers have received about 10 mins of
                training, divide them into teams of 2-3 people and assign each
                team to map a different neighborhood.
              </span>
            </li>
            <li>
              <span>Register your teams (optional):</span>
              <span>
                &nbsp; If you want your teams to compete, make sure volunteers
                join teams using the AXS Map tool. This way we&rsquo;ll be able
                to track each team&rsquo;s number of reviews.{' '}
              </span>
            </li>
            <li>
              <span>Assign Neighborhoods to Teams</span>
              <span>
                : &nbsp;It is important that teams know what blocks of a city to
                cover. This can take the form of assigning a zip code, or
                setting up a 5 by 5 block area for each team.{' '}
              </span>
            </li>
            <li>
              <span>Offer Prizes (optional):</span>
              <span>
                &nbsp; If you are offering prizes to the team or individual that
                inputs the most reviews, show them the &lsquo;Scoreboard&rsquo;
                page and outline your prizes.
              </span>
            </li>
            <li>
              <span>Offer T-shirts (Optional)</span>
              <span>
                : &nbsp;If you&rsquo;re handing out AXS Map t-shirts, hand them
                out now!
              </span>
            </li>
            <li>
              <span>Send teams and individuals out to map</span>
              <span>.</span>
            </li>
            <li>
              <span>Watch the Scoreboard</span>
              <span>
                : &nbsp;You may track your volunteers and teams on the Scorecard
                page. The Scoreboard will update in real time.
              </span>
            </li>
            <li>
              <span>Meeting back at the kickoff location (optional)</span>
              <span>
                : &nbsp;At the end of the day, we recommend meeting back at the
                Kickoff location to hand out prizes and/or give all the
                volunteers a thank you. If participants have traveled long
                distances to participate in the Mapathon, you may decide
                it&rsquo;s better to skip this final step. This part is up to
                you!
              </span>
            </li>
          </ol>
        </Container>

        <Footer isNarrow />
      </Wrapper>
    )
  }
}

export default Faq
