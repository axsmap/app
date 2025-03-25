import Image from "next/image";
import { mapathons } from "@/utils/constants";
import MarkerUserIcon from "@/assets/icons/marker-user-icon";
import MarkerStarIcon from "@/assets/icons/marker-star-icon";
import MarkerCalendarIcon from "@/assets/icons/marker-calendar-icon";
import MarkerLocationIcon from "@/assets/icons/marker-location-icon";
import Avatar from "../../../assets/images/Avatar.png";

interface Params {
  params: {
    id: string;
  };
}

const MapathonDetailPage = async ({ params }: Params) => {
  const mapathon = mapathons.find((m) => m.id === params.id);
  if (!mapathon) {
    return null;
  }

  const progress = (mapathon.reviewCount / mapathon.reviews) * 100;
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">{mapathon.title}</h2>

      <div className="rounded-lg overflow-hidden mb-6">
        <Image
          src={mapathon.mapUrl}
          alt="Map Thumbnail"
          width={800}
          height={400}
          className="w-full object-cover"
        />
      </div>
      <div className="space-y-4 text-sm text-[#353435]">
        <div className="flex items-center">
          <MarkerLocationIcon className="mr-2" />
          {mapathon.location}
        </div>
        <div className="flex items-center">
          <MarkerCalendarIcon className="mr-2" />
          {mapathon.dates}
        </div>
        <div className="flex items-center">
          <MarkerStarIcon className="mr-2" />
          {mapathon.reviewCount} ranked for reviews made
        </div>
        <div className="flex items-center">
          <MarkerUserIcon className="mr-2" /> {mapathon.reviewCount} participant
          from {mapathon.reviews} participants
        </div>

        <div className="bg-yellow-100 p-3 rounded-lg flex items-center mt-4">
          <Image
            src={Avatar}
            alt="User"
            width={30}
            height={30}
            className="rounded-full"
          />
          <span className="ml-3 font-medium text-gray-800">William Gibbs</span>
          <div className="relative ml-4 flex-1">
            <div className="flex mb-1/2">
              <div
                className="flex w-full bg-gray-200 rounded-full"
                style={{ height: "8px", width: "98%" }}
              >
                <div
                  className="bg-yellow-500 rounded-full"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>
          <div>
            <span className="text-xs font-semibold inline-block py-1 uppercase text-yellow-500 mr-2">
              {Math.round(progress)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapathonDetailPage;
