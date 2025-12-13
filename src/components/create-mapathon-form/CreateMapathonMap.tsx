"use client";
import React from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

interface CreateMapathonMapProps {
  location: {
    lat: number | null;
    lng: number | null;
  };
  onMarkerDragEnd?: (lat: number, lng: number) => void;
}

const mapContainerStyle = {
  width: '100%',
  height: '300px',
  marginBottom: '1.5rem',
};

const mapOptions = {
  zoomControl: true,
  mapTypeControl: false,
  scaleControl: false,
  streetViewControl: false,
  rotateControl: false,
  fullscreenControl: true,
  zoomControlOptions: {
    position: 3, // LEFT_TOP
  },
};

const CreateMapathonMap: React.FC<CreateMapathonMapProps> = ({ location, onMarkerDragEnd }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY || '',
  });

  if (!isLoaded || !location.lat || !location.lng) {
    return (
      <div style={mapContainerStyle} className="bg-gray-100 flex items-center justify-center text-gray-500">
        {!location.lat || !location.lng ? 'Please select a location' : 'Loading map...'}
      </div>
    );
  }

  const center = {
    lat: location.lat,
    lng: location.lng,
  };

  const mapathonIcon = {
    url: 'https://s3.amazonaws.com/axsmap-media/markers/mapathon-marker.svg',
    scaledSize: new window.google.maps.Size(40.66, 50),
    origin: new window.google.maps.Point(0, 0),
    anchor: new window.google.maps.Point(20.33, 50),
  };

  const handleDragEnd = (e: google.maps.MapMouseEvent) => {
    if (e.latLng && onMarkerDragEnd) {
      onMarkerDragEnd(e.latLng.lat(), e.latLng.lng());
    }
  };

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={center}
      zoom={14}
      options={mapOptions}
    >
      <Marker
        position={center}
        icon={mapathonIcon}
        draggable={!!onMarkerDragEnd}
        onDragEnd={handleDragEnd}
      />
    </GoogleMap>
  );
};

export default CreateMapathonMap;
