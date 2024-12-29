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

const Table = styled.table`
  border: 1px solid black;
  border-collapse: collapse;
`

const TableHeader = styled.th`
  border: 1px solid black;
  border-collapse: collapse;
`

const TableDefinition = styled.td`
  border: 1px solid black;
  border-collapse: collapse;
`

const Title = styled.h1`
  display: none;
  margin: 0;
  color: ${colors.darkestGrey};

  ${media.desktop`
    display: block;
  `};
`

class PrivacyPolicy extends React.Component {
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

        <Container className="mx-auto" style={{ alignItems: "start" }}>
          <Title>{formatMessage(messages.headerTitle)}</Title>

          <p>
            <span>{formatMessage(messages.date)}</span>
          </p>
          <h3>I. General</h3>
          <p>
            AXS Lab Inc. and its affiliates (collectively, “we,” “our,” “us,” or “AXS”) owns and operates <a href="http://www.axsmap.com">www.axsmap.com</a> (the “Site”) and we are committed to protecting your privacy and Personal
            Information (as defined below) about you. This Privacy Notice is intended to describe our
            practices regarding information that identifies, relates to, describes, is reasonably capable of
            being associated with, or could reasonably be linked, directly or indirectly, with a particular
            individual or household (collectively “Personal Information.”) relating to visitors to the Site
            (“you” or “your”), for what purposes Personal Information may be used, and with whom we may
            share Personal Information.
          </p>

          <h3>II. What Personal Information Do We Collect?</h3>

