import { array, bool, func, number, object } from 'prop-types'
import React, { Component } from 'react'
import ReactGA from 'react-ga'
import { Helmet } from 'react-helmet'
import { intlShape } from 'react-intl'
import styled from 'styled-components'

import { NoEncryption } from '@material-ui/icons'
import Button from '../Button'
import Ctn from '../Container'
import Footer from '../Footer'
import Icon from '../Icon'
import LinkBtn from '../LinkButton'
import NoResults from '../NoResults'
import Spinner from '../Spinner'
import { colors, fontWeight, media } from '../../styles'
import TabBar from '../../containers/TabBar'
import TopBar from '../../containers/TopBar'
import Wrapper from '../Wrapper'
import CloseBtn from '../CreateReview/CloseBtn'

import List from './List'
import messages from './messages'
import FilterButton from './FilterButton'
import SelectBox from '../SelectBox'

import VideoImage from '../../images/video-image.png'
import MapathonImage from '../../images/mapathon-detail.png'
import InformationIcon from '../../images/icon-information.png'
import MobileLanguageDropdown from '../../images/icons/world.png'

import Modal from './InformationDialog'

const Container = styled(Ctn)`
  justify-content: flex-start;
  padding-top: 4rem;
  margin-left: auto;
  margin-right: auto;

  ${media.tablet`
    padding-bottom: 5rem;
    padding-top: 2rem;
  `};

  ${media.desktop`
    margin-left: auto;
    margin-right: auto;
    padding-bottom: 0; 
  `};
`

const TopContainer = styled.div`
  width: 100%;
  background-color: #fff;
`

const BottomContainer = styled.div`
  width: 100%;
  background-color: #f4f4f4;
`

const InteriorContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 1rem;

  ${media.tablet`
    padding: 2rem 0;
    width: 723px;
  `};

  ${media.desktop`
    padding: 2rem 0;
    width: 933px;
  `};

  ${media.widescreen`
    padding: 2rem 0;
    width: 1172px;
  `};
`

const HeroCopy = styled.div`
  font-size: 1.25rem;
  font-weight: bold;
  color: #42454a;
  width: 80%;
  margin-bottom: 20px;
  ${media.tablet`
    font-size: 1.2rem;
  `};

  ${media.desktop`
    width: 100%; 
    font-size: 1.9rem;
  `};
`

const HeroTop = styled.div`
  width: 100%;
  position: relative;
  ${media.tablet`
    width: 100%;
  `};

  ${media.desktop`
    width: 50%;
    padding-right: 10px;
  `};
`

const HeroBottom = styled.div`
  width: 100%;
  ${media.tablet`
    width: 100%;
  `};

  ${media.desktop`
    width: 50%;
  `};
`

const HeroList = styled.ol`
  margin: 0 0 20px;
  padding-left: 40px;
  clear: both;
  list-style: none;
`

const HeroListItem = styled.li`
  display: block;
  position: relative;
  counter-increment: inst;
  padding-bottom: 20px;
  ::before {
    content: counter(inst);
    background: ${props => props.backgroundColor || colors.primary};
    border-radius: 50%;
    font-size: 1em;
    text-align: center;
    font-weight: bold;
    left: -40px;
    top: 0;
    min-height: 32px;
    min-width: 32px;
    position: absolute;
    padding: 5px;
  }
  &:last-child {
    padding: 0;
  }
`

const HeroListCopy = styled.p`
  font-size: 1rem;
  margin: 0;
`

const ModalBtn = styled.div`
  position: absolute;
  top: 0;
  right: 0;

  ${media.tablet`
     
  `};

  ${media.desktop`
    display: none;
  `};
`

const Flex = styled.div`
  ${media.tablet`
     
  `};

  ${media.desktop`
    display: flex;
  `};
`

const Video = styled.iframe`
  height: 15rem;
  margin-bottom: 2rem;
  width: 100%;
  max-width: 40rem;

  ${media.tablet`
    //height: 20rem;
  `};

  ${media.desktop`
    height: 25rem;
    display: block;
  `};
`

const Image = styled.img`
  width: auto;
  margin: 0;
`

const VideoContainer = styled.img`
  display: block;
  width: auto;
  margin: 0;
`

const LinkButton = styled(LinkBtn)`
  margin-bottom: 1rem;
  width: 100%;

  ${media.tablet`
    margin-bottom: 2rem;
    width: 266px;
  `};
  ${media.desktop`
    width: 266px;
  `};
