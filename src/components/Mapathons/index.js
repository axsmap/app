import { array, bool, func, number, object } from 'prop-types'
import React, { Component } from 'react'
import ReactGA from 'react-ga'
import { Helmet } from 'react-helmet'
import { intlShape } from 'react-intl'
import styled from 'styled-components'
import MapathonsFilters from './MapathonsFilters'
import SearchForm from '../TopBar/SearchForm'
import FilterButton from '../TopBar/FilterButton'
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
const SearchFilterWrapper = styled.div`
  display: flex;

  align-items: center;
  justify-content: space-between;

  margin-top: 0.7rem;
  width: 100%;

  ${media.tablet`
    justify-content: flex-end;
    margin-left: 1rem;
    margin-top: 0;
  `};
`

const Video = styled.iframe`
  height: 15rem;
  margin-bottom: 2rem;
  width: 100%;
  max-width: 40rem;

  ${media.tablet`
    height: 20rem;
  `};

  ${media.desktop`
    height: 25rem;
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
    showFilters: func.isRequired,
    filters: object.isRequired,
    popupVisibility: bool.isRequired,
    hideFilters: func.isRequired,
    clearFilters: func.isRequired,
    applyFilters: func.isRequired,
    showPopup: func.isRequired,
    hidePopup: func.isRequired,
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
    console.log(this.props)
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
          <Video
            title="video-1"
            src="https://www.youtube.com/embed/bWvGxKduM3k?rel=0"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullscreen
          />

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

          {/* <SearchFilterWrapper> */}
          {/* <SearchForm
              value={this.props.address}
              onFormSubmit={this.props.handleQuerySubmit}
              onValueChange={this.props.handleAddressChange}
              placeholder={formatMessage(
                messages.mapathonsSearchLocationPlaceholder
              )}
            /> */}
          <FilterButton
            label={formatMessage(messages.showFiltersButton)}
            onClickHandler={this.props.showFilters}
          />
          {/* </SearchFilterWrapper> */}

          {this.props.filters.visible ? (
            <MapathonsFilters
              filters={this.props.filters}
              sendingRequest={this.props.sendingRequest}
              hide={this.props.hideFilters}
              clear={this.props.clearFilters}
              apply={this.props.applyFilters}
            />
          ) : null}

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
