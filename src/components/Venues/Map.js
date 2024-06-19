/* global google */

import { isEqual, kebabCase } from "lodash";
import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import {
  GoogleMap as GM,
  Marker,
  withGoogleMap,
  withScriptjs,
} from "react-google-maps";
import { useIntl } from "react-intl";
import { compose, withProps } from "recompose";
import styled from "styled-components";

import Button from "../Button";
import Icon from "../Icon";
import { colors, media } from "../../styles";
import { getGeneralType } from "../../utilities";

import messages from "./messages";
import Popup from "./Popup";

const Wrapper = styled.div`
  bottom: 4rem;
  position: fixed;
  right: 0;
  top: 8.25rem;
  z-index: ${(props) => (props.visible ? 10 : -1)};
  width: 100%;
  overflow: hidden;

  ${media.mobile`
    margin-top: 4rem;
  `};

  ${media.tablet`
     z-index: ${(props) => (props.visible ? 20 : -1)};
    top: 0rem;
    width: 100%;
  `};

  ${media.desktop`
    bottom: 0;
    margin-top:0;
    width: 40%;
    top: 4rem;
  `};

  ${media.widescreen`
    z-index: 10;
    bottom: 0;
    width: 57%;
    top: 4rem;
  `};

  @media only screen and (min-device-width: 1024px) and (max-device-width: 1366px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: landscape) {
    z-index: ${(props) => (props.visible ? 20 : -1)};
    top: 2rem;
    width: 45%;
  }

  @media only screen and (min-device-width: 1024px) and (max-device-width: 1366px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait) {
    z-index: ${(props) => (props.visible ? 20 : -1)};
    top: 4rem;
    width: 100%;
  }

  // @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait) {
  //   z-index: ${(props) => (props.visible ? 20 : -1)};
  //   top: 2rem;
  //   width: 100%;
  // }

  @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: landscape) {
    z-index: ${(props) => (props.visible ? 20 : -1)};
    top: 3.75rem;
    width: 100%;
  }

  &::after {
    bottom: 4rem;
    position: fixed;
    right: 0;
    top: 2rem;
    z-index: ${(props) => (props.visible ? -1 : 10)};

    height: 100%;
    width: 100%;

    background-color: ${colors.lightestGrey};

    content: " ";

    ${media.widescreen`
      z-index: -1;
    `};
  }
`;
const LocateBgColor = styled.p`
  color: ${colors.white};
`;

const ButtonContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ShowListButton = styled(Button)`
  display: block;

  ${media.tablet`
    display: block;
  `};

  ${media.desktop`
    display: none;
  `};

  ${media.widescreen`
    display: none;
  `};

  @media only screen and (min-device-width: 1024px) and (max-device-width: 1366px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait) {
    display: block;
  }

  @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: landscape) {
    display: block;
  }
`;

const ButtonsWrapper = styled.div`
  bottom: 2rem;
  position: absolute;
  display: flex;
  justify-content: space-around;
  padding: 0 1rem;
  width: 100%;

  @media only screen and (min-device-width: 1024px) and (max-device-width: 1366px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait) {
    display: flex;
    bottom: 7rem;
  }

  @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: landscape) {
    display: flex;
    bottom: 7rem;
  }
`;

const SearchHereButton = styled(Button)`
  left: 50%;
  position: absolute;
  top: 1rem;
  transform: translateX(-50%);
  margin: 0 auto;
  padding-left: 10px !important;
  padding-right: 10px !important;
`;

const LocateWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const googleApiKey = process.env.REACT_APP_GOOGLE_API_KEY;
const myStyles = [
  {
    featureType: "poi",
    elementType: "labels",
    stylers: [{ visibility: "off" }],
  },
];
const GoogleMap = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?v=3.exp&key=${googleApiKey}&libraries=places`,
    loadingElement: <div style={{ height: "100%" }} />,
    containerElement: (
      <div style={{ height: "100%", background: "transparent!important" }} />
    ),
    mapElement: <div style={{ height: "100%" }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) => {
  const mapOptions = {
    zoomControlOptions: {
      position: window.google.maps.ControlPosition.LEFT_TOP,
    },
    fullscreenControlOptions: {
      position: window.google.maps.ControlPosition.RIGHT_TOP,
    },
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    rotateControl: false,
    fullscreenControl: true,
    gestureHandling: "greedy",
    styles: myStyles,
  };

  return (
    <GM
      options={mapOptions}
      center={props.centerLocation}
      zoom={props.zoom}
      ref={props.onMapMounted}
      onClick={props.onClickMap}
      onDrag={props.onDragMap}
      onZoomChanged={props.onZoomMap}
      key="map"
    >
      {props.children}
    </GM>
  );
});

const Map = (props) => {
  const { formatMessage } = useIntl();
  const [map, setMap] = useState(undefined);
  const [zoom, setZoom] = useState(15);
  const [lastZoom, setLastZoom] = useState(undefined);
  const [lastMarkerLocation, setLastMarkerLocation] = useState({
    lat: 0,
    lng: 0,
  });
  const [popupProperties, setPopupProperties] = useState({
    location: { lat: 0, lng: 0 },
    icon: "",
    name: "",
    address: "",
    entranceScore: 0,
    interiorScore: 0,
    restroomScore: 0,
    mapMarkerScore: 0,
    placeId: "",
    venue: "",
  });

  const mapRef = useRef();

  useEffect(() => {
    if (props.venues.length > 0 && map) {
      const bounds = new google.maps.LatLngBounds();
      props.venues.forEach((venue) =>
        bounds.extend(
          new google.maps.LatLng(venue.location.lat, venue.location.lng)
        )
      );

      map.fitBounds(bounds);

      if (lastZoom) {
        keepZoom();
      } else {
        zoomOut();
      }
    }
  }, [props.venues, map]);

  const onMapMounted = (ref) => {
    setMap(ref);
  };

  const onZoomMap = () => {
    setZoom(map.getZoom());
    props.onZoomMap();
  };

  const keepZoom = () => {
    setTimeout(() => {
      setZoom(lastZoom);
      setLastZoom(undefined);
    }, 100);
  };

  const zoomOut = () => {
    setTimeout(() => {
      setZoom(map.getZoom() - 1);
      setLastZoom(undefined);
    }, 100);
  };

  const loadCenterVenues = () => {
    const location = {
      lat: map.getCenter().lat(),
      lng: map.getCenter().lng(),
    };
    setLastZoom(zoom);
    props.loadCenterVenues(location);
  };

  const togglePopup = (venue, icon) => {
    const location = { lat: venue.location.lat, lng: venue.location.lng };

    if (props.popupVisibility) {
      if (isEqual(location, lastMarkerLocation)) {
        props.hidePopup();
        return;
      }

      setLastMarkerLocation(location);
      props.hidePopup();
      setPopupProperties({
        location,
        icon,
        name: venue.name,
        address: venue.address,
        entranceScore: venue.entranceScore,
        interiorScore: venue.interiorScore,
        restroomScore: venue.restroomScore,
        mapMarkerScore: venue.mapMarkerScore || 0,
        placeId: venue.placeId,
        venue,
      });
      props.showPopup(location);
    } else {
      setLastMarkerLocation(location);
      setPopupProperties({
        location,
        icon,
        name: venue.name,
        address: venue.address,
        entranceScore: venue.entranceScore,
        interiorScore: venue.interiorScore,
        restroomScore: venue.restroomScore,
        mapMarkerScore: venue.mapMarkerScore || 0,
        placeId: venue.placeId,
        venue,
      });
      props.showPopup(location);
    }
  };

  return (
    <Wrapper visible={props.visible}>
      <GoogleMap
        centerLocation={props.centerLocation}
        zoom={zoom}
        onMapMounted={onMapMounted}
        onClickMap={props.onClickMap}
        onDragMap={props.onDragMap}
        onZoomMap={onZoomMap}
        draggable
      >
        {props.showSearchHere && (
          <SearchHereButton
            float
            disabled={props.sendingRequest}
            onClickHandler={loadCenterVenues}
            $backgroundColor={colors.primary}
            color={colors.black}
            className="primary-btn"
          >
            <LocateWrap>
              <Icon glyph="rotate" size={1} color="black" />
              <span style={{ margin: "0 0 0 0.5rem" }}>
                {formatMessage(messages.searchHereButton)}
              </span>
            </LocateWrap>
          </SearchHereButton>
        )}

        {props.showUserMarker && (
          <Marker
            position={props.userLocation}
            icon={{
              url: "https://s3.amazonaws.com/axsmap-media/markers/hi-vis/location.png",
              scaledSize: new google.maps.Size(40.66, 50),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(20.33, 50),
            }}
            zIndex={google.maps.Marker.MAX_ZINDEX + 1}
          />
        )}

        {props.venues.map((venue) => {
          const selectedType = getGeneralType(venue.types);

          const reviewsRatioWeight = venue.mapMarkerScore || 0;
          let selectedScore = "";
          if (reviewsRatioWeight === 1 && reviewsRatioWeight < 3)
            selectedScore = "-bad";
          else if (reviewsRatioWeight >= 3 && reviewsRatioWeight < 5)
            selectedScore = "-average";
          else if (reviewsRatioWeight >= 5) selectedScore = "-good";

          let backgroundIcon = "gray700";
          if (selectedScore === "-bad") backgroundIcon = "ratingCaution";
          if (selectedScore === "-average") backgroundIcon = "ratingAlert";
          if (selectedScore === "-good") backgroundIcon = "ratingAccessible";
          const icon = {
            url: `https://s3.amazonaws.com/axsmap-media/markers/hi-vis/${kebabCase(selectedType)}${selectedScore}.svg`,
            background: backgroundIcon,
          };
          const venueIcon = {
            url: icon.url,
            scaledSize: new google.maps.Size(40.66, 50),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(20.33, 50),
          };
          return (
            <Marker
              key={venue.placeId}
              position={venue.location}
              icon={venueIcon}
              onClick={() => togglePopup(venue, icon)}
            />
          );
        })}

        {props.popupVisibility && (
          <Popup
            GoogleLatLng={google.maps.LatLng}
            GoogleSize={google.maps.Size}
            sendingRequest={props.sendingRequest}
            {...popupProperties}
          />
        )}

        <ButtonsWrapper>
          <Button
            float
            $backgroundColor={colors.gray500}
            color={colors.white}
            disabled={props.sendingRequest}
            onClickHandler={props.getUserLocation}
            className="gray650-btn"
          >
            <ButtonContent>
              <Icon glyph="directionArrow" size={1} color={colors.white} />
              <LocateBgColor style={{ margin: "0 0 0 0.5rem" }}>
                {formatMessage(messages.locateMeButton)}
              </LocateBgColor>
            </ButtonContent>
          </Button>
          <ShowListButton
            float
            $backgroundColor={colors.gray500}
            color={colors.white}
            disabled={props.sendingRequest}
            onClickHandler={props.showList}
            className="gray650-btn"
          >
            <ButtonContent>
              <Icon glyph="list" size={1} color={colors.white} />
              <p style={{ margin: "0 0 0 0.5rem" }}>
                {formatMessage(messages.showListButton)}
              </p>
            </ButtonContent>
          </ShowListButton>
        </ButtonsWrapper>
      </GoogleMap>
    </Wrapper>
  );
};

Map.propTypes = {
  visible: PropTypes.bool.isRequired,
  userLocation: PropTypes.object.isRequired,
  centerLocation: PropTypes.object.isRequired,
  sendingRequest: PropTypes.bool.isRequired,
  venues: PropTypes.array.isRequired,
  popupVisibility: PropTypes.bool.isRequired,
  showSearchHere: PropTypes.bool.isRequired,
  showUserMarker: PropTypes.bool.isRequired,
  onClickMap: PropTypes.func.isRequired,
  onDragMap: PropTypes.func.isRequired,
  onZoomMap: PropTypes.func.isRequired,
  loadCenterVenues: PropTypes.func.isRequired,
  showPopup: PropTypes.func.isRequired,
  hidePopup: PropTypes.func.isRequired,
  getUserLocation: PropTypes.func.isRequired,
  showList: PropTypes.func.isRequired,
};

export default Map;
