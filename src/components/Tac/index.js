import React from 'react'
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
  margin: 0;
  color: ${colors.darkestGrey};

  ${media.desktop`
    display: block;
  `};
`

const Tac = (props, context) => {
  const formatMessage = context.intl.formatMessage

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

        <p>
          <span>Last Updated: January 8, 2018.</span>
        </p>
        <p>
          <span>
            By using the websites and mobile applications of AXS Map, you are
            agreeing to the following terms and conditions. Please read them
            carefully.
          </span>
        </p>
        <p>
          <span>
            These terms and conditions (the &quot;Terms&quot;) govern your
            access to and use of AXS Lab&#39;s websites and mobile applications
            (the &quot;Site&quot;). By accessing or using the Site, you are
            agreeing to these Terms and concluding a legally binding contract
            with AXS Lab (&quot;AXS&quot;). AXS Lab is a registered 501c3
            nonprofit under the name &#39;When I Walk Inc.&#39; When I Walk Inc.
            conducts business under the name &#39;AXS Lab.&#39; Do not access or
            use the Site if you are unwilling or unable to be bound by the
            following Terms.
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
            Site. A &quot;user&quot; is someone who accesses, browses, or in any
            way uses the Site. &quot;We&quot;, &quot;us&quot;, and
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
            reviews, compliments, invitations, check-ins, messages, images, and
            information that you publicly display or displayed in your account
            profile. &quot;User Content&quot; means Content that users submit or
            transmit to, through, or in connection with the Site. &quot;AXS
            Content&quot; means Content that we create and make available in
            connection with the Site. &quot;Third Party Content&quot; means
            Content that originates from parties other than AXS or its users,
            which is made available in connection with the Site. &quot;Site
            Content&quot; means all of the Content that is made available in
            connection with the Site, including Your Content, User Content,
            Third Party Content, and AXS Content.
          </span>
        </p>
        <h2 id="h.1fw870qgqcv5">
          <span>2. Changes to the Terms of Service</span>
        </h2>
        <p>
          <span>
            We may modify the Terms from time to time. When changes are made, we
            will notify you by making the revised version available on this
            webpage, and will indicate at the top of this page the date that
            revisions were last made. You should revisit these Terms on a
            regular basis, as revised versions will be binding on you. Any such
            modification will be effective upon our posting of new Terms. You
            understand and agree that your continued access to or use of the
            Site after any posted modification to the Terms indicates your
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
            To access or use the Site, you must be 18 years or older and have
            the requisite power and authority to enter into these Terms. You may
            not access or use the Site if you have been banned from the Site or
            closed your account.
          </span>
        </p>
        <p>
          <span>
            You may not use the Site and may not accept the Terms if (a) you are
            not of legal age to form a binding contract with AXS, or (b) you are
            a person barred from using the Site under the laws of the United
            States or other countries including the country in which you are
            resident or from which you use the Site. Before you continue, you
            should print off or save a local copy of these Terms for your
            records.
          </span>
        </p>
        <h5 id="h.ojx4yt5lw5sc">
          <span>U</span>
          <span>sers Under the Age of 18</span>
        </h5>
        <p>
          <span>
            The Site is not targeted to users under 13 years of age. If you are
            under 13 years of age, you will not be permitted to create an
            account on the Site. If we find out that any personal data we have
            collected is from someone under the age of 13, this data will be
            deleted.
          </span>
        </p>
        <p>
          <span>
            If you are under 18, by using our website you are representing (i.e.
            making a promise) that you are acting with consent from your parent
            / guardian to use the Site in accordance with these terms and
            conditions. We may remove any account if we are not satisfied that
            such consent has been given.
          </span>
        </p>
        <p>
          <span>
            If we are told by a parent / guardian that their child has lied
            about their age when creating an account, we will remove the account
            provided we have information which satisfies us that the reporting
            individual is indeed the parent or guardian.
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
            We grant you permission to use the Site subject to these Terms. Your
            use of the Site is at your own risk, including the risk that you
            might be exposed to Content that is offensive, indecent, inaccurate,
            objectionable, or otherwise inappropriate.
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
            You may create an account and provide certain information about
            yourself in order to use some of the features that are offered
            through the Site. You are responsible for maintaining the
            confidentiality of your account password. You are also responsible
            for all activities that occur in connection with your account. You
            agree to notify us immediately of any unauthorized use of your
            account. We reserve the right to close your account at any time for
            any or no reason.
          </span>
        </p>
        <p>
          <span>
            Your account is for your personal, non-commercial use only. In
            creating it, we ask that you provide complete and accurate
            information about yourself to bolster your credibility as a
            contributor to the Site. You may not impersonate someone else,
            create or use an account for anyone other than yourself, provide an
            email address other than your own, or create multiple accounts. If
            you use a pseudonym, take care to note that others may still be able
            to identify you if, for example, you include identifying information
            in your reviews, use the same account information on other sites, or
            allow other sites to share information about you with AXS.
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
            By creating an account, you agree to receive certain communications
            in connection with the Site. You may choose to opt out of
            non-essential communications.
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
            accuracy, or reliability, or any disclosure by you of information in
            Your Content that makes you personally identifiable. You represent
            that you own, or have the necessary permissions to use and authorize
            the use of Your Content as described herein. You may not imply that
            Your Content is in any way sponsored or endorsed by AXS.
          </span>
        </p>
        <p>
          <span>
            You may expose yourself to liability if, for example, Your Content
            contains material that is false, intentionally misleading, or
            defamatory; violates any third-party right, including any copyright,
            trademark, patent, trade secret, moral right, privacy right, right
            of publicity, or any other intellectual property or proprietary
            right; contains material that is unlawful, including illegal hate
            speech or pornography; exploits or otherwise harms minors; or
            violates or advocates the violation of any law or regulation.
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
            promoting it, distributing it, and allowing others to do the same in
            connection with their own websites and media platforms (&quot;Other
            Media&quot;). As such, you hereby irrevocably grant us worldwide,
            non-exclusive, royalty-free, sublicensable, transferable rights to
            use Your Content for any purpose. You also irrevocably grant the
            users of the Site and any Other Media the right to access Your
            Content in connection with their use of the Site and any Other
            Media. Finally, you irrevocably waive, and cause to be waived,
            against AXS and its users any claims and assertions of moral rights
            or attribution with respect to Your Content. By &quot;use&quot; we
            mean use, copy, publicly perform or display, distribute, modify,
            translate, and create derivative works of Your Content.
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
            Content, including but not limited to visual interfaces, interactive
            features, graphics, design, compilation, computer code, products,
            software, aggregate user review ratings, and all other elements and
            components of the Site excluding Your Content, User Content and
            Third Party Content. We also own the copyrights, trademarks, service
            marks, trade names, and other intellectual and proprietary rights
            throughout the world (&quot;IP Rights&quot;) associated with the AXS
            Content and the Site, which may be protected by copyright, trade
            dress, patent, trademark laws and all other applicable intellectual
            and proprietary rights and laws. As such, you may not modify,
            reproduce, distribute, create derivative works or adaptations of,
            publicly display or in any way exploit any of the AXS Content in
            whole or in part except as expressly authorized by us. Except as
            expressly and unambiguously provided herein, we do not grant you any
            express or implied rights, and all rights in and to the Site and the
            AXS Content are retained by us.
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
            AXS and its licensees may publicly display advertisements and other
            information adjacent to or included with Your Content. You are not
            entitled to any compensation for such advertisements. The manner,
            mode, and extent of such advertising are subject to change without
            notice to you.
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
            available via Real Simple Syndication and Atom feeds
            (&quot;Feeds&quot;). You may access and use the Feeds in order to
            display Feed Content on your personal computer, website, or blog
            (&quot;Your Site&quot;), provided that (i) your use of the Feeds is
            for personal, non-commercial purposes only, (ii) your display of the
            Feed Content links back to the relevant pages on AXS&#39;s websites
            and attributes AXS as the source of the Feed Content, (iii) your use
            or display of the Feed Content does not suggest that AXS promotes or
            endorses any third party causes, ideas, websites, products or
            services, including Your Site, (iv) you do not redistribute the Feed
            Content, and (v) your use of the Feeds does not overburden AXS&#39;s
            systems. AXS reserves all rights in the Feed Content and may
            terminate the Feeds at any time.
          </span>
        </p>
        <h3 id="h.j4szlfvh8udy">
          <span>F.</span>
        </h3>
        <h3 id="h.6fiffo3nnyc4">
          <span>Other</span>
        </h3>
        <p>
          <span>
            User Content does not necessarily reflect the opinion of AXS. AXS
            does not necessarily review User Content. We reserve the right to
            remove, screen, edit, or reinstate User Content from time to time at
            our sole discretion and without notice to you. We have no obligation
            to retain or provide you with copies of Your Content, nor do we
            guarantee any confidentiality with respect to Your Content.
          </span>
        </p>
        <h2 id="h.85b4vyjp8nq7">
          <span>5. Restrictions</span>
        </h2>
        <p>
          <span>
            We are under no obligation to enforce the Terms on your behalf
            against another user. While we encourage you to let us know if you
            believe another user has violated the Terms, we reserve the right to
            investigate and take appropriate action at our sole discretion.
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
        <ol start="1">
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
              otherwise use the Site for commercial purposes, except in
              connection with a Business Account and as expressly permitted by
              AXS;
            </span>
          </li>
          <li>
            <span>
              Send bulk emails, surveys, or other mass messaging, whether
              commercial in nature or not; engage in keyword spamming, or
              otherwise attempt to manipulate the Site&#39;s search results or
              any third party website;
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
              create derivative works or adaptations of, publicly display, sell,
              trade, or in any way exploit the Site or Site Content (other than
              Your Content), except as expressly authorized by AXS;
            </span>
          </li>
          <li>
            <span>
              Use any robot, spider, site search/retrieval application, or other
              automated device, process or means to access, retrieve, scrape, or
              index any portion of the Site or any Site Content;
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
            <span>Record, process, or mine information about other users;</span>
          </li>
          <li>
            <span>
              Access, retrieve, or index any portion of the Site for purposes of
              constructing or populating a searchable database of business
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
              Use the Site or any Site Content to transmit any computer viruses,
              worms, defects, Trojan horses or other items of a destructive
              nature (collectively, &quot;Viruses&quot;);
            </span>
          </li>
          <li>
            <span>
              Use any device, software, or routine that interferes with the
              proper working of the Site, or otherwise attempt to interfere with
              the proper working of the Site;
            </span>
          </li>
          <li>
            <span>
              Use the Site to violate the security of any computer network,
              crack passwords or security encryption codes; disrupt or interfere
              with the security of, or otherwise cause harm to, the Site or Site
              Content; or
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
            applicable law. Nevertheless, you agree not to act contrary to them
            (even if permissible under applicable law) without providing 30
            days&#39; prior written notice to us, together with any information
            that we may reasonably require to give us an opportunity to provide
            alternative remedies or otherwise accommodate you at our sole
            discretion.
          </span>
        </p>
        <h2 id="h.tn2wusoiyhpt">
          <span>6. Guidelines</span>
        </h2>
        <p>
          <span>
            We may disclose information about you to third parties if we have a
            good faith belief that such a disclosure is reasonably necessary to
            (i) take action regarding suspected illegal activities; (ii) enforce
            or apply our Terms and Privacy Policy; (iii) comply with legal
            process or other government inquiry, such as a search warrant,
            subpoena, statute, judicial proceeding, or other legal process
            served on us; or (iv) protect our rights, reputation, and property,
            or that of our users, affiliates, or the public. If you use the Site
            outside of the United States, you consent to having your personal
            data transferred to and processed in the United States.
          </span>
        </p>
        <h5 id="h.x76g7enjb2uv">
          <span>Digital Millennium Copyright Act</span>
        </h5>
        <p>
          <span>
            If you are a copyright owner or an agent thereof and believe that
            any Content infringes upon your copyrights, you may submit a
            notification pursuant to the Digital Millennium Copyright Act
            (&quot;DMCA&quot;) by providing our Copyright Agent with the
            following information in writing (see 17 U.S.C 512(c)(3) for further
            detail):
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
              Identification of the material that is claimed to be infringing or
              to be the subject of infringing activity and that is to be removed
              or access to which is to be disabled and information reasonably
              sufficient to permit location of the material;
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
              A statement that the information in the notification is accurate,
              and under penalty of perjury, that you are authorized to act on
              behalf of the owner of an exclusive right that is allegedly
              infringed.
            </span>
          </li>
        </ol>
        <p>
          <span>
            AXS&#39;s designated Copyright Agent to receive notifications of
            claimed infringement is Stephen Kenny,{' '}
          </span>
          <span>Kenny@hugheshubbard.com</span>
          <span>, 1 Battery Park Plaza New York, NY 10004 (212) 837-6000.</span>
        </p>
        <p>
          <span>
            You acknowledge that if you fail to comply with all of the
            requirements of this Section 5(D), your DMCA notice may not be
            valid.
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
            parties, (ii) we are under no obligation of confidentiality, express
            or implied, with respect to the Feedback, (iii) we may have
            something similar to the Feedback already under consideration or in
            development, and (iv) you grant us an irrevocable, non-exclusive,
            royalty-free, perpetual, worldwide license to use, modify, publish,
            distribute and sublicense the Feedback.
          </span>
        </p>
        <h2 id="h.5qioky4i9gzv">
          <span>8. Third Parties</span>
        </h2>
        <p>
          <span>
            The Site may include links to other websites or applications (each,
            a &quot;Third Party Site&quot;). We do not control or endorse any
            Third Party Site. You agree that we are not responsible for the
            availability or contents of such Third Party Sites. Your use of
            Third Party Sites is at your own risk.
          </span>
        </p>
        <h2 id="h.ueyo7zg475nz">
          <span>9. Indemnity</span>
        </h2>
        <p>
          <span>
            You agree to indemnify, defend, and hold AXS, its parents,
            subsidiaries, affiliates, any related companies, suppliers,
            licensors and partners, and the officers, directors, employees,
            agents, and representatives of each of them (collectively, the
            &quot;AXS Entities&quot;) harmless, including costs, liabilities and
            legal fees, from any claim or demand made by any third party arising
            out of or relating to (i) your access to or use of the Site, (ii)
            your violation of the Terms, (iii) any products or services
            purchased or obtained by you in connection with the Site, or (iv)
            the infringement by you, or any third party using your account, of
            any intellectual property or other right of any person or entity.
            AXS reserves the right, at your expense, to assume the exclusive
            defense and control of any matter for which you are required to
            indemnify us and you agree to cooperate with our defense of these
            claims. You agree not to settle any matter without the prior written
            consent of AXS. AXS will use reasonable efforts to notify you of any
            such claim, action or proceeding upon becoming aware of it.
          </span>
        </p>
        <h2 id="h.q7afigk9f6iw">
          <span>10. Disclaimers and Limitations of Liability</span>
        </h2>
        <p>
          <span>
            PLEASE READ THIS SECTION CAREFULLY SINCE IT LIMITS THE LIABILITY OF
            AXS AND ITS SUBSIDIARIES, AFFILIATES, AND LICENSORS (COLLECTIVELY,
            THE &quot;AXS ENTITIES&quot;). EACH OF THE SUBSECTIONS BELOW ONLY
            APPLIES UP TO THE MAXIMUM EXTENT PERMITTED UNDER APPLICABLE LAW.
            NOTHING HEREIN IS INTENDED TO LIMIT ANY RIGHTS YOU MAY HAVE WHICH
            MAY NOT BE LAWFULLY LIMITED.
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
              SECURITY, THE SITE CONTENT, OR THE SPECIFIC FUNCTION OF THE SITE.
              ACCORDINGLY, THE AXS ENTITIES ARE NOT LIABLE TO YOU FOR ANY LOSS
              OR DAMAGE THAT MIGHT ARISE, FOR EXAMPLE, FROM YOUR RELIANCE ON THE
              QUALITY, ACCURACY, OR RELIABILITY OF THE BUSINESS LISTINGS,
              RATINGS, OR REVIEWS.
            </span>
          </li>
          <li>
            <span>
              THE AXS ENTITIES MAKE NO CLAIMS OR PROMISES WITH RESPECT TO ANY
              THIRD PARTY, SUCH AS THE BUSINESSES LISTED ON THE SITE OR THE
              SITE&#39;S USERS. ACCORDINGLY, THE AXS ENTITIES ARE NOT LIABLE TO
              YOU FOR ANY LOSS OR DAMAGE THAT MIGHT ARISE FROM THEIR ACTIONS,
              INCLUDING, FOR EXAMPLE, IF ANOTHER USER MISUSES YOUR CONTENT OR
              IDENTITY, OR IF YOU HAVE A NEGATIVE EXPERIENCE WITH ONE OF THE
              BUSINESSES LISTED ON THE SITE. YOUR PURCHASE AND USE OF PRODUCTS
              OR SERVICES OFFERED BY THIRD PARTIES THROUGH THE SITE IS AT YOUR
              OWN DISCRETION AND RISK.
            </span>
          </li>
          <li>
            <span>
              THE AXS ENTITIES EXPRESSLY DISCLAIM ALL WARRANTIES, WHETHER
              EXPRESS OR IMPLIED, INCLUDING WARRANTIES AS TO THE PRODUCTS OR
              SERVICES OFFERED BY BUSINESSES LISTED ON THE SITE, AND IMPLIED
              WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE,
              AND NON- INFRINGEMENT. NO ORAL OR WRITTEN INFORMATION OR ADVICE
              PROVIDED TO YOU BY A REPRESENTATIVE OF ONE OF THE AXS ENTITIES
              SHALL CREATE A REPRESENTATION OR WARRANTY.
            </span>
          </li>
          <li>
            <span>
              YOUR SOLE AND EXCLUSIVE RIGHT AND REMEDY IN CASE OF
              DISSATISFACTION WITH THE SITE, RELATED SERVICES, OR ANY OTHER
              GRIEVANCE SHALL BE YOUR TERMINATION AND DISCONTINUATION OF ACCESS
              TO, OR USE OF THE SITE.
            </span>
          </li>
          <li>
            <span>
              THE AXS ENTITIES&#39; MAXIMUM AGGREGATE LIABILITY TO YOU FOR
              LOSSES OR DAMAGES THAT YOU SUFFER IN CONNECTION WITH THE SITE OR
              THESE TERMS IS LIMITED TO THE GREATER OF (i) THE AMOUNT PAID, IF
              ANY, BY YOU TO THE AXS ENTITIES IN CONNECTION WITH THE SITE IN THE
              12 MONTHS PRIOR TO THE ACTION GIVING RISE TO LIABILITY, OR (ii)
              $100.
            </span>
          </li>
          <li>
            <span>
              THE AXS ENTITIES DISCLAIM LIABILITY FOR ANY (i) INDIRECT, SPECIAL,
              INCIDENTAL, PUNITIVE, EXEMPLARY, RELIANCE, OR CONSEQUENTIAL
              DAMAGES, (ii) LOSS OF PROFITS, REVENUES, OR FINANCIAL LOSSES,
              (iii) BUSINESS INTERRUPTION, (iv) REPUTATIONAL HARM, OR (v) LOSS
              OF INFORMATION OR DATA. IN ALL CASES, AXS ENTITIES WIL NOT BE
              RESPONSIBLE FOR ANY LOSS THAT WAS NOT REASONABLY FORESEEABLE.
            </span>
          </li>
        </ol>
        <h2 id="h.noc0mu9djrqi">
          <span>11. Choice of Law and Venue</span>
        </h2>
        <p>
          <span>
            New York law will govern these Terms, as well as any claim, cause of
            action or dispute that might arise between you and AXS (a
            &quot;Claim&quot;), without regard to conflict of law provisions.
            FOR ANY CLAIM BROUGHT BY EITHER PARTY, YOU AGREE TO SUBMIT AND
            CONSENT TO THE PERSONAL AND EXCLUSIVE JURISDICTION IN, AND THE
            EXCLUSIVE VENUE OF, THE STATE AND FEDERAL COURTS LOCATED WITHIN NEW
            YORK COUNTY, NEW YORK.
          </span>
        </p>
        <h2 id="h.qb7bvsjm8sjz">
          <span>12. Termination</span>
        </h2>
        <ol start="1">
          <li>
            <span>
              You may terminate the Terms at any time by closing your account,
              discontinuing your use of the Site, and providing AXS with a
              notice of termination.{' '}
            </span>
          </li>
          <li>
            <span>
              We may close your account, suspend your ability to use certain
              portions of the Site, and/or ban you altogether from the Site for
              any or no reason, and without notice or liability of any kind. Any
              such action could prevent you from accessing your account, the
              Site, Your Content, Site Content, or any other related
              information.
            </span>
          </li>
          <li>
            <span>
              In the event of any termination, whether by you or us, Sections 1,
              5, 6, and 9 - 13 of these Terms will continue in full force and
              effect, including our right to use Your Content as detailed in
              Section 5.
            </span>
          </li>
        </ol>
        <h2 id="h.xnjxxrr72w4y">
          <span>13. General Terms</span>
        </h2>
        <ol start="1">
          <li>
            <span>
              We reserve the right to modify, update, or discontinue the Site at
              our sole discretion, at any time, for any or no reason, and
              without notice or liability.
            </span>
          </li>
          <li>
            <span>
              We may provide you with notices, including those regarding changes
              to the Terms by email, regular mail or communications through the
              Site.
            </span>
          </li>
          <li>
            <span>
              Except as otherwise stated in Section 10 above, nothing herein is
              intended, nor will be deemed, to confer rights or remedies upon
              any third party.
            </span>
          </li>
          <li>
            <span>
              The Terms contain the entire agreement between you and us
              regarding the use of the Site, and supersede any prior agreement
              between you and us on such subject matter. The parties acknowledge
              that no reliance is placed on any representation made but not
              expressly contained in these Terms.
            </span>
          </li>
          <li>
            <span>
              Any failure on AXS&#39;s part to exercise or enforce any right or
              provision of the Terms does not constitute a waiver of such right
              or provision. The failure of either party to exercise in any
              respect any right provided for herein shall not be deemed a waiver
              of any further rights hereunder.
            </span>
          </li>
          <li>
            <span>
              If any provision of the Terms is found to be unenforceable or
              invalid, that provision shall be limited or eliminated to the
              minimum extent necessary so that the Terms shall otherwise remain
              in full force and effect and enforceable.
            </span>
          </li>
          <li>
            <span>
              The Terms are not assignable, transferable or sublicensable by you
              except with AXS&#39;s prior written consent, but may be assigned
              or transferred by us without restriction. Any assignment attempted
              to be made in violation of the Terms shall be void.
            </span>
          </li>
          <li>
            <span>
              The section titles in the Terms are for convenience only and have
              no legal or contractual effect.
            </span>
          </li>
        </ol>
      </Container>

      <Footer isNarrow />
    </Wrapper>
  )
}

Tac.contextTypes = {
  intl: intlShape
}

export default Tac
