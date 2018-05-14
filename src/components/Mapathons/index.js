import { array, bool, func, number } from 'prop-types'
import React, { Component } from 'react'
import ReactGA from 'react-ga'
import { Helmet } from 'react-helmet'
import { intlShape } from 'react-intl'
import styled from 'styled-components'

import Button from '../Button'
import Ctn from '../Container'
import Footer from '../Footer'
import Icon from '../Icon'
import LinkBtn from '../LinkButton'
import NoResults from '../NoResults'
import Spinner from '../Spinner'
import { colors, media } from '../../styles'
import TabBar from '../../containers/TabBar'
import TopBar from '../../containers/TopBar'
import Wrapper from '../Wrapper'

import List from './List'
import messages from './messages'

const Container = styled(Ctn)`
  justify-content: flex-start;
  padding-bottom: 4rem;
  padding-top: 1rem;

  ${media.tablet`
    padding-bottom: 5rem;
    padding-top: 2rem;
  `};

  ${media.desktop`
    padding-bottom: 2rem;
  `};
`

const LinkButton = styled(LinkBtn)`
  margin-bottom: 1rem;

  ${media.tablet`
    margin-bottom: 2rem;
  `};
`

const ButtonsWrapper = styled.div`
  bottom: 5rem;
  left: 0;
  position: fixed;

  display: flex;

  justify-content: space-around;

  padding: 0 1rem;
  width: 100%;

  ${media.tablet`
    bottom: 6rem;
  `};

  ${media.desktop`
    position: static;
  `};
`

const ButtonContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

class Mapathons extends Component {
  static propTypes = {
    nextPage: number,
    loadingMapathons: bool.isRequired,
    mapathons: array.isRequired,
    sendingRequest: bool.isRequired,
    getMapathons: func.isRequired,
    clearState: func.isRequired
  }

  static contextTypes = {
    intl: intlShape
  }

  componentWillMount() {
    ReactGA.pageview(window.location.pathname + window.location.search)
  }

  componentDidMount() {
    this.props.getMapathons()
  }

  componentWillUnmount() {
    this.props.clearState()
  }

  render() {
    const formatMessage = this.context.intl.formatMessage

    return (
      <Wrapper>
        <Helmet title={formatMessage(messages.pageTitle)} />

        <TopBar />

        <Container>
          <LinkButton
            to="/mapathons/create"
            disabled={this.props.sendingRequest}
          >
            <ButtonContent>
              <Icon
                glyph="cross"
                size={1}
                rotate="45deg"
                color={colors.darkestGrey}
              />
              <p style={{ margin: '0 0 0 0.5rem' }}>
                {formatMessage(messages.createMapathonButton)}
              </p>
            </ButtonContent>
          </LinkButton>

          {this.props.loadingMapathons ? (
            <Spinner />
          ) : (
            <List
              mapathons={this.props.mapathons}
              sendingRequest={this.props.sendingRequest}
            />
          )}

          {this.props.nextPage ? (
            <ButtonsWrapper>
              <Button
                disabled={this.props.sendingRequest}
                float
                onClickHandler={this.props.getMapathons}
              >
                <ButtonContent>
                  <Icon glyph="load" size={1} color={colors.darkestGrey} />
                  <p style={{ margin: '0 0 0 0.5rem' }}>
                    {formatMessage(messages.loadMoreButton)}
                  </p>
                </ButtonContent>
              </Button>
            </ButtonsWrapper>
          ) : null}

          {!this.props.loadingMapathons &&
          this.props.mapathons &&
          this.props.mapathons.length === 0 ? (
            <NoResults
              title={formatMessage(messages.noResultsTitle)}
              text={formatMessage(messages.noResultsText)}
            />
          ) : null}
        </Container>

        <Footer isNarrow hideOn="phone,tablet" />

        <TabBar />
      </Wrapper>
    )
  }
}

export default Mapathons
