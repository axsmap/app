import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import ReactGA from 'react-ga'
import Helmet from 'react-helmet'
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import Spinner from '../Spinner'
import { media } from '../../styles'
import TabBar from '../../containers/TabBar'
import TopBar from '../../containers/TopBar'
import Wrp from '../Wrapper'
import WelcomePage from '../../containers/WelcomePage'
import FiltersDialog from './FiltersDialog'
import UsesDialog from './UsesDialog'
import List from './List'
import Map from './Map'
import messages from './messages'

const Wrapper = styled(Wrp)`
  padding: 8rem 0 4rem 0;

  ${media.tablet`
    padding: 4rem 0;
  `};

  ${media.desktop`
    padding: 4rem 0 0 0;
  `};
`
const WelcomeWrap = styled.div`
  width: 100%;
  position: absolute;
  height: 100vh;
  background-color: transparent;
  top: 0;
`


const Venues = ({
  filters,
  listVisibility,
  loadingVenues,
  incomingVenues,
  loadingMap,
  mapVisibility,
  userLocation,
  centerLocation,
  showSearchHere,
  sendingRequest,
  showUserMarker,
  visibleVenues,
  popupVisibility,
  getVenues,
  clearState,
  hideFilters,
  clearFilters,
  applyFilters,
  setCenterLocation,
  showMap,
  onClickMap,
  onDragMap,
  onZoomMap,
  loadCenterVenues,
  showPopup,
  hidePopup,
  getUserLocation,
  showList,
  welcomeVisibility,
  usesVisibility,
  hideWelcome,
  showUses,
  hideUses,
}) => {
  const { formatMessage } = useIntl();
  const [filterApplied, setFilterApplied] = useState(false);

  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  useEffect(() => {
    getVenues();

    if (localStorage.getItem('axs-visit')) {
      let visitNumber = localStorage.getItem('axs-visit');
      visitNumber = parseInt(visitNumber) + 1;
      localStorage.setItem('axs-visit', visitNumber);
      hideWelcome();
    } else {
      localStorage.setItem('axs-visit', 1);
    }
  }, [getVenues, hideWelcome]);

  useEffect(() => {
    return () => {
      clearState();
    };
  }, [clearState]);

  const filtersAppliedCheck = (applyButtonClicked) => {
    setFilterApplied(applyButtonClicked);
  };

  return (
    <Wrapper>
      <Helmet title={formatMessage(messages.pageTitle)} />
      <TopBar
        isLarge
        filterButtonLabel={formatMessage(messages.showFiltersButton)}
        filterButtonOnClickHandler={hideFilters}
        filterButtonFilters={filters}
        filterButtonVisible={listVisibility}
        filterButtonFilterApplied={filterApplied}
      />
      {welcomeVisibility && (
        <WelcomeWrap>
          <WelcomePage
            hideWelcome={hideWelcome}
            placeholderTxt={formatMessage(messages.venuesSearchLocationPlaceholder)}
            onClickHandler={showUses}
          />
        </WelcomeWrap>
      )}

      {filters.visible && (
        <FiltersDialog
          filters={filters}
          sendingRequest={sendingRequest}
          hide={hideFilters}
          clear={clearFilters}
          apply={applyFilters}
          filtersAppliedCheck={filtersAppliedCheck}
        />
      )}

      {usesVisibility && (
        <UsesDialog sendingRequest={sendingRequest} hide={hideUses} />
      )}

      {!welcomeVisibility && (
        <List
          visible={listVisibility}
          loadingVenues={loadingVenues}
          venues={visibleVenues}
          sendingRequest={sendingRequest}
          incomingVenues={incomingVenues}
          setCenterLocation={setCenterLocation}
          getVenues={getVenues}
          showMap={showMap}
        />
      )}

      {loadingMap ? (
        <Spinner />
      ) : (
        <Map
          visible={mapVisibility}
          userLocation={userLocation}
          centerLocation={centerLocation}
          showSearchHere={showSearchHere}
          sendingRequest={sendingRequest}
          showUserMarker={showUserMarker}
          venues={visibleVenues}
          popupVisibility={popupVisibility}
          onClickMap={onClickMap}
          onDragMap={onDragMap}
          onZoomMap={onZoomMap}
          loadCenterVenues={loadCenterVenues}
          showPopup={showPopup}
          hidePopup={hidePopup}
          getUserLocation={getUserLocation}
          showList={showList}
        />
      )}

      <TabBar />
    </Wrapper>
  );
};

Venues.propTypes = {
  filters: PropTypes.object.isRequired,
  listVisibility: PropTypes.bool.isRequired,
  loadingVenues: PropTypes.bool.isRequired,
  incomingVenues: PropTypes.bool.isRequired,
  loadingMap: PropTypes.bool.isRequired,
  mapVisibility: PropTypes.bool.isRequired,
  userLocation: PropTypes.object.isRequired,
  centerLocation: PropTypes.object.isRequired,
  showSearchHere: PropTypes.bool.isRequired,
  sendingRequest: PropTypes.bool.isRequired,
  showUserMarker: PropTypes.bool.isRequired,
  visibleVenues: PropTypes.array.isRequired,
  popupVisibility: PropTypes.bool.isRequired,
  getVenues: PropTypes.func.isRequired,
  clearState: PropTypes.func.isRequired,
  hideFilters: PropTypes.func.isRequired,
  clearFilters: PropTypes.func.isRequired,
  applyFilters: PropTypes.func.isRequired,
  setCenterLocation: PropTypes.func.isRequired,
  showMap: PropTypes.func.isRequired,
  onClickMap: PropTypes.func.isRequired,
  onDragMap: PropTypes.func.isRequired,
  onZoomMap: PropTypes.func.isRequired,
  loadCenterVenues: PropTypes.func.isRequired,
  showPopup: PropTypes.func.isRequired,
  hidePopup: PropTypes.func.isRequired,
  getUserLocation: PropTypes.func.isRequired,
  showList: PropTypes.func.isRequired,
  welcomeVisibility: PropTypes.bool.isRequired,
  usesVisibility: PropTypes.bool.isRequired,
  hideWelcome: PropTypes.func.isRequired,
  showUses: PropTypes.func.isRequired,
  hideUses: PropTypes.func.isRequired,
};

export default Venues;