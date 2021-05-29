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
  margin: 0;
  color: ${colors.darkestGrey};

  ${media.desktop`
    display: block;
  `};
`

class Tac extends React.Component {
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
    const {formatMessage} = this.context.intl

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

          <p>
            <span>Last Updated: March 8, 2021.</span>
          </p>
          <p>
            <span>
              By using the websites and mobile applications of AXS Map, you are agreeing to the following terms and conditions. Please read them carefully.
            </span>
          </p>
          <p>
            <span>
            THESE TERMS SET FORTH THE LEGALLY BINDING TERMS AND CONDITIONS THAT GOVERN YOUR USE OF THE SITE. BY ACCESSING OR USING THE SITE, 
            YOU ARE ACCEPTING THESE TERMS, AND YOU REPRESENT AND WARRANT THAT YOU HAVE THE RIGHT, AUTHORITY, AND CAPACITY TO ENTER INTO THESE TERMS. 
            IF YOU DO NOT AGREE WITH ALL OF THE PROVISIONS OF THESE TERMS, DO NOT ACCESS AND/OR USE THE SITE. THESE TERMS REQUIRE THE USE OF ARBITRATION 
            (SECTION axsmap@axslab.org) ON AN INDIVIDUAL BASIS TO RESOLVE DISPUTES, RATHER THAN JURY TRIALS OR CLASS ACTIONS, AND ALSO LIMIT THE REMEDIES 
            AVAILABLE TO YOU IN THE EVENT OF A DISPUTE.
            </span>
          </p>
          <h2 id="h.vuvck442mcwk">
            <span>1. Definitions</span>
          </h2>
          <h3 id="h.8rsji8yakunl">
            <span>A.</span>
          </h3>
          <h3 id="h.a1tf29v85zyx">
            <span>Parties</span>
          </h3>
          <p>
            <span>
              &quot;You&quot; and &quot;your&quot; refer to you as user of the
              Site. A &quot;user&quot; is someone who accesses, browses, or in
              any way uses the Site. &quot;We&quot;, &quot;us&quot;, and
              &quot;our&quot; refer to AXS.
            </span>
          </p>
          <h3 id="h.j7x5jgl4gc8k">
            <span>B.</span>
          </h3>
          <h3 id="h.ump2bmknjs3o">
            <span>Content</span>
          </h3>
          <p>
            <span>
              &quot;Content&quot; means text, images, photos, audio, video,
              location data, and all other forms of data or communication.
              &quot;Your Content&quot; means Content that you submit or transmit
              to, through, or in connection with the Site, such as ratings,
              reviews, compliments, invitations, check-ins, messages, images,
              and information that you publicly display or displayed in your
              account profile. &quot;User Content&quot; means Content that users
              submit or transmit to, through, or in connection with the Site.
              &quot;AXS Content&quot; means Content that we create and make
              available in connection with the Site. &quot;Third Party
              Content&quot; means Content that originates from parties other
              than AXS or its users, which is made available in connection with
              the Site. &quot;Site Content&quot; means all of the Content that
              is made available in connection with the Site, including Your
              Content, User Content, Third Party Content, and AXS Content.
            </span>
          </p>
          <h2 id="h.1fw870qgqcv5">
            <span>2. Changes to the Terms of Service</span>
          </h2>
          <p>
            <span>
              We may modify the Terms from time to time. When changes are made,
              we will notify you by making the revised version available on this
              webpage, and will indicate at the top of this page the date that
              revisions were last made. You should revisit these Terms on a
              regular basis, as revised versions will be binding on you. Any
              such modification will be effective upon our posting of new Terms.
              You understand and agree that your continued access to or use of
              the Site after any posted modification to the Terms indicates your
              acceptance of the modification.
            </span>
          </p>
          <h2 id="h.5wofm6p8ffs1">
            <span>3. Using the Site</span>
          </h2>
          <h3 id="h.9jlqoxw0h3wa">
            <span>A.</span>
          </h3>
          <h3 id="h.j5cbi2df6f59">
            <span>Eligibility</span>
          </h3>
          <p>
            <span>
              To access or use the Site, you must be 13 years or older and have
              the requisite power and authority to enter into these Terms. You
              may not access or use the Site if you have been banned from the
              Site or closed your account.
            </span>
          </p>
          <p>
            <span>
              You may not use the Site and may not accept the Terms if (a) you
              are not of legal age to form a binding contract with AXS, or (b)
              you are a person barred from using the Site under the laws of the
              United States or other countries including the country in which
              you are resident or from which you use the Site.
            </span>
          </p>
          <h5 id="h.ojx4yt5lw5sc">
            <span>U</span>
            <span>sers Under the Age of 18</span>
          </h5>
          <p>
            <span>
              The Site is not targeted to users under 13 years of age. If you are under 13 years of age, 
              you will not be permitted to create an account on the Site. If we find out that any personal 
              information we have collected is from someone under the age of 13, this personal information will be deleted.
            </span>
          </p>
          <p>
            <span>
              If you are under 18, by using the Site you are representing (i.e. making a promise) that you are acting with consent 
              from your parent / guardian to use the Site in accordance with these terms and conditions. We may remove any account 
              if we are not satisfied that such consent has been given.
            </span>
          </p>
          <p>
            <span>
              If we are told by a parent / guardian that their child has lied
              about their age when creating an account, we will remove the
              account provided we have information which satisfies us that the
              reporting individual is indeed the parent or guardian.
            </span>
          </p>
          <h3 id="h.xp1z9jan7e5z">
            <span>B.</span>
          </h3>
          <h3 id="h.jjtefjjjhnkp">
            <span>Permission to Use the Site</span>
          </h3>
          <p>
            <span>
              Subject to these Terms, we grant you a personal, non-exclusive, non-transferable, limited and revocable right to access and use, 
              solely over the internet, the Site in connection with your personal non-commercial purposes; provided, that such use is at all 
              times lawful. Your use of the Site is at your own risk, including the risk that you might be exposed to Content that is offensive, 
              indecent, inaccurate, objectionable, or otherwise inappropriate.
            </span>
          </p>
          <h3 id="h.qohfslpz3cvn">
            <span>C.</span>
          </h3>
          <h3 id="h.19x1mhezly9h">
            <span>Site Availability</span>
          </h3>
          <p>
            <span>
              The Site may be modified, updated, interrupted, suspended, or
              discontinued at any time without notice or liability.
            </span>
          </p>
          <h3 id="h.k4c6wrdganq6">
            <span>D.</span>
          </h3>
          <h3 id="h.6gi0gxvsx6rf">
            <span>User Accounts</span>
          </h3>
          <p>
            <span>
              You may create an account and provide certain personal information about yourself in order to use some of the features that are 
              offered through the Site. You are responsible for maintaining the confidentiality of your account password. You are also responsible 
              for all activities that occur in connection with your account. You agree to notify us immediately of any unauthorized use of your account. 
              We reserve the right to close your account at any time for any or no reason. We will not be liable for any loss that you may incur as a 
              result of someone else using your password or account, either with or without your knowledge. However, you will be liable for losses incurred by 
              AXS or another party due to someone else using your account or password. You agree to notify us immediately using the contact information listed 
              below of any unauthorized use of your user account.
            </span>
          </p>
          <p>
            <span>
              Your account is for your personal, non-commercial use only. In creating it, we ask that you provide complete and accurate information about yourself 
              to bolster your credibility as a contributor to the Site. You may not impersonate someone else, create or use an account for anyone other than yourself, 
              provide an email address other than your own, or create multiple accounts. If you use a pseudonym, take care to note that others may still be able to 
              identify you if, for example, you include personal information in your reviews, use the same account information on other sites, or allow other sites 
              to share information about you with AXS.
            </span>
          </p>
          <h3 id="h.8b4jip8ysyvs">
            <span>E.</span>
          </h3>
          <h3 id="h.69ir81qp8c30">
            <span>Communications from AXS and other Users</span>
          </h3>
          <p>
            <span>
              By creating an account, you agree to receive certain
              communications in connection with the Site. You may choose to opt
              out of non-essential communications.
            </span>
          </p>
          <h2 id="h.4wfvu4wjtats">
            <span>4. Content</span>
          </h2>
          <h3 id="h.ikm78bdvgymh">
            <span>A.</span>
          </h3>
          <h3 id="h.r0flp1ff8r5j">
            <span>Responsibility for Your Content</span>
          </h3>
          <p>
            <span>
              You alone are responsible for Your Content, and once published, it
              cannot always be withdrawn. You assume all risks associated with
              Your Content, including anyone&#39;s reliance on its quality,
              accuracy, or reliability, or any disclosure by you of information
              in Your Content that makes you personally identifiable. You
              represent that you own, or have the necessary permissions to use
              and authorize the use of Your Content as described herein. You may
              not imply that Your Content is in any way sponsored or endorsed by
              AXS.
            </span>
          </p>
          <p>
            <span>
              You may expose yourself to liability if, for example, Your Content contains material that is false, intentionally misleading, or defamatory; 
              violates any third-party right, including any copyright, trademark, service mark, patent, trade secret, moral right, privacy right, right of 
              publicity, or any other intellectual property or proprietary right; contains material that is unlawful, including illegal hate speech or 
              pornography; exploits or otherwise harms minors; violates or advocates the violation of any law or regulation; or violates these Terms.
            </span>
          </p>
          <h3 id="h.c0yw6dx5pnx">
            <span>B.</span>
          </h3>
          <h3 id="h.c7vbrbpsyvek">
            <span>Our Right to Use Your Content</span>
          </h3>
          <p>
            <span>
              We may use Your Content in a number of different ways, including
              publicly displaying it, reformatting it, incorporating it into
              advertisements and other works, creating derivative works from it,
              promoting it, distributing it, and allowing others to do the same
              in connection with their own websites and media platforms
              (&quot;Other Media&quot;). As such, you hereby irrevocably grant
              us worldwide, non-exclusive, royalty-free, sublicensable,
              transferable rights to use Your Content for any purpose. You also
              irrevocably grant the users of the Site and any Other Media the
              right to access Your Content in connection with their use of the
              Site and any Other Media. Finally, you irrevocably waive, and
              cause to be waived, against AXS and its users any claims and
              assertions of moral rights or attribution with respect to Your
              Content. By &quot;use&quot; we mean use, copy, publicly perform or
              display, distribute, modify, translate, and create derivative
              works of Your Content.
            </span>
          </p>
          <h3 id="h.qpgdr8w9ie8m">
            <span>C.</span>
          </h3>
          <h3 id="h.v2xt3c20n8o7">
            <span>Ownership</span>
          </h3>
          <p>
            <span>
              As between you and AXS, you own Your Content. We own the AXS
              Content, including but not limited to visual interfaces,
              interactive features, graphics, design, compilation, computer
              code, products, software, aggregate user review ratings, and all
              other elements and components of the Site excluding Your Content,
              User Content and Third Party Content. We also own the copyrights,
              trademarks, service marks, trade names, and other intellectual and
              proprietary rights throughout the world (&quot;IP Rights&quot;)
              associated with the AXS Content and the Site, which may be
              protected by copyright, trade dress, patent, trademark laws and
              all other applicable intellectual and proprietary rights and laws.
              As such, you may not modify, reproduce, distribute, create
              derivative works or adaptations of, publicly display or in any way
              exploit any of the AXS Content in whole or in part except as
              expressly authorized by us. Except as expressly and unambiguously
              provided herein, we do not grant you any express or implied
              rights, and all rights in and to the Site and the AXS Content are
              retained by us.
            </span>
          </p>
          <h3 id="h.k3hfglwmkfbo">
            <span>D.</span>
          </h3>
          <h3 id="h.9g0ouq7qa872">
            <span>Advertising</span>
          </h3>
          <p>
            <span>
              AXS and its licensees may publicly display advertisements and
              other information adjacent to or included with Your Content. You
              are not entitled to any compensation for such advertisements. The
              manner, mode, and extent of such advertising are subject to change
              without notice to you.
            </span>
          </p>
          <h3 id="h.lr86xdtr9mom">
            <span>E.</span>
          </h3>
          <h3 id="h.6duq3kc6gkep">
            <span>Content Feeds</span>
          </h3>
          <p>
            <span>
              We make some of the Site Content (&quot;Feed Content&quot;)
              available via feeds (&quot;Feeds&quot;). You may access and use the Feeds in order to
              display Feed Content on your personal device, website, or blog
              (&quot;Your Site&quot;), provided that (i) your use of the Feeds
              is for personal, non-commercial purposes only, (ii) your display
              of the Feed Content links back to the relevant pages on the Site and attributes AXS as the source of the Feed Content,
              (iii) your use or display of the Feed Content does not suggest
              that AXS promotes or endorses any third party causes, ideas,
              websites, products or services, including Your Site, (iv) you do
              not redistribute the Feed Content, and (v) your use of the Feeds
              does not overburden AXS&#39;s systems. AXS reserves all rights in
              the Feed Content and may terminate the Feeds at any time.
            </span>
          </p>

          <h3>
            <span>F.</span>
          </h3>
          <h3>
            <span>Mapathons</span>
          </h3>
          <p>
            <span>
              In the event that you participate in, create, organize, or otherwise attend a Mapathon event (each a &quot;Mapathon&quot;), 
              as described on the Site, you acknowledge and agree that AXS assumes no liability for any loss, theft, damage, or 
              injury to property or persons, including death, whether arising in contract, negligence, equity, or otherwise arising 
              out of, or relating to, a Mapathon.
            </span>
          </p>
          <p>
            <span>
              You assume all risks when participating in a Mapathon. All participants must use care and good judgment and must obey all laws, 
              rules and regulations of the location of the Mapathon.
            </span>
          </p>
          <p>
            <span>
              You will defend, indemnify and hold harmless AXS and Mapathon organizers, AXS directors, employees, consultants, agents, 
              affiliates for any and all legal actions arising out of participation in a Mapathon. You further agree to pay all legal 
              fees incurred by AXS that arise due to this Section F.
            </span>
          </p>

          <h3>
            <span>G.</span>
          </h3>
          <h3>
            <span>Personal Information</span>
          </h3>
          <p>
            <span>
              We process personal information collected in and through the Site in accordance with the Privacy Notice available on the Site.
            </span>
          </p>

          <h3 id="h.j4szlfvh8udy">
            <span>H.</span>
          </h3>
          <h3 id="h.6fiffo3nnyc4">
            <span>Other</span>
          </h3>
          <p>
            <span>
              User Content does not necessarily reflect the opinion of AXS. AXS
              does not necessarily review User Content. We reserve the right to
              remove, screen, edit, or reinstate User Content from time to time
              at our sole discretion and without notice to you. We have no
              obligation to retain or provide you with copies of Your Content,
              nor do we guarantee any confidentiality with respect to Your
              Content.
            </span>
          </p>
          <h2 id="h.85b4vyjp8nq7">
            <span>5. Restrictions</span>
          </h2>
          <p>
            <span>
              We are under no obligation to enforce the Terms on your behalf
              against another user. While we encourage you to let us know if you
              believe another user has violated the Terms, we reserve the right
              to investigate and take appropriate action at our sole discretion.
            </span>
          </p>
          <h3 id="h.y6pk5foqjzsp">
            <span>A.</span>
          </h3>
          <h3 id="h.gymjo3ket6iq">
            <span>
              You agree not to, and will not assist, encourage, or enable others
              to use the Site to:
            </span>
          </h3>
          <ol type="i">
            <li>
              <span>
                Write a fake or defamatory review, trade reviews with other
                businesses, or compensate someone or be compensated to write or
                remove a review;
              </span>
            </li>
            <li>
              <span>
                Violate any third party&#39;s rights, including any breach of
                confidence, copyright, trademark, patent, trade secret, moral
                right, privacy right, right of publicity, or any other
                intellectual property or proprietary right;
              </span>
            </li>
            <li>
              <span>
                Threaten, stalk, harm, or harass others, or promote bigotry or
                discrimination;
              </span>
            </li>
            <li>
              <span>
                Promote a business or other commercial venture or event, or 
                otherwise use the Site for commercial purposes, except as expressly permitted by AXS;
              </span>
            </li>
            <li>
              <span>
                Send bulk emails, surveys, or other mass messaging, whether commercial in nature or not; 
                engage in keyword spamming, or otherwise attempt to manipulate the Site&#39;s search results 
                or any third-party website;
              </span>
            </li>
            <li>
              <span>
                Solicit personal information from minors, or submit or transmit
                pornography; or
              </span>
            </li>
            <li>
              <span>Violate any applicable law.</span>
            </li>
          </ol>
          <h3 id="h.hvjclbm15yln">
            <span>B.</span>
          </h3>
          <h3 id="h.bvw0i22pk3a">
            <span>
              You also agree not to, and will not assist, encourage, or enable
              others to:
            </span>
          </h3>
          <ol start="1">
            <li>
              <span>Violate the Terms;</span>
            </li>
            <li>
              <span>
                Modify, adapt, appropriate, reproduce, distribute, translate,
                create derivative works or adaptations of, publicly display,
                sell, trade, or in any way exploit the Site or Site Content
                (other than Your Content), except as expressly authorized by
                AXS;
              </span>
            </li>
            <li>
              <span>
                Use any robot, spider, site search/retrieval application, or
                other automated device, process or means to access, retrieve,
                scrape, or index any portion of the Site or any Site Content;
              </span>
            </li>
            <li>
              <span>Reverse engineer any portion of the Site;</span>
            </li>
            <li>
              <span>
                Remove or modify any copyright, trademark, or other proprietary
                rights notice that appears on any portion of the Site or on any
                materials printed or copied from the Site;
              </span>
            </li>
            <li>
              <span>
                Record, process, or mine information about other users;
              </span>
            </li>
            <li>
              <span>
                Access, retrieve, or index any portion of the Site for purposes
                of constructing or populating a searchable database of business
                reviews;
              </span>
            </li>
            <li>
              <span>Reformat or frame any portion of the Site;</span>
            </li>
            <li>
              <span>
                Take any action that imposes, or may impose, in our sole
                discretion, an unreasonable or disproportionately large load on
                AXS&#39;s technology infrastructure or otherwise make excessive
                traffic demands of the Site;
              </span>
            </li>
            <li>
              <span>
                Attempt to gain unauthorized access to the Site, user accounts,
                computer systems or networks connected to the Site through
                hacking, password mining or any other means;
              </span>
            </li>
            <li>
              <span>
                Use the Site or any Site Content to transmit any computer
                viruses, worms, defects, Trojan horses or other items of a
                destructive nature (collectively, &quot;Viruses&quot;);
              </span>
            </li>
            <li>
              <span>
                Use any device, software, or routine that interferes with the
                proper working of the Site, or otherwise attempt to interfere
                with the proper working of the Site;
              </span>
            </li>
            <li>
              <span>
                Use the Site to violate the security of any computer network,
                crack passwords or security encryption codes; disrupt or
                interfere with the security of, or otherwise cause harm to, the
                Site or Site Content; or
              </span>
            </li>
            <li>
              <span>
                Remove, circumvent, disable, damage, or otherwise interfere with
                any security-related features of the Site, features that prevent
                or restrict the use or copying of Site Content, or features that
                enforce limitations on the use of the Site.
              </span>
            </li>
          </ol>
          <p>
            <span>
              The restrictions above only apply to the extent permissible under
              applicable law. Nevertheless, you agree not to act contrary to
              them (even if permissible under applicable law) without providing
              30 days&#39; prior written notice to us, together with any
              information that we may reasonably require to give us an
              opportunity to provide alternative remedies or otherwise
              accommodate you at our sole discretion.
            </span>
          </p>
          <h2 id="h.x76g7enjb2uv">
            <span>6. Digital Millennium Copyright Act</span>
          </h2>
          <p>
            <span>
              If you are a copyright owner or an agent thereof and believe that
              any Content infringes upon your copyrights, you may submit a
              notification pursuant to the Digital Millennium Copyright Act
              (&quot;DMCA&quot;) by providing our Copyright Agent with the
              following information in writing (see 17 U.S.C 512(c)(3) for
              further detail):
            </span>
          </p>
          <ol start="1">
            <li>
              <span>
                A physical or electronic signature of a person authorized to act
                on behalf of the owner of an exclusive right that is allegedly
                infringed;
              </span>
            </li>
            <li>
              <span>
                Identification of the copyrighted work claimed to have been
                infringed, or, if multiple copyrighted works are covered by a
                single notification, a representative list of such works;
              </span>
            </li>
            <li>
              <span>
                Identification of the material that is claimed to be infringing
                or to be the subject of infringing activity and that is to be
                removed or access to which is to be disabled and information
                reasonably sufficient to permit location of the material;
              </span>
            </li>
            <li>
              <span>
                Information reasonably sufficient to permit us to contact you,
                such as an address, telephone number, and, if available, an
                electronic mail;
              </span>
            </li>
            <li>
              <span>
                A statement that you have a good faith belief that use of the
                material in the manner complained of is not authorized by the
                copyright owner, its agent, or the law; and
              </span>
            </li>
            <li>
              <span>
                A statement that the information in the notification is
                accurate, and under penalty of perjury, that you are authorized
                to act on behalf of the owner of an exclusive right that is
                allegedly infringed.
              </span>
            </li>
          </ol>
          <p>
            <span>
              You acknowledge that if you fail to comply with all of the
              requirements of this Section 5(D), your DMCA notice may not be
              valid.
            </span>
          </p>
          <p>
            <span>
              Copyright agent:
            </span>
          </p>
          <p>
            <span>
              axsmap@axslab.org 
            </span>
          </p>
          <h2 id="h.d0zf8qigdxpn">
            <span>7. Suggestions and Improvements</span>
          </h2>
          <p>
            <span>
              By sending us any ideas, suggestions, documents, or proposals
              (&quot;Feedback&quot;), you agree that (i) your Feedback does not
              contain the confidential or proprietary information of third
              parties, (ii) we are under no obligation of confidentiality,
              express or implied, with respect to the Feedback, (iii) we may
              have something similar to the Feedback already under consideration
              or in development, and (iv) you grant us an irrevocable,
              non-exclusive, royalty-free, perpetual, worldwide license to use,
              modify, publish, distribute and sublicense the Feedback.
            </span>
          </p>

          <h2>
            <span>8. Communications from Us</span>
          </h2>
          <p>
            <span>
              By accessing the Site you consent to having these Terms provided to you in electronic form and 
              that all agreements, notices, disclosures, and other communications we provide to you electronically 
              satisfy any legal requirements that such communications be in writing. You expressly consent to our 
              communications with you about the Site using the contact information you provide to us. You also attest 
              that you have the legal authority over any telephone number you provide, if any, to us and can provide 
              us with the authorization to contact you. This means we may contact you, in person or by recorded message, 
              by e-mail, telephone and/or mobile telephone number (including use of automated dialing equipment), 
              text (SMS) message, or any other means of communication that your wireless or other telecommunications 
              device may be capable of receiving. You further agree that you will be responsible for any and all 
              associated fees (including fees for SMS and Internet connection charges) resulting from our communications 
              with you.
            </span>
          </p>

          <h2 id="h.5qioky4i9gzv">
            <span>9. Third Parties</span>
          </h2>
          <p>
            <span>
              The Site may include links to other websites or applications
              (each, a &quot;Third Party Site&quot;). We do not control or
              endorse any Third Party Site. You agree that we are not
              responsible for the availability or contents of such Third Party
              Sites. Your use of Third Party Sites is at your own risk.
            </span>
          </p>
          <h2 id="h.ueyo7zg475nz">
            <span>10. Indemnity</span>
          </h2>
          <p>
            <span>
              You agree to indemnify, defend, and hold AXS, its parents, 
              subsidiaries, affiliates, suppliers, licensors and partners, 
              and the officers, directors, employees, agents, and representatives 
              of each of them (collectively, the &quot;AXS Entities&quot;) harmless, including 
              costs, liabilities and legal fees, from any claim or demand made by 
              any third party arising out of or relating to (i) your access to or 
              use of the Site, (ii) your violation of the Terms, (iii) any products 
              or services purchased or obtained by you in connection with the Site, 
              or (iv) the infringement by you, or any third party using your account, 
              of any intellectual property or other right of any person or entity. 
              AXS reserves the right, at your expense, to assume the exclusive defense 
              and control of any matter for which you are required to indemnify us and 
              you agree to cooperate with our defense of these claims. You agree not to 
              settle any matter without the prior written consent of AXS. AXS will use 
              reasonable efforts to notify you of any such claim, action or proceeding 
              upon becoming aware of it.
            </span>
          </p>
          <h2 id="h.q7afigk9f6iw">
            <span>11. Disclaimers and Limitations of Liability</span>
          </h2>
          <p>
            <span>
              PLEASE READ THIS SECTION CAREFULLY SINCE IT LIMITS THE LIABILITY
              OF AXS AND ITS SUBSIDIARIES, AFFILIATES, AND LICENSORS
              (COLLECTIVELY, THE &quot;AXS ENTITIES&quot;). EACH OF THE
              SUBSECTIONS BELOW ONLY APPLIES UP TO THE MAXIMUM EXTENT PERMITTED
              UNDER APPLICABLE LAW. NOTHING HEREIN IS INTENDED TO LIMIT ANY
              RIGHTS YOU MAY HAVE WHICH MAY NOT BE LAWFULLY LIMITED.
            </span>
          </p>
          <ol start="1">
            <li>
              <span>
                THE SITE IS MADE AVAILABLE TO YOU ON AN &quot;AS IS&quot;,
                &quot;WITH ALL FAULTS&quot; AND &quot;AS AVAILABLE&quot; BASIS.
                YOUR USE OF THE SITE IS AT YOUR OWN DISCRETION AND RISK. THE AXS
                ENTITIES MAKE NO CLAIMS, PROMISES, OR COMMITMENTS ABOUT THE
                QUALITY, ACCURACY, OR RELIABILITY OF THE SITE, ITS SAFETY OR
                SECURITY, THE SITE CONTENT, OR THE SPECIFIC FUNCTION OF THE
                SITE. ACCORDINGLY, THE AXS ENTITIES ARE NOT LIABLE TO YOU FOR
                ANY LOSS OR DAMAGE THAT MIGHT ARISE, FOR EXAMPLE, FROM YOUR
                RELIANCE ON THE QUALITY, ACCURACY, OR RELIABILITY OF THE
                BUSINESS LISTINGS, RATINGS, OR REVIEWS.
              </span>
            </li>
            <li>
              <span>
                THE AXS ENTITIES MAKE NO CLAIMS OR PROMISES WITH RESPECT TO ANY 
                THIRD PARTY, SUCH AS THE BUSINESSES LISTED ON THE SITE OR THE SITE&#39;S 
                USERS. ACCORDINGLY, THE AXS ENTITIES ARE NOT LIABLE TO YOU FOR ANY LOSS 
                OR DAMAGE THAT MIGHT ARISE FROM THEIR ACTIONS, INCLUDING, FOR EXAMPLE, 
                IF ANOTHER USER MISUSES YOUR CONTENT OR IDENTITY, OR IF YOU HAVE A 
                NEGATIVE EXPERIENCE WITH ONE OF THE BUSINESSES OR LOCATIONS LISTED ON 
                THE SITE.
              </span>
            </li>
            <li>
              <span>
                AXS EXPRESSLY DISCLAIMS ALL WARRANTIES, WHETHER EXPRESS OR IMPLIED, 
                INCLUDING WARRANTIES AS TO THE PRODUCTS OR SERVICES OFFERED BY 
                BUSINESSES LISTED ON THE SITE, AND IMPLIED WARRANTIES OF MERCHANTABILITY, 
                FITNESS FOR A PARTICULAR PURPOSE, AND NON- INFRINGEMENT. NO ORAL OR WRITTEN 
                INFORMATION OR ADVICE PROVIDED TO YOU BY A REPRESENTATIVE OF AXS SHALL CREATE 
                A REPRESENTATION OR WARRANTY.
              </span>
            </li>
            <li>
              <span>
                YOUR SOLE AND EXCLUSIVE RIGHT AND REMEDY IN CASE OF
                DISSATISFACTION WITH THE SITE, RELATED SERVICES, OR ANY OTHER
                GRIEVANCE SHALL BE YOUR TERMINATION AND DISCONTINUATION OF
                ACCESS TO, OR USE OF THE SITE.
              </span>
            </li>
            <li>
              <span>
                AXS&#39; MAXIMUM AGGREGATE LIABILITY TO YOU FOR LOSSES OR DAMAGES THAT 
                YOU SUFFER IN CONNECTION WITH THE SITE OR THESE TERMS IS LIMITED TO 
                THE GREATER OF (i) THE AMOUNT PAID, IF ANY, BY YOU TO AXS IN CONNECTION 
                WITH THE SITE IN THE 12 MONTHS PRIOR TO THE ACTION GIVING RISE TO 
                LIABILITY, OR (ii) $100.
              </span>
            </li>
            <li>
              <span>
                AXS DISCLAIMS LIABILITY FOR ANY (i) INDIRECT, SPECIAL, INCIDENTAL, PUNITIVE, 
                EXEMPLARY, RELIANCE, OR CONSEQUENTIAL DAMAGES, (ii) LOSS OF PROFITS, REVENUES, 
                OR FINANCIAL LOSSES, (iii) BUSINESS INTERRUPTION, (iv) REPUTATIONAL HARM, OR 
                (v) LOSS OF INFORMATION OR DATA. IN ALL CASES, AXS WIL NOT BE RESPONSIBLE FOR 
                ANY LOSS THAT WAS NOT REASONABLY FORESEEABLE.
              </span>
            </li>
          </ol>
          <h2 id="h.noc0mu9djrqi">
            <span>12. Choice of Law and Agreement to Arbitrate</span>
          </h2>
          <p>
            <span>
              New York law will govern these Terms, as well as any claim, cause
              of action or dispute that might arise between you and AXS (a
              &quot;Claim&quot;), without regard to conflict of law provisions.
            </span>
          </p>
          <p>
            <span>
              Before filing a claim against AXS, you agree to try to resolve the 
              dispute informally by sending a notice of dispute via email to:
            </span>
          </p>
          <p>
            <span>
              Email: axsmap@axslab.org
            </span>
          </p>
          <p>
            <span>
              Subject Line: Dispute
            </span>
          </p>
          <p>
            <span>
              The notice must include your name, mailing address, and phone number 
              (if any), and must describe the nature and basis of the claim or dispute, 
              as well as set forth the specific relief sought. If a dispute is not 
              resolved within 60 days of after we receive your notice, either you or we 
              may bring a formal arbitration proceeding with the American Arbitration 
              Association (&quot;AAA&quot;).  
            </span>
          </p>
          <h3>
            <span>AGREEMENT TO ARBITRATE</span>
          </h3>
          <ol start="1">
            <li>
              <span>
                Arbitration. Please read the following sections carefully, as they affect your 
                rights. You and AXS agree to resolve any claims relating to these Terms or the 
                Site through final and binding arbitration. This agreement to arbitrate is 
                intended to be broadly interpreted, and includes claims based in contract, tort, 
                statute, fraud, misrepresentation, or any other legal theory. You acknowledge 
                that these Terms evidence a transaction involving interstate commerce, and thus 
                the United States Arbitration Act shall govern the interpretation, enforcement, 
                and proceedings pursuant to the arbitration clause in these Terms.
              </span>
            </li>
            <li>
              <span>
                Opting-Out of Arbitration. YOU MAY OPT-OUT OF THE AGREEMENT TO ARBITRATE BY PROVIDING 
                AXS WRITTEN NOTICE WITHIN THIRTY (30) DAYS OF FIRST ACCEPTING THESE TERMS. YOUR NOTICE 
                MUST INCLUDE: (I) YOUR FULL NAME (FIRST AND LAST); (II) THE EMAIL ADDRESS YOU USED TO 
                REGISTER YOUR ACCOUNT; AND (III) A CLEAR STATEMENT THAT YOU DECLINE THIS AGREEMENT TO ARBITRATE.
              </span>
            </li>
            <li>
              <span>
                Costs of Arbitration. AXS will pay all AAA filing, administration, and arbitrator fees for any arbitration 
                we initiate. You will pay the fees for any arbitration you initiate, in accordance with the AAA Rules. 
                However, if you initiate an arbitration after attempting to informally resolve a dispute in accordance with 
                these Terms, and are seeking relief valued at $300 or less (both to you and us), AXS will pay all AAA filing, 
                administration, and arbitrator fees. If your claim is for greater than $300 but less than $10,000, AXS will 
                pay all such fees in excess of $20. After AXS receives notice at the email address above that you have commenced 
                such an arbitration, AXS shall promptly reimburse you for any portion of the filing fee you have paid that AXS 
                has agreed to pay.
              </span>
            </li>
            <li>
              <span>
                Frivolous Claims. If the arbitrator determines that either the substance of your claim or the relief sought is 
                frivolous or brought for an improper purpose (as measured by the standards set for the in Federal Rule of Civil 
                Procedure 11(b)), then: the payment of all AAA filing, administration, and arbitrator fees shall be governed by 
                the AAA Rules and you agree to reimburse us for any amount we have paid on your behalf to the AAA. AXS shall not 
                seek its attorneys&#39; fees and costs in arbitration unless the arbitrator determines that either the substance of your 
                claim or the relief sought was frivolous or brought for an improper purpose.
              </span>
            </li>
            <li>
              <span>
                Arbitration Procedures. You agree that one (1) arbitrator from the AAA will arbitrate the dispute under the AAA 
                Commercial Arbitration Rules and the Supplementary Procedures for Consumer Related Disputes, as modified by this 
                arbitration provision. The award of the arbitrator shall be accompanied by a reasoned opinion. The arbitration 
                will be held in the United States county where you live or work, or any other location that we mutually agree to.
              </span>
            </li>
            <li>
              <span>
                No Class Actions. You may only resolve disputes with us on an individual basis, and may not bring a claim as a 
                plaintiff or a class member in a class, consolidated, or representative action. You may not bring a claim as 
                part of a class arbitration, class action, private attorney general action, or consolidation with other arbitrations.
              </span>
            </li>
            <li>
              <span>
                Judicial Forum. In the event that this agreement to arbitrate is found not to apply to you or your claim, you and AXS 
                agree that any judicial proceeding (other than small claims actions) will be brought in the federal or state courts of 
                New York County, New York.  Both you and AXS consent to venue and personal jurisdiction there, and waive any objection 
                as to inconvenient forum.
              </span>
            </li>
            <li>
              <span>
                Time Limitation to Bring Claims. Notwithstanding any statute or law to the contrary, any claim or cause of action arising 
                out of or related to these Terms or your use of the Site must be filed within one (1) year after such claim or cause of 
                action arose, otherwise that claim or cause of action will be barred forever.
              </span>
            </li>
            <li>
              <span>
                Future Changes to Agreement to Arbitrate. Notwithstanding any provision in these Terms to the contrary, you agree that if 
                AXS makes any future change to this arbitration provision (other than a change to the notice email address above, Site 
                links, or telephone numbers listed in this provision), any such changes will not affect disputes that arose before 
                the effective date of the change.
              </span>
            </li>
          </ol>
          <h2 id="h.qb7bvsjm8sjz">
            <span>13. Termination</span>
          </h2>
          <ol start="1">
            <li>
              <span>
                You may terminate the Terms at any time by closing your account,
                discontinuing your use of the Site, and providing AXS with a
                notice of termination.
                {' '}
              </span>
            </li>
            <li>
              <span>
                We may close your account, suspend your ability to use certain
                portions of the Site, and/or ban you altogether from the Site
                for any or no reason, and without notice or liability of any
                kind. Any such action could prevent you from accessing your
                account, the Site, Your Content, Site Content, or any other
                related information.
              </span>
            </li>
            <li>
              <span>
                In the event of any termination, whether by you or us, Sections 
                1, 4, 5, 6, and 9 - 13 of these Terms will continue in full force 
                and effect, including our right to use Your Content as detailed in Section 4.
              </span>
            </li>
          </ol>
          <h2 id="h.xnjxxrr72w4y">
            <span>14. General Terms</span>
          </h2>
          <ol start="1">
            <li>
              <span>
                We reserve the right to modify, update, or discontinue the Site
                at our sole discretion, at any time, for any or no reason, and
                without notice or liability.
              </span>
            </li>
            <li>
              <span>
                We may provide you with notices, including those regarding
                changes to the Terms by email, regular mail or communications
                through the Site.
              </span>
            </li>
            <li>
              <span>
                Except as otherwise stated in Section 11 above, nothing herein
                is intended, nor will be deemed, to confer rights or remedies
                upon any third party.
              </span>
            </li>
            <li>
              <span>
                The Terms contain the entire agreement between you and us
                regarding the use of the Site, and supersede any prior agreement
                between you and us on such subject matter. The parties
                acknowledge that no reliance is placed on any representation
                made but not expressly contained in these Terms.
              </span>
            </li>
            <li>
              <span>
                Any failure on AXS&#39;s part to exercise or enforce any right
                or provision of the Terms does not constitute a waiver of such
                right or provision. The failure of either party to exercise in
                any respect any right provided for herein shall not be deemed a
                waiver of any further rights hereunder.
              </span>
            </li>
            <li>
              <span>
                If any provision of the Terms is found to be unenforceable or
                invalid, that provision shall be limited or eliminated to the
                minimum extent necessary so that the Terms shall otherwise
                remain in full force and effect and enforceable.
              </span>
            </li>
            <li>
              <span>
                The Terms are not assignable, transferable or sublicensable by
                you except with AXS&#39;s prior written consent, but may be
                assigned or transferred by us without restriction. Any
                assignment attempted to be made in violation of the Terms shall
                be void.
              </span>
            </li>
            <li>
              <span>
                The section titles in the Terms are for convenience only and
                have no legal or contractual effect.
              </span>
            </li>
          </ol>
          <h2>
            <span>15. Questions</span>
          </h2>
          <p>
            <span>
              If you have any questions regarding these Terms, please email us at: axsmap@axslab.org
            </span>
          </p>
        </Container>

        <Footer isNarrow />
      </Wrapper>
    )
  }
}

export default Tac