`

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
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
  justify-content: center;
  width: 100%;
  text-transform: capitalize;
  // justify-content: space-between;
`
const ButtonContent2 = styled.div`
  width: 100%;
  padding: 0;
  margin: 0;
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

const FilterWrapper = styled.div`
  margin: 0 0 2rem 0;
  width: fit-content;
`

const HideOnMobile = styled.div`
  display: none;

  ${media.tablet`
    
  `};

  ${media.desktop`
    display: block;
  `};
`

const WrapperItem = styled.div`
  flex-grow: 1;
  width: 100%;
  &::after {
    display: table;
    clear: both;
    content: '';
  }
`

const Item = styled.div`
  float: left;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid ${colors.grey};
  border-radius: 10px;
  margin-bottom: 1rem;
  margin-right: 0;
  width: 100%;
  min-height: 10rem;
  background-color: white;
  text-decoration: none;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16%);
  overflow: hidden;

  &:active,
  &:focus {
    outline: 2px solid ${colors.secondary};
  }

  &:disabled,
  &[disabled] {
    opacity: 0.5;
  }

  ${media.tablet`
    margin-bottom: 2rem;
    margin-right: 2rem;
    width: calc((100% - 2rem * 1) / 2);

    &:nth-child(2n+2) {
      float: right;
      margin-right: 0;
    }
  `};

  ${media.desktop`
    flex-direction: column; 
    margin-bottom: 2rem;
    margin-right: 2rem;
    width: calc((100% - 2rem * 2) / 3);
    height: 20rem;

    &:nth-child(2n+2) {
      float: left;
      margin-right: 2rem;
    }

    &:nth-child(3n+3) {
      float: left;
      margin-right: 2rem;
    }

    &:nth-child(4n+4) {
      float: right;
      margin-right: 0;
    }
  `};
`

const Poster = styled.div`
  flex-shrink: 0;
  width: 100%;
  height: 150px;
  background-image: ${props => `url("${props.image}")`};
  background-position: top;
  background-repeat: no-repeat;
  background-size: cover;

  ${media.desktop`
    flex-shrink: 1;
    width: 100%;
    height: 150px;
  `};
`

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: inherit;
  width: 100%;
  padding: 1rem;

  ${media.desktop`
    border-radius: 0 0 3px 3px;
    height: 50%;
    width: 100%;
  `};
`

const Name = styled.h3`
  overflow: hidden;
  margin: 0;
  width: 100%;
  color: ${colors.darkestGrey};
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 1.3rem;
`

const AddressWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.25rem;
  width: 100%;
`

const AddressText = styled.p`
  overflow: hidden;
  margin: 0 0 0 0.25rem;
  color: ${colors.darkestGrey};
  font-size: 0.9rem;
`

const DatesWrapper = styled.div`
  display: flex;
  align-items: center;
`

const ReviewsText = styled.p`
  overflow: hidden;
  color: ${colors.darkestGrey};
  font-size: 0.9rem;
  &:before {
    content: ' | ';
    margin-left: 0.25rem;
  }
`

const RowWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${colors.primary};
`

