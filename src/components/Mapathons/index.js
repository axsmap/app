import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import ReactGA from 'react-ga'
import { Helmet } from 'react-helmet'
import { useIntl } from 'react-intl'
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

import InformationIcon from '../../images/icon-information.png'

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
    width: 100%;
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
    background: ${props => props.$backgroundColor || colors.primary};
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
    width: 20rem;
  `};

  ${media.desktop`
    height: 25rem;
    display: block;
    width: 100%;
    min-width: 40rem;
  `};
`

const Image = styled.img`
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


const Mapathons = ({
  filters,
  hideFilters,
  clearFilters,
  applyFilters,
  listVisibility,
  nextPage,
  loadingMapathons,
  mapathons,
  sendingRequest,
  getMapathons,
  clearState,
}) => {
  const { formatMessage } = useIntl();

  const [geolocation, setGeolocation] = useState(filters.geolocation);
  const [gettingGeolocation, setGettingGeolocation] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  useEffect(() => {
    getMapathons();
    return () => {
      clearState();
    };
  }, [getMapathons, clearState]);

  const updateGeolocation = (event) => {
    const radius = parseInt(event.target.value);
    if (radius === 0) {
      setGeolocation({
        lat: 0,
        long: 0,
        radius: 0,
      });
      setGettingGeolocation(false);
      applyFilters({
        geolocation: {
          radius: 0,
          lat: 0,
          long: 0,
        },
      });
      return;
    }

    setGettingGeolocation(true);
    setGeolocation((prev) => ({ ...prev, radius }));
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const long = position.coords.longitude;
        setGettingGeolocation(false);
        setGeolocation({ radius, lat, long });
        applyFilters({ geolocation: { radius, lat, long } });
      },
      () => {
        setGeolocation({ lat: -1, long: -1, radius });
        setGettingGeolocation(false);
        applyFilters({ geolocation: { radius, lat: -1, long: -1 } });
      }
    );
  };

  const showModal = () => {
    setShow(!show);
  };

  return (
    <Wrapper>
      <Modal onClose={showModal} show={show}>
        <Video
          title="video-1"
          src="https://www.youtube.com/embed/mv7K7xifXyM?rel=0"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
        <HeroCopy
          style={{
            margin: '20px auto',
            textAlign: 'center',
            fontSize: '1.8rem',
            width: '100%',
            lineHeight: '2rem',
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
            <HeroListCopy>{formatMessage(messages.listFirstCopy)}</HeroListCopy>
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
            <HeroListCopy>{formatMessage(messages.listThirdCopy)}</HeroListCopy>
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
                    onClick={showModal}
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
                <LinkButton to="/mapathons/create" disabled={sendingRequest}>
                  <ButtonContent>
                    <Icon
                      glyph="cross"
                      size={0.75}
                      rotate="45deg"
                      color={colors.darkestGrey}
                    />
                    <p style={{ margin: '0 0 0 0.5rem', fontSize: '.875rem' }}>
                      {formatMessage(messages.createMapathonButton)}
                    </p>
                  </ButtonContent>
                </LinkButton>
              </HeroTop>
              <HideOnMobile>
                <HeroBottom>
                  <Video
                    title="video-1"
                    src="https://www.youtube.com/embed/mv7K7xifXyM?rel=0"
                    frameBorder="0"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
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
                    onClickHandler={hideFilters}
                    filter={filters.date}
                    visible={listVisibility}
                    apply={applyFilters}
                    for="date"
                    type="rangeButton"
                  />
                  <FilterButton
                    label={formatMessage(messages.mapathonReviewsButton)}
                    onClickHandler={hideFilters}
                    filter={filters.numberOfReviews}
                    visible={listVisibility}
                    apply={applyFilters}
                    for="numberOfReviews"
                    type="rangeButton"
                  />

                  <FilterButton
                    label={formatMessage(messages.hideZeroReviewsButton)}
                    onClickHandler={hideFilters}
                    filter={filters.hideZeroReviews}
                    visible={listVisibility}
                    apply={applyFilters}
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
                    value={geolocation.radius}
                    options={options}
                    style={{ width: "8rem", margin: "0.3rem" }}
                    handleValueChange={updateGeolocation}
                    ariaLabel="Filter by Type"
                  /> */}
                </ButtonContent2>
              </FilterWrapper>
              {loadingMapathons ? (
                <Spinner />
              ) : (
                <List
                  mapathons={mapathons}
                  sendingRequest={sendingRequest}
                />
              )}

              {nextPage ? (
                <ButtonsWrapper>
                  <Button
                    disabled={sendingRequest}
                    onClickHandler={getMapathons}
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
              {!loadingMapathons && mapathons && mapathons.length === 0 ? (
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
  );
};

Mapathons.propTypes = {
  filters: PropTypes.object.isRequired,
  hideFilters: PropTypes.func.isRequired,
  clearFilters: PropTypes.func.isRequired,
  applyFilters: PropTypes.func.isRequired,
  listVisibility: PropTypes.bool.isRequired,
  nextPage: PropTypes.number,
  loadingMapathons: PropTypes.bool.isRequired,
  mapathons: PropTypes.array.isRequired,
  sendingRequest: PropTypes.bool.isRequired,
  getMapathons: PropTypes.func.isRequired,
  clearState: PropTypes.func.isRequired,
};

export default Mapathons;