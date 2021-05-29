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
            <span>{formatMessage(messages.date)}</span>
          </p>
          <p>
            <span>
              {formatMessage(messages.line1)}
            </span>
          </p>
          {/* <p>
            <span>
            By using the websites and mobile applications of AXS Map, you are agreeing to the following terms and conditions. Please read them carefully.
            </span>
          </p> */}
          <p>
            <span>
              {formatMessage(messages.line3)}
            </span>
          </p>
          <h2 id="h.vuvck442mcwk">
            <span>{formatMessage(messages.line4)}</span>
          </h2>
          <h3 id="h.8rsji8yakunl">
            <span>{formatMessage(messages.line5)}</span>
          </h3>
          <h3 id="h.a1tf29v85zyx">
            <span>{formatMessage(messages.line6)}</span>
          </h3>
          <p>
            <span>
              {formatMessage(messages.line7)}
            </span>
          </p>
          <h3 id="h.j7x5jgl4gc8k">
            <span>{formatMessage(messages.line8)}</span>
          </h3>
          <h3 id="h.ump2bmknjs3o">
            <span>{formatMessage(messages.line9)}</span>
          </h3>
          <p>
            <span>
              {formatMessage(messages.line10)}
            </span>
          </p>
          <h2 id="h.1fw870qgqcv5">
            <span>{formatMessage(messages.line11)}</span>
          </h2>
          <p>
            <span>
              {formatMessage(messages.line12)}
            </span>
          </p>
          <h2 id="h.5wofm6p8ffs1">
            <span>{formatMessage(messages.line13)}</span>
          </h2>
          <h3 id="h.9jlqoxw0h3wa">
            <span>{formatMessage(messages.line14)}</span>
          </h3>
          <h3 id="h.j5cbi2df6f59">
            <span>{formatMessage(messages.line15)}</span>
          </h3>
          <p>
            <span>
              {formatMessage(messages.line16)}
            </span>
          </p>
          <p>
            <span>
              {formatMessage(messages.line17)}
            </span>
          </p>
          <h5 id="h.ojx4yt5lw5sc">
            <span>{formatMessage(messages.line18)}</span>
          </h5>
          <p>
            <span>
              {formatMessage(messages.line19)}
            </span>
          </p>
          <p>
            <span>
              {formatMessage(messages.line20)}
            </span>
          </p>
          <p>
            <span>
              {formatMessage(messages.line21)}
            </span>
          </p>
          <h3 id="h.xp1z9jan7e5z">
            <span>{formatMessage(messages.line22)}</span>
          </h3>
          <h3 id="h.jjtefjjjhnkp">
            <span>{formatMessage(messages.line23)}</span>
          </h3>
          <p>
            <span>
              {formatMessage(messages.line24)}
            </span>
          </p>
          <h3 id="h.qohfslpz3cvn">
            <span>{formatMessage(messages.line25)}</span>
          </h3>
          <h3 id="h.19x1mhezly9h">
            <span>{formatMessage(messages.line26)}</span>
          </h3>
          <p>
            <span>
              {formatMessage(messages.line27)}
            </span>
          </p>
          <h3 id="h.k4c6wrdganq6">
            <span>{formatMessage(messages.line28)}</span>
          </h3>
          <h3 id="h.6gi0gxvsx6rf">
            <span>{formatMessage(messages.line29)}</span>
          </h3>
          <p>
            <span>
              {formatMessage(messages.line30)}
            </span>
          </p>
          <p>
            <span>
              {formatMessage(messages.line31)}
            </span>
          </p>
          <h3 id="h.8b4jip8ysyvs">
            <span>{formatMessage(messages.line32)}</span>
          </h3>
          <h3 id="h.69ir81qp8c30">
            <span>{formatMessage(messages.line33)}</span>
          </h3>
          <p>
            <span>
              {formatMessage(messages.line34)}
            </span>
          </p>
          <h2 id="h.4wfvu4wjtats">
            <span>{formatMessage(messages.line35)}</span>
          </h2>
          <h3 id="h.ikm78bdvgymh">
            <span>{formatMessage(messages.line36)}</span>
          </h3>
          <h3 id="h.r0flp1ff8r5j">
            <span>{formatMessage(messages.line37)}</span>
          </h3>
          <p>
            <span>
              {formatMessage(messages.line38)}
            </span>
          </p>
          <p>
            <span>
              {formatMessage(messages.line39)}
            </span>
          </p>
          <h3 id="h.c0yw6dx5pnx">
            <span>{formatMessage(messages.line40)}</span>
          </h3>
          <h3 id="h.c7vbrbpsyvek">
            <span>{formatMessage(messages.line41)}</span>
          </h3>
          <p>
            <span>
              {formatMessage(messages.line42)}
            </span>
          </p>
          <h3 id="h.qpgdr8w9ie8m">
            <span>{formatMessage(messages.line43)}</span>
          </h3>
          <h3 id="h.v2xt3c20n8o7">
            <span>{formatMessage(messages.line44)}</span>
          </h3>
          <p>
            <span>
              {formatMessage(messages.line45)}
            </span>
          </p>
          <h3 id="h.k3hfglwmkfbo">
            <span>{formatMessage(messages.line46)}</span>
          </h3>
          <h3 id="h.9g0ouq7qa872">
            <span>{formatMessage(messages.line47)}</span>
          </h3>
          <p>
            <span>
              {formatMessage(messages.line48)}
            </span>
          </p>
          <h3 id="h.lr86xdtr9mom">
            <span>{formatMessage(messages.line49)}</span>
          </h3>
          <h3 id="h.6duq3kc6gkep">
            <span>{formatMessage(messages.line50)}</span>
          </h3>
          <p>
            <span>
              {formatMessage(messages.line51)}
            </span>
          </p>

          <h3>
            <span>{formatMessage(messages.line52)}</span>
          </h3>
          <h3>
            <span>{formatMessage(messages.line53)}</span>
          </h3>
          <p>
            <span>
              {formatMessage(messages.line54)}
            </span>
          </p>
          <p>
            <span>
              {formatMessage(messages.line55)}
            </span>
          </p>
          <p>
            <span>
              {formatMessage(messages.line56)}
            </span>
          </p>

          <h3>
            <span>{formatMessage(messages.line57)}</span>
          </h3>
          <h3>
            <span>{formatMessage(messages.line58)}</span>
          </h3>
          <p>
            <span>
              {formatMessage(messages.line59)}
            </span>
          </p>

          <h3 id="h.j4szlfvh8udy">
            <span>{formatMessage(messages.line60)}</span>
          </h3>
          <h3 id="h.6fiffo3nnyc4">
            <span>{formatMessage(messages.line61)}</span>
          </h3>
          <p>
            <span>
              {formatMessage(messages.line62)}
            </span>
          </p>
          <h2 id="h.85b4vyjp8nq7">
            <span>{formatMessage(messages.line63)}</span>
          </h2>
          <p>
            <span>
              {formatMessage(messages.line64)}
            </span>
          </p>
          <h3 id="h.y6pk5foqjzsp">
            <span>{formatMessage(messages.line65)}</span>
          </h3>
          <h3 id="h.gymjo3ket6iq">
            <span>
              {formatMessage(messages.line66)}
            </span>
          </h3>
          <ol type="i">
            <li>
              <span>
                {formatMessage(messages.line67)}
              </span>
            </li>
            <li>
              <span>
                {formatMessage(messages.line68)}
              </span>
            </li>
            <li>
              <span>
                {formatMessage(messages.line69)}
              </span>
            </li>
            <li>
              <span>
                {formatMessage(messages.line70)}
              </span>
            </li>
            <li>
              <span>
                {formatMessage(messages.line71)}
              </span>
            </li>
            <li>
              <span>
                {formatMessage(messages.line72)}
              </span>
            </li>
            <li>
              <span>{formatMessage(messages.line73)}</span>
            </li>
          </ol>
          <h3 id="h.hvjclbm15yln">
            <span>{formatMessage(messages.line74)}</span>
          </h3>
          <h3 id="h.bvw0i22pk3a">
            <span>
              {formatMessage(messages.line75)}
            </span>
          </h3>
          <ol start="1">
            <li>
              <span>{formatMessage(messages.line76)}</span>
            </li>
            <li>
              <span>
                {formatMessage(messages.line77)}
              </span>
            </li>
            <li>
              <span>
                {formatMessage(messages.line78)}
              </span>
            </li>
            <li>
              <span>{formatMessage(messages.line79)}</span>
            </li>
            <li>
              <span>
                {formatMessage(messages.line80)}
              </span>
            </li>
            <li>
              <span>
                {formatMessage(messages.line81)}
              </span>
            </li>
            <li>
              <span>
                {formatMessage(messages.line82)}
              </span>
            </li>
            <li>
              <span>{formatMessage(messages.line83)}</span>
            </li>
            <li>
              <span>
                {formatMessage(messages.line84)}
              </span>
            </li>
            <li>
              <span>
                {formatMessage(messages.line85)}
              </span>
            </li>
            <li>
              <span>
                {formatMessage(messages.line87)}
              </span>
            </li>
            <li>
              <span>
                {formatMessage(messages.line88)}
              </span>
            </li>
            <li>
              <span>
                {formatMessage(messages.line89)} 
              </span>
            </li>
            <li>
              <span>
                {formatMessage(messages.line90)}
              </span>
            </li>
          </ol>
          <p>
            <span>
              {formatMessage(messages.line91)}
            </span>
          </p>
          <h2 id="h.x76g7enjb2uv">
            <span>{formatMessage(messages.line92)}</span>
          </h2>
          <p>
            <span>
              {formatMessage(messages.line93)}
            </span>
          </p>
          <ol start="1">
            <li>
              <span>
                {formatMessage(messages.line94)}
              </span>
            </li>
            <li>
              <span>
                {formatMessage(messages.line95)}
              </span>
            </li>
            <li>
              <span>
                {formatMessage(messages.line96)}
              </span>
            </li>
            <li>
              <span>
                {formatMessage(messages.line97)}
              </span>
            </li>
            <li>
              <span>
                {formatMessage(messages.line98)}
              </span>
            </li>
            <li>
              <span>
                {formatMessage(messages.line99)}
              </span>
            </li>
          </ol>
          <p>
            <span>
              {formatMessage(messages.line100)}
            </span>
          </p>
          <p>
            <span>
              {formatMessage(messages.line101)}
            </span>
          </p>
          <p>
            <span>
              {formatMessage(messages.line102)} 
            </span>
          </p>
          <h2 id="h.d0zf8qigdxpn">
            <span>{formatMessage(messages.line103)}</span>
          </h2>
          <p>
            <span>
              {formatMessage(messages.line104)}
            </span>
          </p>

          <h2>
            <span>{formatMessage(messages.line105)}</span>
          </h2>
          <p>
            <span>
              {formatMessage(messages.line105Extended)}
            </span>
          </p>

          <h2 id="h.5qioky4i9gzv">
            <span>{formatMessage(messages.line106)}</span>
          </h2>
          <p>
            <span>
              {formatMessage(messages.line107)}
            </span>
          </p>
          <h2 id="h.ueyo7zg475nz">
            <span>{formatMessage(messages.line108)}</span>
          </h2>
          <p>
            <span>
              {formatMessage(messages.line109)}
            </span>
          </p>
          <h2 id="h.q7afigk9f6iw">
            <span>{formatMessage(messages.line110)}</span>
          </h2>
          <p>
            <span>
              {formatMessage(messages.line111)}
            </span>
          </p>
          <ol start="1">
            <li>
              <span>
                {formatMessage(messages.line112)}
              </span>
            </li>
            <li>
              <span>
                {formatMessage(messages.line113)}
              </span>
            </li>
            <li>
              <span>
                {formatMessage(messages.line114)}
              </span>
            </li>
            <li>
              <span>
                {formatMessage(messages.line115)}
              </span>
            </li>
            <li>
              <span>
                {formatMessage(messages.line116)}
              </span>
            </li>
            <li>
              <span>
                {formatMessage(messages.line117)}
              </span>
            </li>
          </ol>
          <h2 id="h.noc0mu9djrqi">
            <span>{formatMessage(messages.line118)}</span>
          </h2>
          <p>
            <span>
              {formatMessage(messages.line119)}
            </span>
          </p>
          <p>
            <span>
              {formatMessage(messages.line120)}
            </span>
          </p>
          <p>
            <span>
              {formatMessage(messages.line121)}
            </span>
          </p>
          <p>
            <span>
              {formatMessage(messages.line122)}
            </span>
          </p>
          <p>
            <span>
              {formatMessage(messages.line123)}
            </span>
          </p>
          <h3>
            <span>{formatMessage(messages.line124)}</span>
          </h3>
          <ol start="1">
            <li>
              <span>
                {formatMessage(messages.line125)}
              </span>
            </li>
            <li>
              <span>
                {formatMessage(messages.line126)}
              </span>
            </li>
            <li>
              <span>
                {formatMessage(messages.line127)}
              </span>
            </li>
            <li>
              <span>
                {formatMessage(messages.line128)}
              </span>
            </li>
            <li>
              <span>
                {formatMessage(messages.line129)}
              </span>
            </li>
            <li>
              <span>
                {formatMessage(messages.line130)}
              </span>
            </li>
            <li>
              <span>
                {formatMessage(messages.line131)}
              </span>
            </li>
            <li>
              <span>
                {formatMessage(messages.line132)}
              </span>
            </li>
            <li>
              <span>
                {formatMessage(messages.line133)}
              </span>
            </li>
          </ol>
          <h2 id="h.qb7bvsjm8sjz">
            <span>{formatMessage(messages.line134)}</span>
          </h2>
          <ol start="1">
            <li>
              <span>
                {formatMessage(messages.line135)}
              </span>
            </li>
            <li>
              <span>
                {formatMessage(messages.line136)}
              </span>
            </li>
            <li>
              <span>
                {formatMessage(messages.line137)}
              </span>
            </li>
          </ol>
          <h2 id="h.xnjxxrr72w4y">
            <span>{formatMessage(messages.line138)}</span>
          </h2>
          <ol start="1">
            <li>
              <span>
                {formatMessage(messages.line139)}
              </span>
            </li>
            <li>
              <span>
                {formatMessage(messages.line140)}
              </span>
            </li>
            <li>
              <span>
                {formatMessage(messages.line141)}
              </span>
            </li>
            <li>
              <span>
                {formatMessage(messages.line142)}
              </span>
            </li>
            <li>
              <span>
                {formatMessage(messages.line143)}
              </span>
            </li>
            <li>
              <span>
                {formatMessage(messages.line144)}
              </span>
            </li>
            <li>
              <span>
                {formatMessage(messages.line145)}
              </span>
            </li>
            <li>
              <span>
                {formatMessage(messages.line146)}
              </span>
            </li>
          </ol>
          <h2>
            <span>{formatMessage(messages.line147)}</span>
          </h2>
          <p>
            <span>
              {formatMessage(messages.line148)}
            </span>
          </p>
        </Container>

        <Footer isNarrow />
      </Wrapper>
    )
  }
}

export default Tac