const RowLeftWrapper = styled.div`
  display: flex;

  p {
    margin: 0;
  }
`
const IconWrapper = styled.div`
  display: flex;
`
const DescriptionWrapper = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-size: 0.8rem;
`

//

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
    gettingGeolocation: false,
    show: false
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
            radius,
            lat,
            long
          }
        })
      },
      () => {
        this.setState({
          geolocation: {
            lat: -1,
            long: -1,
            radius
          },
          gettingGeolocation: false
        })
        this.props.applyFilters({
          geolocation: {
            radius,
            lat: -1,
            long: -1
          }
        })
      }
    )
  }

  showModal = e => {
    this.setState({
      show: !this.state.show
    })
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
        <Modal onClose={this.showModal} show={this.state.show}>
          <Video
            title="video-1"
            src="https://www.youtube.com/embed/mv7K7xifXyM?rel=0"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullscreen
          />
          <HeroCopy
            style={{
              margin: '20px auto',
              textAlign: 'center',
              fontSize: '1.8rem',
              width: '100%',
              lineHeight: '2rem'
            }}
          >
            {formatMessage(messages.pageLabel)}
          </HeroCopy>
          <HeroList>
            <HeroListItem>
              <HeroListCopy>
                <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                  {formatMessage(messages.listFirstTitle)}
                </span>
              </HeroListCopy>
              <HeroListCopy>
                {formatMessage(messages.listFirstCopy)}
              </HeroListCopy>
            </HeroListItem>
            <HeroListItem>
              <HeroListCopy>
                <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                  {formatMessage(messages.listSecondTitle)}
                </span>
              </HeroListCopy>
              <HeroListCopy>
                {formatMessage(messages.listSecondCopy)}
              </HeroListCopy>
            </HeroListItem>
            <HeroListItem>
              <HeroListCopy>
                <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                  {formatMessage(messages.listThirdTitle)}
                </span>
              </HeroListCopy>
              <HeroListCopy>
                {formatMessage(messages.listThirdCopy)}
              </HeroListCopy>
            </HeroListItem>
          </HeroList>
        </Modal>

        <Helmet title={formatMessage(messages.pageTitle)} />

        <TopBar isLarge />

        <Container>
          <TopContainer>
            <InteriorContainer>
              <Flex>
                <HeroTop>
                  <HeroCopy>{formatMessage(messages.pageLabel)}</HeroCopy>

                  <ModalBtn>
                    <Image
                      src={InformationIcon}
                      style={{ width: '30px', height: '30px' }}
                      alt=""
                      onClick={e => {
                        this.showModal(e)
                      }}
                    />
                  </ModalBtn>

                  <HideOnMobile>
                    <HeroList>
                      <HeroListItem>
                        <HeroListCopy>
                          <span
                            style={{ fontWeight: 'bold', fontSize: '1.1rem' }}
                          >
                            {formatMessage(messages.listFirstTitle)}
                          </span>
                        </HeroListCopy>
                        <HeroListCopy>
                          {formatMessage(messages.listFirstCopy)}
                        </HeroListCopy>
                      </HeroListItem>
                      <HeroListItem>
                        <HeroListCopy>
                          <span
                            style={{ fontWeight: 'bold', fontSize: '1.1rem' }}
                          >
                            {formatMessage(messages.listSecondTitle)}
                          </span>
                        </HeroListCopy>
                        <HeroListCopy>
                          {formatMessage(messages.listSecondCopy)}
                        </HeroListCopy>
                      </HeroListItem>
                      <HeroListItem>
                        <HeroListCopy>
                          <span
                            style={{ fontWeight: 'bold', fontSize: '1.1rem' }}
                          >
                            {formatMessage(messages.listThirdTitle)}
                          </span>
                        </HeroListCopy>
                        <HeroListCopy>
                          {formatMessage(messages.listThirdCopy)}
                        </HeroListCopy>
                      </HeroListItem>
                    </HeroList>
                  </HideOnMobile>
                  <LinkButton
                    to="/mapathons/create"
                    disabled={this.props.sendingRequest}
                  >
                    <ButtonContent>
                      <Icon
                        glyph="cross"
                        size={0.75}
                        rotate="45deg"
                        color={colors.darkestGrey}
                      />
                      <p
                        style={{ margin: '0 0 0 0.5rem', fontSize: '.875rem' }}
                      >
                        {formatMessage(messages.createMapathonButton)}
                      </p>
                    </ButtonContent>
                  </LinkButton>
                </HeroTop>
                <HideOnMobile>
                  <HeroBottom>
                    test
                    <Video
                      title="video-1"
                      src="https://www.youtube.com/embed/mv7K7xifXyM?rel=0"
                      frameBorder="0"
                      allow="autoplay; encrypted-media"
                      allowFullscreen
                    />
                  </HeroBottom>
                </HideOnMobile>
              </Flex>
            </InteriorContainer>
          </TopContainer>

          <BottomContainer>
            <InteriorContainer>
              <div>
                <FilterWrapper>
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
                    {/* <FilterButton
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
                      style={{ width: "8rem", margin: "0.3rem" }}
                      handleValueChange={this.updateGeolocation}
                      ariaLabel="Filter by Type"
                    /> */}
                  </ButtonContent2>
                </FilterWrapper>
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
                      onClickHandler={this.props.getMapathons}
                    >
                      <ButtonContent>
                        <p style={{ margin: '0 0 0 0.5rem' }}>
                          {formatMessage(messages.loadMoreButton)}
                        </p>
                      </ButtonContent>
                    </Button>
                  </ButtonsWrapper>
                ) : null}
              </div>

              <div className="axs-noresults">
                {!this.props.loadingMapathons &&
                this.props.mapathons &&
                this.props.mapathons.length === 0 ? (
                  <NoResults
                    title={formatMessage(messages.noResultsTitle)}
                    text={formatMessage(messages.noResultsText)}
                  />
                ) : null}
              </div>
            </InteriorContainer>
          </BottomContainer>
        </Container>

        <Footer isNarrow hideOn="phone,tablet" />

        <TabBar />
      </Wrapper>
    )
  }
}

export default Mapathons
