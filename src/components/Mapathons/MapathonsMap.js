import React from 'react'
import { array, func, bool } from 'prop-types'
import {
  GoogleMap as GM,
  Marker,
  InfoWindow,
  withGoogleMap,
  withScriptjs
} from 'react-google-maps'
import { compose, withProps } from 'recompose'

const mapStyle = require('./GoogleMapStyles.json')
const googleApiKey = process.env.REACT_APP_GOOGLE_API_KEY
const GoogleMap = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?v=3.exp&key=${googleApiKey}&libraries=places`,
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: (
      <div
        style={{
          height: '350px',
          marginBottom: '0rem',
          width: '100%'
        }}
      />
    ),
    mapElement: <div style={{ height: '100%' }} />
  }),
  withScriptjs,
  withGoogleMap
)(props => {
  const mapOptions = {
    zoomControlOptions: {
      position: window.google.maps.ControlPosition.LEFT_TOP
    },
    fullscreenControlOptions: {
      position: window.google.maps.ControlPosition.RIGHT_TOP
    },
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    rotateControl: false,
    fullscreenControl: true,
    //gestureHandling: 'greedy', //uncomment gestureHangling to remove "Use ctrl + scroll to zoom the map"
    styles: mapStyle
  }

  return (
    <GM
      //center={{lat: 41, lng: -42}}
      options={mapOptions}
      defaultZoom={3.9}
      defaultCenter={{ lat: 41, lng: -42 }}
    >
      {props.children}
    </GM>
  )
})

export default class MapathonsMap extends React.Component {
  static propTypes = {
    highlightedEventsArray: array
  }

  constructor(props) {
    super(props)

    this.state = {
      status: false,
      showInfoWindow: false
    }
  }

  highlightedEventsProps(props) {
    if (
      props.highlightedEventsArray !== undefined &&
      this.state.status !== true
    ) {
      props.highlightedEventsArray.map(event => {
        this.setState({
          status: true
        })
      })
    }
  }

  handleMouseOver = () => {
    this.setState({
      showInfoWindow: true
    })
  }

  handleMouseExit = () => {
    this.setState({
      showInfoWindow: false
    })
  }

  render() {
    {
      this.highlightedEventsProps(this.props)
    }
    const { showInfoWindow } = this.state

    return (
      <GoogleMap>
        {this.state.status
          ? this.props.highlightedEventsArray.map((event, index) => {
              if (event.isOpen === true) {
                return (
                  <Marker
                    //change marker pin color here
                    position={{
                      lat: parseFloat(event.location.coordinates[1]),
                      lng: parseFloat(event.location.coordinates[0])
                    }}
                    key={event.id}
                    onMouseOver={this.handleMouseOver}
                    onMouseOut={this.handleMouseExit}
                  >
                    {this.state.showInfoWindow && (
                      <InfoWindow key={event.id}>
                        <span>{event.name}</span>
                      </InfoWindow>
                    )}
                  </Marker>
                )
              } else {
                return (
                  <Marker
                    //change marker pin color here
                    position={{
                      lat: parseFloat(event.location.coordinates[1]),
                      lng: parseFloat(event.location.coordinates[0])
                    }}
                    key={event.id}
                    onMouseOver={this.handleMouseOver}
                    onMouseOut={this.handleMouseExit}
                  >
                    {this.state.showInfoWindow && (
                      <InfoWindow key={event.id}>
                        <span>{event.name}</span>
                      </InfoWindow>
                    )}
                  </Marker>
                )
              }
            })
          : null}
      </GoogleMap>
    )
  }
}
