import { array, bool, func, number, object } from 'prop-types'
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
import FilterButton from './FilterButton'
import SelectBox from '../SelectBox'

const Container = styled(Ctn)`
  justify-content: flex-start;
  padding-bottom: 4rem;
  padding-top: 1rem;
  margin-left: auto;
  margin-right: auto;

  ${media.tablet`
    padding-bottom: 5rem;
    padding-top: 2rem;
  `};

  ${media.desktop`
    padding-bottom: 2rem;
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
const ButtonContent2 = styled.div`
  width: 100%;
  padding: 0;
  margin: 0 0 2rem 0;
  list-style: none;
  -ms-box-orient: horizontal;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -moz-flex;
  display: -webkit-flex;
  display: flex;
  -webkit-flex-wrap: wrap;
  flex-wrap: wrap;
  ${media.desktop`
  justify-content: space-between;
  `};
`

class Mapathons extends Component {
  static propTypes = {
    filters: object.isRequired,
    hideFilters: func.isRequired,
    clearFilters: func.isRequired,
    applyFilters: func.isRequired,
    listVisibility: bool.isRequired,
    nextPage: number,
    loadingMapathons: bool.isRequired,
    mapathons: array.isRequired,
    sendingRequest: bool.isRequired,
    getMapathons: func.isRequired,
    clearState: func.isRequired
  }

  state = {
    geolocation: this.props.filters.geolocation,
    gettingGeolocation: false
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

  updateGeolocation = event => {
    const radius = parseInt(event.target.value)
    if (radius === 0) {
      this.setState({
        geolocation: {
          lat: 0,
          long: 0,
          radius: 0
        },
        gettingGeolocation: false
      })
      this.props.applyFilters({
        geolocation: {
          radius: 0,
          lat: 0,
          long: 0
        }
      })
      return
    }

    this.setState({ gettingGeolocation: true, geolocation: { radius } })
    navigator.geolocation.getCurrentPosition(
      position => {
        const lat = position.coords.latitude
        const long = position.coords.longitude
        this.setState({
          gettingGeolocation: false,
          geolocation: {
            radius,
            lat,
            long
          }
        })
        this.props.applyFilters({
          geolocation: {
            radius: radius,
            lat: lat,
            long: long
          }
        })
      },
      () => {
        this.setState({
          geolocation: {
            lat: -1,
            long: -1,
            radius: radius
          },
          gettingGeolocation: false
        })
        this.props.applyFilters({
          geolocation: {
            radius: radius,
            lat: -1,
            long: -1
          }
        })
      }
    )
  }

  render() {
    const { formatMessage } = this.context.intl
    const options = [
      { value: '0', label: formatMessage(messages.allLabel) },
      { value: '10', label: `10 ${formatMessage(messages.milesLabel)}` },
      { value: '25', label: `25 ${formatMessage(messages.milesLabel)}` },
      { value: '50', label: `50 ${formatMessage(messages.milesLabel)}` }
    ]
    return (
      <Wrapper>
        <Helmet title={formatMessage(messages.pageTitle)} />

        <TopBar isLarge />

        <Container>
          <Video
            title="video-1"
            src="https://www.youtube.com/embed/mv7K7xifXyM?rel=0"
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

          <ButtonContent2>
            <FilterButton
              label={formatMessage(messages.dateButton)}
              onClickHandler={this.props.showFilters}
              filter={this.props.filters.date}
              visible={this.props.listVisibility}
              apply={this.props.applyFilters}
              for="date"
              type="rangeButton"
            />
            <FilterButton
              label={formatMessage(messages.mapathonReviewsButton)}
              onClickHandler={this.props.showFilters}
              filter={this.props.filters.numberOfReviews}
              visible={this.props.listVisibility}
              apply={this.props.applyFilters}
              for="numberOfReviews"
              type="rangeButton"
            />
            <FilterButton
              label={formatMessage(messages.hideZeroReviewsButton)}
              onClickHandler={this.props.showFilters}
              filter={this.props.filters.hideZeroReviews}
              visible={this.props.listVisibility}
              apply={this.props.applyFilters}
              for="hideZeroReviews"
              type="radioButton"
            />
            <FilterButton
              label={formatMessage(messages.inactiveMapathonsButton)}
              onClickHandler={this.props.showFilters}
              filter={this.props.filters.hideInactiveMapathons}
              visible={this.props.listVisibility}
              apply={this.props.applyFilters}
              for="hideInactiveMapathons"
              type="radioButton"
            />
            <SelectBox
              id="radius"
              value={this.state.geolocation.radius}
              options={options}
              style={{ width: '8rem', margin: '0.3rem' }}
              handleValueChange={this.updateGeolocation}
              ariaLabel="Filter by Type"
            />
          </ButtonContent2>

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
