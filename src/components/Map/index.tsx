import { calculateIconType, getGeneralType } from "@/utils/helperFunction";
import {
  Circle,
  GoogleMap,
  InfoWindow,
  Marker,
  useLoadScript,
} from "@react-google-maps/api";
import { kebabCase } from "lodash";
import { LocateFixed } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setSearch } from "@/Store/Search/searchSlice";
import CardComponent from "../Card";
import Spinner from "../Spinner";

// Static libraries array to prevent LoadScript from reloading
const GOOGLE_MAPS_LIBRARIES: ("places")[] = ["places"];

interface MapProps {
  currentLocation: google.maps.LatLngLiteral | null;
  userLocation: google.maps.LatLngLiteral | null;
  setCurrentLocation: (location: google.maps.LatLngLiteral) => void;
  setUserLocation?: (location: google.maps.LatLngLiteral) => void;
  venues: any[];
  refetch?: (e: { lat: number; lng: number; search?: string }) => void;
}

const Map: React.FC<MapProps> = ({
  currentLocation,
  setCurrentLocation,
  venues,
  refetch,
  userLocation,
  setUserLocation,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const mapRef = useRef<google.maps.Map | null>(null);
  const [selectedVenue, setSelectedVenue] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDragged, setIsDragged] = useState(false);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY || "",
    libraries: GOOGLE_MAPS_LIBRARIES,
  });

  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner />
      </div>
    );
  }

  const handleMarkerClick = (venue: any) => {
    setSelectedVenue(venue);
    if (mapRef.current) {
      mapRef.current.setZoom(19);
      mapRef.current.panTo({
        lat: venue.location.lat,
        lng: venue.location.lng,
      });
      mapRef.current.panBy(0, -200);
    }
  };

  const handleMapDragEnd = () => {
    setIsDragged(true);
  };

  const handleSearchHere = () => {
    if (mapRef.current) {
      const center = mapRef.current.getCenter();
      if (center) {
        const newLocation = { lat: center.lat(), lng: center.lng() };
        mapRef.current.setZoom(17);
        mapRef.current.panTo({
          lat: newLocation.lat,
          lng: newLocation.lng,
        });
        setCurrentLocation(newLocation);
        refetch?.({ lat: newLocation?.lat, lng: newLocation?.lng });
      }
    }
    setIsDragged(false);
  };

  const locateMe = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const location = { lat: latitude, lng: longitude };
          // Clear the search value BEFORE refetch to prevent race condition
          // Pass empty search to refetch to ensure it doesn't use old cached value
          dispatch(setSearch(""));
          setUserLocation?.(location);
          setIsDragged(false);
          setCurrentLocation(location);
          refetch?.({ lat: location?.lat, lng: location?.lng, search: "" });
        },
        (err) => console.error("Error getting location:", err)
      );
    }
  };

  const handleButtonClick = (name: string, placeId: string) => {
    if (placeId) {
      router.push(`/?name=${name}&placeId=${placeId}`);
      setIsModalOpen(true);
    }
  };

  const showList = () => {
    const listView = document.getElementById("list-view");
    const mapView = document.getElementById("map-view");
    if (mapView && listView) {
      mapView.style.display = "none";
      listView.style.display = "grid";
    }
  };

  return (
    <div className="relative">
      {/* Map */}
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "calc(100vh - 155px)" }}
        center={currentLocation || { lat: 38.7946, lng: 106.5348 }}
        zoom={19}
        options={{
          disableDefaultUI: true,
          zoomControl: false,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
          clickableIcons: false,
          gestureHandling: "greedy",
          styles: [
            {
              featureType: "poi",
              elementType: "labels.icon", // hide POI icons
              stylers: [{ visibility: "off" }],
            },
            {
              featureType: "poi.business",
              stylers: [{ visibility: "off" }], // hide business POIs completely
            },
            {
              featureType: "transit",
              elementType: "labels.icon",
              stylers: [{ visibility: "off" }],
            },
          ],
        }}
        onClick={() => setSelectedVenue(null)}
        onLoad={(map: google.maps.Map) => {
          mapRef.current = map;
        }}
        onDragEnd={handleMapDragEnd}
      >
        {venues?.map((venue, idx) => (
          <Marker
            key={idx}
            position={{ lat: venue.location.lat, lng: venue.location.lng }}
            onClick={() => handleMarkerClick(venue)}
            icon={{
              url: `https://s3.amazonaws.com/axsmap-media/markers/hi-vis/${kebabCase(
                getGeneralType(venue?.types)
              )}${calculateIconType(venue.mapMarkerScore, venue)}.svg`,
              scaledSize: new google.maps.Size(50, 50),
            }}
          />
        ))}
        {userLocation && (
          <Circle
            center={userLocation}
            radius={1}
            options={{
              fillColor: "#4285F4",
              strokeColor: "#4285F4",
              strokeOpacity: 0.2,
              strokeWeight: 1,
              fillOpacity: 1,
            }}
          />
        )}
        {userLocation && (
          <Circle
            center={userLocation}
            radius={5} // meters
            options={{
              fillColor: "#4285F4",
              strokeColor: "#4285F4",
              strokeOpacity: 0.2,
              strokeWeight: 1,
              fillOpacity: 0.2,
            }}
          />
        )}
        {selectedVenue && (
          <InfoWindow
            position={{
              lat: selectedVenue.location.lat + 0.00024,
              lng: selectedVenue.location.lng,
            }}
          >
            <CardComponent
              isSelectedVenue={true}
              selectedVenue={selectedVenue}
              title={selectedVenue.name}
              distance={selectedVenue.distance}
              description={selectedVenue.description}
              buttonText="Add Review"
              onButtonClick={handleButtonClick}
            />
          </InfoWindow>
        )}
      </GoogleMap>

      {isDragged && (
        <button
          onClick={handleSearchHere}
          className="absolute md:top-20 top-16 left-1/2 transform -translate-x-1/2 md:text-base text-sm md:px-6 md:py-2 px-3 py-1 bg-primary text-white rounded-[8px]"
        >
          Search Here
        </button>
      )}
      {/* Desktop Button */}
      <button
        onClick={locateMe}
        className="absolute bottom-5 left-1/2 gap-x-2 transform -translate-x-1/2 px-6 py-3 bg-gray-500 text-white rounded-[8px] hidden lg:flex"
      >
        <LocateFixed />
        LOCATE ME
      </button>

      {/* Mobile Buttons (stacked vertically) */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex flex-wrap sm:flex-nowrap justify-center w-[100%] gap-4 lg:hidden max-w-full px-2">
        <button
          onClick={showList}
          className="flex gap-x-2 px-2  lg:px-6 py-2 lg:py-3 text-[12px] lg:text-[18px] bg-gray-500 text-white rounded-[8px] whitespace-nowrap"
        >
          <LocateFixed className=" h-4 w-4" />
          SHOW LIST
        </button>
        <button
          onClick={locateMe}
          className="flex gap-x-2 px-2  lg:px-6 py-2 lg:py-3 text-[12px] lg:text-[18px] bg-gray-500 text-white rounded-[8px] whitespace-nowrap"
        >
          <LocateFixed className=" h-4 w-4" />
          LOCATE ME
        </button>
      </div>
    </div>
  );
};

export default Map;