          <h4>a) When You Register on the Site</h4>
          <p>When you register on the Site, we collect the following identifiers that may, alone or in
            combination with other information, constitute Personal Information:</p>
          <ul>
            <li>Name;</li>
            <li>E-mail;</li>
            <li>Password;</li>
            <li>Address; and</li>
            <li>Your newsletter subscription choice.</li>
          </ul>
          <p>You have no obligation to provide the Personal Information described above, but if you don’t
            provide such Personal Information, you may not be able to use some of the features on the Site.
            Please note that you have the right to opt out of receiving electronic direct marketing
            communications, such as newsletters, from us. All electronic direct marketing communications
            that you may receive from us, such as e-mail messages and SMS-messages, give you an option
            of not receiving such communications from us in the future. If you have any additional questions
            about electronic direct marketing received from us, please contact us at <a href="mailto:axsmap@axslab.org">axsmap@axslab.org</a>.</p>

          <h4>b) When You Communicate With Us</h4>
          <p>When you communicate with us in and through the Site, e-mail us, or otherwise communicate
            with us, we collect the following identifiers that may, alone or in combination with other
            information, constitute Personal Information:</p>
          <ul>
            <li>Name;</li>
            <li>Contact information such as email address and a street address; and</li>
            <li>Content of communications sent to us.</li>
          </ul>
          <p>You have no obligation to provide the Personal Information described above, but if you don’t
            provide such Personal Information, we may not be able to respond to your communications to us.</p>

          <h4>c) When You Request Information From Us</h4>
          <p>When you use the “Contact” function on the Site, we collect the following identifiers that may,
            alone or in combination with other information, constitute Personal Information:</p>
          <ul>
            <li>Name;</li>
            <li>Contact information such as e-mail address; and</li>
            <li>Content of communications sent to us.</li>
          </ul>
          <p>You have no obligation to provide the Personal Information described above, but if you don’t
            provide such Personal Information, we may not be able to respond to your requests.</p>

          <h4>d) Data Request and Deletion</h4>
          <p>
            You have the right under this Privacy Policy to:
          </p>
          <ol>
            <li><b>Request access to Your Personal Data.</b> The right to access, update or delete the
              information We have on You. Whenever made possible, you can access or update Your
              Personal Data directly within Your account settings section. If you are unable to perform
              these actions yourself, please contact Us to assist You. This also enables You to receive a
              copy of the Personal Data We hold about You.</li>
            <li><b>Request correction of the Personal Data that We hold about You.</b> You have the right
              to have any incomplete or inaccurate information We hold about You corrected.</li>
            <li><b>Request erasure of Your Personal Data.</b> You have the right to ask Us to delete or
              remove Personal Data when there is no good reason for Us to continue processing it. To
              request deletion of your data, please contact us at axsmap@axslab.org or use our Contact
              Us page.</li>
            <li><b>Request the transfer of Your Personal Data.</b> We will provide to You, or to a third-
              party You have chosen, Your Personal Data in a structured, commonly used, machine-
              readable format. Please note that this right only applies to automated information which
              You initially provided consent for Us to use or where We used the information to
              perform a contract with You.</li>
            <li><b>Withdraw Your consent.</b> You have the right to withdraw Your consent on using your
              Personal Data. If You withdraw Your consent, We may not be able to provide You with
              access to certain specific functionalities of the Service.</li>
          </ol>
          <p>In order to action any of the above requests, please contact us via the following:</p>
          <p><a href="mailto:axsmap@axslab.org">axsmap@axslab.org</a> or use our Contact Us page.</p>

          <h4>e) Surveys, Sweepstakes, and Promotions</h4>
          <p>You may be able to participate in surveys, sweepstakes and other promotions on the Site
            (collectively “Promotions”). If you choose to participate in the Promotions, we may collect the
            following identifiers that may, alone or in combination with other information, constitute
            Personal Information:</p>
          <ul>
            <li>Name; and</li>
            <li>Contact information such as e-mail address, postal address and phone number.</li>
          </ul>
          <p>You have no obligation to provide the Personal Information described above, but if you don’t
            provide such Personal Information, you may not be able to participate in Promotions.</p>

          <h4>f) Internet Activity Information</h4>
          <p>Software used on the Site collects Internet or other electronic network activity information that
            may, alone or in combination with other information, constitute Personal Information:</p>
          <ul>
            <li>The domain from which you access the Site;</li>
            <li>The type of browser and operating system used in the device you use to access the Site;</li>
            <li>Internet Protocol (IP) address;</li>
            <li>The date and time you visited the Site (time stamp);</li>
            <li>The pages browsed on the Site;</li>
            <li>The website used to link to the Site from;</li>
            <li>Any search terms used to navigate the Site;</li>
            <li>Products purchased and viewed on the Site;</li>
            <li>A browsing session ID; and</li>
            <li>Whether you are a first-time visitor to the Site.</li>
          </ul>
          <p>For additional information about cookies used on the Site, please review Section 10 below.</p>
          <p>Google Analytics is an element of the Site. By using cookies, Google Analytics collects and
            stores data such as time of visit, pages visited, time spent on each page of the Site, the Internet
            Protocol address, and the type of operating system used in the devices used to access the Site. By
            using a browser plugin available at <a href="http://www.google.com/ads/preferences/plugin/">http://www.google.com/ads/preferences/plugin/</a> provided by
            Google, you can opt out of Google Analytics.</p>

          <h3>III. The Sources of Personal Information</h3>
          <p>We collect Personal Information from the following categories of sources:</p>
          <ul>
            <li>You: When you voluntarily provide Personal Information to us;</li>
            <li>Third party identity management providers such as Facebook or Google; and</li>
            <li>Software: Information automatically collected via cookies, web logs, web beacons, and
              other software-based analytics tools.</li>
          </ul>

          <h3>IV. Why We Collect Personal Information About You</h3>
          <p>We use Personal Information about you for the following purposes:</p>
          <ul>
            <li>To operate and improve our Site, including through analytics to help us understand how
              you use the Site, so that we can present content in the best manner;</li>
            <li>To provide the services, such as the ability to organize Mapathons, made available on the
              Site;</li>
            <li>To provide you with any information that you request from us. If you do not provide us
              with the information we need to respond to your request, we may not be able to provide
              you with the information that you request from us;</li>
            <li>To notify you about changes to the Site;</li>
            <li>To enable us to issue a notice, administrative, or corrective action to you in relation to the
              Site, if required;</li>
            <li>To send you direct marketing messages that you have consented to receive;</li>
            <li>To protect against, identify and prevent fraud and other unlawful activity, claims and
              other liabilities;</li>
            <li>To comply with applicable legal requirements, industry standards, and our own policies;
              and</li>
            <li>Where permitted by law, to provide you with information about other products and
              services we offer that are similar to those that you have already subscribed to or enquired
              about and we feel may interest you.</li>
          </ul>

          <h3>V. How We Disclose Personal Information</h3>
          <p>We may disclose the following categories of Personal Information with the following categories
            of third parties for business purposes:</p>
          <Table>
            <tr>
              <TableHeader style={{ width: "25%" }}>Category of Personal Information</TableHeader>
              <TableHeader>Category of Third Party</TableHeader>
            </tr>
            <tr>
              <TableDefinition> <ul>
                <li>Identifiers</li>
                <li>Internet activity information</li>
                <li>Professional information</li>
              </ul></TableDefinition>
              <TableDefinition>Our affiliates (such as subsidiaries that we
                own)</TableDefinition>
            </tr>
            <tr>
              <TableDefinition> <ul>
                <li>Identifiers</li>
                <li>Professional information</li>
                <li>Internet activity information</li>
              </ul></TableDefinition>
              <TableDefinition>Service providers: We use services providers
                such as website hosting and management
                companies, and data storage and data analysis
                companies. Such service providers can only
                use Personal Information to provide such
                services to us and for no other purpose.</TableDefinition>
            </tr>
            <tr>
              <TableDefinition> <ul>
                <li>Identifiers</li>
                <li>Professional information</li>
                <li>Internet activity information</li>
              </ul></TableDefinition>
              <TableDefinition>Parties to a corporate transaction or
                proceeding: In the event of a corporate sale,
                merger, reorganization, bankruptcy,
                dissolution or similar event, Personal
                Information may be part of the transferred
                assets.</TableDefinition>
            </tr>
            <tr>
              <TableDefinition> <ul>
                <li>Identifiers</li>
                <li>Professional information</li>
              </ul></TableDefinition>
              <TableDefinition>Public authorities and legal proceedings: AXS
                may disclose Personal Information about you
                to government or law enforcement officials or
                private parties as required by law, and
                disclose and use such information as we
                believe necessary or appropriate to (a)
                comply with applicable laws and lawful
                requests and legal process, such as to respond
                to subpoenas or requests from government
                authorities; (b) enforce the terms and
                conditions that govern the Site; (d) protect our
                rights, privacy, safety or property, and/or that
                of you or others; and (e) protect, investigate
                and deter against fraudulent, harmful,
                unauthorized, unethical or illegal activity.</TableDefinition>
            </tr>
          </Table>


          <h3>VI. California Privacy Rights</h3>
          <h4>a) Introduction</h4>
          <p>California Civil Code Section 1798.83 permits the users of the Site who are California residents
            to request certain information regarding our disclosure of Personal Information to third parties
            for their direct marketing purposes. To make such a request, please contact us at <a href="mailto:axsmap@axslab.org">axsmap@axslab.org</a>.</p>

          <h3>VII. Data Retention</h3>
          <p>We will only retain Personal Information about you for as long as necessary to fulfill the
            purposes Personal Information was collected for, including the purposes of satisfying any legal,
            accounting or reporting requirements. To determine the appropriate retention period for Personal
            Information, we consider the amount, nature, and sensitivity of the Personal Information, the
            potential risk of harm from unauthorized use or disclosure of Personal Information, the purposes
            for which we process Personal Information and whether we can achieve those purposes through
            other means, and applicable legal requirements.</p>

          <h3>VIII. Links to Other Websites</h3>
          <p>The Site may contain links to other websites of interest. However, once you have used these
            links to leave the Site, we do not have any control over third party websites. We cannot be
            responsible for the protection and privacy of any Personal Information which you provide whilst
            visiting such sites and such sites are not governed by this Privacy Notice. You should exercise
            caution and review the privacy notice applicable to the website in question.</p>

          <h3>IX. Children</h3>
          <p>The Site and the Services are not intended for children under the age of 16. Accordingly, we do
            not intend to collect Personal Information from anyone we know to be under 16 years of age. We
            do not intentionally collect, sell, or process the Personal Information of individuals under 16
            years of age.</p>

          <h3>X. How Do We Use Cookies?</h3>
          <p>Some of the features on the Site require the use of &quot;cookies&quot; - small text files that are stored on
            your device&#39;s hard drive. We use cookies to measure which pages are being accessed, and which
            features are most frequently used. This enables us to continuously improve the Site to meet the
            needs of our visitors.</p>
          <p>The following sets out how we may use different categories of cookies and your options for
            managing cookie settings:</p>
          <Table>
            <tr>
              <TableHeader style={{ width: "10%" }}>Type of Cookies</TableHeader>
              <TableHeader style={{ width: "60%" }}>Description</TableHeader>
              <TableHeader style={{ width: "30%" }}>Managing Settings</TableHeader>
            </tr>
            <tr>
              <TableDefinition>
                Required cookies
              </TableDefinition>
              <TableDefinition>
                Required cookies enable you to navigate the Site
                and use its features, such as accessing secure
                areas of the Site and using our services. If you
                have chosen to identify yourself to us, we use
                cookies containing encrypted information to
                allow us to uniquely identify you. These cookies
                allow us to uniquely identify you when you are
                logged into the Site and to process your online
                transactions and requests.
              </TableDefinition>
              <TableDefinition>
                Because required cookies are
                essential to operate the Site,
                there is no option to opt out of
                these cookies.
              </TableDefinition>
            </tr>
            <tr>
              <TableDefinition>
                Performance cookies
              </TableDefinition>
              <TableDefinition>
                These cookies collect information about how you
                use the Site, including which pages you go to
                most often and if they receive error messages
                from certain pages. These cookies do not collect
                information that individually identifies you.
                Information is only used to improve how the Site
                functions and performs. From time to time, we
                may engage third parties to track and analyze
                usage and volume statistical information relating
                to individuals who visit the Site. We may also
                utilize Flash cookies for these purposes.
              </TableDefinition>
              <TableDefinition>
                To learn how to opt out of
                performance cookies using
                your browser settings, click
                here. To learn how to manage
                privacy and storage settings
                for Flash cookies, click here.
              </TableDefinition>

            </tr>  <tr>
              <TableDefinition>
                Functionality cookies
              </TableDefinition>
              <TableDefinition>
                Functionality cookies allow the Site to remember
                information you have entered or choices you
                make (such as your username, language, or your
                region) and provide enhanced, more personal
                features. These cookies also enable you to
                optimize your use of the Site after logging in.
                These cookies can also be used to remember
                changes you have made to text size, fonts and
                other parts of web pages that you can customize.
                We may use local shared objects, also known as
                Flash cookies, to store your preferences or display
                content based upon what you view on the Site to
                personalize your visit.
              </TableDefinition>
              <TableDefinition>
                To learn how to opt out of
                functionality cookies using
                your browser settings, click
                here. To learn how to manage
                privacy and storage settings
                for Flash cookies, click here.
              </TableDefinition>
            </tr>
          </Table>

          <h3>XI. Security</h3>
          <p>We take reasonable and appropriate measures to protect Personal Information from loss, misuse
            and unauthorized access, disclosure, alteration and destruction, taking into account the risks
            involved in the processing and the nature of the Personal Information. Despite these efforts to
            store Personal Information collected on and through the Site and otherwise by us in a secure
            operating environment that is not available to the public, we cannot guarantee the security of
            Personal Information during its transmission or its storage on our systems. Further, while we
            attempt to ensure the integrity and security of Personal Information, we cannot guarantee that our
            security measures will prevent third-parties such as so-called hackers from illegally obtaining
            access to Personal Information. We do not warrant or represent that Personal Information about
            you will be protected against, loss, misuse, or alteration by third parties.</p>

          <h3>XII. Changes to This Notice</h3>
          <p>This Privacy Notice may change from time to time, effective from the date mentioned in the
            updated version of the Privacy Notice. You can tell when this Privacy Notice was last updated by
            reviewing the Last Updated legend at the top of this page. Please check the Site periodically to
            review such changes in the Privacy Notice.</p>

          <h3>XIII. Do Not Track (‘DNT’) Settings</h3>
          <p>California law requires us to let you know how we respond to web browser Do Not Track (DNT)
            signals. Because there currently isn’t an industry or legal standard for recognizing or honoring
            DNT signals, we don’t respond to them at this time.</p>

          <h3>XIV. Contact Us</h3>
          <p>If you have any questions or concerns about this Privacy Notice or about our privacy or data
            security practices, please contact us via the following: <a href="mailto:axsmap@axslab.org">axsmap@axslab.org</a>.</p>
        </Container>

        <Footer isNarrow />
      </Wrapper>
    )
  }
}

export default PrivacyPolicy
